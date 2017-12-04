import game.gameobjects.Cell;
import game.logics.GameError;
import game.logics.GameMatch;
import game.logics.Player;
import server.transport.AbstractMessage;
import server.transport.ChipsPosition;
import server.transport.PackageMessage;
import server.transport.StateChange;
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

        AbstractMessage response = throwCube(WHITE, 11); // белому выпали кости когда он не может ходить
        assertFalse(gameMatch.isTurnSkipped());
        assertEquals(gameMatch.getActivePlayer().getName(), gameMatch.getBlackPlayer().getName());

        assertFalse(gameMatch.isTurnWhite()); // ходит ли белый, после броска кубика
        assertEquals(1, gameMatch.getActivePlayerCondition());

        throwCube(BLACK, 11); // черному выпали кости когда он не может ходить
        assertTrue(gameMatch.isTurnWhite());
        assertEquals(1, gameMatch.getActivePlayerCondition());

        throwCube(WHITE, 11); // белому выпали кости когда он не может ходить
        assertFalse(gameMatch.isTurnWhite());
        assertEquals(1, gameMatch.getActivePlayerCondition());

        throwCube(BLACK,21); // черный начал ходить
        moveChip(BLACK, 13, 2);
        assertFalse(gameMatch.isTurnWhite());// ходит ли черный, после броска кубика
        assertEquals(2, gameMatch.getActivePlayerCondition());

        checkWhitePositions(gameMatch,
                new ChipsPosition(12, 2));

        checkBlackPositions(gameMatch,
                new ChipsPosition(11, 1),
                new ChipsPosition(13, 1));

        moveChip(BLACK, 11, 1);

        checkWhitePositions(gameMatch,
                new ChipsPosition(12, 2));
        checkBlackPositions(gameMatch,
                new ChipsPosition(10, 1),
                new ChipsPosition(13, 1));

        assertTrue(gameMatch.isTurnWhite()); // ходит ли белый
        assertEquals(1, gameMatch.getActivePlayerCondition());

        throwCube(WHITE, 32);
        assertFalse(gameMatch.isTurnSkipped());

        assertTrue(gameMatch.isTurnWhite()); // ходит ли белый, после броска кубика
        assertEquals(2, gameMatch.getActivePlayerCondition());

        moveChip(WHITE, 12, 2);
        assertFalse(gameMatch.isTurnSkipped());
        assertTrue(gameMatch.isTurnWhite());// ходит ли черный, после броска кубика
        assertEquals(2, gameMatch.getActivePlayerCondition());
        checkWhitePositions(gameMatch,
                new ChipsPosition(12, 1),
                new ChipsPosition(14, 1));
        checkBlackPositions(gameMatch,
                new ChipsPosition(10, 1),
                new ChipsPosition(13, 1));

        moveChip(WHITE, 12, 3);
        assertFalse(gameMatch.isTurnWhite());// ходит ли черный, после броска кубика
        assertEquals(1, gameMatch.getActivePlayerCondition());
        checkWhitePositions(gameMatch,
                new ChipsPosition(14, 1),
                new ChipsPosition(15, 1));
        checkBlackPositions(gameMatch,
                new ChipsPosition(10, 1),
                new ChipsPosition(13, 1));


        throwCube(BLACK, 22);
        assertFalse(gameMatch.isTurnWhite());// ходит ли черный, после броска кубика
        assertEquals(4, gameMatch.getCountMove());

        moveChip(BLACK, 13, 2);
        checkWhitePositions(gameMatch,
                new ChipsPosition(14, 1),
                new ChipsPosition(15, 1));
        checkBlackPositions(gameMatch,
                new ChipsPosition(10, 1),
                new ChipsPosition(11, 1));
        assertEquals(3, gameMatch.getCountMove());

        moveChip(BLACK, 11, 2);
        checkWhitePositions(gameMatch,
                new ChipsPosition(14, 1),
                new ChipsPosition(15, 1));
        checkBlackPositions(gameMatch,
                new ChipsPosition(9, 1),
                new ChipsPosition(10, 1));
        assertEquals(2, gameMatch.getCountMove());
        assertFalse(gameMatch.isTurnWhite());
    }
    public void testPlayerCantMoveInProgress() throws Exception, GameError {

        /* тест проверяющий, что игрок НЕ МОЖЕТ сходить и пропускает ход */
        PackageMessage packageMessage = enter("0", "Tom");
        Player whitePlayer = getPlayers().get(0);
        GameMatch gameMatch = whitePlayer.getGameMatch();
        PackageMessage packageMessage1 = enter("1", "Sam");
        Player blackPlayer = getPlayers().get(1);


        gameMatch.getTable().cells[1].setCell(Cell.NULL, 0);
        gameMatch.getTable().cells[6].setCell(Cell.NULL, 0);
        gameMatch.getTable().cells[8].setCell(Cell.NULL, 0);
        gameMatch.getTable().cells[12].setCell(Cell.NULL, 0);
        gameMatch.getTable().cells[13].setCell(Cell.NULL, 0);
        gameMatch.getTable().cells[17].setCell(Cell.NULL, 0);
        gameMatch.getTable().cells[19].setCell(Cell.NULL, 0);
        gameMatch.getTable().cells[24].setCell(Cell.NULL, 0);

        gameMatch.getTable().cells[11].setCell(Cell.WHITE, 1);
        gameMatch.getTable().cells[12].setCell(Cell.WHITE, 3);
        gameMatch.getTable().cells[13].setCell(Cell.BLACK, 2);
        gameMatch.getTable().cells[14].setCell(Cell.BLACK, 2);

        throwCube(WHITE, 12);
        assertTrue(gameMatch.isTurnWhite());
        assertEquals(2, gameMatch.getActivePlayerCondition());

        PackageMessage response = (PackageMessage) moveChip(WHITE, 11, 1);
        StateChange stateChange = response.getChange(StateChange.class);

        checkWhitePositions(gameMatch,
                new ChipsPosition(12, 4));
        checkBlackPositions(gameMatch,
                new ChipsPosition(13, 2),
                new ChipsPosition(14, 2));
        assertFalse(gameMatch.isTurnWhite()); //ход черного
        assertEquals(0, gameMatch.getCountMove());
        assertTrue(stateChange.isTurnSkipped());

        response = (PackageMessage) throwCube(BLACK, 11);
        assertFalse(gameMatch.isTurnWhite());
        assertTrue(stateChange.isTurnSkipped());
        assertFalse(gameMatch.isTurnSkipped());
        //TODO (Michael) Ошибка - после пропуска хода черному также приходит  isTurnSkipped = true

        moveChip(BLACK, 14, 1);
        moveChip(BLACK, 14, 1);

        checkWhitePositions(gameMatch,
                new ChipsPosition(12, 4));
        checkBlackPositions(gameMatch,
                new ChipsPosition(13, 4));
        assertTrue(gameMatch.isTurnWhite()); //ход черного

    }
}