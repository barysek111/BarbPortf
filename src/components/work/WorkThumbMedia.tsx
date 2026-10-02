import Image from "next/image";

const HOVER_ZOOM =
  "origin-center scale-100 transform-gpu transition-transform duration-[1400ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-110 group-focus-visible:scale-110";

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
  const motion = hoverZoom ? HOVER_ZOOM : "";

  if (isWorkVideo(src)) {
    return (
      <div className="relative aspect-square w-full overflow-hidden">
        <video
          src={src}
          autoPlay
          loop
          muted
          playsInline
          aria-label={alt}
          className={`absolute inset-0 h-full w-full object-cover object-top ${motion}`}
        />
      </div>
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      width={372}
      height={height}
      sizes="(max-width: 809px) 50vw, 25vw"
      className={`block h-auto w-full rounded-none ${motion}`}
    />
  );
}
