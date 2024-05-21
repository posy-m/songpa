class DonutGame {
    constructor(nickName, _score, _renewDate) {
        this.userName = nickName,
            this.score = _score,
            this.renewDate = _renewDate;
    }
}
class DonutGameManager {
    constructor() {
        this.scoreList = [];
    }
    init(storage) {
        if (storage === null) {
            localStorage.setItem("donut_score", JSON.stringify(this.scoreList));
        }
        else {
            this.scoreList = JSON.parse(storage);
        }
    }
    gameOver() {
        this.init(localStorage.getItem("donut_score"));
        const score = document.getElementById("score");
        const userData = JSON.parse(sessionStorage.getItem("login_status"));
        const rankData = JSON.parse(localStorage.getItem("donut_score"));
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
        let check = "아직";
        for (let i = 0; i < rankData.length; i++) {
            if ((userData.userName === rankData[i].userName) && (rankData[i].score < point)) {
                rankData[i].score = point;
                rankData[i].renewDate = `${year}-${month}-${day}`;
                check = "확인";
            }
        }
        if (check === "확인") {
            localStorage.setItem("donut_score", JSON.stringify(rankData));
        }
        else if (check === "아직") {
            const userScore = new DonutGame(userData.userName, point, `${year}-${month}-${day}`);
            this.scoreList.push(userScore);
            localStorage.setItem("donut_score", JSON.stringify(this.scoreList));
        }
    }
    read() {
        const userData = JSON.parse(sessionStorage.getItem("login_status"));
        const rankData = JSON.parse(localStorage.getItem("donut_score"));
        rankData.sort();
        const rankContent = document.querySelector(".rank-content");
        const myRank = document.querySelector(".my-rank");
        let hi = "hi";
        for (let i = 0; i < rankData.length; i++) {
            const box = document.createElement("div");
            const ranking = document.createElement("span");
            const user = document.createElement("span");
            const score = document.createElement("span");
            const date = document.createElement("span");
            ranking.innerHTML = `${i + 1}`;
            user.innerHTML = `${rankData[i].userName}`;
            score.innerHTML = `${rankData[i].score}`;
            date.innerHTML = `${rankData[i].renewDate}`;
            box.append(ranking, user, score, date);
            rankContent.append(box);
            if (rankData[i].userName === userData.userName) {
                hi = "정보 있음";
                const myBox = document.createElement("div");
                const ranking = document.createElement("span");
                const me = document.createElement("span");
                const myScore = document.createElement("span");
                const myDate = document.createElement("span");
                ranking.innerHTML = `${i + 1}`;
                me.innerHTML = `${rankData[i].userName}`;
                myScore.innerHTML = `${rankData[i].score}`;
                myDate.innerHTML = `${rankData[i].renewDate}`;
                myBox.append(ranking, me, myScore, myDate);
                myRank.append(myBox);
            }
        }
        if (hi === "정보 있음") {
            console.log(1);
            return;
        }
        else {
            const myBox = document.createElement("div");
            const ranking = document.createElement("span");
            const me = document.createElement("span");
            const myScore = document.createElement("span");
            const myDate = document.createElement("span");
            ranking.innerHTML = "-";
            me.innerHTML = `${userData.userName}`;
            myScore.innerHTML = "---";
            myDate.innerHTML = "---";
            myBox.append(ranking, me, myScore, myDate);
            myRank.append(myBox);
        }
    }
}
const donutGameManager = new DonutGameManager();
donutGameManager.read();
const game_wrap = document.querySelector(".game-wrap");
const start_btn = document.getElementById("start");
start_btn.onclick = () => {
    game_wrap.innerHTML = `
    <div class="game-header">
        <span id="score">0</span>
        <span id="heart">♥️♥️♥️</span>
    </div>
    <div class="game-box">
        <table id="1">1</table>
        <table id="2">2</table>
        <table id="3">3</table>
        <table id="4">4</table>
        <table id="5">5</table>
        <table id="6">6</table>
        <table id="7">7</table>
        <table id="8">8</table>
   `;
    const heart = document.querySelector("#heart");
    let t = 0;
    for (let i = 0; i < 100; i++) {
        if (arr.length < 6)
            break;
        if (heart.innerHTML !== "") {
            setTimeout(() => {
                game();
            }, t);
            t += 7010;
        }
    }
};
function game() {
    const score = document.querySelector("#score");
    const heart = document.querySelector("#heart");
    const gameBox = document.querySelector(".game-box");
    createDonut();
    createDonut2();
    restore();
    bomb();
    const donutImg = document.querySelector(".donutImg");
    const donutImg2 = document.querySelector(".donutImg2");
    life(donutImg);
    life(donutImg2);
}
let arr = [];
for (let i = 1; i < 9; i++) {
    arr.push(i);
}
let point = 0;
function createDonut() {
    const score = document.querySelector("#score");
    let random = Math.floor(Math.random() * 8);
    if (random === 0)
        random = 1;
    const randomLine = document.getElementById(`${arr[random - 1]}`);
    arr.splice(random - 1, 1);
    console.log(arr);
    const donut = document.createElement("img");
    donut.classList.add("donutImg");
    donut.src = "../src/img/logo.png";
    randomLine.append(donut);
    donut.onclick = () => {
        donut.remove();
        score.innerHTML = `${point += 100}`;
    };
    if (arr.length < 7) {
        for (let i = 7; i < 9; i++) {
            arr.push(i);
        }
    }
}
function createDonut2() {
    const score = document.querySelector("#score");
    let random = Math.floor(Math.random() * 7);
    if (random === 0)
        random = 1;
    const randomLine = document.getElementById(`${arr[random - 1]}`);
    arr.splice(random - 1, 1);
    console.log(arr);
    const donut = document.createElement("img");
    donut.classList.add("donutImg2");
    donut.src = "../src/img/logo.png";
    randomLine.append(donut);
    donut.onclick = () => {
        donut.remove();
        score.innerHTML = `${point += 100}`;
    };
    if (arr.length < 7) {
        for (let i = 7; i < 9; i++) {
            arr.push(i);
        }
    }
}
function life(a) {
    const score = document.querySelector("#score");
    const heart = document.querySelector("#heart");
    const gameBox = document.querySelector(".game-box");
    a.addEventListener("animationend", (e) => {
        console.log(e);
        if (heart.innerHTML === "♥️♥️♥️") {
            a.remove();
            heart.innerHTML = "♥️♥️";
        }
        else if (heart.innerHTML === "♥️♥️") {
            a.remove();
            heart.innerHTML = "♥️";
            return;
        }
        else if (heart.innerHTML === "♥️") {
            heart.innerHTML = "";
            gameBox.innerHTML = `<div>
                <p>GAME OVER</p>
                <p>score : ${point}</p>
                </div>`;
            const donutGameManager = new DonutGameManager();
            donutGameManager.gameOver();
        }
    }, false);
}
function restore() {
    const score = document.getElementById("score");
    const heart = document.getElementById("heart");
    const random = Math.floor(Math.random() * 20);
    if (random === 3) {
        const img = document.createElement("img");
        img.src = "data:image/jpeg;base64,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";
        img.className = "restore";
        let random = Math.floor(Math.random() * 8);
        if (random === 0)
            random = 1;
        const randomLine = document.getElementById(`${random}`);
        randomLine.append(img);
        img.onclick = () => {
            img.remove();
            if (heart.innerHTML === "♥️") {
                heart.innerHTML = "♥️♥️";
                return;
            }
            else if (heart.innerHTML === "♥️♥️") {
                heart.innerHTML = "♥️♥️♥️";
                return;
            }
            else if (heart.innerHTML === "♥️♥️♥️") {
                score.innerHTML = `${point += 1000}`;
            }
        };
        fall(img);
    }
}
function bomb() {
    const gameBox = document.querySelector(".game-box");
    const heart = document.getElementById("heart");
    const random = Math.floor(Math.random() * 5);
    const score = document.getElementById("score");
    if (random === 3) {
        const createBomb = document.createElement("img");
        createBomb.src = "https://www.logoyogo.com/web/wp-content/uploads/edd/2021/02/logoyogo-1-199.jpg";
        createBomb.className = "bomb";
        let random = Math.floor(Math.random() * 8);
        if (random === 0)
            random = 1;
        const randomLine = document.getElementById(`${random}`);
        randomLine.append(createBomb);
        createBomb.onclick = () => {
            createBomb.remove();
            if (heart.innerHTML === "♥️♥️♥️") {
                heart.innerHTML = "♥️♥️";
            }
            else if (heart.innerHTML === "♥️♥️") {
                heart.innerHTML = "♥️";
                return;
            }
            else if (heart.innerHTML === "♥️") {
                heart.innerHTML = "";
                gameBox.innerHTML = `<div>
                    <p>GAME OVER</p>
                    <p>score : ${point}</p>
                    </div>`;
                const donutGameManager = new DonutGameManager();
                donutGameManager.gameOver();
            }
        };
        fall(createBomb);
    }
}
function fall(img) {
    img.addEventListener("animationend", () => {
        img.remove();
    }, false);
}
