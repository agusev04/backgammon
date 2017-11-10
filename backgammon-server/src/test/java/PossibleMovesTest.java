import server.transport.GameState;
import server.transport.Move;
import server.transport.PossibleMoves;
import support.AbstractTest;

public class PossibleMovesTest extends AbstractTest {

    public void testPossibleMoves1() throws Exception {
        assertTrue(getPlayers().isEmpty());


        /*first player enters*/
        GameState gameState = enter("0", "11");

        /*second player enters*/
        GameState gameState2 = enter("1", "user 2");
        int startPosition[] = {1, 12, 17, 19};
        PossibleMoves possibleMoves = throwCube("0", 11);
        Move move = new Move(1, 2);
        for (int i = 1; i < 5; i++) {
            assertTrue(possibleMoves.getPossiblePositions().contains(new Move(startPosition[0], startPosition[0] + i)));
            assertTrue(possibleMoves.getPossiblePositions().contains(new Move(startPosition[2], startPosition[2] + i)));
            assertTrue(possibleMoves.getPossiblePositions().contains(new Move(startPosition[3], startPosition[3] + i)));
            if (i == 1) {
                assertFalse(possibleMoves.getPossiblePositions().contains(new Move(startPosition[1], startPosition[1] + i)));
            } else {
                assertTrue(possibleMoves.getPossiblePositions().contains(new Move(startPosition[1], startPosition[1] + i)));
            }

        }
    }

    public void testPossibleMoves2() throws Exception {
        assertTrue(getPlayers().isEmpty());

        /*first player enters*/
        GameState gameState = enter("0", "11");

        /*second player enters*/
        GameState gameState2 = enter("1", "user 2");

        int startPosition[] = {1, 12, 17, 19};
        PossibleMoves possibleMoves = throwCube("0", 26);
        int[] possibleValues = {2, 6, 8};
        for (int i = 0; i < 3; i++) {
            assertTrue(possibleMoves.getPossiblePositions().contains(new Move(startPosition[0], startPosition[0] + possibleValues[i])));
            if (i < 2) {
                assertTrue(possibleMoves.getPossiblePositions().contains(new Move(startPosition[2], startPosition[2] + possibleValues[i])));
            } else {
                assertFalse(possibleMoves.getPossiblePositions().contains(new Move(startPosition[2], startPosition[2] + possibleValues[i])));
            }
            if (i < 1) {
                assertTrue(possibleMoves.getPossiblePositions().contains(new Move(startPosition[3], startPosition[3] + possibleValues[i])));
            } else {
                assertFalse(possibleMoves.getPossiblePositions().contains(new Move(startPosition[3], startPosition[3] + possibleValues[i])));
            }
            assertTrue(possibleMoves.getPossiblePositions().contains(new Move(startPosition[1], startPosition[1] + possibleValues[i])));

        }
    }

    public void testPossibleMoves3() throws Exception {
        assertTrue(getPlayers().isEmpty());

        /*first player enters*/
        GameState gameState = enter("0", "11");

        /*second player enters*/
        GameState gameState2 = enter("1", "user 2");

        int startPosition[] = {1, 12, 17, 19};

        PossibleMoves possibleMoves = throwCube("0", 56);
        int[] possibleValues1 = {5, 6, 11};
        for (int i = 0; i < 3; i++) {
            if (i != 0) {
                assertTrue(possibleMoves.getPossiblePositions().contains(new Move(startPosition[0], startPosition[0] + possibleValues1[i])));
            } else {
                assertFalse(possibleMoves.getPossiblePositions().contains(new Move(startPosition[0], startPosition[0] + possibleValues1[i])));
            }
            if (i < 2) {
                assertTrue(possibleMoves.getPossiblePositions().contains(new Move(startPosition[2], startPosition[2] + possibleValues1[i])));
            } else {
                assertFalse(possibleMoves.getPossiblePositions().contains(new Move(startPosition[2], startPosition[2] + possibleValues1[i])));
            }
            if (i < 0) {
                assertTrue(possibleMoves.getPossiblePositions().contains(new Move(startPosition[3], startPosition[3] + possibleValues1[i])));
            } else {
                assertFalse(possibleMoves.getPossiblePositions().contains(new Move(startPosition[3], startPosition[3] + possibleValues1[i])));
            }
            assertTrue(possibleMoves.getPossiblePositions().contains(new Move(startPosition[1], startPosition[1] + possibleValues1[i])));

        }
    }

    public void testPossibleMoves4() throws Exception {
        assertTrue(getPlayers().isEmpty());

        /*first player enters*/
        GameState gameState = enter("0", "11");

        /*second player enters*/
        GameState gameState2 = enter("1", "user 2");

        int startPosition[] = {1, 12, 17, 19};

        PossibleMoves possibleMoves = throwCube("0", 23);
        int[] possibleValues11 = {2, 3, 5};
        for (int i = 0; i < 3; i++) {
            if (i < 2) {
                assertTrue(possibleMoves.getPossiblePositions().contains(new Move(startPosition[0], startPosition[0] + possibleValues11[i])));
            } else {
                assertFalse(possibleMoves.getPossiblePositions().contains(new Move(startPosition[0], startPosition[0] + possibleValues11[i])));
            }
            assertTrue(possibleMoves.getPossiblePositions().contains(new Move(startPosition[2], startPosition[2] + possibleValues11[i])));

            if (i < 2) {
                assertTrue(possibleMoves.getPossiblePositions().contains(new Move(startPosition[3], startPosition[3] + possibleValues11[i])));
            } else {
                assertFalse(possibleMoves.getPossiblePositions().contains(new Move(startPosition[3], startPosition[3] + possibleValues11[i])));
            }
            assertTrue(possibleMoves.getPossiblePositions().contains(new Move(startPosition[1], startPosition[1] + possibleValues11[i])));
        }
    }

    public void testPossibleMoves5() throws Exception {
        assertTrue(getPlayers().isEmpty());

        /*first player enters*/
        GameState gameState = enter("0", "11");

        /*second player enters*/
        GameState gameState2 = enter("1", "user 2");

        int startPosition[] = {1, 12, 17, 19};

        PossibleMoves possibleMoves = throwCube("0", 43);
        int[] possibleValues111 = {4, 3, 7};
        for (int i = 0; i < 3; i++) {
            if (i != 2) {
                assertTrue(possibleMoves.getPossiblePositions().contains(new Move(startPosition[0], startPosition[0] + possibleValues111[i])));
            } else {
                assertFalse(possibleMoves.getPossiblePositions().contains(new Move(startPosition[0], startPosition[0] + possibleValues111[i])));
            }

            if (i != 2) {
                assertTrue(possibleMoves.getPossiblePositions().contains(new Move(startPosition[2], startPosition[2] + possibleValues111[i])));
            } else {
                assertFalse(possibleMoves.getPossiblePositions().contains(new Move(startPosition[2], startPosition[2] + possibleValues111[i])));
            }

            if (i != 2) {
                assertTrue(possibleMoves.getPossiblePositions().contains(new Move(startPosition[3], startPosition[3] + possibleValues111[i])));
            } else {
                assertFalse(possibleMoves.getPossiblePositions().contains(new Move(startPosition[3], startPosition[3] + possibleValues111[i])));
            }
            assertTrue(possibleMoves.getPossiblePositions().contains(new Move(startPosition[1], startPosition[1] + possibleValues111[i])));

        }
    }
}
