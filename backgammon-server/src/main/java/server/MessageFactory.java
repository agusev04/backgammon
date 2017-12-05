package server;

import com.google.gson.Gson;
import game.logics.GameError;
import org.apache.log4j.Logger;
import server.transport.*;

import java.util.HashMap;

/**
 * Класс {@link MessageFactory} реализует паттер фабраки для генерации
 * наследника{@link AbstractMessage}
 */
public class MessageFactory {
    private final Logger logger = Logger.getLogger(this.getClass());

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
        Action action;
        map.get(className);
        Gson gson = new Gson();

        Class thisClass = map.get(className);
        try {
            action = (Action) gson.fromJson(jsonObject, thisClass);
        } catch (Exception ex) {
            logger.error(ex);
            action = new ErrorMessage(GameError.UNKNOWN_REQUEST);
        }

        return action;
    }
}
