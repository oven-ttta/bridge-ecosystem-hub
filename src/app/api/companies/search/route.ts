import { NextRequest, NextResponse } from "next/server";
import db from "@/lib/db";

export async function GET(req: NextRequest) {
    try {
        const searchParams = req.nextUrl.searchParams;
        const q = searchParams.get("q") || "";
        const region = searchParams.get("region") || "";
        const page = parseInt(searchParams.get("page") || "1", 10);
        const limit = parseInt(searchParams.get("limit") || "10", 10);
        const offset = (page - 1) * limit;

        const regionMap: Record<string, string> = {
            central: "กรุงเทพมหานคร",
            north: "เชียงใหม่",
            east: "ระยอง",
            northeast: "ขอนแก่น",
            south: "ภูเก็ต"
        };

        let query = "SELECT * FROM companies WHERE 1=1";
        let countQuery = "SELECT COUNT(*) as total FROM companies WHERE 1=1";
        const queryParams: any[] = [];

        if (q) {
            const searchFilter = " AND (companyNameTh LIKE ? OR companyName LIKE ? OR typeofService LIKE ? OR subtypeofService LIKE ?)";
            query += searchFilter;
            countQuery += searchFilter;
            const searchTerm = `%${q}%`;
            queryParams.push(searchTerm, searchTerm, searchTerm, searchTerm);
        }

        if (region && region !== "all" && regionMap[region]) {
            query += " AND city = ?";
            countQuery += " AND city = ?";
            queryParams.push(regionMap[region]);
        }

        // Search query with pagination
        query += " LIMIT ? OFFSET ?";
        const [rows]: any = await db.execute(query, [...queryParams, limit.toString(), offset.toString()]);

        // Count query for pagination
        const [totalRows]: any = await db.execute(countQuery, queryParams);
        const totalHits = totalRows[0].total;

        // Map database fields to match the UI's MatchResult type
        const hits = rows.map((row: any) => ({
            id: row.id,
            company: row.companyNameTh,
            matchScore: Math.floor(Math.random() * 21) + 80, // Mock score for now
            type: row.is_tech ? "Tech Company" : "Service Company",
            location: row.city,
            expertise: [row.typeofService, row.subtypeofService].filter(Boolean),
            matchReasons: ["ตรงกับความต้องการ", "อยู่ในพื้นที่ที่กำหนด"],
            verified: row.is_verified === 1,
            projectsCompleted: Math.floor(Math.random() * 50),
            avgRating: (Math.random() * 1.5 + 3.5).toFixed(1),
            description: row.objective || row.additionalInfo,
            contact: {
                email: "contact@example.com",
                phone: row.phoneNumber,
                website: row.website
            },
            services: [row.typeofService, row.subtypeofService].filter(Boolean)
        }));

        const payload = {
            hits: hits,
            totalHits: totalHits,
            totalPages: Math.max(1, Math.ceil(totalHits / limit)),
        };

        const encodedPayload = Buffer.from(JSON.stringify(payload), 'utf-8').toString('base64');

        return NextResponse.json({ _data: encodedPayload });
    } catch (error) {
        console.error("Search API Error:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}

