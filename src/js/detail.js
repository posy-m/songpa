class DetailRenderManager {
    constructor() {
        this.boardDataList = [];
        this.sessionData = {};
    }
    getsessionStorage(a) {
        if (a === null) {
            sessionStorage.setItem("login_status", JSON.stringify(this.sessionData));
        }
    }
    setLocalStorage(a) {
        this.boardDataList.push(a);
        localStorage.setItem("reply_data", JSON.stringify(this.boardDataList));
    }
    getLocalStorage(a) {
        if (a === null) {
            localStorage.setItem("reply_data", JSON.stringify(this.boardDataList));
        }
        else {
            this.boardDataList = JSON.parse(a);
        }
    }
    render() {
        this.getLocalStorage(localStorage.getItem("reply_data"));
        this.getsessionStorage(sessionStorage.getItem("login_status"));
        const param = new URLSearchParams(location.search).get("index");
        const localdata = JSON.parse(localStorage.getItem("board_data"))[param];
        const detail_title = localdata.title;
        const detail_userName = localdata.userName;
        const detail_date = localdata.date;
        const detail_content = localdata.content;
        const title = document.querySelector("#title");
        const userName = document.querySelector(".writer");
        const date = document.querySelector(".date");
        const content = document.querySelector("#content");
        const reply = document.querySelector("#reply");
        const btnDelete = document.querySelector("#btn_delete");
        const btnBoard = document.querySelector("#btn_board");
        const btnConfirm = document.querySelector("#btn_confirm");
        const btnReply = document.querySelector("#btn_reply");
        title.innerHTML = detail_title;
        userName.innerHTML = detail_userName;
        date.innerHTML = detail_date;
        content.innerHTML = detail_content;
        for (let i = 0; i < (JSON.parse(localStorage.getItem("reply_data"))).length; i++) {
            if ((JSON.parse(localStorage.getItem("reply_data"))[i].replyindex) == param) {
                const localReplyData = JSON.parse(localStorage.getItem("reply_data"))[i];
                const detail_replyUserName = localReplyData.replyUserName;
                const detail_reply = localReplyData.reply;
                const detail_replydate = localReplyData.replydate;
                const replyList = document.querySelector("#replylist");
                const replyWriter = document.createElement("span");
                const replyDetail = document.createElement("span");
                const replyDate = document.createElement("span");
                const replyContent = document.createElement("div");
                replyWriter.innerHTML = detail_replyUserName;
                replyDetail.innerHTML = detail_reply;
                replyDate.innerHTML = detail_replydate;
                replyContent.append(replyWriter, replyDetail, replyDate);
                replyList.append(replyContent);
            }
        }
        btnBoard.onclick = () => {
            location.href = "./board.html?index=0";
        };
        btnConfirm.onclick = () => {
            location.href = "./modify.html?index=" + param;
        };
        btnDelete.onclick = () => {
            const deleteItem = JSON.parse(localStorage.getItem("board_data"));
            if (confirm("삭제하시겠습니까?")) {
                deleteItem.splice(param, 1);
                localStorage.setItem("board_data", JSON.stringify(deleteItem));
                location.href = "./board.html?index=0";
            }
            else {
                return;
            }
        };
        btnReply.onclick = () => {
            if (JSON.stringify(sessionStorage.getItem("login_status")) == `"{}"`) {
                alert("로그인을 해주세요!");
            }
            else if (reply.value === "") {
                alert("댓글을 입력해주세요!");
            }
            else {
                const date = new Date();
                const year = date.getFullYear();
                const month = date.getMonth() + 1;
                const day = date.getDate();
                const replyData = {
                    replyUserName: (JSON.parse(sessionStorage.getItem("login_status"))).userName,
                    reply: reply.value,
                    replydate: `${year}-${month}-${day}`,
                    replyindex: param
                };
                this.setLocalStorage(replyData);
                location.href = "./detail.html?index=" + param;
            }
        };
        if ((detail_userName !== (JSON.parse(sessionStorage.getItem("login_status"))).userName) && "admin" !== (JSON.parse(sessionStorage.getItem("login_status"))).userName) {
            const btnBox = document.querySelector(".btnright");
            btnBox.innerHTML = "";
        }
    }
}
const detailBoard = new DetailRenderManager;
detailBoard.render();
