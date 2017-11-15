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

    private static final int WHITE_DIRECTION = 1;
    private static final int BLACK_DIRECTION = -1;
    private static final int waiting_turn = 0;  // ожидание хода
    private static final int waiting_throw_dice = 1; // ожидание броска кубика
    private static final int waiting_move_chip = 2; // ожидание перемещения фишки
    private static final int the_final = 3; // конец игры
    private boolean turnWhite = false;  // если true - ход белых, иначе - ход черных
    private boolean cantMove = false; // флаг от клиента, что есть ходы, когда true - changeTurn

    /* Игровые состояния */
    public int whitePlayerCondition = waiting_turn; // в начале игры оба игрока ожидают ход
    public int blackPlayerCondition = waiting_turn; // в начале игры оба игрока ожидают ход
    private int countMove = 1; // переменная для количества ходов
    GameBoard table = new GameBoard();
    int numberOfPlayers = 0;
    Player whitePlayer;

    //    TODO: геттер для терна (чей ход) (бул тип) 1 - ход, 0 - ожидание своего хода.
    Player blackPlayer;

    public int getCountMove() {
        return countMove;
    }

    //TODO (Michael) подумать, как лучше назвать этот класс !!

    //TODO (Michael) Логика, кто белый, а кто черный, должна быть организована здесь. !!
    //TODO (Michael) Логика, чей ход - тоже  здесь. !!
    //TODO (Michael) Логика, можно ли сейчас бросить кубик - тоже. !!
    //TODO (Michael) Значение кубика должно быть тоже здесь. !!
    //TODO (Michael) Оппонет должен запрашиваться отсюда ??

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
        } else {
            if (turnWhite && whitePlayerCondition == waiting_throw_dice) {
                whitePlayerCondition = waiting_move_chip;
            }
            if (!turnWhite && blackPlayerCondition == waiting_throw_dice) {
                blackPlayerCondition = waiting_move_chip;
            }
            result = cubeValue.intValue();
        }
        countMove = 2;
        if (result / 10 == result % 10) { // проверка на дубль
            countMove = 4; //при дубле 4 хода
        }
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
        return new StateChange(this); //TODO Миша, я правильно понял, что такая конструкция вернет чендж содержащий имя
        //активного игрока и его состояние всега равное waiting_throw_dice = 1 (в реалях нашей договоренности это является ожиданием)\
        //хода, ибо ожидания броска кубика нет, мы сразу кидаем кубик, как только сменился ход, ожидания кубика нет в принципе).
    }

    public void setTable(GameBoard table) { //TODO: нужен ли нам этот метод? нигде не используется
        this.table = table;
    }

    public Change moveChip (boolean cantMove) {
        Change change = null;
        if (cantMove) { // проверяем, пришел ли флаг, что нельзя ходить
            this.countMove = 0;
            change = changeTurn();
        }
        return change;
    }

    public Change moveChip(Player player, MoveAction move) throws GameError {
        if (turnWhite && whitePlayerCondition != waiting_move_chip) {
            throw UNABLE_TURN;
        }
        if (!turnWhite && blackPlayerCondition != waiting_move_chip) {
            throw UNABLE_TURN;
        }
        Change change = null;

        if (getActivePlayer() == player) {
            if (countMove > 0) {
                table.moveChip(move.from, move.to, player.color);
                countMove--;
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
            }//else{
            //было   change = changeTurn(); зайдем только при countMove==0, а это уже третий вызов
            //}
            if ((countMove == 0) && (change == null)) { //елси не равно null значит конец игры и менять ход не имеет смысла
                change = changeTurn();
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
            turnWhite = true; //флаг хода переключается на белого игрока
            whitePlayerCondition = waiting_throw_dice; // после входа второго игрока, состояние для белого игрока меняется на ожидание броска кубика.
        }
        player.setColor(color);
        numberOfPlayers++;
    }

    public int getNumberOfPlayers() {
        return numberOfPlayers;
    }

    public void setNumberOfPlayers(int numberOfPlayers) {
        this.numberOfPlayers = numberOfPlayers;
    } //TODO: этот метод нужен? нигде не используется

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
        Cell[] cells = this.table.getCells();
        isPosibleCubeValues = checkBar(color, cubeValues, cells, direction);
        if (isPosibleCubeValues) {
            for (int from = 0; from < cells.length; from++) {
                if ((color == cells[from].getColor())) {
                    int cube1 = cubeValues / 10;
                    int cube2 = cubeValues % 10;
                    if (cube1 == cube2) {
                        int cubeValue;
                        for (int j = 1; j < 5; j++) {
                            cubeValue = cube1 * j;
                            int secondPosition = from + direction * cubeValue;
                            tryAdd(secondPosition, color, cells, endGameFlag, arrayList, from, cubeValue);
                        }
                    } else {
                        int cubeValue = cube1;
                        int to = from + direction * cubeValue;
                        tryAdd(to, color, cells, endGameFlag, arrayList, from, cubeValue);
                        cubeValue = cube2;
                        to = from + direction * cubeValue;
                        tryAdd(to, color, cells, endGameFlag, arrayList, from, cubeValue);
                        cubeValue = cube1 + cube2;
                        to = from + direction * cubeValue;
                        tryAdd(to, color, cells, endGameFlag, arrayList, from, cubeValue);
                    }
                }
            }
        }
        if (arrayList.size() == 0) {
            countMove = 0;
        }

        return arrayList;
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
     * @param cubeValues
     * @param cells
     * @param direction
     * @return false - если нет возможности сходить фишкой на баре, true - есть возможность сходить или
     * нет фишек на баре.
     */
    public boolean checkBar(char color, int cubeValues, Cell[] cells, int direction) {
        boolean result = false;
        int from;
        char oppositeColor;
        if (color == WHITE) {
            from = WHITE_OUT;
            oppositeColor = BLACK;
        } else {
            from = BLACK_OUT;
            oppositeColor = WHITE;
        }
        if (cells[from].getCount() != 0) {
            int cube1 = cubeValues / 10;
            int cube2 = cubeValues % 10;
            if (cube2 == cube1) {
                for (int i = 1; i < 5; i++) {
                    int to = from + direction * cube1 * i;
                    result = isCorrectTurn(to, oppositeColor, cells);
                    if (result) {
                        break;
                    }
                }
            } else {
                int to = from + direction * cube1;
                result = isCorrectTurn(to, oppositeColor, cells);
                to = from + direction * cubeValues & 10;
                if (!result) {
                    result = isCorrectTurn(to, oppositeColor, cells);
                }
                to = from + direction * (cube1 + cube2);
                if (!result) {
                    result = isCorrectTurn(to, oppositeColor, cells);
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
     * @param to
     * @param color
     * @param cells
     * @param endGameFlag
     * @return true - возможно, false - невозможно.
     */
    private boolean isCorrectTurn(int to, char color, Cell[] cells, int endGameFlag) { //TODO <=
        boolean result = false;
        if (((to) <= BLACK_OUT + endGameFlag) &&
                ((to >= WHITE_OUT - endGameFlag))) {
            result = isCorrectTurn(to, color, cells);
        }
        return result;
    }

    /**
     * Проверка на возможность хода
     *
     * @param to
     * @param color
     * @param cells
     * @return true - возможно, false - невозможно.
     */
    private boolean isCorrectTurn(int to, char color, Cell[] cells) {
        boolean result = false;
        if (cells[to].getColor() == color) {
            result = true;
        } else if (cells[to].getColor() == NULL) {
            result = true;
        } else if (cells[to].getCount() == 1) {
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


    public Player getActivePlayer() { // это должна быть проверка на активного игрока, проверить верно ли сделано!!!!
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
}



