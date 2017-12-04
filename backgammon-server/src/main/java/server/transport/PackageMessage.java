package server.transport;

import java.util.ArrayList;

public class PackageMessage extends Response implements AbstractMessage {

    GameState gameState;
    ArrayList<Change> changeArrayList = new ArrayList<>();

    public PackageMessage(GameState gameState) {
        this.gameState = gameState;
    }

    public PackageMessage() {

    }


    public GameState getGameState() {
        return gameState;
    }

    public ArrayList<Change> getChangeArrayList() {
        return changeArrayList;
    }

    public void addChange(Change change) {
        if (change != null) {
            changeArrayList.add(change);
        }
    }

    public <C extends Change> C getChange(Class<C> klass) {
        C change = null;
        for (Change change1 : changeArrayList) {
            if (change1.getClass() == klass) {
                if (change != null) {
                    System.out.println("PackageMessage: Message has more than one change of that class");
                }
                change = (C) change1;
            }
        }
        if (change == null) {
            System.out.println("PackageMessage: Message has not change of this class");
        }
        return change;
    }

    @Override
    public String toString() {
        return "PackageMessage{" +
                "gameState=" + gameState +
                ", changeArrayList=" + changeArrayList +
                ", CLASS_NAME='" + CLASS_NAME + '\'' +
                '}';
    }
}


