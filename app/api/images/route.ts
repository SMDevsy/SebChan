import { NextRequest, NextResponse } from "next/server";
import { getMediaUrl } from "../../../lib/db";
import path from "path";
import { readFile } from "fs/promises";

export async function GET(request: NextRequest) {
  const mediaId = request.nextUrl.searchParams.get("mediaId");
  if (!mediaId) {
    return Response.json({
      status: 400,
      message: "Bad Request",
    });
  }

  const imagePath = await getMediaUrl(mediaId);
  if (!imagePath) {
    return Response.json({ status: 404, message: "Not Found" });
  }

  const imageBuffer = await readFile(imagePath);
  const parsedPath = path.parse(imagePath);
  const extNoDot = parsedPath.ext.substring(1);

  return new NextResponse(imageBuffer, {
    headers: {
      "Content-Type": `image/${extNoDot}`,
    },
  });
}
