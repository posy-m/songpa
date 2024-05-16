class DetailRenderManager {
    boardDataList: WriteData[]
    constructor() {
        this.boardDataList = []
    }

    // 로컬스토리지 값이 없을때 빈배열, 있으면 가져옴
    getLocalStorage(a) {
        if (a === null) {
            localStorage.setItem("board_data", JSON.stringify(this.boardDataList));
        } else {
            this.boardDataList = JSON.parse(a);
        }
    }

    render() {
        const param = new URLSearchParams(location.search).get("index");
        let str: any = location.search;
        str = str.replace("?", "");
        str = str.split("=");

        const localdata = JSON.parse(localStorage.getItem("board_data"))[parseInt(param)];
        const detail_title = localdata.title;
        const detail_writer = localdata.writer;
        const detail_date = localdata.date;
        const detail_content = localdata.content;

        const title = <HTMLElement>document.querySelector("#title");
        const writer = <HTMLElement>document.querySelector(".writer");
        const date = <HTMLElement>document.querySelector(".date");
        const content = <HTMLElement>document.querySelector("#content");

        const btnDelete = <HTMLElement>document.querySelector("#btn_delete");
        const btnCancel = <HTMLElement>document.querySelector("#btn_cancel");
        const btnConfirm = <HTMLElement>document.querySelector("#btn_confirm");

        title.innerHTML = detail_title;
        writer.innerHTML = detail_writer;
        date.innerHTML = detail_date;
        content.innerHTML = detail_content;


        // 삭제 버튼
        btnDelete.onclick = () => {
            const deleteItem = JSON.parse(localStorage.getItem("board_data"));
            if (confirm("삭제하시겠습니까?")) {
                deleteItem.splice(param, 1)
                localStorage.setItem("board_data", JSON.stringify(deleteItem))
                location.href = "./board.html"
            } else {
                return;
            }
        }

        // 목록으로 버튼
        btnCancel.onclick = () => {
            location.href = "./board.html"
        }

        // 수정하기 버튼
        btnConfirm.onclick = () => {
            location.href = "./modify.html"
        }
    }
}

const detailBoard = new DetailRenderManager
detailBoard.render();