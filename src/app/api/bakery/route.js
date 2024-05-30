export async function GET() {
  return NextResponse.json(
    { error: "Internal Server Error" },
    { status: 500 }
  );
  }
  