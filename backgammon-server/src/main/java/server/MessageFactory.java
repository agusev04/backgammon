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
        map.put("MoveAction", MoveAction.class);
    }

    public static MessageFactory getMessageFactory() {
        return messageFactory;
    }

    public Action makeMessage(String className, String jsonObject) {
        Action action = null;
        map.get(className);
        Gson gson = new Gson();

        Class cl = Enter.class;
        Class thisClass = map.get(className);
        try {
            action = (Action) gson.fromJson(jsonObject, thisClass);
        } catch (Exception ex) {
            action = new ErrorMessage(GameError.UNKNOWN_REQUEST);
        }

        return action;
    }
}
