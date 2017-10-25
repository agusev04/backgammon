package game.gameobjects;


public class Cell {
    public static final char WHITE = 'W';
    public static final char BLACK = 'B';
    public static final char NULL = 'N';
        public char color; // цвет
        public int count;  // количество



    Cell() {
        color = NULL;
        count = 0;
    }

    Cell(char cl, int cn){
        color = cl;
        count = cn;
    }

    public void setColor(char color) {
        this.color = color;
    }

    public void setCount(int count) {
        this.count = count;
    }

    public char getColor() {
        return color;
    }

    public int getCount() {
        return count;
    }

    public void setCell(char cl, int cn){
        color = cl;
        count = cn;
    }
}