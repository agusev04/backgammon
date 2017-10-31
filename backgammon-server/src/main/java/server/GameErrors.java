package server;

@Deprecated
public class GameErrors extends Throwable {
    //TODO (IvchenkoAlexandr) Использовать класс из игровой логики
    public static final GameErrors UNABLE_THROW_DICES = new GameErrors(2, "you can not throw dices");

    int cod;
    String message;

    GameErrors(int cod, String message){
        this.cod = cod;
        this.message = message;
    }

    public int getCod() {
        return cod;
    }

    @Override
    public String getMessage() {
        return message;
    }
}
