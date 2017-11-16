package server.transport;

public class Final extends Response implements Change {
    char color;
    String playerName;

    public Final(char color, String playerName) {
        this.color = color;
        this.playerName = playerName;
    }

    @Override
    public String toString() {
        return "Final{" +
                "color=" + color +
                ", playerName='" + playerName + '\'' +
                ", CLASS_NAME='" + CLASS_NAME + '\'' +
                '}';
    }
}
