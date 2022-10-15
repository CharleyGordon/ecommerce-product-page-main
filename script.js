const hamburger = document.querySelector(".hamburger");
const basket = document.querySelector(".basket");
// hidden basket menu
const basketMenu = document.querySelector(".basket-menu");
const backet = document.querySelector(".backet");
const cart = document.querySelector(".cart");
const headerMenu = document.querySelector(".header-menu");
const galleryButtons = document.querySelectorAll(".gallery-button");
const amountButtons = document.querySelectorAll(".amount-button");
const toLightbox = document.querySelector(".big-img");
const galleries = document.querySelectorAll(".gallery");
// checking for window width to prevent lightbox on mobile devices
let allowLightbox = false;
let amount;
let lightbox = document.querySelector(".lightbox");
const observer = new ResizeObserver((e) => {
  let width = e[0].contentRect.width;
  if (width >= 1000) allowLightbox = true;
  else allowLightbox = false;
});
observer.observe(document.body);
basket.addEventListener("click", (e) => {
  galleryButtons.forEach((button) => {
    button.classList.toggle("inivisible");
  });
  let inMenu =
    e.target.closest(".basket-menu") !== null &&
    e.target.closest(".basket-menu") !== undefined;
  if (inMenu) return;
  basket.classList.toggle("active");
  basketMenu.classList.toggle("active");
  if (amount === null || amount === undefined || amount === 0)
    basketMenu.classList.add("empty");
  else basketMenu.classList.remove("empty");
  switch (true) {
    case basketMenu.matches(".active"):
      document.body.style.overflow = "hidden";
      break;
    default:
      document.body.style.overflow = "auto";
      break;
  }
});
window.addEventListener("click", (e) => {
  if (e.target.closest(".top-navigation") === null) {
    basket.classList.remove("active");
    basketMenu.classList.remove("active");
  }
});

hamburger.addEventListener("click", () => {
  headerMenu.classList.toggle("show");
});
// opening lightbox
toLightbox.addEventListener("click", () => {
  if (allowLightbox) {
    lightbox.classList.add("active");
    document.querySelector("hr").classList.add("active");
    let close = lightbox.querySelector(".gallery-close");
    close.addEventListener("click", () => {
      lightbox.classList.remove("active");
      document.querySelector("hr").classList.remove("active");
    });
  }
});
// navigation through thumbnails
galleries.forEach((gallery) => {
  let galleryThumbnails = Array.from(
    gallery.querySelectorAll(".thumbnails img")
  );
  galleryThumbnails.forEach((galleryThumbnail) => {
    galleryThumbnail.addEventListener("click", (e) => {
      let thumbIndex = galleryThumbnails.indexOf(e.target);
      let tParent = e.target.parentElement;
      tParent.classList.add("style");
      galleryThumbnails.forEach((tb) => {
        if (tb.parentElement === tParent) return;
        tb.parentElement.classList.remove("style");
      });
      let glr = e.target.closest(".gallery");
      let bigImg = glr.querySelector(".big-img");
      let galleryImages = Array.from(bigImg.querySelectorAll("img"));
      let image = bigImg.querySelector("[data-current]");
      let nextImage = galleryImages[thumbIndex];

      if (image === nextImage) return;
      nextImage.dataset.current = true;
      delete image.dataset.current;
    });
  });
});
// navigation throught buttons (with thumbnails styling)
galleryButtons.forEach((galleryButton) => {
  galleryButton.addEventListener("click", (e) => {
    let bigImg = e.target.closest(".big-img");
    let galleryImages = Array.from(bigImg.querySelectorAll("img"));
    let image = bigImg.querySelector("[data-current]");
    let imageIndex = galleryImages.indexOf(image);
    let offset = galleryButton.matches(".previous") ? -1 : 1;
    currentIndex = imageIndex + offset;

    if (currentIndex < 0) {
      currentIndex = galleryImages.length - 1;
    }
    if (currentIndex >= galleryImages.length) {
      currentIndex = 0;
    }
    let nextImage = galleryImages[currentIndex];
    nextImage.dataset.current = true;
    delete image.dataset.current;
    let thumbnails = galleryButton
      .closest(".gallery")
      .querySelector(".thumbnails");
    let thumbImgs = Array.from(thumbnails.querySelectorAll(".small-img"));
    thumbImgs[currentIndex].classList.add("style");
    thumbImgs.forEach((img) => {
      if (thumbImgs.indexOf(img) === currentIndex) return;
      img.classList.remove("style");
    });
  });
});

amountButtons.forEach((amountButton) => {
  amountButton.addEventListener("click", () => {
    if (amount === undefined || amount < 1) {
      amount = Number(
        amountButton.parentElement.querySelector(".amount-counter").textContent
      );
    }
    let step = amountButton.matches(".minus") ? -1 : 1;
    let amountUpdate = amount + step;
    if (amountUpdate <= 0) {
      amountUpdate = 0;
    }
    amount = amountUpdate;
    amountButton.parentElement.querySelector(".amount-counter").textContent =
      amountUpdate;
  });
});
backet.addEventListener("click", () => {
  basket.removeAttribute("data-in-basket");
  amount = 0;
  basketMenu.classList.add("empty");
});
cart.addEventListener("click", (e) => {
  e.preventDefault();

  if (amount > 0) {
    let inBasket = Number(basket.getAttribute("data-in-basket"));
    basket.setAttribute("data-in-basket", inBasket + amount);
    inBasket = Number(basket.getAttribute("data-in-basket"));
    if (inBasket > 0) {
      basketMenu.querySelector(
        ".price-now"
      ).textContent = `$125.00 x${inBasket}`;
      basketMenu.querySelector(".price-total").textContent = `$${
        125 * inBasket
      }.00`;
    } else {
      basket.setAttribute("data-in-basket", amount);
      basketMenu.querySelector(".price-now").textContent = `$125.00`;
      basketMenu.querySelector(".price-total").textContent = ``;
    }
  } else return;
  document.querySelector(".amount-counter").textContent = 0;
});
