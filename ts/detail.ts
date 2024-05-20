class DetailRenderManager {
    boardDataList: WriteData[]
    sessionData: any
    constructor() {
        this.boardDataList = []
        this.sessionData = {}
    }

    // // 로컬스토리지 값이 없을때 빈배열, 있으면 가져옴
    // getLocalStorage(a) {
    //     if (a === null) {
    //         localStorage.setItem("board_data", JSON.stringify(this.boardDataList));
    //     } else {
    //         this.boardDataList = JSON.parse(a);
    //     }
    // }

    // 세션스토리지 값이 없을때 빈객체
    getsessionStorage(a) {
        if (a === null) {
            sessionStorage.setItem("login_status", JSON.stringify(this.sessionData));
        }
    }

    // 댓글 배열 푸시후 댓글배열 로컬에 생성 
    setLocalStorage(a) {
        this.boardDataList.push(a);
        localStorage.setItem("reply_data", JSON.stringify(this.boardDataList))
    }

    getLocalStorage(a) {
        if (a === null) {
            localStorage.setItem("reply_data", JSON.stringify(this.boardDataList));
        } else {
            this.boardDataList = JSON.parse(a);
        }
    }

    render() {
        // this.getLocalStorage(localStorage.getItem("board_data"))

        this.getLocalStorage(localStorage.getItem("reply_data"));

        this.getsessionStorage(sessionStorage.getItem("login_status"));

        const param = new URLSearchParams(location.search).get("index");


        //조회수 만드는 페이지 
        let boardList: IBoard[] = JSON.parse(localStorage.getItem("board_data"))
        boardList.forEach(board => {
            if (param !== undefined) {
                if (board.no === parseInt(param)) {
                    board.count++
                    localStorage.setItem("board_data", JSON.stringify(boardList))
                }
            }
        });

        // 보드 데이터
        const localdata = JSON.parse(localStorage.getItem("board_data"))[param];

        const detail_title = localdata.title;
        const detail_userName = localdata.userName;
        const detail_date = localdata.date;
        const detail_content = localdata.content;

        const title = <HTMLElement>document.querySelector("#title");
        const userName = <HTMLElement>document.querySelector(".writer");
        const date = <HTMLElement>document.querySelector(".date");
        const content = <HTMLElement>document.querySelector("#content");

        const reply = <HTMLInputElement>document.querySelector("#reply");

        const btnDelete = <HTMLElement>document.querySelector("#btn_delete");
        const btnBoard = <HTMLElement>document.querySelector("#btn_board");
        const btnConfirm = <HTMLElement>document.querySelector("#btn_confirm");
        const btnReply = <HTMLElement>document.querySelector("#btn_reply");

        title.innerHTML = detail_title;
        userName.innerHTML = detail_userName;
        date.innerHTML = detail_date;
        content.innerHTML = detail_content;

        // 내 이름과 일치하지않고 관리자 이름도 아닐 경우 댓글 수정삭제 버튼 비활성화
        if ((detail_userName !== (JSON.parse(sessionStorage.getItem("login_status"))).userName) && "admin" !== (JSON.parse(sessionStorage.getItem("login_status"))).userName) {
            const btnBox = <HTMLElement>document.querySelector(".btnright")
            btnBox.outerHTML = "";
        }

        // 댓글 데이터
        for (let i = 0; i < (JSON.parse(localStorage.getItem("reply_data"))).length; i++) {
            if ((JSON.parse(localStorage.getItem("reply_data"))[i].replyindex) == param) {
                const localReplyData = JSON.parse(localStorage.getItem("reply_data"))[i];

                const detail_replyUserName = localReplyData.replyUserName;
                const detail_reply = localReplyData.reply;
                const detail_replydate = localReplyData.replydate;

                const replyList = <HTMLElement>document.querySelector("#replylist");

                const replyWriter = <HTMLElement>document.createElement("div");
                const replyDetail = <HTMLElement>document.createElement("div");
                const replyReply = <HTMLElement>document.createElement("div");
                const replyModify = <HTMLElement>document.createElement("button");
                const replyDelete = <HTMLElement>document.createElement("button");
                const replyDate = <HTMLElement>document.createElement("div");
                const replyContent = <HTMLElement>document.createElement("div");

                replyWriter.innerHTML = detail_replyUserName;
                replyDetail.innerHTML = detail_reply;
                replyDate.innerHTML = detail_replydate;
                replyReply.innerHTML = "답글달기";
                replyModify.innerHTML = "수정";
                replyDelete.innerHTML = "삭제";
                replyContent.append(replyWriter, replyDetail, replyDate, replyReply, replyModify, replyDelete);
                replyList.append(replyContent);

                // 내이름과 일치하지않고 관리자 이름도 아닐경우 비활성화
                if (detail_replyUserName !== (JSON.parse(sessionStorage.getItem("login_status"))).userName && "admin" !== (JSON.parse(sessionStorage.getItem("login_status"))).userName) {
                    replyModify.outerHTML = "";
                    replyDelete.outerHTML = "";
                }

                // 대댓글 버튼
                replyReply.addEventListener("click", () => {
                    console.log(1);
                })

                // 댓글 수정 버튼
                replyModify.onclick = () => {
                    const textArea = <HTMLTextAreaElement>document.createElement("textarea");
                    textArea.classList.add("textarea")
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
                        }
                        const modifyItem = JSON.parse(localStorage.getItem("reply_data"));
                        modifyItem.splice(i, 1, modifiedReply);
                        localStorage.setItem("reply_data", JSON.stringify(modifyItem));
                        location.reload();
                    }
                }

                // 댓글 삭제 버튼
                replyDelete.onclick = () => {
                    if (confirm("댓글을 삭제하시겠습니까?")) {
                        const modifyItem = JSON.parse(localStorage.getItem("reply_data"));
                        modifyItem.splice(i, 1);
                        localStorage.setItem("reply_data", JSON.stringify(modifyItem));
                        location.reload();
                    } else {
                        return;
                    }
                }
            }
        }

        // 목록으로 버튼
        btnBoard.onclick = () => {
            location.href = "./board.html?index=1&search=";
        }

        // 수정하기 버튼
        btnConfirm.onclick = () => {
            location.href = "./modify.html?index=" + param;
        }

        // 삭제 버튼
        btnDelete.onclick = () => {
            const deleteItem = JSON.parse(localStorage.getItem("board_data"));
            const originalReply = JSON.parse(localStorage.getItem("reply_data"));
            const deleteReply = JSON.parse(localStorage.getItem("reply_data"));
            if (confirm("삭제하시겠습니까?")) {
                deleteItem.splice(param, 1)
                localStorage.setItem("board_data", JSON.stringify(deleteItem))
                for (let i = originalReply.length - 1; i >= 0; i--) {
                    if ((originalReply[i].replyindex) == param) {
                        deleteReply.splice(i, 1)
                    }
                }
                localStorage.setItem("reply_data", JSON.stringify(deleteReply))
                location.href = "./board.html?index=1&search=";
            } else {
                return;
            }
        }

        // 댓글 달기 버튼 회원이 아닐경우 댓 버튼 클릭시 얼러트, 빈 값 입력시 얼러트
        btnReply.onclick = () => {
            if (JSON.stringify(sessionStorage.getItem("login_status")) == `"{}"`) {
                alert("로그인을 해주세요!");
            } else if (reply.value === "") {
                alert("댓글을 입력해주세요!")
            } else {
                const date = new Date();
                const year = date.getFullYear();
                let month = (date.getMonth() + 1).toString();
                if (parseInt(month) < 10) {
                    month = "0" + month
                }
                let day = (date.getDate()).toString();
                if (parseInt(day) < 10) {
                    day = "0" + day
                }
                const replyData = {
                    replyUserName: (JSON.parse(sessionStorage.getItem("login_status"))).userName,
                    reply: reply.value,
                    replydate: `${year}-${month}-${day}`,
                    replyindex: param
                }
                // 로컬스토리지로 저장
                this.setLocalStorage(replyData);
                location.reload();
            }
        }
    }
}

const detailBoard = new DetailRenderManager
detailBoard.render();