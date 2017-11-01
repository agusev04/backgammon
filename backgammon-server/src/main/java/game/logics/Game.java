package game.logics;

import game.gameobjects.GameTable;

import java.util.Random;

import static game.logics.GameErrors.UNABLE_THROW_DICES;

public class Game {
    GameTable table = new GameTable();

    //Alexandr начал
    Player players[] = new Player[2];
    int numberOfPlayer = 0;

    Player playerThrow = null; //Миша, я могу кидать тебе игрока который постучался на сервер, а ты будешь сравнивать
    Player playerMove = null;


    //закончил

//    TODO: геттер для терна (чей ход) (бул тип) 1 - ход, 0 - ожидание своего хода.
//    у каждого должен быть свой флаг ход\ожидание

    Player player1;
    Player player2;
    //по умолчанию первый игрок белый, второй игрок черный
    //вместо first и second должна быть переменная, в которую пользователь записывает свое имя при входе
    //придумать как эту переменную сюда привязать

    //TODO (Michael) подумать, как лучше назвать этот класс

    //TODO (Michael) Логика, кто белый, а кто черный, должна быть организована здесь.
    //TODO (Michael) Логика, чей ход - тоже  здесь.
    //TODO (Michael) Логика, можно ли сейчас бросить кубик - тоже.
    //TODO (Michael) Значение кубика должно быть тоже здесь.
    //TODO (Michael) Оппонет должен запрашиваться отсюда


    public void setPlayer1(Player player1) {
        this.player1 = player1;
    }

    public void setPlayer2(Player player2) {
        this.player2 = player2;
    }

    public GameTable getTable() {
        return table;
    }

    public int throwDice(Player player) throws GameErrors {
        int resalt = 0;
        if (playerThrow == player) {

            Random random = new Random();
            resalt = 10 * (random.nextInt(5) + 1) + random.nextInt(5) + 1;
        } else {
            throw UNABLE_THROW_DICES;
        }
        return resalt;
    }

    public void setPlayer(Player player) {
        //TODO Миша, по сути здесь определяется кто белый, кто черный 0 - белый, 1 - черный (с)Саша
        char color;
        if(numberOfPlayer==0){
            color = 'w';
        }else{
            color = 'b';
        }
        player.setColor(color);
        players[numberOfPlayer] = player;
        numberOfPlayer++;
    }

    public int getNumberOfPlayer() {
        return numberOfPlayer;
    }

    public Player[] getPlayers() {
        return players;
    }


}
