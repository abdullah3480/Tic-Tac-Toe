

const GameBoard = (() => {
    const board = [];
    for(let i = 0; i < 3;i++){
        board[i] = [];
        for(let j =0; j < 3; j++){
            board[i].push(Cell())
        }
        
    }

    function getBoard(){
        return board;
    }

    function displayBoard(){
        for(let i = 0 ; i < 3; i++){
            for (let j = 0; j < 3; j++){
                console.log(board[i][j].getValue());
            }
            
        }
    }

    function markBoard(x,y, mark){
        board[x][y].markCell(mark);
    }

    return {displayBoard,markBoard,getBoard};
})();


function Cell(){
    let value = ' ';

    let markCell = (mark) => {
        value = mark;
    }

    function getValue(){
        return value;
    }

    return {markCell,getValue};
}

const GameController = (() => {

    let board = GameBoard.getBoard();
    let playerOne = "Player One";
    let playerTwo = "Player Two";

    let players = [{
        name : playerOne,
        mark : 'X'
        
    },{
        name : playerTwo,
        mark : 'O'
    }]

    let activePlayer = players[0];

    let switchPlayer = (()=>{
        activePlayer = activePlayer === players[0] ? players[1] : players[0];
    })

    const getActivePlayer = ()=> activePlayer;


    const printNewRound = () => {
        board.displayBoard();
        console.log(`${getActivePlayer().name}'s turn.`);
    };

    const playRound = () => {

        
        
    }

    const checkWin = (mark) =>{
        let win = true;
        for(let i = 0 ; i < 3; i ++){
            for (let j = 0; j < 3; j++){
                if(i == j && board[i][j].getValue() !== mark){
                    win = false;
                }
            }
        }
        if(win) return win;

        for(let i = 0 ; i < 3; i ++){
            for (let j = 0; j < 3; j++){
                if(i+j == 2 && board[i][j].getValue() !== mark){
                    win = false;
                }
            }
        }
        if(win) return win;

        win = true;
         for(let i = 0 ; i < 3; i ++){
            for (let j = 0; j < 3; j++){
                if(board[i][j].getValue() !== mark){
                    win = false;
                }
            }

            if(win) return win;
            win = true;
        }
        


        
         for(let i = 0 ; i < 3; i ++){
            for (let j = 0; j < 3; j++){
                if(board[j][i].getValue !== mark){
                    win = false;
                }
            }

            if(win) return win;
            win = true;
        }

        return false;
    }

    return{playRound,checkWin}

})();
