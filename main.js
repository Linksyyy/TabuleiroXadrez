
function Chess(boardClass) {
    const HTMLboard = document.querySelector(boardClass)

    const selectedSquareColor = 'red'
    //white piecies:
    const KW = '♔'
    const QW = '♕'
    const TW = '♖'
    const BW = '♗'
    const NW = '♘'
    const PW = '♙'
    //black pieces:
    const KB = '♚'
    const QB = '♛'
    const TB = '♜'
    const BB = '♝'
    const NB = '♞'
    const PB = '♟'

    const blackPieces = ['♚', '♛', '♜', '♝', '♞', '♟']
    const whitePieces = ['♔', '♕', '♖', '♗', '♘', '♙']
    const rows = [8, 7, 6, 5, 4, 3, 2, 1]
    const columns = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h']

    function changeSquareColor(square, color = selectedSquareColor) {
        document.querySelector(`#${square}`).style.backgroundColor = color
    }

    let PieceSelected = {
        have: false,
        piece: '',
        square: '',
        row: '',
        column: '',
        possibleMoviments: '',
        get isBlack() { return blackPieces.includes(this.piece) }
    }
    let secondSquareSelected = {
        piece: '',
        square: '',
        row: '',
        column: '',
        get isBlack() { return blackPieces.includes(this.piece) }
    }

    let board = [
        [TB, NB, BB, QB, KB, BB, NB, TB],//8
        [PB, PB, PB, PB, PB, PB, PB, PB],//7
        [0, 0, 0, 0, 0, 0, 0, 0],//6
        [0, 0, 0, 0, BB, 0, 0, 0],//5
        [0, 0, 0, 0, 0, 0, 0, 0],//4
        [0, 0, 0, 0, 0, 0, 0, 0],//3
        [PW, PW, PW, PW, PW, PW, PW, PW],//2
        [TW, NW, BW, QW, KW, BW, NW, TW]//1
    ]

    function refresh() {
        console.log('refresh')
        for (let i = 1; i <= 15; i += 2) {
            for (let j = 1; j <= 15; j += 2) {
                HTMLboard.childNodes[j].childNodes[i].innerHTML = board[(i - 1) / 2][(j - 1) / 2]
                if (board[(i - 1) / 2][(j - 1) / 2] == 0 || board[(i - 1) / 2][(j - 1) / 2] == 1) HTMLboard.childNodes[j].childNodes[i].innerHTML = ''
                if (board[(i - 1) / 2][(j - 1) / 2] == 1) changeSquareColor(HTMLboard.childNodes[j].childNodes[i].id)
            }
        }
    }

    this.execute = function () {
        console.log('execute')
        firstRefresh()
        takeFirstClick()
        takeSecondClick()
    }

    function firstRefresh() {
        console.log('firstRefresh')
        document.addEventListener('DOMContentLoaded', (event) => {
            refresh()
        })
    }

    takeFirstClick = function () {
        document.addEventListener('click', (e) => {
            if (PieceSelected.have) return
            if (typeof e.target.innerText != 'string') return
            console.log('takeFirstClick')
            try {
                PieceSelected.column = columns.indexOf(e.target.id[0])
                PieceSelected.row = rows.indexOf(Number(e.target.id[1]))
                PieceSelected.square = e.target.id
                PieceSelected.piece = e.target.innerText

                if (PieceSelected.piece == 0) return
                PieceSelected.have = true
                changeSquareColor(PieceSelected.square)
                pieceMoves()
                    .refresh()
            } catch (e) { }

        })

    }
    takeSecondClick = function () {
        addEventListener('click', (e) => {
            if (e.target.id == PieceSelected.square) return
            console.log('takeSecondClick')
            try {
                secondSquareSelected.column = columns.indexOf(e.target.id[0])
                secondSquareSelected.row = rows.indexOf(Number(e.target.id[1]))
                secondSquareSelected.square = e.target.id
                secondSquareSelected.piece = e.target.innerText

            } catch (e) { PieceSelected.have = false }

            //pseude-moviment
            // this.board[this.secondSquareSelected.row][this.secondSquareSelected.column] = this.PieceSelected.piece
            // this.board[this.PieceSelected.row][this.PieceSelected.column] = '0'
            try {
                clearRedSquares()
            } catch (e) { PieceSelected.have = false }
            PieceSelected.have = false
        })
    }

    clearRedSquares = function () {
        console.log('clearRedSquares')
        placeColorOnPossibleMoviments(PieceSelected.possibleMoviments, '')
        //Ta uma grande merda, mas estou com preguiça, ajeito depois
    }

    pieceMoves = function () { // tenho que dividir essa função em duas futuramente

        let possibleMoviments = []
        switch (PieceSelected.piece) {
            // const blacAkPieces = ['♚', '♛', '♜', '♝', '♞', '♟']
            // const witePieces = ['♔', '♕', '♖', '♗', '♘', '♙']
            case '♔':
            case '♚':
                possibleMoviments = [[1, 0], [0, 1], [1, 1], [-1, 0], [0, -1], [-1, -1], [1, -1], [-1, 1]]
                break;
            case '♕':
            case '♛':
                possibleMoviments = [[1, 0], [2, 0], [3, 0], [4, 0], [5, 0], [6, 0], [7, 0],//tower moves
                [-1, 0], [-2, 0], [-3, 0], [-4, 0], [-5, 0], [-6, 0], [-7, 0],
                [0, 1], [0, 2], [0, 3], [0, 4], [0, 5], [0, 6], [0, 7],
                [0, -1], [0, -2], [0, -3], [0, -4], [0, -5], [0, -6], [0, -7],

                [1, 1], [2, 2], [3, 3], [4, 4], [5, 5], [5, 5], [6, 6], [7, 7], //bishop moves
                [-1, 1], [-2, 2], [-3, 3], [-4, 4], [-5, 5], [-5, 5], [-6, 6], -[-7, 7],
                [1, -1], [2, -2], [3, -3], [4, -4], [5, -5], [5, -5], [6, -6], [7, -7],
                [-1, -1], [-2, -2], [-3, -3], [-4, -4], [-5, -5], [-5, -5], [-6, -6], -[-7, -7]]
                break;
            case '♖':
            case '♜':
                possibleMoviments = [[1, 0], [2, 0], [3, 0], [4, 0], [5, 0], [6, 0], [7, 0],
                [-1, 0], [-2, 0], [-3, 0], [-4, 0], [-5, 0], [-6, 0], [-7, 0],
                [0, 1], [0, 2], [0, 3], [0, 4], [0, 5], [0, 6], [0, 7],
                [0, -1], [0, -2], [0, -3], [0, -4], [0, -5], [0, -6], [0, -7]]
                break;
            case '♗':
            case '♝':
                possibleMoviments = [[1, 1], [2, 2], [3, 3], [4, 4], [5, 5], [5, 5], [6, 6], [7, 7],
                [-1, 1], [-2, 2], [-3, 3], [-4, 4], [-5, 5], [-5, 5], [-6, 6], -[-7, 7],
                [1, -1], [2, -2], [3, -3], [4, -4], [5, -5], [5, -5], [6, -6], [7, -7],
                [-1, -1], [-2, -2], [-3, -3], [-4, -4], [-5, -5], [-5, -5], [-6, -6], -[-7, -7]]
                break;
            case '♘':
            case '♞':
                possibleMoviments = [[2, 1], [2, -1], [1, 2], [-1, 2], [-2, 1], [22, 2], [-2, -1], [1, -2], [-1, -2], [27, 2]]  //row / column 
                break;
            case '♙':
                possibleMoviments = [[1, 0], [2, 0]]
                break;
            case '♟':
                possibleMoviments = [[-1, 0], [-2, 0]]
                break;
        }
        PieceSelected.possibleMoviments = [possibleMoviments]
        placeColorOnPossibleMoviments(possibleMoviments)
    }

    function placeColorOnPossibleMoviments(possibleMoviments, color = 'red') {
        console.log('placeColorOnPossibleMoviments')
        for (el of possibleMoviments) {
            try {
                let squareInNotation = columns[PieceSelected.column - el[1]] + rows[PieceSelected.row - el[0]]
                HTMLboard.querySelector(`#${squareInNotation}`).style.backgroundColor = color
            } catch (e) { } //criticar trycatch vazio = gay 
        }
        refresh()
    }
}

const Xadrez = new Chess('.board')
Xadrez.execute()