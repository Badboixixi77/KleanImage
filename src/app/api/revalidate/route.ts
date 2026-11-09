/**
 * POST /api/revalidate — CMS webhook to trigger ISR revalidation.
 * Built in TASK-13.
 */
import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";

export async function POST(request: NextRequest) {
  const secret = request.headers.get("authorization")?.replace("Bearer ", "");

  if (secret !== process.env.SANITY_REVALIDATE_SECRET) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json() as { _type?: string; slug?: { current?: string } };
  const paths: string[] = ["/"];

  if (body._type === "service" && body.slug?.current) {
    paths.push("/services");
    paths.push(`/services/${body.slug.current}`);
  } else if (body._type === "galleryItem") {
    paths.push("/gallery");
  } else if (body._type === "testimonial" || body._type === "siteSettings") {
    paths.push("/");
  }

  for (const path of paths) {
    revalidatePath(path);
  }

  return NextResponse.json({ revalidated: true, paths });
}
