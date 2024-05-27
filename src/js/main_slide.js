const prevBtn = document.querySelector(".prevBtn");
const nextBtn = document.querySelector(".nextBtn");
const slide = document.querySelector(".slide");
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
            slide.style.transition = "left 1s";
        }, 500);
    }
    setTimeout(() => {
        isActive = false;
    }, 500);
});
slide.addEventListener("transitionend", () => {
    if (index === -1) {
        index = 3;
        slide.style.transition = "none";
        slide.style.left = `${-1400 + (-1400 * index)}px`;
        setTimeout(() => {
            slide.style.transition = "left 1s";
        }, 500);
    }
    setTimeout(() => {
        isActive = false;
    }, 500);
});
prevBtn.onclick = function () {
    if (isActive)
        return;
    isActive = true;
    index--;
    slide.style.left = `${-1400 + (-1400 * index)}px`;
};
let slideAuto = setInterval(slideStop, 3000);
function slideStop() {
    if (isActive)
        return;
    isActive = true;
    index++;
    slide.style.left = `${-1400 + (-1400 * index)}px`;
}
slide.addEventListener("mouseover", function () {
    clearInterval(slideAuto);
});
slide.addEventListener("mouseleave", function () {
    slideAuto = setInterval(slideStop, 3000);
});
nextBtn.addEventListener("mouseover", function () {
    clearInterval(slideAuto);
});
nextBtn.addEventListener("mouseleave", function () {
    slideAuto = setInterval(slideStop, 3000);
});
prevBtn.addEventListener("mouseover", function () {
    clearInterval(slideAuto);
});
prevBtn.addEventListener("mouseleave", function () {
    slideAuto = setInterval(slideStop, 3000);
});
const posY = [];
const mainContent = document.querySelectorAll(".scroll-js");
for (let i = 0; i < mainContent.length; i++) {
    posY.push(mainContent[i].getBoundingClientRect().top + window.pageYOffset);
}
window.onscroll = function () {
    let _scroll = 921 + window.pageYOffset;
    for (let i = 0; i < mainContent.length; i++) {
        if (_scroll > posY[i]) {
            if (!mainContent[i].classList.contains("is-active1"))
                mainContent[i].classList.add("is-active1");
        }
        else {
            if (mainContent[i].classList.contains("is-active1"))
                mainContent[i].classList.remove("is-active1");
        }
    }
};
const flipCard1 = document.querySelector('.content3 > div:nth-child(1)');
const flipCard2 = document.querySelector('.content3 > div:nth-child(2)');
const flipCard3 = document.querySelector('.content3 > div:nth-child(3)');
let flip_bool1 = false;
let flip_bool2 = false;
let flip_bool3 = false;
flipCard1.onclick = () => {
    if (!flip_bool1) {
        flipCard1.style.transform = "rotateY(180deg)";
        flip_bool1 = true;
    }
    else {
        flipCard1.style.transform = "rotateY(0)";
        flip_bool1 = false;
    }
};
flipCard2.onclick = () => {
    if (!flip_bool2) {
        flipCard2.style.transform = "rotateY(180deg)";
        flip_bool2 = true;
    }
    else {
        flipCard2.style.transform = "rotateY(0)";
        flip_bool2 = false;
    }
};
flipCard3.onclick = () => {
    if (!flip_bool3) {
        flipCard3.style.transform = "rotateY(180deg)";
        flip_bool3 = true;
    }
    else {
        flipCard3.style.transform = "rotateY(0)";
        flip_bool3 = false;
    }
};
