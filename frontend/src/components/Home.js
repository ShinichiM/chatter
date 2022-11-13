import React from "react";
import Chat from "./Chat";

export default function Home() {
  return (
    <>
      <header>Chats</header>
      <span>All Messages</span>
      <section>
        <Chat user={"chad"} messages={"Not sure how to set this up."} />
        <Chat user={"lad"} messages={"Not sure how to set this up."} />
        <Chat user={"mad"} messages={"Not sure how to set this up."} />
        <Chat user={"sad"} messages={"Not sure how to set this up."} />
      </section>
    </>
  );
}
