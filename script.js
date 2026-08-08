

const GameBoard = (() => {
    const board = [];
    for(let i = 0; i < 3;i++){
        board[i] = [];
        for(let j =0; j < 3; j++){
            board[i].push(Cell())
        }
        
    }

    function clearBoard(){
        for(let i = 0 ; i < 3; i++){
            for (let j = 0; j < 3; j++){
                console.log(board[i][j].getValue());
            }
            console.log('\n')
            
        }
    }
    function getBoard(){
        return board;
    }

    function displayBoard(){
        for(let i = 0 ; i < 3; i++){
            for (let j = 0; j < 3; j++){
                board[i][j].clearCell();
            }
            
            
        }
    }

    function markBoard(x,y, mark){
        board[x][y].markCell(mark);
    }

    return {displayBoard,markBoard,getBoard,clearBoard};
})();


function Cell(){
    let value = '';

    let markCell = (mark) => {
        value = mark;
    }

    function getValue(){
        return value;
    }

    function clearCell(){
        value = '';
    }

    return {markCell,getValue,clearCell};
}

const GameController = (() => {

    let board = GameBoard.getBoard();
    let playerOne = "Player One";
    let playerTwo = "Player Two";

    let players = [{
        name : playerOne,
        mark : 'X',
        setName : function(name){
            if(name.lenght > 0)
            this.playerName = name;
        }
        
    },{
        name : playerTwo,
        mark : 'O',
        setName : function(name){
            if(name.lenght > 0)
            this.playerName = name;
        }
        
    }]


    console.log(players[0].mark)
    console.log(players[1].mark)
    let activePlayer = players[0];

    let switchPlayer = (()=>{
        activePlayer = activePlayer === players[0] ? players[1] : players[0];
    })



    const getActivePlayer = ()=> activePlayer;


    
    function setPlayerName(player,name){
        players[player].setName(name);
    }

    const putMark = (x,y,mark)=>{
        GameBoard.markBoard(x,y,mark);
    }

    let matchStatus;
    const playRound = (x,y) => {

        if(matchStatus == undefined){
        putMark(x,y,activePlayer.mark);

        if(checkWin(activePlayer.mark)){
            matchStatus = 'win'
            return;
        }

        if(checkTie()){
            matchStatus = 'tie'
            return;
        }
        switchPlayer();

    }
    }

    function getMatchStatus(){
        return matchStatus;
    }

    

    const checkWin = (mark) =>{
        let win = true;
        for(let i = 0 ; i < 3; i ++){
            for (let j = 0; j < 3; j++){
                if(i == j && board[i][j].getValue() != mark){
                    win = false;
                }
            }
        }
        if(win) return win;
        win = true;
        for(let i = 0 ; i < 3; i ++){
            for (let j = 0; j < 3; j++){
                if(i+j == 2 && board[i][j].getValue() != mark){
                    win = false;
                }
            }
        }
        if(win) return win;

        win = true;
         for(let i = 0 ; i < 3; i ++){
            for (let j = 0; j < 3; j++){
                if(board[i][j].getValue() != mark){
                    win = false;
                }
            }

            if(win) return win;
            win = true;
        }
        


        win = true;
         for(let i = 0 ; i < 3; i ++){
            for (let j = 0; j < 3; j++){
                if(board[j][i].getValue() != mark){
                    win = false;
                }
            }

            if(win) return win;
            win = true;
        }

        return false;
    }


    function checkTie(){
        
        for(let i  = 0 ; i < 3; i++){
            for(let j = 0 ; j < 3; j++){
                if(board[i][j].getValue() == '') return false;
            }

        }
        return true;
    }

    return{playRound,checkWin,checkTie,getActivePlayer,getMatchStatus,setPlayerName}

});


const ScreenController = (() =>{

    const game = GameController();
    
    const boardDiv = document.querySelector('.board');
    const board = GameBoard.getBoard();
    const turnDiv = document.querySelector('.turn');
    const resultDiv = document.querySelector('.result');
    const submit = document.querySelector('#submit');
    function setPlayerName(){
                
            const playerOneName = document.forms[0].playerOne.value;
            const playerTwoName = document.forms[0].playerTwo.value;
            game.setPlayerName(0,playerOneName);
            game.setPlayerName(1,playerTwoName);
    }
    
    submit.addEventListener('click',setPlayerName);
    
    function updateScreen(){

        boardDiv.textContent = '';
        turnDiv.textContent = `${game.getActivePlayer().name}'s turn`;
        
        
    for( let i = 0; i < 3; i++){
        for(let j = 0; j < 3 ; j++){
            const cellDiv = document.createElement('div');
            cellDiv.classList.add('cell');

            cellDiv.textContent = board[i][j].getValue();
            
            cellDiv.dataset.row = i;
            cellDiv.dataset.col = j;
            boardDiv.appendChild(cellDiv);

        }
    }

    if(game.getMatchStatus() == 'win'){
        resultDiv.textContent = `${game.getActivePlayer().name} wins`;

    }

    else if (game.getMatchStatus() == 'tie'){
        resultDiv.textContent = 'It is a tie';
    }

    // else resultDiv.textContent = '';
    
}

    function clickHandler(e){
        let row = e.target.dataset.row;
        let col = e.target.dataset.col;

        if(board[row][col].getValue() != '') return

        game.playRound(row,col) 
        updateScreen();
    }

    boardDiv.addEventListener('click',clickHandler)
updateScreen()
return {updateScreen}

})();


