import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    try {
        const searchParams = req.nextUrl.searchParams;
        const q = (searchParams.get("q") || "").toLowerCase();
        const region = searchParams.get("region") || "";
        const page = parseInt(searchParams.get("page") || "1", 10);
        const limit = parseInt(searchParams.get("limit") || "10", 10);

        const regionMap: Record<string, string> = {
            central: "กรุงเทพมหานคร",
            north: "เชียงใหม่",
            east: "ระยอง",
            northeast: "ขอนแก่น",
            south: "ภูเก็ต"
        };

        const apiBase = process.env.API;
        const apiUrl = `${apiBase}/api/all-data`;

        // Fetch all data (companies + catalogs) from external API
        const res = await fetch(apiUrl, { cache: 'no-store' });
        if (!res.ok) throw new Error(`API fetch failed: ${res.status}`);

        const data = await res.json();
        // endpoint returns object with several arrays, we care about bdi_acc_company and company_catalog
        const allCompanies: any[] = Array.isArray(data?.bdi_acc_company) ? data.bdi_acc_company : [];
        const catalogs: any[] = Array.isArray(data?.company_catalog) ? data.company_catalog : [];

        // precompute a map of company_id -> catalog summary
        const catalogMap: Record<number, {products: string[]; services: string[]}> = {};
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

            return {
                id: row.id,
                company: row.company_name_th || row.company_name,
                matchScore: Math.floor(Math.random() * 21) + 80, // Mock score
                type: row.is_tech ? "Tech Company" : "Service Company",
                location: row.city || row.location || "N/A",
                expertise: expertise,
                matchReasons: ["ตรงกับความต้องการ", "อยู่ในพื้นที่ที่กำหนด"],
                verified: row.is_verified === 1 || row.is_verified === true,
                projectsCompleted: Math.floor(Math.random() * 50),
                avgRating: (Math.random() * 1.5 + 3.5).toFixed(1),
                description: row.objective || row.additional_info,
                contact: {
                    email: "contact@example.com",
                    phone: row.phone_number || row.office_number || "N/A",
                    website: row.website || ""
                },
                services: servicesArr, // explicit service catalog names
                products: productsArr, // explicit product catalog names
                catalogType,
            };
        });

        const payload = {
            hits: hits,
            totalHits: totalHits,
            totalPages: totalPages,
        };

        const encodedPayload = Buffer.from(JSON.stringify(payload), 'utf-8').toString('base64');

        return NextResponse.json({ _data: encodedPayload });
    } catch (error) {
        console.error("Search API Error:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}


