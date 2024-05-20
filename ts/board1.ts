interface IBoard {
  no: number,
  userName: string,
  title: string,
  content: string,
  date: string,
  count: number
}

const urlStr = window.location.href;
const url = new URL(urlStr);
const urlparams = url.searchParams;
const currentPage = urlparams.get('index');
const searchInput = urlparams.get('search');

//로컬스토리지에서 들고온 값 
let boardList: IBoard[] = JSON.parse(localStorage.getItem("board_data")).reverse()

//로컬스토리지에 배열이 없다면 빈배열로 초기화 시켜준다.
if (!boardList) {
  boardList = [];
}

//게시판 총 수
let totalBoardLength = boardList.length

function paintPage(page: number) {
  //인덱스를 계산
  //처음 게시판에 들어왔을때 보여지는 첫번째 게시글
  const startIndex = (page - 1) * 10;
  //몇번째 보여줄 것인가. (boardlist를 짜르는 역할)
  const endIndex = startIndex + 10;

  let resultData = [...boardList];
  if (searchInput) {
    resultData = resultData.filter((value: IBoard, index) => {
      return value.title.includes(searchInput) == true
    })
  }
  //게시판에 보여지는 함수
  const showBoardData: IBoard[] = resultData.slice(startIndex, endIndex > resultData.length ? resultData.length : endIndex)

  const boardListcontainer = document.querySelector("#boardList")
  //li를 만들거양
  let i = 0;
  showBoardData.forEach((element: IBoard) => {
    const li = document.createElement("tr")
    const no = document.createElement("td")
    i++;
    no.innerHTML = (i).toString();
    const userName = document.createElement("td")
    userName.innerHTML = element.userName;
    const title1 = document.createElement("td")
    const title = document.createElement("a")
    title.innerHTML = element.title;
    title1.appendChild(title)
    title.href = "detail.html?index=" + element.no
    const date = document.createElement("td")
    date.innerHTML = element.date;
    const count = document.createElement("td")
    count.innerHTML = element.count.toString();

    li.append(no, title1, userName, date, count)
    boardListcontainer.appendChild(li)
  })
}
createPage()
paintPage(parseInt(currentPage))

//페이지네이션 만들자!

function createPage() {
  boardList = JSON.parse(localStorage.getItem("board_data")).reverse();
  let resultData = [...boardList];
  if (searchInput) {
    resultData = resultData.filter((value: IBoard, index) => {
      return value.title.includes(searchInput) == true
    })
  }
  let totalPage = Math.ceil(resultData.length / 10);


  //실질적으로 그리는거임
  //createPageItem 호출할때 페이지는 넘버이고, isActive는 디폴트로 false로 두겠다.
  function createPageItem(page: number, isActive = false) {
    const pagination = document.querySelector("#pagination")
    const pageLink = document.createElement("a")
    pageLink.innerText = page.toString()
    const inputSearch = document.querySelector("#inputSearch") as HTMLInputElement
    //classList :현재 페이지네이션은 동적으로 클래스를 넣는다.
    if (isActive === true) {
      pageLink.classList.add("active")
    }
    //쿼리스트링
    pageLink.href = "board.html?index=" + page + "&search=" + inputSearch.value
    pagination.append(pageLink)
  }

  for (let i = 0; i < totalPage; i++) {
    createPageItem(i + 1, i + 1 === parseInt(currentPage))
  }
}



const boardSearch = document.querySelector("#boardSearch")

function search(e: SubmitEvent) {
  e.preventDefault()
  const inputSearch = document.querySelector("#inputSearch") as HTMLInputElement
  if (inputSearch) {
    location.href = "board.html?index=" + 1 + "&search=" + inputSearch.value
  }


}

boardSearch.addEventListener("submit", search)


