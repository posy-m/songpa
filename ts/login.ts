// 로그인 기능 구현
const signData = JSON.parse(localStorage.getItem("sign_data"));


const formbtn = document.querySelector("#login_form") as HTMLElement;
// 유저 아이디 비밀번호 
const userId = document.querySelector("#userId") as HTMLInputElement;
const userPw = document.querySelector("#userPw") as HTMLInputElement;

// 로그인 팝업 기능 구현
const loginPopupBtn = document.querySelector(".loginBtn") as HTMLElement;
const loginPop = document.querySelector(".login-popup") as HTMLElement;
const loginDeleteBtn = document.querySelector(".login-delete") as HTMLElement;
const body = document.querySelector("body") as HTMLElement;
loginPopupBtn.onclick = () => {
  loginPop.style.display = "block";
  body.style.overflow ="hidden";
}

loginDeleteBtn.onclick = () => {
  loginPop.style.display = "none";
  body.style.overflow ="visible";
}

// 로그인시 logout으로 변경

function originState(){
  const login_status = JSON.parse(sessionStorage.getItem("login_status"));
  const userArea = document.querySelector(".user-area") as HTMLElement;
  const logoutList = document.createElement("li") as HTMLElement;

  const _span01 = document.querySelector(".user-area > li:nth-child(1) > span") as HTMLElement;
  const _span02 = document.querySelector(".user-area > li:nth-child(2)") as HTMLElement;

  if( login_status !== null){
    _span01.innerHTML = `
      <img src="../src/img/mypageIcon.png" alt="로고">
      ${login_status.userName} 님
    `;

    const _img = document.querySelector(".user-area > li > span > img") as HTMLElement;
    _img.style.width = "30px";

    _span02.style.display = "none";
    logoutList.innerHTML = "Log-out";
    userArea.append(logoutList);

    logoutList.onclick = function(){
      const logoutQ = confirm("로그아웃을 하시겠습니까?");
      if(logoutQ){
        sessionStorage.removeItem("login_status");
        _span01.innerHTML = "Log-in"
        logoutList.innerHTML = "Log-out";
        logoutList.style.display = "none";
        _span02.style.display = "block";
        
        // 해놓아야 로그아웃시 정상적으로 작동함
        _span01.classList.replace('loginX', 'loginBtn');
        _span01.onclick = function(){
          location.href = "#";
          loginPop.style.display = "block";
          userId.value = "";
          userPw.value = "";
        }
      }
    }
  }
}
// mypage 및 admin 페이지 접속 함수
function myPage(){
  const _span01 = document.querySelector(".user-area > li:nth-child(1) > span") as HTMLElement;
  const login_status = JSON.parse(sessionStorage.getItem("login_status"));
  if(login_status.userId === signData[0].userId && login_status.userPw === signData[0].userPw){
    _span01.onclick = function(){
      location.href = "admin.html";
    }
  } else {
    _span01.onclick = function(){
      location.href = "mypage.html";
    }
  }
}

formbtn.onsubmit = function(e){
  e.preventDefault();
  if(userId.value === "" || userPw.value === ""){
    alert("아이디 비밀번호를 입력해주세요"); return;
  }
  let text:string = "";
  let _bool:boolean = false;
  for(let i = 0; i < signData.length; i++){
    if(userId.value === signData[i].userId && userPw.value === signData[i].userPw){
      const loginObj = signData[i];
      sessionStorage.setItem("login_status", JSON.stringify(loginObj));
      _bool = true;
      loginPop.style.display = "none";
      location.reload();
    }
  }
  text = _bool ? "로그인이 성공했습니다." : "아이디와 비밀번호를 확인해주세요.";
  // originState();  
  alert(text);
}

// 함수 실행
originState();
myPage();