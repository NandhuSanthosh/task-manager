let data=[{
                id:'firstBoard',
                boardName:'DataStructure',
                column:[{
                    id:'firstColumn',
                    colName:'Todo',
                    todos:[]
                }]
          },{
                id:'secondBoard',
                boardName:'JavaScript',
                column:[{
                    id:'firstColumn',
                    colName:'Todo',
                    todos:[]
                }]
            
        }];    
let boardList = document.querySelector('[data-board-list]');
const boardListLi = document.getElementById('board-list-li');
const colListDiv = document.getElementById('col-list-div');
const newColBtn = document.getElementById('new-col-container')
let activeBoard ;
let currentBoard = data[0];

const body = document.querySelector('.body-container')
const header = document.querySelector('header');
const nav = document.querySelector('nav');
const headerBoardTitle = document.querySelector('[data-header-board-title]')
const colNameCollector = document.querySelector('[data-col-name-colector-container]');
const colNameInput = document.querySelector('[data-col-name-input]')
const colContainer = document.querySelector('[data-col-flex]')

const navHider = document.querySelector('[data-nav-hider]');
const navShow = document.querySelector('[data-nav-show]');
const boardCreaterMenyDisplayer = document.querySelector('[data-create-board');
const newBoardCollecter = document.querySelector('[data-new-board-collecter]')
const boardCreateButton = document.querySelector('[data-board-create-btn]');
const newColCreater = document.querySelector('[data-new-column-creater]')


navHider.addEventListener('click',hideNav);
navShow.addEventListener('click',showNav);
boardCreaterMenyDisplayer.addEventListener('click',createBoard);
boardCreateButton.addEventListener('submit',boardCreater);
newColCreater.addEventListener('click',colCreater);
colNameCollector.addEventListener('keydown',createCol)

function hideNav(){
    nav.style.display='none';
    body.style.marginLeft='0px';
    header.style.left='0';
    navShow.style.display='block';
}
function showNav(){
    console.log()
    nav.style.display='';
    body.style.marginLeft='18vw';
    header.style.left='18vw';
    navShow.style.display='none'
}
function createBoard(){
    newBoardCollecter.style.display='flex'
    disableScroll();
}
function boardCreater(){
    let title = document.querySelector('[data-new-board-title]');
    let description = document.querySelector('[data-new-board-description]')
    let newBoard = boardCreaterFunction(title.value,description);
    boardSave(newBoard);
}

function colCreater(){
    console.log('fhaskj')
    colNameCollector.style.display='flex';
    newColCreater.innerText = 'Press Enter';
    // document.getElementById('col-name-input').autofocus=true;    
}
function createCol(){
    if(event.key != 'Enter')return;
    let colTitle = colNameInput.value;

    let recreater=currentBoard.column.filter( col => {
        if(col.colName == colTitle) return 1;
    });
    if(recreater.length > 0){
        alert("You already have a column with the same name,choose another.")
    }else{
        console.log('working')
        let newColumn = newColumnCreater(colTitle);
        columnPusher(newColumn)
        newColCreater.innerText = '+ New Column';
    }
}
function columnPusher(newColumn){
    currentBoard.column.push(newColumn);
}
function newColumnCreater(colTitle){
    return{ 
        id : new Date().toString(),
        colName : colTitle,
        todo :[]
    }
}
function boardCreaterFunction(title,description){

    let id = new Date().toString();
    newBoardCollecter.style.display='none'
        
        return({
            id:id,
            boardName:title,
            column:[{
                id:'defaultColumnTodo',
                colName:'Todo',
                todos:[]
            }]
        })
}

function boardSave(newBoard){
    data.push(newBoard);
    renderBoard();
}

function onloadRender(){
    renderBoard();
    boarderElementActive(boardList.children[0].children[0]);
    // renderColumn();
}


function boardSelector(e){
    let target = event.path.reverse()[11];
    boarderElementActive(target)
    console.log();
}
function boarderElementActive(target){
    if(activeBoard!=null){
        activeBoard.classList.remove('active');
    }
    activeBoard = target;
    activeBoard.classList.add('active');

    data.forEach(board => {
        if(target.id == board.id){
            currentBoard = board;
            todoRender(board)
        }
    })
}
function todoRender(currentBoard){
    headerBoardTitle.innerText = currentBoard.boardName;
}




function renderBoard(){
    boardList.innerText='';
    data.forEach(board => {
        let boardElement = document.importNode(boardListLi.content, true)
        let boardTitle = boardElement.querySelector('p');
        let boardBtn = boardElement.querySelector('button');
        boardBtn.setAttribute('id',board.id);
        boardTitle.innerText = board.boardName;

        boardList.appendChild(boardElement);
    })
}

function renderColumn(){
    colContainer.innerText = '';
    currentBoard.column.forEach(col => {
        let column = document.importNode(colListDiv.content,true);
        let colHeading = column.querySelector('h5');
        colHeading.innerText = col.colName;
        colContainer.appendChild(column);
        console.log(column)
    })
    renderNewColBtn();
}


function renderNewColBtn(){
    let btn = document.importNode(newColBtn.content,true);
    let createBtn = btn.querySelector('button');
    createBtn.addEventListener('click',colCreater);
    // newColCreater.addEventListener('click',colCreater);
    console.log(createBtn)
    colContainer.appendChild(btn);

    // console.log(newColBtn);

}







// DISABLE SCROLL
function disableScroll() {
    // Get the current page scroll position
    scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
  
        // if any scroll is attempted, set this to the previous value
        window.onscroll = function() {
            window.scrollTo(scrollLeft, scrollTop);
        };
}
  
function enableScroll() {
    window.onscroll = function() {};
}

