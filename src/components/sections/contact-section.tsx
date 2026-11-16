import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { ContactIntro } from "@/components/contact/contact-intro";
import { ContactInteractive } from "@/components/contact/contact-interactive";
import { ContactInfoCard } from "@/components/contact/contact-info-card";
import { SocialLinks } from "@/components/contact/social-links";
import { site } from "@/config/site";

export function ContactSection() {
  return (
    <Section
      decoration="contact"
      id="contact"
      aria-labelledby="contact-heading"
      className="contact-section"
    >
      <Container className="max-w-home">
        <ContactInteractive
          email={site.contact.email}
          intro={<ContactIntro />}
          details={
            <>
              <div className="contact-info-grid">
                {site.contact.email && (
                  <ContactInfoCard
                    label="Email"
                    value={site.contact.email}
                    href={`mailto:${site.contact.email}`}
                    icon="tile-contact-mail.svg"
                  />
                )}
                <ContactInfoCard
                  label="Location"
                  value={site.contact.location}
                  icon="tile-contact-location.svg"
                />
              </div>
              <p className="contact-phone">
                <span>Phone</span>
                <a href={site.contact.phoneHref}>{site.contact.phone}</a>
              </p>
              <SocialLinks />
            </>
          }
        />
      </Container>
    </Section>
  );
}
