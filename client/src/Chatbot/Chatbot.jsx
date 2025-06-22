import { useState, useRef } from "react";
import HeaderBanner from "../Others/Banners/HeaderBanner";
import Navbar from "../Others/components/Navbar";
import queries from "./chatbot_assets/queries";
import answers from "./chatbot_assets/answers";
import "bootstrap-icons/font/bootstrap-icons.css";

const Chatbot = () => {
  const [messages, setMessages] = useState([
    { sender: "bot", text: "Hi! How can I assist you today?" },
  ]);
  const [input, setInput] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [isTyping, setIsTyping] = useState(false);
  const messageEndRef = useRef(null);

  const categories = ["All", ...new Set(queries.map((q) => q.category))];
  const filteredQueries =
    selectedCategory === "All"
      ? []
      : queries.filter((q) => q.category === selectedCategory);

  const sendMessage = () => {
    if (!input.trim()) return;
    const userMsg = { sender: "user", text: input };
    const newMessages = [...messages, userMsg];
    setMessages(newMessages);
    setInput("");
    handleBotResponse(input, newMessages);
  };

  const handleBotResponse = (userInput, currentMessages) => {
    let response = "I'm not sure how to help with that.";
    const matched = queries.find((q) =>
      userInput.toLowerCase().includes(q.prompt.toLowerCase())
    );
    if (matched) response = answers[matched.prompt] || response;

    setIsTyping(true);
    setTimeout(() => {
      setMessages([
        ...currentMessages,
        { sender: "bot", text: response, reacted: false },
      ]);
      setIsTyping(false);
    }, 1000);
  };

  const handleReaction = (index, emoji) => {
    const updated = [...messages];
    updated[index].text += ` ${emoji}`;
    updated[index].reacted = true;
    setMessages(updated);
  };

  const resetChat = () => {
    setMessages([{ sender: "bot", text: "Hi! How can I assist you today?" }]);
    setInput("");
    setSelectedCategory("All");
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") sendMessage();
  };

  const handlePromptClick = (prompt) => {
    setInput(prompt);
    sendMessage();
  };

  return (
    <div className="bg-light min-vh-100 d-flex flex-column">
      <HeaderBanner />
      <Navbar />

      <div className="container flex-grow-1 d-flex flex-column py-4 overflow-hidden">
        <div className="card shadow-lg border-0 flex-grow-1 d-flex flex-column">
          <div className="card-header bg-primary text-white d-flex justify-content-between align-items-center">
            <h5 className="mb-0">
              <i className="bi bi-robot me-2"></i>AI Support Assistant
            </h5>
            <button
              className="btn btn-outline-light btn-sm"
              onClick={resetChat}
            >
              🔄 New Conversation
            </button>
          </div>

          {/* Chat Window */}
          <div
            className="card-body flex-grow-1"
            style={{ overflowY: "auto", position: "relative" }}
          >
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`d-flex mb-3 ${
                  msg.sender === "user"
                    ? "justify-content-end"
                    : "justify-content-start"
                }`}
              >
                <div
                  className={`p-3 shadow-sm ${
                    msg.sender === "user" ? "bg-success text-white" : "bg-white"
                  } rounded-pill position-relative`}
                  style={{ maxWidth: "75%", wordBreak: "break-word" }}
                >
                  {msg.text}
                  {msg.sender === "bot" && !msg.reacted && (
                    <div className="mt-2 d-flex gap-2">
                      <button
                        className="btn btn-outline-secondary btn-sm rounded-pill"
                        onClick={() => handleReaction(idx, "👍")}
                      >
                        👍
                      </button>
                      <button
                        className="btn btn-outline-secondary btn-sm rounded-pill"
                        onClick={() => handleReaction(idx, "👎")}
                      >
                        👎
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="d-flex justify-content-start mb-2">
                <div className="bg-white p-3 rounded-pill shadow-sm">
                  <span className="typing-dots">Typing...</span>
                </div>
              </div>
            )}
            <div ref={messageEndRef}></div>
          </div>

          {/* Footer Section */}
          <div className="card-footer bg-white">
            {/* Category Dropdown */}
            <div className="mb-3">
              <select
                className="form-select"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            {/* Suggestions */}
            <div
              className="d-flex flex-wrap gap-2 mb-3"
              style={{ maxHeight: "150px", overflowY: "auto" }}
            >
              {selectedCategory === "All"
                ? categories
                    .filter((c) => c !== "All")
                    .map((c) => (
                      <button
                        key={c}
                        className="btn btn-outline-info btn-sm rounded-pill"
                        onClick={() => setSelectedCategory(c)}
                      >
                        <i className="bi bi-folder2-open me-1"></i>
                        {c}
                      </button>
                    ))
                : filteredQueries.map((q) => (
                    <button
                      key={q.id}
                      className="btn btn-outline-secondary btn-sm rounded-pill"
                      onClick={() => handlePromptClick(q.prompt)}
                    >
                      <i className="bi bi-lightbulb me-1"></i>
                      {q.prompt}
                    </button>
                  ))}
            </div>

            {/* Input Bar */}
            <div className="input-group">
              <input
                type="text"
                className="form-control rounded-pill"
                placeholder="Type your question..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={handleKeyPress}
              />
              <button
                className="btn btn-primary ms-2 rounded-pill"
                onClick={sendMessage}
              >
                <i className="bi bi-send"></i> Send
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chatbot;
