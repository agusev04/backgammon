import game.gameobjects.Cell;
import game.logics.GameError;
import game.logics.GameMatch;
import game.logics.Player;
import server.transport.AbstractMessage;
import server.transport.ChipsPosition;
import server.transport.Move;
import server.transport.PackageMessage;
import support.AbstractTest;


public class RepeatError extends AbstractTest {

    private static final String WHITE = "0";
    private static final String BLACK = "1";

    public void testPlayerFinishGame() throws Exception, GameError {


            PackageMessage packageMessage = enter("0", "Tom");
            Player whitePlayer = getPlayers().get("0");
            GameMatch gameMatch = whitePlayer.getGameMatch();
            PackageMessage packageMessage1 = enter("1", "Sam");
            Player blackPlayer = getPlayers().get("1");


            gameMatch.getTable().cells[1].setCell(Cell.NULL, 0);
            gameMatch.getTable().cells[6].setCell(Cell.NULL, 0);
            gameMatch.getTable().cells[8].setCell(Cell.NULL, 0);
            gameMatch.getTable().cells[12].setCell(Cell.NULL, 0);
            gameMatch.getTable().cells[13].setCell(Cell.NULL, 0);
            gameMatch.getTable().cells[17].setCell(Cell.NULL, 0);
            gameMatch.getTable().cells[19].setCell(Cell.NULL, 0);
            gameMatch.getTable().cells[24].setCell(Cell.NULL, 0);


            gameMatch.getTable().cells[19].setCell(Cell.WHITE, 3);
            gameMatch.getTable().cells[20].setCell(Cell.WHITE, 2);
            gameMatch.getTable().cells[21].setCell(Cell.WHITE, 5);
            gameMatch.getTable().cells[23].setCell(Cell.WHITE, 4);
            gameMatch.getTable().cells[24].setCell(Cell.WHITE, 1);

            gameMatch.getTable().cells[1].setCell(Cell.BLACK, 11);
            gameMatch.getTable().cells[11].setCell(Cell.BLACK, 1);
            gameMatch.getTable().cells[22].setCell(Cell.BLACK, 1);
            gameMatch.getTable().cells[25].setCell(Cell.BLACK, 2);

        checkWhitePositions(gameMatch,
                new ChipsPosition(19, 3),
                new ChipsPosition(20, 2),
                new ChipsPosition(21, 5),
                new ChipsPosition(23, 4),
                new ChipsPosition(24, 1)
        );
        checkBlackPositions(gameMatch,
                new ChipsPosition(1, 11),
                new ChipsPosition(11, 1),
                new ChipsPosition(22, 1),
                new ChipsPosition(25, 2)
        );

        AbstractMessage response = throwCube(WHITE, 35);

        checkPossibleMoves(response,
                new Move(19, 22),
                new Move(20, 23),
                new Move(21, 24),
                new Move(19, 24),
                new Move(20, 26)
                );

        /*
        * Класс GameMatch 409 строка, конструкция if-else заменена на два if, так как, не зайдя в if, программа
        * не смотрела на else if и отдавала false. Поэтому не появлялся возможных ход вывода фишки с игры.
        */


        }
}