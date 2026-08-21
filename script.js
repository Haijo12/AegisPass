const nav = document.querySelector(".nav nav");
const menuBtn = document.querySelector(".menu-btn");

menuBtn?.addEventListener("click", () => {
  nav.classList.toggle("open");
});


document.querySelectorAll("nav a").forEach((link) => {

  link.addEventListener("click", () => {
    nav.classList.remove("open");
  });

});


function showToast() {

  const toast = document.getElementById("toast");

  toast.classList.add("show");

  setTimeout(() => {
    toast.classList.remove("show");
  }, 2800);

}