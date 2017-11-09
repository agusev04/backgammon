package game.gameobjects;


public class Cell {
    public static final char WHITE = 'w';
    public static final char BLACK = 'b';
    public static final char NULL = 'n';
    public char color; // цвет
    public int count;  // количество


    Cell() {
        color = NULL;
        count = 0;
    }

    Cell(char color, int count) {
        this.color = color;
        this.count = count;
    }

    public char getColor() {
        return color;
    }

    public void setColor(char color) {
        this.color = color;
    }

    public int getCount() {
        return count;
    }

    public void setCount(int count) {
        this.count = count;
    }


    public void setCell(char color, int count) {
        this.color = color;
        this.count = count;
    }
}