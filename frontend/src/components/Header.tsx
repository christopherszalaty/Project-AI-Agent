// // src/components/Header.tsx
// import { VscSparkle } from "react-icons/vsc";
// import { FaGithub } from "react-icons/fa";

// export const Header = () => {
//   return (
//     <header className="bg-white border-b border-gray-200 p-3 flex justify-between items-center">
//       <div className="flex items-center gap-3">
//         <VscSparkle className="text-blue-600 text-2xl" />
//         <h1 className="text-lg font-semibold text-gray-800">AI Chat Frontend</h1>
//       </div>
//       <a 
//         href="https://github.com/your-repo" // Zmień na swoje repozytorium
//         target="_blank"
//         rel="noopener noreferrer"
//         className="text-gray-600 hover:text-gray-900 transition-colors"
//       >
//         <FaGithub size={24} />
//       </a>
//     </header>
//   );
// };

// src/components/Header.tsx
import { VscSparkle } from "react-icons/vsc";
import { FaGithub } from "react-icons/fa";
import { FiMenu, FiMoon, FiSun } from "react-icons/fi";

interface HeaderProps {
  isDark: boolean;
  toggleDark: () => void;
  toggleSidebar: () => void;
}

export const Header = ({ isDark, toggleDark, toggleSidebar }: HeaderProps) => {
  return (
    <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 p-3 flex justify-between items-center flex-shrink-0">
      <div className="flex items-center gap-3">
        <button onClick={toggleSidebar} className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 lg:hidden">
            <FiMenu className="text-gray-600 dark:text-gray-300"/>
        </button>
        <VscSparkle className="text-blue-500 text-2xl" />
        <h1 className="text-lg font-semibold text-gray-800 dark:text-white">AI Chat Frontend</h1>
      </div>
      <div className="flex items-center gap-4">
        <button onClick={toggleDark} className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700">
          {isDark ? <FiSun className="text-yellow-400" /> : <FiMoon className="text-gray-600" />}
        </button>
        <a 
          href="https://github.com/your-repo"
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
        >
          <FaGithub size={24} />
        </a>
      </div>
    </header>
  );
};