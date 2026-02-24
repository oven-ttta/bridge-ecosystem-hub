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
        const apiUrl = `${apiBase}/api/data/bdi_acc_company`;

        // Fetch all data from external API
        const res = await fetch(apiUrl, { cache: 'no-store' });
        if (!res.ok) throw new Error(`API fetch failed: ${res.status}`);

        const allCompanies = await res.json();

        if (!Array.isArray(allCompanies)) {
            throw new Error("API did not return an array");
        }

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
                services: expertise
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


