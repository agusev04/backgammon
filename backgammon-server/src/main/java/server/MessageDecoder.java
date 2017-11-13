package server;


import com.google.gson.JsonElement;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;
import server.transport.AbstractMessage;
import server.transport.Action;

import javax.websocket.DecodeException;
import javax.websocket.Decoder;
import javax.websocket.EndpointConfig;

/**
 * Класс {@link MessageDecoder} реализует парсинг JSON стоки в наследника {@link AbstractMessage}
 */
public class MessageDecoder implements Decoder.Text<Action> {

    @Override
    public Action decode(String jsonObject) throws DecodeException {
        JsonParser parser = new JsonParser();
        JsonElement element = parser.parse(jsonObject);
        JsonObject object = element.getAsJsonObject();
        String className = object.get("CLASS_NAME").getAsString();
        MessageFactory messageFactory = MessageFactory.getMessageFactory();
        return messageFactory.makeMessage(className, jsonObject);
    }

    @Override
    public boolean willDecode(String jsonObject) {
        return true;
    }

    @Override
    public void init(EndpointConfig endpointConfig) {

    }

    @Override
    public void destroy() {

    }
}
