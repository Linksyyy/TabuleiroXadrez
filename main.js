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

    const columns = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h']

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
        document.addEventListener('click', (e) => {
            if (typeof e.target.innerText == 'string') {

                let firstColumn = columns.indexOf(e.target.id[0])
                let firstRow = Number(e.target.id[1]) - 1

                let firstSelectedSquare = e.target.id
                let firstSelectedPiece = e.target.innerText

                console.log(this.board[firstRow][firstColumn], firstSelectedSquare)

                //document.querySelector(`#${selectedSquare}`)
                switch (firstSelectedPiece) {
                    //white piecies:
                    case KW:
                        break
                    case QW:
                        break
                    case TW:
                        break
                    case BW:
                        break
                    case NW:
                        break
                    case PW:
                        if (firstRow == 2) {
                            addEventListener('click', (e2) => {

                                let lastColumn = columns.indexOf(e.target.id[0])
                                let lastRow = Number(e.target.id[1]) - 1

                                let lastSelectedSquare = e.target.id
                                let lastSelectedPiece = e.target.innerText

                            })
                        }
                        break
                    //black pieces:
                    case KB:
                        break
                    case QB:
                        break
                    case TB:
                        break
                    case BB:
                        break
                    case NB:
                        break
                    case PB:
                        break
                    case '':
                }
            }
        })
    }
}


const Xadrez = new Chess()
document.addEventListener('DOMContentLoaded', (event) => {
    Xadrez.refresh(HTMLboard)
})
Xadrez.execute()