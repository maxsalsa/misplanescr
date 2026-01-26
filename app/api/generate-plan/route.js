import { POST as GeneratePOST } from "@/app/api/planning/generate/route";

export async function POST(req) {
    return GeneratePOST(req);
}
