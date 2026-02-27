import { NextRequest, NextResponse } from "next/server";

// ============================================================
// NEW: Business Size Classification Logic
// ============================================================

// NEW: Possible business size tiers
type BusinessSize = "Micro" | "Small" | "Medium" | "Large" | "Unknown";

/**
 * NEW: Classify a partner's business size based on registerCapital (in THB).
 *
 *  - null / undefined / NaN  → "Unknown"  (Fallback logic)
 *  - < 1,800,000             → "Micro"
 *  - 1,800,000 – 50,000,000  → "Small"
 *  - 50,000,000 – 500,000,000→ "Medium"
 *  - > 500,000,000           → "Large"
 */
function classifyBusinessSize(registerCapital: unknown): BusinessSize {
    // NEW: Gracefully handle null, undefined, non-numeric values
    if (registerCapital == null) return "Unknown";
    const cap = typeof registerCapital === "number"
        ? registerCapital
        : parseFloat(String(registerCapital));
    if (isNaN(cap)) return "Unknown";

    if (cap < 1_800_000) return "Micro";
    if (cap <= 50_000_000) return "Small";
    if (cap <= 500_000_000) return "Medium";
    return "Large";
}

// NEW: Numeric ordering for size tiers (used in distance calculation)
const SIZE_ORDER: Record<BusinessSize, number> = {
    Micro: 0,
    Small: 1,
    Medium: 2,
    Large: 3,
    Unknown: -1, // sentinel – will be handled separately
};

/**
 * NEW: Compute Size_Fit_Score (0-100).
 *
 * When the user provides a budget, we classify it into the same tier system
 * and reward partners whose tier is close to the user's tier.
 *
 *   exact match       → 100
 *   1 tier apart       →  70
 *   2 tiers apart      →  40
 *   3 tiers apart      →  15
 *   either side Unknown→  50  (neutral – no penalty, no reward)
 *
 * If the user did NOT provide a budget param, every partner receives a
 * neutral score of 50 so the existing behaviour is effectively unchanged.
 */
function computeSizeFitScore(
    partnerSize: BusinessSize,
    userSize: BusinessSize | null,
): number {
    // NEW: No user budget supplied → neutral score
    if (userSize === null) return 50;

    // NEW: Either side is Unknown → neutral
    if (partnerSize === "Unknown" || userSize === "Unknown") return 50;

    const distance = Math.abs(SIZE_ORDER[partnerSize] - SIZE_ORDER[userSize]);

    switch (distance) {
        case 0: return 100; // exact match
        case 1: return 70;
        case 2: return 40;
        case 3: return 15;
        default: return 15;
    }
}

// ============================================================
// END: Business Size Classification Logic
// ============================================================

