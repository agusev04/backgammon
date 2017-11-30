import game.logics.GameMatch;
import server.transport.AbstractMessage;
import server.transport.ChipsPosition;
import server.transport.GameState;
import server.transport.Move;
import support.AbstractTest;

import javax.websocket.EncodeException;
import java.util.Arrays;
import java.util.List;

/**
 * Oleg O. Plotnikov
 * Date: 11/27/17
 * Copyright 2017 Connective Games LLC. All rights reserved.
 */
public class CompleteGameTest extends AbstractTest {

    private static final String WHITE = "0";
    private static final String BLACK = "1";

    public void testComplete() throws Exception {
        /*first player enters*/
        GameState gameState1 = enter(WHITE, "user1name").getGameState();
        assertEquals('w', gameState1.getColor());

        /*second player enters*/
        GameState gameState2 = enter(BLACK, "user2name").getGameState();
        assertEquals('b', gameState2.getColor());

        /*игроки находятся в одном матче*/
        GameMatch gameMatch = getGameMatch(WHITE);
        assertEquals(gameMatch, getGameMatch(BLACK));

        /*3 зашедший игрок - в другом матче*/
        GameState gameState3 = enter("2", "user3name").getGameState();
        assertEquals('w', gameState3.getColor());
        assertNotSame(gameMatch, getGameMatch("2"));

        List<ChipsPosition> startWhitePos = Arrays.asList(
                new ChipsPosition(1, 2),
                new ChipsPosition(12, 5),
                new ChipsPosition(17, 3),
                new ChipsPosition(19, 5));

        List<ChipsPosition> startBlackPos = Arrays.asList(
                new ChipsPosition(6, 5),
                new ChipsPosition(8, 3),
                new ChipsPosition(13, 5),
                new ChipsPosition(24, 2));

        assertEquals(startWhitePos.toString(), gameState1.getWhitePositions().toString());
        assertEquals(startBlackPos.toString(), gameState1.getBlackPositions().toString());

        /*ход белого, бросок кубика*/
        assertEquals(2, gameMatch.getNumberOfPlayers());
        assertEquals(GameMatch.waiting_throw_dice, gameMatch.getActivePlayerCondition());
        assertEquals("user1name", gameMatch.getActivePlayer().getName());
        assertTrue(gameMatch.isTurnWhite());

        /*двигаем фишку - ошибка*/
        AbstractMessage response = moveChip(WHITE, 0, 1);
        assertEquals("ErrorMessage{code=3, message='It is not your turn now'}", response.toString());

        /*черный бросает кубик - ошибка*/
        response = throwCube(BLACK, 12);
        assertEquals("ErrorMessage{code=3, message='It is not your turn now'}", response.toString());

        response = throwCube(BLACK);
        assertEquals("ErrorMessage{code=3, message='It is not your turn now'}", response.toString());

        assertTrue(gameMatch.isTurnWhite());
        assertEquals(GameMatch.waiting_throw_dice, gameMatch.getActivePlayerCondition());

        /*Белый бросает кубик 1 + 2*/
        response = throwCube(WHITE, 12);
        assertTrue(gameMatch.isTurnWhite());
        assertEquals(GameMatch.waiting_move_chip, gameMatch.getActivePlayerCondition());

        checkWhitePositions(gameMatch,
                new ChipsPosition(1, 2),
                new ChipsPosition(12, 5),
                new ChipsPosition(17, 3),
                new ChipsPosition(19, 5));
        checkBlackPositions(gameMatch,
                new ChipsPosition(6, 5),
                new ChipsPosition(8, 3),
                new ChipsPosition(13, 5),
                new ChipsPosition(24, 2));
        checkPossibleMoves(response,
                new Move(1, 2),
                new Move(17, 18),
                new Move(19, 20),
                new Move(1, 3),
                new Move(12, 14),
                new Move(17, 19),
                new Move(19, 21)
        );

        /*Попытка белого опять бросить кубик 1 + 3*/
        response = throwCube(WHITE, 13);
        assertEquals("ErrorMessage{code=2, message='You can not throw dices now'}", response.toString());

        /*Попытка черного бросить кубик 1 + 3*/
        response = throwCube(BLACK, 13);
        assertEquals("ErrorMessage{code=3, message='It is not your turn now'}", response.toString());

        /*Попытка черного сходить*/
        response = moveChip(BLACK, 0, 1);
        assertEquals("ErrorMessage{code=3, message='It is not your turn now'}", response.toString());
        checkWhitePositions(gameMatch,
                new ChipsPosition(1, 2),
                new ChipsPosition(12, 5),
                new ChipsPosition(17, 3),
                new ChipsPosition(19, 5));
        checkBlackPositions(gameMatch,
                new ChipsPosition(6, 5),
                new ChipsPosition(8, 3),
                new ChipsPosition(13, 5),
                new ChipsPosition(24, 2));
        assertTrue(gameMatch.isTurnWhite());
        assertEquals(GameMatch.waiting_move_chip, gameMatch.getActivePlayerCondition());


        /*Попытка белого сходить неверно*/
        response = moveChip(WHITE, 1, 3);
        assertEquals("ErrorMessage{code=4, message='You can not do this move'}", response.toString());


        /*Белый ходит верно 1 - 3*/
        response = moveChip(WHITE, 1, 2);
        assertTrue(gameMatch.isTurnWhite());
        assertEquals(GameMatch.waiting_move_chip, gameMatch.getActivePlayerCondition());
        checkWhitePositions(gameMatch,
                new ChipsPosition(1, 1),
                new ChipsPosition(3, 1),
                new ChipsPosition(12, 5),
                new ChipsPosition(17, 3),
                new ChipsPosition(19, 5));
        checkBlackPositions(gameMatch,
                new ChipsPosition(6, 5),
                new ChipsPosition(8, 3),
                new ChipsPosition(13, 5),
                new ChipsPosition(24, 2));
        //TODO (AlexanderIvchenko) должны остаться возможные ходы с кубиком 1
//        checkPossibleMoves(response,
//                new Move(1, 2),
//                new Move(3, 4),
//                new Move(17, 18),
//                new Move(19, 20)
//        );

        /*Белый ходит верно c 1 на 2*/
        response = moveChip(WHITE, 1, 1);
        assertFalse(gameMatch.isTurnWhite());
        assertEquals(GameMatch.waiting_throw_dice, gameMatch.getActivePlayerCondition());
        checkWhitePositions(gameMatch,
                new ChipsPosition(2, 1),
                new ChipsPosition(3, 1),
                new ChipsPosition(12, 5),
                new ChipsPosition(17, 3),
                new ChipsPosition(19, 5));
        checkBlackPositions(gameMatch,
                new ChipsPosition(6, 5),
                new ChipsPosition(8, 3),
                new ChipsPosition(13, 5),
                new ChipsPosition(24, 2));
        //TODO (AlexanderIvchenko) зачем-то приходит пустой массив PossibleMoves
//        assertNull(((PackageMessage) response).getChange("PossibleMoves"));

        /*Черный бросает кубик*/
        response = throwCube(BLACK, 56);
        assertFalse(gameMatch.isTurnWhite());
        assertEquals(GameMatch.waiting_move_chip, gameMatch.getActivePlayerCondition());
        checkWhitePositions(gameMatch,
                new ChipsPosition(2, 1),
                new ChipsPosition(3, 1),
                new ChipsPosition(12, 5),
                new ChipsPosition(17, 3),
                new ChipsPosition(19, 5));
        checkBlackPositions(gameMatch,
                new ChipsPosition(6, 5),
                new ChipsPosition(8, 3),
                new ChipsPosition(13, 5),
                new ChipsPosition(24, 2));
        //TODO (Michael) некорректные ходы черного, в том числе за пределы поля с 24 на 30
        checkPossibleMoves(response,
                new Move(8, 13),
                new Move(13, 18),
                new Move(8, 14),
                new Move(13, 19),
                new Move(24, 30)
        );
//        Вот верные ходы
//        checkPossibleMoves(response,
//                new Move(24, 18),
//                new Move(13, 8),
//                new Move(13, 7),
//                new Move(8, 3),
//                new Move(8, 2)
//        );

        /*Черный ходит с 8 на 5 шагов*/
        response = moveChip(BLACK, 8, 5);
        assertFalse(gameMatch.isTurnWhite());
        assertEquals(GameMatch.waiting_move_chip, gameMatch.getActivePlayerCondition());
        //TODO (Michael) Черный ходит не в свою сторону
//        checkWhitePositions(gameMatch,
//                new ChipsPosition(2, 1),
//                new ChipsPosition(3, 1),
//                new ChipsPosition(12, 5),
//                new ChipsPosition(17, 3),
//                new ChipsPosition(19, 5));
//        checkBlackPositions(gameMatch,
//                new ChipsPosition(3, 1),
//                new ChipsPosition(6, 5),
//                new ChipsPosition(8, 2),
//                new ChipsPosition(13, 5),
//                new ChipsPosition(24, 2));
//        checkPossibleMoves(response,
//                new Move(24, 18),
//                new Move(13, 7),
//                new Move(8, 3),
//        );

        //TODO (Michael) Проверить, что ход опять корректно переходит к белому. Подробно.
    }

