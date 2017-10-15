package server;

import org.apache.catalina.startup.Tomcat;

import java.io.File;

/**
 * Oleg O. Plotnikov
 * Date: 10/10/17
 * Copyright 2017 Connective Games LLC. All rights reserved.
 */
public class Launcher {
    public static void main(String[] args) throws Exception {
        System.out.println("Launcher: Server started");

        String webappDirLocation = "web/src/main/webapp";

        Tomcat tomcat = new Tomcat();
        tomcat.addWebapp("", new File(webappDirLocation).getAbsolutePath());
        tomcat.setPort(8888);
        System.out.println("Launcher: configuring app with basedir: " + new File("" + webappDirLocation).getAbsolutePath());

        tomcat.start();
        tomcat.getServer().await();

    }
}
