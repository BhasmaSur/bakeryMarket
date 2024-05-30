import { getAllUsers } from "@/services/authService";
import { NextResponse } from "next/server";
export async function GET() {
  try {
    const allUsers = await getAllUsers();
    return NextResponse.json(
        { body: { user: allUsers } },
        { status: 200 }
      );
    // if (getAllUsers) {
    //   return NextResponse.json(
    //     { body: { userVerified: true } },
    //     { status: 200 }
    //   );
    // } else {
    //   return NextResponse.json(
    //     { body: { userVerified: false } },
    //     { status: 401 }
    //   );
    // }
  } catch (e) {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
