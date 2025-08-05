// // import { useState } from 'react'
// // import reactLogo from './assets/react.svg'
// // import viteLogo from '/vite.svg'
// // import './App.css'

// // function App() {
// //   const [count, setCount] = useState(0)

// //   return (
// //     <>
// //       <div>
// //         <a href="https://vite.dev" target="_blank">
// //           <img src={viteLogo} className="logo" alt="Vite logo" />
// //         </a>
// //         <a href="https://react.dev" target="_blank">
// //           <img src={reactLogo} className="logo react" alt="React logo" />
// //         </a>
// //       </div>
// //       <h1>Vite + React</h1>
// //       <div className="card">
// //         <button onClick={() => setCount((count) => count + 1)}>
// //           count is {count}
// //         </button>
// //         <p>
// //           Edit <code>src/App.tsx</code> and save to test HMR
// //         </p>
// //       </div>
// //       <p className="read-the-docs">
// //         Click on the Vite and React logos to learn more
// //       </p>
// //     </>
// //   )
// // }

// // export default App

// // src/App.tsx
// import { useState } from 'react';
// import { Header } from './components/Header';
// import { LeftSidebar } from './components/LeftSidebar';
// import { ChatPanel } from './components/ChatPanel';
// import { RightSidebar } from './components/RightSidebar';

// interface Message {
//   id: number;
//   text: string;
//   sender: 'user' | 'ai';
// }

// interface Settings {
//   temperature: number;
//   maxTokens: number;
//   topP: number;
// }

// function App() {
//   const [messages, setMessages] = useState<Message[]>([]);
//   const [isLoading, setIsLoading] = useState(false);
//   const [settings, setSettings] = useState<Settings>({
//     temperature: 0.7,
//     maxTokens: 512,
//     topP: 0.9,
//   });

//   const handleSendMessage = (text: string) => {
//     // 1. Dodaj wiadomość użytkownika do stanu
//     const userMessage: Message = { id: Date.now(), text, sender: 'user' };
//     setMessages((prev) => [...prev, userMessage]);
//     setIsLoading(true);

//     // 2. Symuluj odpowiedź AI (tutaj podłączysz swoje API)
//     setTimeout(() => {
//       const aiResponse: Message = {
//         id: Date.now() + 1,
//         text: `Otrzymałem Twoją wiadomość: "${text}". Przetwarzam ją z ustawieniami: Temperatura=${settings.temperature}, Maks. Tokenów=${settings.maxTokens}.`,
//         sender: 'ai',
//       };
//       setMessages((prev) => [...prev, aiResponse]);
//       setIsLoading(false);
//     }, 1500); // Symulowane opóźnienie odpowiedzi
//   };

//   return (
//     <div className="flex flex-col h-screen font-sans bg-gray-100">
//       <Header />
//       <div className="flex flex-grow overflow-hidden">
//         <div className="hidden md:block md:w-64 flex-shrink-0">
//           <LeftSidebar />
//         </div>
//         <div className="flex-grow h-full">
//           <ChatPanel messages={messages} onSendMessage={handleSendMessage} isLoading={isLoading} />
//         </div>
//         <div className="hidden lg:block lg:w-72 flex-shrink-0">
//           <RightSidebar settings={settings} onSettingsChange={setSettings} />
//         </div>
//       </div>
//     </div>
//   );
// }

// export default App;

// src/App.tsx
import { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Toaster } from 'react-hot-toast';
import { Header } from './components/Header';
import { LeftSidebar } from './components/LeftSidebar';
import { ChatPanel } from './components/ChatPanel';
import { RightSidebar } from './components/RightSidebar';

// Definicje interfejsów Message i Settings (bez zmian)
interface Message { id: number; text: string; sender: 'user' | 'ai'; }
interface Settings { temperature: number; maxTokens: number; topP: number; }

// Przykładowy kod w Pythonie do demonstracji
const pythonCodeExample = `
\`\`\`python
import numpy as np

def calculate_mean(numbers):
    """Calculates the mean of a list of numbers."""
    arr = np.array(numbers)
    return np.mean(arr)

print(calculate_mean([10, 20, 30, 40]))
\`\`\`
`;

function App() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [settings, setSettings] = useState<Settings>({ temperature: 0.7, maxTokens: 1024, topP: 0.9 });
  
  // Nowe stany dla UI
  const [isDark, setIsDark] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  const handleSendMessage = (text: string) => {
    const userMessage: Message = { id: Date.now(), text, sender: 'user' };
    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);

    // Symulacja streamingu odpowiedzi AI
    const fullResponse = text.toLowerCase().includes("kod") 
      ? `Oto przykładowy kod w Pythonie, o który prosiłeś: ${pythonCodeExample}`
      : `Otrzymałem Twoją wiadomość: "${text}". Przetwarzam ją z ustawieniami: Temp=${settings.temperature}.`;
      
    const aiMessage: Message = { id: Date.now() + 1, text: '', sender: 'ai' };
    setMessages((prev) => [...prev, aiMessage]);

    let currentText = '';
    const interval = setInterval(() => {
      currentText = fullResponse.substring(0, currentText.length + 3);
      setMessages(prev => prev.map(msg => msg.id === aiMessage.id ? { ...msg, text: currentText } : msg));
      
      if (currentText.length >= fullResponse.length) {
        clearInterval(interval);
        setIsLoading(false);
      }
    }, 20); // Szybkość "pisania"
  };
  
  return (
    <div className="flex flex-col h-screen font-sans bg-gray-100 dark:bg-gray-900 transition-colors duration-300">
      {/* Komponent do powiadomień */}
      <Toaster position="top-center" toastOptions={{
        className: 'dark:bg-gray-700 dark:text-white',
      }}/>
      
      <Header 
        isDark={isDark} 
        toggleDark={() => setIsDark(!isDark)}
        toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} 
      />
      
      <div className="flex flex-grow overflow-hidden relative">
        {/* Lewy panel boczny - animowany */}
        <AnimatePresence>
          {isSidebarOpen && (
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              className="absolute top-0 left-0 h-full w-64 bg-gray-50 dark:bg-gray-800 z-20 lg:hidden"
            >
              <LeftSidebar />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Statyczny lewy panel dla dużych ekranów */}
        <div className="hidden lg:block lg:w-64 flex-shrink-0">
          <LeftSidebar />
        </div>

        {/* Główny panel czatu */}
        <div className="flex-grow h-full">
          <ChatPanel messages={messages} onSendMessage={handleSendMessage} isLoading={isLoading} />
        </div>

        {/* Prawy panel boczny */}
        <div className="hidden lg:block lg:w-72 flex-shrink-0">
          <RightSidebar settings={settings} onSettingsChange={setSettings} />
        </div>
      </div>
    </div>
  );
}

export default App;