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

    render() {
        // this.getLocalStorage(localStorage.getItem("board_data"))

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
        //
        const localdata = JSON.parse(localStorage.getItem("board_data"))[param];


        const detail_title = localdata.title;
        const detail_userName = localdata.userName;
        const detail_date = localdata.date;
        const detail_content = localdata.content;

        const title = <HTMLElement>document.querySelector("#title");
        const userName = <HTMLElement>document.querySelector(".writer");
        const date = <HTMLElement>document.querySelector(".date");
        const content = <HTMLElement>document.querySelector("#content");

        const btnDelete = <HTMLElement>document.querySelector("#btn_delete");
        const btnBoard = <HTMLElement>document.querySelector("#btn_board");
        const btnConfirm = <HTMLElement>document.querySelector("#btn_confirm");

        title.innerHTML = detail_title;
        userName.innerHTML = detail_userName;
        date.innerHTML = detail_date;
        content.innerHTML = detail_content;

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
            if (confirm("삭제하시겠습니까?")) {
                deleteItem.splice(param, 1)
                localStorage.setItem("board_data", JSON.stringify(deleteItem))
                location.href = "./board.html?index=1&search=";
            } else {
                return;
            }
        }

        // 내 이름과 일치하지않고 관리자 이름도 아닐 경우 하단 버튼 비활성화
        if ((detail_userName !== (JSON.parse(sessionStorage.getItem("login_status"))).userName) && "admin" !== (JSON.parse(sessionStorage.getItem("login_status"))).userName) {
            const btnBox = <HTMLElement>document.querySelector(".btnright")
            btnBox.innerHTML = "";
        }
    }
}

const detailBoard = new DetailRenderManager
detailBoard.render();