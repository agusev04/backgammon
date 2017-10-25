package game.logics;

import game.gameobjects.*;

public class Game {
    GameTable table = new GameTable();

//    TODO: геттер для терна (чей ход) (бул тип) 1 - ход, 0 - ожидание своего хода.
//    у каждого должен быть свой флаг ход\ожидание

    Player player1;
    Player player2;
    //по умолчанию первый игрок белый, второй игрок черный
    //вместо first и second должна быть переменная, в которую пользователь записывает свое имя при входе
    //придумать как эту переменную сюда привязать



    public  void setPlayer1(Player player1){
        this.player1 = player1;
    }

    public  void setPlayer2(Player player2){
        this.player2 = player2;
    }

    public GameTable getTable() {
        return table;
    }


}
