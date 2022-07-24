import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import io from "socket.io-client";
import { useState } from "react";

const socket = io("http://localhost:5050");

export default function Home() {
  const [message, setMessage] = useState("");
  const [list, setList] = useState([]);

  const handleSubmit = () => {
    // send message to server
    socket.emit("send_message", { message: message });
    setMessage("");
  };

  // listen for message from server
  socket.on("received_message", (data) => {
    console.log(data);
    setList([...list, data]);
  });

  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="flex flex-col items-center justify-center">
        <h2>Chat App</h2>
        <div className={styles.chatInputButton}>
          <input
            type="text"
            placeholder="message..."
            onChange={(e) => {
              setMessage(e.target.value);
            }}
            value={message}
          />
          <button onClick={() => handleSubmit()}>Submit</button>
        </div>
        {list.map((chat) => (
          <div className={styles.chatArea} key={chat.message}>
            {chat.message}
          </div>
        ))}
      </div>
    </div>
  );
}
