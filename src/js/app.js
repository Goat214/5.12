import { products } from "./data.js";
import formatNumber from "./formatNumber.js";


const searchEl = document.getElementById("search");
const html = document.documentElement;
const themeToggler = document.getElementById("theme-toggler");
const theme = localStorage.getItem("theme");
const template = document.querySelector("template");
const productsList = document.getElementById("product-list");
const son = document.getElementById("son");
const productCounter = document.getElementById("product-counter")
const buyButton = document.getElementById("buy-button")




if (theme) {
  html.dataset.theme = theme;
  themeToggler.checked = theme === "luxury";
}

themeToggler.addEventListener("click", () => {
  html.dataset.theme = html.dataset.theme === "light" ? "luxury" : "light";
  localStorage.setItem("theme", html.dataset.theme);
  themeToggler.checked = html.dataset.theme === "luxury";
});
products.forEach((product) => {
  const clone = template.content.cloneNode(true);

  const {
    title,
    description: _description,
    thumbnail,
    price: _price,
    discountPercentage,
    rating: _rating,
    id,
  } = product;

  const cardImg = clone.querySelector(".card-imge");
  const cardTitle = clone.querySelector(".card-title");
  const rating = clone.querySelector(".rating");
  const description = clone.querySelector(".description");
  const price = clone.querySelector(".price");
  const discountPrice = clone.querySelector(".discount-price");
  const checkbox = clone.querySelector(".checkbox");


  cardTitle.textContent = title;
  description.textContent = _description;
  cardImg.src = thumbnail;
  price.textContent = formatNumber(_price);
  discountPrice.textContent = formatNumber(_price, discountPercentage);
  rating.textContent = "⭐ " + _rating + " (938 sharh)";
  checkbox.setAttribute("data-id", id);

  productsList.appendChild(clone);
});



document.addEventListener("change", (e) => {
  if (e.target.matches('input[type="checkbox"][data-id]')) {
    const selected = document.querySelectorAll(
      'input[type="checkbox"][data-id]:checked'
    );
    productCounter.textContent = selected.length;

    if (e.target.checked) {
      alert("Mahsulot qo‘shildi");

      const card = e.target.closest(".card");
      if (!card) {
        console.error("Card topilmadi");
        return;
      }

      const cardHTML = card.outerHTML;

      // oldingi localStorage ma'lumotlarini olamiz
      let savedCards = JSON.parse(localStorage.getItem("selectedCards")) || [];

      // dublikat bo‘lmasligi uchun tekshiramiz
      if (!savedCards.includes(cardHTML)) {
        savedCards.push(cardHTML);
        localStorage.setItem("selectedCards", JSON.stringify(savedCards));
        console.log("✅ Card saqlandi:", cardHTML);
      } else {
        console.log("⚠️ Bu card allaqachon mavjud");
      }
    }
  }
});


searchEl.addEventListener("input", () => {  
  const searchText = searchEl.value.toLowerCase();
  const titles = document.querySelectorAll(".card-title");

  titles.forEach((title) => {
    const card = title.closest("li");
    if (title.textContent.toLowerCase().includes(searchText)) {
      card.style.display = "block";  
    } else {
      card.style.display = "none";
    }
  });
});


const priceSort = document.getElementById("price-sort");
priceSort.addEventListener("change", (e) => {
  const value = e.target.options[e.target.selectedIndex].getAttribute("data-price");
  const productForSorting = [...products]
   if (value == "low") {
    const newSort = productForSorting.sort((a, b)=> {
      return (a.price - b.price )
    })
    console.log(newSort);
    
   }
});
