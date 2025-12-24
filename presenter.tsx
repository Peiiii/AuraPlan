
import React, { createContext, useContext, useMemo } from 'react';
import { PlanManager, UIManager, AIManager } from './managers';

export class AppPresenter {
  plan = new PlanManager();
  ui = new UIManager();
  ai = new AIManager();
}

const PresenterContext = createContext<AppPresenter | null>(null);

export const PresenterProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const presenter = useMemo(() => new AppPresenter(), []);
  return (
    <PresenterContext.Provider value={presenter}>
      {children}
    </PresenterContext.Provider>
  );
};

export const usePresenter = () => {
  const context = useContext(PresenterContext);
  if (!context) throw new Error("usePresenter must be used within PresenterProvider");
  return context;
};
