class DetailRenderManager {
    constructor() {
        this.boardDataList = [];
    }
    getLocalStorage(a) {
        if (a === null) {
            localStorage.setItem("board_data", JSON.stringify(this.boardDataList));
        }
        else {
            this.boardDataList = JSON.parse(a);
        }
    }
    render() {
        const param = new URLSearchParams(location.search).get("index");
        let str = location.search;
        str = str.replace("?", "");
        str = str.split("=");
        const localdata = JSON.parse(localStorage.getItem("board_data"))[parseInt(param)];
        const detail_title = localdata.title;
        const detail_writer = localdata.writer;
        const detail_date = localdata.date;
        const detail_content = localdata.content;
        const title = document.querySelector("#title");
        const writer = document.querySelector(".writer");
        const date = document.querySelector(".date");
        const content = document.querySelector("#content");
        const btnDelete = document.querySelector("#btn_delete");
        const btnCancel = document.querySelector("#btn_cancel");
        const btnConfirm = document.querySelector("#btn_confirm");
        title.innerHTML = detail_title;
        writer.innerHTML = detail_writer;
        date.innerHTML = detail_date;
        content.innerHTML = detail_content;
        btnDelete.onclick = () => {
            const deleteItem = JSON.parse(localStorage.getItem("board_data"));
            if (confirm("삭제하시겠습니까?")) {
                deleteItem.splice(param, 1);
                localStorage.setItem("board_data", JSON.stringify(deleteItem));
                location.href = "./board.html";
            }
            else {
                return;
            }
        };
        btnCancel.onclick = () => {
            location.href = "./board.html";
        };
        btnConfirm.onclick = () => {
            location.href = "./modify.html";
        };
    }
}
const detailBoard = new DetailRenderManager;
detailBoard.render();