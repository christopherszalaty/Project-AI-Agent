// // src/components/ChatMessage.tsx
// import { FaUser, FaRobot } from 'react-icons/fa';

// interface Message {
//   id: number;
//   text: string;
//   sender: 'user' | 'ai';
// }

// interface ChatMessageProps {
//   message: Message;
// }

// export const ChatMessage = ({ message }: ChatMessageProps) => {
//   const isUser = message.sender === 'user';

//   return (
//     <div className={`flex items-start gap-4 p-4 ${isUser ? '' : 'bg-gray-50'}`}>
//       <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${isUser ? 'bg-blue-500 text-white' : 'bg-gray-700 text-white'}`}>
//         {isUser ? <FaUser /> : <FaRobot />}
//       </div>
//       <div className="flex-grow pt-1">
//         <p className="font-bold text-gray-800">{isUser ? 'Ty' : 'AI Bot'}</p>
//         <p className="text-gray-700 whitespace-pre-wrap">{message.text}</p>
//       </div>
//     </div>
//   );
// };

// src/components/ChatMessage.tsx
import { FaUser, FaRobot } from 'react-icons/fa';
import { FiCopy } from 'react-icons/fi';
import toast from 'react-hot-toast';
import { CodeBlock } from './CodeBlock';

interface Message {
  id: number;
  text: string;
  sender: 'user' | 'ai';
}

interface ChatMessageProps {
  message: Message;
}

// Prosta funkcja do parsowania markdown ( ``` )
const parseMessage = (text: string) => {
  const parts = text.split(/(```[\w-]*\n[\s\S]*?\n```)/g);
  return parts.map((part, index) => {
    const match = part.match(/```([\w-]+)?\n([\s\S]*?)\n```/);
    if (match) {
      const language = match[1] || 'plaintext';
      const code = match[2];
      return <CodeBlock key={index} code={code} language={language} />;
    }
    return <p key={index} className="whitespace-pre-wrap">{part}</p>;
  });
};


export const ChatMessage = ({ message }: ChatMessageProps) => {
  const isUser = message.sender === 'user';

  const handleCopy = () => {
    navigator.clipboard.writeText(message.text);
    toast.success('Skopiowano do schowka!');
  };

  return (
    <div className={`group flex items-start gap-4 p-4 ${isUser ? '' : 'bg-gray-100 dark:bg-gray-700/50'}`}>
      <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${isUser ? 'bg-blue-500 text-white' : 'bg-gray-600 dark:bg-gray-900 text-white'}`}>
        {isUser ? <FaUser /> : <FaRobot />}
      </div>
      <div className="flex-grow pt-1 text-gray-800 dark:text-gray-200">
        <div className="flex justify-between items-start">
            <p className="font-bold">{isUser ? 'Ty' : 'AI Bot'}</p>
            {!isUser && (
                <button 
                    onClick={handleCopy} 
                    className="opacity-0 group-hover:opacity-100 transition-opacity p-1 rounded-md hover:bg-gray-200 dark:hover:bg-gray-600"
                >
                    <FiCopy />
                </button>
            )}
        </div>
        <div>{parseMessage(message.text)}</div>
      </div>
    </div>
  );
};