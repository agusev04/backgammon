import game.logics.GameError;
import game.logics.GameMatch;
import game.logics.Player;
import server.transport.MoveAction;
import server.transport.PackageMessage;
import support.AbstractTest;

public class PlayerCantMove extends AbstractTest {
    public void testPlayerCantMove() throws Exception, GameError {

        /* тест проверяющий, что игрок НЕ МОЖЕТ сходить и пропускает ход */
        PackageMessage packageMessage = enter("0", "Tom");
        Player whitePlayer = getPlayers().get(0);
        GameMatch gameMatch = whitePlayer.getGameMatch();
        PackageMessage packageMessage1 = enter("1", "Sam");
        Player blackPlayer = getPlayers().get(1);


        assertTrue(gameMatch.isTurnWhite()); // ходит ли белый, после входа в игру черного
        gameMatch.throwDice(whitePlayer, 24);
        assertTrue(gameMatch.isTurnWhite()); // ходит ли белый, после броска кубика
        assertEquals(GameMatch.waiting_move_chip, gameMatch.getActivePlayerCondition()); // сменилось ли состояние

        gameMatch.moveChip(whitePlayer, new MoveAction(true)); // подаем команду, что ходов нету

        assertFalse(gameMatch.isTurnWhite()); // проверяем, передался ли ход черному
        assertEquals(GameMatch.waiting_throw_dice, gameMatch.getActivePlayerCondition()); // сменилось ли состояние у черного
    }
}