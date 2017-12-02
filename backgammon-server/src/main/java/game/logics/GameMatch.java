package game.logics;

import game.gameobjects.Cell;
import game.gameobjects.GameBoard;
import server.transport.*;

import java.util.ArrayList;
import java.util.Random;

import static game.gameobjects.Cell.*;
import static game.gameobjects.GameBoard.*;
import static game.logics.GameError.*;

public class GameMatch {

    public static final int waiting_turn = 0;  // ожидание хода
    public static final int waiting_throw_dice = 1; // ожидание броска кубика
    public static final int waiting_move_chip = 2; // ожидание перемещения фишки
    public static final int the_final = 3; // конец игры
    private static final int WHITE_DIRECTION = 1;
    private static final int BLACK_DIRECTION = -1;
    public boolean turnSkipped; // пропущен ли ход
    GameBoard table = new GameBoard();
    int numberOfPlayers = 0;
    private int currentCubeValue = 0;
    Player whitePlayer;
    Player blackPlayer;
    //Игровые состояния
    private int activePlayerCondition = waiting_turn; // теперь только состояние активного игрока
    private boolean turnWhite = true;  // если true - ход белых, иначе - ход черных
    private int countMove = 1; // переменная для количества ходов

    public int getCountMove() {
        return countMove;
    }

    public GameBoard getTable() {
        return table;
    }


    public int throwDice(Player player, Integer cubeValue) throws GameError {
        if (getActivePlayer() == player) {
            if (activePlayerCondition != waiting_throw_dice) {
                throw UNABLE_THROW_DICES;
            } else {
                int result;
                if (cubeValue == null) {
                    Random random = new Random();
                    result = 10 * (random.nextInt(6) + 1) + random.nextInt(6) + 1;
                } else result = cubeValue.intValue();
                countMove = 2;
                if (result / 10 == result % 10) { // проверка на дубль
                    countMove = 4; //при дубле 4 хода
                }
                currentCubeValue = result;
                activePlayerCondition = waiting_move_chip;
                if ((getPossiblePositions(getActivePlayer().color, (currentCubeValue / 10), (currentCubeValue % 10)).size() == 0)) {
                    countMove = 0;
                    turnSkipped = true;
                    changeTurn();
                }
                return result;
            }

        } else throw UNABLE_TURN;
    }


    public Change changeTurn() { //метод передачи хода
        if (countMove == 0) {
            activePlayerCondition = waiting_throw_dice;
            turnWhite = !turnWhite;
        }
        return new StateChange(this);
    }


    public Change moveChip(Player player, MoveAction move) throws GameError {
        if( move.from <0 || move.from>25){
            throw UNABLE_MOVE;
        }
        int to;
        if (player.getColor() == BLACK) {
            //TODO (IvchenkoAlexandr) Сам же придумал WHITE_DIRECTION и BLACK_DIRECTION, так чего не пользуешься? (РЕШИЛ)
            to = move.from + BLACK_DIRECTION * move.cubeValue;
        } else {
            to = move.from + WHITE_DIRECTION * move.cubeValue;
        }
        Change change = null;
        if (getActivePlayer() == player) {
            if (activePlayerCondition == waiting_move_chip) {
                if (countMove > 0) {
                    if (((move.cubeValue == (currentCubeValue / 10)) && move.cubeValue != 0) ||
                            ((move.cubeValue == (currentCubeValue % 10)) && move.cubeValue != 0)) {
                        table.moveChip(move.from, to, player.color);
                        countMove--;
                    } else throw UNABLE_MOVE;

                    if (table.isEnd(player.getColor())) {
                        change = new Final(player.getColor(), player.getName());
                        if (activePlayerCondition == waiting_move_chip) {
                            activePlayerCondition = the_final;
                        }
                    }
                }

            } else throw UNABLE_TURN; // для этого if предложил новую ошибку ввести на подобии UNABLE_THROW_DICES
        } else throw UNABLE_TURN;

        if ((getPossiblePositions(getActivePlayer().color, (currentCubeValue / 10), (currentCubeValue % 10)).size() == 0)) {
            countMove = 0;
            turnSkipped = true;
        }
        if ((countMove == 0) && (change == null)) {
            change = changeTurn();
        }
        return change;
    }

