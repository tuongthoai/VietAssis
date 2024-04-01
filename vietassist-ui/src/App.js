import React, { useState, useEffect, useRef } from "react";
import ReactMarkdown from "react-markdown";
import axios from "axios";
import io from "socket.io-client";
import "./App.css";

const ENDPOINT = "http://localhost:3001"; // Địa chỉ máy chủ backend

const App = () => {
  const [chat, setChat] = useState([]);
  const [isDivVisible, setDivVisible] = useState(false);
  const endOfMessagesRef = useRef(null);
  const inputRef = useRef();

  const [messages, setMessages] = useState("");
  const [prompt, setPrompt] = useState("");
  const [response, setResponse] = useState("");

  const triggerData = (msg) => {
    console.log(msg);
    addObjectToArray("message-left", msg.answer);
    setDivVisible(false);
  };

  useEffect(() => {
    handleGreeting(true)
    setDivVisible(false);
  }, []);

  const handleGreeting = (intro) => {
    if(intro){
      addObjectToArray("message-left", "Cảm ơn bạn đã sử dụng VietAssist. Chúng tôi có thể hỗ trợ bạn về chỉnh sửa văn bản.");
    }
  };

  useEffect(() => {
    const socket = io(ENDPOINT);
    socket.on("objectEmit", triggerData);

    return () => {
      socket.disconnect();
    };
  }, []);

  const handleSubmit = async (e) => {
    addObjectToArray("message-right", prompt);
    setDivVisible(true);
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:3001/api/chat/create",
        { prompt }
      );
      setResponse(response.data); // Cập nhật phản hồi từ backend
    } catch (error) {
      console.error("There was a problem with your fetch operation:", error);
    }
  };

  const addObjectToArray = (side, chatText) => {
    const randomNumber = Math.floor(1 + Math.random() * 9999);
    const newObject = {
      id: randomNumber,
      side: side,
      text: chatText,
    };
    appendToChat(newObject);
  };

  const appendToChat = (newObject) => {
    setChat((prevChat) => [...prevChat, newObject]);
  };

  return (
    <>
    <div className="container">
        <div className="content">
          <div className="message-container" style={{ overflow: "auto" }}>
            {chat.map((object) => (
              <div key={object.id} className={object.side}>
                {object.text}
              </div>
            ))}

            <div className="question-container">
              <input
                id="question"
                type="text"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                ref={inputRef}
                className="question-textbox"
                placeholder="Nhập câu hỏi"
              ></input>
              <button
                onClick={handleSubmit}
                id="questionButton"
                type="submit"
                className="button"
              > Gửi
              </button>
            </div>
          </div>
        </div>
        {/* <ReactMarkdown>{messages}</ReactMarkdown> */}
      </div>
    </>
  );
};

export default App;
