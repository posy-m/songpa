const signData = JSON.parse(localStorage.getItem("sign_data"));
const formbtn = document.querySelector("form");
const userId = document.querySelector("#userId");
const userPw = document.querySelector("#userPw");
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
            const loginObj = {
                loginId: userId.value,
                loginPw: userPw.value
            };
            sessionStorage.setItem("loginState", JSON.stringify(loginObj));
            _bool = true;
        }
    }
    text = _bool ? "성공" : "실패";
    alert(text);
    originState();
};
const loginPopupBtn = document.querySelector(".loginBtn");
const loginPop = document.querySelector(".login-popup");
const loginDeleteBtn = document.querySelector(".login-delete");
loginPopupBtn.onclick = () => {
    loginPop.style.display = "block";
};
loginDeleteBtn.onclick = () => {
    loginPop.style.display = "none";
};
function originState() {
    const loginState = JSON.parse(sessionStorage.getItem("loginState"));
    const userArea = document.querySelector(".user-area");
    const logoutList = document.createElement("li");
    const _span01 = document.querySelector(".user-area > li:nth-child(1) > span");
    const _span02 = document.querySelector(".user-area > li:nth-child(2) > span > a");
    if (loginState !== null) {
        _span01.innerHTML = loginState.loginId + " 님";
        _span02.innerHTML = "My Page";
        _span02.onclick = function () {
            document.getElementById('myPage').href = '';
        };
        logoutList.innerHTML = "Log-out";
        userArea.append(logoutList);
    }
}
