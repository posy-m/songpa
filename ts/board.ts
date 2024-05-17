function paintBoard() {
  const param = new URLSearchParams(location.search).get("index");
  let str: any = location.search;
  str = str.replace("?", "");
  str = str.split("=");
  const boardData = JSON.parse(localStorage.getItem("board_data"));
  const boardList = document.querySelector("#boardList") as HTMLUListElement
  boardList.innerHTML = "";
  localStorage.setItem("", JSON.stringify(this._boardList))
  const filter = boardData.filter((value) => value);
  console.log(filter);
  const arr = [];
  const hi = Math.floor(boardData.length/5);
  for(let i = 0; i < hi+1; i+=5){
    const num = i + 5;
    const page_arr = boardData.slice(i, num);
    arr.push(page_arr);
    console.log(page_arr);
  }
  console.log(arr);
  for (let i = 0; i < arr[param].length; i++) {
    const li = document.createElement("li")
    const span1 = document.createElement("span")
    span1.innerHTML = (i + 1) + "";
    const span2 = document.createElement("span")
    span2.innerHTML = arr[param][i].userName
    const span3 = document.createElement("span")
    span3.innerHTML = arr[param][i].title
    const span4 = document.createElement("span")
    span4.innerHTML = arr[param][i].date
    const span5 = document.createElement("span")
    span5.innerHTML = `${arr[param][i].count}`
    span3.addEventListener("click", (e) => {
      location.href = "./detail.html?index=" + i;
      arr[param][i].count++;
    }
    )
    boardList.appendChild(li);
    li.append(span1, span2, span3, span4, span5);
  }
  for(let i = 0; i < arr.length; i++){
    const num_finder = document.querySelector(".number-button")
    const num = document.createElement("span");
    const j = i + 1;
    num.innerHTML = `${j}`;
    num.onclick = () => {
      location.href = "./board.html?index=" + i;
    }
    num_finder.append(num);
  }
}

paintBoard();




