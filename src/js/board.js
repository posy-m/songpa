class BoardData {
    constructor(userName, title, content, date, conut) {
        this.userName = userName;
        this.title = title;
        this.content = content;
        this.date = date;
        this.count = conut;
    }
}
function paintBoard() {
    const boardData = JSON.parse(localStorage.getItem("board_data"));
    const boardList = document.querySelector("#boardList");
    boardList.innerHTML = "";
    localStorage.setItem("", JSON.stringify(this._boardList));
    for (let i = 0; i < boardData.length; i++) {
        const li = document.createElement("li");
        const span1 = document.createElement("span");
        span1.innerHTML = (i + 1) + "";
        const span2 = document.createElement("span");
        span2.innerHTML = boardData[i].userName;
        const span3 = document.createElement("span");
        span3.innerHTML = boardData[i].title;
        const span4 = document.createElement("span");
        span4.innerHTML = boardData[i].date;
        const span5 = document.createElement("span");
        span5.innerHTML = `${boardData[i].count}`;
        span3.addEventListener("click", (e) => {
            location.href = "./detail.html?index=" + i;
            boardData[i].count++;
        });
        boardList.appendChild(li);
        li.append(span1, span2, span3, span4, span5);
    }
}
paintBoard();
