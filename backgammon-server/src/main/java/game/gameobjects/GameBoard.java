package game.gameobjects;

import game.logics.ChipsPositions;

import static game.gameobjects.Cell.BLACK;
import static game.gameobjects.Cell.WHITE;


public class GameBoard {

    public static final int WHITE_OUT = 0;
    public static final int BLACK_OUT = 25;
    public static final int WHITE_HOME = 19;
    public static final int BLACK_HOME = 6;
    public Cell[] cells;
    int whiteCount = 15;
    int blackCount = 15;

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

    public void moveChip(int from, int to, char color) { //можно вытащить color из cells[from]
        int finalPosition;
        int counter;
        if (color == Cell.BLACK) {
            finalPosition = WHITE_OUT;
            counter = whiteCount;
        } else {
            finalPosition = BLACK_OUT;
            counter = blackCount;
        }

        if (to == finalPosition) {
            counter--;
            cells[from].takeChip();
        }else {
            cells[from].takeChip();
            cells[to].putChip(color);
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
        if ((color == WHITE) && (whiteCount == 15)) {
            result = true;
        } else if ((color == BLACK) && (blackCount == 15)) {
            result = true;
        }
        return result;
    }
}
