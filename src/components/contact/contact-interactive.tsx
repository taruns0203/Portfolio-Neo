"use client";

import Image from "next/image";
import { useState, type ReactNode } from "react";
import { ContactForm } from "./contact-form";

const reasons = [
  {
    label: "Job Opportunities",
    subject: "Job opportunity",
    icon: "icon-briefcase.svg",
    tone: "mint",
  },
  {
    label: "Collaboration",
    subject: "Collaboration",
    icon: "icon-handshake.svg",
    tone: "yellow",
  },
  {
    label: "Product Ideas",
    subject: "Product idea",
    icon: "icon-rocket.svg",
    tone: "lavender",
  },
  {
    label: "Just a Chat",
    subject: "Just saying hello",
    icon: "icon-message.svg",
    tone: "pink",
  },
];

export function ContactInteractive({
  email,
  intro,
  details,
}: {
  email: string | null;
  intro: ReactNode;
  details: ReactNode;
}) {
  const [subject, setSubject] = useState("");
  return (
    <div className="contact-layout">
      <div className="contact-left">
        {intro}
        <div
          className="contact-reasons"
          role="group"
          aria-label="Choose a conversation topic"
        >
          {reasons.map((reason) => (
            <button
              key={reason.subject}
              type="button"
              className={`contact-reason contact-tone-${reason.tone}`}
              aria-pressed={subject === reason.subject}
              aria-controls="contact-subject"
              onClick={() => setSubject(reason.subject)}
            >
              <Image
                src={`/assets/contact/${reason.icon}`}
                width={26}
                height={26}
                alt=""
              />
              {reason.label}
            </button>
          ))}
        </div>
        {details}
      </div>
      <ContactForm
        email={email}
        subject={subject}
        onSubjectChange={setSubject}
      />
    </div>
  );
}
