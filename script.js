const highlight = document.querySelector(".highlight");
const nav = document.querySelector("nav");
const header = document.querySelector("header");
const navControl = document.querySelector(".nav__trigger");
const navMenu = document.querySelector(".nav__menu");

const nextBtn = document.querySelector(".carousel__control--next");

const department = document.querySelector(".department");
const slider = document.querySelector(".department__carouselList");
const sliderItem = document.querySelectorAll(".carousel__item");

const links = document.querySelectorAll(".nav__menu a");

links.forEach((ele) => {
  const hrefId = ele.getAttribute("href");
  if (hrefId !== "#") {
    const element = document.querySelector(hrefId);
    const paddingTop = window
      .getComputedStyle(element, null)
      .getPropertyValue("padding-top");
    element.style.scrollMarginTop = `${
      highlight.clientHeight + parseInt(paddingTop.slice(0, -2))
    }px`;
  }
});

const navObserver = new window.IntersectionObserver(
  ([entry]) => {
    if (entry.isIntersecting) {
      nav.style.setProperty("--opacity", "0.5");
      return;
    } else {
      nav.style.setProperty("--opacity", "1");
      return;
    }
  },
  {
    root: null,
    threshold: 0.5,
  }
);

navObserver.observe(header);

navControl.addEventListener("click", (ele) => {
  ele.target.classList.toggle("nav__trigger--open");
  ele.target.classList.toggle("nav__trigger--close");
  navMenu.classList.toggle("nav__menu--open");
  navMenu.classList.toggle("nav__menu--close");
});

window.addEventListener("scroll", () => {
  if (navControl.classList.contains("nav__trigger--open")) {
    navMenu.classList.toggle("nav__menu--open");
    navMenu.classList.toggle("nav__menu--close");
    navControl.classList.toggle("nav__trigger--close");
    navControl.classList.toggle("nav__trigger--open");
  }
});

let firstIndex = 0,
  lastIndex = 0;
let gap = Math.round(slider.clientWidth / sliderItem[0].clientWidth) - 1;

window.addEventListener("resize", () => {
  if (gap !== Math.round(slider.clientWidth / sliderItem[0].clientWidth) - 1) {
    gap = Math.round(slider.clientWidth / sliderItem[0].clientWidth) - 1;
    if (firstIndex + gap > sliderItem.length) {
      firstIndex = lastIndex - gap;
      lastIndex = firstIndex + gap;
    } else {
      lastIndex = firstIndex + gap;
    }
  }
});

const sliderObserver = new window.IntersectionObserver(
  ([entry]) => {
    if (entry.isIntersecting) {
      sliderItem[lastIndex].scrollIntoView(true);
      sliderItem[firstIndex].scrollIntoView(true);
    }
  },
  {
    root: null,
    threshold: 0,
  }
);

const nextItem = () => {
  const firstEle = sliderItem[firstIndex];
  firstEle.classList.add("delete");
  setTimeout(() => {
    slider.removeChild(slider.firstChild);
    slider.appendChild(firstEle);
    firstEle.classList.remove("delete");
  }, 500);
  firstIndex = (firstIndex + 1) % sliderItem.length;
  lastIndex = (firstIndex + gap - 1) % sliderItem.length;
};

nextBtn.addEventListener("click", nextItem);

const setNavHeight = () => {
  $("nav").css("top", highlight.clientHeight);
};

const setFooterPosition = () => {
  if (window.innerHeight > parseInt($("body").css("height").slice(0, -2))) {
    $("footer").css({
      position: "fixed",
    });
  } else {
    $("footer").css({
      position: "relative",
    });
  }
};

const setAboutMargin = () => {
  const eleMargin = parseInt($(".about").css("scroll-margin-top").slice(0, -2));
  if (window.innerWidth < 768) {
    $(".about").css("margin-top", eleMargin);
  } else {
    $(".about").css("margin-top", 0);
  }
};

$(document).ready(function () {
  setNavHeight();
  setFooterPosition();
  setAboutMargin();
});

$(window).resize(function () {
  setNavHeight();
  setFooterPosition();
  setAboutMargin();
});
