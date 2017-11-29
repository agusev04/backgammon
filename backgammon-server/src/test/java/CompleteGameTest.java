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

    public void testEnter() throws Exception {
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
        AbstractMessage response = moveChip(WHITE, 0,  1);
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
        //TODO (Michael) Должна быть ошибка "You can not throw dices now" !!
//        assertEquals("ErrorMessage{code=3, message='It is not your turn now'}", response.toString());
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
        //TODO (Michael) Белый может сходить неверно!!
        response = moveChip(WHITE, 1, 3);
        assertEquals("ErrorMessage{code=4, message='You can not do this move'}", response.toString());

        /*Белый ходит верно 1 - 3*/
        response = moveChip(WHITE, 1, 2);
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
//        checkPossibleMoves(response, new Move(1, 2), new Move(3, 4), new Move(17, 18), new Move(19, 20));
        response = moveChip(WHITE, 1, 1);
        assertFalse(gameMatch.isTurnWhite());



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

        //TODO (AlexanderIvchenko) Белый может сходить с пустого поля
        /*Белый ходит с поля 2 с cubeValue 1, хотя там фишки нет*/
        response = moveChip(WHITE, 2, 1);
//        assertEquals("ErrorMessage{code=4, message='You can not do this move'}", response.toString());
        checkWhitePositions(gameMatch,
                new ChipsPosition(1, 2),
                new ChipsPosition(3, 1), //у белого появляется новая фишка в поле 3
                new ChipsPosition(12, 5),
                new ChipsPosition(17, 3),
                new ChipsPosition(19, 5));
        assertEquals(-1, gameMatch.getTable().getCells()[2].getCount());//на поле 2 становится -1 фишка
        checkBlackPositions(gameMatch,
                new ChipsPosition(6, 5),
                new ChipsPosition(8, 3),
                new ChipsPosition(13, 5),
                new ChipsPosition(24, 2));
    }

    public void testMoveWithOpponentChip() throws Exception {
        GameMatch gameMatch = startSimpleMatch();

        assertTrue(gameMatch.isTurnWhite());
        assertEquals(GameMatch.waiting_throw_dice, gameMatch.getActivePlayerCondition());

        //TODO (AlexanderIvchenko) Белый может сходить с чужого поля
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

        /*Белый ходит с поля 6 с cuveValue 1, хотя это поле черного*/
        response = moveChip(WHITE, 6,  1);
        //        assertEquals("ErrorMessage{code=4, message='You can not do this move'}", response.toString());
        checkWhitePositions(gameMatch,
                new ChipsPosition(1, 2),
                new ChipsPosition(7, 1), //у белого появляется новая фишка в поле 7
                new ChipsPosition(12, 5),
                new ChipsPosition(17, 3),
                new ChipsPosition(19, 5));
        checkBlackPositions(gameMatch,
                new ChipsPosition(6, 4),//у черного в поле 6 стало на одну фишку меньше
                new ChipsPosition(8, 3),
                new ChipsPosition(13, 5),
                new ChipsPosition(24, 2));
    }

    private GameMatch startSimpleMatch() throws EncodeException {
        enter(WHITE, "user1name");
        enter(BLACK, "user2name");
        return getGameMatch(WHITE);
    }
}
