import React from 'react';
import { PlusCircle, MessageSquare, Scale, BookOpen, Mail, LogOut, Trash2 } from 'lucide-react';
import Logo from './Logo';

interface Chat {
  id: string;
  name: string;
}

interface SidebarProps {
  chats: Chat[];
  currentChat: Chat | null;
  setCurrentChat: (chat: Chat | null) => void;
  onEmailClick: () => void;
  onNewChat: () => void;
  onDeleteChat: (chatId: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ chats, currentChat, setCurrentChat, onEmailClick, onNewChat, onDeleteChat }) => {
  return (
    <aside className="w-64 bg-[#1A2B4B] flex flex-col text-gray-300">
      <div className="p-4 flex items-center space-x-2">
        <Logo size={32} />
        <h1 className="text-xl font-serif font-bold text-[#FFD700]">Legal-Eaze</h1>
      </div>
      <button
        onClick={onNewChat}
        className="m-4 p-3 bg-[#FFD700] text-[#0A1930] rounded-md hover:bg-[#FFC000] transition-colors flex items-center space-x-2 font-semibold"
      >
        <PlusCircle size={20} />
        <span>New chat</span>
      </button>
      <div className="flex-grow overflow-y-auto">
        {chats.map((chat) => (
          <div
            key={chat.id}
            className={`w-full p-3 text-left hover:bg-[#2A3B5B] transition-colors flex items-center justify-between ${
              currentChat?.id === chat.id ? 'bg-[#2A3B5B]' : ''
            }`}
          >
            <button
              onClick={() => setCurrentChat(chat)}
              className="flex items-center space-x-2 flex-grow"
            >
              <MessageSquare size={20} />
              <span className="truncate">{chat.name}</span>
            </button>
            <button
              onClick={() => onDeleteChat(chat.id)}
              className="text-gray-400 hover:text-white transition-colors"
            >
              <Trash2 size={16} />
            </button>
          </div>
        ))}
      </div>
      <div className="p-4 border-t border-gray-700 space-y-2">
        <button 
          onClick={onEmailClick}
          className="w-full p-2 hover:bg-[#2A3B5B] transition-colors rounded-md flex items-center space-x-2"
        >
          <Mail size={20} />
          <span>Email Summary</span>
        </button>
        <button className="w-full p-2 hover:bg-[#2A3B5B] transition-colors rounded-md flex items-center space-x-2">
          <Scale size={20} />
          <span>Legal Resources</span>
        </button>
        <button className="w-full p-2 hover:bg-[#2A3B5B] transition-colors rounded-md flex items-center space-x-2">
          <BookOpen size={20} />
          <span>Learn More</span>
        </button>
        <button className="w-full p-2 hover:bg-[#2A3B5B] transition-colors rounded-md flex items-center space-x-2">
          <LogOut size={20} />
          <span>Log out</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;