package game.logics;

import game.gameobjects.Cell;
import game.gameobjects.GameBoard;
import server.transport.AbstractMessage;
import server.transport.GameStart;
import server.transport.Move;

import java.util.ArrayList;
import java.util.Random;

import static game.gameobjects.Cell.*;
import static game.gameobjects.GameBoard.*;
import static game.logics.GameError.UNABLE_THROW_DICES;

public class GameMatch {

    public static final int WHITE_DIRECTION = 1;
    public static final int BLACK_DIRECTION = -1;
    GameBoard table = new GameBoard();
    int numberOfPlayers = 0;
    Player playerThrow = null; //Миша, я могу кидать тебе игрока который постучался на сервер, а ты будешь сравнивать
    Player playerMove = null;
    boolean turnWhite = false;
    boolean turnBlack = false;

        /* Игровые состояния */

    int waiting_turn = 0;  // ожидание хода
    int waiting_throw_dice = 1; // ожидание броска кубика
    int waiting_move_chip = 2; // ожидание перемещения фишки
    int the_final = 3; //

//    TODO: геттер для терна (чей ход) (бул тип) 1 - ход, 0 - ожидание своего хода.
//    у каждого должен быть свой флаг ход\ожидание

    Player whitePlayer;
    Player blackPlayer;

    //TODO (Michael) подумать, как лучше назвать этот класс !!

    //TODO (Michael) Логика, кто белый, а кто черный, должна быть организована здесь. !!
    //TODO (Michael) Логика, чей ход - тоже  здесь.
    //TODO (Michael) Логика, можно ли сейчас бросить кубик - тоже.
    //TODO (Michael) Значение кубика должно быть тоже здесь. !!
    //TODO (Michael) Оппонет должен запрашиваться отсюда


    public GameBoard getTable() {
        return table;
    }

    public int throwDice(Player player, Integer cubeValue) throws GameError {
        int result;
        if (cubeValue == null) {
            if (playerThrow == player) {
                Random random = new Random();
                result = 10 * (random.nextInt(6) + 1) + random.nextInt(6) + 1;
            } else {
                throw UNABLE_THROW_DICES;
            }
        } else {
            result = cubeValue.intValue();
        }
        return result;
    }

    public void moveChip(int from, int to) {
        getTable().moveChip(from, to);
    }

    public void addPlayer(Player player) {
        char color;
        if (numberOfPlayers == 0) {
            whitePlayer = player;
            color = Cell.WHITE;
        } else {
            blackPlayer = player;
            color = Cell.BLACK;
            turnWhite = true;
            playerThrow = whitePlayer;
        }
        player.setColor(color);
        numberOfPlayers++;
    }

    public int getNumberOfPlayers() {
        return numberOfPlayers;
    }

    public Player getWhitePlayer() {
        return whitePlayer;
    }

    public Player getBlackPlayer() {
        return blackPlayer;
    }

    public void sendGameStart() {
        GameStart gameStart = new GameStart(blackPlayer.getName());
        whitePlayer.sendMessage(gameStart);
        gameStart = new GameStart(whitePlayer.getName());
        blackPlayer.sendMessage(gameStart);
    }

    public void sendObject(AbstractMessage abstractMessage) {
        blackPlayer.sendMessage(abstractMessage);
        whitePlayer.sendMessage(abstractMessage);
    }

