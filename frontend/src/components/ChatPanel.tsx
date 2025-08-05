// src/components/ChatPanel.tsx
import { useEffect, useRef } from 'react';
import { ChatMessage } from './ChatMessage';
import { ChatInput } from './ChatInput';

interface Message {
  id: number;
  text: string;
  sender: 'user' | 'ai';
}

interface ChatPanelProps {
  messages: Message[];
  onSendMessage: (message: string) => void;
  isLoading: boolean;
}

export const ChatPanel = ({ messages, onSendMessage, isLoading }: ChatPanelProps) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages]);

  return (
    <main className="flex flex-col h-full bg-white dark:bg-gray-800/50">
      <div className="flex-grow overflow-y-auto">
        {messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-gray-500 dark:text-gray-400">
            <VscSparkle className="text-6xl mb-4" />
            <h2 className="text-2xl font-semibold">Jak mogę Ci dzisiaj pomóc?</h2>
          </div>
        ) : (
          <div>
            {messages.map((msg) => (
              <ChatMessage key={msg.id} message={msg} />
            ))}
            <div ref={messagesEndRef} />
          </div>
        )}
      </div>
      <ChatInput onSendMessage={onSendMessage} isLoading={isLoading} />
    </main>
  );
};
// Potrzebujemy ikony VscSparkle również tutaj
import { VscSparkle } from "react-icons/vsc";