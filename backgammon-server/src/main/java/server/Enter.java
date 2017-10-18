package server;

public class Enter extends AbstractMessage {
    public String myUserName;
    @Override
    public AbstractMessage apply(GameLogic logic) {
        AbstractMessage message = new GameState();
        message.getValues(logic);
        System.out.println("Hi, my name is "+myUserName);
        logic.setEnterScene();

        return message;
    }

    @Override
    public void getValues(GameLogic logic) {

    }
}
