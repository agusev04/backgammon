package server;

import game.logics.Game;

import javax.websocket.EncodeException;
import java.io.IOException;

import static server.GameErrors.UNABLE_THROW_DICES;

public class ThrowCube extends AbstractMessage {


    @Override
    public AbstractMessage apply(MySession mySession) throws GameErrors {
        AbstractMessage cubeMessage = null;
        CubeValue cubeValue = new CubeValue();
        if(mySession.getHub().isMyTurn(mySession)){
            cubeValue.getValues(mySession.getHub().getGame());
            mySession.getHub().setMoveState(mySession);
            try {
                mySession.getHub().getSecondSessions(mySession.getNumber()).getSession().getBasicRemote().sendObject(cubeValue);
            } catch (IOException | EncodeException e) {
                e.printStackTrace();
            }
        }else{
            throw UNABLE_THROW_DICES;
        }

        return cubeValue;
    }

    @Override
    public void getValues(Game game) {

    }
}
