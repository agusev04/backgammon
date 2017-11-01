package server.transport;

import game.logics.Player;

public abstract class AbstractMessage { //От этого класса наследуются передаваемые объекты
    final String CLASS_NAME = this.getClass().getSimpleName(); //обязательное поле которое используется для определения какой класс отправлен!!!!!!

    abstract public AbstractMessage apply(Player player); //для реализации шаблона декоратор

    //TODO (IvchenkoAlexandr) раз этот класс является и запросом и ответом, то должен быть конструктор для создания ответов

}
