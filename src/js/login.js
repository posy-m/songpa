const userRequest = JSON.parse(localStorage.getItem("sign_data"));
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
    for (let i = 0; i < userRequest.length; i++) {
        if (userId.value === userRequest[i].userId && userPw.value === userRequest[i].userPw) {
            const loginObj = {
                loginId: userId.value,
                loginPw: userPw.value
            };
            loginStateArray.push(loginObj);
            sessionStorage.setItem("loginState", JSON.stringify(loginStateArray));
            alert("로그인 완료");
            return;
        }
        else {
            alert("아이디 비밀번호 확인 요망");
            return;
        }
    }
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
