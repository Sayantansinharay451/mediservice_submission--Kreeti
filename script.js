const nav = document.querySelector("nav");
const header = document.querySelector("header");
const navControl = document.querySelector(".Nav__control");
const navMenu = document.querySelector(".Nav__menu");

const nextBtn = document.querySelector(".Button--next");
const prevBtn = document.querySelector(".Button--prev");

const slider = document.querySelector(".Department__items");
const sliderItem = document.querySelectorAll(".Department__item");

const observer = new window.IntersectionObserver(
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

observer.observe(header);

navControl.addEventListener("click", (ele) => {
    ele.target.classList.toggle("Nav--open");
    ele.target.classList.toggle("Nav--close");
    navMenu.classList.toggle("Nav__menu--open");
});

window.addEventListener("scroll", () => {
    if (navControl.classList.contains("Nav--close")) {
        navMenu.classList.toggle("Nav__menu--open");
        navControl.classList.toggle("Nav--close");
        navControl.classList.toggle("Nav--open");
    }
});

let index = Math.floor(slider.clientWidth / sliderItem[0].clientWidth);

console.log(index);

const show = (increase) => {
    if (index + increase < 0) {
        index = sliderItem.length;
    }
    index = (index + increase) % sliderItem.length;
    index = Math.min(Math.max(index, 0), sliderItem.length - 1);
    console.log(index);
    sliderItem[index].scrollIntoView({ behavior: "smooth" });
};

nextBtn.addEventListener("click", () => show(+1));
prevBtn.addEventListener("click", () => show(-1));
