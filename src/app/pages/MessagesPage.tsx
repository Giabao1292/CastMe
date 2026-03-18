import { MoreHorizontal, Search, SlidersHorizontal } from "lucide-react";
import { useMemo, useState } from "react";
import { Container } from "react-bootstrap";
import { DashboardHeader } from "../components/dashboard/DashboardHeader";
import type { SearchScope } from "../components/dashboard/types";
import "../../styles/jobs-dashboard.css";

type ChatRole = "me" | "other";

interface ChatMessage {
  id: string;
  role: ChatRole;
  text: string;
  time: string;
}

interface Conversation {
  id: string;
  name: string;
  role: string;
  avatar: string;
  preview: string;
  lastSeen: string;
  unread: number;
  messages: ChatMessage[];
}

const conversations: Conversation[] = [
  {
    id: "conv-1",
    name: "Linh Tran",
    role: "Beauty KOL",
    avatar: "LT",
    preview: "Em da quay xong video serum, gui anh preview toi nay.",
    lastSeen: "2m",
    unread: 2,
    messages: [
      {
        id: "m1",
        role: "other",
        text: "Hi anh, campaign skincare da start chua?",
        time: "09:14",
      },
      {
        id: "m2",
        role: "me",
        text: "Da start roi em. Deadline cho 2 TikTok videos la thu 6 nha.",
        time: "09:18",
      },
      {
        id: "m3",
        role: "other",
        text: "Ok anh. Em se gui script va shot list truoc 5pm hom nay.",
        time: "09:20",
      },
      {
        id: "m4",
        role: "other",
        text: "Em da quay xong video serum, gui anh preview toi nay.",
        time: "09:22",
      },
    ],
  },
  {
    id: "conv-2",
    name: "Minh Nguyen",
    role: "Gaming KOC",
    avatar: "MN",
    preview: "Livestream test tren TikTok dat 4.3k viewers roi anh.",
    lastSeen: "18m",
    unread: 0,
    messages: [
      {
        id: "m1",
        role: "me",
        text: "Update giup anh KPI livestream game launch toi qua nha.",
        time: "08:42",
      },
      {
        id: "m2",
        role: "other",
        text: "Livestream test tren TikTok dat 4.3k viewers roi anh.",
        time: "08:55",
      },
      {
        id: "m3",
        role: "other",
        text: "CTR link install hien tai 3.8%, em dang toi uu opening hook.",
        time: "08:57",
      },
      {
        id: "m4",
        role: "me",
        text: "Qua tot, giu format nay cho buoi official launch nhe.",
        time: "09:03",
      },
    ],
  },
];

export function MessagesPage() {
  const [searchValue, setSearchValue] = useState("");
  const [selectedScope, setSelectedScope] = useState<SearchScope>("Jobs");
  const [conversationQuery, setConversationQuery] = useState("");
  const [activeConversationId, setActiveConversationId] = useState(
    conversations[0].id,
  );

  const filteredConversations = useMemo(() => {
    const keyword = conversationQuery.trim().toLowerCase();
    if (!keyword) return conversations;

    return conversations.filter((conversation) => {
      const haystack =
        `${conversation.name} ${conversation.role} ${conversation.preview}`.toLowerCase();
      return haystack.includes(keyword);
    });
  }, [conversationQuery]);

  const activeConversation =
    filteredConversations.find((item) => item.id === activeConversationId) ??
    filteredConversations[0];

  return (
    <div className="dashboard-page app-route-page">
      <DashboardHeader
        searchValue={searchValue}
        onSearchValueChange={setSearchValue}
        selectedScope={selectedScope}
        onScopeChange={setSelectedScope}
      />

      <Container fluid className="messages-page-content">
        <main className="messages-layout" aria-label="Messages">
          <aside className="messages-sidebar" aria-label="Conversations">
            <header className="messages-sidebar-head">
              <h1>Messages</h1>
              <button type="button" aria-label="Conversation options">
                <MoreHorizontal size={18} />
              </button>
            </header>

            <div className="messages-search-row">
              <label htmlFor="messages-search" className="sr-only">
                Search conversations
              </label>
              <div className="messages-search-box">
                <Search size={16} />
                <input
                  id="messages-search"
                  value={conversationQuery}
                  onChange={(event) => setConversationQuery(event.target.value)}
                  placeholder="Search"
                />
              </div>
              <button type="button" aria-label="Filter conversations">
                <SlidersHorizontal size={16} />
              </button>
            </div>

            <div className="messages-list">
              {filteredConversations.length > 0 ? (
                filteredConversations.map((conversation) => {
                  const isActive = conversation.id === activeConversation?.id;

                  return (
                    <button
                      key={conversation.id}
                      type="button"
                      className={`messages-conversation-item ${isActive ? "active" : ""}`}
                      onClick={() => setActiveConversationId(conversation.id)}
                    >
                      <span className="messages-avatar">
                        {conversation.avatar}
                      </span>
                      <span className="messages-conversation-meta">
                        <strong>{conversation.name}</strong>
                        <small>{conversation.role}</small>
                        <em>{conversation.preview}</em>
                      </span>
                      <span className="messages-conversation-side">
                        <small>{conversation.lastSeen}</small>
                        {conversation.unread > 0 && (
                          <b>{conversation.unread}</b>
                        )}
                      </span>
                    </button>
                  );
                })
              ) : (
                <p className="messages-empty-list">No conversations found.</p>
              )}
            </div>
          </aside>

          <section
            className="messages-chat-panel"
            aria-label="Active conversation"
          >
            {activeConversation ? (
              <>
                <header className="messages-chat-head">
                  <div>
                    <h2>{activeConversation.name}</h2>
                    <p>{activeConversation.role}</p>
                  </div>
                  <span>Online now</span>
                </header>

                <div className="messages-chat-thread">
                  {activeConversation.messages.map((message) => (
                    <article
                      key={message.id}
                      className={`messages-bubble ${message.role}`}
                    >
                      <p>{message.text}</p>
                      <small>{message.time}</small>
                    </article>
                  ))}
                </div>

                <footer className="messages-chat-compose">
                  <input
                    placeholder="Type your message..."
                    aria-label="Message input"
                  />
                  <button type="button">Send</button>
                </footer>
              </>
            ) : (
              <div className="messages-chat-empty">
                <h2>Welcome to Messages</h2>
                <p>Select a conversation to continue chatting.</p>
              </div>
            )}
          </section>
        </main>
      </Container>
    </div>
  );
}
