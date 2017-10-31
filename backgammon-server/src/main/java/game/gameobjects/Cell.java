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

    @Deprecated
    public void setCell(char cl, int cn){ //TODO (Michael) сокращенные названия параметров затрудняют работу
        //TODO (Michael) Некорретный метод, она позволяет ячейке менять цвет и проставлять любое число в поле, а это
        // правилами запрещено. Такое мы делаем только при создании стола, значит лучще эти действия производить в конструкторе.
        //А функциями делать то, что можно - прибавлять к числу фишек 1. Сбрасывать в 0 (при съедении фишки противника).
        color = cl;
        count = cn;
    }
}