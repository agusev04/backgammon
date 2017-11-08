package server;

import com.google.gson.Gson;
import game.logics.GameError;
import server.transport.*;

/**
 * Класс {@link MessageFactory} реализует паттер фабричный метод для генерации
 * наследника{@link AbstractMessage}
 */
public class MessageFactory {
    public AbstractMessage makeMessage(String className, String jsonObject) {
        AbstractMessage abstractMessage = null;
        Gson gson = new Gson();
        switch (className) {
            case "Enter":
                abstractMessage = gson.fromJson(jsonObject, Enter.class);
                break;
            case "ThrowCube":
                abstractMessage = gson.fromJson(jsonObject, ThrowCube.class);
                break;
            case "ErrorMessage":
                break;
            case "TestThrowCube":
                abstractMessage = gson.fromJson(jsonObject, TestThrowCube.class);
                break;
            case "MoveMessage":
                break;
            case "FinalMessage":
                break;
            default:
                abstractMessage = new ErrorMessage(GameError.UNKNOWN_REQUEST); //TODO добавить
                break;
        }
        return abstractMessage;
    }
}
