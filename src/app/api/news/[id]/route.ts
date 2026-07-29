import { NextRequest } from "next/server";
import { deleteAdminResource, getAdminResource, updateAdminResource } from "@/lib/cms/admin-resources";
type Context = { params: Promise<{ id: string }> };
export const GET = async (req: NextRequest, context: Context) => getAdminResource(req, "news", (await context.params).id);
export const PUT = async (req: NextRequest, context: Context) => updateAdminResource(req, "news", (await context.params).id);
export const DELETE = async (req: NextRequest, context: Context) => deleteAdminResource(req, "news", (await context.params).id);
