package server;

public abstract class AbstractMessage { //От этого класса наследуются передаваемые объекты
    final String CLASS_NAME = this.getClass().getSimpleName(); //обязательное поле которое используется для определения какой класс отправлен!!!!!!
    public String getClassName() { //бесполезный геттер который никогда не вызовется)))
        return CLASS_NAME;
    }

    abstract public AbstractMessage apply(GameLogic logic); //для реализации шаблона декоратор

    abstract public void getValues(GameLogic logic);
}