document.addEventListener("DOMContentLoaded", () => {
  const typingTarget = document.getElementById("typing-text");
  if (typingTarget) {
    const fullText = typingTarget.getAttribute("data-text") || "";
    let index = 0;

    const typeNext = () => {
      typingTarget.textContent = fullText.slice(0, index);
      index += 1;
      if (index <= fullText.length) {
        window.setTimeout(typeNext, 45);
      }
    };

    typeNext();
  }

  const navLinks = document.querySelectorAll('.nav-links a[href^="#"]');
  navLinks.forEach((link) => {
    link.addEventListener("click", (event) => {
      event.preventDefault();
      const targetId = link.getAttribute("href");
      if (!targetId) return;
      const section = document.querySelector(targetId);
      if (!section) return;
      section.scrollIntoView({ behavior: "smooth" });
    });
  });
});
