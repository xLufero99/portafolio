import { useState } from 'react'
import { cn } from '@/lib/utils'

interface ImageWithFallbackProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  fallbackSrc?: string
}

export function ImageWithFallback({
  src,
  fallbackSrc = '/images/placeholder.png',
  alt = '',
  className,
  ...props
}: ImageWithFallbackProps) {
  const [error, setError] = useState(false)

  return (
    <img
      src={error ? fallbackSrc : src}
      alt={alt}
      className={cn('object-cover', className)}
      onError={() => setError(true)}
      {...props}
    />
  )
}