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

    public void takeChip() {
        count--;
        if (count == 0) {
            color = NULL;
        }
    }

    public void putChip(char color) {
        count++;
        if ((this.color != color) && (this.color != NULL)) {
            System.out.println("Cell: YOU CAN NOT PUT CHIP ON THIS POSITION. YOUR COLOR IS " + color + "BUT COLOR OF CELL IS" + this.color);
        } else {
            this.color = color;
        }

    }
}