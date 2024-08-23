"use server";
import { IconHelper } from "css-finances"
import { NextRequest, NextResponse } from "next/server";

type RouteProps = {
  readonly params: {
    readonly icon: string;
  };
};
export async function GET(
  req: NextRequest,
  { params: { icon } }: RouteProps
) {
  const width = Number(req.nextUrl.searchParams.get("width") || 256)
  const height = Number(req.nextUrl.searchParams.get("height") || 256)

  const staticUrl = new URL(`/icons/${icon}.svg`, req.url);
  console.log(staticUrl.toString());
  const svgPath = await fetch(staticUrl.toString()).then((r) => r.arrayBuffer())
  const imageBuffer = await IconHelper.getBuffer(icon, {
    width,
    height,
    format: "png",
    buffer: Buffer.from(svgPath),
  });
  return new NextResponse(imageBuffer)
}