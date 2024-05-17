function paintBoard() {
    const boardData = JSON.parse(localStorage.getItem("board_data"));
    const boardList = document.querySelector("#boardList");
    boardList.innerHTML = "";
    localStorage.setItem("", JSON.stringify(this._boardList));
    let list = [];
    for (let i = 0; i < boardData.length; i++) {
        if (localStorage.getItem("num") === null) {
            localStorage.setItem("num", JSON.stringify(list));
        }
        else {
            list = JSON.parse(localStorage.getItem("num"));
        }
        const li = document.createElement("li");
        const span1 = document.createElement("span");
        list.push(i);
        localStorage.setItem("num", JSON.stringify(list));
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
            console.log(boardData[i].count);
            location.href = "./detail.html?index=" + i;
            boardData[i].count++;
        });
        boardList.appendChild(li);
        li.append(span1, span2, span3, span4, span5);
    }
}
paintBoard();
const boardData = JSON.parse(localStorage.getItem("board_data"));
const countPage = 6;
const getPageCount = () => {
    return Math.ceil(50 / countPage);
};
const numButtonWapper = document.querySelector('.number-button-wraper');
const setPageButtons = () => {
    numButtonWapper.innerHTML = '';
    for (let i = 1; i <= getPageCount(); i++) {
        numButtonWapper.innerHTML += `<span class= "number-button"> ${i} </span>`;
    }
};
setPageButtons();
const ul = document.querySelector('ul');
let currentPage = 1;
const setPageOf = (pageNumber) => {
    ul.innerHTML = "";
    for (let i = countPage * (pageNumber - 1) + 1; i <= countPage * (pageNumber - 1) + 6 && i <= boardData.length; i++) {
        let li = document.createElement('li');
        const postContainer = document.createElement('span');
        postContainer.className = 'post-container';
        const postNumber = document.createElement('span');
        postNumber.className = 'post-number';
        const Nickname = document.createElement('span');
        Nickname.className = 'nick-name';
        const title = document.createElement('span');
        title.className = 'title';
        const date = document.createElement('span');
        date.className = 'date';
        const count = document.createElement('span');
        count.className = 'count';
        const im = i - 1;
        const num = JSON.parse(localStorage.getItem("num"));
        postNumber.textContent = num[i];
        Nickname.textContent = boardData[i - 1].userName;
        title.textContent = boardData[i - 1].title;
        date.textContent = boardData[i - 1].date;
        count.textContent = boardData[i - 1].count;
        postContainer.append(postNumber, Nickname, title, date, count);
        li.append(postContainer);
        ul.append(li);
    }
};
const pageNumberButtons = document.querySelectorAll('.number-button');
pageNumberButtons.forEach((numberBtn) => {
    numberBtn.addEventListener('click', (e) => {
        setPageOf(+e.target.innerHTML);
    });
});
const prevBtn = document.querySelector('.prev-button');
const nextBtn = document.querySelector('.next-button');
prevBtn.addEventListener("click", () => {
    if (currentPage > 1) {
        currentPage -= 1;
        setPageOf(currentPage);
    }
});
nextBtn.addEventListener('click', () => {
    if (currentPage < getPageCount()) {
        currentPage += 1;
        setPageOf(currentPage);
    }
});
