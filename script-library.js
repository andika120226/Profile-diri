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

  // ===== INTERACTIVE BOOK FUNCTIONALITY =====
  const bookModal = document.getElementById("bookModal");
  const openBookBtn = document.getElementById("openBookBtn");
  const closeBookBtn = document.getElementById("closeBookBtn");
  const leftPage = document.getElementById("leftPage");
  const rightPage = document.getElementById("rightPage");
  const prevPageBtn = document.getElementById("prevPageBtn");
  const nextPageBtn = document.getElementById("nextPageBtn");
  const pageIndicator = document.getElementById("pageIndicator");

  let currentPageIndex = 0;

  // Book Pages Data - Complete Lore Content
  const bookPages = [
    // Page 0-1: Table of Contents & Welcome
    {
      left: {
        title: "Table of Contents",
        content: `
          <ul class="toc-list">
            <li>Chapter 1: The Descenders</li>
            <li>Chapter 2: Nibelung Part I</li>
            <li>Chapter 3: Dragon Sovereigns</li>
            <li>Chapter 4: Three Moon Sisters</li>
            <li>Chapter 5: Moon Sisters Legacy</li>
            <li>Chapter 6: The Hexenzirkel</li>
            <li>Chapter 7: Hexenzirkel Overview</li>
          </ul>
        `,
      },
      right: {
        title: "Welcome to Genshin Impact Lore",
        content: `
          <p class="page-text">
            Selamat datang di buku koleksi lore Genshin Impact. Dalam buku ini, Anda akan menemukan berbagai cerita mendalam tentang dunia Teyvat, para Descenders, Dragon Sovereigns, dan misteri-misteri kosmik yang menyelimuti dunia ini.
          </p>
          <p class="page-text">
            Gunakan tombol navigasi di bawah untuk membalik halaman dan menjelajahi cerita-cerita menarik yang telah tersembunyi dalam timeline Genshin Impact.
          </p>
          <div class="page-decoration">✦</div>
        `,
      },
    },

    // Page 2-3: Chapter 1 - The Descenders
    {
      left: {
        title: "Chapter 1: The Descenders",
        content: `
          <p class="page-text">
            The Descenders adalah para pengembara dari luar Teyvat yang memiliki kekuatan luar biasa untuk mengubah takdir dunia. Mereka tidak termasuk dalam sistem Kehidupan Di sebuah Planet (Teyvat) dan mampu melawan nasib yang telah ditentukan.
          </p>
          <p class="page-text">
            Kehadiran mereka membawa perubahan besar bagi seluruh ekosistem Teyvat dan menjadi kunci dalam berbagai peristiwa bersejarah di dunia ini. Para Descenders memiliki kekuatan yang melampaui pemahaman penduduk Teyvat.
          </p>
        `,
      },
      right: {
        title: "The Power of Descenders",
        content: `
          <p class="page-text">
            Tidak seperti penduduk Teyvat yang terikat pada takdir dan sistem dunia, para Descenders memiliki kehendak bebas yang absolut. Mereka dapat membuat keputusan yang mengubah arah sejarah tanpa terikat pada hukum Celestia.
          </p>
          <p class="page-text">
            Kekuatan ini menjadikan mereka ancaman sekaligus harapan bagi dunia Teyvat. Setiap Descender yang datang membawa perubahan yang tidak dapat diprediksi oleh siapapun, mengubah alur waktu dan takdir yang telah ditetapkan.
          </p>
          <div class="page-decoration">✦</div>
        `,
      },
    },

    // Page 4-5: Chapter 2 - Nibelung Part I
    {
      left: {
        title: "Chapter 2: Nibelung Part I",
        content: `
          <p class="page-text">
            Nibelung, juga dikenal sebagai Second Who Came dan sebagai Takoja Ianikuinen oleh Frostmoon Scions, adalah Raja Naga dan Second Descender Teyvat yang memerintah planet tersebut sebelum kedatangan Heavenly Principles.
          </p>
          <p class="page-text">
            Ia adalah pencipta dari Tiga Bulan beserta dewi-dewinya, yang ia tunjuk untuk memerintah dunia saat ia pergi ke lautan bintang. Nibelung memiliki kekuatan kosmik yang luar biasa dan dipandang sebagai penguasa tertinggi di masa lalu.
          </p>
        `,
      },
      right: {
        title: "The Funerary Year",
        content: `
          <p class="page-text">
            Selama Funerary Year, Nibelung kembali ke Teyvat dan memperkenalkan Abyss ke dunia dalam upaya yang gagal untuk menghalau invasi Heavenly Principles. Namun, usahanya tidak berhasil dan ia terbunuh oleh mereka.
          </p>
          <p class="page-text">
            Nibelung digambarkan memiliki ukuran yang sangat besar, dan setelah tenggelam ke dalam abyss, memiliki sayap hitam yang luar biasa besar. Namun, Apep menggambarkannya memiliki sisik yang "bersinar terang," menunjukkan ia tidak berwarna hitam di masa lalu.
          </p>
          <div class="page-decoration">✦</div>
        `,
      },
    },

    // Page 6-7: Chapter 3 - Dragon Sovereigns
    {
      left: {
        title: "Chapter 3: Dragon Sovereigns",
        content: `
          <p class="page-text">
            Nibelung dan para Dragon Sovereigns adalah penguasa asli dari Teyvat sebelum kedatangan Primordial One. Mereka adalah makhluk kuno yang memiliki kekuatan kosmik dan memerintah dunia dengan segala keagungan mereka.
          </p>
          <p class="page-text">
            Setiap Dragon Sovereign menguasai elemen tertentu dan memiliki kekuatan yang setara dengan para dewa. Mereka adalah penjaga keseimbangan alami Teyvat sebelum sistem baru diberlakukan oleh para invader kosmik.
          </p>
        `,
      },
      right: {
        title: "The Fall of Dragons",
        content: `
          <p class="page-text">
            Kekacauan yang terjadi ketika Primordial One tiba mengubah segalanya, menciptakan titik balik dalam sejarah Teyvat dan takdir semua makhluk di dalamnya. Para Dragon Sovereigns dikalahkan satu per satu, dan kekuasaan mereka atas elemen-elemen dialihkan.
          </p>
          <p class="page-text">
            Meskipun telah jatuh, warisan mereka tetap hidup dalam berbagai bentuk di Teyvat modern. Beberapa bahkan menunggu kesempatan untuk bangkit kembali dan merebut kembali kekuasaan yang telah dirampas dari mereka.
          </p>
          <div class="page-decoration">✦</div>
        `,
      },
    },

    // Page 8-9: Chapter 4 - Three Moon Sisters
    {
      left: {
        title: "Chapter 4: Three Moon Sisters",
        content: `
          <p class="page-text">
            Aria, Sonnet, dan Canon adalah tiga saudari bulan kuno yang pernah bersinar di langit Teyvat. Mereka mewakili aspek-aspek kosmik yang berbeda dan memiliki ikatan emosional yang dalam satu sama lain.
          </p>
          <p class="page-text">
            Ketiga dewi bulan ini diciptakan oleh Nibelung untuk memerintah langit malam Teyvat. Mereka dikenal sebagai Bulan Abadi, Bulan Iridescent, dan Bulan Beku, masing-masing dengan kekuatan dan keindahan yang unik.
          </p>
        `,
      },
      right: {
        title: "The Tragedy of the Sisters",
        content: `
          <p class="page-text">
            Tragedi yang menimpa mereka adalah salah satu cerita paling sedih dalam mitologi Teyvat, menunjukkan betapa kuatnya cinta dan pengorbanan di antara mereka. Ketika perang kosmik meletus, para saudari ini harus membuat pilihan yang mustahil.
          </p>
          <p class="page-text">
            Kisah mereka menjadi pengingat bahwa bahkan makhluk kosmik yang paling kuat pun tidak terlepas dari nasib tragis. Cahaya mereka yang pernah menerangi langit Teyvat kini hanya tinggal kenangan dalam hati penduduk Teyvat.
          </p>
          <div class="page-decoration">✦</div>
        `,
      },
    },

    // Page 10-11: Chapter 5 - Moon Sisters Legacy
    {
      left: {
        title: "Chapter 5: Moon Sisters Legacy",
        content: `
          <p class="page-text">
            The Three Moon Sisters adalah tiga dewi bulan langit kuno yang dikaitkan dengan tiga dewi primordial, yang awalnya diciptakan oleh Raja Naga Nibelung untuk memerintah Teyvat primordial.
          </p>
          <p class="page-text">
            Setelah perang api pemakaman, Prinsip Surgawi menghancurkan Bulan Abadi dan Bulan Iridescent, serta mengasingkan Bulan Beku ke luar langit palsu, di mana ia tetap utuh namun tanpa kehidupan. Ini adalah salah satu kejadian paling kelam dalam sejarah Teyvat.
          </p>
        `,
      },
      right: {
        title: "The Frozen Moon's Return",
        content: `
          <p class="page-text">
            Ketiga Dewi Bulan kemudian gugur, dan sebuah "bayangan bulan" ilusi diproyeksikan ke langit malam Teyvat untuk menutupi nasib mereka. Bulan Beku akhirnya melahirkan Columbina sebagai Dewi Bulan barunya.
          </p>
          <p class="page-text">
            Setelah pertempuran terakhir melawan The Doctor, Bulan Beku yang asli ditarik turun ke dalam langit palsu dan dihidupkan kembali, setelah itu proyeksi ilusi tersebut segera menghilang, menandai era baru bagi Teyvat dan kembalinya keseimbangan kosmik.
          </p>
          <div class="page-decoration">✦</div>
        `,
      },
    },

    // Page 12-13: Chapter 6 - The Hexenzirkel
    {
      left: {
        title: "Chapter 6: The Hexenzirkel",
        content: `
          <p class="page-text">
            The Hexenzirkel adalah persekutuan rahasia para penyihir perkasa yang melakukan eksplorasi mendalam terhadap Irminsul. Mereka menguasai sihir tingkat tinggi dan berusaha mengungkap rahasia-rahasia tersembunyi dari pohon pencatat sejarah kosmik.
          </p>
          <p class="page-text">
            Aktivitas mereka sering menjadi ancaman terhadap status quo dan menarik perhatian entitas-entitas kuno yang lebih berkuasa. Koven ini terdiri dari beberapa makhluk paling kuat di Teyvat, dengan motivasi dan tujuan yang masih diselimuti misteri.
          </p>
        `,
      },
      right: {
        title: "Power Beyond Gods",
        content: `
          <p class="page-text">
            Sebagian dari anggota Hexenzirkel memiliki kemampuan yang bahkan menyaingi para dewa. Meskipun tidak pernah digambarkan secara eksplisit sebagai pihak yang baik maupun jahat, mereka tetap terlibat dalam peristiwa-peristiwa besar yang mengubah dunia, seperti Cataclysm.
          </p>
          <p class="page-text">
            Organisasi ini dikenal melakukan eksplorasi Irminsul dan memiliki pengetahuan yang luas tentang misteri serta hakikat sejati dunia. Mereka adalah kunci untuk memahami kebenaran Teyvat yang sesungguhnya.
          </p>
          <div class="page-decoration">✦</div>
        `,
      },
    },

    // Page 14-15: Chapter 7 - Hexenzirkel Overview
    {
      left: {
        title: "Chapter 7: Hexenzirkel Overview",
        content: `
          <p class="page-text">
            Tujuan, motif, dan sasaran Hexenzirkel diselimuti misteri. Koven ini terdiri dari beberapa makhluk paling kuat di Teyvat. Hexenzirkel pernah menantang otoritas Anemo Archon Barbatos, meskipun ia berhasil menenangkan mereka dan membawa konflik tersebut pada penyelesaian damai.
          </p>
          <p class="page-text">
            Mereka juga berada di balik penciptaan Simulanka, dunia cermin yang didasarkan pada Teyvat, serta Imaginarium Theatre. Rhinedottir terkenal dengan praktik Seni Khemia. Tanda tangannya, "bunga yang bukan berasal dari dunia ini," merujuk pada kemampuannya menciptakan kehidupan.
          </p>
        `,
      },
      right: {
        title: "Members & Their Powers",
        content: `
          <p class="page-text">
            Alice memiliki kekuatan untuk mengangkat atau membentuk seluruh sistem pulau sesuai kehendaknya, serta memiliki umur yang lebih panjang dibanding manusia biasa. Menurut Skirk, ia adalah "Penopang Batas Dunia."
          </p>
          <p class="page-text">
            Nicole menyadari perubahan yang terjadi pada Irminsul. Layaknya seorang nabi, ia hanya berbicara untuk menuntun orang menuju kebenaran ketika perubahan besar telah terjadi. Barbeloth adalah seorang astrolog yang memelopori studi tentang ramalan di Teyvat. Baru-baru ini, Hexenzirkel setuju untuk membantu Mondstadt di saat mereka membutuhkan.
          </p>
          <div class="page-decoration">✦ THE END ✦</div>
        `,
      },
    },
  ];

  // Open book modal
  if (openBookBtn) {
    openBookBtn.addEventListener("click", () => {
      bookModal.classList.add("active");
      document.body.style.overflow = "hidden";
      updatePages(); // Update to ensure fresh content
    });
  }

  // Close book modal
  const closeBook = () => {
    bookModal.classList.remove("active");
    document.body.style.overflow = "";
  };

  if (closeBookBtn) {
    closeBookBtn.addEventListener("click", closeBook);
  }

  // Close on overlay click
  const overlay = document.querySelector(".book-modal-overlay");
  if (overlay) {
    overlay.addEventListener("click", closeBook);
  }

  // Close on ESC key
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && bookModal.classList.contains("active")) {
      closeBook();
    }
  });

  // Update page content
  const updatePages = () => {
    const currentPages = bookPages[currentPageIndex];

    // Update left page
    leftPage.querySelector(".page-content").innerHTML = `
      <h3 class="page-title">${currentPages.left.title}</h3>
      ${currentPages.left.content}
      <div class="page-number">${currentPageIndex * 2 + 1}</div>
    `;

    // Update right page
    rightPage.querySelector(".page-content").innerHTML = `
      <h3 class="page-title">${currentPages.right.title}</h3>
      ${currentPages.right.content}
      <div class="page-number">${currentPageIndex * 2 + 2}</div>
    `;

    // Update page indicator
    pageIndicator.textContent = `Page ${currentPageIndex * 2 + 1}-${currentPageIndex * 2 + 2} of ${bookPages.length * 2}`;

    // Update button states
    prevPageBtn.disabled = currentPageIndex === 0;
    nextPageBtn.disabled = currentPageIndex === bookPages.length - 1;
  };

  // Next page with flip animation
  if (nextPageBtn) {
    nextPageBtn.addEventListener("click", () => {
      if (currentPageIndex < bookPages.length - 1) {
        // Add flip animation
        rightPage.classList.add("flip-left");
        leftPage.classList.add("flip-left");

        // Play page flip sound effect (optional)
        // const flipSound = new Audio('path/to/page-flip.mp3');
        // flipSound.play();

        setTimeout(() => {
          currentPageIndex++;
          updatePages();
          rightPage.classList.remove("flip-left");
          leftPage.classList.remove("flip-left");
        }, 900); // Match animation duration
      }
    });
  }

  // Previous page with flip animation
  if (prevPageBtn) {
    prevPageBtn.addEventListener("click", () => {
      if (currentPageIndex > 0) {
        // Add flip animation
        rightPage.classList.add("flip-right");
        leftPage.classList.add("flip-right");

        setTimeout(() => {
          currentPageIndex--;
          updatePages();
          rightPage.classList.remove("flip-right");
          leftPage.classList.remove("flip-right");
        }, 900); // Match animation duration
      }
    });
  }

  // Keyboard navigation for book
  document.addEventListener("keydown", (e) => {
    if (bookModal.classList.contains("active")) {
      if (e.key === "ArrowRight" && !nextPageBtn.disabled) {
        nextPageBtn.click();
      } else if (e.key === "ArrowLeft" && !prevPageBtn.disabled) {
        prevPageBtn.click();
      }
    }
  });

  // Initialize first page
  if (leftPage && rightPage) {
    updatePages();
  }
});
