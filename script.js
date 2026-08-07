

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
                console.log(board[i][j].Cell.getValue());
            }
        }
    }

    function markBoard(x,y, mark){
        board[x][y].Cell.markCell(mark);
    }

    return {displayBoard,markBoard,getBoard};
})();


function Cell(){
    let value = ' ';

    function markCell(mark){
        value = mark;
    }

    function getValue(){
        return value;
    }

    return {markCell,getValue};
}

const GameController = (() => {

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

})();
