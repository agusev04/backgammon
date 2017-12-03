package game.gameobjects;

import game.logics.ChipsPositions;
import game.logics.GameError;
import game.logics.GameMatch;
import server.transport.Change;
import server.transport.ChipsCounter;
import server.transport.Move;
import server.transport.MoveBar;

import static game.gameobjects.Cell.BLACK;
import static game.gameobjects.Cell.WHITE;
import static game.logics.GameError.UNABLE_MOVE;


public class GameBoard {

    public static final int WHITE_BAR = 0;
    public static final int BLACK_BAR = 25;
    public static final int WHITE_HOME = 19;
    public static final int BLACK_HOME = 6;
    public static final int CHIPS_OUT = 15;
    public Cell[] cells;
    int whiteCounter = 0;
    int blackCounter = 0;


    public GameBoard() {

        cells = new Cell[26];

        for (int i = WHITE_BAR; i <= BLACK_BAR; i++) {
            cells[i] = new Cell();
        }

        cells[1].setCell(WHITE, 2);
        cells[6].setCell(Cell.BLACK, 5);
        cells[8].setCell(Cell.BLACK, 3);
        cells[12].setCell(WHITE, 5);
        cells[13].setCell(Cell.BLACK, 5);
        cells[17].setCell(WHITE, 3);
        cells[19].setCell(WHITE, 5);
        cells[24].setCell(Cell.BLACK, 2);
    }

    public Change moveChip(int from, int to, char color) throws GameError { //можно вытащить color из cells[from]
        Change change = null;
        if (cells[from].getColor() != color) {
            throw UNABLE_MOVE;
        }
        if ((to > WHITE_BAR) && (to < BLACK_BAR)) { //ход по доске
            if (cells[to].getColor() != cells[from].getColor() && cells[to].getCount() > 1) {
                throw UNABLE_MOVE;
            } else if ((cells[to].getColor() != cells[from].getColor()) && (cells[to].getCount() == 1)) { //вывод с бар
                if (cells[to].getColor() == WHITE) {
                    cells[WHITE_BAR].putChip(WHITE);
                    change = new MoveBar(WHITE, to);
                } else if (cells[to].getColor() == BLACK) {
                    cells[BLACK_BAR].putChip(BLACK);
                    change = new MoveBar(BLACK, to);
                }
                cells[to].takeChip();
            }
            cells[from].takeChip();

            cells[to].putChip(color);


        } else { //вывод с доски
            cells[from].takeChip();
            if (color == Cell.BLACK) {
                blackCounter++;
            } else {
                whiteCounter++;
            }
            change = new ChipsCounter(blackCounter, whiteCounter);
        }
        return change;
    }

    public ChipsPositions getGameState() {
        return new ChipsPositions(cells);
    }

    public Cell[] getCells() {
        return cells;
    }

    public boolean isEnd(char color) {
        boolean result = false;
        if ((color == WHITE) && (whiteCounter == CHIPS_OUT)) {
            result = true;
        } else if ((color == BLACK) && (blackCounter == CHIPS_OUT)) {
            result = true;
        }
        return result;
    }

    public int getWhiteCounter() {
        return whiteCounter;
    }

    public int getBlackCounter() {
        return blackCounter;
    }
}
