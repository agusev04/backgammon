package game.gameobjects;

import game.logics.ChipsPositions;

public class GameTable {
    //TODO (Michael) подумать, как лучше назвать этот класс

    public static final int WHITE_OUT = 0;
    public static final int BLACK_OUT = 25;

    public Cell[] cells;

    public GameTable() {  // 0 и 25 ячейки технологические, в них будут храниться фишки которые вышли с поля.
        //TODO (Michael) если принято решение хранить в одном массиве обычные ячейки и "технологические",
        // то это надо выразить в коде, чтобы было понятно что ячейки, например надо создать константы с номерами этих
        // ячеек. Возможно сразу создать какие-то методы для работы с ними.

        cells = new Cell[26];

        for (int i = 0; i < 26; i++) {
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

    public ChipsPositions getGameState() {
        return new ChipsPositions(cells);
    }
}
