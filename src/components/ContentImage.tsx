import { useState, type ImgHTMLAttributes } from 'react';

type ContentImageProps = Omit<ImgHTMLAttributes<HTMLImageElement>, 'src'> & {
  src?: string;
};

export default function ContentImage({ src, alt, className, ...props }: ContentImageProps) {
  const [failed, setFailed] = useState(!src);

  if (!src || failed) {
    return (
      <div
        role="img"
        aria-label={`${alt} (photo unavailable locally)`}
        className={`${className ?? ''} flex items-center justify-center bg-muted text-muted-foreground`}
      >
        Photo not available locally
      </div>
    );
  }

  return (
    <img
      {...props}
      src={src}
      alt={alt}
      className={className}
      onError={() => setFailed(true)}
    />
  );
}
