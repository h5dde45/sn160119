package com.example.demo.sockets;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.PrintWriter;
import java.net.Socket;

public class Client {
    public static void main(String[] args) throws IOException {
        try (
                Socket socket = new Socket("localhost", 8080);
                PrintWriter out = new PrintWriter(socket.getOutputStream(), true);
                BufferedReader in = new BufferedReader(new InputStreamReader(socket.getInputStream()))
        ) {
            String inputLine;

            out.println(1);
            System.out.println("have wrote to server: 1");

            while ((inputLine = in.readLine()) != null) {
                System.out.println("have read from server: " + inputLine);
                int number = Integer.parseInt(inputLine);
                if (number >= 10) {
                    break;
                }
                number++;
                out.println(number);
                System.out.println("have wrote to server: " + number);
                Thread.sleep(2222);
            }
            System.out.println("disconnecting...");

        } catch (Throwable cause) {
            System.out.println("Connection error: " + cause.getMessage());
        }
    }
}
