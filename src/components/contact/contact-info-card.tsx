"use client";

import Image from "next/image";
import { useState } from "react";

export function ContactInfoCard({
  label,
  value,
  icon,
  href,
}: {
  label: string;
  value: string;
  icon: string;
  href?: string;
}) {
  const [feedback, setFeedback] = useState("");
  async function copy() {
    try {
      await navigator.clipboard.writeText(value);
      setFeedback(`${label} copied.`);
    } catch {
      setFeedback(
        `Couldn't copy. Select and copy the ${label.toLowerCase()} above.`,
      );
    }
  }
  return (
    <div className="contact-info-card">
      <Image src={`/assets/contact/${icon}`} width={42} height={42} alt="" />
      <div className="contact-info-text">
        <p>{label}</p>
        {href ? <a href={href}>{value}</a> : <span>{value}</span>}
      </div>
      <button
        type="button"
        className="contact-copy"
        aria-label={`Copy ${label.toLowerCase()}`}
        onClick={copy}
      >
        <Image
          src="/assets/contact/icon-copy.svg"
          width={22}
          height={22}
          alt=""
        />
      </button>
      <p className="contact-copy-feedback" role="status">
        {feedback}
      </p>
    </div>
  );
}
