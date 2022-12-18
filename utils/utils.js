export const popupImage = document.querySelector(".popup_type_image");
export const popupImageCloseButton = popupImage.querySelector(".popup__close");
export const imageSrc = popupImage.querySelector(".popup__image");
export const imageTitle = popupImage.querySelector(".popup__image-title");

// function openPopup(popupType) {
//   popupType.classList.add("popup_opened");
//   document.addEventListener("click", closePopupOverlay);
//   document.addEventListener("keydown", closePopupEsc);
// }

// function closePopup(popupType) {
//   popupType.classList.remove("popup_opened");
//   document.removeEventListener("click", closePopupOverlay);
//   document.removeEventListener("keydown", closePopupEsc);
// }

// function closePopupOverlay(event) {
//   const openedPopup = document.querySelector(".popup_opened");
//   if (openedPopup && event.target === openedPopup) {
//     closePopup(openedPopup);
//   }
// }

// function closePopupEsc(event) {
//   if (event.key === "Escape") {
//     const openedPopup = document.querySelector(".popup_opened");
//     closePopup(openedPopup);
//   }
// }

// export { openPopup, closePopup, closePopupOverlay, closePopupEsc };
