const hamburger = document.querySelector(".hamburger");
const basket = document.querySelector(".basket");
const cart = document.querySelector(".cart");
const headerMenu = document.querySelector(".header-menu");
const galleryButtons = document.querySelectorAll(".gallery-button");
const amountButtons = document.querySelectorAll(".amount-button");
console.log(amountButtons);
let bigImg = document.querySelector(".big-img");
let thumbnails = document.querySelector(".thumbnails");
const galleryImages = Array.from(bigImg.querySelectorAll("img"));
const galleryThumbnails = Array.from(thumbnails.querySelectorAll("img"));
console.log(galleryThumbnails);
console.log(galleryImages.length);
const defaultImg = galleryImages[2];
let amount;
let lightbox = document.querySelector(".gallery").cloneNode(true);
console.log(lightbox);
hamburger.addEventListener("click", () => {
  headerMenu.classList.toggle("show");
});

galleryButtons.forEach((galleryButton) => {
  galleryButton.addEventListener("click", () => {
    let image = bigImg.querySelector("[data-current]");
    console.log(image);
    let imageIndex = galleryImages.indexOf(image);
    console.log("imageindex is", imageIndex);
    let offset = galleryButton.matches(".previous") ? -1 : 1;
    console.log("the offset is...", offset);
    currentIndex = imageIndex + offset;

    if (currentIndex < 0) {
      currentIndex = galleryImages.length - 1;
    }
    if (currentIndex >= galleryImages.length) {
      currentIndex = 0;
    }
    console.log(":current index:", currentIndex);
    let nextImage = galleryImages[currentIndex];
    nextImage.dataset.current = true;
    delete image.dataset.current;
  });
});
galleryThumbnails.forEach((galleryThumbnail) => {
  galleryThumbnail.addEventListener("click", (e) => {
    let thumbIndex = galleryThumbnails.indexOf(e.target);
    let tParent = e.target.parentElement;
    tParent.classList.add("style");
    galleryThumbnails.forEach((tb) => {
      if (tb.parentElement === tParent) return;
      tb.parentElement.classList.remove("style");
    });
    console.log(thumbIndex);
    let image = bigImg.querySelector("[data-current]");
    let nextImage = galleryImages[thumbIndex];
    nextImage.dataset.current = true;
    delete image.dataset.current;
  });
});
amountButtons.forEach((amountButton) => {
  amountButton.addEventListener("click", () => {
    amount = Number(
      amountButton.parentElement.querySelector(".amount-counter").textContent
    );
    let step = amountButton.matches(".minus") ? -1 : 1;
    let amountUpdate = amount + step;
    if (amountUpdate <= 0) {
      amountUpdate = 0;
    }
    amount = amountUpdate;
    console.log(amount);
    amountButton.parentElement.querySelector(".amount-counter").textContent =
      amountUpdate;
  });
});
cart.addEventListener("click", (e) => {
  e.preventDefault();
  if (amount > 0) {
    basket.setAttribute("data-in-basket", amount);
  } else return;
});
