package server.transport;

import game.logics.GameMatch;

public class ChipsCounter extends Response implements Change {

    int blackChipCounter;
    int whiteChipCounter;


    public ChipsCounter(GameMatch gameMatch) {
        blackChipCounter = gameMatch.getTable().getBlackCounter();
        whiteChipCounter = gameMatch.getTable().getWhiteCounter();
    }

    public ChipsCounter(int blackChipCounter, int whiteChipCounter) {
        this.blackChipCounter = blackChipCounter;
        this.whiteChipCounter = whiteChipCounter;
    }
}