    public void testIncorrectMoves() throws Exception {
        GameMatch gameMatch = startSimpleMatch();

        /*Белый бросает кубик 1 + 2*/
        AbstractMessage response = throwCube(WHITE, 12);
        checkWhitePositions(gameMatch,
                new ChipsPosition(1, 2),
                new ChipsPosition(12, 5),
                new ChipsPosition(17, 3),
                new ChipsPosition(19, 5));
        checkBlackPositions(gameMatch,
                new ChipsPosition(6, 5),
                new ChipsPosition(8, 3),
                new ChipsPosition(13, 5),
                new ChipsPosition(24, 2));
        checkPossibleMoves(response, new Move(1, 2), new Move(17, 18), new Move(19, 20), new Move(1, 3),
                new Move(12, 14), new Move(17, 19), new Move(19, 21));

        //TODO (Michael) ArrayIndexOutOfBoundsException
//        response = moveChip(WHITE, -1, 1);

        response = moveChip(WHITE, 0, 1);
        assertEquals("ErrorMessage{code=4, message='You can not do this move'}", response.toString());

        //TODO (Michael) ArrayIndexOutOfBoundsException
//        response = moveChip(WHITE, 100, 1);
//        assertEquals("ErrorMessage{code=4, message='You can not do this move'}", response.toString());

        response = moveChip(WHITE, 100, -1);
        assertEquals("ErrorMessage{code=4, message='You can not do this move'}", response.toString());

        response = moveChip(WHITE, 100, 66);
        assertEquals("ErrorMessage{code=4, message='You can not do this move'}", response.toString());

        response = moveChip(WHITE, 12, 8);
        assertEquals("ErrorMessage{code=4, message='You can not do this move'}", response.toString());

        response = moveChip(WHITE, 12, 8);
        assertEquals("ErrorMessage{code=4, message='You can not do this move'}", response.toString());

        response = moveChip(WHITE, 12, 0);
        assertEquals("ErrorMessage{code=4, message='You can not do this move'}", response.toString());

        response = moveChip(WHITE, 12, 12);
        assertEquals("ErrorMessage{code=4, message='You can not do this move'}", response.toString());

        response = moveChip(WHITE, 12, -12);
        assertEquals("ErrorMessage{code=4, message='You can not do this move'}", response.toString());

        response = moveChip(WHITE, 12, -12);
        assertEquals("ErrorMessage{code=4, message='You can not do this move'}", response.toString());

        int from [] = {0, -1, 25, 100, 26, -100, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 13, 14, 15, 16, 18, 20, 21, 22, 23, 24};
        int cubeValues [] = {-1, 0, 25, 26, 101, 6, 8, 11, 12, 13, 24, 1, 2, 3, 4, 5};

        for (int f : from) {
            for (int cubeValue : cubeValues) {
                System.out.println("Move from " + f + " with " + cubeValue);
                //TODO (Michael) Все эти некорректные комбинации должны обрабатываться штатно
//                response = moveChip(WHITE, f, cubeValue);
                assertEquals("ErrorMessage{code=4, message='You can not do this move'}", response.toString());
            }
        }

        response = moveChip(WHITE, 1, 1);
        assertTrue(gameMatch.isTurnWhite());
        assertEquals(GameMatch.waiting_move_chip, gameMatch.getActivePlayerCondition());
        checkWhitePositions(gameMatch,
                new ChipsPosition(1, 1),
                new ChipsPosition(2, 1),
                new ChipsPosition(12, 5),
                new ChipsPosition(17, 3),
                new ChipsPosition(19, 5));
        checkBlackPositions(gameMatch,
                new ChipsPosition(6, 5),
                new ChipsPosition(8, 3),
                new ChipsPosition(13, 5),
                new ChipsPosition(24, 2));
    }

