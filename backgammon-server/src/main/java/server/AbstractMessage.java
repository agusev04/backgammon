package server;

import game.logics.Game;

public abstract class AbstractMessage { //От этого класса наследуются передаваемые объекты
    final String CLASS_NAME = this.getClass().getSimpleName(); //обязательное поле которое используется для определения какой класс отправлен!!!!!!
    public String getClassName() { //бесполезный геттер который никогда не вызовется)))
        return CLASS_NAME;
    }

    //TODO (IvchenkoAlexandr) Бесполезное убрать.

    abstract public AbstractMessage apply(MySession mySession) throws GameErrors; //для реализации шаблона декоратор

    //TODO (IvchenkoAlexandr) зачем метод getValues? Если считаешь, что он нужен - надо обсудить.
    @Deprecated
    abstract public void getValues(Game game);

    //TODO (IvchenkoAlexandr) раз этот класс является и запросом и ответом, то должен быть конструктор для создания ответов

}
