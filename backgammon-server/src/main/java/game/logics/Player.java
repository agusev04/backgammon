package game.logics;


public class Player {  //класс игрока
    String name;
    char color; // 'w' or 'b'

    Game game = new Game();


    public Player(String name, char color) { //конструктор по умолчанию для игрока

    }

    public void setColor(char color) {
        this.color = color;
    }

    public void setName(String name) {
        this.name = name;
    }

    public int rollDice(){  //функция бросающая кубик
        int resalt = 0;
        resalt =  1 + (int)(Math.random() * ((6- 1)+1));
        return resalt;
    }
}
