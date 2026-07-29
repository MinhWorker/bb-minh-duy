import { NextRequest } from "next/server";
import { createAdminResource, listAdminResource } from "@/lib/cms/admin-resources";
export const GET = (req: NextRequest) => listAdminResource(req, "mediaManifest");
export const POST = (req: NextRequest) => createAdminResource(req, "mediaManifest");
