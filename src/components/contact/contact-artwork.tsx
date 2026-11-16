import Image from "next/image";

export function ContactArtwork() {
  return (
    <div className="contact-art" aria-hidden="true">
      <Image
        src="/assets/contact/decor-yellow-orb.svg"
        width={400}
        height={400}
        alt=""
        className="contact-orb"
      />
      <Image
        src="/assets/contact/contact-workspace-illustration.svg"
        width={760}
        height={450}
        alt=""
        className="contact-workspace"
      />
    </div>
  );
}
