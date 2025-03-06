

function Chess(boardClass) {

    this.execute = function () {
        console.log('execute()')
        firstRefresh()
        takeFirstClick()
        takeSecondClick()
    }

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

    let PieceSelected = {
        have: false,
        piece: '',
        square: '',
        row: '',
        column: '',
        possibleMoviments: ''
    }
    let secondSquareSelected = {
        piece: '',
        square: '',
        row: '',
        column: ''
    }

    let board = [
        [TB, NB, BB, QB, KB, BB, NB, TB],//8
        [PB, PB, PB, PB, PB, PB, PB, PB],//7
        [0, 0, 0, 0, 0, 0, 0, 0],//6
        [0, 0, 0, 0, 0, 0, 0, 0],//5
        [0, 0, 0, NW, 0, NB, 0, 0],//4
        [0, 0, 0, 0, 0, 0, 0, 0],//3
        [PW, PW, PW, PW, PW, PW, PW, PW],//2
        [TW, NW, BW, QW, KW, BW, NW, TW]//1
    ]


    function refresh() {
        console.log('refresh()')
        for (let i = 1; i <= 15; i += 2) {
            for (let j = 1; j <= 15; j += 2) {
                HTMLboard.childNodes[j].childNodes[i].innerHTML = board[(i - 1) / 2][(j - 1) / 2]
                if (board[(i - 1) / 2][(j - 1) / 2] == 0) HTMLboard.childNodes[j].childNodes[i].innerHTML = ''
            }
        }
    }

    function changeSquareColor(square, color = selectedSquareColor) {
        try {
            document.querySelector(`#${square}`).style.backgroundColor = color
            console.log(`changeSquareColor(${square}, ${color})`)
        } catch (e) { }
    }

    function firstRefresh() {
        console.log('firstRefresh()')
        document.addEventListener('DOMContentLoaded', (event) => {
            refresh()
        })
    }

    function takeFirstClick() {
        document.addEventListener('click', (e) => {
            if (PieceSelected.have) return
            if (typeof e.target.innerText != 'string') return
            console.log('takeFirstClick()', columns[PieceSelected.column] + rows[PieceSelected.row])
            try {
                PieceSelected.column = columns.indexOf(e.target.id[0])
                PieceSelected.row = rows.indexOf(Number(e.target.id[1]))
                PieceSelected.square = e.target.id
                PieceSelected.piece = e.target.innerText

                if (PieceSelected.piece == 0) return
                PieceSelected.have = true
                changeSquareColor(PieceSelected.square)
                pieceMoves()
                refresh()
            } catch (e) { }

        })

    }
    function takeSecondClick() {
        colorOnPossibleMoviments([[0, 2]], 'black')
        addEventListener('click', (e) => {
            if (e.target.id == PieceSelected.square) return
            console.log('takeSecondClick()')
            try {
                secondSquareSelected.column = columns.indexOf(e.target.id[0])
                secondSquareSelected.row = rows.indexOf(Number(e.target.id[1]))
                secondSquareSelected.square = e.target.id
                secondSquareSelected.piece = e.target.innerText
                if (isRed(secondSquareSelected.column, secondSquareSelected.row)) movePiece()

            } catch (e) { PieceSelected.have = false }

            changeSquareColor(PieceSelected.square, '')
            clearRedSquares()
            PieceSelected.have = false
        })
    }

    function movePiece() {
        console.log('movePiece()')
        if (pieceMoves == PW & secondSquareSelected.row == 0) {
            board[secondSquareSelected.row][secondSquareSelected.column] = QW
        }
        if (pieceMoves == PB & secondSquareSelected.row == 7) {
            board[secondSquareSelected.row][secondSquareSelected.column] = QB
        }
        board[secondSquareSelected.row][secondSquareSelected.column] = PieceSelected.piece
        board[PieceSelected.row][PieceSelected.column] = '0'
    }

    function clearRedSquares() {
        console.log('clearRedSquares()')
        try {
            colorOnPossibleMoviments(PieceSelected.possibleMoviments, '')
        } catch (e) { }
    }

    function pieceMoves() { // tenho que dividir essa função em duas futuramente
        let possibleMoviments = []
        possibleMoviments = createPossibleMoves(PieceSelected.piece)

        PieceSelected.possibleMoviments = possibleMoviments
        colorOnPossibleMoviments(possibleMoviments)
    }

    function colorOnPossibleMoviments(possibleMoviments, color = selectedSquareColor) {
        console.log(`colorOnPossibleMoviments()`)
        console.log(possibleMoviments)
        for (el of possibleMoviments) {
            try {
                changeSquareColor(el, color)
            } catch (e) { }
        }
        refresh()
    }

    function isRed(column, row) {
        let notation = columns[column] + rows[row]
        console.log(`isRed(${column}, ${row})`, notation)
        return HTMLboard.querySelector(`#${notation}`).style.backgroundColor == selectedSquareColor
    }

    function createPossibleMoves(typePiece) {
        console.log('createPossibleMoves()', typePiece)
        let possibleMoviments = []

        if (typePiece == TW) {
            for (let i = 1; i <= 7; i++) { // cima
                try {
                    possibleMoviments.push(columns[PieceSelected.column] + rows[PieceSelected.row - i + 1])
                    if (whitePieces.includes(board[PieceSelected.row - i][PieceSelected.column])) break;
                    if (blackPieces.includes(board[PieceSelected.row - i + 1][PieceSelected.column])) break;
                } catch (e) { }
            }
            for (let i = 1; i <= 8; i++) { // baixo
                try {
                    possibleMoviments.push(columns[PieceSelected.column] + rows[PieceSelected.row - 1 + i])
                    if (whitePieces.includes(board[PieceSelected.row + i][PieceSelected.column])) break;
                    if (blackPieces.includes(board[PieceSelected.row + i - 1][PieceSelected.column])) break;
                } catch (e) { }
            }
            for (let i = 1; i <= 8; i++) { // direita
                try {
                    possibleMoviments.push(columns[PieceSelected.column + i - 1] + rows[PieceSelected.row])
                    if (whitePieces.includes(board[PieceSelected.row][PieceSelected.column + i])) break;
                    if (blackPieces.includes(board[PieceSelected.row][PieceSelected.column + i - 1])) break;
                } catch (e) { }
            }
            for (let i = 1; i <= 8; i++) { // esquerda
                try {
                    possibleMoviments.push(columns[PieceSelected.column - i + 1] + rows[PieceSelected.row])
                    if (whitePieces.includes(board[PieceSelected.row][PieceSelected.column - i])) break;
                    if (blackPieces.includes(board[PieceSelected.row][PieceSelected.column - i + 1])) break;
                } catch (e) { }
            }
        }
        if (typePiece == TB) {
            for (let i = 1; i <= 8; i++) { // cima
                try {
                    possibleMoviments.push(columns[PieceSelected.column] + rows[PieceSelected.row - i + 1])
                    if (whitePieces.includes(board[PieceSelected.row - i + 1][PieceSelected.column])) break;
                    if (blackPieces.includes(board[PieceSelected.row - i][PieceSelected.column])) break;
                } catch (e) { }
            }
            for (let i = 1; i <= 8; i++) { // baixo
                try {
                    possibleMoviments.push(columns[PieceSelected.column] + rows[PieceSelected.row - 1 + i])
                    if (whitePieces.includes(board[PieceSelected.row + i - 1][PieceSelected.column])) break;
                    if (blackPieces.includes(board[PieceSelected.row + i][PieceSelected.column])) break;
                } catch (e) { }
            }
            for (let i = 1; i <= 8; i++) { // direita
                try {
                    possibleMoviments.push(columns[PieceSelected.column + i - 1] + rows[PieceSelected.row])
                    if (whitePieces.includes(board[PieceSelected.row][PieceSelected.column + i - 1])) break;
                    if (blackPieces.includes(board[PieceSelected.row][PieceSelected.column + i])) break;
                } catch (e) { }
            }
            for (let i = 1; i <= 8; i++) { // esquerda
                try {
                    possibleMoviments.push(columns[PieceSelected.column - i + 1] + rows[PieceSelected.row])
                    if (whitePieces.includes(board[PieceSelected.row][PieceSelected.column - i + 1])) break;
                    if (blackPieces.includes(board[PieceSelected.row][PieceSelected.column - i])) break;
                } catch (e) { }
            }
        }
        if (typePiece == BW) {
            for (let i = 1; i <= 8; i++) {
                try {
                    possibleMoviments.push(columns[PieceSelected.column + i] + rows[PieceSelected.row - i])
                    if (whitePieces.includes(board[PieceSelected.row - i][PieceSelected.column + i])) { possibleMoviments.pop(); break; }
                    if (blackPieces.includes(board[PieceSelected.row - i][PieceSelected.column + i])) break;
                } catch (e) { }
            }
            for (let i = 1; i <= 8; i++) {
                try {
                    possibleMoviments.push(columns[PieceSelected.column + i] + rows[PieceSelected.row + i])
                    if (whitePieces.includes(board[PieceSelected.row + i][PieceSelected.column + i])) { possibleMoviments.pop(); break; }
                    if (blackPieces.includes(board[PieceSelected.row + i][PieceSelected.column + i])) break;
                } catch (e) { }
            }
            for (let i = 1; i <= 8; i++) {
                try {
                    possibleMoviments.push(columns[PieceSelected.column - i] + rows[PieceSelected.row - i])
                    if (whitePieces.includes(board[PieceSelected.row - i][PieceSelected.column - i])) { possibleMoviments.pop(); break; }
                    if (blackPieces.includes(board[PieceSelected.row - i][PieceSelected.column - i])) break;
                } catch (e) { }
            }
            for (let i = 1; i <= 8; i++) {
                try {
                    possibleMoviments.push(columns[PieceSelected.column - i] + rows[PieceSelected.row + i])
                    if (whitePieces.includes(board[PieceSelected.row + i][PieceSelected.column - i])) { possibleMoviments.pop(); break; }
                    if (blackPieces.includes(board[PieceSelected.row + i][PieceSelected.column - i])) break;
                } catch (e) { }
            }
        }
        if (typePiece == BB) {
            for (let i = 1; i <= 8; i++) {
                try {
                    possibleMoviments.push(columns[PieceSelected.column + i] + rows[PieceSelected.row - i])
                    if (whitePieces.includes(board[PieceSelected.row - i][PieceSelected.column + i])) break;
                    if (blackPieces.includes(board[PieceSelected.row - i][PieceSelected.column + i])) { possibleMoviments.pop(); break; }
                } catch (e) { }
            }
            for (let i = 1; i <= 8; i++) {
                try {
                    possibleMoviments.push(columns[PieceSelected.column + i] + rows[PieceSelected.row + i])
                    if (whitePieces.includes(board[PieceSelected.row + i][PieceSelected.column + i])) break;
                    if (blackPieces.includes(board[PieceSelected.row + i][PieceSelected.column + i])) { possibleMoviments.pop(); break; }
                } catch (e) { }
            }
            for (let i = 1; i <= 8; i++) {
                try {
                    possibleMoviments.push(columns[PieceSelected.column - i] + rows[PieceSelected.row - i])
                    if (whitePieces.includes(board[PieceSelected.row - i][PieceSelected.column - i])) break;
                    if (blackPieces.includes(board[PieceSelected.row - i][PieceSelected.column - i])) { possibleMoviments.pop(); break; }
                } catch (e) { }
            }
            for (let i = 1; i <= 8; i++) {
                try {
                    possibleMoviments.push(columns[PieceSelected.column - i] + rows[PieceSelected.row + i])
                    if (whitePieces.includes(board[PieceSelected.row + i][PieceSelected.column - i])) break;
                    if (blackPieces.includes(board[PieceSelected.row + i][PieceSelected.column - i])) { possibleMoviments.pop(); break; }
                } catch (e) { }
            }
        }
        if (typePiece == QW) {
            possibleMoviments = createPossibleMoves(TW).concat(createPossibleMoves(BW))
        }
        if (typePiece == QB) {
            possibleMoviments = createPossibleMoves(TB).concat(createPossibleMoves(BB))
        }
        if (typePiece == PW) {
            try {
                if (PieceSelected.row == 6 & board[PieceSelected.row - 2][PieceSelected.column] == 0) {
                    possibleMoviments.push(columns[PieceSelected.column] + rows[PieceSelected.row - 1])
                    possibleMoviments.push(columns[PieceSelected.column] + rows[PieceSelected.row - 2])
                }
            } catch (e) { }
            try {
                if (board[PieceSelected.row - 1][PieceSelected.column] == 0) {
                    possibleMoviments.push(columns[PieceSelected.column] + rows[PieceSelected.row - 1])
                }
            } catch (e) { }
            try {
                if (blackPieces.includes(board[PieceSelected.row - 1][PieceSelected.column - 1])) {
                    possibleMoviments.push(columns[PieceSelected.column - 1] + rows[PieceSelected.row - 1])
                }
            } catch (e) { }
            try {
                if (blackPieces.includes(board[PieceSelected.row - 1][PieceSelected.column + 1])) {
                    possibleMoviments.push(columns[PieceSelected.column + 1] + rows[PieceSelected.row - 1])
                }
            } catch (e) { }
        }
        if (typePiece == PB) {
            try {
                if (PieceSelected.row == 1 & board[PieceSelected.row + 2][PieceSelected.column] == 0) {
                    possibleMoviments.push(columns[PieceSelected.column] + rows[PieceSelected.row + 1])
                    possibleMoviments.push(columns[PieceSelected.column] + rows[PieceSelected.row + 2])
                }
            } catch (e) { }
            try {
                if (board[PieceSelected.row + 1][PieceSelected.column] == 0) {
                    possibleMoviments.push(columns[PieceSelected.column] + rows[PieceSelected.row + 1])
                }
            } catch (e) { }
            try {
                if (whitePieces.includes(board[PieceSelected.row + 1][PieceSelected.column + 1])) {
                    possibleMoviments.push(columns[PieceSelected.column + 1] + rows[PieceSelected.row + 1])
                }
            } catch (e) { }
            try {
                if (whitePieces.includes(board[PieceSelected.row + 1][PieceSelected.column - 1])) {
                    possibleMoviments.push(columns[PieceSelected.column - 1] + rows[PieceSelected.row + 1])
                }
            } catch (e) { }
        }
        if (typePiece == NW) {
            try {
                if (!whitePieces.includes(board[PieceSelected.row + 1][PieceSelected.column + 2]))
                    possibleMoviments.push(columns[PieceSelected.column + 2] + rows[PieceSelected.row + 1])
            } catch (e) { }
            try {
                if (!whitePieces.includes(board[PieceSelected.row - 1][PieceSelected.column + 2]))
                    possibleMoviments.push(columns[PieceSelected.column + 2] + rows[PieceSelected.row - 1])
            } catch (e) { }
            try {
                if (!whitePieces.includes(board[PieceSelected.row + 2][PieceSelected.column + 1]))
                    possibleMoviments.push(columns[PieceSelected.column + 1] + rows[PieceSelected.row + 2])
            } catch (e) { }
            try {
                if (!whitePieces.includes(board[PieceSelected.row + 2][PieceSelected.column - 1]))
                    possibleMoviments.push(columns[PieceSelected.column - 1] + rows[PieceSelected.row + 2])
            } catch (e) { }
            try {
                if (!whitePieces.includes(board[PieceSelected.row + 1][PieceSelected.column - 2]))
                    possibleMoviments.push(columns[PieceSelected.column - 2] + rows[PieceSelected.row + 1])
            } catch (e) { }
            try {
                if (!whitePieces.includes(board[PieceSelected.row - 1][PieceSelected.column - 2]))
                    possibleMoviments.push(columns[PieceSelected.column - 2] + rows[PieceSelected.row - 1])
            } catch (e) { }
            try {
                if (!whitePieces.includes(board[PieceSelected.row - 2][PieceSelected.column + 1]))
                    possibleMoviments.push(columns[PieceSelected.column + 1] + rows[PieceSelected.row - 2])
            } catch (e) { }
            try {
                if (!whitePieces.includes(board[PieceSelected.row - 2][PieceSelected.column - 1]))
                    possibleMoviments.push(columns[PieceSelected.column - 1] + rows[PieceSelected.row - 2])
            } catch (e) { }
        }
        if (typePiece == NB) {
            try {
                if (!blackPieces.includes(board[PieceSelected.row + 1][PieceSelected.column + 2]))
                    possibleMoviments.push(columns[PieceSelected.column + 2] + rows[PieceSelected.row + 1])
            } catch (e) { }
            try {
                if (!blackPieces.includes(board[PieceSelected.row - 1][PieceSelected.column + 2]))
                    possibleMoviments.push(columns[PieceSelected.column + 2] + rows[PieceSelected.row - 1])
            } catch (e) { }
            try {
                if (!blackPieces.includes(board[PieceSelected.row + 2][PieceSelected.column + 1]))
                    possibleMoviments.push(columns[PieceSelected.column + 1] + rows[PieceSelected.row + 2])
            } catch (e) { }
            try {
                if (!blackPieceswhitePieces.includes(board[PieceSelected.row + 2][PieceSelected.column - 1]))
                    possibleMoviments.push(columns[PieceSelected.column - 1] + rows[PieceSelected.row + 2])
            } catch (e) { }
            try {
                if (!blackPieceswhitePieces.includes(board[PieceSelected.row + 1][PieceSelected.column - 2]))
                    possibleMoviments.push(columns[PieceSelected.column - 2] + rows[PieceSelected.row + 1])
            } catch (e) { }
            try {
                if (!blackPieces.includes(board[PieceSelected.row - 1][PieceSelected.column - 2]))
                    possibleMoviments.push(columns[PieceSelected.column - 2] + rows[PieceSelected.row - 1])
            } catch (e) { }
            try {
                if (!blackPieces.includes(board[PieceSelected.row - 2][PieceSelected.column + 1]))
                    possibleMoviments.push(columns[PieceSelected.column + 1] + rows[PieceSelected.row - 2])
            } catch (e) { }
            try {
                if (!blackPieces.includes(board[PieceSelected.row - 2][PieceSelected.column - 1]))
                    possibleMoviments.push(columns[PieceSelected.column - 1] + rows[PieceSelected.row - 2])
            } catch (e) { }
        }
        console.log(possibleMoviments)
        return possibleMoviments
    }
}

const Xadrez = new Chess('.board')
Xadrez.execute()