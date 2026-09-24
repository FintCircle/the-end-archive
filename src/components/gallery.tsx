import { useEffect, useState } from "react";
import { ArrowLeft, ArrowRight, Images, X } from "lucide-react";
import type { GalleryImage } from "@/lib/data";

export function SubjectGallery({
  subjectName,
  images,
}: {
  subjectName: string;
  images?: GalleryImage[];
}) {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(0);
  const gallery = images ?? [];

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
      if (event.key === "ArrowLeft")
        setSelected((current) => (current - 1 + gallery.length) % gallery.length);
      if (event.key === "ArrowRight") setSelected((current) => (current + 1) % gallery.length);
    };
    window.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [gallery.length, open]);

  if (!gallery.length) return null;

  const current = gallery[selected];
  const move = (direction: number) =>
    setSelected((index) => (index + direction + gallery.length) % gallery.length);
  const onTouchStart = (event: React.TouchEvent) => {
    const startX = event.changedTouches[0]?.clientX ?? 0;
    const onTouchEnd = (endEvent: TouchEvent) => {
      const delta = (endEvent.changedTouches[0]?.clientX ?? startX) - startX;
      if (Math.abs(delta) > 48) move(delta > 0 ? -1 : 1);
      window.removeEventListener("touchend", onTouchEnd);
    };
    window.addEventListener("touchend", onTouchEnd, { once: true });
  };

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label={`Open ${subjectName} gallery, ${gallery.length} images`}
        className="fixed bottom-5 right-5 z-20 flex items-center gap-2 border border-foreground/20 bg-background/95 px-3 py-2 font-mono text-xs shadow-sm backdrop-blur transition hover:border-foreground md:bottom-8 md:right-8"
      >
        <Images aria-hidden="true" data-icon="inline-start" /> {gallery.length}
      </button>

      {open && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`${subjectName} gallery`}
          className="fixed inset-0 z-50 overflow-y-auto bg-foreground/95 text-background"
        >
          <div className="mx-auto min-h-full max-w-6xl px-0 py-2 md:px-8 md:py-8">
            <div className="flex items-center justify-between gap-4 px-3 md:px-0">
              <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-background/60 md:text-xs">
                {subjectName} · Gallery
              </p>
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Close gallery"
                className="flex size-9 items-center justify-center border border-background/30 hover:border-background md:size-10"
              >
                <X aria-hidden="true" />
              </button>
            </div>

            <div className="relative mt-2 border-t border-background/20 pt-2 md:mt-8 md:pt-6">
              <div className="flex flex-col items-stretch gap-3 md:flex-row md:items-center md:justify-between md:gap-6">
                <figure
                  className="order-1 min-w-0 flex-1 touch-pan-y text-center"
                  onTouchStart={onTouchStart}
                >
                  <div className="flex min-h-[46vh] w-full items-center justify-center md:min-h-[56vh]">
                    <img
                      src={current.src}
                      alt={current.caption || `${subjectName} archive image ${selected + 1}`}
                      className="max-h-[57vh] w-full object-contain md:max-h-[64vh] md:w-auto"
                    />
                  </div>
                  <figcaption className="mx-0 mt-2 border-t border-background/20 px-3 pt-3 text-left md:mx-auto md:mt-5 md:max-w-2xl md:px-0 md:pt-4">
                    {current.caption && <p className="font-display text-xl leading-tight md:text-2xl">{current.caption}</p>}
                    <p className="mt-2 font-mono text-[10px] uppercase tracking-wider text-background/60 md:text-[11px]">
                      {current.date ? `${current.date} · ` : ""}
                      {current.source || "Source not recorded"} · {selected + 1} / {gallery.length}
                    </p>
                  </figcaption>
                </figure>
                <div className="order-2 flex justify-between gap-3 px-3 md:contents md:px-0">
                  <button
                    type="button"
                    onClick={() => move(-1)}
                    aria-label="Previous image"
                    className="flex h-10 flex-1 items-center justify-center border border-background/30 hover:border-background md:size-10 md:flex-none"
                  >
                    <ArrowLeft aria-hidden="true" />
                  </button>
                  <button
                    type="button"
                    onClick={() => move(1)}
                    aria-label="Next image"
                    className="flex h-10 flex-1 items-center justify-center border border-background/30 hover:border-background md:size-10 md:flex-none"
                  >
                    <ArrowRight aria-hidden="true" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export function GalleryAdmin({
  subjectName,
  images,
}: {
  subjectName: string;
  images?: GalleryImage[];
}) {
  const [items, setItems] = useState(images ?? []);
  const move = (index: number, direction: number) => {
    const next = [...items];
    const target = index + direction;
    if (target < 0 || target >= next.length) return;
    [next[index], next[target]] = [next[target], next[index]];
    setItems(next);
  };
  return (
    <section className="mt-8 border-t border-foreground pt-6">
      <div className="flex items-end justify-between gap-4">
        <div>
          <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
            Admin · Subject · Gallery
          </p>
          <h2 className="mt-2 font-display text-3xl font-bold">{subjectName}</h2>
        </div>
        <button
          type="button"
          className="border border-foreground bg-foreground px-3 py-2 font-mono text-xs uppercase text-background"
        >
          Add image
        </button>
      </div>
      <div className="mt-6 flex flex-col gap-4">
        {items.map((image, index) => (
          <article key={image.id} className="flex gap-4 border-b border-foreground/20 pb-4">
            <img src={image.src} alt="" className="size-24 object-cover" />
            <div className="min-w-0 flex-1">
              <p className="font-semibold">{image.caption || "Untitled image"}</p>
              <p className="mt-1 font-mono text-xs text-muted-foreground">
                {image.date || "No date"} · {image.source || "No source"}
              </p>
            </div>
            <div className="flex items-start gap-1">
              <button
                type="button"
                onClick={() => move(index, -1)}
                aria-label="Move image earlier"
                className="border px-2 py-1 font-mono text-xs"
              >
                ↑
              </button>
              <button
                type="button"
                onClick={() => move(index, 1)}
                aria-label="Move image later"
                className="border px-2 py-1 font-mono text-xs"
              >
                ↓
              </button>
              <button
                type="button"
                onClick={() => setItems(items.filter((item) => item.id !== image.id))}
                aria-label={`Delete ${image.caption || "image"}`}
                className="border border-destructive px-2 py-1 font-mono text-xs text-destructive"
              >
                Delete
              </button>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

export default SubjectGallery;

export type { GalleryImage };
