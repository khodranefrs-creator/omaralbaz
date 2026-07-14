import { NextRequest, NextResponse } from "next/server";
import type { ContactFormData } from "@/types";
import { isRateLimited, recordSubmission, getClientIp } from "@/lib/rate-limit";

const MAX_LENGTHS = {
  name: 100,
  email: 254,
  phone: 20,
  subject: 200,
  message: 5000,
};

export async function POST(request: NextRequest) {
  const ip = getClientIp(request);

  if (isRateLimited(ip)) {
    return NextResponse.json(
      { error: "Rate limit exceeded" },
      { status: 429 }
    );
  }

  try {
    const body = await request.json();
    const { name, email, phone, subject, message } = body as ContactFormData & {
      website?: string;
    };

    if (body.website) {
      return NextResponse.json({ success: true });
    }

    const errors: string[] = [];
    if (!name || name.trim().length < 2) errors.push("Name is required");
    if (name && name.length > MAX_LENGTHS.name) errors.push("Name is too long");
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      errors.push("Valid email is required");
    if (email && email.length > MAX_LENGTHS.email) errors.push("Email is too long");
    if (phone && phone.length > MAX_LENGTHS.phone) errors.push("Phone is too long");
    if (!subject || subject.trim().length < 2)
      errors.push("Subject is required");
    if (subject && subject.length > MAX_LENGTHS.subject) errors.push("Subject is too long");
    if (!message || message.trim().length < 10)
      errors.push("Message must be at least 10 characters");
    if (message && message.length > MAX_LENGTHS.message)
      errors.push("Message is too long");

    if (errors.length > 0) {
      return NextResponse.json({ error: errors.join(", ") }, { status: 400 });
    }

    recordSubmission(ip);

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
}
