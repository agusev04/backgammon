package server;

import com.google.gson.Gson;
import game.logics.GameError;
import server.transport.*;

import java.util.HashMap;

/**
 * Класс {@link MessageFactory} реализует паттер фабраки для генерации
 * наследника{@link AbstractMessage}
 */
public class MessageFactory {

    //TODO (IvchenkoAlexandr) это не фабричный метод, это обычная фабрика и то...
    // тот же свитч просто в отдельный клаас перенес.
    //Сделай тут тогда уже Map c классами по именам
    private static MessageFactory messageFactory = new MessageFactory();
    HashMap<String, Class> map = new HashMap<>();

    private MessageFactory() {
        map.put("Enter", Enter.class);
        map.put("ThrowCube", ThrowCube.class);
        map.put("TestThrowCube", TestThrowCube.class);
    }

    public static MessageFactory getMessageFactory() {
        return messageFactory;
    }

    public AbstractMessage makeMessage(String className, String jsonObject) {
        AbstractMessage abstractMessage = null;
        map.get(className);
        Gson gson = new Gson();

  /*      switch (className) {
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
                */

        //}
        Class cl = Enter.class;
        Class thisClass = map.get(className);
        try {
            abstractMessage = (AbstractMessage) gson.fromJson(jsonObject, thisClass);
        } catch (Exception ex) {
            abstractMessage = new ErrorMessage(GameError.UNKNOWN_REQUEST);
        }

        return abstractMessage;
    }
}
