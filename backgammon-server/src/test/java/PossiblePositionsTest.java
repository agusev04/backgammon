import server.transport.GameState;
import server.transport.PossiblePositions;
import support.AbstractTest;

public class PossiblePositionsTest extends AbstractTest {

    public void testPosiblePositions() throws Exception {
        assertTrue(getPlayers().isEmpty());

        /*first player enters*/
        GameState gameState = enter("0", "11");

        /*second player enters*/
        GameState gameState2 = enter("1", "user 2");
        int startPosition[] = {1, 12, 17, 19};
        PossiblePositions possiblePositions = throwCube("0", 11);

        for (int i = 1; i < 5; i++) {
            assertEquals(true, possiblePositions.getPossiblePositions().contains(startPosition[0] * 101 + i));
            assertEquals(true, possiblePositions.getPossiblePositions().contains(startPosition[2] * 101 + i));
            assertEquals(true, possiblePositions.getPossiblePositions().contains(startPosition[3] * 101 + i));
            if (i == 1) {
                assertEquals(false, possiblePositions.getPossiblePositions().contains(startPosition[1] * 101 + i));
            } else {
                assertEquals(true, possiblePositions.getPossiblePositions().contains(startPosition[1] * 101 + i));
            }

        }

        possiblePositions = throwCube("0", 26);
        int[] possibleValues = {2, 6, 8};
        for (int i = 0; i < 3; i++) {
            assertEquals(true, possiblePositions.getPossiblePositions().contains(startPosition[0] * 101 + possibleValues[i]));
            if (i < 2) {
                assertEquals(true, possiblePositions.getPossiblePositions().contains(startPosition[2] * 101 + possibleValues[i]));
            } else {
                assertEquals(false, possiblePositions.getPossiblePositions().contains(startPosition[2] * 101 + possibleValues[i]));
            }
            if (i < 1) {
                assertEquals(true, possiblePositions.getPossiblePositions().contains(startPosition[3] * 101 + possibleValues[i]));
            } else {
                assertEquals(false, possiblePositions.getPossiblePositions().contains(startPosition[3] * 101 + possibleValues[i]));
            }
            assertEquals(true, possiblePositions.getPossiblePositions().contains(startPosition[1] * 101 + possibleValues[i]));

        }

        possiblePositions = throwCube("0", 56);
        int[] possibleValues1 = {5, 6, 11};
        for (int i = 0; i < 3; i++) {
            if (i != 0) {
                assertEquals(true, possiblePositions.getPossiblePositions().contains(startPosition[0] * 101 + possibleValues1[i]));
            } else {
                assertEquals(false, possiblePositions.getPossiblePositions().contains(startPosition[0] * 101 + possibleValues1[i]));
            }
            if (i < 2) {
                assertEquals(true, possiblePositions.getPossiblePositions().contains(startPosition[2] * 101 + possibleValues1[i]));
            } else {
                assertEquals(false, possiblePositions.getPossiblePositions().contains(startPosition[2] * 101 + possibleValues1[i]));
            }
            if (i < 0) {
                assertEquals(true, possiblePositions.getPossiblePositions().contains(startPosition[3] * 101 + possibleValues1[i]));
            } else {
                assertEquals(false, possiblePositions.getPossiblePositions().contains(startPosition[3] * 101 + possibleValues1[i]));
            }
            assertEquals(true, possiblePositions.getPossiblePositions().contains(startPosition[1] * 101 + possibleValues1[i]));

        }

        possiblePositions = throwCube("0", 23);
        int[] possibleValues11 = {2, 3, 5};
        for (int i = 0; i < 3; i++) {
            if (i < 2) {
                assertEquals(true, possiblePositions.getPossiblePositions().contains(startPosition[0] * 101 + possibleValues11[i]));
            } else {
                assertEquals(false, possiblePositions.getPossiblePositions().contains(startPosition[0] * 101 + possibleValues11[i]));
            }
            assertEquals(true, possiblePositions.getPossiblePositions().contains(startPosition[2] * 101 + possibleValues11[i]));

            if (i < 2) {
                assertEquals(true, possiblePositions.getPossiblePositions().contains(startPosition[3] * 101 + possibleValues11[i]));
            } else {
                assertEquals(false, possiblePositions.getPossiblePositions().contains(startPosition[3] * 101 + possibleValues11[i]));
            }
            assertEquals(true, possiblePositions.getPossiblePositions().contains(startPosition[1] * 101 + possibleValues11[i]));

        }

        possiblePositions = throwCube("0", 43);
        int[] possibleValues111 = {4, 3, 7};
        for (int i = 0; i < 3; i++) {
            if (i != 2) {
                assertEquals(true, possiblePositions.getPossiblePositions().contains(startPosition[0] * 101 + possibleValues111[i]));
            } else {
                assertEquals(false, possiblePositions.getPossiblePositions().contains(startPosition[0] * 101 + possibleValues111[i]));
            }

            if (i != 2) {
                assertEquals(true, possiblePositions.getPossiblePositions().contains(startPosition[2] * 101 + possibleValues111[i]));
            } else {
                assertEquals(false, possiblePositions.getPossiblePositions().contains(startPosition[2] * 101 + possibleValues111[i]));
            }

            if (i != 2) {
                assertEquals(true, possiblePositions.getPossiblePositions().contains(startPosition[3] * 101 + possibleValues111[i]));
            } else {
                assertEquals(false, possiblePositions.getPossiblePositions().contains(startPosition[3] * 101 + possibleValues111[i]));
            }
            assertEquals(true, possiblePositions.getPossiblePositions().contains(startPosition[1] * 101 + possibleValues111[i]));

        }
        //  assertNotNull(starts);

        //   assertEquals(2, starts.length);

    }
}
