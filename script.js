const fadeElement = document.querySelectorAll(".fade-element");
const navLinks = document.querySelectorAll("nav a");
const navSections = Array.from(navLinks, (link) => ({
  link,
  section: document.getElementById(link.hash.slice(1)),
})).filter(({ section }) => section);

// Fade transition credit: https://www.youtube.com/watch?v=0QLLgyqqf8w
document.addEventListener("scroll", function () {
  fadeElement.forEach((element) => {
    if (isInView(element)) {
      element.classList.add("element-visible");
    }
  });
  updateActiveNav();
});

function isInView(element) {
  const rect = element.getBoundingClientRect();
  return (
    rect.bottom > 0 &&
    rect.top <
      (window.innerHeight - 150 || document.documentElement.clientHeight - 150)
  );
}

// Copilot generated code, finds location and updates to match the nav
function updateActiveNav() {
  if (navSections.length === 0) return;

  const activationPoint = window.innerHeight * 0.3;
  let activeLink = navSections[0].link;

  navSections.forEach(({ link, section }) => {
    if (section.getBoundingClientRect().top <= activationPoint) {
      activeLink = link;
    }
  });

  if (
    window.scrollY + window.innerHeight >=
    document.documentElement.scrollHeight - 2
  ) {
    activeLink = navSections[navSections.length - 1].link;
  }

  navSections.forEach(({ link }) => {
    const isActive = link === activeLink;
    link.classList.toggle("active", isActive);

    if (isActive) {
      link.setAttribute("aria-current", "location");
    } else {
      link.removeAttribute("aria-current");
    }
  });
}

updateActiveNav();
window.addEventListener("hashchange", updateActiveNav);
