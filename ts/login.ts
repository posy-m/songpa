// 로그인 기능 구현
const signData = JSON.parse(localStorage.getItem("sign_data"));
const loginStateArray = [];

const formbtn = document.querySelector("form") as HTMLElement;
// 유저 아이디 비밀번호 
const userId = document.querySelector("#userId") as HTMLInputElement;
const userPw = document.querySelector("#userPw") as HTMLInputElement;



formbtn.onsubmit = function(e){
  e.preventDefault();
  if(userId.value === "" || userPw.value === ""){
    alert("아이디 비밀번호를 입력해주세요"); return;
  }
  let text:string = "";
  for(let i = 0; i < signData.length; i++){
    if(userId.value == signData[i].userId && userPw.value == signData[i].userPw){
      const loginObj = {
        loginId : userId.value,
        loginPw : userPw.value
      };
      loginStateArray.push(loginObj);
      sessionStorage.setItem("loginState", JSON.stringify(loginStateArray));
      loginPop.style.display = "none";
      text = "로그인 완료"
    } else {
      sessionStorage.removeItem("loginState");
      text = "로그인 실패"
    }
  }
  alert(text);
}

// 로그인 팝업 기능 구현
const loginPopupBtn = document.querySelector(".loginBtn") as HTMLElement;
const loginPop = document.querySelector(".login-popup") as HTMLElement;
const loginDeleteBtn = document.querySelector(".login-delete") as HTMLElement;

loginPopupBtn.onclick = () => {
  loginPop.style.display = "block";
}

loginDeleteBtn.onclick = () => {
  loginPop.style.display = "none";
}

// 로그인시 logout으로 변경 및 mypage 생성
// function originState(){
//   const loginState = JSON.parse(sessionStorage.getItem("loginState"));
//   const userArea = document.querySelector(".user-area") as HTMLElement;
//   const _list = document.querySelector(".user-area > li") as HTMLElement;
//   const _span = document.querySelector(".user-area > li > span") as HTMLElement;
  
//   if( loginState !== null ){
//     _span.innerHTML = loginState[0].userId+" 님";
//   }
// }

// originState();



// logout 클릭하면 session 버려서
// 로그인으로 변경하고 마이페이지 삭제