    public ArrayList<Move> getPossiblePositions(char color, int cubeValues) {
        ArrayList<Move> arrayList = new ArrayList<>();
        int direction = 0;
        int endGameFlag = isEndGame(color);
        boolean isPosibleCubeValues;
        if (color == BLACK) {
            direction = BLACK_DIRECTION;
        } else if (color == WHITE) {
            direction = WHITE_DIRECTION;
        }
        Move move;
        Cell[] cells = this.table.getCells();
        isPosibleCubeValues = checkBar(color, cubeValues, cells, direction);
        if (isPosibleCubeValues) {
            for (int i = 0; i < cells.length; i++) {
                if ((color == cells[i].getColor())) {
                    int cube1 = cubeValues / 10;
                    int cube2 = cubeValues % 10;
                    if (cube1 == cube2) {
                        int cubeValue;
                        for (int j = 1; j < 5; j++) {
                            cubeValue = cube1 * j;
                            int secondPosition = i + direction * cubeValue;
                            tryAdd(secondPosition, color, cells, endGameFlag, arrayList, i, cubeValue);
                        }
                    } else {
                        int cubeValue = cube1;
                        int secondPosition = i + direction * cubeValue;
                        tryAdd(secondPosition, color, cells, endGameFlag, arrayList, i, cubeValue);
                        cubeValue = cube2;
                        secondPosition = i + direction * cubeValue;
                        tryAdd(secondPosition, color, cells, endGameFlag, arrayList, i, cubeValue);
                        cubeValue = cube1 + cube2;
                        secondPosition = i + direction * cubeValue;
                        tryAdd(secondPosition, color, cells, endGameFlag, arrayList, i, cubeValue);
                    }
                }
            }
        }

        return arrayList;
    }

    private void tryAdd(int secondPosition, char color, Cell cells[], int endGameFlag,
                        ArrayList<Move> arrayList, int firstPosition, int cubeValue) {
        if (isCorrectTurn(secondPosition, color, cells, endGameFlag)) {
            Move move = new Move(firstPosition, firstPosition + cubeValue);
            arrayList.add(move);
        }
    }

    /**
     * Проверка на наличие всех фишек в доме.
     *
     * @param color
     * @return 0 елси все вишки в доме, -1 - в противном случае
     */
    public int isEndGame(char color) {
        Cell[] cells = table.getCells();
        int resualt = 0;
        for (int i = 0; i < cells.length; i++) {
            if ((cells[i].getColor() == color)) {
                if (color == BLACK) {
                    if (cells[i].getCount() > BLACK_HOME) {
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
     *
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
                    int secondPosition = startPosition + direction * cubeValues / 10 * i;
                    result = isCorrectTurn(secondPosition, oppositeColor, cells);
                    if (result) {
                        break;
                    }
                }
            } else {
                int secondPosition = startPosition + direction * cubeValues / 10;
                result = isCorrectTurn(secondPosition, oppositeColor, cells);
                secondPosition = startPosition + direction * cubeValues & 10;
                if (!result) {
                    result = isCorrectTurn(secondPosition, oppositeColor, cells);
                }
                secondPosition = startPosition + direction * (cubeValues / 10 + cubeValues % 10);
                if (!result) {
                    result = isCorrectTurn(secondPosition, oppositeColor, cells);
                }
            }
        } else {
            result = true;
        }
        return result;
    }

    /**
     * Проверка на возможность хода с учетом фактора выхода с доски
     *
     * @param secondPosition
     * @param color
     * @param cells
     * @param endGameFlag
     * @return true - возможно, false - невозможно.
     */
    private boolean isCorrectTurn(int secondPosition, char color, Cell[] cells, int endGameFlag) {
        boolean result = false;
        if (((secondPosition) < cells.length + endGameFlag) &&
                ((secondPosition >= 0 - endGameFlag))) {
            result = isCorrectTurn(secondPosition, color, cells);
        }
        return result;
    }

    /**
     * Проверка на возможность хода
     *
     * @param secondPosition
     * @param color
     * @param cells
     * @return true - возможно, false - невозможно.
     */
    private boolean isCorrectTurn(int secondPosition, char color, Cell[] cells) {
        boolean result = false;
        if (cells[secondPosition].getColor() == color) {
            result = true;
        } else if (cells[secondPosition].getColor() == NULL) {
            result = true;
        } else if (cells[secondPosition].getCount() == 1) {
            result = true;
        }

        return result;
    }
}



