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
      const session = sessionStorage.getItem("loginState");
      console.log(session);
      alert("로그인 완료");
      return;
    } else {
      alert("아이디 비밀번호 확인 요망");
      return;
    }
  }
}