import { redirect } from "next/navigation";
import { resolveShortlink } from "@/lib/shortlinks";

export const dynamic = "force-dynamic";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const url = resolveShortlink(id);

  if (!url) {
    return new Response("Shortlink not found", { status: 404 });
  }

  redirect(url);
}
