import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { getProjectNeighbor } from "@/content/projects";
import { isWorkVideo } from "@/components/work/WorkThumbMedia";
import { cn } from "@/lib/cn";

export function NextProject(
  props:
    | { slug: string }
    | {
        title: string;
        href: string;
        imageSrc?: string;
        imageHeight?: number;
        label: string;
      },
) {
  let title: string;
  let href: string;
  let imageSrc: string | undefined;
  let imageHeight: number | undefined;
  let label: string;

  if ("slug" in props) {
    const neighbor = getProjectNeighbor(props.slug);
    if (!neighbor) return null;
    title = neighbor.project.title;
    href = `/${neighbor.project.slug}`;
    imageSrc = neighbor.project.image;
    imageHeight = neighbor.project.imageH;
    label = neighbor.label;
  } else {
    ({ title, href, imageSrc, imageHeight, label } = props);
  }

  const hoverEase = "duration-[1400ms] ease-[cubic-bezier(0.16,1,0.3,1)]";
  const hoverZoom = `${hoverEase} group-hover:scale-125 group-has-[:focus-visible]:scale-125`;
  const hoverOverlay = `${hoverEase} group-hover:opacity-40 group-has-[:focus-visible]:opacity-40`;

  return (
    <section className="section-wrap pt-104 pb-96" data-name="Section - Next Project">
      <div className="group grid w-full place-items-center">
        {imageSrc ? (
          <Link
            href={href}
            aria-label={title}
            tabIndex={-1}
            className={cn(
              "relative col-start-1 row-start-1 overflow-hidden tablet:w-[25vw]",
              isWorkVideo(imageSrc) ? "aspect-square w-[50vw]" : "w-[50vw]",
            )}
          >
            {isWorkVideo(imageSrc) ? (
              <video
                src={imageSrc}
                autoPlay
                loop
                muted
                playsInline
                aria-hidden
                className={`absolute inset-0 h-full w-full object-cover object-top origin-center scale-100 transform-gpu transition-transform ${hoverZoom}`}
              />
            ) : (
              <Image
                src={imageSrc}
                alt=""
                width={372}
                height={imageHeight ?? 372}
                sizes="(max-width: 809px) 50vw, 25vw"
                className={`block h-auto w-full origin-center scale-100 transform-gpu transition-transform ${hoverZoom}`}
              />
            )}
            <span
              aria-hidden="true"
              className={`pointer-events-none absolute inset-0 bg-paper opacity-0 transition-opacity ${hoverOverlay}`}
            />
          </Link>
        ) : null}
        <div className="z-lift col-start-1 row-start-1 flex w-max max-w-full flex-col items-center justify-center gap-12 text-center">
          <Link href={href}>
            <h3 className="type-h3 appear" data-appear="60">
              <span>{title}</span>
            </h3>
          </Link>
          <Button href={href}>{label}</Button>
        </div>
      </div>
    </section>
  );
}
