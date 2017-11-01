package game.logics;


import javax.websocket.Session;

public class Player {  //класс игрока
    String name;
    char color; // 'w' or 'b'

    Game game;
    // Alexandr начал добавлять
    Session session;
    int number; //это номер в массиве в классе Game
    // закончил добавлять
    //TODO (Michael) исправить, как было в задаче с изменением связанного кода

    public Player(String name, char color) { //конструктор по умолчанию для игрока

    }

    public Player() {

    }

    public Player(Game game, Session session, int number) {
        this.game = game;
        this.session = session;
        this.number = number;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) throws GameErrors {
        this.name = name;
    }

    public Game getGame() {
        return game;
    }

    public void setGame(Game game) {
        this.game = game;
    }

    @Deprecated
    public void changeParam(String name, char color) {
        this.name = name;
        this.color = color;
    }

    public Session getSession() {
        return session;
    }

    public void setSession(Session session) {
        this.session = session;
    }

    public int getNumber() {
        return number;
    }

    public void setNumber(int number) {
        this.number = number;
    }

    public char getColor() {
        return color;
    }

    public void setColor(char color) {
        this.color = color;
    }
}
