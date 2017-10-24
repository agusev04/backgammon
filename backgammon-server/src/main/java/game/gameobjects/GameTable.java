package game.gameobjects;

import game.logics.ChipsPositions;

public class GameTable {
    public Cell[] cells;

    public GameTable() {  // 0 и 25 ячейки технологические, в них будут храниться фишки которые вышли с поля.
        cells = new Cell[26];
        cells[1].setCell('W', 2);
        cells[6].setCell('B', 5);
        cells[8].setCell('B', 3);
        cells[12].setCell('W', 5);
        cells[13].setCell('B', 5);
        cells[17].setCell('W', 3);
        cells[19].setCell('W', 5);
        cells[24].setCell('B', 2);
    }
    public ChipsPositions getGameState(){
        return new ChipsPositions(cells);
    }
}
