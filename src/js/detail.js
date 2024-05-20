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
        let boardList = JSON.parse(localStorage.getItem("board_data"));
        boardList.forEach(board => {
            if (param !== undefined) {
                if (board.no === parseInt(param)) {
                    board.count++;
                    localStorage.setItem("board_data", JSON.stringify(boardList));
                }
            }
        });
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
        if ((detail_userName !== (JSON.parse(sessionStorage.getItem("login_status"))).userName) && "admin" !== (JSON.parse(sessionStorage.getItem("login_status"))).userName) {
            const btnBox = document.querySelector(".btnright");
            btnBox.outerHTML = "";
        }
        for (let i = 0; i < (JSON.parse(localStorage.getItem("reply_data"))).length; i++) {
            if ((JSON.parse(localStorage.getItem("reply_data"))[i].replyindex) == param) {
                const localReplyData = JSON.parse(localStorage.getItem("reply_data"))[i];
                const detail_replyUserName = localReplyData.replyUserName;
                const detail_reply = localReplyData.reply;
                const detail_replydate = localReplyData.replydate;
                const replyList = document.querySelector("#replylist");
                const replyWriter = document.createElement("div");
                const replyDetail = document.createElement("div");
                const replyReply = document.createElement("div");
                const replyModify = document.createElement("button");
                const replyDelete = document.createElement("button");
                const replyDate = document.createElement("div");
                const replyContent = document.createElement("div");
                replyWriter.innerHTML = detail_replyUserName;
                replyDetail.innerHTML = detail_reply;
                replyDate.innerHTML = detail_replydate;
                replyReply.innerHTML = "답글달기";
                replyModify.innerHTML = "수정";
                replyDelete.innerHTML = "삭제";
                replyContent.append(replyWriter, replyDetail, replyDate, replyReply, replyModify, replyDelete);
                replyList.append(replyContent);
                if (detail_replyUserName !== (JSON.parse(sessionStorage.getItem("login_status"))).userName && "admin" !== (JSON.parse(sessionStorage.getItem("login_status"))).userName) {
                    replyModify.outerHTML = "";
                    replyDelete.outerHTML = "";
                }
                replyReply.addEventListener("click", () => {
                    console.log(1);
                });
                replyModify.onclick = () => {
                    const textArea = document.createElement("textarea");
                    textArea.classList.add("textarea");
                    replyDetail.innerHTML = "";
                    replyDetail.append(textArea);
                    textArea.innerHTML = detail_reply;
                    replyModify.innerHTML = "수정완료";
                    replyDelete.innerHTML = "삭제";
                    replyModify.onclick = () => {
                        replyModify.innerHTML = "수정";
                        const modifiedReply = {
                            replyUserName: detail_replyUserName,
                            reply: textArea.value,
                            replydate: detail_replydate,
                            replyindex: param
                        };
                        const modifyItem = JSON.parse(localStorage.getItem("reply_data"));
                        modifyItem.splice(i, 1, modifiedReply);
                        localStorage.setItem("reply_data", JSON.stringify(modifyItem));
                        location.reload();
                    };
                };
                replyDelete.onclick = () => {
                    if (confirm("댓글을 삭제하시겠습니까?")) {
                        const modifyItem = JSON.parse(localStorage.getItem("reply_data"));
                        modifyItem.splice(i, 1);
                        localStorage.setItem("reply_data", JSON.stringify(modifyItem));
                        location.reload();
                    }
                    else {
                        return;
                    }
                };
            }
        }
        btnBoard.onclick = () => {
            location.href = "./board.html?index=1&search=";
        };
        btnConfirm.onclick = () => {
            location.href = "./modify.html?index=" + param;
        };
        btnDelete.onclick = () => {
            const deleteItem = JSON.parse(localStorage.getItem("board_data"));
            const originalReply = JSON.parse(localStorage.getItem("reply_data"));
            const deleteReply = JSON.parse(localStorage.getItem("reply_data"));
            if (confirm("삭제하시겠습니까?")) {
                deleteItem.splice(param, 1);
                localStorage.setItem("board_data", JSON.stringify(deleteItem));
                for (let i = originalReply.length - 1; i >= 0; i--) {
                    if ((originalReply[i].replyindex) == param) {
                        deleteReply.splice(i, 1);
                    }
                }
                localStorage.setItem("reply_data", JSON.stringify(deleteReply));
                location.href = "./board.html?index=1&search=";
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
                let month = (date.getMonth() + 1).toString();
                if (parseInt(month) < 10) {
                    month = "0" + month;
                }
                let day = (date.getDate()).toString();
                if (parseInt(day) < 10) {
                    day = "0" + day;
                }
                const replyData = {
                    replyUserName: (JSON.parse(sessionStorage.getItem("login_status"))).userName,
                    reply: reply.value,
                    replydate: `${year}-${month}-${day}`,
                    replyindex: param
                };
                this.setLocalStorage(replyData);
                location.reload();
            }
        };
    }
}
const detailBoard = new DetailRenderManager;
detailBoard.render();
