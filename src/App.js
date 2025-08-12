"use client"

import { useState, useRef, useEffect } from "react"
import { Send, Bot, User, Loader2 } from "lucide-react"
import axios from "axios"
import "./App.css" // Import CSS

export default function ChatPage() {
  const [messages, setMessages] = useState([])
  const [prompt, setPrompt] = useState("")
  const [loading, setLoading] = useState(false)
  const messagesEndRef = useRef(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!prompt.trim() || loading) return

    const userMessage = {
      id: Date.now().toString(),
      content: prompt,
      role: "user",
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setPrompt("")
    setLoading(true)

    try {
      const res = await axios.post("http://localhost:4000/gemini", { prompt })

      const assistantMessage = {
        id: (Date.now() + 1).toString(),
        content: res.data.output,
        role: "assistant",
        timestamp: new Date(),
      }

      setMessages((prev) => [...prev, assistantMessage])
    } catch (error) {
      console.error(error)
      const errorMessage = {
        id: (Date.now() + 1).toString(),
        content: "Sorry, I encountered an error while processing your request. Please try again.",
        role: "assistant",
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, errorMessage])
    } finally {
      setLoading(false)
    }
  }

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSubmit(e)
    }
  }

  return (
    <div className="chat-container">
      {/* Header */}
      <div className="chat-header">
        <div className="chat-header-content">
          <Bot className="icon bot-icon" />
          <h1 className="chat-title">Gemini AI Chat</h1>
        </div>
      </div>

      {/* Messages */}
      <div className="chat-messages">
        {messages.length === 0 ? (
          <div className="empty-state">
            <Bot className="icon empty-bot" />
            <h2 className="empty-title">How can I help you today?</h2>
            <p className="empty-subtitle">Start a conversation with Gemini AI</p>
          </div>
        ) : (
          messages.map((message) => (
            <div
              key={message.id}
              className={`message-wrapper ${message.role === "user" ? "user" : "assistant"}`}
            >
              {message.role === "assistant" && (
                <div className="avatar bot-avatar">
                  <Bot className="icon avatar-icon" />
                </div>
              )}
              <div className={`message-card ${message.role}`}>
                {message.content}
              </div>
              {message.role === "user" && (
                <div className="avatar user-avatar">
                  <User className="icon avatar-icon" />
                </div>
              )}
            </div>
          ))
        )}

        {loading && (
          <div className="message-wrapper assistant">
            <div className="avatar bot-avatar">
              <Bot className="icon avatar-icon" />
            </div>
            <div className="message-card assistant">
              <Loader2 className="icon loading-icon" />
              Thinking...
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="chat-input-area">
        <form onSubmit={handleSubmit} className="input-form">
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Message Gemini AI..."
            disabled={loading}
            className="chat-textarea"
          />
          <button
            type="submit"
            disabled={!prompt.trim() || loading}
            className="send-button"
          >
            <Send className="icon send-icon" />
          </button>
        </form>
        <p className="input-hint">Press Enter to send, Shift + Enter for new line</p>
      </div>
    </div>
  )
}
