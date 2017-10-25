package game.gameobjects;

import game.logics.ChipsPositions;

public class GameTable {
    public Cell[] cells;

    public GameTable() {  // 0 и 25 ячейки технологические, в них будут храниться фишки которые вышли с поля.
        cells = new Cell[26];

        for(int i = 0; i < 26; i++){
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
    public ChipsPositions getGameState(){
        return new ChipsPositions(cells);
    }
}
