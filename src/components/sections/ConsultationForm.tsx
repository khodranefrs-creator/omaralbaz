"use client";

import { useState } from "react";
import type { Dictionary } from "@/i18n/get-dictionary";
import type { Locale } from "@/i18n/config";
import Input from "@/components/ui/Input";
import Select from "@/components/ui/Select";
import TextArea from "@/components/ui/TextArea";
import Button from "@/components/ui/Button";

interface ConsultationFormProps {
  dict: Dictionary;
  locale: Locale;
}

export default function ConsultationForm({ dict, locale }: ConsultationFormProps) {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const dir = locale === "ar" ? "rtl" : "ltr";

  const caseTypeOptions = [
    { value: "corporate", label: dict.services.corporate.title },
    { value: "contracts", label: dict.services.contracts.title },
    { value: "consultancy", label: dict.services.consultancy.title },
    { value: "dispute", label: dict.services.dispute.title },
    { value: "advisory", label: dict.services.advisory.title },
  ];

  const urgencyOptions = [
    { value: "normal", label: dict.contact.normal },
    { value: "urgent", label: dict.contact.urgent },
    { value: "veryUrgent", label: dict.contact.veryUrgent },
  ];

  const preferredContactOptions = [
    { value: "phone", label: dict.contact.phoneCall },
    { value: "email", label: dict.contact.emailContact },
    { value: "whatsapp", label: dict.contact.whatsapp },
  ];

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    setErrorMsg("");

    const form = e.currentTarget;
    const formData = new FormData(form);

    const data = {
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      phone: formData.get("phone") as string,
      caseType: formData.get("caseType") as string,
      urgency: formData.get("urgency") as string,
      preferredContact: formData.get("preferredContact") as string,
      message: formData.get("message") as string,
    };

    try {
      const res = await fetch("/api/consultation", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await res.json();

      if (!res.ok) {
        setStatus("error");
        setErrorMsg(result.error || dict.common.error);
        return;
      }

      setStatus("success");
      form.reset();
    } catch {
      setStatus("error");
      setErrorMsg(dict.common.error);
    }
  }

  return (
    <div>
      <h3 className="font-heading-ar text-2xl font-semibold text-navy-900 mb-2">
        {dict.contact.consultationTitle}
      </h3>
      <p className="text-warm-600 leading-relaxed mb-6">
        {dict.contact.consultationSubtitle}
      </p>

      {status === "success" && (
        <div className="mb-6 rounded-sm bg-green-50 border border-green-200 px-5 py-4 text-green-700">
          {dict.contact.consultationSuccess}
        </div>
      )}

      {status === "error" && (
        <div className="mb-6 rounded-sm bg-red-50 border border-red-200 px-5 py-4 text-red-700">
          {errorMsg}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-5">
        <input type="text" name="website" className="hidden" tabIndex={-1} autoComplete="off" />

        <Input label={dict.contact.name} name="name" required dir={dir} />
        <Input label={dict.contact.email} name="email" type="email" required dir={dir} />
        <Input label={dict.contact.phone} name="phone" type="tel" required dir={dir} />

        <Select
          label={dict.contact.caseType}
          name="caseType"
          options={caseTypeOptions}
          required
          placeholder={dict.contact.caseType}
        />
        <Select
          label={dict.contact.urgency}
          name="urgency"
          options={urgencyOptions}
          required
          placeholder={dict.contact.urgency}
        />
        <Select
          label={dict.contact.preferredContact}
          name="preferredContact"
          options={preferredContactOptions}
          required
          placeholder={dict.contact.preferredContact}
        />

        <TextArea label={dict.contact.message} name="message" required rows={6} />

        <Button
          type="submit"
          variant="primary"
          size="lg"
          disabled={status === "loading"}
          className="w-full"
        >
          {status === "loading" ? dict.common.loading : dict.contact.submitConsultation}
        </Button>
      </form>
    </div>
  );
}
