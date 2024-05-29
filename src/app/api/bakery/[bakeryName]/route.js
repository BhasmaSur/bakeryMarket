import { getBakeryData } from "@/services/bakeryService";
import { NextResponse } from "next/server";

export async function GET(request, { params }) {
  const { bakeryName } = params;
  try {
    const bakeryDetails = await getBakeryData(bakeryName);
    if (bakeryDetails) {
      return NextResponse.json(
        { ...bakeryDetails },
        { status: 200 }
      );
    } else {
      return NextResponse.json(
        { error: "Internal Server Error" },
        { status: 500 }
      );
    }
  } catch (e) {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
