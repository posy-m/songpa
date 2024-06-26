class WriteSaveManager {
    constructor() {
        this.boardDataList = [];
    }
    getLocalStorage(a) {
        if (a === null) {
            localStorage.setItem("board_data", JSON.stringify(writeBoard.boardDataList));
        }
        else {
            writeBoard.boardDataList = JSON.parse(a);
        }
    }
    setLocalStorage(a) {
        writeBoard.boardDataList.push(a);
        localStorage.setItem("board_data", JSON.stringify(writeBoard.boardDataList));
    }
    save() {
        writeBoard.getLocalStorage(localStorage.getItem("board_data"));
        const title = document.querySelector("#title");
        const content = document.querySelector("#content");
        const btnBoard = document.querySelector("#btn_board");
        const btnConfirm = document.querySelector("#btn_confirm");
        btnBoard.onclick = () => {
            if (confirm("글 작성을 취소하고 목록으로 돌아가시겠습니까? 작성중인 내용은 저장되지 않습니다.")) {
                location.href = "./board.html?index=1&search=";
            }
            else {
                return;
            }
        };
        btnConfirm.onclick = () => {
            const no = JSON.parse(localStorage.getItem("board_data")) ? JSON.parse(localStorage.getItem("board_data")).length : 0;
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
            const count = 0;
            const writeData = {
                no,
                userName: (JSON.parse(sessionStorage.getItem("login_status"))).userName,
                title: title.value,
                content: content.value,
                date: `${year}-${month}-${day}`,
                count: count
            };
            if (confirm("작성을 완료하시겠습니까? 작성중인 내용이 저장됩니다.")) {
                this.setLocalStorage(writeData);
                location.href = "./board.html?index=1&search=";
            }
            else {
                return;
            }
        };
    }
}
const writeBoard = new WriteSaveManager;
writeBoard.save();
