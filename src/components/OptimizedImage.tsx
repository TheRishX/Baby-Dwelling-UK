import React, { useState, useEffect, forwardRef, useMemo } from 'react';
import { optimizeImageUrl } from '../utils/imageOptimizer';

interface OptimizedImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  width?: number;
  height?: number;
  quality?: number;
  siteConfig?: any;
  fallbackSrc?: string;
  className?: string;
  alt?: string;
  loading?: 'lazy' | 'eager';
}

const OptimizedImage = forwardRef<HTMLImageElement, OptimizedImageProps>(({
  src,
  width,
  height,
  quality,
  siteConfig,
  fallbackSrc = 'https://images.unsplash.com/photo-1544126592-807adc21510d?auto=format&fit=crop&w=1000&q=80',
  className,
  alt = 'Image',
  loading,
  ...props
}, ref) => {
  const [hasError, setHasError] = useState(false);

  // Reset error state when the image source changes
  useEffect(() => {
    setHasError(false);
  }, [src]);

  // Retrieve/resolve the site configuration safely
  const resolvedConfig = useMemo(() => {
    return siteConfig || {};
  }, [siteConfig]);

  // Extract primitive fields to prevent reference changes from triggering unnecessary updates/re-renders
  const imgCdnMode = resolvedConfig.imgCdnMode;
  const cloudinaryCloudName = resolvedConfig.cloudinaryCloudName;
  const imgixDomain = resolvedConfig.imgixDomain;
  const imgQuality = resolvedConfig.imgQuality;
  const imgAutoWebp = resolvedConfig.imgAutoWebp;
  const imgLazyLoad = resolvedConfig.imgLazyLoad;

  // Generate the optimized URL synchronously during render
  const optimizedUrl = useMemo(() => {
    if (!src) return fallbackSrc;
    return optimizeImageUrl(src, resolvedConfig, { width, height, quality });
  }, [src, imgCdnMode, cloudinaryCloudName, imgixDomain, imgQuality, imgAutoWebp, width, height, quality, fallbackSrc]);

  // Determine which source to display based on error/fallback status
  const displaySrc = useMemo(() => {
    if (!hasError) {
      return optimizedUrl || fallbackSrc;
    }
    // If the optimized CDN proxy failed, try the original direct unproxied source first as a backup
    if (src && optimizedUrl !== src) {
      return src;
    }
    return fallbackSrc;
  }, [hasError, src, optimizedUrl, fallbackSrc]);

  const handleError = () => {
    if (!hasError) {
      setHasError(true);
    }
  };

  // Ensure we pass undefined (which removes the attribute entirely in React) instead of an empty string
  const finalSrc = displaySrc || undefined;

  return (
    <img
      ref={ref}
      src={finalSrc}
      alt={alt}
      onError={handleError}
      className={className}
      referrerPolicy="no-referrer"
      loading={loading || (imgLazyLoad !== false ? 'lazy' : undefined)}
      {...props}
    />
  );
});

OptimizedImage.displayName = 'OptimizedImage';

export default OptimizedImage;
