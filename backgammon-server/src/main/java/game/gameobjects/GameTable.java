package game.gameobjects;

import game.logics.ChipsPositions;

public class GameTable {
    public Cell[] cells;

    public GameTable() {
        cells = new Cell[24];
        cells[0].setCell('W', 2);
        cells[5].setCell('B', 5);
        cells[7].setCell('B', 3);
        cells[11].setCell('W', 5);
        cells[12].setCell('B', 5);
        cells[16].setCell('W', 3);
        cells[18].setCell('W', 5);
        cells[23].setCell('B', 2);
    }
    public ChipsPositions getGameState(){
        return new ChipsPositions(cells);
    }
}
