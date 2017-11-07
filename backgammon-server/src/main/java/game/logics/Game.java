package game.logics;

import game.gameobjects.Cell;
import game.gameobjects.GameTable;
import server.transport.AbstractMessage;
import server.transport.GameStart;

import java.util.ArrayList;
import java.util.Random;

import static game.gameobjects.Cell.*;
import static game.gameobjects.GameTable.*;
import static game.logics.GameError.UNABLE_THROW_DICES;

public class Game {
    public static final int WHITE_DIRECTION = 1;
    public static final int BLACK_DIRECTION = -1;
    GameTable table = new GameTable();
    //Alexandr начал
    Player players[] = new Player[2];
    int numberOfPlayers = 0;
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

    public int throwDice(Player player) throws GameError {
        int result;
        if (playerThrow == player) {
            Random random = new Random();
            result = 10 * (random.nextInt(6) + 1) + random.nextInt(6) + 1;
        } else {
            throw UNABLE_THROW_DICES;
        }
        return result;
    }

    public void addPlayer(Player player) {
        //TODO Миша, по сути здесь определяется кто белый, кто черный 0 - белый, 1 - черный (с)Саша
        char color;
        if (numberOfPlayers == 0) {
            color = WHITE;
        } else {
            color = BLACK;
            playerThrow = players[0];
        }
        player.setColor(color);
        players[numberOfPlayers] = player;
        numberOfPlayers++;

    }

    public int getNumberOfPlayers() {
        return numberOfPlayers;
    }

    public Player[] getPlayers() {
        return players;
    }

    public void sendGameStart() {
        GameStart gameStart = new GameStart(players[1].getName());
        players[0].sendMessage(gameStart);
        gameStart = new GameStart(players[0].getName());
        players[1].sendMessage(gameStart);
    }

    public void sendObject(AbstractMessage abstractMessage) {
        players[0].sendMessage(abstractMessage);
        players[1].sendMessage(abstractMessage);
    }

    public ArrayList<Integer> getPossiblePositions(char color, int cubeValues) {
        ArrayList<Integer> arrayList = new ArrayList<>();
        int direction = 0;
        int endGameFlag = isEndGame(color);
        boolean isPosibleCubeValues;
        if (color == BLACK) {
            direction = BLACK_DIRECTION;
        } else if (color == WHITE) {
            direction = WHITE_DIRECTION;
        }
        Cell[] cells = this.table.getCells();
        isPosibleCubeValues = checkBar(color, cubeValues, cells, direction);
        if (isPosibleCubeValues) {
            for (int i = 0; i < cells.length; i++) {
                if ((color == cells[i].getColor())) {
                    if (cubeValues / 10 == cubeValues % 10) {
                        int cubeValue;
                        for (int j = 1; j < 5; j++) {
                            cubeValue = cubeValues / 10;
                            cubeValue *= j;
                            if (isCorrectTurn(cubeValue, color, direction, i, cells, endGameFlag)) {
                                arrayList.add(i * 100 + i + cubeValue);
                            }
                        }
                    } else {
                        int cubeValue = cubeValues / 10;
                        if (isCorrectTurn(cubeValue, color, direction, i, cells, endGameFlag)) {
                            arrayList.add(i * 100 + i + cubeValue);
                        }
                        cubeValue = cubeValues % 10;
                        if (isCorrectTurn(cubeValue, color, direction, i, cells, endGameFlag)) {
                            arrayList.add(i * 100 + i + cubeValue);
                        }
                        cubeValue = cubeValues / 10 + cubeValue % 10;
                        if (isCorrectTurn(cubeValue, color, direction, i, cells, endGameFlag)) {
                            arrayList.add(i * 100 + i + cubeValue);
                        }
                    }
                }
            }
        }

        return arrayList;
    }

    /**
     * Проверка на наличие всех фишек в доме.
     * @param color
     * @return 0 елси все вишки в доме, -1 - в противном случае
     */
    public int isEndGame(char color) {
        Cell[] cells = table.getCells();
        int resualt = 0;
        for (int i = 0; i < cells.length; i++) {
            if ((cells[i].getColor() == color)) {
                if (color == BLACK) {
                    if (cells[i].getCount() > BLAKE_HOME) {
                        resualt = -1;
                        break;
                    }
                } else if (color == WHITE) {
                    if (cells[i].getCount() < WHITE_HOME) {
                        resualt = -1;
                        break;
                    }
                }
            }
        }
        return resualt;
    }

    /**
     * Проверка наличия фишек на баре с дальнейшей проверкой передвижения. Если фишки на баре невозможно
     * сдвинуть при данном значении кубиков, то игрок пропускает ход
     * @param color
     * @param cubeValues
     * @param cells
     * @param direction
     * @return false - если нет возможности сходить фишкой на баре, true - есть возможность сходить или
     * нет фишек на баре.
     */
    public boolean checkBar(char color, int cubeValues, Cell[] cells, int direction) {
        boolean result = false;
        int startPosition;
        char oppositeColor;
        if (color == WHITE) {
            startPosition = WHITE_OUT;
            oppositeColor = BLACK;
        } else {
            startPosition = BLACK_OUT;
            oppositeColor = WHITE;
        }
        if (cells[startPosition].getCount() != 0) {
            if (cubeValues % 10 == cubeValues / 10) {
                int cubeValue = cubeValues % 10;
                for (int i = 1; i < 5; i++) {
                    result = isCorrectTurn(cubeValue * i, oppositeColor, direction, startPosition, cells);
                    if (result) {
                        break;
                    }
                }
            } else {
                result = isCorrectTurn(cubeValues / 10, oppositeColor, direction, startPosition, cells);
                if (!result) {
                    result = isCorrectTurn(cubeValues % 10, oppositeColor, direction, startPosition, cells);
                }
                if (!result) {
                    result = isCorrectTurn(cubeValues / 10 + cubeValues % 10, oppositeColor, direction, startPosition, cells);
                }
            }
        } else {
            result = true;
        }
        return result;
    }

    /**
     * Проверка на возможность хода с учетом фактора выхода с доски
     * @param cubeValue
     * @param color
     * @param direction
     * @param startPosition
     * @param cells
     * @param endGameFlag
     * @return true - возможно, false - невозможно.
     */
    private boolean isCorrectTurn(int cubeValue, char color, int direction,
                                  int startPosition, Cell[] cells, int endGameFlag) {
        boolean result = false;
        if (((startPosition + direction * cubeValue) < cells.length + endGameFlag) &&
                ((startPosition + direction * cubeValue >= 0 - endGameFlag))) {
            result = isCorrectTurn(cubeValue, color, direction, startPosition, cells);
        }
        return result;
    }

    /**
     * Проверка на возможность хода
     * @param cubeValue
     * @param color
     * @param direction
     * @param startPosition
     * @param cells
     * @return true - возможно, false - невозможно.
     */
    private boolean isCorrectTurn(int cubeValue, char color, int direction, int startPosition, Cell[] cells) {
        boolean result = false;
        if (cells[startPosition + direction * cubeValue].getColor() == color) {
            result = true;
        } else if (cells[startPosition + direction * cubeValue].getColor() == NULL) {
            result = true;
        } else if (cells[startPosition + direction * cubeValue].getCount() == 1) {
            result = true;
        }

        return result;
    }
}


