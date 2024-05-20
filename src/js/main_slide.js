const prevBtn = document.querySelector(".prevBtn");
const nextBtn = document.querySelector(".nextBtn");
const slide = document.querySelector(".slide");
const img_list = document.querySelector(".slide > li");
function index() {
}
index();
prevBtn.onclick = function () {
    slide.style.transform = "translateX(0)";
};
nextBtn.onclick = function () {
    slide.style.transform = "translateX(-1600px)";
};
const pageArea = document.querySelector(".pageArea");
const btn1 = document.querySelector(".pageArea > span:nth-child(1)");
const btn2 = document.querySelector(".pageArea > span:nth-child(2)");
const btn3 = document.querySelector(".pageArea > span:nth-child(3)");
const btn4 = document.querySelector(".pageArea > span:nth-child(4)");
const li_width = img_list.clientWidth;
setTimeout(() => {
    slide.style.transform = "translateX(0)";
}, 3000);
setTimeout(() => {
    slide.style.transform = "translateX(-1600px)";
}, 6000);
setTimeout(() => {
    slide.style.transform = "translateX(-3200px)";
}, 9000);
setTimeout(() => {
    slide.style.transform = "translateX(-4800px)";
}, 12000);
