// src/components/RightSidebar.tsx
import { SettingsSlider } from './SettingsSlider';

interface Settings {
  temperature: number;
  maxTokens: number;
  topP: number;
}

interface RightSidebarProps {
  settings: Settings;
  onSettingsChange: (newSettings: Settings) => void;
}

export const RightSidebar = ({ settings, onSettingsChange }: RightSidebarProps) => {
  return (
    <aside className="h-full bg-gray-50 dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 p-4 flex flex-col gap-6">
      <h2 className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">Ustawienia Modelu</h2>
      <div className="space-y-6">
        <SettingsSlider
          label="Temperatura"
          value={settings.temperature}
          min={0}
          max={1}
          step={0.1}
          onChange={(val) => onSettingsChange({ ...settings, temperature: val })}
        />
        <SettingsSlider
          label="Maks. tokenów"
          value={settings.maxTokens}
          min={1}
          max={2048}
          step={1}
          onChange={(val) => onSettingsChange({ ...settings, maxTokens: val })}
        />
        <SettingsSlider
          label="Top P"
          value={settings.topP}
          min={0}
          max={1}
          step={0.1}
          onChange={(val) => onSettingsChange({ ...settings, topP: val })}
        />
      </div>
      <div className="mt-8">
        <button className="w-full bg-gray-200 text-gray-800 font-semibold py-2 px-4 rounded-lg hover:bg-gray-300 transition-colors">
          Resetuj Ustawienia
        </button>
      </div>
    </aside>
  );
};