export async function GET(req: NextRequest) {
    try {
        const searchParams = req.nextUrl.searchParams;
        const q = (searchParams.get("q") || "").toLowerCase();
        const region = searchParams.get("region") || "";
        const page = parseInt(searchParams.get("page") || "1", 10);
        const limit = parseInt(searchParams.get("limit") || "10", 10);

        // NEW: Optional budget parameter – classifies the user's implied size tier
        const budgetParam = searchParams.get("budget");
        const userBudgetSize: BusinessSize | null = budgetParam
            ? classifyBusinessSize(parseFloat(budgetParam))
            : null;

        const regionMap: Record<string, string> = {
            central: "กรุงเทพมหานคร",
            north: "เชียงใหม่",
            east: "ระยอง",
            northeast: "ขอนแก่น",
            south: "ภูเก็ต"
        };

        const apiBase = process.env.API;
        // use the combined endpoint which returns multiple arrays
        const apiUrl = `${apiBase}/api/all-data`;

        // Fetch all data (companies + catalogs) from external API
        const res = await fetch(apiUrl, { cache: 'no-store' });
        if (!res.ok) throw new Error(`API fetch failed: ${res.status}`);

        const data = await res.json();
        // endpoint returns object with several arrays. choose the most complete company list.
        // prefer bdi_acc_company_with_tsic since it includes tsic codes, fall back to bdi_acc_company if necessary.
        let allCompanies: any[] = [];
        if (Array.isArray(data?.bdi_acc_company_with_tsic)) {
            allCompanies = data.bdi_acc_company_with_tsic;
        } else if (Array.isArray(data?.bdi_acc_company)) {
            allCompanies = data.bdi_acc_company;
        }
        const catalogs: any[] = Array.isArray(data?.company_catalog) ? data.company_catalog : [];

        // precompute a map of company_id -> catalog summary
        const catalogMap: Record<number, { products: string[]; services: string[] }> = {};
        catalogs.forEach((cat) => {
            if (!cat.company_id) return;
            const entry = catalogMap[cat.company_id] || { products: [], services: [] };
            if (cat.type === 'product') {
                entry.products.push(cat.name);
            } else if (cat.type === 'service') {
                entry.services.push(cat.name);
            }
            catalogMap[cat.company_id] = entry;
        });

        // Filtering
        let filtered = allCompanies;

        if (q) {
            filtered = filtered.filter((c: any) =>
                (c.company_name_th && c.company_name_th.toLowerCase().includes(q)) ||
                (c.company_name && c.company_name.toLowerCase().includes(q)) ||
                (c.typeof_service && c.typeof_service.toLowerCase().includes(q)) ||
                (c.subtypeof_service && c.subtypeof_service.toLowerCase().includes(q)) ||
                (c.objective && c.objective.toLowerCase().includes(q)) ||
                (c.additional_info && c.additional_info.toLowerCase().includes(q))
            );
        }

        if (region && region !== "all" && regionMap[region]) {
            filtered = filtered.filter((c: any) => c.city === regionMap[region]);
        }

        // apply catalogType filter if provided
        const catalogTypeFilter = (searchParams.get("catalogType") || "all").toLowerCase();
        if (catalogTypeFilter && catalogTypeFilter !== "all") {
            filtered = filtered.filter((c: any) => {
                const cat = catalogMap[c.id] || { products: [], services: [] };
                const hasP = cat.products.length > 0;
                const hasS = cat.services.length > 0;
                if (catalogTypeFilter === "product") return hasP;
                if (catalogTypeFilter === "service") return hasS;
                if (catalogTypeFilter === "both") return hasP && hasS;
                return true;
            });
        }

        const totalHits = filtered.length;
        const totalPages = Math.max(1, Math.ceil(totalHits / limit));
        const offset = (page - 1) * limit;
        const paginated = filtered.slice(offset, offset + limit);

        // Helper to parse service strings which might be JSON arrays
        const parseServices = (val: any) => {
            if (!val) return [];
            try {
                if (typeof val === 'string' && val.startsWith('[')) {
                    const parsed = JSON.parse(val);
                    return Array.isArray(parsed) ? parsed.map(String) : [String(val)];
                }
                return [String(val)];
            } catch (e) {
                return [String(val)];
            }
        };

        // Map API fields to MatchResult type
        const hits = paginated.map((row: any) => {
            const typeofService = parseServices(row.typeof_service);
            const subtypeofService = parseServices(row.subtypeof_service);
            const expertise = Array.from(new Set([...typeofService, ...subtypeofService]))
                .filter(s => s && s !== "0" && s !== "null");

            // attach catalog info
            const cat = catalogMap[row.id] || { products: [], services: [] };
            const productsArr = cat.products;
            const servicesArr = cat.services;
            let catalogType: "product" | "service" | "both" = "service";
            if (productsArr.length && servicesArr.length) catalogType = "both";
            else if (productsArr.length) catalogType = "product";
            else if (servicesArr.length) catalogType = "service";

            // NEW: Classify partner business size from registerCapital
            const partnerSize = classifyBusinessSize(
                row.register_capital ?? row.registerCapital
            );

            // NEW: Compute Size_Fit_Score (0-100)
            const sizeFitScore = computeSizeFitScore(partnerSize, userBudgetSize);

            // NEW: Blend the original base score with Size_Fit_Score
            //   baseScore weight = 70%, sizeFitScore weight = 30%
            const baseScore = Math.floor(Math.random() * 21) + 80; // original mock score
            const blendedScore = Math.round(baseScore * 0.7 + sizeFitScore * 0.3);
            // Clamp to 0-100 range
            const matchScore = Math.min(100, Math.max(0, blendedScore));

            // NEW: Build matchReasons – inject size-related reason when relevant
            const matchReasons: string[] = ["ตรงกับความต้องการ", "อยู่ในพื้นที่ที่กำหนด"];
            if (userBudgetSize && sizeFitScore >= 70) {
                matchReasons.push("ขนาดธุรกิจเหมาะสมกับงบประมาณ"); // NEW: Size fit reason
            }

            return {
                id: row.id,
                company: row.company_name_th || row.company_name,
                matchScore, // NEW: now uses blended score with Size_Fit_Score
                type: row.is_tech ? "Tech Company" : "Service Company",
                location: row.city || row.location || "N/A",
                expertise: expertise,
                matchReasons, // NEW: may include size-fit reason
                verified: row.is_verified === 1 || row.is_verified === true,
                projectsCompleted: Math.floor(Math.random() * 50),
                avgRating: (Math.random() * 1.5 + 3.5).toFixed(1),
                description: row.objective || row.additional_info,
                tsic: row.tsic || "",
                contact: {
                    email: "contact@example.com",
                    phone: row.phone_number || row.office_number || "N/A",
                    website: row.website || ""
                },
                services: servicesArr, // explicit service catalog names
                products: productsArr, // explicit product catalog names
                catalogType,
                businessSize: partnerSize, // NEW: exposed for frontend display
            };
        });

        const payload = {
            hits: hits,
            totalHits: totalHits,
            totalPages: totalPages,
        };

        // return as plain JSON, no encoding
        return NextResponse.json(payload);
    } catch (error) {
        console.error("Search API Error:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}


