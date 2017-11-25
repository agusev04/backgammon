package game.gameobjects;

import game.logics.ChipsPositions;
import game.logics.GameError;

import static game.gameobjects.Cell.BLACK;
import static game.gameobjects.Cell.WHITE;
import static game.logics.GameError.UNABLE_MOVE;


public class GameBoard {

    public static final int WHITE_OUT = 0;
    public static final int BLACK_OUT = 25;
    public static final int WHITE_HOME = 19;
    public static final int BLACK_HOME = 6;
    public static final int CHIPS_OUT = 15;
    public Cell[] cells;
    int whiteCounter = 0;
    int blackCounter = 0;


    public GameBoard() {
        cells = new Cell[26];

        for (int i = WHITE_OUT; i <= BLACK_OUT; i++) {
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

    public void moveChip(int from, int to, char color) throws GameError { //можно вытащить color из cells[from]
        if (cells[to].getColor() != cells[from].getColor() && cells[to].getCount() > 1) {
            throw UNABLE_MOVE;
        }
        int finalPosition;
        if (color == Cell.BLACK) {
            finalPosition = WHITE_OUT;
        } else {
            finalPosition = BLACK_OUT;
        }
        cells[from].takeChip();
        if (to != finalPosition) {
            cells[to].putChip(color);
        } else {
            if (color == Cell.BLACK) {
                blackCounter++;
            } else {
                whiteCounter++;
            }
        }

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
