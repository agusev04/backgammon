package server.transport;

public class ChipsPosition extends Response {
    int position;
    int quantity;

    public ChipsPosition(int position, int quantity) {
        this.position = position;
        this.quantity = quantity;
    }

    public int getPosition() {
        return position;
    }

    public int getQuantity() {
        return quantity;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        ChipsPosition that = (ChipsPosition) o;

        if (position != that.position) return false;
        return quantity == that.quantity;
    }

    @Override
    public int hashCode() {
        int result = position;
        result = 31 * result + quantity;
        return result;
    }

    @Override
    public String toString() {
        return "{" +
                position + ", " +
                quantity +
                '}';
    }
}
