import { useMemo, useState } from "react";

const quickReplies = [
  "How do I book a stay?",
  "How do I cancel a booking?",
  "Where is my wishlist?",
  "How do I reset my password?"
];

const getBotReply = (message) => {
  const normalized = message.toLowerCase();

  if (normalized.includes("book")) {
    return "Open any listing, choose your dates, enter guest and reservation details, then continue through checkout to confirm the stay.";
  }

  if (normalized.includes("cancel")) {
    return "Go to Trips, open your booking card, and use the cancel booking button. You will also receive a cancellation notification.";
  }

  if (normalized.includes("wishlist") || normalized.includes("favorite")) {
    return "You can save stays with the heart button. Your saved homes appear in Wishlist from the dashboard menu.";
  }

  if (normalized.includes("password") || normalized.includes("reset")) {
    return "Use the Forgot password link on the login page to generate a reset link, then set a new password from the reset page.";
  }

  if (normalized.includes("dark mode") || normalized.includes("theme")) {
    return "Use the dashboard menu in the header to switch between light mode and dark mode.";
  }

  return "I can help with bookings, wishlist, password reset, notifications, and navigation. Try one of the quick questions below.";
};

const Chatbot = () => {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([
    {
      sender: "bot",
      text: "Hi, I’m the StaySpace assistant. Ask me about bookings, wishlist, password reset, or trips."
    }
  ]);

  const suggestionChips = useMemo(() => quickReplies, []);

  const sendMessage = (message) => {
    const trimmed = message.trim();
    if (!trimmed) {
      return;
    }

    setMessages((current) => [
      ...current,
      { sender: "user", text: trimmed },
      { sender: "bot", text: getBotReply(trimmed) }
    ]);
    setInput("");
  };

  return (
    <div className={open ? "chatbot chatbot--open" : "chatbot"}>
      {open ? (
        <section className="chatbot__panel">
          <div className="chatbot__header">
            <div>
              <strong>StaySpace Chat</strong>
              <p>Quick answers for guests</p>
            </div>
            <button className="ghost-button chatbot__close" onClick={() => setOpen(false)} type="button">
              Close
            </button>
          </div>
          <div className="chatbot__messages">
            {messages.map((message, index) => (
              <article
                className={message.sender === "bot" ? "chatbot__message chatbot__message--bot" : "chatbot__message chatbot__message--user"}
                key={`${message.sender}-${index}`}
              >
                {message.text}
              </article>
            ))}
          </div>
          <div className="chatbot__quick-replies">
            {suggestionChips.map((reply) => (
              <button className="chatbot__chip" key={reply} onClick={() => sendMessage(reply)} type="button">
                {reply}
              </button>
            ))}
          </div>
          <form
            className="chatbot__form"
            onSubmit={(event) => {
              event.preventDefault();
              sendMessage(input);
            }}
          >
            <input
              onChange={(event) => setInput(event.target.value)}
              placeholder="Type your question..."
              value={input}
            />
            <button className="primary-button chatbot__send" type="submit">
              Send
            </button>
          </form>
        </section>
      ) : null}
      <button className="primary-button chatbot__toggle" onClick={() => setOpen((current) => !current)} type="button">
        Chat
      </button>
    </div>
  );
};

export default Chatbot;
