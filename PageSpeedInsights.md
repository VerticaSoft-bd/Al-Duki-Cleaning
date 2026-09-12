This performance audit for aldukhicleaner.com details the current metrics and outlines targeted technical optimizations required to improve the desktop PageSpeed score.

Current Performance Metrics (Desktop)
Performance Score: 58 / 100

First Contentful Paint (FCP): 2.3 s

Largest Contentful Paint (LCP): 4.2 s (Needs improvement; target < 2.5 s)

Total Blocking Time (TBT): 150 ms

Speed Index (SI): 4.3 s

Cumulative Layout Shift (CLS): 0 (Perfect)

1. Image Delivery & Optimization (Highest Priority)
Unoptimized images are the single largest bottleneck on the site, contributing to an estimated 7.6 MB of unnecessary download weight.

Massive Background Image: The bg-image.png file is currently 7.53 MB. Converting this to a modern format (WebP or AVIF) and applying compression will save approximately 6.85 MB alone.

Next-Gen Formats: Convert all remaining PNG and JPEG assets, such as only-boy-removebg-preview.png (273 KiB) and logo.png (79 KiB), to WebP or AVIF.

Responsive Sizing: Images are being served much larger than their display containers. For example, Building Cleaning.webp is loaded at 1408x736 but displayed at 441x241, and ab-person2-2.webp is 636x257 but rendered at 570x230. Implement srcset attributes to serve appropriately sized images based on the user's viewport.

LCP Optimization: The Largest Contentful Paint element is the hero background (hero-3-saudi-males.webp). This image must be discoverable in the initial HTML document, avoid lazy loading entirely, and utilize the fetchpriority="high" attribute to ensure immediate loading.

2. Render-Blocking Resources
The initial page render is delayed by 2,070 ms due to synchronous loading of CSS and JavaScript files in the critical path.

CSS Delivery: There are multiple large stylesheets blocking the render, primarily pxl-style.min.css (811.4 KiB), along with several smaller post-specific CSS files (e.g., post-2511.css, post-176.css). Inline the critical CSS required for above-the-fold content directly into the HTML document.   

Defer Non-Critical CSS: Load non-critical stylesheets asynchronously using <link rel="preload" as="style"> combined with an onload event to swap the rel attribute to stylesheet.

3. Caching Policy Implementation
Repeat visits are heavily penalized due to missing Cache-Control headers on static assets, resulting in 2.2 MB of un-cached data.

Long-Term Caching: Configure the web server to set long cache lifetimes (e.g., 1 year or max-age=31536000) for static, immutable assets like images (specifically all the .webp files listed in the report), fonts, and compiled CSS/JS files.

4. Font Loading Optimization
Web fonts from FontAwesome and Bootstrap Icons are causing text visibility delays.

Font-Display Swap: Add font-display: swap to all @font-face declarations (or update the CDN link parameters where applicable) for fa-brands-400.woff2, fa-solid-900.woff2, and bootstrap-icons.woff2. This ensures text remains consistently visible using a fallback system font while the custom font downloads, saving approximately 70 ms.

5. JavaScript Execution & Forced Reflows
JavaScript execution is causing layout thrashing and forced reflows, which degrade interactivity and rendering speed.

Script Optimization: The theme relies heavily on jQuery and layout scripts (e.g., pxl-scroll-trigger.min.js, swiper.min.js, gsap.min.js) that query geometric properties before styles are fully calculated. Defer all non-essential JavaScript by adding the defer or async attribute to script tags so they execute after the main content is rendered.   

Remove Legacy Code: The site is serving polyfills (like flatpickr.min.js object assignment) to modern browsers, wasting bytes. Modify the JavaScript build process to prevent transpiling ES6+ code unless strictly required for older browser support.