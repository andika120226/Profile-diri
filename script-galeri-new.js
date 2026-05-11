/**
 * Professional Sketchbook Gallery with Lightbox
 * Art gallery with realistic opened sketchbook layout
 */

class SketchbookGallery {
  constructor() {
    this.currentImageIndex = 0;
    this.allImages = [];
    this.lightboxModal = document.getElementById('lightboxModal');
    this.lightboxImage = document.getElementById('lightboxImage');
    this.lightboxTitle = document.getElementById('lightboxTitle');
    this.lightboxClose = document.querySelector('.lightbox-close');
    this.lightboxNext = document.querySelector('.lightbox-next');
    this.lightboxPrev = document.querySelector('.lightbox-prev');

    this.init();
  }

  /**
   * Initialize gallery event listeners
   */
  init() {
    // Collect all page images from sketchbooks
    const pageContents = document.querySelectorAll('.page-content img');
    
    pageContents.forEach((img) => {
      this.allImages.push({
        src: img.src,
        alt: img.alt,
        title: img.alt
      });

      // Add click handler to each page
      img.addEventListener('click', (e) => {
        e.stopPropagation();
        const index = this.allImages.findIndex(item => item.src === img.src);
        this.openLightbox(index);
      });

      // Make images focusable
      img.setAttribute('tabindex', '0');
      img.style.cursor = 'pointer';

      // Add keyboard support
      img.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          const index = this.allImages.findIndex(item => item.src === img.src);
          this.openLightbox(index);
        }
      });
    });

    // Also add click to sketchbook cards
    const sketchbookCards = document.querySelectorAll('.sketchbook-card');
    sketchbookCards.forEach((card) => {
      card.addEventListener('click', (e) => {
        if (e.target.tagName === 'IMG') {
          const index = this.allImages.findIndex(item => item.src === e.target.src);
          if (index !== -1) {
            this.openLightbox(index);
          }
        }
      });
    });

    // Lightbox controls
    if (this.lightboxClose) {
      this.lightboxClose.addEventListener('click', () => this.closeLightbox());
    }

    if (this.lightboxNext) {
      this.lightboxNext.addEventListener('click', () => this.nextImage());
    }

    if (this.lightboxPrev) {
      this.lightboxPrev.addEventListener('click', () => this.previousImage());
    }

    // Modal click to close
    if (this.lightboxModal) {
      this.lightboxModal.addEventListener('click', (e) => {
        if (e.target === this.lightboxModal) {
          this.closeLightbox();
        }
      });
    }

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
      if (!this.lightboxModal || !this.lightboxModal.classList.contains('active')) {
        return;
      }

      switch (e.key) {
        case 'ArrowRight':
          this.nextImage();
          break;
        case 'ArrowLeft':
          this.previousImage();
          break;
        case 'Escape':
          this.closeLightbox();
          break;
      }
    });
  }

  /**
   * Open lightbox with image at specified index
   */
  openLightbox(index) {
    if (index < 0 || index >= this.allImages.length) return;
    
    this.currentImageIndex = index;
    const imageData = this.allImages[index];

    this.lightboxImage.src = imageData.src;
    this.lightboxImage.alt = imageData.alt;
    this.lightboxTitle.textContent = imageData.title;

    this.lightboxModal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  /**
   * Close the lightbox modal
   */
  closeLightbox() {
    this.lightboxModal.classList.remove('active');
    document.body.style.overflow = '';
  }

  /**
   * Navigate to next image
   */
  nextImage() {
    this.currentImageIndex = (this.currentImageIndex + 1) % this.allImages.length;
    const imageData = this.allImages[this.currentImageIndex];

    this.lightboxImage.style.opacity = '0.5';
    this.lightboxImage.src = imageData.src;
    this.lightboxImage.alt = imageData.alt;
    this.lightboxTitle.textContent = imageData.title;

    // Fade in animation
    setTimeout(() => {
      this.lightboxImage.style.transition = 'opacity 0.3s ease-in-out';
      this.lightboxImage.style.opacity = '1';
    }, 50);

    // Reset transition after animation
    this.lightboxImage.addEventListener(
      'transitionend',
      () => {
        this.lightboxImage.style.transition = 'none';
      },
      { once: true }
    );
  }

  /**
   * Navigate to previous image
   */
  previousImage() {
    this.currentImageIndex =
      (this.currentImageIndex - 1 + this.allImages.length) % this.allImages.length;
    const imageData = this.allImages[this.currentImageIndex];

    this.lightboxImage.style.opacity = '0.5';
    this.lightboxImage.src = imageData.src;
    this.lightboxImage.alt = imageData.alt;
    this.lightboxTitle.textContent = imageData.title;

    // Fade in animation
    setTimeout(() => {
      this.lightboxImage.style.transition = 'opacity 0.3s ease-in-out';
      this.lightboxImage.style.opacity = '1';
    }, 50);

    // Reset transition after animation
    this.lightboxImage.addEventListener(
      'transitionend',
      () => {
        this.lightboxImage.style.transition = 'none';
      },
      { once: true }
    );
  }
}

/**
 * Initialize gallery when DOM is ready
 */
document.addEventListener('DOMContentLoaded', () => {
  new SketchbookGallery();
});
