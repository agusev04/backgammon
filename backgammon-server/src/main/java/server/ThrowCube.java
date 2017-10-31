package server;

import game.logics.Game;

import javax.websocket.EncodeException;
import java.io.IOException;

import static server.GameErrors.UNABLE_THROW_DICES;

public class ThrowCube extends AbstractMessage {


    @Override
    public AbstractMessage apply(MySession mySession) throws GameErrors {
        AbstractMessage cubeMessage = null;
        //TODO (IvchenkoAlexandr) Также, логика должна быть в Game. Здесь просто зовем нужный метод (методы),
        // ловим ошибку, формируем ответ
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
            //TODO (IvchenkoAlexandr) Ошибку должна бросать игра (см коммент в RequestHandler)
            throw UNABLE_THROW_DICES;
            //TODO (IvchenkoAlexandr) Статическим импортом лучше не злоупотреблять, так не видно, сразу, что это вообще такое
        }

        return cubeValue;
    }

    @Override
    public void getValues(Game game) {

    }
}
