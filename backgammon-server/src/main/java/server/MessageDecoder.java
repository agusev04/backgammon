package server;


import com.google.gson.JsonElement;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;
import server.transport.AbstractMessage;

import javax.websocket.DecodeException;
import javax.websocket.Decoder;
import javax.websocket.EndpointConfig;

/**
 * Класс {@link MessageDecoder} реализует парсинг JSON стоки в наследника {@link AbstractMessage}
 */
public class MessageDecoder implements Decoder.Text<AbstractMessage> {

    @Override
    public AbstractMessage decode(String jsonObject) throws DecodeException {
        JsonParser parser = new JsonParser();
        JsonElement element = parser.parse(jsonObject);
        JsonObject object = element.getAsJsonObject();
        String className = object.get("CLASS_NAME").getAsString();
        AbstractMessage abstractMessage = null;
        //TODO (IvchenkoAlexandr) фабрику синглтоном сделать
        MessageFactory messageFactory = MessageFactory.getMessageFactory();
        abstractMessage = messageFactory.makeMessage(className, jsonObject);

        return abstractMessage;
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
