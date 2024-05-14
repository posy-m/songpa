class UserData {
    userId: string;
    userPw: string;
    userName: string;
    constructor(_userId: string, _userPw: string, _userName: string){
        this.userId = _userId;
        this.userPw = _userPw;
        this.userName =_userName;
    }
}

class UserDataManager {
    userList: UserData[];
    constructor(){
        this.userList = [];
    }

    init(LocalStorage): undefined{
        if(LocalStorage === null){
            localStorage.setItem("sign_request", JSON.stringify(this.userList));
        }else{
            this.userList = JSON.parse(LocalStorage);
        }
    }

    save(){
        const admin = new UserData("a", "1", "admin");
        localStorage.setItem("sign_data", JSON.stringify([admin]));
        this.init(localStorage.getItem("sign_request"));
        const id_finder = <HTMLInputElement>document.getElementById("id_text");
        const pw_finder = <HTMLInputElement>document.getElementById("pw_text");
        const pw_finder2 = <HTMLInputElement>document.getElementById("pw_check");
        const name_finder = <HTMLInputElement>document.getElementById("name_text");
        const id_dbl = <HTMLButtonElement>document.getElementById("id_check");
        const name_dbl = <HTMLButtonElement>document.getElementById("name_check");
        id_dbl.onclick = () => {
            const UserData = JSON.parse(localStorage.getItem("sign_data"));
            for(let i = 0; i < UserData.length; i++){
                if(UserData[i].userId === id_finder.value){
                    const fail = document.createElement("span");
                    fail.innerText = "이미 사용중인 아이디입니다";
                    fail.classList.add("id_impossible");
                    const finder = document.querySelector(".id-box");
                    finder.append(fail);
                }else{
                    const success = document.createElement("span");
                    success.innerText = "사용 가능한 아이디입니다";
                    success.classList.add("id_possible");
                    const finder = document.querySelector(".id-box");
                    finder.append(success);
                }
            }
        }
        name_dbl.onclick = () => {
            const UserData = JSON.parse(localStorage.getItem("sign_data"));
            for(let i = 0; i < UserData.length; i++){
                if(UserData[i].userName === name_finder.value){
                    const fail = document.createElement("span");
                    fail.innerText = "이미 사용중인 닉네임입니다";
                    fail.classList.add("name_impossible");
                    const finder = document.querySelector(".name-box");
                    finder.append(fail);
                }else{
                    const success = document.createElement("span");
                    success.innerText = "사용 가능한 닉네임입니다";
                    success.classList.add("name_possible");
                    const finder = document.querySelector(".name-box");
                    finder.append(success);
                }
            }
        }


        const clear_btn = document.getElementById("clear_btn");
        clear_btn.onclick = () => {
            const find = document.querySelector(".id_possible");
            const find2 = document.querySelector(".name_possible");
            if(pw_finder.value !== pw_finder2.value){
                alert("비밀번호가 일치하지 않습니다");
                window.location.reload();
            }
            if((pw_finder.value === pw_finder2.value) && (idLength(id_finder.value)) && (onlyNumberAndEnglish(id_finder.value)) && (strongPassword(pw_finder.value)) && (find.innerHTML !== null) && (find2.innerHTML !== null)){
                console.log(1);
                const newData = new UserData(id_finder.value, pw_finder.value, name_finder.value);
                this.userList.push(newData);
                localStorage.setItem("sign_request", JSON.stringify(this.userList));
            }
        }
    }
}

function idLength(value) {
    return value.length >= 4 && value.length <= 12
}

function onlyNumberAndEnglish(str) {
    return /^[A-Za-z0-9][A-Za-z0-9]*$/.test(str);
}

function strongPassword (str) {
    return /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/.test(str);
}

const userDataManager = new UserDataManager();
userDataManager.save();