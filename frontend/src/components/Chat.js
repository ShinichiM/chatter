import React from "react";
import Card from "react-bootstrap/Card";

export default function Chat({ user, messages }) {
  return (
    <Card className="shadow-sm mb-1 mx-auto" style={{ width: "95%" }}>
      <Card.Body className="px-3">
        <Card.Title className="m-0">{user}</Card.Title>
        <Card.Text className="">{messages}</Card.Text>
      </Card.Body>
    </Card>
  );
}
