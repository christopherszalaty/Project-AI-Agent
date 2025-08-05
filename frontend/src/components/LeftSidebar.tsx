// src/components/LeftSidebar.tsx
import { FiPlus, FiMessageSquare, FiSettings } from 'react-icons/fi';

export const LeftSidebar = () => {
  return (
    <aside className="h-full bg-gray-50 dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 p-4 flex flex-col gap-6">
      <button className="w-full bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg flex items-center justify-center gap-2 hover:bg-blue-700 transition-colors">
        <FiPlus />
        Nowy Czat
      </button>
      <nav>
        <h2 className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">Historia</h2>
        <ul>
          <li className="mb-1">
            <a href="#" className="flex items-center gap-3 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-md p-2 transition-colors">
              <FiMessageSquare className="text-gray-500" />
              <span className="truncate text-sm">Rozmowa o programowaniu...</span>
            </a>
          </li>
          <li className="mb-1">
            <a href="#" className="flex items-center gap-3 text-gray-700 hover:bg-gray-200 rounded-md p-2 transition-colors">
              <FiMessageSquare className="text-gray-500" />
              <span className="truncate text-sm">Pomysły na projekt w React</span>
            </a>
          </li>
        </ul>
      </nav>
      <div className="mt-auto">
         <a href="#" className="flex items-center gap-3 text-gray-700 hover:bg-gray-200 rounded-md p-2 transition-colors">
            <FiSettings className="text-gray-500" />
            <span className="truncate text-sm">Ustawienia</span>
        </a>
      </div>
    </aside>
  );
};