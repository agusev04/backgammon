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
        List<Integer> testDiceThrowResultsSeq = Arrays.asList(12, 34, 26, 36, 22, 33, 14, 25, 18, 66, 66, 66, 66, 55,
                44, 14, 25, 45, 66);
        checkSequenceFirst(testDiceThrowResultsSeq);
    }

    public void testSequenceRand() throws Exception {
        checkSequenceRandom(null);
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
        GameBoard testBoard = new GameBoard();
        GameMatch gameMatch = startSimpleMatch();

        int turnNumber = 0;
        boolean gameOver = false;
        String testPlayer = WHITE;
        int testCondition = GameMatch.waiting_throw_dice;

        do {
            Integer testDiceThrowResult = null;
            if (testDiceThrowResultsSeq != null && testDiceThrowResultsSeq.size() > turnNumber) {
                testDiceThrowResult = testDiceThrowResultsSeq.get(turnNumber);
            }
            turnNumber ++;
            boolean testTurnWhite = WHITE.equals(testPlayer);
            System.out.println();
            System.out.println("__________ Бросок # " + turnNumber + ", белый = " + testTurnWhite + " _____________");


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
            System.out.println("Выпали кости = " + testAllCubeUses);
            testCondition = GameMatch.waiting_move_chip;

            do {
                List<MoveAction> allMoves = getAllMoves(testBoard, testTurnWhite, testAllCubeUses);
                if (allMoves.isEmpty()) {
                    System.out.println("Доступных ходов нет, кости " + testAllCubeUses);
                    StateChange stateChange = packageMessage.getChange(StateChange.class);
                    assertTrue(stateChange.isTurnSkipped());
                    testCondition = GameMatch.waiting_throw_dice;
                } else {
                    assertEquals(testCondition, gameMatch.getActivePlayerCondition());

                    System.out.println("Проверяем PossibleMoves...");
                    PossibleMoves possibleMoves = packageMessage.getChange(PossibleMoves.class);
                    ArrayList<Move> possibleMovesSortedForComparison = possibleMoves.getPossibleMoves();
                    assertFalse(possibleMovesSortedForComparison.isEmpty());
                    possibleMovesSortedForComparison.sort(Comparator.comparingInt(o -> (o.from + 100 * o.to)));
                    assertEquals(allMoves.stream()
                                    .map(moveAction -> new Move(moveAction.from,
                                            calcToCrazyHack(calcTo(testTurnWhite, moveAction))))
                                    .sorted(Comparator.comparingInt(o -> (o.from + 100 * o.to)))
                                    .collect(Collectors.toList()).toString(),
                            possibleMovesSortedForComparison.toString());
                    System.out.println("ОК!!, PossibleMoves = " + possibleMoves.getPossibleMoves().toString());

                    //Select a move
                    MoveAction testSelectedMove = moveSelectFunc.apply(allMoves);
                    System.out.println("Игрок ходит = " + testSelectedMove);
                    response = moveChip(testPlayer, testSelectedMove.from, testSelectedMove.cubeValue);
                    assertFalse(response instanceof ErrorMessage);
                    packageMessage = (PackageMessage) response;
                    System.out.println("ОК");

                    //Do the move
                    testBoard.getCells()[testSelectedMove.from].takeChip();
                    int testTo = calcTo(testTurnWhite, testSelectedMove);
                    if (!isGoingOut(testTo)) { /*если фишка идет в пределы поля*/
                        Cell destinationCell = testBoard.getCells()[testTo];
                        char curPlayerColor = getColor(testTurnWhite);
                        if (destinationCell.getColor() == curPlayerColor) { /*на свою*/
                            destinationCell.inc();
                        } else { /*на пустую или чужую*/
                            char enemyColor = getColor(!testTurnWhite);
                            if (destinationCell.getColor() == enemyColor) {//чужая
                                Cell enemyBarCell = testBoard.getCells()[getBarIndex(!testTurnWhite)];
                                enemyBarCell.inc();
                                enemyBarCell.setColor(enemyColor);
                            }
                            destinationCell.setCell(curPlayerColor, 1);
                        }
                    }
                    testAllCubeUses.remove((Integer) testSelectedMove.cubeValue);

                    System.out.println("Проверяем Доску...");
                    ArrayList<ChipsPosition> whitePositions = checkWhitePositions(testBoard, gameMatch);
                    ArrayList<ChipsPosition> blackPositions = checkBlackPositions(testBoard, gameMatch);
                    System.out.println("ОК");

                    if (whitePositions.isEmpty() || blackPositions.isEmpty()) {
                        gameOver = true;
                        System.out.println("!!Игра закончена!!");
                        Final aFinal = packageMessage.getChange(Final.class);
                        assertNotNull(aFinal);
                        break;
                    }
                    if (testAllCubeUses.isEmpty()) {
                        testCondition = GameMatch.waiting_throw_dice;
                        assertEquals(testCondition, gameMatch.getActivePlayerCondition());
                    } else {
                        System.out.println("_______Ход игрока, белый = " + testTurnWhite + ", остались кости = " + testAllCubeUses);
                    }
                }
            } while (testCondition == GameMatch.waiting_move_chip);
            System.out.println("Переход хода");
            testPlayer = WHITE.equals(testPlayer) ? BLACK : WHITE;
        } while (!gameOver);
    }

    private int calcTo(boolean testTurnWhite, MoveAction testMove) {
        return testMove.from + getDir(testTurnWhite) * testMove.cubeValue;
    }

    private int calcToCrazyHack(int normalTo) {
        if (normalTo > GameBoard.BLACK_BAR) {
            return GameBoard.BLACK_BAR;
        } else if (normalTo < GameBoard.WHITE_BAR) {
            return GameBoard.WHITE_BAR;
        }
        return normalTo;
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
                    .allMatch(chipsPosition -> getDir(testTurnWhite) * (chipsPosition.getPosition() - getHomeIndex(testTurnWhite)) >= 0);
            if (allAtHome) {
                System.out.println("___ВСЕ ФИШКИ В ДОМЕ, игрок белый = " + testTurnWhite);
            }
        }
        List<ChipsPosition> testEnemyPos = testTurnWhite ? testBoard.getGameState().getBlackPos() : testBoard.getGameState().getWhitePos();
        testEnemyPos.removeIf(enemyPos -> enemyPos.getPosition() == getBarIndex(!testTurnWhite)); /*remove enemy bar*/

        HashSet<Integer> allCubesSet = new HashSet<>(testAllCubeUses);
        List<MoveAction> allMoves = testPlayerPos
                .stream().map(ChipsPosition::getPosition)
                .flatMap(from -> allCubesSet.stream().map(aCubeUse -> new MoveAction(from, aCubeUse))) //для каждой фишки каждый кубик
                .filter(move ->
                        testEnemyPos.stream()
                                .filter(enemyPosition -> (enemyPosition.getQuantity() > 1)) //для позиций противника, где стоит больше одной фишки
                                .noneMatch(chipsPosition -> chipsPosition.getPosition() == calcTo(testTurnWhite, move))) //нет ни одной такой позиции в месте, куда придем

                .filter(move -> !isGoingOut(calcTo(testTurnWhite, move)) || allAtHome)
                .collect(Collectors.toList());
        if (allAtHome) {
            Map<Integer, List<MoveAction>> moveActionMap = allMoves.stream()
                    .collect(Collectors.groupingBy(move -> move.cubeValue));
            moveActionMap.forEach((key, movesOfSameCube) -> movesOfSameCube.stream()
                    .filter(moveAction -> isGoingOutOverUseDice(calcTo(testTurnWhite, moveAction)) &&
                        testPlayerPos.stream()
                                .map(ChipsPosition::getPosition)
                                .anyMatch(pos -> (getDir(testTurnWhite) * (moveAction.from - pos) > 0)))
                    .forEach(allMoves::remove));
        }
        return allMoves;
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

    private boolean isGoingOutOverUseDice(int to) {
        return to > GameBoard.BLACK_BAR || to < GameBoard.WHITE_BAR;
    }

    private ArrayList<ChipsPosition> checkWhitePositions(GameBoard testBoard, GameMatch gameMatch) {
        ChipsPositions actualPositions = gameMatch.getTable().getGameState();
        System.out.println("Белые = " + actualPositions.getWhitePos().toString());
        ArrayList<ChipsPosition> whitePos = testBoard.getGameState().getWhitePos();
        assertEquals(whitePos.toString(), actualPositions.getWhitePos().toString());
        return whitePos;
    }

    private ArrayList<ChipsPosition> checkBlackPositions(GameBoard testBoard, GameMatch gameMatch) {
        ChipsPositions actualPositions = gameMatch.getTable().getGameState();
        System.out.println("Черные = " + actualPositions.getBlackPos().toString());
        ArrayList<ChipsPosition> blackPos = testBoard.getGameState().getBlackPos();
        assertEquals(blackPos.toString(), actualPositions.getBlackPos().toString());
        return blackPos;
    }
}
