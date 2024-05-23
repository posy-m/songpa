import { transform } from "../node_modules/typescript/lib/typescript";

class DonutGame {
    userName: string;
    score: number;
    renewDate: string;
    constructor(nickName: string, _score: number, _renewDate: string){
        this.userName = nickName,
        this.score = _score,
        this.renewDate = _renewDate
    }
}

class DonutGameManager {
    scoreList: DonutGame[];
    constructor(){
        this.scoreList = [];
    }

    init(storage){
        if(storage === null){
            localStorage.setItem("donut_score", JSON.stringify(this.scoreList));
        }else{
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
            month = "0" + month
        }

        let day = (date.getDate()).toString();
        if (parseInt(day) < 10) {
            day = "0" + day
        }
        let check = "아직";
        for(let i = 0; i < rankData.length; i++){
            if((userData.userName === rankData[i].userName) && (rankData[i].score < point)){
                rankData[i].score = point;
                rankData[i].renewDate = `${year}-${month}-${day}`;
                check = "확인";
            }else if((userData.userName === rankData[i].userName) && (rankData[i].score >= point)){
                check = "아쉽";
            }
        }
        if(check === "확인"){
            localStorage.setItem("donut_score", JSON.stringify(rankData));
        } else if(check === "아쉽"){
            return;
        }else{
            const userScore = new DonutGame(userData.userName, point, `${year}-${month}-${day}`);
            this.scoreList.push(userScore);
            localStorage.setItem("donut_score", JSON.stringify(this.scoreList));
        }
    }
    // 랭킹 그려주기
    read(){
        const userData = JSON.parse(sessionStorage.getItem("login_status"));
        const rankData = JSON.parse(localStorage.getItem("donut_score"));
        rankData.sort();
        const rankContent = document.querySelector(".rank-content");
        const myRank = document.querySelector(".my-rank");
        let hi = "hi";
        for(let i = 0; i < rankData.length; i++){
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
            if(rankData[i].userName === userData.userName){
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
        if(hi === "정보 있음"){
            return;
        } else{
            const myBox = document.createElement("div");
            const ranking = document.createElement("span")
            const me = document.createElement("span");
            const myScore = document.createElement("span");
            const myDate = document.createElement("span");
            ranking.innerHTML = "-";
            me.innerHTML = `${userData.userName}`;
            myScore.innerHTML = "---"
            myDate.innerHTML = "---"
            myBox.append(ranking, me, myScore, myDate);
            myRank.append(myBox);
        }
    }
}
const rankData = JSON.parse(localStorage.getItem("donut_score"));
if(rankData !== null){
    const donutGameManager = new DonutGameManager();
    donutGameManager.read();
} 


const game_wrap = document.querySelector(".game-wrap");
const start_btn = document.getElementById("start");

start_btn.onclick = () => {
    game_wrap.innerHTML = `<div class="rank-box">
    <div class="rank-info">
        <span>순위</span>
        <span>닉네임</span>
        <span>점수</span>
        <span>갱신날짜</span>
    </div>
    <div class="rank-content"></div>
    <div class="my-rank"></div>
</div>
<div class="game-box">
<div class="game-header">
    <span id="score">0</span>
    <span id="heart">♥️♥️♥️</span>
</div>
<div class="game-slide">
    <table id="1">1</table>
    <table id="2">2</table>
    <table id="3">3</table>
    <table id="4">4</table>
    <table id="5">5</table>
    <table id="6">6</table>
    <table id="7">7</table>
    <table id="8">8</table>
</div>
<div class = "move-box">
    <img id="person" src="../src/img/png-transparent-computer-icons-person-others-miscellaneous-text-hand-thumbnail-removebg-preview.png" alt="">
</div>
</div>`
move();
    const heart = document.querySelector("#heart");
    let t = 0;
    for(let i = 0; i< 100; i++){
        if(heart.innerHTML !== ""){
        // setInterval(()=>{
                    setTimeout(() => {
                        game();
                        console.log(point);
                    }, t);
                    if(point < 2000){
                        t += 6100;
                    }else if(point >= 2000){
                        t += 5300;
                    }else if(point >= 4000){
                        t += 4200;
                    }
            // }, 200)
        }
    }
}

    function game() {
        createDonut();
        createDonut2();
        createDonut3();
        restore();
        bomb();
        const donutImg = document.querySelector(".donutImg");
        const donutImg2 = document.querySelector(".donutImg2");
        const donutImg3 = document.querySelector(".donutImg3");
        life(donutImg);
        life(donutImg2);
        life(donutImg3);
        gotcha(donutImg);
        gotcha(donutImg2);
        gotcha(donutImg3);
    }
    // function game2() {
    //     const person = document.getElementById("person");
    //     // person.style.width = "40px";
    //     // person.style.height = "40px";
    //     createDonut("donutImg_stage2");
    //     createDonut2("donutImg2_stage2");
    //     restore("restore_stage2");
    //     bomb("bomb_stage2");
    //     const donutImg = document.querySelector(".donutImg_stage2");
    //     const donutImg2 = document.querySelector(".donutImg2_stage2");
    //     life(donutImg);
    //     life(donutImg2);
    //     gotcha(donutImg);
    //     gotcha(donutImg2);
    //     console.log(1)
        
    // }
    // 랜덤하게 이미지들을 랜덤하게 배치하기 위한 배열
    let arr = [];
    for(let i = 1; i < 9; i++){
        arr.push(i);
    }

    // 점수 선언
    let point = 0;

    // 애니메이션
    let keyframes = [
        {opacity: 0, transform: "translateY(0)"},
        {opacity: 1, transform: "translateY(100px)"},
        {transform: "translateY(200px)"},
        {transform: "translateY(300px)"},
        {transform: "translateY(400px)"},
        {opacity: 1, transform: "translateY(500px)"},
    ]

    // 도넛 1 만들기
    function createDonut(){
        const score = document.querySelector("#score");
        let random = Math.floor(Math.random() * 8);
        if(random === 0) random = 1;
        const randomLine = document.getElementById(`${arr[random - 1]}`);
        arr.splice(random - 1, 1);
        const donut = document.createElement("img");
        donut.className = "donutImg";
        if(point < 2000){
            donut.animate(keyframes, {
                delay: 0,
                duration: 4000,
                iterations: Infinity,
                fill: "forwards"
            });
        }else if(point >= 2000){
            donut.animate(keyframes, {
                delay: 0,
                duration: 2000,
                iterations: Infinity,
                fill: "forwards"
            });
        }else if(point >= 4000){
            donut.animate(keyframes, {
                delay: 0,
                duration: 1000,
                iterations: Infinity,
                fill: "forwards"
            });
        }
        donut.src = "../src/img/logo.png";
        
        randomLine.append(donut);
        if(arr.length < 7){
            for(let i = 7; i < 9; i++){
                arr.push(i);
            }
        }
    }

    // 도넛 2 만들기
    function createDonut2(){
        const person = document.getElementById("person")
        const score = document.querySelector("#score");
        let random = Math.floor(Math.random() * 7);
        if(random === 0) random = 1;
        const randomLine = document.getElementById(`${arr[random - 1]}`);
        arr.splice(random - 1, 1);
        const donut = document.createElement("img");
        donut.className = "donutImg2";
        if(point < 2000){
            donut.animate(keyframes, {
                delay: 700,
                duration: 4700,
                iterations: Infinity,
                fill: "forwards"
            });
        }else if(point >= 2000){
            donut.animate(keyframes, {
                delay: 1500,
                duration: 2600,
                iterations: Infinity,
                fill: "forwards"
            });
        }else if(point >= 4000){
            donut.animate(keyframes, {
                delay: 1300,
                duration: 1200,
                iterations: Infinity,
                fill: "forwards"
            });
        }
        donut.src = "../src/img/logo.png";
        randomLine.append(donut);
        if(arr.length < 7){
            for(let i = 7; i < 9; i++){
                arr.push(i);
            }
        }
    }

    function createDonut3(){
        const person = document.getElementById("person")
        const score = document.querySelector("#score");
        let random = Math.floor(Math.random() * 7);
        if(random === 0) random = 1;
        const randomLine = document.getElementById(`${arr[random - 1]}`);
        arr.splice(random - 1, 1);
        const donut = document.createElement("img");
        donut.className = "donutImg3";
        if(point < 2000){
            donut.animate(keyframes, {
                delay: 1000,
                duration: 5000,
                iterations: Infinity,
                fill: "forwards"
            });
        }else if(point >= 2000){
            donut.animate(keyframes, {
                delay: 1800,
                duration: 3000,
                iterations: Infinity,
                fill: "forwards"
            });
        }else if(point >= 4000){
            donut.animate(keyframes, {
                delay: 1700,
                duration: 1300,
                iterations: Infinity,
                fill: "forwards"
            });
        }
        donut.src = "../src/img/logo.png";
        randomLine.append(donut);
        if(arr.length < 7){
            for(let i = 7; i < 9; i++){
                arr.push(i);
            }
        }
    }

    // 바닥에 닿으면 체력 깎기
    function life(a){
        const score = document.querySelector("#score");
        const heart = document.querySelector("#heart");
        const gameBox = document.querySelector(".game-box");
        const person = document.getElementById("person");
        setInterval(() => {
        if(a.getBoundingClientRect().bottom > person.getBoundingClientRect().bottom){
            if(heart.innerHTML === "♥️♥️♥️"){
                a.remove();
                heart.innerHTML = "♥️♥️"
                return;
            }else if(heart.innerHTML === "♥️♥️"){
                a.remove();
                heart.innerHTML = "♥️"
                return;
            }else if(heart.innerHTML === "♥️"){
                heart.innerHTML = "";
                gameBox.innerHTML = `<div>
                <p>GAME OVER</p>
                <p>score : ${point}</p>
                </div>`;
                const donutGameManager = new DonutGameManager();
                donutGameManager.gameOver();
            }
        }
    }, 100)
}

    // 마시멜로 회복 or 점수
    function restore(){
        const score = document.getElementById("score");
        const heart = document.getElementById("heart");
        const random = Math.floor(Math.random() * 4);
        const person = document.getElementById("person");
        if(random === 3){
            const mashi = document.createElement("img");
            mashi.src = "data:image/jpeg;base64,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";
            mashi.className = "restore";
            if(point < 2000){
                mashi.animate(keyframes, {
                    delay: 1000,
                    duration: 3000,
                    iterations: Infinity,
                    fill: "forwards"
                });
            }else if(point >= 2000){
                mashi.animate(keyframes, {
                    delay: 1000,
                    duration: 3000,
                    iterations: Infinity,
                    fill: "forwards"
                });
            }else if(point >= 4000){
                mashi.animate(keyframes, {
                    delay: 1000,
                    duration: 2600,
                    iterations: Infinity,
                    fill: "forwards"
                });
            }
            let random = Math.floor(Math.random() * 8);
            if(random === 0) random = 1;
            const randomLine = document.getElementById(`${random}`);
            randomLine.append(mashi);
            setInterval(() => {
                if((mashi.getBoundingClientRect().bottom > person.getBoundingClientRect().top) && (mashi.getBoundingClientRect().left < person.getBoundingClientRect().right) && (mashi.getBoundingClientRect().right > person.getBoundingClientRect().left)){
                    mashi.remove();
                    if(heart.innerHTML === "♥️"){
                        heart.innerHTML = "♥️♥️";
                        return;
                    }else if(heart.innerHTML === "♥️♥️"){
                        heart.innerHTML = "♥️♥️♥️";
                        return;
                    }else if(heart.innerHTML === "♥️♥️♥️"){
                        point+=500;
                        score.innerHTML = `${point}`;
                        console.log(point);
                    }
                    person.style.width = `${30 + (point/100)}px`;
                    person.style.height = `${30 + (point/100)}px`;
                }
                fall(mashi);
            }, 200)
        }
    }

    // 폭탄
    function bomb() {
        const gameBox = document.querySelector(".game-box");
        const heart = document.getElementById("heart");
        const random = Math.floor(Math.random() * 5);
        const score = document.getElementById("score");
        if(random === 3){
            const createBomb = document.createElement("img");
            createBomb.src = "https://www.logoyogo.com/web/wp-content/uploads/edd/2021/02/logoyogo-1-199.jpg"
            createBomb.className = "bomb";
            if(point < 2000){
                createBomb.animate(keyframes, {
                    delay: 200,
                    duration: 6000,
                    iterations: Infinity,
                    fill: "forwards"
                });
            }else if(point >= 2000){
                createBomb.animate(keyframes, {
                    delay: 300,
                    duration: 5000,
                    iterations: Infinity,
                    fill: "forwards"
                });
            }else if(point >= 4000){
                createBomb.animate(keyframes, {
                    delay: 300,
                    duration: 4000,
                    iterations: Infinity,
                    fill: "forwards"
                });
            }
            let random = Math.floor(Math.random() * 8);
            if(random === 0) random = 1;
            const randomLine = document.getElementById(`${random}`);
            randomLine.append(createBomb);
            setInterval(() => {
                const person = document.getElementById("person");
                const score = document.getElementById("score");
                if((createBomb.getBoundingClientRect().bottom > person.getBoundingClientRect().top) && (createBomb.getBoundingClientRect().left < person.getBoundingClientRect().right) && (createBomb.getBoundingClientRect().right > person.getBoundingClientRect().left)){
                    createBomb.remove();
                    if(heart.innerHTML === "♥️♥️♥️"){
                        heart.innerHTML = "♥️♥️"
                    }else if(heart.innerHTML === "♥️♥️"){
                        heart.innerHTML = "♥️"
                        return;
                    }else if(heart.innerHTML === "♥️"){
                        heart.innerHTML = "";
                        gameBox.innerHTML = `<div>
                        <p>GAME OVER</p>
                        <p>score : ${point}</p>
                        </div>`;
                        const donutGameManager = new DonutGameManager();
                        donutGameManager.gameOver();
                    }
                }
                fall(createBomb)
            }, 200);
        }
    }

    
    // 폭탄, 마시멜로 떨어지면 사라지게
    function fall(img) {
        const person = document.getElementById("person");
        setInterval(() => {
        if(img.getBoundingClientRect().bottom > person.getBoundingClientRect().bottom){
            img.remove();
        }
    }, 200)
    }


function move(){
    const person = document.getElementById("person");
    const gameBox = document.querySelector(".game-box");
        if(person !== null){
            gameBox.addEventListener("mousemove", (e: any) => {
                person.style.left = `${e.clientX - 300}px`;
            })
        }
}

function gotcha(donut){
    setInterval(() => {
        let person = document.getElementById("person");
        const score = document.getElementById("score");
        if((donut.getBoundingClientRect().bottom > person.getBoundingClientRect().top) && (donut.getBoundingClientRect().left < person.getBoundingClientRect().right) && (donut.getBoundingClientRect().right > person.getBoundingClientRect().left)){
            donut.remove();
            point += 100;
            score.innerHTML = `${point}`
            console.log(point);
            person.style.width = `${30 + (point/100)}px`;
            person.style.height = `${30 + (point/100)}px`;
        }
    }, 200);
}
