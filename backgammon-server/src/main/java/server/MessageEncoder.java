package server;


import com.google.gson.Gson;

import javax.websocket.EncodeException;
import javax.websocket.Encoder;
import javax.websocket.EndpointConfig;


public class MessageEncoder implements Encoder.Text<AbstractMessage>{

    @Override
    public void init(EndpointConfig endpointConfig) {
    }

    @Override
    public void destroy() {
    }

    @Override
    public String encode(AbstractMessage myPackage) throws EncodeException {
        System.out.println("MessegeEncoderClass encode it " + myPackage.CLASS_NAME);
        Gson gson = new Gson();
        return gson.toJson(myPackage);


    }
}
