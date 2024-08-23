"use server";
import IconJson from "css-finances/banks.json"
import sharp from "sharp";
import { IconSchema } from "@/types";
import { NextRequest, NextResponse } from "next/server";
import { readFile } from "fs/promises";
import { join } from "path";
const node_modules = require('node_modules-path');

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
  const iconSchema = IconJson.th as IconSchema;

  const svgFilePath = join(
    node_modules(),
    `css-finances/svg/${icon}.svg`
  );
  const svgBuffer = await readFile(svgFilePath)
  const iconBuffer = await sharp(svgBuffer).resize(Number(width / 2)).toBuffer();

  const canvas = sharp({
    create: {
      width,
      height,
      channels: 4,
      background: iconSchema[icon].color
    }
  });
  canvas.composite([{
    input: iconBuffer,
    blend: "over",
  }])

  const image = await canvas.png().toBuffer();
  return new NextResponse(image)
}