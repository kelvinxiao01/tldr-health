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
  insurPlan: string;
}
// const apiUrl = "http://localhost:8000";

function Chatbot({ age, sex, bmi, smoke, insurPlan }: ChatbotProps) {
  const [visible, setVisible] = useState<boolean>(false);
  const [input, setInput] = useState<string>("");
  const [messages, setMessages] = useState<Message[]>([
    { sender: "bot", text: "Hi, how may I help you today?" },
  ]);
  const [loading, setLoading] = useState<boolean>(false);

  // Show the chatbot 2 seconds after the component mounts.
  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 2000);
    return () => clearTimeout(timer);
  }, []);

  async function sendChat() {
    if (!input.trim()) return;
    const userMsg: Message = { sender: "user", text: input };
    setMessages((prev) => [...prev, userMsg]);
    const currentInput =
      age +
      sex +
      bmi +
      "I have no children" +
      smoke +
      `I have the ${insurPlan}.` +
      input +
      "Help me with this.";
    const requestData = { healthHistory: currentInput };
    setInput("");
    setLoading(true);
    try {
      const response = await fetch("/api/chatbot", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(requestData),
      });
      const data = await response.json();

      const botMsg: Message = { sender: "bot", text: data.output };
      setMessages((prev) => [...prev, botMsg]);
    } catch (error) {
      const errorMsg: Message = {
        sender: "bot",
        text: "Sorry, an error occurred.",
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setLoading(false);
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      // sendMessage();
      sendChat();
    }
  };

  if (!visible) return null;

  return (
    <div className="fixed bottom-6 right-6 w-80 md:w-96 bg-white shadow-xl rounded-lg overflow-hidden">
      {/* Header */}
      <header className="bg-gray-100 border-b px-4 py-2">
        <h3 className="text-lg font-medium text-gray-700">Cindy the Chatbot</h3>
      </header>

      {/* Chat Window */}
      <div className="p-4 h-80 md:h-96 overflow-y-auto space-y-3">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`flex ${
              msg.sender === "user" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`max-w-xs px-4 py-2 rounded-lg ${
                msg.sender === "user"
                  ? "bg-blue text-blue-800"
                  : "bg-gray-100 text-gray-800"
              }`}
            >
              <p className="text-sm">{msg.text}</p>
            </div>
          </div>
        ))}
        {loading && (
          <div className="text-center text-gray-500 text-sm">Loading...</div>
        )}
      </div>

      {/* Input Area */}
      <footer className="border-t px-4 py-2 bg-gray-50">
        <div className="flex">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type your message..."
            className="flex-grow border border-gray-300 rounded-l-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <button
            onClick={sendChat}
            className="bg-blue-500 hover:bg-blue-600 text-white rounded-r-md px-4 py-2 transition-colors duration-200"
          >
            Send
          </button>
        </div>
      </footer>
    </div>
  );
}

export default Chatbot;
