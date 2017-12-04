package server.transport;

/**
 * Класс {@link Move} содержит информацию о ходе (или возможно ходе) игрока
 */
public class Move extends Response implements Change {

    public int from;
    public int to;

    public Move(int from, int to) {
        if(to == 0){
            this.to = 27;
        } else if(to == 25){
            this.to = 27;
        } else{
            this.to = to;
        }
        this.from = from;


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

    @Override
    public String toString() {
        return "Move{" +
                "from=" + from +
                ", to=" + to +
                ", CLASS_NAME='" + CLASS_NAME + '\'' +
                '}';
    }
}
