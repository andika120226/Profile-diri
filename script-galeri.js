/**
 * Professional Manga/Comic Panel Gallery with Lightbox
 * Fantasy-themed Interactive Gallery
 */

class MangaGallery {
  constructor() {
    this.currentImageIndex = 0;
    this.allPanels = [];
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
    // Get all gallery panels
    this.allPanels = Array.from(document.querySelectorAll('.gallery-panel'));

    if (this.allPanels.length === 0) return;

    // Add click handlers to all panels
    this.allPanels.forEach((panel, index) => {
      panel.addEventListener('click', () => this.openLightbox(index));
      panel.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          this.openLightbox(index);
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
    this.currentImageIndex = index;
    const panel = this.allPanels[index];
    const imageUrl = panel.dataset.image;
    const title = panel.dataset.title;

    this.lightboxImage.src = imageUrl;
    this.lightboxImage.alt = title;
    this.lightboxTitle.textContent = title;

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
    this.currentImageIndex = (this.currentImageIndex + 1) % this.allPanels.length;
    const panel = this.allPanels[this.currentImageIndex];
    const imageUrl = panel.dataset.image;
    const title = panel.dataset.title;

    this.lightboxImage.style.opacity = '0.5';
    this.lightboxImage.src = imageUrl;
    this.lightboxImage.alt = title;
    this.lightboxTitle.textContent = title;

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
      (this.currentImageIndex - 1 + this.allPanels.length) % this.allPanels.length;
    const panel = this.allPanels[this.currentImageIndex];
    const imageUrl = panel.dataset.image;
    const title = panel.dataset.title;

    this.lightboxImage.style.opacity = '0.5';
    this.lightboxImage.src = imageUrl;
    this.lightboxImage.alt = title;
    this.lightboxTitle.textContent = title;

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
  new MangaGallery();
});
