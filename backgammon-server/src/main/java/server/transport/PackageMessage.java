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


    public void addChange(Change change) {
        changeArrayList.add(change);
    }

    public Change getChange(String className) {
        Change change = null;
        for (Change change1 : changeArrayList) {
            if (className.equals(change1.getClass().getSimpleName())) {
                if (change != null) {
                    System.out.println("PackageMessage: Message has more than one change");
                }
                change = change1;
            }
        }
        if (change == null) {
            System.out.println("PackageMessage: Message has not this change");
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


