package server;


import com.google.gson.Gson;
import com.google.gson.JsonElement;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;
import server.transport.AbstractMessage;
import server.transport.Enter;
import server.transport.ThrowCube;

import javax.websocket.DecodeException;
import javax.websocket.Decoder;
import javax.websocket.EndpointConfig;

public class MessageDecoder implements Decoder.Text<AbstractMessage> {

    @Override
    public AbstractMessage decode(String s) throws DecodeException {
        //TODO make factory
        System.out.println("MessageDecoder parse JSON string " + s);
        JsonParser parser = new JsonParser();
        JsonElement element = parser.parse(s);
        JsonObject object = element.getAsJsonObject();
        String className = object.get("CLASS_NAME").getAsString();
        Gson gson = new Gson();
        AbstractMessage abstractMessage = null; // можно сделать полем класс, чтобы лишний раз не парсить????
        //TODO make dispatcher
        switch (className) {
            case "Enter":
                abstractMessage = gson.fromJson(s, Enter.class);
                break;
            case "ThrowCube":
                abstractMessage = gson.fromJson(s, ThrowCube.class);
                break;
            case "ErrorMessage":
                break;
            case "SuccessMessage":
                break;
            case "MoveMessage":
                break;
            case "FinalMessage":
                break;


        }
        return abstractMessage;
    }

    @Override
    public boolean willDecode(String s) { //проверяет можно ли получаемый джэсон объект декодировать!
        boolean resutlt;
        System.out.println("DecorerClass check JSON string: " + s);
        try {
            JsonParser parser = new JsonParser();
            JsonElement element = parser.parse(s);
            JsonObject object;
            object = element.getAsJsonObject();
            String className = object.get("CLASS_NAME").getAsString();
            Gson gson = new Gson();
            AbstractMessage abstractMessage; // можно сделать полем класс, чтобы лишний раз не парсить????
            //TODO (Alexandr) think about it,  warning
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
        } catch (Exception e) {
            System.out.println("ERROR!!!!");
            resutlt = false;
        }
        return resutlt;
    }

    @Override
    public void init(EndpointConfig endpointConfig) {

    }

    @Override
    public void destroy() {

    }
}
