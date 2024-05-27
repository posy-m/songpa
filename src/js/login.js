const signData = JSON.parse(localStorage.getItem("sign_data"));
const formbtn = document.querySelector("#login_form");
const userId = document.querySelector("#userId");
const userPw = document.querySelector("#userPw");
const loginPopupBtn = document.querySelector(".loginBtn");
const loginPop = document.querySelector(".login-popup");
const loginDeleteBtn = document.querySelector(".login-delete");
const body = document.querySelector("body");
loginPopupBtn.onclick = () => {
    loginPop.style.display = "block";
    body.style.overflow = "hidden";
};
loginDeleteBtn.onclick = () => {
    loginPop.style.display = "none";
    body.style.overflow = "visible";
};
function originState() {
    const login_status = JSON.parse(sessionStorage.getItem("login_status"));
    const userArea = document.querySelector(".user-area");
    const logoutList = document.createElement("li");
    logoutList.classList.add("click-cursor");
    const _span01 = document.querySelector(".user-area > li:nth-child(1) > span");
    const _span02 = document.querySelector(".user-area > li:nth-child(2)");
    if (login_status !== null && JSON.stringify(login_status) !== "{}") {
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
                sessionStorage.setItem("login_status", JSON.stringify({}));
                _span01.innerHTML = "Log-in";
                logoutList.innerHTML = "Log-out";
                logoutList.style.display = "none";
                _span02.style.display = "block";
                _span01.classList.replace('loginX', 'loginBtn');
                _span01.onclick = function () {
                    loginPop.style.display = "block";
                    userId.value = "";
                    userPw.value = "";
                    location.href = location.href;
                };
            }
        };
    }
}
function myPage() {
    const login_status = JSON.parse(sessionStorage.getItem("login_status"));
    if (login_status === null || JSON.stringify(login_status) !== "{}") {
        const _span01 = document.querySelector(".user-area > li:nth-child(1) > span");
        if (login_status.userId === signData[0].userId && login_status.userPw === signData[0].userPw) {
            _span01.onclick = function () {
                location.href = "admin.html";
            };
        }
        else {
            _span01.onclick = function () {
                location.href = "mypage.html";
            };
        }
    }
}
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
            location.reload();
        }
    }
    text = _bool ? "로그인이 성공했습니다." : "아이디와 비밀번호를 확인해주세요.";
    alert(text);
};
const loginStatus4 = sessionStorage.getItem("login_status");
const gameMove4 = document.getElementById("game-move");
gameMove4.onclick = () => {
    if (loginStatus4 !== null && JSON.stringify(loginStatus4) !== '"{}"') {
        location.href = "./donutgame.html";
    }
    else {
        alert("로그인이 필요합니다.");
    }
};
originState();
myPage();
const loginStatus = sessionStorage.getItem("login_status");
const gameMove = document.getElementById("game-move");
gameMove.onclick = () => {
    if (loginStatus && loginStatus !== "{}") {
        location.href = "./donutgame.html";
    }
    else {
        alert("로그인이 필요합니다.");
    }
};
