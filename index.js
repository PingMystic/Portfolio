let barsIcon = document.querySelector(".header .bars-icon");
let mobileMenu = document.querySelector(".header .mobile");
let topHeader = document.querySelector(".header");

window.addEventListener("scroll", () => {
  if(window.scrollY > 70) {
    topHeader.style.background = "#121212";
    topHeader.style.transition = ".3s";
  } else {
    topHeader.style.background = "transparent";
    topHeader.style.transition = ".3s";
  };
});

let closeMobIcon = document.querySelector(".header .close-mob");
barsIcon.addEventListener("click", showMobile);
function showMobile() {
  mobileMenu.style.visibility = "visible";
  mobileMenu.style.opacity = "1";
  mobileMenu.style.transition = ".3s";
  closeMobIcon.style.visibility = "visible";
  closeMobIcon.style.opacity = "1";
  closeMobIcon.style.display = "flex";
  closeMobIcon.style.transition = ".3s";
  barsIcon.style.visibility = "hidden";
  barsIcon.style.opacity = "0";
  barsIcon.style.transition = ".3s";
};
closeMobIcon.addEventListener("click", hideMobile);
function hideMobile() {
  mobileMenu.style.visibility = "hidden";
  mobileMenu.style.opacity = "0";
  mobileMenu.style.transition = ".3s";
  closeMobIcon.style.visibility = "hidden";
  closeMobIcon.style.opacity = "0";
  closeMobIcon.style.display = "none";
  closeMobIcon.style.transition = ".3s";
  barsIcon.style.visibility = "visible";
  barsIcon.style.opacity = "1";
  barsIcon.style.transition = ".3s";
}

let rightArrow = document.querySelector(".right-arrow");
let leftArrow = document.querySelector(".left-arrow");
let skillsCont = document.querySelector(".skills .boxes-cont");
let skillBoxes = document.querySelectorAll(".skill-box");

let currentBox = 1;


rightArrow.addEventListener("click", () => {
  currentBox++;
  updateBox();
});
leftArrow.addEventListener("click", () => {
  currentBox--;
  updateBox();
});

function updateBox() {
  if (currentBox > skillBoxes.length - 2) {
    currentBox = 1;
  } else if (currentBox < 1) {
    currentBox = skillBoxes.length - 2;
  };
  skillsCont.style.transform = `translateX(-${(currentBox - 1) * 240}px)`;
};

setInterval(() => {
  updateBox();
  currentBox++;
}, 3000);

// 

let shoppingCart = document.querySelector(".shopping-cart");
let cartIcon = document.querySelectorAll(".header .cart-icon");
let xmark = document.querySelector(".shopping-cart .xmark");

for (let i = 0; i < cartIcon.length; i++) {
  cartIcon[i].addEventListener("click", showCart);
};

function showCart() {
  shoppingCart.style.visibility = "visible";
  shoppingCart.style.opacity = ".9";
  shoppingCart.style.transition = ".3s";
}

xmark.addEventListener("click", closeCart);

function closeCart() {
  shoppingCart.style.visibility = "hidden";
  shoppingCart.style.opacity = "0";
  shoppingCart.style.transition = ".4s";
};

let trashIcon = document.querySelectorAll(".shopping-cart .trash-icon");

for(let i = 0; i < trashIcon.length; i++) {
  trashIcon[i].addEventListener("click", removeCartBox);
};

function removeCartBox(event) {
  event.target.parentElement.remove();
  updateCartTotal();
};

let quantityInputs = document.querySelectorAll(".shopping-cart .quantity");
for (let i = 0; i < quantityInputs.length; i++) {
  quantityInputs[i].addEventListener("change", updateCartTotal);
};

function updateCartTotal() {
  let total = 0;
  let cartBoxes = document.querySelectorAll(".cart-box");
  for (let i = 0; i < cartBoxes.length; i++) {
    let cartBox = cartBoxes[i];
    let quantityValue = cartBox.querySelector(".quantity");
    let priceElement = cartBox.querySelector(".cart-price");
    let price = parseFloat(priceElement.innerText.replace("$", ""));
    let quantity = quantityValue.value;
    total = total + (price * quantity);
  }
  document.querySelector(".shopping-cart .total-price").innerText = "$" + total;
};

let productBoxes = document.querySelectorAll(".projects .image");
let addBtns = document.querySelectorAll(".projects .add-btns");

for (let i = 0; i < addBtns.length; i++) {
  addBtns[i].addEventListener("click", addNewCartBox);
};

function addNewCartBox(event) {
  let addBtn = event.target;
  let productBox = addBtn.parentElement.parentElement;
  let imgSrc = productBox.querySelector("img").src;
  let title = productBox.querySelector("h3").innerText;
  let price = productBox.querySelector(".prod-price").innerText;
  addProductsToCart(imgSrc, title, price);
  updateCartTotal();
  showCart();
};
function addProductsToCart(imgSrc, title, price) {
  let productTitles = document.querySelectorAll(".shopping-cart .cart-name");
  for (let i = 0; i < productTitles.length; i++) {
    if (productTitles[i].innerText === title) {
      let quantityInputs = document.querySelectorAll(".quantity");
      quantityInputs[i].value++
      return
    }
  }
  let newBox = document.createElement("div");
  newBox.classList.add("cart-box");
  let cartBoxes = document.querySelector(".shopping-cart .cart-boxes");
  cartBoxes.appendChild(newBox);
  let newBoxContent = `
  <img src="${imgSrc}" alt="">
  <div class="details">
    <div class="cart-name">${title}</div>
    <span class="cart-price">${price}</span>
  </div>
  <input type="number" min="1" class="quantity" value="1">
  <i class="fa-solid fa-trash-can trash-icon"></i>
  `
  newBox.innerHTML = newBoxContent;
  newBox.querySelector(".trash-icon").addEventListener("click", removeCartBox);
  newBox.querySelector(".quantity").addEventListener("change", updateCartTotal);
}