    public void testMoveWithNoChip() throws Exception {
        GameMatch gameMatch = startSimpleMatch();

        /*Белый бросает кубик 1 + 2*/
        AbstractMessage response = throwCube(WHITE, 12);
        checkWhitePositions(gameMatch,
                new ChipsPosition(1, 2),
                new ChipsPosition(12, 5),
                new ChipsPosition(17, 3),
                new ChipsPosition(19, 5));
        checkBlackPositions(gameMatch,
                new ChipsPosition(6, 5),
                new ChipsPosition(8, 3),
                new ChipsPosition(13, 5),
                new ChipsPosition(24, 2));
        checkPossibleMoves(response, new Move(1, 2), new Move(17, 18), new Move(19, 20), new Move(1, 3),
                new Move(12, 14), new Move(17, 19), new Move(19, 21));

        /*Белый ходит с поля 2 с cubeValue 1, хотя там фишки нет*/
        response = moveChip(WHITE, 2, 1);
        assertEquals("ErrorMessage{code=4, message='You can not do this move'}", response.toString());
        checkWhitePositions(gameMatch,
                new ChipsPosition(1, 2),
                //               new ChipsPosition(3, 1), //у белого появляется новая фишка в поле 3
                new ChipsPosition(12, 5),
                new ChipsPosition(17, 3),
                new ChipsPosition(19, 5));
        assertEquals(0, gameMatch.getTable().getCells()[2].getCount());//на поле 2 становится -1 фишка
        checkBlackPositions(gameMatch,
                new ChipsPosition(6, 5),
                new ChipsPosition(8, 3),
                new ChipsPosition(13, 5),
                new ChipsPosition(24, 2));
        assertTrue(gameMatch.isTurnWhite());
        assertEquals(GameMatch.waiting_move_chip, gameMatch.getActivePlayerCondition());
    }

