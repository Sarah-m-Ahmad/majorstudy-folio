const fadeElement = document.querySelectorAll(".fade-element");

document.addEventListener("scroll", function () {
  fadeElement.forEach((element) => {
    if (isInView(element)) {
      element.classList.add("element-visible");
    }
  });
});

function isInView(element) {
  const rect = element.getBoundingClientRect();
  return (
    rect.bottom > 0 &&
    rect.top <
      (window.innerHeight - 150 || document.documentElement.clientHeight - 150)
  );
}
