package game.logics;

import game.gameobjects.*;

public class Game {
    GameTable table = new GameTable();

//    TODO: геттер для терна (чей ход) (бул тип) 1 - ход, 0 - ожидание своего хода.
//    у каждого должен быть свой флаг ход\ожидание


    public GameTable getTable() {
        return table;
    }

    public int rollDice(){  //функция бросающая кубик
        int resalt = 0;
        resalt =  1 + (int)(Math.random() * ((6- 1)+1));
        return resalt;
    }
}
