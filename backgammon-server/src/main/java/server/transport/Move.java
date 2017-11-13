package server.transport;

/**
 * Класс {@link Move} содержит информацию о ходе (или возможно ходе) игрока
 */
public class Move implements Change {

    public int from;
    public int to;

    public Move(int from, int to) {
        this.from = from;
        this.to = to;

    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        Move move = (Move) o;

        if (from != move.from) return false;
        return to == move.to;
    }

    @Override
    public int hashCode() {
        int result = from;
        result = 31 * result + to;
        return result;
    }
}
