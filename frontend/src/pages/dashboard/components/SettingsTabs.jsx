import React from 'react';
import {
  Settings as SettingsIcon,
  UserCircle,
  ShieldCheck,
} from 'lucide-react';

function SettingsTabs({ activeTab, setActiveTab }) {
  const tabs = [
    {
      id: 'workspace',
      label: 'Workspace',
      icon: SettingsIcon,
      description: 'Brand & Public page',
    },
    {
      id: 'profile',
      label: 'Profile',
      icon: UserCircle,
      description: 'Name & Email info',
    },
    {
      id: 'security',
      label: 'Security',
      icon: ShieldCheck,
      description: 'Password & Auth',
    },
  ];

  return (
    <div className="flex gap-2 overflow-x-auto pb-4 mb-8 border-b border-white/10 hide-scrollbar">
      {tabs.map((tab) => {
        const Icon = tab.icon;
        const isActive = activeTab === tab.id;
        return (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-3 px-5 py-3 rounded-t-xl sm:rounded-xl transition-all min-w-[160px] text-left border-b-2 sm:border-b-0 sm:border ${
              isActive
                ? 'bg-primary/10 border-primary text-white shadow-[0_0_15px_rgba(59,130,246,0.1)]'
                : 'border-transparent text-text-secondary hover:bg-white/5 hover:text-white'
            }`}
          >
            <div
              className={`p-2 rounded-lg transition-colors ${
                isActive
                  ? 'bg-primary text-white'
                  : 'bg-white/5 text-text-muted'
              }`}
            >
              <Icon size={18} />
            </div>
            <div>
              <div className="text-[14px] font-bold">{tab.label}</div>
              <div
                className={`text-[11px] font-medium hidden sm:block ${
                  isActive ? 'text-primary/80' : 'text-text-muted w-max'
                }`}
              >
                {tab.description}
              </div>
            </div>
          </button>
        );
      })}
    </div>
  );
}

export default SettingsTabs;
