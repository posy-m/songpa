class ModifyManager {
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
    modify() {
    }
    render() {
        const param = new URLSearchParams(location.search).get("index");
        const localdata = JSON.parse(localStorage.getItem("board_data"))[param];
    }
}
const modifyBoard = new ModifyManager;
modifyBoard.render();
