import game.gameobjects.Cell;
import game.gameobjects.GameBoard;
import game.logics.ChipsPositions;
import game.logics.GameMatch;
import server.transport.*;
import support.AbstractTest;

import javax.websocket.EncodeException;
import java.util.*;
import java.util.function.Function;
import java.util.stream.Collectors;

/**
 * Oleg O. Plotnikov
 * Date: 11/30/17
 * Copyright 2017 Connective Games LLC. All rights reserved.
 */
public class AutomaticGameTest extends AbstractTest {

    private static final String WHITE = "0";
    private static final String BLACK = "1";

    private GameMatch startSimpleMatch() throws EncodeException {
        enter(WHITE, "user1name");
        enter(BLACK, "user2name");
        return getGameMatch(WHITE);
    }

    public void testSequence1() throws Exception {
//        List<Integer> testDiceThrowResultsSeq = Arrays.asList(12, 34, 26, 36, 22, 33, 14, 25, 18, 66, 66, 66, 66, 55, 44, 14, 25, 45, 66 );
//        checkSequenceFirst(testDiceThrowResultsSeq);
    }

    private void checkSequenceFirst(List<Integer> testDiceThrowResultsSeq) throws Exception {
        checkSequence(testDiceThrowResultsSeq, moveActions -> moveActions.get(0));
    }

    private void checkSequenceLast(List<Integer> testDiceThrowResultsSeq) throws Exception {
        checkSequence(testDiceThrowResultsSeq, moveActions -> moveActions.get(moveActions.size() - 1));
    }

    private void checkSequenceRandom(List<Integer> testDiceThrowResultsSeq) throws Exception {
        checkSequence(testDiceThrowResultsSeq, moveActions -> moveActions.get(new Random().nextInt(moveActions.size())));
    }

