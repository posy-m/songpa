const signData = JSON.parse(localStorage.getItem("sign_data"));
const formbtn = document.querySelector("form");
const userId = document.querySelector("#userId");
const userPw = document.querySelector("#userPw");
const loginPopupBtn = document.querySelector(".loginBtn");
const loginPop = document.querySelector(".login-popup");
const loginDeleteBtn = document.querySelector(".login-delete");
loginPopupBtn.onclick = () => {
    loginPop.style.display = "block";
};
loginDeleteBtn.onclick = () => {
    loginPop.style.display = "none";
};
formbtn.onsubmit = function (e) {
    e.preventDefault();
    if (userId.value === "" || userPw.value === "") {
        alert("아이디 비밀번호를 입력해주세요");
        return;
    }
    let text = "";
    let _bool = false;
    for (let i = 0; i < signData.length; i++) {
        if (userId.value === signData[i].userId && userPw.value === signData[i].userPw) {
            const loginObj = signData[i];
            sessionStorage.setItem("login_status", JSON.stringify(loginObj));
            _bool = true;
            loginPop.style.display = "none";
        }
    }
    text = _bool ? "성공" : "실패";
    alert(text);
    originState();
    const span = document.querySelector('.loginBtn');
    span.classList.replace('loginBtn', 'loginX');
    const span2 = document.querySelector('.loginX');
    span2.onclick = function () {
        location.href = "./mypage.html";
    };
};
function originState() {
    const login_status = JSON.parse(sessionStorage.getItem("login_status"));
    const userArea = document.querySelector(".user-area");
    const logoutList = document.createElement("li");
    const _span01 = document.querySelector(".user-area > li:nth-child(1) > span");
    const _span02 = document.querySelector(".user-area > li:nth-child(2)");
    if (login_status !== null) {
        _span01.innerHTML = `
      <img src="../src/img/mypageIcon.png" alt="로고">
      ${login_status.userName} 님
    `;
        const _img = document.querySelector(".user-area > li > span > img");
        _img.style.width = "30px";
        _span02.style.display = "none";
        logoutList.innerHTML = "Log-out";
        userArea.append(logoutList);
        logoutList.onclick = function () {
            const logoutQ = confirm("로그아웃을 하시겠습니까?");
            if (logoutQ) {
                sessionStorage.removeItem("login_status");
                _span01.innerHTML = "Log-in";
                logoutList.innerHTML = "Log-out";
                logoutList.style.display = "none";
                _span02.style.display = "block";
                _span01.classList.replace('loginX', 'loginBtn');
                _span01.onclick = function () {
                    location.href = "#";
                    loginPop.style.display = "block";
                };
            }
        };
    }
}
