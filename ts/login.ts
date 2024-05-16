// 로그인 기능 구현
const userRequest = JSON.parse(localStorage.getItem("sign_data"));
const loginStateArray = [];

const formbtn = document.querySelector("form") as HTMLElement;
// 유저 아이디 비밀번호 
const userId = document.querySelector("#userId") as HTMLInputElement;
const userPw = document.querySelector("#userPw") as HTMLInputElement;



formbtn.onsubmit = function(e){
  e.preventDefault();
  if(userId.value === "" || userPw.value === ""){alert("아이디 비밀번호를 입력해주세요"); return;}
  for(let i = 0; i < userRequest.length; i++){
    if(userId.value === userRequest[i].userId && userPw.value === userRequest[i].userPw){
      const loginObj = {
        loginId : userId.value,
        loginPw : userPw.value
      };
      loginStateArray.push(loginObj);
      sessionStorage.setItem("loginState", JSON.stringify(loginStateArray));
      alert("로그인 완료");
      return;
    } else {
      alert("아이디 비밀번호 확인 요망");
      return;
    }
  }
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






// logout 클릭하면 session 버려서
// 로그인으로 변경하고 마이페이지 삭제