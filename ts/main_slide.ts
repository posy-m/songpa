const prevBtn = document.querySelector(".prevBtn") as HTMLElement;
const nextBtn = document.querySelector(".nextBtn") as HTMLElement;
const slide = document.querySelector(".slide") as HTMLElement;
const img_list = document.querySelector(".slide > li") as HTMLElement;

function index(){
  // const img_list = document.querySelector(".slide > li") as HTMLElement;
  // for(let i = 0; i < img_list.dataset.index.length; i++ ){
  //   console.log(i)
  // }
}

index();

prevBtn.onclick = function(){
  slide.style.transform = "translateX(0)";
}

nextBtn.onclick = function(){
  slide.style.transform = "translateX(-1600px)";
}

const pageArea = document.querySelector(".pageArea") as HTMLElement;
const btn1 = document.querySelector(".pageArea > span:nth-child(1)") as HTMLElement;
const btn2 = document.querySelector(".pageArea > span:nth-child(2)") as HTMLElement;
const btn3 = document.querySelector(".pageArea > span:nth-child(3)") as HTMLElement;
const btn4 = document.querySelector(".pageArea > span:nth-child(4)") as HTMLElement;

// const li_width = img_list.clientWidth;
// setTimeout(() => {
//   slide.style.transform = "translateX(0)";
// }, 3000);
// setTimeout(() => {
//   slide.style.transform = "translateX(-1600px)";
// }, 6000);
// setTimeout(() => {
//   slide.style.transform = "translateX(-3200px)";
// }, 9000);
// setTimeout(() => {
//   slide.style.transform = "translateX(-4800px)";
// }, 12000);

// btn1.onclick = function(){
  
// }

// btn2.onclick = function(){
//   slide.style.transform = "translateX(-1600px)";
// }

// btn3.onclick = function(){
//   slide.style.transform = "translateX(-3200px)";
// }

// btn4.onclick = function(){
//   slide.style.transform = "translateX(-4800px)";
// }