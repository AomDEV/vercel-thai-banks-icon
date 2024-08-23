"use server";
import { IconHelper } from "css-finances"
import { readFile } from "fs/promises";
import getConfig from "next/config";
import { NextRequest, NextResponse } from "next/server";
import { join } from "path";

type RouteProps = {
  readonly params: {
    readonly icon: string;
  };
};
export async function GET(
  req: NextRequest,
  { params: { icon } }: RouteProps
) {
  const { serverRuntimeConfig } = getConfig()
  const width = Number(req.nextUrl.searchParams.get("width") || 256)
  const height = Number(req.nextUrl.searchParams.get("height") || 256)

  const svgPath = await readFile(join(serverRuntimeConfig.PROJECT_ROOT, 'public', 'icons', `${icon}.svg`));
  const imageBuffer = await IconHelper.getBuffer(icon, {
    width,
    height,
    format: "png",
    buffer: svgPath,
  });
  return new NextResponse(imageBuffer)
}