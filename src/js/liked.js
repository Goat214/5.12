const cartList = document.getElementById("cart-list");
const template = document.getElementById("cart-template");

let cart = JSON.parse(localStorage.getItem("cart")) || [];

function renderCart() {
  cartList.innerHTML = "";
  cart.forEach((product) => {
    const clone = template.content.cloneNode(true);

    clone.querySelector(".card-img").src = product.thumbnail;
    clone.querySelector(".card-title").textContent = product.title;
    clone.querySelector(".price").textContent = `Narxi: ${product.price} so‘m`;
    clone.querySelector(".description").textContent = product.description;

    const removeBtn = clone.querySelector(".remove-btn");
    removeBtn.addEventListener("click", () => {
      cart = cart.filter((p) => p.id !== product.id);
      localStorage.setItem("cart", JSON.stringify(cart));
      renderCart();
    });

    cartList.appendChild(clone);
  });
}

renderCart();
