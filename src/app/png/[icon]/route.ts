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

  const imageBuffer = await IconHelper.getBuffer(icon, {
    width,
    height,
    format: "png"
  });
  return new NextResponse(imageBuffer)
}