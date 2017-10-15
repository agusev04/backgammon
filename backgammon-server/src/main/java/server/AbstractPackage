package server;

public abstract class AbstractPackage { //От этого класса наследуются передаваемые объекты
    final String CLASS_NAME = this.getClass().getName(); //обязательное поле которое используется для определения какой класс отправлен!!!!!!
    public String getClassName() { //бесполезный геттер который никогда не вызовется)))
        return CLASS_NAME;
    }

    abstract public void apply(GameLogic logic); //для реализации шаблона декоратор


}
