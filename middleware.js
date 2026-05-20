import { NextResponse } from "next/server";

export function middleware(req) {
  const url = req.nextUrl.clone();
  const country = req.geo?.country || "XX";

  // Если НЕ Россия → редиректим на международный домен
  if (country !== "RU") {
    url.hostname = "sitesotik3w.vercel.app";
    return NextResponse.redirect(url);
  }

  // Россия → остаётся на сайтсотика.рф
  return NextResponse.next();
}
