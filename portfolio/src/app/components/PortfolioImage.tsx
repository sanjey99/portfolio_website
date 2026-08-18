import { useState } from "react";

interface PortfolioImageProps {
  src: string;
  alt: string;
  className?: string;
}

export function PortfolioImage({
  src,
  alt,
  className = "",
}: PortfolioImageProps) {
  const [state, setState] = useState<"loading" | "ready" | "error">("loading");

  if (state === "error") {
    return (
      <div
        className={`image-error ${className}`}
        role="img"
        aria-label={`${alt} unavailable`}
      >
        Image unavailable
      </div>
    );
  }

  return (
    <div className={`image-frame ${className}`}>
      {state === "loading" && (
        <div className="image-skeleton" aria-hidden="true" />
      )}
      <img
        src={src}
        alt={alt}
        className="image-content"
        onLoad={() => setState("ready")}
        onError={() => setState("error")}
        style={{ opacity: state === "ready" ? 1 : 0 }}
      />
    </div>
  );
}
