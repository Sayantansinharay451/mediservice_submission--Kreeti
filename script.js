const highlight = document.querySelector(".highlight");
const nav = document.querySelector("nav");
const header = document.querySelector("header");
const navControl = document.querySelector(".nav__trigger");
const navMenu = document.querySelector(".nav__menu");

const nextBtn = document.querySelector(".carousel__control--next");
const prevBtn = document.querySelector(".carousel__control--prev");

const department = document.querySelector(".department");
const slider = document.querySelector(".department__carouselList");
const sliderItem = document.querySelectorAll(".carousel__item");

const links = document.querySelectorAll(".nav__main a");

links.forEach((ele) => {
    const hrefId = ele.getAttribute("href");
    if (hrefId !== "#") {
        const element = document.querySelector(hrefId);
        const paddingTop = window
            .getComputedStyle(element, null)
            .getPropertyValue("padding-top");
        element.style.scrollMarginTop = `${
            highlight.clientHeight +
            nav.clientHeight +
            parseInt(paddingTop.slice(0, -2))
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

const showBtn = () => {
    if (firstIndex === 0) prevBtn.style.visibility = "hidden";
    else prevBtn.style.visibility = "visible";
    if (lastIndex === sliderItem.length - 1)
        nextBtn.style.visibility = "hidden";
    else nextBtn.style.visibility = "visible";
};

window.addEventListener("resize", () => {
    if (
        gap !==
        Math.round(slider.clientWidth / sliderItem[0].clientWidth) - 1
    ) {
        gap = Math.round(slider.clientWidth / sliderItem[0].clientWidth) - 1;
        if (firstIndex + gap > sliderItem.length) {
            firstIndex = lastIndex - gap;
            lastIndex = firstIndex + gap;
        } else {
            lastIndex = firstIndex + gap;
        }
        showBtn();
    }
    // console.log(gap);
    // console.log("firstIndex #", firstIndex);
    // console.log("lastIndex #", lastIndex);
});

const sliderObserver = new window.IntersectionObserver(
    ([entry]) => {
        if (entry.isIntersecting) {
            // console.log("firstIndex", firstIndex, "lastIndex", lastIndex);
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
    firstIndex++;
    lastIndex = firstIndex + gap;
    // console.log("next firstIndex", firstIndex, "lastIndex", lastIndex);
    showBtn();
    sliderItem[lastIndex].scrollIntoView(true);
};

const prevItem = () => {
    firstIndex--;
    lastIndex = firstIndex + gap;
    // console.log("prev firstIndex", firstIndex, "lastIndex", lastIndex);
    showBtn();
    sliderItem[firstIndex].scrollIntoView(true);
};

nextBtn.addEventListener("click", nextItem);
prevBtn.addEventListener("click", prevItem);
