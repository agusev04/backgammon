package game.logics;


import game.gameobjects.Cell;

import java.util.ArrayList;


public class ChipsPositions {

    ArrayList<Integer> whitePos = new ArrayList<Integer>(); // массив для записи позиций белых фишек
    ArrayList<Integer> blackPos = new ArrayList<Integer>(); // массив для записи позиций черных фишек

    public ChipsPositions(Cell[] cells) {
        for (int i = 0; i < cells.length; i++) {
            if (cells[i].count > 0) {
                if (cells[i].color == Cell.WHITE) {
                    whitePos.add((i) * 100 + cells[i].count);
                } else if (cells[i].color == Cell.BLACK) {
                    blackPos.add((i) * 100 + cells[i].count);
                }
            }
        }
    }

    public ArrayList<Integer> getBlackPos() {  // передача полученный позиций черных фишек
        return blackPos;
    }

    public ArrayList<Integer> getWhitePos() {  // передеча полученных позиций белых фишек
        return whitePos;
    }
}