
import { usePlanStore, useUIStore, useAIStore } from './stores';
import { TimeScale, PlanItem } from './types';
import { geminiService } from './services/geminiService';

export class PlanManager {
  addPlan = (text: string, scale: TimeScale) => {
    const { plans, setPlans } = usePlanStore.getState();
    const newItem: PlanItem = {
      id: Math.random().toString(36).substr(2, 9),
      text,
      completed: false,
      scale,
      createdAt: Date.now(),
    };
    setPlans([newItem, ...plans]);
  };

  togglePlan = (id: string) => {
    const { plans, setPlans } = usePlanStore.getState();
    setPlans(plans.map(p => p.id === id ? { ...p, completed: !p.completed } : p));
  };

  deletePlan = (id: string) => {
    const { plans, setPlans } = usePlanStore.getState();
    setPlans(plans.filter(p => p.id !== id));
  };
}

export class UIManager {
  toggleView = () => {
    const { viewMode, setViewMode } = useUIStore.getState();
    setViewMode(viewMode === 'focus' ? 'horizon' : 'focus');
  };

  switchScale = (scale: TimeScale) => {
    useUIStore.getState().setActiveScale(scale);
    useUIStore.getState().setViewMode('focus');
  };
}

export class AIManager {
  fetchInsightIfNeeded = async (scale: TimeScale, tasks: string[]) => {
    if (tasks.length === 0) return;
    
    // Create a hash to check if content changed
    const hash = JSON.stringify([...tasks].sort());
    const { insights, setInsight } = useAIStore.getState();
    const existing = insights[scale];

    // Content hasn't changed, skip
    if (existing && existing.lastTasksHash === hash) return;

    try {
      const result = await geminiService.getCreativeInsight(scale, tasks);
      setInsight(scale, result, hash);
    } catch (e) {
      console.error("AI fetch failed", e);
    }
  };
}
