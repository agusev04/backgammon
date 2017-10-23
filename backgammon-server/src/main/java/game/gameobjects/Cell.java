package game.gameobjects;


public class Cell {
        public char color; // цвет
        public int count;  // количество

    Cell() {
        color = 'N';
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