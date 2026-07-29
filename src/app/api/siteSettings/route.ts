import { NextRequest } from "next/server";
import { createAdminResource, listAdminResource } from "@/lib/cms/admin-resources";
export const GET = (req: NextRequest) => listAdminResource(req, "siteSettings");
export const POST = (req: NextRequest) => createAdminResource(req, "siteSettings");
