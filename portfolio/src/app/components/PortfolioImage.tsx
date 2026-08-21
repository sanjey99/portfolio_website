import { useState } from "react";

interface PortfolioImageProps {
  src: string;
  alt: string;
  className?: string;
  loading?: "eager" | "lazy";
  fetchPriority?: "high" | "low" | "auto";
  sizes?: string;
}

export function PortfolioImage({
  src,
  alt,
  className = "",
  loading = "lazy",
  fetchPriority = "auto",
  sizes,
}: PortfolioImageProps) {
  const [state, setState] = useState<"loading" | "ready" | "error">("loading");
  const priorityAttribute =
    fetchPriority === "auto" ? {} : { fetchpriority: fetchPriority };

  if (state === "error") {
    return (
      <div className={`image-error ${className}`} role="img" aria-label={`${alt} unavailable`}>
        Image unavailable
      </div>
    );
  }

  return (
    <div className={`image-frame ${className}`}>
      {state === "loading" && <div className="image-skeleton" aria-hidden="true" />}
      <img
        src={src}
        alt={alt}
        className="image-content"
        loading={loading}
        decoding="async"
        {...priorityAttribute}
        sizes={sizes}
        onLoad={() => setState("ready")}
        onError={() => setState("error")}
        style={{ opacity: state === "ready" ? 1 : 0 }}
      />
    </div>
  );
}
