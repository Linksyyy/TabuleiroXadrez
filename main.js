
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

    this.PieceSelected = {
        have: false,
        piece: '',
        square: '',
        row: '',
        column: '',
        get isBlack() { return blackPieces.includes(this.piece) }
    }
    this.secondSquareSelected = {
        piece: '',
        square: '',
        row: '',
        column: '',
        get isBlack() { return blackPieces.includes(this.piece) }
    }

    this.board = [
        [TB, NB, BB, QB, KB, BB, NB, TB],//8
        [PB, PB, PB, PB, PB, PB, PB, PB],//7
        [0, 0, 0, 0, 0, 0, 0, 0],//6
        [0, 0, 0, 0, NW, 0, 0, 0],//5
        [0, 0, 0, 0, 0, 0, 0, 0],//4
        [0, 0, 0, 0, 0, 0, 0, 0],//3
        [PW, PW, PW, PW, PW, PW, PW, PW],//2
        [TW, NW, BW, QW, KW, BW, NW, TW]//1
    ]

    this.refresh = function () {
        for (let i = 1; i <= 15; i += 2) {
            for (let j = 1; j <= 15; j += 2) {
                HTMLboard.childNodes[j].childNodes[i].innerHTML = this.board[(i - 1) / 2][(j - 1) / 2]
                if (this.board[(i - 1) / 2][(j - 1) / 2] == 0 || this.board[(i - 1) / 2][(j - 1) / 2] == 1) HTMLboard.childNodes[j].childNodes[i].innerHTML = ''
                if (this.board[(i - 1) / 2][(j - 1) / 2] == 1) changeSquareColor(HTMLboard.childNodes[j].childNodes[i].id)
            }
        }
    }

    this.execute = function () {
        this.firstRefresh()
        this.takeFirstClick()
        this.takeSecondClick()
    }

    this.firstRefresh = function () {
        document.addEventListener('DOMContentLoaded', (event) => {
            this.refresh()
        })
    }

    this.takeFirstClick = function () {
        document.addEventListener('click', (e) => {
            if (this.PieceSelected.have) return
            if (typeof e.target.innerText != 'string') return
            console.log(1)
            try {
                this.PieceSelected.column = columns.indexOf(e.target.id[0])
                this.PieceSelected.row = rows.indexOf(Number(e.target.id[1]))
                this.PieceSelected.square = e.target.id
                this.PieceSelected.piece = e.target.innerText

                if (this.PieceSelected.piece == 0) return
                this.PieceSelected.have = true
                changeSquareColor(this.PieceSelected.square)
                this.pieceMoves()
                this.refresh()
            } catch (e) { }

        })

    }
    this.takeSecondClick = function () {
        addEventListener('click', (e) => {
            if (e.target.id == this.PieceSelected.square) return
            console.log(2)
            try {
                this.secondSquareSelected.column = columns.indexOf(e.target.id[0])
                this.secondSquareSelected.row = rows.indexOf(Number(e.target.id[1]))
                this.secondSquareSelected.square = e.target.id
                this.secondSquareSelected.piece = e.target.innerText

            } catch (e) { this.PieceSelected.have = false }

            //pseude-moviment
            // this.board[this.secondSquareSelected.row][this.secondSquareSelected.column] = this.PieceSelected.piece
            // this.board[this.PieceSelected.row][this.PieceSelected.column] = '0'

            changeSquareColor(this.PieceSelected.square, '')
            this.pieceMoves()
            this.PieceSelected.have = false
        })
    }

    this.pieceMoves = function () {
        let possibleMoviments
        switch (this.PieceSelected.piece) {
            case '♔':
                break;
            case '♕':
                break;
            case '♖':
                break;
            case '♗':
                break;
            case '♘':
                possibleMoviments = [[2, 1], [2, -1], [1, 2], [-1, 2], [-2, 1], [-2, -1], [1, -2], [-1, -2]]  //linha / coluna
                break;
            case '♙':
                possibleMoviments = [[1, 0], [2, 0]]  //linha / coluna
                break;
            default:
                break;
        }
        this.placeColorOnPossibleMoviments(possibleMoviments)
    }

    this.placeColorOnPossibleMoviments = function (possibleMoviments) {

        let principalColumn = this.PieceSelected.column
        let principalRow = this.PieceSelected.row

        console.log(this.PieceSelected.column, this.PieceSelected.row)

        for (el of possibleMoviments) {
            this.board[principalRow - el[0]][principalColumn - el[1]] = 1
        }
        this.refresh()
    }
}

const Xadrez = new Chess('.board')
Xadrez.execute()