/**
 * Utility to optimize, resize, compress, and cache images using Cloud CDN Image Proxies.
 * Supports:
 * 1. wsrv.nl (Free, zero-config, ultra-fast image resizer & WebP CDN proxy based on Cloudflare & Photon)
 * 2. Cloudinary Fetch API (Enterprise image transformation using a custom Cloud Name)
 * 3. Imgix Web Proxy (Transformations via custom Imgix domains)
 * 4. Fallback/None (Passes through original image URLs)
 */

export function optimizeImageUrl(
  url: string,
  siteConfig: any = {},
  options?: { width?: number; height?: number; quality?: number }
): string {
  if (!url) return '';

  // 1. If it's a base64 string or blob, we cannot proxy it through an external CDN fetch. Return as-is.
  if (url.startsWith('data:') || url.startsWith('blob:')) {
    return url;
  }

  // 2. Resolve relative URLs (like local /uploads/) by prepending the window origin so proxies can fetch them
  let absoluteUrl = url;
  if (url.startsWith('/')) {
    if (typeof window !== 'undefined') {
      absoluteUrl = `${window.location.origin}${url}`;
    }
  }

  // Auto-load config from localStorage if empty
  let activeConfig = siteConfig;
  if (!activeConfig || Object.keys(activeConfig).length === 0) {
    if (typeof window !== 'undefined') {
      try {
        const saved = window.localStorage.getItem('bd_site_config_v1');
        if (saved) {
          activeConfig = JSON.parse(saved);
        }
      } catch (e) {
        // ignore
      }
    }
  }
  if (!activeConfig) {
    activeConfig = {};
  }

  const mode = activeConfig.imgCdnMode || 'wsrv';
  const configQuality = activeConfig.imgQuality !== undefined ? activeConfig.imgQuality : 82;
  const quality = options?.quality || configQuality;
  const autoWebp = activeConfig.imgAutoWebp !== false;

  const w = options?.width;
  const h = options?.height;

  switch (mode) {
    case 'wsrv': {
      // wsrv.nl is an amazing, free, zero-config image proxy that supports caching and resizing.
      let proxyUrl = `https://wsrv.nl/?url=${encodeURIComponent(absoluteUrl)}`;
      if (w) proxyUrl += `&w=${w}`;
      if (h) proxyUrl += `&h=${h}&fit=cover`;
      if (quality) proxyUrl += `&q=${quality}`;
      if (autoWebp) proxyUrl += `&output=webp`;
      return proxyUrl;
    }

    case 'cloudinary': {
      // Cloudinary Fetch API: https://res.cloudinary.com/<cloud_name>/image/fetch/<transformations>/<url>
      const cloudName = activeConfig.cloudinaryCloudName || 'demo';
      const transforms: string[] = [];
      
      if (autoWebp) transforms.push('f_auto');
      transforms.push(`q_auto:${quality || 'good'}`);
      
      if (w && h) {
        transforms.push(`c_fill,w_${w},h_${h}`);
      } else if (w) {
        transforms.push(`c_limit,w_${w}`);
      } else if (h) {
        transforms.push(`c_limit,h_${h}`);
      }

      const transformStr = transforms.length > 0 ? transforms.join(',') + '/' : '';
      return `https://res.cloudinary.com/${cloudName}/image/fetch/${transformStr}${absoluteUrl}`;
    }

    case 'imgix': {
      // Imgix Web Proxy: https://<your-source>.imgix.net/<url>?w=<w>&h=<h>&q=<q>
      const imgixDomain = activeConfig.imgixDomain || 'demo.imgix.net';
      const cleanDomain = imgixDomain.replace(/^(https?:\/\/)?/, '').replace(/\/$/, '');
      
      let proxyUrl = `https://${cleanDomain}/${encodeURIComponent(absoluteUrl)}`;
      const params: string[] = [];
      
      if (autoWebp) params.push('auto=format,compress');
      else params.push('auto=compress');
      
      if (w) params.push(`w=${w}`);
      if (h) params.push(`h=${h}&fit=crop`);
      if (quality) params.push(`q=${quality}`);
      
      return `${proxyUrl}?${params.join('&')}`;
    }

    case 'none':
    default:
      return absoluteUrl;
  }
}
