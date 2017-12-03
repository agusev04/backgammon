package server.transport;

public class MoveBar extends Response implements Change {

    char color;
    int from;

    public MoveBar(char color, int from) {
        this.color = color;
        this.from = from;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        MoveBar moveBar = (MoveBar) o;

        if (color != moveBar.color) return false;
        return from == moveBar.from;
    }

    @Override
    public int hashCode() {
        int result = (int) color;
        result = 31 * result + from;
        return result;
    }

    @Override
    public String toString() {
        return "MoveBar{" +
                "color=" + color +
                ", from=" + from +
                ", CLASS_NAME='" + CLASS_NAME + '\'' +
                '}';
    }
}
