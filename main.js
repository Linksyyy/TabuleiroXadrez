
function Chess() {
    const HTMLboard = document.querySelector('.board')

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

    const rows = [8, 7, 6, 5, 4, 3, 2, 1]
    const columns = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h']

    function changeSquareColor(square, color) {
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
        [0, 0, 0, 0, 0, 0, 0, 0],//5
        [0, 0, 0, 0, 0, 0, 0, 0],//4
        [0, 0, 0, 0, 0, 0, 0, 0],//3
        [PW, PW, PW, PW, PW, PW, PW, PW],//2
        [TW, NW, BW, QW, KW, BW, NW, TW]//1
    ]

    this.refresh = function () {
        for (let i = 1; i <= 15; i += 2) {
            for (let j = 1; j <= 15; j += 2) {
                HTMLboard.childNodes[j].childNodes[i].innerHTML = this.board[(i - 1) / 2][(j - 1) / 2]
                if (this.board[(i - 1) / 2][(j - 1) / 2] == 0) HTMLboard.childNodes[j].childNodes[i].innerHTML = ' '
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

            this.PieceSelected.column = columns.indexOf(e.target.id[0])
            this.PieceSelected.row = rows.indexOf(Number(e.target.id[1]))
            this.PieceSelected.square = e.target.id
            this.PieceSelected.piece = e.target.innerText

            if (this.PieceSelected.piece == 0) return
            changeSquareColor(this.PieceSelected.square, selectedSquareColor)
            this.PieceSelected.have = true

        })

    }
    this.takeSecondClick = function () {
        addEventListener('click', (e) => {
            if (e.target.id == this.PieceSelected.square) return

            this.secondSquareSelected.column = columns.indexOf(e.target.id[0])
            this.secondSquareSelected.row = rows.indexOf(Number(e.target.id[1]))
            this.secondSquareSelected.square = e.target.id
            this.secondSquareSelected.piece = e.target.innerText
            
            //incomplete
            this.board[this.secondSquareSelected.row][this.secondSquareSelected.column] = this.PieceSelected.piece
            this.board[this.PieceSelected.row][this.PieceSelected.column] = '0'
            
            this.PieceSelected.have = false
            changeSquareColor(this.PieceSelected.square, '')
            this.refresh()
        })
    }
}

const Xadrez = new Chess()
Xadrez.execute()