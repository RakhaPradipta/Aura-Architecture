import { NextRequest, NextResponse } from "next/server";

const CSharpApiUrl = process.env.API_URL || "";

// Mode frontend-only (tanpa backend C#): tolak dengan pesan jelas
// agar form kontak menampilkan arahan email, bukan error misterius.
export async function POST(request: NextRequest) {
  if (!CSharpApiUrl) {
    return NextResponse.json(
      {
        success: false,
        message: "Formulir online nonaktif pada versi demo. Hubungi kami langsung via email.",
      },
      { status: 503 }
    );
  }
  try {
    const body = await request.json();

    const res = await fetch(`${CSharpApiUrl}/api/contact`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    const data = await res.json();

    if (!res.ok) {
      return NextResponse.json(data, { status: res.status });
    }

    return NextResponse.json(data);
  } catch {
    return NextResponse.json(
      { success: false, message: "Could not reach the server. Please try again." },
      { status: 500 }
    );
  }
}
