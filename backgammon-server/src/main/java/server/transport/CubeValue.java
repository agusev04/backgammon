package server.transport;

/**
 * Класс {@link CubeValue} имплементирует {@link AbstractMessage}, содержит информацию о
 * значениях кубиков для передачи клиентам
 */
public class CubeValue extends Response implements Change {
    protected int cubeValues;
    //TODO (IvchenkoAlexandr) это надо из конструктора убрать, такой логики в конструкторах быть не должно

    public CubeValue(int cubeValues) {
        this.cubeValues = cubeValues;
    }

    public int getCubeValues() {
        return cubeValues;
    }

    @Override
    public String toString() {
        return "CubeValue{" +
                "cubeValues=" + cubeValues +
                ", CLASS_NAME='" + CLASS_NAME + '\'' +
                '}';
    }
}
