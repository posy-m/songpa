function paintBoard() {
    const param = new URLSearchParams(location.search).get("index");
    let str = location.search;
    str = str.replace("?", "");
    str = str.split("=");
    const boardData = JSON.parse(localStorage.getItem("board_data"));
    const boardList = document.querySelector("#boardList");
    boardList.innerHTML = "";
    localStorage.setItem("", JSON.stringify(this._boardList));
    const filter = boardData.filter((value) => value);
    console.log(filter);
    const arr = [];
    const hi = Math.floor(boardData.length / 2);
    for (let i = 0; i < hi + 1; i += 2) {
        const num = i + 2;
        const page_arr = boardData.slice(i, num);
        arr.push(page_arr);
        console.log(page_arr);
        console.log(i);
    }
    console.log(arr);
    for (let i = 0; i < arr[param].length; i++) {
        const li = document.createElement("li");
        const span1 = document.createElement("span");
        list.push(i);
        localStorage.setItem("num", JSON.stringify(list));
        span1.innerHTML = (i + 1) + "";
        const span2 = document.createElement("span");
        span2.innerHTML = boardData.userName;
        const span3 = document.createElement("span");
        span3.innerHTML = boardData.title;
        const span4 = document.createElement("span");
        span4.innerHTML = boardData.date;
        const span5 = document.createElement("span");
        span5.innerHTML = `${boardData.count}`;
        span3.addEventListener("click", (e) => {
            console.log(boardData[i].count);
            location.href = "./detail.html?index=" + i;
            boardData[i].count++;
        });
        boardList.appendChild(li);
        li.append(span1, span2, span3, span4, span5);
    }
}
paintBoard();
