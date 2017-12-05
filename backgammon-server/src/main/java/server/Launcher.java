package server;

import org.apache.catalina.startup.Tomcat;
import org.apache.log4j.Logger;

import java.io.File;

/**
 * Oleg O. Plotnikov
 * Date: 10/10/17
 * Copyright 2017 Connective Games LLC. All rights reserved.
 */
public class Launcher {
    public static void main(String[] args) throws Exception {

//        System.setProperty("log4j.configuration", new File(".", File.separatorChar+"log4j.properties").toURL().toString());
//        ClassLoader contextClassLoader = Thread.currentThread().getContextClassLoader();
//        Logger loger = Logger.getLogger(Launcher.class);
//        System.out.println("************************"+contextClassLoader.getResource("."));
        System.out.println("Launcher: Server started");
        String webappDirLocation = "web-test";
        Tomcat tomcat = new Tomcat();
        tomcat.addWebapp("", new File(webappDirLocation).getAbsolutePath());
        tomcat.setPort(8888);
        System.out.println("Launcher: configuring app with basedir: " + new File("" + webappDirLocation).getAbsolutePath());

        tomcat.start();
        tomcat.getServer().await();

    }
}
