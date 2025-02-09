"use client";

import React, { useState, useEffect } from "react";

interface Message {
  sender: "user" | "bot";
  text: string;
}
interface ChatbotProps {
  age: string | number;
  sex: string;
  bmi: string | number;

  smoke: string;
}
// const apiUrl = "http://localhost:8000";

const apiUrl = "https://fastapi-catboost-app-805184794120.us-central1.run.app";

function Chatbot({ age, sex, bmi, smoke }: ChatbotProps) {
  const [visible, setVisible] = useState<boolean>(false);
  const [input, setInput] = useState<string>("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  // Show the chatbot 2 seconds after the component mounts.
  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 2000);
    return () => clearTimeout(timer);
  }, []);

  const sendMessage = async () => {
    if (!input.trim()) return;

    // Append the user's message.
    const userMsg: Message = { sender: "user", text: input };
    setMessages((prev) => [...prev, userMsg]);
    // Save the current input value before clearing it.
    const currentInput = input + age + sex + bmi + "I have no children" + smoke;
    setInput("");
    setLoading(true);

    try {
      // Send a POST request with the user_query as a query parameter.
      const response = await fetch(
        `${apiUrl}/llm_response?user_query=${encodeURIComponent(currentInput)}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
        }
      );
      const data = await response.json();
      // Assuming the backend now returns a string response,
      // if the data is an object, you might need to extract the desired field.
      const botMsg: Message = { sender: "bot", text: data };
      setMessages((prev) => [...prev, botMsg]);
    } catch (error) {
      console.error("Error fetching chatbot response:", error);
      const errorMsg: Message = {
        sender: "bot",
        text: "Sorry, an error occurred.",
      };
      setMessages((prev) => [...prev, errorMsg]);
    }
    setLoading(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      sendMessage();
    }
  };

  if (!visible) return null;

  return (
    <div className="fixed bottom-4 right-4 w-80 bg-white shadow-lg border p-4 rounded">
      <h3 className="mb-2 text-lg font-semibold">Chatbot</h3>
      <div className="mb-2 h-48 overflow-y-auto border p-2">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={msg.sender === "user" ? "text-right" : "text-left"}
          >
            <span
              className={
                msg.sender === "user" ? "text-blue-600" : "text-green-600"
              }
            >
              {msg.sender === "user" ? "You" : "Bot"}
            </span>
            {": "}
            {msg.text}
          </div>
        ))}
        {loading && <div className="text-gray-500">Loading...</div>}
      </div>
      <div className="flex">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Type your message..."
          className="flex-grow border rounded px-2 py-1"
        />
        <button
          onClick={sendMessage}
          className="ml-2 bg-blue-500 text-white px-3 py-1 rounded"
        >
          Send
        </button>
      </div>
    </div>
  );
}

export default Chatbot;
