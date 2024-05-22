const sign_data = JSON.parse(localStorage.getItem("sign_data"));
const loginStatus = JSON.parse(sessionStorage.getItem("login_status"));
function mypage() {
    const login_data = JSON.parse(sessionStorage.getItem("login_status"));
    const id = document.getElementById("id-text");
    const pw = document.getElementById("pw-text1");
    const pw_re = document.getElementById("pw-text2");
    const pw_btn = document.getElementById("pw-rp");
    const name = document.getElementById("name-text");
    const name_btn = document.getElementById("name-rpl");
    id.innerHTML = login_data.userId;
    name.value = login_data.userName;
    pw_btn.addEventListener("click", () => {
        if (!strongPasswordRe(pw.value)) {
            alert("영문 특수문자 포함 8자리 이상 입력해주세요");
            return;
        }
        if (confirm("정말 변경하시겠습니까?")) {
            for (let i = sign_data.length - 1; i >= 0; i--) {
                if ((pw.value === pw_re.value) && (sign_data[i].userId === loginStatus.userId)) {
                    sign_data[i].userPw = pw.value;
                    localStorage.setItem("sign_data", JSON.stringify(sign_data));
                    loginStatus.userPw = pw.value;
                    sessionStorage.setItem("login_status", JSON.stringify(loginStatus));
                    pw.value = "";
                    pw_re.value = "";
                    alert("비밀번호가 변경됐습니다.");
                    return;
                }
                else {
                    alert("비밀번호가 일치하지 않습니다.");
                    return;
                }
            }
        }
        else {
            return;
        }
    });
    name_btn.addEventListener("click", () => {
        if (confirm("정말 변경하시겠습니까?")) {
            for (let i = 0; i < sign_data.length; i++) {
                if (sign_data[i].userName === login_data.userName) {
                    login_data.userName = name.value;
                    sessionStorage.setItem("login_status", JSON.stringify(login_data));
                    sign_data[i].userName = name.value;
                    localStorage.setItem("sign_data", JSON.stringify(sign_data));
                }
                else if (sign_data[i].userName === name.value) {
                    alert("이미 있는 닉네임 입니다.");
                    return;
                }
            }
            location.reload();
        }
        else {
            return;
        }
    });
}
mypage();
function strongPasswordRe(str) {
    return /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/.test(str);
}
const profileDOM = document.getElementById("profile");
const imgProfile = document.getElementById("profileImg");
const createImg = document.createElement("createImg");
createImg.src;
const profileSave = document.getElementById("imgSave");
const basicImg = document.getElementById("basicImg");
function changeProfile() {
    for (let i = 0; i < sign_data.length; i++) {
        if (loginStatus.userId === sign_data[i].userId) {
            imgProfile.src = sign_data[i].profileImg;
        }
    }
}
changeProfile();
profileDOM.addEventListener("change", function (e) {
    const imgName = JSON.stringify(e.target.files[0].name);
    imgProfile.src = `http://127.0.0.1:5500/src/img/${imgName.split('"').join("")}`;
    profileSave.onclick = function () {
        if (confirm("프로필 사진을 변경하시겠습니까?")) {
            for (let i = 0; i < sign_data.length; i++) {
                if (loginStatus.userId === sign_data[i].userId) {
                    sign_data[i].profileImg = imgProfile.src;
                    localStorage.setItem("sign_data", JSON.stringify(sign_data));
                }
            }
        }
        else {
            return;
        }
    };
});
basicImg.onclick = function () {
    if (confirm("기본이미지 변경하시겠습니까?")) {
        for (let i = 0; i < sign_data.length; i++) {
            if (loginStatus.userId === sign_data[i].userId) {
                imgProfile.src = "http://127.0.0.1:5500/src/img/mypageIcon.png";
                sign_data[i].profileImg = imgProfile.src;
                localStorage.setItem("sign_data", JSON.stringify(sign_data));
            }
        }
    }
    else {
        return;
    }
};
