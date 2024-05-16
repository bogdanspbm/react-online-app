package com.emkn.backend.datastore;

import java.sql.Connection;
import java.sql.DriverManager;
import java.util.Properties;

public abstract class DataStore {

    private Connection connection;

    public Connection getConnection() {
        return connection;
    }

    public void createConnection(String url) {
        try {
            Properties props = new Properties();
            props.setProperty("user", "postgres");
            props.setProperty("password", "1234");
            connection = DriverManager.getConnection(url, props);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    static DataStore createDataStore() {
        return null;
    }
}

