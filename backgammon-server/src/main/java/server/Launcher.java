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
        loadLogger();
        final Logger logger = Logger.getLogger(Launcher.class);
        logger.info("Server started");
        String webappDirLocation = "web-test";
        Tomcat tomcat = new Tomcat();
        tomcat.addWebapp("", new File(webappDirLocation).getAbsolutePath());
        tomcat.setPort(8888);
        logger.info("configuring app with basedir: " + new File("" + webappDirLocation).getAbsolutePath());

        tomcat.start();
        tomcat.getServer().await();

    }

    public static void loadLogger(){
        System.setProperty("log4j.configuration", new File(".", File.separatorChar+"log4j.properties").toURI().toString());
    }
}
