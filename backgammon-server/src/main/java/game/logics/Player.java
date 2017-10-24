package game.logics;


public class Player {  //класс игрока
    String name;


    public Player(String name) { //конструктор по умолчанию для игрока
        name = name;
    }

    public void setName(String name) {
        this.name = name;
    }
}
