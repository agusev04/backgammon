package server;

import game.logics.Game;

import java.util.Date;

public class Enter extends AbstractMessage {
    public String myUserName;

    public Enter(String myUserName) {
        this.myUserName = myUserName;
    }

    @Override
    public AbstractMessage apply(MySession mySession) {
        char color;

        //TODO (IvchenkoAlexandr) Этой логики здесь быть не должно(про цвет и установку имени).
        // Это транспортынй слой. Мы обрабатываем вход в игру....

        if(mySession.getNumber()==0){
            color = 'w';
        }else{
            color = 'b';
        }

        mySession.getPlayer().changeParam(myUserName, color);
        //...Мы должны спросить у игры - вот я такой-то, хочу поиграть, а игра должна принять (или не приянть) и если ок
        // ответить нам - ты принят, цвет твой такой-то.
        //На этом слое мы получаем сообщение, передаем управление в игру и формируем ответ.
        GameState gameState = new GameState();
        gameState.getValues(mySession.getPlayer().getGame());
        gameState.setColor(color);
        gameState.setTurn("");
        Date date = new Date();
        gameState.setTableName(mySession.getHub().getSessions()[0].getPlayer().getName()+"s backgammon table created");
        return gameState;
    }


    @Override
    public void getValues(Game game) {
    }


}

