package game.logics;


public class Player {  //класс игрока
    String name;
    char color; // 'w' or 'b'

    Game game;


    public Player(String name, char color) { //конструктор по умолчанию для игрока

    }

    public Player(){

    }

    public void setColor(char color) {
        this.color = color;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getName() {
        return name;
    }

    public Game getGame() {

        return game;
    }

    public void setGame(Game game) {
        this.game = game;
    }

    public void changeParam(String name, char color){
        this.name = name;
        this.color = color;
    }
}
