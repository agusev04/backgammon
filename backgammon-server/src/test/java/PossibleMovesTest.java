import server.transport.Move;
import server.transport.PossibleMoves;
import support.AbstractTest;

import java.util.ArrayList;

public class PossibleMovesTest extends AbstractTest {

    public void testEmpty() {

    }

    public void testPossibleMoves1() throws Exception {
        assertTrue(getPlayers().isEmpty());


        /*first player enters*/
        enter("0", "11");

        /*second player enters*/
        enter("1", "user 2");
        int startPosition[] = {1, 12, 17, 19};
        PossibleMoves possibleMoves = (PossibleMoves) throwCube("0", 11).getChange("PossibleMoves");
        ArrayList<Move> possibleMoves1 = possibleMoves.getPossibleMoves();


        assertTrue(possibleMoves1.contains(new Move(startPosition[0], startPosition[0] + 1)));
        assertTrue(possibleMoves1.contains(new Move(startPosition[2], startPosition[2] + 1)));
        assertTrue(possibleMoves1.contains(new Move(startPosition[3], startPosition[3] + 1)));

        assertFalse(possibleMoves1.contains(new Move(startPosition[1], startPosition[1] + 1)));


    }

    public void testPossibleMoves2() throws Exception {
        assertTrue(getPlayers().isEmpty());

        /*first player enters*/
        enter("0", "11");

        /*second player enters*/
        enter("1", "user 2");

        int startPosition[] = {1, 12, 17, 19};
        PossibleMoves possibleMoves = (PossibleMoves) throwCube("0", 26).getChange("PossibleMoves");
        int[] possibleValues = {2, 6};
        ArrayList<Move> possibleMoves1 = possibleMoves.getPossibleMoves();
        for (int i = 0; i < 2; i++) {
            assertTrue(possibleMoves1.contains(new Move(startPosition[0], startPosition[0] + possibleValues[i])));
            if (i < 2) {
                assertTrue(possibleMoves1.contains(new Move(startPosition[2], startPosition[2] + possibleValues[i])));
            } else {
                assertFalse(possibleMoves1.contains(new Move(startPosition[2], startPosition[2] + possibleValues[i])));
            }
            if (i < 1) {
                assertTrue(possibleMoves1.contains(new Move(startPosition[3], startPosition[3] + possibleValues[i])));
            } else {
                assertFalse(possibleMoves1.contains(new Move(startPosition[3], startPosition[3] + possibleValues[i])));
            }
            assertTrue(possibleMoves1.contains(new Move(startPosition[1], startPosition[1] + possibleValues[i])));

        }
    }

    public void testPossibleMoves3() throws Exception {
        assertTrue(getPlayers().isEmpty());

        /*first player enters*/
        enter("0", "11");

        /*second player enters*/
        enter("1", "user 2");

        int startPosition[] = {1, 12, 17, 19};

        PossibleMoves possibleMoves = (PossibleMoves) throwCube("0", 56).getChange("PossibleMoves");
        int[] possibleValues = {5, 6};
        ArrayList<Move> possiblePositions = possibleMoves.getPossibleMoves();
        for (int i = 0; i < 2; i++) {

            if (i != 0) {
                assertTrue(possiblePositions.contains(new Move(startPosition[0], startPosition[0] + possibleValues[i])));
            } else {
                assertFalse(possiblePositions.contains(new Move(startPosition[0], startPosition[0] + possibleValues[i])));
            }
            if (i < 2) {
                assertTrue(possiblePositions.contains(new Move(startPosition[2], startPosition[2] + possibleValues[i])));
            } else {
                assertFalse(possiblePositions.contains(new Move(startPosition[2], startPosition[2] + possibleValues[i])));
            }
            if (i < 0) {
                assertTrue(possiblePositions.contains(new Move(startPosition[3], startPosition[3] + possibleValues[i])));
            } else {
                assertFalse(possiblePositions.contains(new Move(startPosition[3], startPosition[3] + possibleValues[i])));
            }
            assertTrue(possiblePositions.contains(new Move(startPosition[1], startPosition[1] + possibleValues[i])));

        }
    }

    public void testPossibleMoves4() throws Exception {
        assertTrue(getPlayers().isEmpty());

        /*first player enters*/
        enter("0", "11");

        /*second player enters*/
        enter("1", "user 2");

        int startPosition[] = {1, 12, 17, 19};

        PossibleMoves possibleMoves = (PossibleMoves) throwCube("0", 23).getChange("PossibleMoves");
        int[] possibleValues = {2, 3};
        ArrayList<Move> possiblePositions = possibleMoves.getPossibleMoves();
        for (int i = 0; i < 2; i++) {
            if (i < 2) {
                assertTrue(possiblePositions.contains(new Move(startPosition[0], startPosition[0] + possibleValues[i])));
            } else {
                assertFalse(possiblePositions.contains(new Move(startPosition[0], startPosition[0] + possibleValues[i])));
            }
            assertTrue(possiblePositions.contains(new Move(startPosition[2], startPosition[2] + possibleValues[i])));

            if (i < 2) {
                assertTrue(possiblePositions.contains(new Move(startPosition[3], startPosition[3] + possibleValues[i])));
            } else {
                assertFalse(possiblePositions.contains(new Move(startPosition[3], startPosition[3] + possibleValues[i])));
            }
            assertTrue(possiblePositions.contains(new Move(startPosition[1], startPosition[1] + possibleValues[i])));
        }
    }

    public void testPossibleMoves5() throws Exception {
        assertTrue(getPlayers().isEmpty());

        /*first player enters*/
        enter("0", "11");

        /*second player enters*/
        enter("1", "user 2");

        int startPosition[] = {1, 12, 17, 19};

        PossibleMoves possibleMoves = (PossibleMoves) throwCube("0", 43).getChange("PossibleMoves");
        int[] possibleValues = {4, 3};
        ArrayList<Move> possiblePositions = possibleMoves.getPossibleMoves();
        for (int i = 0; i < 2; i++) {
            if (i != 2) {
                assertTrue(possiblePositions.contains(new Move(startPosition[0], startPosition[0] + possibleValues[i])));
            } else {
                assertFalse(possiblePositions.contains(new Move(startPosition[0], startPosition[0] + possibleValues[i])));
            }

            if (i != 2) {
                assertTrue(possiblePositions.contains(new Move(startPosition[2], startPosition[2] + possibleValues[i])));
            } else {
                assertFalse(possiblePositions.contains(new Move(startPosition[2], startPosition[2] + possibleValues[i])));
            }

            if (i != 2) {
                assertTrue(possiblePositions.contains(new Move(startPosition[3], startPosition[3] + possibleValues[i])));
            } else {
                assertFalse(possiblePositions.contains(new Move(startPosition[3], startPosition[3] + possibleValues[i])));
            }
            assertTrue(possiblePositions.contains(new Move(startPosition[1], startPosition[1] + possibleValues[i])));

        }
    }
}
