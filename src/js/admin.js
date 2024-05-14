class AdminPageManager {
    constructor() {
        this.signList = [];
    }
    init(LocalStorage) {
        if (LocalStorage === null) {
            localStorage.setItem("sign_data", JSON.stringify(this.signList));
        }
        else {
            this.signList = JSON.parse(LocalStorage);
        }
    }
    register() {
        const request = JSON.parse(localStorage.getItem("sign_request"));
        this.init(localStorage.getItem("sign_data"));
        const view = document.getElementById("content");
        view.innerHTML = `<div class="top"><span>아이디</span><span>닉네임</span><span>날짜</span><span>수락여부</span></div>`;
        for (let i = 0; i < request.length; i++) {
            const div = document.createElement("div");
            const id_span = document.createElement("span");
            const name_span = document.createElement("span");
            const date_span = document.createElement("span");
            const btn_span = document.createElement("span");
            const img1 = document.createElement("span");
            const img2 = document.createElement("span");
            id_span.innerHTML = request[i].userId;
            name_span.innerHTML = request[i].userName;
            date_span.innerHTML = request[i].date;
            img1.innerText = "✅";
            img2.innerHTML = "❌";
            btn_span.append(img1, img2);
            div.append(id_span, name_span, date_span, btn_span);
            view.append(div);
            img1.onclick = () => {
                this.signList.push(request[i]);
                localStorage.setItem("sign_data", JSON.stringify(this.signList));
                request.splice(i, 1);
                localStorage.setItem("sign_request", JSON.stringify(request));
                window.location.reload();
            };
            img2.onclick = () => {
                if (confirm("삭제?")) {
                    request.splice(i, 1);
                    localStorage.setItem("sign_request", JSON.stringify(request));
                    console.log(request);
                    window.location.reload();
                }
                else {
                    return;
                }
            };
        }
    }
}
const adminPageManager = new AdminPageManager();
adminPageManager.register();
