import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    status: "online",
    app: "Mercado VIVA — MVP Devolución Omnicanal (BORIS)",
    version: "2.0.0",
    framework: "Next.js 14 / Node.js",
    platform: "Vercel Serverless Ready",
    timestamp: new Date().toISOString(),
  });
}