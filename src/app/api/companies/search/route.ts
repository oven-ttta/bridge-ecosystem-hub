import { NextRequest, NextResponse } from "next/server";
import { MeiliSearch } from "meilisearch";

const client = new MeiliSearch({
    host: process.env.MEILISEARCH_HOST || "http://meilisearch.ovenx.shop",
    apiKey: process.env.MEILISEARCH_API_KEY || "00a792db8bde947730d19d6175dd71d58614cf68",
});

export async function GET(req: NextRequest) {
    try {
        const searchParams = req.nextUrl.searchParams;
        const q = searchParams.get("q") || "";
        const region = searchParams.get("region") || "";
        const page = parseInt(searchParams.get("page") || "1", 10);
        const limit = parseInt(searchParams.get("limit") || "10", 10);

        let filter: string[] = [];
        const regionMap: Record<string, string> = {
            central: "กรุงเทพมหานคร",
            north: "เชียงใหม่",
            east: "ระยอง",
            // add more specific mapping if needed based on data
        };

        if (region && region !== "all" && regionMap[region]) {
            filter.push(`location = "${regionMap[region]}"`);
        }

        const res = await client.index("companies").search(q, {
            filter: filter.length > 0 ? filter : undefined,
            limit: limit,
            offset: (page - 1) * limit,
        });

        const hitsCount = res.estimatedTotalHits || res.totalHits || 0;

        const payload = {
            hits: res.hits,
            totalHits: hitsCount,
            totalPages: Math.max(1, Math.ceil(hitsCount / limit)),
        };

        const encodedPayload = Buffer.from(JSON.stringify(payload), 'utf-8').toString('base64');

        return NextResponse.json({ _data: encodedPayload });
    } catch (error) {
        console.error("Search API Error:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
