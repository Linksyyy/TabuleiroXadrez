const HTMLboard = document.querySelector('.board')
const button = document.querySelector('.button')

function Chess() {
    //white piecies:
    const KW = '&#9812'
    const QW = '&#9813'
    const TW = '&#9814'
    const BW = '&#9815'
    const NW = '&#9816'
    const PW = '&#9817'
    //black pieces:
    const KB = '&#9818'
    const QB = '&#9819'
    const TB = '&#9820'
    const BB = '&#9821'
    const NB = '&#9822'
    const PB = '&#9823'

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
                let actualSquare = HTMLboard.childNodes[j].childNodes[i]
                let actualPiece = this.board[(i - 1)/2][(j - 1)/2]
                if(actualPiece != 0) actualSquare.innerHTML = actualPiece
            }
        }
    }   
}


const Xadrez = new Chess()
document.addEventListener('DOMContentLoaded', (event) => {
    Xadrez.refresh(HTMLboard)
})

button.addEventListener('click', (event) => {
    Xadrez.refresh(HTMLboard)
    console.log('clicked')
})
console.log(Xadrez.board)