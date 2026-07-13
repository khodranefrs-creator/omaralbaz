import { NextRequest, NextResponse } from "next/server";
import type { ConsultationFormData } from "@/types";

const submissions = new Map<string, number[]>();
const RATE_LIMIT = 3;
const RATE_WINDOW = 60 * 60 * 1000;

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const times = submissions.get(ip) || [];
  const recent = times.filter((t) => now - t < RATE_WINDOW);
  submissions.set(ip, recent);
  return recent.length >= RATE_LIMIT;
}

export async function POST(request: NextRequest) {
  const ip =
    request.headers.get("x-forwarded-for") ||
    request.headers.get("x-real-ip") ||
    "unknown";

  if (isRateLimited(ip)) {
    return NextResponse.json(
      { error: "Rate limit exceeded" },
      { status: 429 }
    );
  }

  try {
    const body = await request.json();
    const { name, email, phone, caseType, urgency, preferredContact, message } =
      body as ConsultationFormData & { website?: string };

    if (body.website) {
      return NextResponse.json({ success: true });
    }

    const errors: string[] = [];
    if (!name || name.trim().length < 2) errors.push("Name is required");
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      errors.push("Valid email is required");
    if (!phone || phone.trim().length < 5) errors.push("Phone is required");
    if (!caseType) errors.push("Case type is required");
    if (!urgency) errors.push("Urgency is required");
    if (!preferredContact) errors.push("Preferred contact method is required");
    if (!message || message.trim().length < 20)
      errors.push("Message must be at least 20 characters");

    if (errors.length > 0) {
      return NextResponse.json({ error: errors.join(", ") }, { status: 400 });
    }

    const times = submissions.get(ip) || [];
    times.push(Date.now());
    submissions.set(ip, times);

    console.log("Consultation form submission:", {
      name,
      email,
      phone,
      caseType,
      urgency,
      preferredContact,
      message,
    });

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
}
