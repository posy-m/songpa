const signData = JSON.parse(localStorage.getItem("sign_data"));
const loginStateArray = [];
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
    for (let i = 0; i < signData.length; i++) {
        if (userId.value == signData[i].userId && userPw.value == signData[i].userPw) {
            const loginObj = {
                loginId: userId.value,
                loginPw: userPw.value
            };
            loginStateArray.push(loginObj);
            sessionStorage.setItem("loginState", JSON.stringify(loginStateArray));
            loginPop.style.display = "none";
            text = "로그인 완료";
        }
        else {
            sessionStorage.removeItem("loginState");
            text = "로그인 실패";
        }
    }
    alert(text);
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
    const _list = document.querySelector(".user-area > li");
    const _span = document.querySelector(".user-area > li > span");
    if (loginState !== null) {
        _span.innerHTML = loginState[0].userId + " 님";
    }
}
originState();
