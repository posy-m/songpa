class DetailRenderManager {
    constructor() {
        this.boardDataList = [];
        this.sessionData = {};
        this.replyReplyData = [];
    }
    getsessionStorage(a) {
        if (a === null) {
            sessionStorage.setItem("login_status", JSON.stringify(detailBoard.sessionData));
        }
    }
    setLocalStorage(a) {
        detailBoard.boardDataList.push(a);
        localStorage.setItem("reply_data", JSON.stringify(detailBoard.boardDataList));
    }
    getLocalStorage(a) {
        if (a === null) {
            localStorage.setItem("reply_data", JSON.stringify(detailBoard.boardDataList));
        }
        else {
            detailBoard.boardDataList = JSON.parse(a);
        }
    }
    setLocalStorageReplyReply(a) {
        detailBoard.replyReplyData.push(a);
        localStorage.setItem("replyreply_data", JSON.stringify(detailBoard.replyReplyData));
    }
    getLocalStorageReplyReply(a) {
        if (a === null) {
            localStorage.setItem("replyreply_data", JSON.stringify(detailBoard.replyReplyData));
        }
        else {
            detailBoard.replyReplyData = JSON.parse(a);
        }
    }
    render() {
        this.getLocalStorage(localStorage.getItem("reply_data"));
        this.getLocalStorageReplyReply(localStorage.getItem("replyreply_data"));
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
                const replyModify = document.createElement("button");
                const replyDelete = document.createElement("button");
                const replyReplyBtn = document.createElement("button");
                const replyDate = document.createElement("div");
                const replyContent = document.createElement("div");
                replyContent.classList.add("replycontentbox");
                const replyReplyList = document.createElement("div");
                replyReplyList.classList.add("replyreplylist");
                const replyReplyinput = document.createElement("div");
                replyWriter.innerHTML = detail_replyUserName;
                replyDetail.innerHTML = detail_reply;
                replyDate.innerHTML = detail_replydate;
                replyModify.innerHTML = "수정";
                replyDelete.innerHTML = "삭제";
                replyReplyBtn.innerHTML = "답글달기";
                replyContent.append(replyWriter, replyDetail, replyDate, replyModify, replyDelete, replyReplyBtn);
                replyList.append(replyContent, replyReplyList, replyReplyinput);
                if (detail_replyUserName !== (JSON.parse(sessionStorage.getItem("login_status"))).userName && "admin" !== (JSON.parse(sessionStorage.getItem("login_status"))).userName) {
                    replyModify.outerHTML = "";
                    replyDelete.outerHTML = "";
                }
                for (let x = 0; x < (JSON.parse(localStorage.getItem("replyreply_data"))).length; x++) {
                    if ((JSON.parse(localStorage.getItem("replyreply_data")))[x].replyreplyindex == i) {
                        const localReplyReplyData = JSON.parse(localStorage.getItem("replyreply_data"))[x];
                        const detail_replyReplyUserName = localReplyReplyData.replyUserName;
                        const detail_replyreply = localReplyReplyData.reply;
                        const detail_replyreplydate = localReplyReplyData.replydate;
                        const replyReplyWriter = document.createElement("div");
                        const replyReplyDetail = document.createElement("div");
                        const replyReplyDate = document.createElement("div");
                        const replyReplyContent = document.createElement("div");
                        replyReplyContent.classList.add("replyreplycontent");
                        const replyReplyModify = document.createElement("button");
                        const replyReplyDelete = document.createElement("button");
                        replyReplyWriter.innerHTML = detail_replyReplyUserName;
                        replyReplyDetail.innerHTML = detail_replyreply;
                        replyReplyDate.innerHTML = detail_replyreplydate;
                        replyReplyModify.innerHTML = "수정";
                        replyReplyDelete.innerHTML = "삭제";
                        replyReplyContent.append(replyReplyWriter, replyReplyDetail, replyReplyDate, replyReplyModify, replyReplyDelete);
                        replyReplyList.append(replyReplyContent);
                        replyReplyModify.onclick = () => {
                            const replyTextArea = document.createElement("textarea");
                            replyReplyDetail.innerHTML = "";
                            replyReplyDetail.append(replyTextArea);
                            replyTextArea.innerHTML = detail_replyreply;
                            replyReplyModify.innerHTML = "수정완료";
                            replyReplyModify.onclick = () => {
                                replyReplyModify.innerHTML = "수정";
                                const modifiedReplyReply = {
                                    replyUserName: detail_replyReplyUserName,
                                    reply: replyTextArea.value,
                                    replydate: detail_replyreplydate,
                                    replyindex: param,
                                    replyreplyindex: i,
                                };
                                const modifyItemReply = JSON.parse(localStorage.getItem("replyreply_data"));
                                modifyItemReply.splice(x, 1, modifiedReplyReply);
                                localStorage.setItem("replyreply_data", JSON.stringify(modifyItemReply));
                                location.reload();
                            };
                        };
                        replyReplyDelete.onclick = () => {
                            if (confirm("대댓글을 삭제하시겠습니까?")) {
                                const modifyItemReply = JSON.parse(localStorage.getItem("replyreply_data"));
                                modifyItemReply.splice(x, 1);
                                localStorage.setItem("replyreply_data", JSON.stringify(modifyItemReply));
                                location.reload();
                            }
                            else {
                                return;
                            }
                        };
                    }
                }
                replyReplyBtn.onclick = () => {
                    const replyReplyInput = document.createElement("textarea");
                    const replyReplySubmit = document.createElement("button");
                    const replyReplyCancel = document.createElement("button");
                    replyReplyCancel.innerHTML = "취소";
                    replyReplySubmit.innerHTML = "작성";
                    replyReplyBtn.innerHTML = "";
                    replyReplyinput.append(replyReplyInput, replyReplyCancel, replyReplySubmit);
                    replyReplyCancel.onclick = () => {
                        replyReplyinput.innerHTML = "";
                        replyReplyBtn.innerHTML = "답글달기";
                    };
                    replyReplySubmit.onclick = () => {
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
                        const replyReplyData = {
                            replyUserName: (JSON.parse(sessionStorage.getItem("login_status"))).userName,
                            reply: replyReplyInput.value,
                            replydate: `${year}-${month}-${day}`,
                            replyindex: param,
                            replyreplyindex: i,
                        };
                        this.setLocalStorageReplyReply(replyReplyData);
                        location.reload();
                    };
                };
                replyModify.onclick = () => {
                    const textArea = document.createElement("textarea");
                    textArea.classList.add("textarea");
                    replyDetail.innerHTML = "";
                    replyDetail.append(textArea);
                    textArea.innerHTML = detail_reply;
                    replyModify.innerHTML = "수정완료";
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
                    const deleteReply = JSON.parse(localStorage.getItem("reply_data"));
                    const originalReplyReply = JSON.parse(localStorage.getItem("replyreply_data"));
                    const deleteReplyReply = JSON.parse(localStorage.getItem("replyreply_data"));
                    if (confirm("댓글을 삭제하시겠습니까?")) {
                        deleteReply.splice(i, 1);
                        localStorage.setItem("reply_data", JSON.stringify(deleteReply));
                        for (let n = originalReplyReply.length - 1; n >= 0; n--) {
                            if ((originalReplyReply[n].replyreplyindex) == i && (originalReplyReply[n].replyindex) == param) {
                                deleteReplyReply.splice(n, 1);
                            }
                            else if ((deleteReplyReply[n].replyreplyindex) > i) {
                                deleteReplyReply[n].replyreplyindex = deleteReplyReply[n].replyreplyindex - 1;
                            }
                        }
                        localStorage.setItem("replyreply_data", JSON.stringify(deleteReplyReply));
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
