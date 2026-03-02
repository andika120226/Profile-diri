document.addEventListener("DOMContentLoaded", () => {
  const carousels = document.querySelectorAll("[data-carousel]");

  carousels.forEach((carousel) => {
    const track = carousel.querySelector("[data-carousel-track]");
    const buttons = carousel.querySelectorAll(".carousel-btn");

    if (!track || buttons.length === 0) return;

    const getScrollAmount = () => {
      const firstItem = track.querySelector(".carousel-item");
      if (!firstItem) return 0;
      const itemWidth = firstItem.getBoundingClientRect().width;
      const trackStyles = window.getComputedStyle(track);
      const gapValue = parseFloat(
        trackStyles.columnGap || trackStyles.gap || "0",
      );
      return itemWidth + gapValue;
    };

    buttons.forEach((button) => {
      button.addEventListener("click", () => {
        const direction = button.dataset.direction === "left" ? -1 : 1;
        const scrollAmount = getScrollAmount();
        track.scrollBy({ left: direction * scrollAmount, behavior: "smooth" });
      });
    });
  });

  // ===== HORIZONTAL PORTRAIT SCROLLING GALLERY NAVIGATION =====
  const galleryWrapper = document.querySelector(".gallery-wrapper");
  const galleryTrack = document.querySelector(".gallery-track");
  const navButtonPrev = document.querySelector(".nav-btn.prev");
  const navButtonNext = document.querySelector(".nav-btn.next");

  if (galleryWrapper && galleryTrack && navButtonPrev && navButtonNext) {
    // Fungsi untuk menghitung jumlah scroll berdasarkan lebar item dan gap
    const calculateScrollAmount = () => {
      const firstItem = galleryTrack.querySelector(".gallery-item");
      if (!firstItem) return 0;

      // Ambil dimensi item yang sebenarnya (width + gap)
      const itemWidth = firstItem.offsetWidth;
      const trackStyles = window.getComputedStyle(galleryTrack);
      const gapValue = parseFloat(trackStyles.gap || "0");

      // Total scroll amount = lebar item + gap
      return itemWidth + gapValue;
    };

    // Event listener untuk tombol navigasi kiri
    navButtonPrev.addEventListener("click", () => {
      const scrollAmount = calculateScrollAmount();
      galleryTrack.scrollBy({
        left: -scrollAmount,
        behavior: "smooth", // Smooth scrolling
      });
    });

    // Event listener untuk tombol navigasi kanan
    navButtonNext.addEventListener("click", () => {
      const scrollAmount = calculateScrollAmount();
      galleryTrack.scrollBy({
        left: scrollAmount,
        behavior: "smooth", // Smooth scrolling
      });
    });

    // Optional: Tambahkan keyboard navigation (arrow keys)
    document.addEventListener("keydown", (event) => {
      if (
        (event.key === "ArrowLeft" && event.target === galleryTrack) ||
        galleryTrack.contains(event.target)
      ) {
        navButtonPrev.click();
      } else if (
        (event.key === "ArrowRight" && event.target === galleryTrack) ||
        galleryTrack.contains(event.target)
      ) {
        navButtonNext.click();
      }
    });
  }
});
