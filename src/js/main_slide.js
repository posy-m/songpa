const prevBtn = document.querySelector(".prevBtn");
const nextBtn = document.querySelector(".nextBtn");
const slide = document.querySelector(".slide");
const img_list = document.querySelector(".slide > li");
let index = 0;
let isActive = false;
function slideInit() {
    const { length } = slide.children;
    const firstLi = slide.children[0].cloneNode(true);
    const lastLi = slide.children[length - 1].cloneNode(true);
    slide.children[0].before(lastLi);
    slide.append(firstLi);
    slide.style.left = "-1400px";
}
slideInit();
nextBtn.onclick = function () {
    if (isActive)
        return;
    isActive = true;
    index++;
    slide.style.left = `${-1400 + (-1400 * index)}px`;
};
slide.addEventListener("transitionend", () => {
    if (index === 4) {
        index = 0;
        slide.style.transition = "none";
        slide.style.left = "-1400px";
        setTimeout(() => {
            slide.style.transition = "left 0.5s";
        }, 250);
    }
    setTimeout(() => {
        isActive = false;
    }, 250);
});
slide.addEventListener("transitionend", () => {
    if (index === -1) {
        index = 3;
        slide.style.transition = "none";
        slide.style.left = `${-1400 + (-1400 * index)}px`;
        setTimeout(() => {
            slide.style.transition = "left 0.5s";
        }, 250);
    }
    setTimeout(() => {
        isActive = false;
    }, 250);
});
prevBtn.onclick = function () {
    if (isActive)
        return;
    isActive = true;
    index--;
    slide.style.left = `${-1400 + (-1400 * index)}px`;
};
const posY = [];
const mainContent = document.querySelectorAll(".scroll-js");
for (let i = 0; i < mainContent.length; i++) {
    posY.push(mainContent[i].getBoundingClientRect().top + window.pageYOffset);
}
window.onscroll = function () {
    let _scroll = 921 + window.pageYOffset;
    for (let i = 0; i < mainContent.length; i++) {
        if (_scroll > posY[i]) {
            if (!mainContent[0].classList.contains("is-active1"))
                mainContent[0].classList.add("is-active1");
        }
        else {
            if (mainContent[i].classList.contains("is-active1"))
                mainContent[i].classList.remove("is-active1");
        }
    }
};
