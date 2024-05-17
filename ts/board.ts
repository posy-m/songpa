// interface IBoard {
//   userName: string,
//   title: string,
//   content: string,
//   date: string,
//   count: number
// }

// class BoardData implements IBoard {
//   userName: string;
//   title: string;
//   content: string;
//   date: string;
//   count: number
//   constructor(userName: string, title: string, content: string, date: string, conut: number) {
//     this.userName = userName;
//     this.title = title;
//     this.content = content;
//     this.date = date;
//     this.count = conut;
//   }
// }



function paintBoard() {
  const boardData = JSON.parse(localStorage.getItem("board_data"));
  const boardList = document.querySelector("#boardList") as HTMLUListElement
  boardList.innerHTML = "";

  //
  localStorage.setItem("", JSON.stringify(this._boardList))
  let list: number[] = [];
  for (let i = 0; i < boardData.length; i++) {
    if (localStorage.getItem("num") === null) {
      localStorage.setItem("num", JSON.stringify(list));
    } else {
      list = JSON.parse(localStorage.getItem("num"));
    }
    //
    const li = document.createElement("li")
    const span1 = document.createElement("span")
    list.push(i);
    localStorage.setItem("num", JSON.stringify(list));
    span1.innerHTML = (i + 1) + "";
    const span2 = document.createElement("span")
    span2.innerHTML = boardData[i].userName
    const span3 = document.createElement("span")
    span3.innerHTML = boardData[i].title
    const span4 = document.createElement("span")
    span4.innerHTML = boardData[i].date
    const span5 = document.createElement("span")
    span5.innerHTML = `${boardData[i].count}`
    span3.addEventListener("click", (e) => {
      console.log(boardData[i].count);
      location.href = "./detail.html?index=" + i;
      boardData[i].count++;
    }
    )
    boardList.appendChild(li)
    li.append(span1, span2, span3, span4, span5)
  }
}

paintBoard();



//
// const b = JSON.parse(localStorage.getItem("num")).length;
// const c = JSON.parse(localStorage.getItem("num"));
// c.push(b);
// localStorage.setItem("num", JSON.stringify(c));
//

// 페이지 네이션
const boardData = JSON.parse(localStorage.getItem("board_data"));
const countPage = 6; //페이지 몇개를 올릴건가
const getPageCount = () => {
  return Math.ceil(50 / countPage)
}

//번호 페이지 만들기
const numButtonWapper = document.querySelector('.number-button-wraper');
const setPageButtons = () => {
  numButtonWapper.innerHTML = '';
  for (let i = 1; i <= getPageCount(); i++) {
    numButtonWapper.innerHTML += `<span class= "number-button"> ${i} </span>`
  }
}

setPageButtons()

const ul = document.querySelector('ul')
let currentPage = 1;

const setPageOf = (pageNumber) => {
  ul.innerHTML = ""; //ul 리스트 내부를 비워줌


  for (
    let i = countPage * (pageNumber - 1) + 1;
    // <= : 왼쪽 피연사즈이 값이 피연사자의 값보다 작거나 같으면 참을 반환함
    i <= countPage * (pageNumber - 1) + 6 && i <= boardData.length;
    i++
  ) {
    let li = document.createElement('li');

    //컨테이너
    const postContainer = document.createElement('span');
    postContainer.className = 'post-container';

    //no
    const postNumber = document.createElement('span');
    postNumber.className = 'post-number'

    //닉네임
    const Nickname = document.createElement('span');
    Nickname.className = 'nick-name'

    //제목
    const title = document.createElement('span');
    title.className = 'title'

    //날짜
    const date = document.createElement('span');
    date.className = 'date'

    //조회수
    const count = document.createElement('span');
    count.className = 'count'


    const im = i - 1;
    const num = JSON.parse(localStorage.getItem("num"));

    postNumber.textContent = num[i]
    //페이지 번호는 1부터 시작하지만 배열 인덱스는 0q부터 시작하므로 -1 해준다.
    Nickname.textContent = boardData[i - 1].userName;
    title.textContent = boardData[i - 1].title;
    date.textContent = boardData[i - 1].date;
    count.textContent = boardData[i - 1].count;
    postContainer.append(postNumber, Nickname, title, date, count);
    li.append(postContainer);
    ul.append(li);
  }
}

// setPageOf(3)

const pageNumberButtons = document.querySelectorAll('.number-button');

pageNumberButtons.forEach((numberBtn) => {
  numberBtn.addEventListener('click', (e: any) => {
    setPageOf(+ e.target.innerHTML);
  })
})

//이전 또는 이후 버튼 클릭 이벤트

const prevBtn = document.querySelector('.prev-button')
const nextBtn = document.querySelector('.next-button')

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
})








