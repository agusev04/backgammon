package server.transport;

/**
 * Класс {@link Move} содержит информацию о ходе (или возможно ходе) игрока
 */
public class Move {

    public int firstPosition;
    public int secondPosition;

    public Move(int firstPosition, int secondPosition) {
        this.firstPosition = firstPosition;
        this.secondPosition = secondPosition;

    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        Move move = (Move) o;

        if (firstPosition != move.firstPosition) return false;
        return secondPosition == move.secondPosition;
    }

    @Override
    public int hashCode() {
        int result = firstPosition;
        result = 31 * result + secondPosition;
        return result;
    }
}