    public void addPlayer(Player player) {
        char color;
        if (numberOfPlayers == 0) {
            whitePlayer = player;
            color = Cell.WHITE;
        } else {
            blackPlayer = player;
            color = Cell.BLACK;
            activePlayerCondition = waiting_throw_dice;
            // после входа второго игрока, состояние для белого игрока меняется на ожидание броска кубика.
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


    public Player getOtherPlayer(Player player) {
        Player player1 = null;
        if (player == whitePlayer) {
            player1 = blackPlayer;
        } else if (player == blackPlayer) {
            player1 = whitePlayer;
        }
        return player1;
    }


    public ArrayList<Move> getPossiblePositions(char color, int cubeValue) throws GameError {
        if (countMove != 0) {

            if (currentCubeValue / 10 == currentCubeValue % 10) {

            } else if (currentCubeValue / 10 == cubeValue) {
                currentCubeValue -= cubeValue * 10;
                cubeValue = currentCubeValue;
            } else if (currentCubeValue % 10 == cubeValue) {
                currentCubeValue -= cubeValue;
                cubeValue = currentCubeValue / 10;
            }
        } else {
            return null;
        }

        ArrayList<Move> arrayList = new ArrayList<>();
        int direction = 0;
        int endGameFlag = isEndGame(color);
        int barState;
        if (color == BLACK) {
            direction = BLACK_DIRECTION;
        } else if (color == WHITE) {
            direction = WHITE_DIRECTION;
        }
        Cell[] cells = this.table.getCells();
        barState = checkBar(color, cubeValue, cells, direction);
        generateMoves(color, arrayList, direction, endGameFlag, barState, cells, cubeValue);

//        if (arrayList.size() == 0) {
//            countMove = 0;
//        }

        return arrayList;
    }

    public ArrayList<Move> getPossiblePositions(char color, int cube1, int cube2) {
        ArrayList<Move> arrayList = new ArrayList<>();
        int direction = 0;
        int endGameFlag = isEndGame(color);
        int barState1;

        if (color == BLACK) {

            direction = BLACK_DIRECTION;
        } else if (color == WHITE) {
            direction = WHITE_DIRECTION;
        }
        Cell[] cells = this.table.getCells();

        barState1 = checkBar(color, cube1, cells, direction);

        generateMoves(color, arrayList, direction, endGameFlag, barState1, cells, cube1);


        if (cube1 != cube2) {
            int barState2;
            barState2 = checkBar(color, cube2, cells, direction);
            generateMoves(color, arrayList, direction, endGameFlag, barState2, cells, cube2);
        }

//        if (arrayList.size() == 0) {
////            countMove = 0;
//        }

        return arrayList;
    }

    private void generateMoves(char color, ArrayList<Move> arrayList, int direction, int endGameFlag,
                               int barState, Cell[] cells, int cubeValue) {
        if (barState == 2) {
            for (int from = 0; from < cells.length; from++) {
                if ((color == cells[from].getColor())) {
                    int to = from + direction * cubeValue;
                    tryAdd(to, color, cells, endGameFlag, arrayList, from, cubeValue);

                }
            }
            addExceptionMoves(color, arrayList, direction, endGameFlag, cells, cubeValue);
        } else if (barState == 1) {
            int from;
            if (color == WHITE) {
                from = WHITE_BAR;
            } else {
                from = BLACK_BAR;
            }
            int to = from + direction * cubeValue;
            tryAdd(to, color, cells, endGameFlag, arrayList, from, cubeValue);
        }
    }

    private void addExceptionMoves(char color, ArrayList<Move> arrayList, int direction,
                                   int endGameFlag, Cell[] cells, int cubeValue) {
        int to;
        int home;
        if (color == WHITE) {
            to = BLACK_BAR;
            home = WHITE_HOME;
        } else {
            to = WHITE_BAR;
            home = BLACK_HOME;
        }
        int from = to - direction * cubeValue;

        if (endGameFlag == 0) {
            addExceptionMove(color, arrayList, direction, cells, to, home, from);

        }
    }

    private void addExceptionMove(char color, ArrayList<Move> arrayList, int direction, Cell[] cells, int to,
                                  int home, int from) {
        boolean bool = false;
        for (int i = from; i != home - direction; from -= direction) {
            if (cells[i].getColor() == color) {
                bool = true;
                break;
            }
        }
        if (!bool) {
            for (int i = from; i != to; from += direction) {
                if (cells[i].getColor() == color) {
                    arrayList.add(new Move(i, to));
                    break;
                }
            }
        }
    }

    private void tryAdd(int to, char color, Cell cells[], int endGameFlag,
                        ArrayList<Move> arrayList, int from, int cubeValue) {
        if (isCorrectTurn(to, color, cells, endGameFlag)) {
            Move move = new Move(from, to);
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
        int result = 0;
        for (int i = 0; i < cells.length; i++) {
            if ((cells[i].getColor() == color)) {
                if (color == BLACK) {
                    if ((cells[i].getCount() != 0) && (i > BLACK_HOME)) {
                        result = -1;
                        break;
                    }
                } else if (color == WHITE) {
                    if ((cells[i].getCount() != 0) && (i < WHITE_HOME)) {
                        result = -1;
                        break;
                    }
                }
            }
        }
        return result;
    }

    /**
     * Проверка наличия фишек на баре с дальнейшей проверкой передвижения. Если фишки на баре невозможно
     * сдвинуть при данном значении кубиков, то игрок пропускает ход
     *
     * @param color
     * @param cubeValue
     * @param cells
     * @param direction
     * @return 0 - невозможно убрать фишку из тюрьмы, 1 - возможно убрать фишку из тюрьмы, 2 - нет фишек в тюрьме
     */
    public int checkBar(char color, int cubeValue, Cell[] cells, int direction) {
        int result = 0;
        int from;
        if (color == WHITE) {
            from = WHITE_BAR;
        } else {
            from = BLACK_BAR;
        }
        if (cells[from].getCount() != 0) {
            int to = from + direction * cubeValue;
            if (isCorrectTurn(color, cells[to])) {
                result = 1;
            }
        } else {
            result = 2;
        }
        return result;
    }

    /**
     * Проверка на возможность хода с учетом фактора выхода с доски
     *
     * @param to
     * @param color
     * @param cells
     * @param endGameFlag
     * @return true - возможно, false - невозможно.
     */
    private boolean isCorrectTurn(int to, char color, Cell[] cells, int endGameFlag) { //TODO <=
        boolean result = false;

        if (((to) < BLACK_BAR + endGameFlag) &&
                ((to > WHITE_BAR - endGameFlag))) {
            result = isCorrectTurn(color, cells[to]);
        } else if (((to == BLACK_BAR) || (to == WHITE_BAR)) && (endGameFlag == 0)) {
            System.out.println(to + "      " + endGameFlag);
            result = true;
        }
        return result;
    }

    /**
     * Проверка на возможность хода
     *
     * @param color
     * @param cell
     * @return true - возможно, false - невозможно.
     */
    private boolean isCorrectTurn(char color, Cell cell) {
        boolean result = false;
        if (cell.getColor() == color) {
            result = true;
        } else if (cell.getColor() == NULL) {
            result = true;
        } else if (cell.getCount() == 1) {
            result = true;
        }

        return result;
    }


    public Player getActivePlayer() {// это должна быть проверка на активного игрока, проверить верно ли сделано!!!!
        if (!turnWhite) { //дб если false, то возврат игрок черный
            return getBlackPlayer();
        }
        return getWhitePlayer(); // если if не прошел в первом случае, отправляем, что активный игрок белый
    }


    public int getActivePlayerCondition() {
        return activePlayerCondition;
    }


    public void deletePlayer(Player player) {
        if (player == blackPlayer) {
            blackPlayer = null;
        } else if (player == whitePlayer) {
            whitePlayer = null;
        }
    }

    public Change countersChange(Player player, int to) {
        Change change = null;
        if ((player.getColor() == BLACK) && (to == WHITE_BAR)) {
            change = new ChipsCounter(this);
        } else if ((player.getColor() == WHITE) && (to == BLACK_BAR)) {
            change = new ChipsCounter(this);
        }
        return change;
    }

    public boolean isTurnWhite() {
        return turnWhite;
    }

    public int formTo(char color, int cubeValue, int from) {
        int to;
        if (color == WHITE) {
            to = cubeValue + from;
        } else {
            to = from - cubeValue;
        }
        if (to > BLACK_BAR) {
            to = BLACK_BAR;
        } else if (to < WHITE_BAR) {
            to = WHITE_BAR;
        }
        return to;
    }
}



