import { NextRequest } from "next/server";
import { deleteAdminResource, getAdminResource, updateAdminResource } from "@/lib/cms/admin-resources";
type Context = { params: Promise<{ id: string }> };
export const GET = async (req: NextRequest, context: Context) => getAdminResource(req, "sitePages", (await context.params).id);
export const PUT = async (req: NextRequest, context: Context) => updateAdminResource(req, "sitePages", (await context.params).id);
export const DELETE = async (req: NextRequest, context: Context) => deleteAdminResource(req, "sitePages", (await context.params).id);
