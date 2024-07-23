import { BAKERY_OPERATION } from "@/constants/apiConstants";
import { getBakeryData, updateProducts } from "@/services/bakeryService";
import { getInvalidResponseMessage } from "@/services/errorService";
import { NextResponse } from "next/server";

export async function GET(request, { params }) {
  const { bakeryName } = params;
  try {
    const bakeryDetails = await getBakeryData(bakeryName);
    return getInvalidResponseMessage(bakeryDetails);
  } catch (e) {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function PUT(request, { params }) {
  const { bakeryName } = params;
  const { operation, payload } = await request.json();
  try {
    switch (operation) {
      case BAKERY_OPERATION.UPDATE_PRODUCTS:
        const apiResponse = await updateProducts({
          bakeryName,
          payload,
        });
        return getInvalidResponseMessage(apiResponse);
      default:
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
