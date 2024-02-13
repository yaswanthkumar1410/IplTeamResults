package com.yaswanth.IplTeamResults.batch;




import com.yaswanth.IplTeamResults.Entity.Team;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.SQLException;
import java.util.Map;

public class CheckH2Connection {
    public void teaminsert(Map<String, Team> teamData) {
        // JDBC URL, username, and password of H2 database
        String url = "jdbc:h2:mem:testdb";
        String user = "sa";
        String password = "";

        try {
            // Register JDBC driver
            Class.forName("org.h2.Driver");

            // Open a connection
            Connection connection = DriverManager.getConnection(url, user, password);

            // Check if the connection is successful
            if (connection != null) {
                System.out.println("Connected to H2 database");

            } else {
                System.out.println("Failed to connect to H2 database");
            }
            String insertQuery = "INSERT INTO team (total_matches, total_wins, team_name) VALUES (?, ?, ?)";

            // Create a PreparedStatement
            PreparedStatement preparedStatement = connection.prepareStatement(insertQuery);

            // Set values for placeholders (?)
            for(String string: teamData.keySet()){
                Team team = teamData.get(string);
                preparedStatement.setLong(1, team.getTotalMatches());
                preparedStatement.setLong(2, team.getTotalWins());
                preparedStatement.setString(3, team.getTeamName());
                // Execute the insert statement
                int rowsAffected = preparedStatement.executeUpdate();
                if (rowsAffected > 0) {
                    System.out.println("Data inserted successfully");
                } else {
                    System.out.println("Failed to insert data");
                }
            }

            // Check the result


            // Close resources
            preparedStatement.close();
            connection.close();

        } catch (ClassNotFoundException | SQLException e) {
            e.printStackTrace();
        }
    }
}
