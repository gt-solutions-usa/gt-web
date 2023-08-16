const testiSliderWrapper = document.querySelector(".testiwrapper");
const testiSliderCarousel = document.querySelector(".testicarousel");
const testiArrowBtns = document.querySelectorAll(".testiwrapper i");
const testiFirstCardWidth =
  testiSliderCarousel.querySelector(".testicard").offsetWidth;
const testiCarouselChildrens = [...testiSliderCarousel.children];

let testiIsDragging = false,
  testiStartX,
  testiStartScrollLeft,
  testiTimeoutId;

// Get the number of cards that can fit in the carousel at once
let testiCardPerView = Math.round(
  testiSliderCarousel.offsetWidth / testiFirstCardWidth
);

// Insert copies of the last few cards to the beginning of the carousel for infinite scrolling
testiCarouselChildrens
  .slice(-testiCardPerView)
  .reverse()
  .forEach((card) => {
    testiSliderCarousel.insertAdjacentHTML("afterbegin", card.outerHTML);
  });

// Insert copies of the first few cards to the end of the carousel for infinite scrolling
testiCarouselChildrens.slice(0, testiCardPerView).forEach((card) => {
  testiSliderCarousel.insertAdjacentHTML("beforeend", card.outerHTML);
});

// Add event listeners for the arrow buttons to scroll the carousel left and right
testiArrowBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    testiSliderCarousel.scrollLeft +=
      btn.id === "left" ? -testiFirstCardWidth : testiFirstCardWidth;
  });
});

const testiDragStart = (e) => {
  testiIsDragging = true;
  testiSliderCarousel.classList.add("dragging");
  // Records the initial cursor and scroll position of the carousel
  testiStartX = e.pageX;
  testiStartScrollLeft = testiSliderCarousel.scrollLeft;
};

const testiDragging = (e) => {
  if (!testiIsDragging) return; // if isDragging is false, return from here
  // Updates the scroll position of the carousel based on cursor movement
  testiSliderCarousel.scrollLeft =
    testiStartScrollLeft - (e.pageX - testiStartX);
};

const testiDragStop = () => {
  testiIsDragging = false;
  testiSliderCarousel.classList.remove("dragging");
};

const testiAutoPlay = () => {
  if (window.innerWidth < 800) return; // Return if window is smaller than 800
  // Autoplay the carousel after every 2500ms
  testiTimeoutId = setTimeout(
    () => (testiSliderCarousel.scrollLeft += testiFirstCardWidth),
    2500
  );
};

testiAutoPlay();

const testiInfiniteScroll = () => {
  // If the carousel is at the beginning, scroll to the end
  if (testiSliderCarousel.scrollLeft === 0) {
    testiSliderCarousel.classList.add("no-transition");
    testiSliderCarousel.scrollLeft =
      testiSliderCarousel.scrollWidth - 2 * testiSliderCarousel.offsetWidth;
    testiSliderCarousel.classList.remove("no-transition");
  }
  // If the carousel is at the end, scroll to the beginning
  else if (
    Math.ceil(testiSliderCarousel.scrollLeft) ===
    testiSliderCarousel.scrollWidth - testiSliderCarousel.offsetWidth
  ) {
    testiSliderCarousel.classList.add("no-transition");
    testiSliderCarousel.scrollLeft = testiSliderCarousel.offsetWidth;
    testiSliderCarousel.classList.remove("no-transition");
  }

  // Clear the existing timeout & start autoplay if the mouse is not hovering over the carousel
  clearTimeout(testiTimeoutId);
  if (!testiSliderWrapper.matches(":hover")) testiAutoPlay();
};

testiSliderCarousel.addEventListener("mousedown", testiDragStart);
testiSliderCarousel.addEventListener("mousemove", testiDragging);
document.addEventListener("mouseup", testiDragStop);
testiSliderCarousel.addEventListener("scroll", testiInfiniteScroll);
testiSliderWrapper.addEventListener("mouseenter", () =>
  clearTimeout(testiTimeoutId)
);
testiSliderWrapper.addEventListener("mouseleave", testiAutoPlay);
