import React, { useState } from 'react';
import { Send, Mic, Paperclip, StopCircle } from 'lucide-react';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

interface Chat {
  id: string;
  name: string;
  messages: Message[];
}

interface ChatInterfaceProps {
  currentChat: Chat | null;
  setCurrentChat: React.Dispatch<React.SetStateAction<Chat | null>>;
}

const ChatInterface: React.FC<ChatInterfaceProps> = ({ currentChat, setCurrentChat }) => {
  const [input, setInput] = useState('');
  const [isRecording, setIsRecording] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || !currentChat) return;

    const userMessage: Message = { role: 'user', content: input };
    const updatedMessages = [...currentChat.messages, userMessage];
    setCurrentChat({ ...currentChat, messages: updatedMessages });
    setInput('');

    try {
      const response = await fetch('http://localhost:8080/ask_bot', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          conversationsNew: updatedMessages,
          question: input,
        }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      const assistantMessage: Message = { role: 'assistant', content: data.response };
      setCurrentChat(prevChat => {
        if (prevChat) {
          return { ...prevChat, messages: [...prevChat.messages, assistantMessage] };
        }
        return prevChat;
      });
    } catch (error) {
      console.error('Error:', error);
      // Handle error (e.g., show an error message to the user)
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Handle file upload logic here
      console.log('File uploaded:', file.name);
    }
  };

  const toggleRecording = () => {
    setIsRecording(!isRecording);
    // Implement voice recording logic here
  };

  return (
    <div className="flex-1 flex flex-col bg-[#0A1930]">
      {currentChat ? (
        <>
          <div className="flex-grow overflow-auto p-4 space-y-4">
            {currentChat.messages.map((message, index) => (
              <div
                key={index}
                className={`flex ${
                  message.role === 'user' ? 'justify-end' : 'justify-start'
                }`}
              >
                <div
                  className={`p-3 rounded-lg max-w-[70%] ${
                    message.role === 'user'
                      ? 'bg-[#FFD700] text-[#0A1930]'
                      : 'bg-[#1A2B4B] text-white'
                  }`}
                >
                  <div className="flex items-start">
                    {message.role === 'assistant' && (
                      <img
                        src="https://images.unsplash.com/photo-1587614382346-4ec70e388b28?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80"
                        alt="AI Avatar"
                        className="w-8 h-8 rounded-full mr-2"
                      />
                    )}
                    <div>{message.content}</div>
                    {message.role === 'user' && (
                      <img
                        src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1160&q=80"
                        alt="User Avatar"
                        className="w-8 h-8 rounded-full ml-2"
                      />
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
          <form onSubmit={handleSubmit} className="p-4 border-t border-gray-700">
            <div className="flex items-center space-x-2 bg-[#1A2B4B] rounded-full p-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask your legal question..."
                className="flex-grow p-2 bg-transparent focus:outline-none text-white"
              />
              <label className="cursor-pointer">
                <Paperclip size={20} className="text-gray-400 hover:text-white transition-colors" />
                <input type="file" className="hidden" onChange={handleFileUpload} />
              </label>
              <button
                type="button"
                onClick={toggleRecording}
                className="text-gray-400 hover:text-white transition-colors"
              >
                {isRecording ? <StopCircle size={20} /> : <Mic size={20} />}
              </button>
              <button
                type="submit"
                className="bg-[#FFD700] text-[#0A1930] p-2 rounded-full hover:bg-[#FFC000] transition-colors"
              >
                <Send size={20} />
              </button>
            </div>
          </form>
        </>
      ) : (
        <div className="flex-grow flex flex-col items-center justify-center p-4">
          <h2 className="text-4xl font-serif font-bold mb-8 text-[#FFD700]">Legal-Eaze</h2>
          <div className="text-center text-gray-400 mb-8">
            <p>AI Legal Research Assistant</p>
          </div>
          <div className="grid grid-cols-3 gap-4 max-w-3xl w-full">
            <FeatureCard
              title="Examples"
              items={[
                '"Explain contract law in simple terms"',
                '"What are the key elements of a valid will?"',
                '"How do I file a small claims lawsuit?"',
              ]}
              suggestions={[
                "Summarize the basics of tort law",
                "Explain the difference between civil and criminal law",
                "What are the steps in a typical legal proceeding?"
              ]}
            />
            <FeatureCard
              title="Capabilities"
              items={[
                "Provides legal information and guidance",
                "Assists with legal research and case analysis",
                "Helps draft legal documents and contracts",
              ]}
              suggestions={[
                "Help me understand the terms in this contract",
                "What are the key legal precedents for my case?",
                "Draft a simple non-disclosure agreement"
              ]}
            />
            <FeatureCard
              title="Limitations"
              items={[
                "May not have knowledge of recent legal changes",
                "Cannot provide personalized legal advice",
                "Should not replace consultation with a licensed attorney",
              ]}
              suggestions={[
                "What are the ethical considerations for AI in law?",
                "How can I find a qualified attorney for my case?",
                "Explain the importance of professional legal advice"
              ]}
            />
          </div>
        </div>
      )}
    </div>
  );
};

interface FeatureCardProps {
  title: string;
  items: string[];
  suggestions: string[];
}

const FeatureCard: React.FC<FeatureCardProps> = ({ title, items, suggestions }) => (
  <div className="bg-[#1A2B4B] p-4 rounded-lg shadow-md border border-[#FFD700]">
    <h3 className="text-lg font-semibold mb-2 text-[#FFD700]">{title}</h3>
    <ul className="space-y-2 mb-4">
      {items.map((item, index) => (
        <li key={index} className="text-sm text-gray-400">{item}</li>
      ))}
    </ul>
    <h4 className="text-md font-semibold mb-2 text-[#FFD700]">Try asking:</h4>
    <ul className="space-y-2">
      {suggestions.map((suggestion, index) => (
        <li key={index} className="text-sm text-gray-400 cursor-pointer hover:text-white transition-colors">
          {suggestion}
        </li>
      ))}
    </ul>
  </div>
);

export default ChatInterface;