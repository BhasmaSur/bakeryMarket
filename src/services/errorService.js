import { NextResponse } from "next/server";

const getInvalidResponseMessage = (apiResponse) => {
  if (apiResponse) {
    return NextResponse.json({ ...apiResponse }, { status: 200 });
  } else {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
};

export { getInvalidResponseMessage };
