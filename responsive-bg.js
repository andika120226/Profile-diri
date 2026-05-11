/**
 * Responsive Background Handler v2
 * Optimizes background images untuk semua ukuran perangkat
 * Mirip behavior framework Next.js - seamless & stable
 */

class ResponsiveBackground {
  constructor() {
    this.body = document.body;
    this.html = document.documentElement;
    this.init();
  }

  getDeviceType() {
    const width = window.innerWidth;
    if (width <= 480) return 'mobile';
    if (width <= 1023) return 'tablet';
    return 'desktop';
  }

  init() {
    // Force body dan html sizing
    this.forceSizing();
    
    // Terapkan optimasi background
    this.optimizeBackground();
    
    // Preload images
    this.preloadBackgrounds();
    
    // Setup listeners
    this.setupListeners();
    
    // Log for debugging
    console.log('ResponsiveBackground initialized:', {
      device: this.getDeviceType(),
      width: window.innerWidth,
      height: window.innerHeight
    });
  }

  forceSizing() {
    // Force proper HTML sizing
    this.html.style.width = '100%';
    this.html.style.height = '100%';
    this.html.style.margin = '0';
    this.html.style.padding = '0';
    this.html.style.overflowX = 'hidden';

    // Force proper body sizing
    this.body.style.width = '100%';
    this.body.style.minHeight = '100vh';
    this.body.style.margin = '0';
    this.body.style.padding = '0';
    this.body.style.position = 'relative';
    this.body.style.overflowX = 'hidden';
  }

  optimizeBackground() {
    const device = this.getDeviceType();
    const bgClass = this.body.className;

    // Apply based on background class
    if (bgClass.includes('bg-home') || bgClass.includes('bg-gambar')) {
      this.optimizeStandardBg(device);
    } else if (bgClass.includes('bg-dokumentasi')) {
      this.optimizeDokumentasiBg(device);
    } else if (bgClass.includes('bg-game')) {
      this.optimizeGameBg(device);
    }
  }

  optimizeStandardBg(device) {
    // Reset
    this.body.style.backgroundSize = 'cover';
    this.body.style.backgroundRepeat = 'no-repeat';
    this.body.style.backgroundPosition = device === 'mobile' ? 'center 0' : 'center center';
    
    // Attachment based on device
    this.body.style.backgroundAttachment = device === 'desktop' ? 'fixed' : 'scroll';
  }

  optimizeDokumentasiBg(device) {
    // Reset
    this.body.style.backgroundSize = 'cover';
    this.body.style.backgroundRepeat = 'no-repeat';
    this.body.style.backgroundPosition = device === 'mobile' ? 'center 0' : 'center center';
    
    // Attachment based on device
    this.body.style.backgroundAttachment = device === 'desktop' ? 'fixed' : 'scroll';
  }

  optimizeGameBg(device) {
    // For bg-game, handle the ::after pseudo-element behavior via CSS
    // The CSS media queries will handle this
    // Just ensure body sizing is correct
    this.body.style.backgroundSize = 'cover';
  }

  preloadBackgrounds() {
    const bgStyle = window.getComputedStyle(this.body).backgroundImage;
    if (bgStyle && bgStyle !== 'none') {
      const matches = bgStyle.match(/url\([^)]+\)/g);
      if (matches) {
        matches.forEach(match => {
          const url = match.replace(/url\(['"]?([^'"]+)['"]?\)/g, '$1');
          if (url && !url.includes('linear-gradient')) {
            const img = new Image();
            img.src = url;
            img.onerror = () => console.warn('Failed to preload:', url);
          }
        });
      }
    }
  }

  setupListeners() {
    let resizeTimeout;
    let lastWidth = window.innerWidth;

    // Only trigger on actual width change
    const handleResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        if (window.innerWidth !== lastWidth) {
          lastWidth = window.innerWidth;
          this.optimizeBackground();
          console.log('Background reoptimized for:', this.getDeviceType());
        }
      }, 300);
    };

    window.addEventListener('resize', handleResize, false);
    window.addEventListener('orientationchange', () => {
      setTimeout(() => {
        this.optimizeBackground();
        console.log('Orientation changed, optimized for:', this.getDeviceType());
      }, 100);
    }, false);
  }
}

// Initialize immediately if DOM is ready
if (document.readyState !== 'loading') {
  new ResponsiveBackground();
} else {
  document.addEventListener('DOMContentLoaded', () => {
    new ResponsiveBackground();
  });
}

// Fallback: Also initialize on window load
window.addEventListener('load', () => {
  if (!window._responsiveBgInitialized) {
    new ResponsiveBackground();
    window._responsiveBgInitialized = true;
  }
});
