package game.gameobjects;

import game.logics.ChipsPositions;
import game.logics.GameError;

import static game.logics.GameError.UNABLE_MOVE;


public class GameBoard {

    public static final int WHITE_OUT = 0;
    public static final int BLACK_OUT = 25;
    public static final int WHITE_HOME = 19;
    public static final int BLACK_HOME = 6;

    public Cell[] cells;

    public GameBoard() {
        cells = new Cell[26];

        for (int i = WHITE_OUT; i <= BLACK_OUT; i++) {
            cells[i] = new Cell();
        }

        cells[1].setCell(Cell.WHITE, 2);
        cells[6].setCell(Cell.BLACK, 5);
        cells[8].setCell(Cell.BLACK, 3);
        cells[12].setCell(Cell.WHITE, 5);
        cells[13].setCell(Cell.BLACK, 5);
        cells[17].setCell(Cell.WHITE, 3);
        cells[19].setCell(Cell.WHITE, 5);
        cells[24].setCell(Cell.BLACK, 2);
    }

    public void moveChip(int from, int to) throws GameError {
        if(cells[to].getColor() != cells[from].getColor() && cells[to].getCount() > 1) {
            throw UNABLE_MOVE;
        }
        cells[from].setCell(cells[from].getColor(), cells[from].getCount()-1);
        cells[to].setCell(cells[from].getColor(), cells[to].getCount()+1);
        if(cells[from].count == 0) {
            cells[from].color = Cell.NULL;
        }
    }

    public ChipsPositions getGameState() {
        return new ChipsPositions(cells);
    }

    public Cell[] getCells() {
        return cells;
    }
}
