const blogWrapper = document.querySelector(".blogWrapper");
const blogCarousel = document.querySelector(".blogCarousel");
const blogArrowBtns = document.querySelectorAll(".blogWrapper i");
const blogFirstCardWidth = blogCarousel.querySelector(".blogCard").offsetWidth;
const blogCarouselChildrens = [...blogCarousel.children];

let blogIsDragging = false,
  blogStartX,
  blogStartScrollLeft,
  blogTimeoutId;

// Get the number of cards that can fit in the carousel at once
let blogCardPerView = Math.round(blogCarousel.offsetWidth / blogFirstCardWidth);

// Insert copies of the last few cards to the beginning of the carousel for infinite scrolling
blogCarouselChildrens
  .slice(-blogCardPerView)
  .reverse()
  .forEach((card) => {
    blogCarousel.insertAdjacentHTML("afterbegin", card.outerHTML);
  });

// Insert copies of the first few cards to the end of the carousel for infinite scrolling
blogCarouselChildrens.slice(0, blogCardPerView).forEach((card) => {
  blogCarousel.insertAdjacentHTML("beforeend", card.outerHTML);
});

// Add event listeners for the arrow buttons to scroll the carousel left and right
blogArrowBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    blogCarousel.scrollLeft +=
      btn.id === "left" ? -blogFirstCardWidth : blogFirstCardWidth;
  });
});

const blogDragStart = (e) => {
  blogIsDragging = true;
  blogCarousel.classList.add("dragging");
  // Records the initial cursor and scroll position of the carousel
  blogStartX = e.pageX;
  blogStartScrollLeft = blogCarousel.scrollLeft;
};

const blogDragging = (e) => {
  if (!blogIsDragging) return; // if isDragging is false, return from here
  // Updates the scroll position of the carousel based on cursor movement
  blogCarousel.scrollLeft = blogStartScrollLeft - (e.pageX - blogStartX);
};

const blogDragStop = () => {
  blogIsDragging = false;
  blogCarousel.classList.remove("dragging");
};

const blogAutoPlay = () => {
  if (window.innerWidth < 800) return; // Return if window is smaller than 800
  // Autoplay the carousel after every 2500ms
  blogTimeoutId = setTimeout(
    () => (blogCarousel.scrollLeft += blogFirstCardWidth),
    2500
  );
};

blogAutoPlay();

const blogInfiniteScroll = () => {
  // If the carousel is at the beginning, scroll to the end
  if (blogCarousel.scrollLeft === 0) {
    blogCarousel.classList.add("no-transition");
    blogCarousel.scrollLeft =
      blogCarousel.scrollWidth - 2 * blogCarousel.offsetWidth;
    blogCarousel.classList.remove("no-transition");
  }
  // If the carousel is at the end, scroll to the beginning
  else if (
    Math.ceil(blogCarousel.scrollLeft) ===
    blogCarousel.scrollWidth - blogCarousel.offsetWidth
  ) {
    blogCarousel.classList.add("no-transition");
    blogCarousel.scrollLeft = blogCarousel.offsetWidth;
    blogCarousel.classList.remove("no-transition");
  }

  // Clear the existing timeout & start autoplay if the mouse is not hovering over the carousel
  clearTimeout(blogTimeoutId);
  if (!blogWrapper.matches(":hover")) blogAutoPlay();
};

blogCarousel.addEventListener("mousedown", blogDragStart);
blogCarousel.addEventListener("mousemove", blogDragging);
document.addEventListener("mouseup", blogDragStop);
blogCarousel.addEventListener("scroll", blogInfiniteScroll);
blogWrapper.addEventListener("mouseenter", () => clearTimeout(blogTimeoutId));
blogWrapper.addEventListener("mouseleave", blogAutoPlay);
