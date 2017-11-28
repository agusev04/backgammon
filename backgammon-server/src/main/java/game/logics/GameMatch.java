package game.logics;

import game.gameobjects.Cell;
import game.gameobjects.GameBoard;
import server.transport.*;

import java.util.ArrayList;
import java.util.Random;

import static game.gameobjects.Cell.*;
import static game.gameobjects.GameBoard.*;
import static game.logics.GameError.UNABLE_THROW_DICES;
import static game.logics.GameError.UNABLE_TURN;

public class GameMatch {

    public static final int waiting_turn = 0;  // ожидание хода
    public static final int waiting_throw_dice = 1; // ожидание броска кубика
    public static final int waiting_move_chip = 2; // ожидание перемещения фишки
    public static final int the_final = 3; // конец игры
    private static final int WHITE_DIRECTION = 1;
    private static final int BLACK_DIRECTION = -1;
    GameBoard table = new GameBoard();
    int numberOfPlayers = 0;
    int currentCubeValue = 0;
    Player whitePlayer;
    Player blackPlayer;
    //Игровые состояния
    private int whitePlayerCondition = waiting_turn; // в начале игры оба игрока ожидают ход
    private int blackPlayerCondition = waiting_turn; // в начале игры оба игрока ожидают ход
    private boolean turnWhite = true;  // если true - ход белых, иначе - ход черных
    private int countMove = 1; // переменная для количества ходов

    public int getCountMove() {
        return countMove;
    }

    public GameBoard getTable() {
        return table;
    }


    public int throwDice(Player player, Integer cubeValue) throws GameError { //TODO смена состояний, проверка на то тот ли ирок бросает
        if (turnWhite && whitePlayerCondition != waiting_throw_dice) {
            throw UNABLE_TURN;
        }
        if (!turnWhite && blackPlayerCondition != waiting_throw_dice) {
            throw UNABLE_TURN;
        }
        int result;
        if (cubeValue == null) {
            if (getActivePlayer() == player) {
                Random random = new Random();
                result = 10 * (random.nextInt(6) + 1) + random.nextInt(6) + 1;
            } else {
                throw UNABLE_THROW_DICES;
            }
        } else if (getActivePlayer() == player) {
            result = cubeValue.intValue();
        } else {
            throw UNABLE_THROW_DICES;
        }
        if (turnWhite && whitePlayerCondition == waiting_throw_dice) {
            whitePlayerCondition = waiting_move_chip;
        }
        if (!turnWhite && blackPlayerCondition == waiting_throw_dice) {
            blackPlayerCondition = waiting_move_chip;
        }
        countMove = 2;
        if (result / 10 == result % 10) { // проверка на дубль
            countMove = 4; //при дубле 4 хода
        }
        currentCubeValue = result;
        return result;
    }

    public Change changeTurn() { //метод передачи хода
        if (countMove == 0) {
            if (whitePlayerCondition == waiting_move_chip) {
                whitePlayerCondition = waiting_turn;
                blackPlayerCondition = waiting_throw_dice;
                turnWhite = false;

            } else if (blackPlayerCondition == waiting_move_chip) {
                blackPlayerCondition = waiting_turn;
                whitePlayerCondition = waiting_throw_dice;
                turnWhite = true;
                // после перемещения фишек одним игроком, ему передается состояния ожидания хода, второму - состояние ожидания броска кубика
                // и идет переключение флага хода
            }
        }
        return new StateChange(this);
    }

    public Change moveChip(Player player, MoveAction move) throws GameError {
        if (turnWhite && whitePlayerCondition != waiting_move_chip) {
            throw UNABLE_TURN;
        }
        if (!turnWhite && blackPlayerCondition != waiting_move_chip) {
            throw UNABLE_TURN;
        }
        Change change = null;
        int to;
        if (player.getColor() == BLACK) {
            to = move.from - move.cubeValue;
        } else {
            to = move.from + move.cubeValue;
        }

        if (getActivePlayer() == player) {
            if (!move.isCantMove() || countMove > 0) {
                table.moveChip(move.from, to, player.color);
                countMove--;
                System.out.println("You have move count: " + getCountMove());
                if (table.isEnd(player.getColor())) {
                    change = new Final(player.getColor(), player.getName());
                    if (turnWhite && whitePlayerCondition == waiting_move_chip) {
                        whitePlayerCondition = the_final;
                    }
                    if (!turnWhite && blackPlayerCondition == waiting_move_chip) {
                        blackPlayerCondition = the_final;
                    }
                    System.out.println("GameMatch: final");
                }
            }
            if ((countMove == 0) && (change == null)) {
                changeTurn();
                change = new StateChange(this);
            }
            if ((move.isCantMove()) && (change == null)) { //елси не равно null значит конец игры и менять ход не имеет смысла
                countMove = 0;
                changeTurn();
                StateChange st = new StateChange(this);
                change = new TurnChange(this, st);
            }
        } else throw UNABLE_TURN;
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
            whitePlayerCondition = waiting_throw_dice; // после входа второго игрока, состояние для белого игрока меняется на ожидание броска кубика.
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
            return new ArrayList<>();
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
        if (arrayList.size() == 0) {
            countMove = 0;
        }

        return arrayList;
    }

