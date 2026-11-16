import { Button } from "@/components/ui/button";
import { site, type SiteDestination } from "@/config/site";

export function DestinationNotices() {
  return (
    <>
      {Object.values(site.destinations).map((destination: SiteDestination) =>
        destination.noticeId ? (
          <dialog
            key={destination.noticeId}
            id={destination.noticeId}
            aria-labelledby={`${destination.noticeId}-title`}
            aria-describedby={`${destination.noticeId}-description`}
            className="destination-notice"
          >
            <p className="eyebrow mb-4 text-muted-foreground">
              A little more to come
            </p>
            <h2 id={`${destination.noticeId}-title`} className="type-h3">
              {destination.label} is on its way.
            </h2>
            <p
              id={`${destination.noticeId}-description`}
              className="mt-4 text-muted-foreground"
            >
              {destination.noticeId === "github" ||
              destination.noticeId === "contact"
                ? "This link hasn’t been added yet. Please check back soon."
                : "This part of the portfolio is still being put together. Check back soon for the full story."}
            </p>
            <form method="dialog" className="mt-8">
              <Button type="submit" variant="secondary">
                Back to the portfolio
              </Button>
            </form>
          </dialog>
        ) : null,
      )}
    </>
  );
}
