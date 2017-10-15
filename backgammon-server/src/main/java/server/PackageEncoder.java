package server;


import com.google.gson.Gson;

import javax.websocket.EncodeException;
import javax.websocket.Encoder;
import javax.websocket.EndpointConfig;


public class PackageEncoder implements Encoder.Text<AbstractPackage>{

    @Override
    public void init(EndpointConfig endpointConfig) {
    }

    @Override
    public void destroy() {
    }

    @Override
    public String encode(AbstractPackage myPackage) throws EncodeException {
        System.out.println("StringEncoderClass encode it " + myPackage.CLASS_NAME);
        Gson gson = new Gson();
        return gson.toJson(myPackage);
    }
}
