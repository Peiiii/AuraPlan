
import { create } from 'zustand';
import { TimeScale, PlanItem, AIInsight } from './types';

interface PlanStore {
  plans: PlanItem[];
  setPlans: (plans: PlanItem[]) => void;
}
export const usePlanStore = create<PlanStore>((set) => ({
  plans: JSON.parse(localStorage.getItem('aura_plans') || '[]'),
  setPlans: (plans) => {
    localStorage.setItem('aura_plans', JSON.stringify(plans));
    set({ plans });
  },
}));

interface UIStore {
  viewMode: 'focus' | 'horizon';
  activeScale: TimeScale;
  setViewMode: (mode: 'focus' | 'horizon') => void;
  setActiveScale: (scale: TimeScale) => void;
}
export const useUIStore = create<UIStore>((set) => ({
  viewMode: 'focus',
  activeScale: TimeScale.DAY,
  setViewMode: (viewMode) => set({ viewMode }),
  setActiveScale: (activeScale) => set({ activeScale }),
}));

interface AIStore {
  insights: Record<string, { insight: AIInsight; lastTasksHash: string }>;
  setInsight: (scale: TimeScale, insight: AIInsight, tasksHash: string) => void;
}
export const useAIStore = create<AIStore>((set) => ({
  insights: {},
  setInsight: (scale, insight, lastTasksHash) => 
    set((state) => ({ 
      insights: { ...state.insights, [scale]: { insight, lastTasksHash } } 
    })),
}));
