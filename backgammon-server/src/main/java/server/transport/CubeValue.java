package server.transport;

import game.logics.Player;

/**
 * Класс {@link CubeValue} имплементирует {@link AbstractMessage}, содержит информацию о
 * значениях кубиков для передачи клиентам
 */
public class CubeValue extends AbstractMessage {
    protected int cubeValues;
    //TODO (IvchenkoAlexandr) это надо из конструктора убрать, такой логики в конструкторах быть не должно

    public CubeValue(int cubeValues) {
        this.cubeValues = cubeValues;
    }

    @Override
    public AbstractMessage apply(Player player) {
        return null;
    }

    public int getCubeValues() {
        return cubeValues;
    }
}
