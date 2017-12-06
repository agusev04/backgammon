import game.gameobjects.Cell;
import game.gameobjects.GameBoard;
import game.logics.GameError;
import game.logics.GameMatch;
import game.logics.Player;
import server.transport.AbstractMessage;
import server.transport.ChipsPosition;
import server.transport.Move;
import server.transport.PackageMessage;
import support.AbstractTest;


public class FinishGame extends AbstractTest {

    private static final String WHITE = "0";
    private static final String BLACK = "1";

    public void testPlayerFinishGame() throws Exception, GameError {

        PackageMessage packageMessage = enter("0", "Tom");
        Player whitePlayer = getPlayers().get("0");
        GameMatch gameMatch = whitePlayer.getGameMatch();
        PackageMessage packageMessage1 = enter("1", "Sam");
        Player blackPlayer = getPlayers().get("1");


        gameMatch.getTable().cells[1].setCell(Cell.NULL, 0);
        gameMatch.getTable().cells[6].setCell(Cell.NULL, 0);
        gameMatch.getTable().cells[8].setCell(Cell.NULL, 0);
        gameMatch.getTable().cells[12].setCell(Cell.NULL, 0);
        gameMatch.getTable().cells[13].setCell(Cell.NULL, 0);
        gameMatch.getTable().cells[17].setCell(Cell.NULL, 0);
        gameMatch.getTable().cells[19].setCell(Cell.NULL, 0);
        gameMatch.getTable().cells[24].setCell(Cell.NULL, 0);


        gameMatch.getTable().cells[18].setCell(Cell.WHITE, 1);
        gameMatch.getTable().cells[19].setCell(Cell.WHITE, 2);
        gameMatch.getTable().cells[20].setCell(Cell.WHITE, 3);
        gameMatch.getTable().cells[21].setCell(Cell.WHITE, 3);
        gameMatch.getTable().cells[22].setCell(Cell.WHITE, 3);
        gameMatch.getTable().cells[23].setCell(Cell.WHITE, 2);
        gameMatch.getTable().cells[24].setCell(Cell.WHITE, 1);

        gameMatch.getTable().cells[1].setCell(Cell.BLACK, 3);
        gameMatch.getTable().cells[2].setCell(Cell.BLACK, 3);
        gameMatch.getTable().cells[3].setCell(Cell.BLACK, 3);
        gameMatch.getTable().cells[4].setCell(Cell.BLACK, 3);
        gameMatch.getTable().cells[5].setCell(Cell.BLACK, 2);
        gameMatch.getTable().cells[25].setCell(Cell.BLACK, 1);


        assertTrue(gameMatch.isTurnWhite());

        throwCube(WHITE, 23);
        assertTrue(gameMatch.isTurnWhite());

        AbstractMessage response = moveChip(WHITE, 23, 2);
        assertEquals("ErrorMessage{code=4, message='You can not do this move'}", response.toString());
        response = moveChip(WHITE, 22, 3);
        assertEquals("ErrorMessage{code=4, message='You can not do this move'}", response.toString());


        checkWhitePositions(gameMatch,
                new ChipsPosition(18, 1),
                new ChipsPosition(19, 2),
                new ChipsPosition(20, 3),
                new ChipsPosition(21, 3),
                new ChipsPosition(22, 3),
                new ChipsPosition(23, 2),
                new ChipsPosition(24, 1));

        checkBlackPositions(gameMatch,
                new ChipsPosition(1, 3),
                new ChipsPosition(2, 3),
                new ChipsPosition(3, 3),
                new ChipsPosition(4, 3),
                new ChipsPosition(5, 2),
                new ChipsPosition(25, 1));

        assertTrue(gameMatch.isTurnWhite());

        moveChip(WHITE,18, 3);

        checkWhitePositions(gameMatch,
                new ChipsPosition(19, 2),
                new ChipsPosition(20, 3),
                new ChipsPosition(21, 4),
                new ChipsPosition(22, 3),
                new ChipsPosition(23, 2),
                new ChipsPosition(24, 1));

        moveChip(WHITE, 23, 2);
        checkWhitePositions(gameMatch,
                new ChipsPosition(19, 2),
                new ChipsPosition(20, 3),
                new ChipsPosition(21, 4),
                new ChipsPosition(22, 3),
                new ChipsPosition(23, 1),
                new ChipsPosition(24, 1));

        assertEquals(1, gameMatch.getTable().getWhiteCounter());

        response = throwCube(BLACK, 62);
        checkPossibleMoves(response,
                new Move(25, 23));
        moveChip(BLACK, 25, 2);

        checkWhitePositions(gameMatch,
                new ChipsPosition(0, 1),
                new ChipsPosition(19, 2),
                new ChipsPosition(20, 3),
                new ChipsPosition(21, 4),
                new ChipsPosition(22, 3),
                new ChipsPosition(24, 1));

        checkBlackPositions(gameMatch,
                new ChipsPosition(1, 3),
                new ChipsPosition(2, 3),
                new ChipsPosition(3, 3),
                new ChipsPosition(4, 3),
                new ChipsPosition(5, 2),
                new ChipsPosition(23, 1));

        moveChip(BLACK, 23, 6);

        checkWhitePositions(gameMatch,
                new ChipsPosition(0, 1),
                new ChipsPosition(19, 2),
                new ChipsPosition(20, 3),
                new ChipsPosition(21, 4),
                new ChipsPosition(22, 3),
                new ChipsPosition(24, 1));

        checkBlackPositions(gameMatch,
                new ChipsPosition(1, 3),
                new ChipsPosition(2, 3),
                new ChipsPosition(3, 3),
                new ChipsPosition(4, 3),
                new ChipsPosition(5, 2),
                new ChipsPosition(17, 1));
        assertEquals(1, gameMatch.getTable().getWhiteCounter());
        assertEquals(0, gameMatch.getTable().getBlackCounter());

        response = throwCube(WHITE, 66);

        checkPossibleMoves(response,
                new Move(0, 6));

        response = moveChip(WHITE, 0, 6);
        checkWhitePositions(gameMatch,
                new ChipsPosition(6, 1),
                new ChipsPosition(19, 2),
                new ChipsPosition(20, 3),
                new ChipsPosition(21, 4),
                new ChipsPosition(22, 3),
                new ChipsPosition(24, 1));

        checkBlackPositions(gameMatch,
                new ChipsPosition(1, 3),
                new ChipsPosition(2, 3),
                new ChipsPosition(3, 3),
                new ChipsPosition(4, 3),
                new ChipsPosition(5, 2),
                new ChipsPosition(17, 1));
        assertEquals(1, gameMatch.getTable().getWhiteCounter());
        assertEquals(0, gameMatch.getTable().getBlackCounter());

        checkPossibleMoves(response,
                new Move(6, 12));
        assertTrue(gameMatch.isTurnWhite());

        response = moveChip(WHITE, 6, 6);
        checkWhitePositions(gameMatch,
                new ChipsPosition(12, 1),
                new ChipsPosition(19, 2),
                new ChipsPosition(20, 3),
                new ChipsPosition(21, 4),
                new ChipsPosition(22, 3),
                new ChipsPosition(24, 1));

        checkBlackPositions(gameMatch,
                new ChipsPosition(1, 3),
                new ChipsPosition(2, 3),
                new ChipsPosition(3, 3),
                new ChipsPosition(4, 3),
                new ChipsPosition(5, 2),
                new ChipsPosition(17, 1));
        assertEquals(1, gameMatch.getTable().getWhiteCounter());
        assertEquals(0, gameMatch.getTable().getBlackCounter());

        checkPossibleMoves(response,
                new Move(12, 18));
        assertTrue(gameMatch.isTurnWhite());

        response = moveChip(WHITE, 12, 6);
        checkWhitePositions(gameMatch,
                new ChipsPosition(18, 1),
                new ChipsPosition(19, 2),
                new ChipsPosition(20, 3),
                new ChipsPosition(21, 4),
                new ChipsPosition(22, 3),
                new ChipsPosition(24, 1));

        checkBlackPositions(gameMatch,
                new ChipsPosition(1, 3),
                new ChipsPosition(2, 3),
                new ChipsPosition(3, 3),
                new ChipsPosition(4, 3),
                new ChipsPosition(5, 2),
                new ChipsPosition(17, 1));
        assertEquals(1, gameMatch.getTable().getWhiteCounter());
        assertEquals(0, gameMatch.getTable().getBlackCounter());

        checkPossibleMoves(response,
                new Move(18, 24));
        assertTrue(gameMatch.isTurnWhite());

        moveChip(WHITE, 18, 6);
        checkWhitePositions(gameMatch,
                new ChipsPosition(19, 2),
                new ChipsPosition(20, 3),
                new ChipsPosition(21, 4),
                new ChipsPosition(22, 3),
                new ChipsPosition(24, 2));

        checkBlackPositions(gameMatch,
                new ChipsPosition(1, 3),
                new ChipsPosition(2, 3),
                new ChipsPosition(3, 3),
                new ChipsPosition(4, 3),
                new ChipsPosition(5, 2),
                new ChipsPosition(17, 1));
        assertEquals(1, gameMatch.getTable().getWhiteCounter());
        assertEquals(0, gameMatch.getTable().getBlackCounter());

        assertFalse(gameMatch.isTurnWhite());

        response = throwCube(BLACK, 44);

        checkPossibleMoves(response,
                new Move(5, 1),
                new Move(17, 13)
        );
        assertFalse(gameMatch.isTurnWhite());

        response = moveChip(BLACK, 17, 4);

        checkWhitePositions(gameMatch,
                new ChipsPosition(19, 2),
                new ChipsPosition(20, 3),
                new ChipsPosition(21, 4),
                new ChipsPosition(22, 3),
                new ChipsPosition(24, 2));

        checkBlackPositions(gameMatch,
                new ChipsPosition(1, 3),
                new ChipsPosition(2, 3),
                new ChipsPosition(3, 3),
                new ChipsPosition(4, 3),
                new ChipsPosition(5, 2),
                new ChipsPosition(13, 1));
        assertEquals(1, gameMatch.getTable().getWhiteCounter());
        assertEquals(0, gameMatch.getTable().getBlackCounter());

        checkPossibleMoves(response,
                new Move(5, 1),
                new Move(13, 9)
        );
        assertFalse(gameMatch.isTurnWhite());

        response = moveChip(BLACK, 13, 4);

            checkWhitePositions(gameMatch,
                    new ChipsPosition(19, 2),
                    new ChipsPosition(20, 3),
                    new ChipsPosition(21, 4),
                    new ChipsPosition(22, 3),
                    new ChipsPosition(24, 2));

            checkBlackPositions(gameMatch,
                    new ChipsPosition(1, 3),
                    new ChipsPosition(2, 3),
                    new ChipsPosition(3, 3),
                    new ChipsPosition(4, 3),
                    new ChipsPosition(5, 2),
                    new ChipsPosition(9, 1));
            assertEquals(1, gameMatch.getTable().getWhiteCounter());
            assertEquals(0, gameMatch.getTable().getBlackCounter());

        checkPossibleMoves(response,
                new Move(5, 1),
                new Move(9, 5)
        );
        assertFalse(gameMatch.isTurnWhite());

        response = moveChip(BLACK, 9, 4);

        checkWhitePositions(gameMatch,
                new ChipsPosition(19, 2),
                new ChipsPosition(20, 3),
                new ChipsPosition(21, 4),
                new ChipsPosition(22, 3),
                new ChipsPosition(24, 2)
        );
        checkBlackPositions(gameMatch,
                new ChipsPosition(1, 3),
                new ChipsPosition(2, 3),
                new ChipsPosition(3, 3),
                new ChipsPosition(4, 3),
                new ChipsPosition(5, 3)
        );
        assertEquals(1, gameMatch.getTable().getWhiteCounter());
        assertEquals(0, gameMatch.getTable().getBlackCounter());

        checkPossibleMoves(response,
                new Move(4, 27),
                new Move(5, 1)
        );

        assertEquals(1, gameMatch.getCountMove());

        response = moveChip(BLACK, 4, 4);

        checkWhitePositions(gameMatch,
                new ChipsPosition(19, 2),
                new ChipsPosition(20, 3),
                new ChipsPosition(21, 4),
                new ChipsPosition(22, 3),
                new ChipsPosition(24, 2)
        );
        checkBlackPositions(gameMatch,
                new ChipsPosition(1, 3),
                new ChipsPosition(2, 3),
                new ChipsPosition(3, 3),
                new ChipsPosition(4, 2),
                new ChipsPosition(5, 3)
        );
        assertEquals(1, gameMatch.getTable().getWhiteCounter());
        assertEquals(1, gameMatch.getTable().getBlackCounter());

        assertTrue(gameMatch.isTurnWhite());

        response = throwCube(WHITE, 66);

        checkPossibleMoves(response,
                new Move(19, 26)
                );

        checkWhitePositions(gameMatch,
                new ChipsPosition(19, 2),
                new ChipsPosition(20, 3),
                new ChipsPosition(21, 4),
                new ChipsPosition(22, 3),
                new ChipsPosition(24, 2)
        );
        checkBlackPositions(gameMatch,
                new ChipsPosition(1, 3),
                new ChipsPosition(2, 3),
                new ChipsPosition(3, 3),
                new ChipsPosition(4, 2),
                new ChipsPosition(5, 3)
        );

        assertTrue(gameMatch.isTurnWhite());

        assertEquals(1, gameMatch.getTable().getWhiteCounter());
        assertEquals(1, gameMatch.getTable().getBlackCounter());

        moveChip(WHITE, 19, 6);
        assertEquals(2, gameMatch.getTable().getWhiteCounter());
        assertEquals(1, gameMatch.getTable().getBlackCounter());
        response = moveChip(WHITE, 19, 6);

        checkPossibleMoves(response,
                new Move(20, 26)
        );

        checkWhitePositions(gameMatch,
                new ChipsPosition(20, 3),
                new ChipsPosition(21, 4),
                new ChipsPosition(22, 3),
                new ChipsPosition(24, 2)
        );
        checkBlackPositions(gameMatch,
                new ChipsPosition(1, 3),
                new ChipsPosition(2, 3),
                new ChipsPosition(3, 3),
                new ChipsPosition(4, 2),
                new ChipsPosition(5, 3)
        );

        response = moveChip(WHITE, 20, 6);
        assertEquals(4, gameMatch.getTable().getWhiteCounter());
        assertEquals(1, gameMatch.getTable().getBlackCounter());

        checkWhitePositions(gameMatch,
                new ChipsPosition(20, 2),
                new ChipsPosition(21, 4),
                new ChipsPosition(22, 3),
                new ChipsPosition(24, 2)
        );
        checkBlackPositions(gameMatch,
                new ChipsPosition(1, 3),
                new ChipsPosition(2, 3),
                new ChipsPosition(3, 3),
                new ChipsPosition(4, 2),
                new ChipsPosition(5, 3)
        );

        checkPossibleMoves(response,
                new Move(20, 26)
        );

        assertEquals(1, gameMatch.getCountMove());

        moveChip(WHITE, 20, 6);

        checkWhitePositions(gameMatch,
                new ChipsPosition(20, 1),
                new ChipsPosition(21, 4),
                new ChipsPosition(22, 3),
                new ChipsPosition(24, 2)
        );
        checkBlackPositions(gameMatch,
                new ChipsPosition(1, 3),
                new ChipsPosition(2, 3),
                new ChipsPosition(3, 3),
                new ChipsPosition(4, 2),
                new ChipsPosition(5, 3)
        );
        assertEquals(5, gameMatch.getTable().getWhiteCounter());
        assertEquals(1, gameMatch.getTable().getBlackCounter());

        throwCube(BLACK, 66);

        moveChip(BLACK, 5, 6);
        moveChip(BLACK, 5, 6);
        moveChip(BLACK, 5, 6);
        moveChip(BLACK, 4, 6);

        checkWhitePositions(gameMatch,
                new ChipsPosition(20, 1),
                new ChipsPosition(21, 4),
                new ChipsPosition(22, 3),
                new ChipsPosition(24, 2)
        );
        checkBlackPositions(gameMatch,
                new ChipsPosition(1, 3),
                new ChipsPosition(2, 3),
                new ChipsPosition(3, 3),
                new ChipsPosition(4, 1)
        );
        assertEquals(5, gameMatch.getTable().getWhiteCounter());
        assertEquals(5, gameMatch.getTable().getBlackCounter());

        throwCube(WHITE, 66);

        moveChip(WHITE,20, 6);
        moveChip(WHITE,21, 6);
        moveChip(WHITE,21, 6);
        moveChip(WHITE,21, 6);

        checkWhitePositions(gameMatch,
                new ChipsPosition(21, 1),
                new ChipsPosition(22, 3),
                new ChipsPosition(24, 2)
        );
        checkBlackPositions(gameMatch,
                new ChipsPosition(1, 3),
                new ChipsPosition(2, 3),
                new ChipsPosition(3, 3),
                new ChipsPosition(4, 1)
        );
        assertEquals(9, gameMatch.getTable().getWhiteCounter());
        assertEquals(5, gameMatch.getTable().getBlackCounter());

        throwCube(BLACK, 66);

        moveChip(BLACK, 4, 6);
        moveChip(BLACK, 3, 6);
        moveChip(BLACK, 3, 6);
        moveChip(BLACK, 3, 6);

        checkWhitePositions(gameMatch,
                new ChipsPosition(21, 1),
                new ChipsPosition(22, 3),
                new ChipsPosition(24, 2)
        );
        checkBlackPositions(gameMatch,
                new ChipsPosition(1, 3),
                new ChipsPosition(2, 3)
        );
        assertEquals(9, gameMatch.getTable().getWhiteCounter());
        assertEquals(9, gameMatch.getTable().getBlackCounter());

        throwCube(WHITE, 55);

        moveChip(WHITE, 21, 5);
        moveChip(WHITE, 22, 5);
        moveChip(WHITE, 22, 5);
        moveChip(WHITE, 22, 5);

        checkWhitePositions(gameMatch,
                new ChipsPosition(24, 2)
        );
        checkBlackPositions(gameMatch,
                new ChipsPosition(1, 3),
                new ChipsPosition(2, 3)
        );
        assertEquals(13, gameMatch.getTable().getWhiteCounter());
        assertEquals(9, gameMatch.getTable().getBlackCounter());

        throwCube(BLACK, 24);

        moveChip(BLACK, 2, 4);
        moveChip(BLACK, 2, 2);

        checkWhitePositions(gameMatch,
                new ChipsPosition(24, 2)
        );
        checkBlackPositions(gameMatch,
                new ChipsPosition(1, 3),
                new ChipsPosition(2, 1)
        );

        assertEquals(13, gameMatch.getTable().getWhiteCounter());
        assertEquals(11, gameMatch.getTable().getBlackCounter());

        throwCube(WHITE, 23);

        moveChip(WHITE, 24, 3);

        moveChip(WHITE, 24, 2);

        assertEquals(15, gameMatch.getTable().getWhiteCounter());
        assertEquals(11, gameMatch.getTable().getBlackCounter());
    }

//    public void testRepeatError() throws Exception, GameError {
//
//
//        PackageMessage packageMessage = enter("0", "Tom");
//        Player whitePlayer = getPlayers().get(0);
//        GameMatch gameMatch = whitePlayer.getGameMatch();
//        PackageMessage packageMessage1 = enter("1", "Sam");
//        Player blackPlayer = getPlayers().get(1);
//
//
//        gameMatch.getTable().cells[1].setCell(Cell.NULL, 0);
//        gameMatch.getTable().cells[6].setCell(Cell.NULL, 0);
//        gameMatch.getTable().cells[8].setCell(Cell.NULL, 0);
//        gameMatch.getTable().cells[12].setCell(Cell.NULL, 0);
//        gameMatch.getTable().cells[13].setCell(Cell.NULL, 0);
//        gameMatch.getTable().cells[17].setCell(Cell.NULL, 0);
//        gameMatch.getTable().cells[19].setCell(Cell.NULL, 0);
//        gameMatch.getTable().cells[24].setCell(Cell.NULL, 0);
//
//
//        gameMatch.getTable().cells[18].setCell(Cell.WHITE, 1);
//        gameMatch.getTable().cells[19].setCell(Cell.WHITE, 5);
//        gameMatch.getTable().cells[21].setCell(Cell.WHITE, 5);
//        gameMatch.getTable().cells[23].setCell(Cell.WHITE, 2);
//        gameMatch.getTable().cells[24].setCell(Cell.WHITE, 2);
//
//        gameMatch.getTable().cells[1].setCell(Cell.BLACK, 5);
//        gameMatch.getTable().cells[2].setCell(Cell.BLACK, 1);
//        gameMatch.getTable().cells[3].setCell(Cell.BLACK, 5);
//        gameMatch.getTable().cells[16].setCell(Cell.BLACK, 1);
//        gameMatch.getTable().cells[22].setCell(Cell.BLACK, 2);
//        gameMatch.getTable().cells[25].setCell(Cell.BLACK, 1);
//
//        throwCube(WHITE, 56);
//
//        checkWhitePositions(gameMatch,
//                new ChipsPosition(18, 1),
//                new ChipsPosition(19, 5),
//                new ChipsPosition(21, 5),
//                new ChipsPosition(23, 2),
//                new ChipsPosition(24, 2));
//
//        checkBlackPositions(gameMatch,
//                new ChipsPosition(1, 5),
//                new ChipsPosition(2, 1),
//                new ChipsPosition(3, 5),
//                new ChipsPosition(16, 1),
//                new ChipsPosition(22, 2),
//                new ChipsPosition(25, 1));
//
//        AbstractMessage response = moveChip(WHITE, 18, 5);
//
//        checkWhitePositions(gameMatch,
//                new ChipsPosition(19, 5),
//                new ChipsPosition(21, 5),
//                new ChipsPosition(23, 3),
//                new ChipsPosition(24, 2));
//
//        checkBlackPositions(gameMatch,
//                new ChipsPosition(1, 5),
//                new ChipsPosition(2, 1),
//                new ChipsPosition(3, 5),
//                new ChipsPosition(16, 1),
//                new ChipsPosition(22, 2),
//                new ChipsPosition(25, 1));
//        assertTrue(gameMatch.isTurnWhite());
//        assertEquals(1, gameMatch.getCountMove());
//
////        checkPossibleMoves(response,
////                new Move(19, 25),
////                new Move(21, 27),
////                new Move(23, 29),
////                new Move(24, 30)
////        ); никогда не выйдет добиться этого условия, кубиком 6 можно перейти только фишкой(ками) из ячейке 19
//        checkPossibleMoves(response,
//                new Move(19, 25));
//
//        moveChip(WHITE, 19, 6);
//
//        checkWhitePositions(gameMatch,
//                new ChipsPosition(19, 4),
//                new ChipsPosition(21, 5),
//                new ChipsPosition(23, 3),
//                new ChipsPosition(24, 2));
//
//        checkBlackPositions(gameMatch,
//                new ChipsPosition(1, 3),
//                new ChipsPosition(2, 3),
//                new ChipsPosition(3, 3),
//                new ChipsPosition(4, 3),
//                new ChipsPosition(5, 2),
//                new ChipsPosition(23, 1));
//
//        assertEquals(1,gameMatch.getTable().getWhiteCounter());
//    }


}