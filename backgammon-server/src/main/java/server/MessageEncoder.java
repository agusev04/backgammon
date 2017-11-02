package server;

import com.google.gson.Gson;
import server.transport.AbstractMessage;

import javax.websocket.EncodeException;
import javax.websocket.Encoder;
import javax.websocket.EndpointConfig;

/**
 * Класс {@link MessageDecoder} реализует парсинг наследников {@link AbstractMessage} в JSON стоки
 */
public class MessageEncoder implements Encoder.Text<AbstractMessage> {

    @Override
    public void init(EndpointConfig endpointConfig) {
    }

    @Override
    public void destroy() {
    }

    @Override
    public String encode(AbstractMessage myPackage) throws EncodeException {
        Gson gson = new Gson();
        return gson.toJson(myPackage);
    }
}
