const nav = document.querySelector("nav");
const header = document.querySelector("header");
const navControl = document.querySelector(".Nav__control");
const navMenu = document.querySelector(".Nav__menu");

const observer = new window.IntersectionObserver(
    ([entry]) => {
        if (entry.isIntersecting) {
            console.log("enter");
            nav.style.setProperty("--opacity", "0.5");
            return;
        } else {
            console.log("exit");
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
