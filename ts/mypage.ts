function mypage(){
    const login_data = JSON.parse(sessionStorage.getItem("login_status"));
    const id = <HTMLInputElement>document.getElementById("id-text");
    const id_btn = <HTMLButtonElement>document.getElementById("id-rpl");
    const pw = <HTMLInputElement>document.getElementById("pw-text");
    const pw_btn = document.getElementById("pw-rpl")
    const name = <HTMLInputElement>document.getElementById("name-text");
    const name_btn = document.getElementById("name-rpl");
    id.value = login_data.userId;
    pw.value = login_data.userPw;
    name.value = login_data.userName;
    const sign_data = JSON.parse(localStorage.getItem("sign_data"));
    id_btn.onclick = () => {
        if(confirm("정말 변경하시겠습니까?")){
            for(let i = 0; i < sign_data.length; i++){
                console.log(1);
                console.log(sign_data);
                console.log(login_data);
                if(sign_data[i] === login_data){
                    login_data.userId = id.value;
                    sessionStorage.setItem("login_status", JSON.stringify(login_data));
                    sign_data[i].userId = id.value;
                    localStorage.setItem("sign_data", JSON.stringify(sign_data));
                }
            }
        }else{
            return;
        }
    }
    pw_btn.addEventListener("click", () => {
        if(confirm("정말 변경하시겠습니까?")){
            for(let i = 0; i < sign_data.length; i++){
                if(sign_data[i] === login_data){
                    login_data.userPw = pw.value;
                    sessionStorage.setItem("login_status", JSON.stringify(login_data));
                    sign_data[i].userPw = pw.value;
                    localStorage.setItem("sign_data", JSON.stringify(sign_data));
                }
            }
        }else{
            return;
        }
    })
    name_btn.addEventListener("click", () => {
        if(confirm("정말 변경하시겠습니까?")){
            for(let i = 0; i < sign_data.length; i++){
                if(sign_data[i] === login_data){
                    login_data.userName = name.value;
                    sessionStorage.setItem("login_status", JSON.stringify(login_data));
                    sign_data[i].userName = name.value;
                    localStorage.setItem("sign_data", JSON.stringify(sign_data));
                }
            }
        }else{
            return;
        }
    })
}

mypage();