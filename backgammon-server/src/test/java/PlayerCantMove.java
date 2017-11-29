import game.gameobjects.Cell;
import game.gameobjects.GameBoard;
import game.logics.GameError;
import game.logics.GameMatch;
import game.logics.Player;
import server.transport.PackageMessage;
import support.AbstractTest;

import static game.gameobjects.Cell.WHITE;


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

        throwCube(WHITE, 11);
        assertEquals(gameMatch.getActivePlayer().getName(), gameMatch.getBlackPlayer().getName());
        assertFalse(gameMatch.isTurnWhite()); // ходит ли белый, после броска кубика
        moveChip(WHITE, 11, 1);

    }
}