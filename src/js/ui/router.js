const sections = {
  home: document.getElementById("home-page"),
  mealDetails: document.getElementById("meal-details"),
  productsSection: document.getElementById("products-section"),
  foodlogSection: document.getElementById("foodlog-section"),
};

const sidebar = document.getElementById("sidebar");
const links = document.querySelectorAll(".nav-link");

const pageToUrl = {
  home: "home",
  mealDetails: "home",
  productsSection: "products",
  foodlogSection: "foodlog",
};
const urlToPage = {
  home: "home",
  products: "productsSection",
  foodlog: "foodlogSection",
};

export function showPage(pageName, updateUrl = true) {
  for (const key in sections) {
    sections[key].classList.add("hidden");
  }

  sections[pageName].classList.remove("hidden");

  links.forEach((link) => {
    const isActive =
      link.dataset.page === pageName ||
      (pageName === "mealDetails" && link.dataset.page === "home");

    link.classList.toggle("bg-emerald-50", isActive);
    link.classList.toggle("text-emerald-700", isActive);
    link.classList.toggle("text-gray-600", !isActive);
  });
  if (updateUrl) {
    const urlName = pageToUrl[pageName];
    if (urlName) {
      window.location.hash = urlName;
    }
  }
}

document.addEventListener("click", (e) => {
  const clicked = e.target.closest(".nav-link");

  if (!clicked) return;

  e.preventDefault();

  const clickPageAtt = clicked.dataset.page;

  showPage(clickPageAtt);
});

function loadPageFromUrl() {
  const hash = window.location.hash.replace("#", "");
  const pageName = urlToPage[hash] || "home";
  showPage(pageName, false);
}
window.addEventListener("hashchange", loadPageFromUrl);
loadPageFromUrl();
