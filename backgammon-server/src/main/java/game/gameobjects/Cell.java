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


    public void setCell(char color, int count) { //TODO (Michael) сокращенные названия параметров затрудняют работу
        //TODO (Michael) Некорретный метод, она позволяет ячейке менять цвет и проставлять любое число в поле, а это
        // правилами запрещено. Такое мы делаем только при создании стола, значит лучще эти действия производить в конструкторе.
        //А функциями делать то, что можно - прибавлять к числу фишек 1. Сбрасывать в 0 (при съедении фишки противника).
        this.color = color;
        this.count = count;
    }
}