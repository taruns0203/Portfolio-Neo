import Image from "next/image";
import { site } from "@/config/site";

export function SocialLinks() {
  const links = site.contact.socials.filter((social) => social.href);
  if (!links.length) return null;
  return (
    <div className="contact-socials">
      <h3>Find me online</h3>
      <ul>
        {links.map((social) => (
          <li key={social.name}>
            <a
              href={social.href!}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${social.name} (opens in a new tab)`}
            >
              <Image
                src={`/assets/contact/${social.icon}`}
                width={30}
                height={30}
                alt=""
              />
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
