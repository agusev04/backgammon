import game.gameobjects.Cell;
import game.logics.GameError;
import game.logics.GameMatch;
import game.logics.Player;
import server.transport.AbstractMessage;
import server.transport.PackageMessage;
import support.AbstractTest;


public class PlayerCantMove extends AbstractTest {

    private static final String WHITE = "0";
    private static final String BLACK = "1";

    public void testPlayerCantMove() throws Exception, GameError {

        /* тест проверяющий, что игрок НЕ МОЖЕТ сходить и пропускает ход */
        PackageMessage packageMessage = enter("0", "Tom");
        Player whitePlayer = getPlayers().get(0);
        GameMatch gameMatch = whitePlayer.getGameMatch();
        PackageMessage packageMessage1 = enter("1", "Sam");
        Player blackPlayer = getPlayers().get(1);

        gameMatch.getTable().cells[1].setCell(Cell.NULL,0);
        gameMatch.getTable().cells[6].setCell(Cell.NULL,0);
        gameMatch.getTable().cells[8].setCell(Cell.NULL,0);
        gameMatch.getTable().cells[12].setCell(Cell.NULL,0);
        gameMatch.getTable().cells[13].setCell(Cell.NULL,0);
        gameMatch.getTable().cells[17].setCell(Cell.NULL,0);
        gameMatch.getTable().cells[19].setCell(Cell.NULL,0);
        gameMatch.getTable().cells[24].setCell(Cell.NULL,0);

        gameMatch.getTable().cells[12].setCell(Cell.WHITE,2);
        gameMatch.getTable().cells[13].setCell(Cell.BLACK,2);


        assertTrue(gameMatch.isTurnWhite()); // ходит ли белый, после входа в игру черного

        //TODO (Michael) Поправить согласо последнему замечанию в BACKGAMMON-63
        AbstractMessage response = throwCube(WHITE, 11);
        assertEquals(gameMatch.getActivePlayer().getName(), gameMatch.getBlackPlayer().getName());
        assertFalse(gameMatch.isTurnWhite()); // ходит ли белый, после броска кубика

/*        checkWhitePositions(gameMatch,
                new ChipsPosition(12, 2));
        checkBlackPositions(gameMatch,
                new ChipsPosition(13, 2));
        checkPossibleMoves(response,
                new Move(1, 2),
                new Move(17, 18),
                new Move(19, 20),
                new Move(1, 3),
                new Move(12, 14),
                new Move(17, 19),
                new Move(19, 21)
        );*/

        moveChip(WHITE, 11, 1);

    }
}