"use client";

import { useState } from "react";
import type { Dictionary } from "@/i18n/get-dictionary";
import type { Locale } from "@/i18n/config";
import Input from "@/components/ui/Input";
import TextArea from "@/components/ui/TextArea";
import Button from "@/components/ui/Button";

interface ContactFormProps {
  dict: Dictionary;
  locale: Locale;
}

export default function ContactForm({ dict, locale }: ContactFormProps) {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const dir = locale === "ar" ? "rtl" : "ltr";

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
      subject: formData.get("subject") as string,
      message: formData.get("message") as string,
    };

    try {
      const res = await fetch("/api/contact", {
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
        {dict.contact.formTitle}
      </h3>

      {status === "success" && (
        <div className="mb-6 rounded-sm bg-green-50 border border-green-200 px-5 py-4 text-green-700">
          {dict.contact.success}
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
        <Input label={dict.contact.phone} name="phone" type="tel" dir={dir} />
        <Input label={dict.contact.subject} name="subject" required dir={dir} />
        <TextArea label={dict.contact.message} name="message" required />

        <Button
          type="submit"
          variant="primary"
          size="lg"
          disabled={status === "loading"}
          className="w-full"
        >
          {status === "loading" ? dict.common.loading : dict.contact.submit}
        </Button>
      </form>
    </div>
  );
}
