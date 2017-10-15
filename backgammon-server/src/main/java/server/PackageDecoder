package server;


import com.google.gson.Gson;
import com.google.gson.JsonElement;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;

import javax.websocket.DecodeException;
import javax.websocket.Decoder;
import javax.websocket.EndpointConfig;

public class PackageDecoder implements Decoder.Text<AbstractPackage>{

    @Override
    public AbstractPackage decode(String s)throws DecodeException {
        //TODO make factory
        System.out.println("PackageDecoder parse JSON string "+s);
        JsonParser parser = new JsonParser();
        JsonElement element = parser.parse(s);
        JsonObject object;
        object = element.getAsJsonObject();
        String className = object.get("CLASS_NAME").getAsString();
        Gson gson = new Gson();
        AbstractPackage abstractPackage = null; // можно сделать полем класс, чтобы лишний раз не парсить????
        //TODO make dispatcher
        switch (className){
            case "EnterPackage":
                abstractPackage = gson.fromJson(s, EnterPackage.class);
                break;
            case "ClosePackage":
                break;

        }
        return abstractPackage;
    }

    @Override
    public boolean willDecode(String s) { //проверяет можно ли получаемый джэсон объект декодировать!
        boolean resutlt = false;
        System.out.println("StringDecorerClass check JSON string: "+s);
        try{
            JsonParser parser = new JsonParser();
            JsonElement element = parser.parse(s);
            JsonObject object;
            object = element.getAsJsonObject();
            String className = object.get("CLASS_NAME").getAsString();
            Gson gson = new Gson();
            AbstractPackage abstractPackage; // можно сделать полем класс, чтобы лишний раз не парсить????
            //TODO (Alexandr) think about it
            switch (className){
                case "EnterPackage":
                    abstractPackage = gson.fromJson(s, EnterPackage.class);
                    resutlt = true;
                    break;
                case "ClosePackage":
                    resutlt = true;
                    break;
                default:
                    resutlt = false;
                    break;
            }
        }catch (Exception e ){
            e.printStackTrace();
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
