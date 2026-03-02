/**
 * ==============================================
 * DOKUMENTASI PROJEK - JAVASCRIPT
 * ==============================================
 * Handles horizontal scrolling gallery navigation
 * for the Ubuntu screenshots section.
 */

(function () {
  "use strict";

  // ==========================================
  // HORIZONTAL GALLERY SCROLL FUNCTIONALITY
  // ==========================================

  /**
   * Initialize horizontal scrolling gallery with arrow navigation
   */
  function initHorizontalGallery() {
    const galleryContainer = document.getElementById("ubuntuGallery");
    const leftButton = document.querySelector(".gallery-nav-left");
    const rightButton = document.querySelector(".gallery-nav-right");

    // Exit if gallery elements don't exist
    if (!galleryContainer || !leftButton || !rightButton) {
      console.warn("Gallery elements not found");
      return;
    }

    /**
     * Scroll the gallery by one slide width
     * @param {string} direction - 'left' or 'right'
     */
    function scrollGallery(direction) {
      const slideWidth =
        galleryContainer.querySelector(".gallery-slide").offsetWidth;
      const gap = 16; // Gap between slides (must match CSS)
      const scrollAmount = slideWidth + gap;

      if (direction === "left") {
        galleryContainer.scrollBy({
          left: -scrollAmount,
          behavior: "smooth",
        });
      } else if (direction === "right") {
        galleryContainer.scrollBy({
          left: scrollAmount,
          behavior: "smooth",
        });
      }
    }

    // Event Listeners for Arrow Buttons
    leftButton.addEventListener("click", function () {
      scrollGallery("left");
    });

    rightButton.addEventListener("click", function () {
      scrollGallery("right");
    });

    // Optional: Keyboard navigation (arrow keys when gallery is focused)
    galleryContainer.addEventListener("keydown", function (event) {
      if (event.key === "ArrowLeft") {
        scrollGallery("left");
      } else if (event.key === "ArrowRight") {
        scrollGallery("right");
      }
    });

    // Optional: Show/hide arrows based on scroll position
    function updateArrowVisibility() {
      const maxScrollLeft =
        galleryContainer.scrollWidth - galleryContainer.clientWidth;

      // Hide left arrow if at the start
      if (galleryContainer.scrollLeft <= 0) {
        leftButton.style.opacity = "0.3";
        leftButton.style.pointerEvents = "none";
      } else {
        leftButton.style.opacity = "1";
        leftButton.style.pointerEvents = "auto";
      }

      // Hide right arrow if at the end
      if (galleryContainer.scrollLeft >= maxScrollLeft - 5) {
        rightButton.style.opacity = "0.3";
        rightButton.style.pointerEvents = "none";
      } else {
        rightButton.style.opacity = "1";
        rightButton.style.pointerEvents = "auto";
      }
    }

    // Initialize arrow visibility
    updateArrowVisibility();

    // Update arrow visibility on scroll
    galleryContainer.addEventListener("scroll", updateArrowVisibility);

    // Update arrow visibility on window resize
    window.addEventListener("resize", updateArrowVisibility);
  }

  // ==========================================
  // INITIALIZE ON DOM READY
  // ==========================================

  // Wait for DOM to be fully loaded
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initHorizontalGallery);
  } else {
    // DOM is already ready
    initHorizontalGallery();
  }
})();
