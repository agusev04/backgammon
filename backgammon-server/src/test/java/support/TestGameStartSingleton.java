package support;

import server.transport.GameStart;

public class TestGameStartSingleton {
    private static TestGameStartSingleton ourInstance = new TestGameStartSingleton();

    public static TestGameStartSingleton getInstance() {
        return ourInstance;
    }

    private TestGameStartSingleton() {
    }

    GameStart []starts = new GameStart[2];
    private int number = 0;

    public void setStarts(GameStart start){
        if(number<2){
            starts[number] = start;
            number++;
        }
    }

    public GameStart[] getStarts() {
        return starts;
    }
}
