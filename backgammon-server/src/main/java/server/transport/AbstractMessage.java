package server.transport;

import game.logics.Player;

/**
 * Класс {@link AbstractMessage} реализует шаблон декоратор, является базовым классом
 * транспортных объектов, имеет поле CLASS_NAME, по которому происходит парсинг JSON объект
 */
public abstract class AbstractMessage {
    final String CLASS_NAME = this.getClass().getSimpleName();

    abstract public AbstractMessage apply(Player player);
}
