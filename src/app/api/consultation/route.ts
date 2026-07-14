import { NextRequest, NextResponse } from "next/server";
import type { ConsultationFormData } from "@/types";
import { isRateLimited, recordSubmission, getClientIp } from "@/lib/rate-limit";

const MAX_LENGTHS = {
  name: 100,
  email: 254,
  phone: 20,
  caseType: 50,
  urgency: 20,
  preferredContact: 20,
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
    const { name, email, phone, caseType, urgency, preferredContact, message } =
      body as ConsultationFormData & { website?: string };

    if (body.website) {
      return NextResponse.json({ success: true });
    }

    const errors: string[] = [];
    if (!name || name.trim().length < 2) errors.push("Name is required");
    if (name && name.length > MAX_LENGTHS.name) errors.push("Name is too long");
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      errors.push("Valid email is required");
    if (email && email.length > MAX_LENGTHS.email) errors.push("Email is too long");
    if (!phone || phone.trim().length < 5) errors.push("Phone is required");
    if (phone && phone.length > MAX_LENGTHS.phone) errors.push("Phone is too long");
    if (!caseType) errors.push("Case type is required");
    if (caseType && caseType.length > MAX_LENGTHS.caseType)
      errors.push("Case type is too long");
    if (!urgency) errors.push("Urgency is required");
    if (urgency && urgency.length > MAX_LENGTHS.urgency)
      errors.push("Urgency is too long");
    if (!preferredContact) errors.push("Preferred contact method is required");
    if (preferredContact && preferredContact.length > MAX_LENGTHS.preferredContact)
      errors.push("Preferred contact is too long");
    if (!message || message.trim().length < 20)
      errors.push("Message must be at least 20 characters");
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
