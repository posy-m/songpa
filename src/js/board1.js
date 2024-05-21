const urlStr = window.location.href;
const url = new URL(urlStr);
const urlparams = url.searchParams;
const currentPage = urlparams.get('index');
const searchInput = urlparams.get('search');
const wirteLink = document.querySelector("#wirtelink");
const login_status = JSON.parse(sessionStorage.getItem("login_status"));
wirteLink.onclick = () => {
    if (login_status === null) {
        if (confirm("로그인 해주세요")) {
            const loginPop = document.querySelector(".login-popup");
            loginPop.style.display = "block";
        }
        else {
            return;
        }
    }
    else {
        location.href = "./write.html";
    }
};
let boardList = JSON.parse(localStorage.getItem("board_data")).reverse();
if (!boardList) {
    boardList = [];
}
let totalBoardLength = boardList.length;
function paintPage(page) {
    const startIndex = (page - 1) * 10;
    const endIndex = startIndex + 10;
    let resultData = [...boardList];
    if (searchInput) {
        resultData = resultData.filter((value, index) => {
            return value.title.includes(searchInput) == true;
        });
    }
    const showBoardData = resultData.slice(startIndex, endIndex > resultData.length ? resultData.length : endIndex);
    const boardListcontainer = document.querySelector("#boardList");
    let i = 0;
    showBoardData.forEach((element) => {
        const li = document.createElement("tr");
        const no = document.createElement("td");
        i++;
        no.innerHTML = (((parseInt(currentPage) - 1) * 10) + i).toString();
        const userName = document.createElement("td");
        userName.innerHTML = element.userName;
        const title1 = document.createElement("td");
        const title = document.createElement("a");
        title.innerHTML = element.title;
        title1.appendChild(title);
        title.href = "detail.html?index=" + element.no;
        const date = document.createElement("td");
        date.innerHTML = element.date;
        const count = document.createElement("td");
        count.innerHTML = element.count.toString();
        li.append(no, title1, userName, date, count);
        boardListcontainer.appendChild(li);
    });
}
paintPage(parseInt(currentPage));
function createPage() {
    boardList = JSON.parse(localStorage.getItem("board_data")).reverse();
    let resultData = [...boardList];
    if (searchInput) {
        resultData = resultData.filter((value, index) => {
            return value.title.includes(searchInput) == true;
        });
    }
    let totalPage = Math.ceil(resultData.length / 10);
    function createPageItem(page, isActive = false) {
        const pagination = document.querySelector("#pagination");
        const pageLink = document.createElement("a");
        pageLink.classList.add("pagenation");
        pageLink.innerText = page.toString();
        const inputSearch = document.querySelector("#inputSearch");
        if (isActive === true) {
            pageLink.classList.add("active");
        }
        pageLink.href = "board.html?index=" + page + "&search=" + searchInput;
        pagination.append(pageLink);
    }
    for (let i = 0; i < totalPage; i++) {
        createPageItem(i + 1, i + 1 === parseInt(currentPage));
    }
}
createPage();
const boardSearch = document.querySelector("#boardSearch");
function search(e) {
    e.preventDefault();
    const inputSearch = document.querySelector("#inputSearch");
    if (inputSearch) {
        location.href = "board.html?index=" + 1 + "&search=" + inputSearch.value;
    }
}
boardSearch.addEventListener("submit", search);
