package game.gameobjects;

public class GameTable {
    Cell[] gameTable = new Cell[24];

    public GameTable() {
        gameTable[0].setCell('W', 2);
        gameTable[5].setCell('B', 5);
        gameTable[7].setCell('B', 3);
        gameTable[11].setCell('W', 5);
        gameTable[12].setCell('B', 5);
        gameTable[16].setCell('W', 3);
        gameTable[18].setCell('W', 5);
        gameTable[23].setCell('B', 2);
    }

    public void ShowGameTable(){
        for(int i =0; i < gameTable.length; i++) {
            System.out.println(gameTable[i].color + " " + gameTable[i].count);
        }
    }

}
