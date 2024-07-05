import mysql from "mysql2/promise";

const config = {
  host: "127.0.0.1",
  user: "root",
  port: "3306",
  password: "jimenez7",
  database: "messagesTable",
};
const connection = await mysql.createConnection(config);

export class messageModel {
  static async getAll() {
    const [messages, tableInfo] = await connection.query(
      "SELECT content FROM messages"
    );
    return messages;
  }
  static async addMessage(message) {
    const [newMessage, tableInfo] = await connection.query(
      "INSERT INTO messages (content) VALUES (?);",
      [message]
    );
    return newMessage;
  }
  static async findUser(id) {
    const [user, tableInfo] = await connection.query(
      "SELECT name FROM users where id = ?;",
      [id]
    );
    return user;
  }
  static deleteMessages() {
    connection.query("DELETE FROM messages where id >0;");
  }
  static async lastId(){
    const [lastId, tableInfo] = await connection.query(
      "SELECT id FROM messages ORDER BY id DESC LIMIT 1;"
    );
    return lastId;
  }
}