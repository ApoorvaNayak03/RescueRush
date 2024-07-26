
import { NextResponse } from "next/server";

const BASE_URL = "https://api.mapbox.com/search/searchbox/v1/suggest";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const searchText = searchParams.get("q");

  const url = new URL(BASE_URL);
  url.searchParams.set("q", searchText || "");
  url.searchParams.set("language", "en");
  url.searchParams.set("limit", "6");
  url.searchParams.set("session_token", "0176e2a0-88df-4ef1-8909-0ad99340ddde");
  url.searchParams.set("access_token", process.env.MAPBOX_ACCESS_TOKEN || "");


  const res = await fetch(url.toString(), {
    headers: {
      "Content-Type": "application/json",
    },
  });

  console.log("API response status:", res.status);

  if (!res.ok) {
    console.error("Error fetching address list:", await res.text());
    return NextResponse.json({ error: "Failed to fetch address list" }, { status: res.status });
  }

  const searchResult = await res.json();
  console.log("API response data:", searchResult);

  return NextResponse.json(searchResult);
}