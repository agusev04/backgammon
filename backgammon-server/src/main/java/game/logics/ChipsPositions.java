package game.logics;


import game.gameobjects.Cell;
import server.transport.ChipsPosition;

import java.util.ArrayList;


public class ChipsPositions {

    ArrayList<ChipsPosition> whitePos = new ArrayList<>(); // массив для записи позиций белых фишек
    ArrayList<ChipsPosition> blackPos = new ArrayList<>(); // массив для записи позиций черных фишек

    public ChipsPositions(Cell[] cells) {
        for (int i = 0; i < cells.length; i++) {
            if (cells[i].count > 0) {
                if (cells[i].color == Cell.WHITE) {
                    whitePos.add(new ChipsPosition(i, cells[i].count));
                } else if (cells[i].color == Cell.BLACK) {
                    blackPos.add(new ChipsPosition(i, cells[i].count));
                }
            }
        }
    }

    public ArrayList<ChipsPosition> getBlackPos() {  // передача полученный позиций черных фишек
        return blackPos;
    }

    public ArrayList<ChipsPosition> getWhitePos() {  // передеча полученных позиций белых фишек
        return whitePos;
    }
}