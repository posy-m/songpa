// 로그인 기능 구현
const signData = JSON.parse(localStorage.getItem("sign_data"));


const formbtn = document.querySelector("form") as HTMLElement;
// 유저 아이디 비밀번호 
const userId = document.querySelector("#userId") as HTMLInputElement;
const userPw = document.querySelector("#userPw") as HTMLInputElement;

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
    }
  }
  text = _bool ? "성공" : "실패";
  alert(text);

  originState();

  // 로그인 되면 닉네임이 마이 페이지로 이동하게 만듦
  const span = document.querySelector('.loginBtn') as HTMLElement;
    span.classList.replace('loginBtn', 'loginX');
    const span2 = document.querySelector('.loginX') as HTMLElement;
    span2.onclick = function(){
      location.href = "./mypage.html";
    }
}

// 로그인시 logout으로 변경 및 mypage 생성
function originState(){
  const login_status = JSON.parse(sessionStorage.getItem("login_status"));

  const userArea = document.querySelector(".user-area") as HTMLElement;
  const logoutList = document.createElement("li") as HTMLElement;

  const _span01 = document.querySelector(".user-area > li:nth-child(1) > span") as HTMLElement;
  const _span02 = document.querySelector(".user-area > li:nth-child(2)") as HTMLElement;

  if( login_status !== null ){
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
        _span01.innerHTML = "Log-out";
        logoutList.style.display = "none";
        _span02.style.display = "block";
      }
    }
  }
}

// logoutList.addEventListener('click', function(){
//   console.log('할수있어..?');
// }
// ) 






// logout 클릭하면 session 버려서
// 로그인으로 변경하고 마이페이지 삭제