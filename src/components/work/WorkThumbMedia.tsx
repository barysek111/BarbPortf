import Image from "next/image";

export const WORK_THUMB_HOVER_ZOOM =
  "origin-center scale-100 transform-gpu transition-transform duration-[500ms] ease-in group-hover:scale-[1.04] group-focus-visible:scale-[1.04]";

export const WORK_THUMB_HOVER_GRAY =
  "grayscale-0 transition-[filter] duration-[200ms] ease-in group-hover:grayscale group-focus-visible:grayscale motion-reduce:transition-none";

export function isWorkVideo(src: string) {
  return src.endsWith(".mp4") || src.endsWith(".webm");
}

export function WorkThumbMedia({
  src,
  alt,
  height,
  hoverZoom = true,
}: {
  src: string;
  alt: string;
  height: number;
  hoverZoom?: boolean;
}) {
  const motion = hoverZoom ? WORK_THUMB_HOVER_ZOOM : "";
  const gray = hoverZoom ? WORK_THUMB_HOVER_GRAY : "";

  if (isWorkVideo(src)) {
    return (
      <div className="relative aspect-square w-full overflow-hidden">
        <div className={`relative h-full w-full ${motion}`}>
          <video
            src={src}
            autoPlay
            loop
            muted
            playsInline
            aria-label={alt}
            className={`absolute inset-0 h-full w-full object-cover object-top ${gray}`}
          />
        </div>
      </div>
    );
  }

  return (
    <div className={motion}>
      <Image
        src={src}
        alt={alt}
        width={372}
        height={height}
        sizes="(max-width: 809px) 50vw, 25vw"
        className={`block h-auto w-full rounded-none ${gray}`}
      />
    </div>
  );
}