    private void checkSequence(List<Integer> testDiceThrowResultsSeq,
                               Function<List<MoveAction>, MoveAction> moveSelectFunc) throws Exception {
        String testPlayer = WHITE;
        GameBoard testBoard = new GameBoard();
        GameMatch gameMatch = startSimpleMatch();
        boolean gameOver = false;

        int turnNumber = 0;
        do {
            Integer testDiceThrowResult = null;
            if (testDiceThrowResultsSeq != null && testDiceThrowResultsSeq.size() > turnNumber) {
                testDiceThrowResult = testDiceThrowResultsSeq.get(turnNumber);
            }
            turnNumber ++;
            boolean testTurnWhite = WHITE.equals(testPlayer);
            System.out.println();
            System.out.println("__________ Бросок # " + turnNumber + ", белый = " + testTurnWhite + " _____________");

            int testCondition = GameMatch.waiting_throw_dice;

            System.out.println("Проверяем StateChange...");
            assertEquals(testTurnWhite, gameMatch.isTurnWhite());
            assertEquals(testCondition, gameMatch.getActivePlayerCondition());
            System.out.println("ОК");

            System.out.println("Проверяем Доску...");
            checkWhitePositions(testBoard, gameMatch);
            checkBlackPositions(testBoard, gameMatch);
            System.out.println("ОК");

            AbstractMessage response;
            PackageMessage packageMessage;
            if (testDiceThrowResult != null) {
                System.out.println("Игрок бросает кубик, заданный резульат = " + testDiceThrowResult);
                response = throwCube(testPlayer, testDiceThrowResult);
                assertFalse(response instanceof ErrorMessage);
                packageMessage = (PackageMessage) response;
                assertEquals(testDiceThrowResult.intValue(), packageMessage.getChange(CubeValue.class).getCubeValues());
            } else {
                System.out.println("Игрок бросает кубик случайно");
                response = throwCube(testPlayer);
                assertFalse(response instanceof ErrorMessage);
                packageMessage = (PackageMessage) response;
                testDiceThrowResult = packageMessage.getChange(CubeValue.class).getCubeValues();
            }
            System.out.println("ОК");

            List<Integer> testAllCubeUses = new ArrayList<>();
            if (testDiceThrowResult % 11 == 0) {
                testAllCubeUses.addAll(Arrays.asList(testDiceThrowResult / 11, testDiceThrowResult / 11, testDiceThrowResult / 11, testDiceThrowResult / 11));
            } else {
                testAllCubeUses.addAll(Arrays.asList(testDiceThrowResult / 10, testDiceThrowResult % 10));
            }
            System.out.println("Игрок может использовать кости = " + testAllCubeUses);

            StateChange stateChange = packageMessage.getChange(StateChange.class);
            if (stateChange.isTurnSkipped()) {
                System.out.println("Произошел пропуск всех ходов ");
                List<MoveAction> allMoves = getAllMoves(testBoard, testTurnWhite, testAllCubeUses);
                //todo olegus remove comment after 63 fix
                testCondition = GameMatch.waiting_move_chip; //temporary
//                assertTrue(allMoves.isEmpty());
            } else {
                testCondition = GameMatch.waiting_move_chip;
            }


            while (gameMatch.getActivePlayerCondition() == GameMatch.waiting_move_chip) {
                System.out.println();
                System.out.println("_______Ход игрока, белый = " + testTurnWhite + ", игрок может использовать = " + testAllCubeUses);
                PossibleMoves possibleMoves = packageMessage.getChange(PossibleMoves.class);
                assertNotNull(possibleMoves);
                assertFalse(possibleMoves.getPossibleMoves().isEmpty());
                Final aFinal = packageMessage.getChange(Final.class);
                if (aFinal != null) {
                    System.out.println("!!Игра закончена!!");
                    gameOver = true;
                    break;
                }

                System.out.println("Проверяем StateChange...");
                assertEquals(testTurnWhite, gameMatch.isTurnWhite());
                assertEquals(testCondition, gameMatch.getActivePlayerCondition());
                System.out.println("ОК");

                List<MoveAction> testAllMoves = getAllMoves(testBoard, testTurnWhite, testAllCubeUses);

                System.out.println("Проверяем PossibleMoves...");
                assertFalse(testAllMoves.isEmpty());
                ArrayList<Move> possibleMovesSortedForComparison = possibleMoves.getPossibleMoves();
//                possibleMovesSortedForComparison.sort(Comparator.comparingInt(o -> (o.from * 100 + direction * o.to)));
                possibleMovesSortedForComparison.sort(Comparator.comparingInt(o -> (o.from * 100 + getDir(testTurnWhite) * o.to)));

//                assertEquals(testAllMoves.stream()
//                                .map(moveAction -> new Move(moveAction.from, calcTo(testTurnWhite, moveAction)))
//                                .collect(Collectors.toList()).toString(),
//                        possibleMovesSortedForComparison.toString());
//
                System.out.println("ОК!!, ходы = " + possibleMoves.getPossibleMoves().toString());

                //Select a move
                MoveAction testSelectedMove = moveSelectFunc.apply(testAllMoves);
                System.out.println("Игрок ходит = " + testSelectedMove);
                response = moveChip(testPlayer, testSelectedMove.from, testSelectedMove.cubeValue);
                assertFalse(response instanceof ErrorMessage);
                packageMessage = (PackageMessage) response;
                System.out.println("ОК");

                ///////todo MOVE
                //todo go out of field
                testBoard.getCells()[testSelectedMove.from].takeChip();
                int testTo = calcTo(testTurnWhite, testSelectedMove);
                if (testBoard.getCells()[testTo].getColor() == getColor(testTurnWhite)) { /*на свою*/
                    testBoard.getCells()[testTo].inc();
                } else { /*на пустую или чужую*/
                    if (testBoard.getCells()[testTo].getColor() == getColor(!testTurnWhite)) {//чужая
                        Cell enemyBarCell = testBoard.getCells()[getBarIndex(!testTurnWhite)];
                        enemyBarCell.inc();
                        enemyBarCell.setColor(getColor(!testTurnWhite));
                    }
                    testBoard.getCells()[testTo].setCell(getColor(testTurnWhite), 1);
                }
                testAllCubeUses.remove((Integer) testSelectedMove.cubeValue);

                System.out.println("Проверяем Доску...");
                checkWhitePositions(testBoard, gameMatch);
                checkBlackPositions(testBoard, gameMatch);
                System.out.println("ОК");
            }

            if (!testAllCubeUses.isEmpty()) {
                System.out.println("Произошел пропуск части ходов = " + testAllCubeUses);
            }
            /*change turn*/
            testPlayer = WHITE.equals(testPlayer) ? BLACK : WHITE;
        } while (!gameOver);
    }