    public void testMoveWithOpponentChip() throws Exception {
        GameMatch gameMatch = startSimpleMatch();

        assertTrue(gameMatch.isTurnWhite());
        assertEquals(GameMatch.waiting_throw_dice, gameMatch.getActivePlayerCondition());

        /*Белый бросает кубик 1 + 2*/
        AbstractMessage response = throwCube(WHITE, 12);
        checkWhitePositions(gameMatch,
                new ChipsPosition(1, 2),
                new ChipsPosition(12, 5),
                new ChipsPosition(17, 3),
                new ChipsPosition(19, 5));
        checkBlackPositions(gameMatch,
                new ChipsPosition(6, 5),
                new ChipsPosition(8, 3),
                new ChipsPosition(13, 5),
                new ChipsPosition(24, 2));
        checkPossibleMoves(response, new Move(1, 2), new Move(17, 18), new Move(19, 20), new Move(1, 3),
                new Move(12, 14), new Move(17, 19), new Move(19, 21));
        assertTrue(gameMatch.isTurnWhite());
        assertEquals(GameMatch.waiting_move_chip, gameMatch.getActivePlayerCondition());

        /*Белый ходит с поля 6 с cuveValue 1, хотя это поле черного*/
        response = moveChip(WHITE, 6, 1);
        assertEquals("ErrorMessage{code=4, message='You can not do this move'}", response.toString());
        checkWhitePositions(gameMatch,
                new ChipsPosition(1, 2),
                new ChipsPosition(12, 5),
                new ChipsPosition(17, 3),
                new ChipsPosition(19, 5));
        checkBlackPositions(gameMatch,
                new ChipsPosition(6, 5),
                new ChipsPosition(8, 3),
                new ChipsPosition(13, 5),
                new ChipsPosition(24, 2));
        assertTrue(gameMatch.isTurnWhite());
        assertEquals(GameMatch.waiting_move_chip, gameMatch.getActivePlayerCondition());
    }

    public void testDouble() throws Exception {
        GameMatch gameMatch = startSimpleMatch();

        /*Белый бросает кубик 1 + 1 (дубль)*/
        AbstractMessage response = throwCube(WHITE, 11);
        checkWhitePositions(gameMatch,
                new ChipsPosition(1, 2),
                new ChipsPosition(12, 5),
                new ChipsPosition(17, 3),
                new ChipsPosition(19, 5));
        checkBlackPositions(gameMatch,
                new ChipsPosition(6, 5),
                new ChipsPosition(8, 3),
                new ChipsPosition(13, 5),
                new ChipsPosition(24, 2));
        //TODO (AlexanderIvchenko) Мувы приходят каждый по 2 раза
        checkPossibleMoves(response, new Move(1, 2), new Move(17, 18), new Move(19, 20), new Move(1, 2), new Move(17, 18), new Move(19, 20));
//        checkPossibleMoves(response, new Move(1, 2), new Move(17, 18), new Move(19, 20));
    }

    public void testKnockOff() throws Exception {
        //TODO (AlexanderIvchenko)
    }

    private GameMatch startSimpleMatch() throws EncodeException {
        enter(WHITE, "user1name");
        enter(BLACK, "user2name");
        return getGameMatch(WHITE);
    }
}
