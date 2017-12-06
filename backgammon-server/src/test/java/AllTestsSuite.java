import junit.framework.Test;
import junit.framework.TestSuite;

/**
 * Oleg O. Plotnikov
 * Date: 12/6/17
 * Copyright 2017 Connective Games LLC. All rights reserved.
 */
public class AllTestsSuite extends TestSuite {

    public AllTestsSuite(String s) {
        super(s);
    }

    public static Test suite() {
        TestSuite suite = new AllTestsSuite("All test suite");
        for (int i = 0; i < 10; i++) {
            suite.addTestSuite(AutomaticGameTest.class);
            suite.addTestSuite(CompleteGameTest.class);
            suite.addTestSuite(EnterGameMatchTest.class);
            suite.addTestSuite(FinishGame.class);
            suite.addTestSuite(GameMatchStartTest.class);
            suite.addTestSuite(PlayerCantMove.class);
            suite.addTestSuite(PossibleMovesTest.class);
            suite.addTestSuite(RepeatError.class);
        }
        return suite;
    }
}
