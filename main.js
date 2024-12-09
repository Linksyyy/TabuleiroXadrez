const HTMLboard = document.querySelector('.board')

function Chess() {
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

    const whitePieces = ['♚', '♛', '♜', '♝', '♞', '♟']
    const columns = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h']

    this.PieceSelected = {
        have: true,
        piece: 0,
        square: 0,
        isWhite: 0,
        row: 0,
        column: 0
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

    this.refresh = function (HTMLboard) {
        for (let i = 1; i <= 15; i += 2) {
            for (let j = 1; j <= 15; j += 2) {
                if (this.board[(i - 1) / 2][(j - 1) / 2] != 0)
                    HTMLboard.childNodes[j].childNodes[i].innerHTML = this.board[(i - 1) / 2][(j - 1) / 2]
            }
        }
    }

    this.execute = function () {
        //first click
        document.addEventListener('click', (e) => {
            if (typeof e.target.innerText == 'string') {

                this.PieceSelected.column = columns.indexOf(e.target.id[0])
                this.PieceSelected.row = Number(e.target.id[1]) - 1

                this.PieceSelected.square = e.target.id
                this.PieceSelected.piece = e.target.innerText

                console.log(this.PieceSelected.piece, this.PieceSelected.square)

                //document.querySelector(`#${selectedSquare}`)
            }
        })
    }
    this.movePawn = function () {
        if (this.PieceSelected.have) {
            if (firstRow + 1 == 2) {
                console.log('oi')
                addEventListener('click', (e2) => {
                    let lastColumn = columns.indexOf(e2.target.id[0])
                    let lastRow = Number(e2.target.id[1]) - 1

                    let lastSelectedSquare = e2.target.id
                    let lastSelectedPiece = e2.target.innerText

                    this.board[lastColumn][lastRow] = PW
                })
            }

        }

    }
}


const Xadrez = new Chess()
document.addEventListener('DOMContentLoaded', (event) => {
    Xadrez.refresh(HTMLboard)
})
Xadrez.execute()