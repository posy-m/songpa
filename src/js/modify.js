class ModifyManager {
    constructor() {
        this.boardDataList = [];
    }
    render() {
        const param = new URLSearchParams(location.search).get("index");
        const localdata = JSON.parse(localStorage.getItem("board_data"))[param];
        const detail_no = localdata.no;
        const detail_title = localdata.title;
        const detail_userName = localdata.userName;
        const detail_date = localdata.date;
        const detail_content = localdata.content;
        const detail_count = localdata.count;
        const title = document.querySelector("#title");
        const userName = document.querySelector(".writer");
        const date = document.querySelector(".date");
        const content = document.querySelector("#content");
        const btnBoard = document.querySelector("#btn_board");
        const btnCancel = document.querySelector("#btn_cancel");
        const btnConfirm = document.querySelector("#btn_confirm");
        title.innerHTML = detail_title;
        userName.innerHTML = detail_userName;
        date.innerHTML = detail_date;
        content.innerHTML = detail_content;
        btnBoard.onclick = () => {
            location.href = "./board.html?index=1&search=";
        };
        btnCancel.onclick = () => {
            location.href = "./detail.html?index=" + param;
        };
        btnConfirm.onclick = () => {
            if (confirm("수정하시겠습니까? 작성중인 내용이 저장됩니다.")) {
                const modifiedData = {
                    no: detail_no,
                    userName: detail_userName,
                    title: title.value,
                    content: content.value,
                    date: detail_date,
                    count: detail_count
                };
                const modifyItem = JSON.parse(localStorage.getItem("board_data"));
                modifyItem.splice(param, 1, modifiedData);
                localStorage.setItem("board_data", JSON.stringify(modifyItem));
                location.href = "./board.html?index=1&search=";
            }
            else {
                return;
            }
        };
    }
}
const modifyBoard = new ModifyManager;
modifyBoard.render();
