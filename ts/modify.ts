class ModifyManager {
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

    modify() {

    }

    render() {
        const param = new URLSearchParams(location.search).get("index");

        const localdata = JSON.parse(localStorage.getItem("board_data"))[param]
    }
}

const modifyBoard = new ModifyManager
modifyBoard.render();