    public ArrayList<Move> getPossiblePositions(char color, int cube1, int cube2) {
        ArrayList<Move> arrayList = new ArrayList<>();
        int direction = 0;
        int endGameFlag = isEndGame(color);
        int barState1;
        int barState2;
        if (color == BLACK) {
            direction = BLACK_DIRECTION;
        } else if (color == WHITE) {
            direction = WHITE_DIRECTION;
        }
        Cell[] cells = this.table.getCells();

        barState1 = checkBar(color, cube1, cells, direction);
        barState2 = checkBar(color, cube2, cells, direction);
        generateMoves(color, arrayList, direction, endGameFlag, barState1, cells, cube1);
        generateMoves(color, arrayList, direction, endGameFlag, barState2, cells, cube2);

        if (arrayList.size() == 0) {
            countMove = 0;
        }

        return arrayList;
    }

    private void generateMoves(char color, ArrayList<Move> arrayList, int direction, int endGameFlag, int barState, Cell[] cells, int cubeValue) {
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
                from = WHITE_OUT;
            } else {
                from = BLACK_OUT;
            }
            int to = from + direction * cubeValue;
            tryAdd(to, color, cells, endGameFlag, arrayList, from, cubeValue);
        }
    }

    private void addExceptionMoves(char color, ArrayList<Move> arrayList, int direction, int endGameFlag, Cell[] cells, int cubeValue) {
        int to;
        int home;
        if (color == WHITE) {
            to = BLACK_OUT;
            home = WHITE_HOME;
        } else {
            to = WHITE_OUT;
            home = BLACK_HOME;
        }
        int from = to - direction * cubeValue;

        if (endGameFlag == 0) {
            addExceptionMove(color, arrayList, direction, cells, to, home, from);

        }
    }

    private void addExceptionMove(char color, ArrayList<Move> arrayList, int direction, Cell[] cells, int to, int home, int from) {
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
            Move move = new Move(from, from + cubeValue);
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
            from = WHITE_OUT;
        } else {
            from = BLACK_OUT;
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

        if (((to) < BLACK_OUT + endGameFlag) &&
                ((to > WHITE_OUT - endGameFlag))) {
            result = isCorrectTurn(color, cells[to]);
        } else if (((to == BLACK_OUT) || (to == WHITE_OUT)) && (endGameFlag == 0)) {
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

    public int getWhitePlayerCondition() { // возвращение состояния белого игрока
        return whitePlayerCondition;
    }

    public int getBlackPlayerCondition() { // возвращение состояния черного игрока
        return blackPlayerCondition;
    }


    public Player getActivePlayer() {// это должна быть проверка на активного игрока, проверить верно ли сделано!!!!
        if (!turnWhite) { //дб если false, то возврат игрок черный
            return getBlackPlayer();
        }
        return getWhitePlayer(); // если if не прошел в первом случае, отправляем, что активный игрок белый
    }

    public Player getWaitingPlayer() {
        if (!turnWhite) {
            return getWhitePlayer();
        }
        return getBlackPlayer();
    }

    public int getActivePlayerCondition() {
        if (!turnWhite) {
            return getBlackPlayerCondition();
        }
        return getWhitePlayerCondition();
    }

    public int getWaitingPlayerCondition() {
        if (!turnWhite) {
            return getWhitePlayerCondition();
        }
        return getBlackPlayerCondition();
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
        if ((player.getColor() == BLACK) && (to == WHITE_OUT)) {
            change = new ChipsCounter(this);
        } else if ((player.getColor() == WHITE) && (to == BLACK_OUT)) {
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
        if (to > BLACK_OUT) {
            to = BLACK_OUT;
        } else if (to < WHITE_OUT) {
            to = WHITE_OUT;
        }
        return to;
    }
}



