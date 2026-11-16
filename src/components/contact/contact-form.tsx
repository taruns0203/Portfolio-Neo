"use client";

import Image from "next/image";
import { useRef, useState, type FormEvent } from "react";
import { Button } from "@/components/ui/button";

export function ContactForm({
  email,
  subject,
  onSubjectChange,
}: {
  email: string | null;
  subject: string;
  onSubjectChange: (value: string) => void;
}) {
  const [notice, setNotice] = useState("");
  const [opening, setOpening] = useState(false);
  const busy = useRef(false);
  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (busy.current || !email) return;
    const form = event.currentTarget;
    const data = new FormData(form);
    const name = String(data.get("name") ?? "").trim();
    const message = String(data.get("message") ?? "").trim();
    const sender = String(data.get("email") ?? "").trim();
    if (name.length < 2 || message.length < 10) {
      setNotice(
        "Please enter at least 2 characters for your name and 10 for your message.",
      );
      (
        form.elements.namedItem(
          name.length < 2 ? "name" : "message",
        ) as HTMLElement
      )?.focus();
      return;
    }
    busy.current = true;
    setOpening(true);
    const body = `${message}\n\nFrom: ${name}\nReply to: ${sender}`;
    const href = `mailto:${email}?subject=${encodeURIComponent(subject.trim() || "Portfolio enquiry")}&body=${encodeURIComponent(body)}`;
    window.location.href = href;
    setNotice(
      "Your email app was requested. Review and send the draft there; nothing has been sent by this website. If no app opened, use the email link beside this form.",
    );
    window.setTimeout(() => {
      busy.current = false;
      setOpening(false);
    }, 1500);
  }
  return (
    <form
      className="contact-form"
      onSubmit={submit}
      aria-labelledby="contact-form-heading"
      aria-describedby="contact-form-note"
    >
      <div className="contact-form-title">
        <Image
          src="/assets/contact/tile-contact-mail.svg"
          width={52}
          height={52}
          alt=""
        />
        <div>
          <h3 id="contact-form-heading">Send a Message</h3>
          <p>Tell me about your idea, role or project.</p>
        </div>
      </div>
      <p id="contact-form-note" className="contact-form-note">
        Opens a draft in your email app. You review and send it there. Required
        fields are marked *.
      </p>
      <div className="contact-field">
        <label htmlFor="contact-name">
          Your Name <span aria-hidden="true">*</span>
        </label>
        <div className="contact-input-wrap">
          <Image
            src="/assets/contact/icon-user.svg"
            width={22}
            height={22}
            alt=""
          />
          <input
            id="contact-name"
            name="name"
            autoComplete="name"
            required
            minLength={2}
            maxLength={100}
            placeholder="Enter your name"
          />
        </div>
      </div>
      <div className="contact-field">
        <label htmlFor="contact-email">
          Your Email <span aria-hidden="true">*</span>
        </label>
        <div className="contact-input-wrap">
          <Image
            src="/assets/contact/icon-mail.svg"
            width={22}
            height={22}
            alt=""
          />
          <input
            id="contact-email"
            name="email"
            type="email"
            autoComplete="email"
            required
            maxLength={254}
            placeholder="Enter your email"
          />
        </div>
      </div>
      <div className="contact-field">
        <label htmlFor="contact-subject">Subject</label>
        <div className="contact-input-wrap">
          <Image
            src="/assets/contact/icon-tag.svg"
            width={22}
            height={22}
            alt=""
          />
          <input
            id="contact-subject"
            name="subject"
            value={subject}
            onChange={(event) => onSubjectChange(event.target.value)}
            maxLength={150}
            placeholder="Project, role or collaboration"
          />
        </div>
      </div>
      <div className="contact-field">
        <label htmlFor="contact-message">
          Message <span aria-hidden="true">*</span>
        </label>
        <div className="contact-input-wrap contact-textarea-wrap">
          <Image
            src="/assets/contact/icon-message.svg"
            width={22}
            height={22}
            alt=""
          />
          <textarea
            id="contact-message"
            name="message"
            required
            minLength={10}
            maxLength={3000}
            rows={5}
            placeholder="Write your message here…"
          />
        </div>
      </div>
      <Button
        type="submit"
        disabled={opening || !email}
        className="contact-submit"
        leadingIcon={
          <Image
            src="/assets/contact/icon-paper-plane.svg"
            width={24}
            height={24}
            alt=""
          />
        }
        trailingIcon={
          <Image
            src="/assets/contact/icon-arrow-right.svg"
            width={24}
            height={24}
            alt=""
          />
        }
      >
        {opening ? "Opening email app…" : "Open Email Draft"}
      </Button>
      {!email && (
        <p className="contact-form-note">Email contact is not available yet.</p>
      )}
      <p className="contact-form-feedback" role="status">
        {notice}
      </p>
    </form>
  );
}
