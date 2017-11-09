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
        MessageFactory messageFactory = new MessageFactory();
        abstractMessage = messageFactory.makeMessage(className, jsonObject);

        return abstractMessage;
    }

    @Override
    public boolean willDecode(String jsonObject) { //проверяет можно ли получаемый джэсон объект декодировать!
        /*boolean resutlt;
        System.out.println("DecorerClass check JSON string: " + s);
            JsonParser parser = new JsonParser();
            JsonElement element = parser.parse(s);
            JsonObject object;
            object = element.getAsJsonObject();
            String className = object.get("CLASS_NAME").getAsString();
            Gson gson = new Gson();
            AbstractMessage abstractMessage; // можно сделать полем класс, чтобы лишний раз не парсить????

            switch (className) {
                case "Enter":
                    abstractMessage = gson.fromJson(s, Enter.class);
                    resutlt = true;
                    break;
                case "ThrowCube":
                    resutlt = true;
                    break;
                default:
                    resutlt = false;
                    break;
            }
            */
        return true;
    }

    @Override
    public void init(EndpointConfig endpointConfig) {

    }

    @Override
    public void destroy() {

    }
}
