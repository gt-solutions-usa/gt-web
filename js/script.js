"use strict";

// ? Add Event on Elements ? //

const addEventOnElem = function (elem, type, callback) {
  if (elem.length > 1) {
    for (let i = 0; i < elem.length; i++) {
      elem[i].addEventListener(type, callback);
    }
  } else {
    elem.addEventListener(type, callback);
  }
};

// ? Navbar Toggle ? //

const navbar = document.querySelector("[data-navbar]");
const navTogglers = document.querySelectorAll("[data-nav-toggler]");
const navbarLinks = document.querySelectorAll("[data-nav-link]");
const overlay = document.querySelector("[data-overlay]");

const toggleNavbar = function () {
  navbar.classList.toggle("active");
  overlay.classList.toggle("active");
};

addEventOnElem(navTogglers, "click", toggleNavbar);

const closeNavbar = function () {
  navbar.classList.remove("active");
  overlay.classList.remove("active");
};

addEventOnElem(navbarLinks, "click", closeNavbar);

// ? Header & back top btn show when scroll down to 100px ? //

const header = document.querySelector("[data-header]");
const backTopBtn = document.querySelector("[data-back-top-btn]");

const headerActive = function () {
  if (window.scrollY > 80) {
    header.classList.add("active");
    backTopBtn.classList.add("active");
  } else {
    header.classList.remove("active");
    backTopBtn.classList.remove("active");
  }
};

addEventOnElem(window, "scroll", headerActive);

// MixitKit
document.addEventListener("DOMContentLoaded", function () {
  var mixer = mixitup(".product-filter-items", {
    load: {
      filter: ".logo-designs", // Set the initial filter to logo-designs
    },
  });
});

document.addEventListener("DOMContentLoaded", function () {
  var mixer = mixitup(".pricing-filter-items", {
    load: {
      filter: ".logo-designs", // Set the initial filter to logo-designs
    },
  });
});

document.addEventListener("DOMContentLoaded", function () {
  var mixer = mixitup(".web-pricing-filter-items", {
    load: {
      filter: ".websites", // Set the initial filter to logo-designs
    },
  });
});

document.addEventListener("DOMContentLoaded", function () {
  var mixer = mixitup(".seo-pricing-filter-items", {
    load: {
      filter: ".seo", // Set the initial filter to logo-designs
    },
  });
});

document.addEventListener("DOMContentLoaded", function () {
  var mixer = mixitup(".anim-pricing-filter-items", {
    load: {
      filter: ".animation", // Set the initial filter to logo-designs
    },
  });
});

document.addEventListener("DOMContentLoaded", function () {
  var mixer = mixitup(".branding-pricing-filter-items", {
    load: {
      filter: ".branding", // Set the initial filter to logo-designs
    },
  });
});