    private int calcTo(boolean testTurnWhite, MoveAction testMove) {
        return testMove.from + getDir(testTurnWhite) * testMove.cubeValue;
    }

    private List<MoveAction> getAllMoves(GameBoard testBoard, boolean testTurnWhite, List<Integer> testAllCubeUses) {
        List<ChipsPosition> testPlayerPos;
        Integer barIndex = getBarIndex(testTurnWhite);
        int chipsInBar = testBoard.getCells()[barIndex].getCount();
        final boolean allAtHome ;
        if (testBoard.getCells()[barIndex].getCount() > 0) {
            System.out.println("___Вывод с бара, игрок белый= " + testTurnWhite);
            testPlayerPos = Collections.singletonList(new ChipsPosition(barIndex, chipsInBar));
            allAtHome = false;
        } else {
            testPlayerPos = testTurnWhite ? testBoard.getGameState().getWhitePos() : testBoard.getGameState().getBlackPos();
            allAtHome = testPlayerPos.stream()
                    .allMatch(chipsPosition -> (getDir(testTurnWhite) * (chipsPosition.getPosition() - getHomeIndex(testTurnWhite))) >= 0);
            if (allAtHome) {
                System.out.println("___ВСЕ ФИШКИ В ДОМЕ, игрок белый = " + testTurnWhite);
            }
        }

        List<ChipsPosition> testEnemyPos = testTurnWhite ? testBoard.getGameState().getBlackPos() : testBoard.getGameState().getWhitePos();

        return testPlayerPos
                .stream().map(ChipsPosition::getPosition)
                .flatMap(from -> (new HashSet<>(testAllCubeUses)).stream().map(aCubeUse -> new MoveAction(from, aCubeUse))) //для каждой фишки каждый кубик
                .filter(move ->
                        testEnemyPos.stream()
                                .filter(enemyPosition -> (enemyPosition.getQuantity() > 1)) //для позиций противника, где стоит больше одной фишки
                                .noneMatch(chipsPosition -> chipsPosition.getPosition() == calcTo(testTurnWhite, move))) //нет ни одной такой позиции в месте, куда придем
                .filter(move -> allAtHome || !isGoingOut(calcTo(testTurnWhite, move)))
                .collect(Collectors.toList());
    }

    private char getColor(boolean testTurnWhite) {
        return testTurnWhite ? Cell.WHITE : Cell.BLACK;
    }

    private int getDir(boolean testTurnWhite) {
        return testTurnWhite ? 1 : -1;
    }

    private int getBarIndex(boolean testTurnWhite) {
        return testTurnWhite ? GameBoard.WHITE_BAR : GameBoard.BLACK_BAR;
    }

    private int getHomeIndex(boolean testTurnWhite) {
        return testTurnWhite ? GameBoard.WHITE_HOME : GameBoard.BLACK_HOME;
    }

    private boolean isGoingOut(int to) {
        return to >= GameBoard.BLACK_BAR || to <= GameBoard.WHITE_BAR;
    }

    private void checkWhitePositions(GameBoard testBoard, GameMatch gameMatch) {
        ChipsPositions actualPositions = gameMatch.getTable().getGameState();
        System.out.println("Белые = " + actualPositions.getWhitePos().toString());
        assertEquals(testBoard.getGameState().getWhitePos().toString(), actualPositions.getWhitePos().toString());
    }

    private void checkBlackPositions(GameBoard testBoard, GameMatch gameMatch) {
        ChipsPositions actualPositions = gameMatch.getTable().getGameState();
        System.out.println("Черные = " + actualPositions.getBlackPos().toString());
        assertEquals(testBoard.getGameState().getBlackPos().toString(), actualPositions.getBlackPos().toString());
    }
}
