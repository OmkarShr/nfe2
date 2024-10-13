import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import ChatInterface from './components/ChatInterface';
import EmailModal from './components/EmailModal';

interface Chat {
  id: string;
  name: string;
  messages: Message[];
}

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

function App() {
  const [chats, setChats] = useState<Chat[]>([]);
  const [currentChat, setCurrentChat] = useState<Chat | null>(null);
  const [isEmailModalOpen, setIsEmailModalOpen] = useState(false);

  useEffect(() => {
    // Load chats from localStorage on component mount
    const savedChats = localStorage.getItem('chats');
    if (savedChats) {
      setChats(JSON.parse(savedChats));
    }
  }, []);

  useEffect(() => {
    // Save chats to localStorage whenever they change
    localStorage.setItem('chats', JSON.stringify(chats));
  }, [chats]);

  const createNewChat = () => {
    const newChat: Chat = {
      id: Date.now().toString(),
      name: `New Chat ${chats.length + 1}`,
      messages: []
    };
    setChats([...chats, newChat]);
    setCurrentChat(newChat);
  };

  const deleteChat = (chatId: string) => {
    const updatedChats = chats.filter(chat => chat.id !== chatId);
    setChats(updatedChats);
    if (currentChat && currentChat.id === chatId) {
      setCurrentChat(null);
    }
  };

  return (
    <div className="flex h-screen bg-[#0A1930] text-white">
      <Sidebar 
        chats={chats}
        currentChat={currentChat} 
        setCurrentChat={setCurrentChat} 
        onEmailClick={() => setIsEmailModalOpen(true)}
        onNewChat={createNewChat}
        onDeleteChat={deleteChat}
      />
      <ChatInterface 
        currentChat={currentChat}
        setCurrentChat={setCurrentChat}
      />
      <EmailModal isOpen={isEmailModalOpen} onClose={() => setIsEmailModalOpen(false)} />
    </div>
  );
}

export default App;