
import React, { useState, useEffect, useCallback } from 'react';
import { TimeScale, PlanItem } from './types';
import { SCALE_CONFIG } from './constants';
import { PlanItemCard } from './components/PlanItemCard';
import { AISpark } from './components/AISpark';

const App: React.FC = () => {
  const [activeScale, setActiveScale] = useState<TimeScale>(TimeScale.DAY);
  const [plans, setPlans] = useState<PlanItem[]>(() => {
    const saved = localStorage.getItem('aura_plans');
    return saved ? JSON.parse(saved) : [];
  });
  const [inputValue, setInputValue] = useState('');

  useEffect(() => {
    localStorage.setItem('aura_plans', JSON.stringify(plans));
  }, [plans]);

  const addPlan = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    const newItem: PlanItem = {
      id: Date.now().toString(),
      text: inputValue,
      completed: false,
      scale: activeScale,
      createdAt: Date.now(),
    };

    setPlans(prev => [newItem, ...prev]);
    setInputValue('');
  };

  const togglePlan = useCallback((id: string) => {
    setPlans(prev => prev.map(p => p.id === id ? { ...p, completed: !p.completed } : p));
  }, []);

  const deletePlan = useCallback((id: string) => {
    setPlans(prev => prev.filter(p => p.id !== id));
  }, []);

  const filteredPlans = plans.filter(p => p.scale === activeScale);
  const activeConfig = SCALE_CONFIG[activeScale];
  const Icon = activeConfig.icon;

  return (
    <div className="min-h-screen pb-24 selection:bg-indigo-100">
      {/* 背景动态光影 */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden -z-10">
        <div className={`absolute top-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full opacity-10 blur-[100px] transition-colors duration-1000 ${activeConfig.color}`}></div>
        <div className={`absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full opacity-5 blur-[100px] transition-colors duration-1000 ${activeConfig.color}`}></div>
      </div>

      <header className="max-w-4xl mx-auto px-6 pt-16 flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-serif text-gray-900 tracking-tight">灵感计划 Aura Plan</h1>
          <p className="text-gray-500 mt-2 text-sm tracking-wide uppercase font-medium">{activeScale}视角</p>
        </div>
        <div className={`w-12 h-12 rounded-2xl ${activeConfig.light} flex items-center justify-center transition-colors duration-1000`}>
          <Icon className={`w-6 h-6 ${activeConfig.text}`} />
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-6 mt-12 grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-12">
        <div className="space-y-8">
          {/* 输入框表单 */}
          <form onSubmit={addPlan} className="relative group">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder={`为你的“${activeScale}”添上一笔灵感...`}
              className="w-full bg-white/40 border border-white/50 backdrop-blur-md rounded-3xl px-8 py-5 text-lg focus:outline-none focus:ring-2 focus:ring-opacity-20 transition-all shadow-sm focus:shadow-xl placeholder:text-gray-400"
              style={{ '--tw-ring-color': activeConfig.color.replace('bg-', '') } as any}
            />
            <button
              type="submit"
              className={`absolute right-3 top-3 bottom-3 px-6 rounded-2xl text-white font-medium transition-all hover:scale-105 active:scale-95 shadow-md ${activeConfig.color}`}
            >
              添加
            </button>
          </form>

          {/* 计划列表 */}
          <section className="space-y-4">
            <div className="flex items-center justify-between px-2">
              <h2 className="text-sm font-bold text-gray-400 uppercase tracking-widest">灵感清单</h2>
              <span className="text-xs text-gray-400 font-medium">{filteredPlans.length} 个项目</span>
            </div>
            
            {filteredPlans.length > 0 ? (
              <div className="space-y-3">
                {filteredPlans.map(item => (
                  <PlanItemCard 
                    key={item.id} 
                    item={item} 
                    onToggle={togglePlan} 
                    onDelete={deletePlan} 
                  />
                ))}
              </div>
            ) : (
              <div className="py-20 text-center glass rounded-3xl">
                <p className="font-serif italic text-gray-400 text-lg">留白之处，蕴含无限可能。</p>
              </div>
            )}
          </section>

          <AISpark scale={activeScale} tasks={filteredPlans.map(p => p.text)} />
        </div>

        {/* 侧边导航 */}
        <aside className="hidden lg:block">
          <div className="sticky top-12 space-y-6">
            <h2 className="text-sm font-bold text-gray-400 uppercase tracking-widest px-2">时间粒度</h2>
            <nav className="space-y-2">
              {(Object.keys(TimeScale) as Array<keyof typeof TimeScale>).map((key) => {
                const scale = TimeScale[key];
                const config = SCALE_CONFIG[scale];
                const isActive = activeScale === scale;
                const Svg = config.icon;

                return (
                  <button
                    key={scale}
                    onClick={() => setActiveScale(scale)}
                    className={`w-full flex items-center space-x-3 px-4 py-3 rounded-2xl transition-all duration-300 ${
                      isActive 
                        ? `${config.light} ${config.text} shadow-sm translate-x-1` 
                        : 'text-gray-500 hover:bg-gray-100'
                    }`}
                  >
                    <Svg className="w-5 h-5" />
                    <span className="font-medium text-sm">{scale}</span>
                  </button>
                );
              })}
            </nav>
            <div className="p-4 rounded-2xl bg-white/50 border border-white/50 text-[11px] text-gray-400 leading-relaxed tracking-tight">
              {activeConfig.description}
            </div>
          </div>
        </aside>
      </main>

      {/* 移动端导航 */}
      <div className="lg:hidden fixed bottom-6 left-6 right-6 flex items-center justify-center">
        <div className="glass shadow-2xl rounded-full px-4 py-3 flex items-center space-x-1 overflow-x-auto no-scrollbar max-w-full">
          {(Object.keys(TimeScale) as Array<keyof typeof TimeScale>).map((key) => {
            const scale = TimeScale[key];
            const config = SCALE_CONFIG[scale];
            const isActive = activeScale === scale;
            const Svg = config.icon;

            return (
              <button
                key={scale}
                onClick={() => setActiveScale(scale)}
                className={`flex-shrink-0 flex items-center space-x-2 px-4 py-2 rounded-full transition-all ${
                  isActive 
                    ? `${config.color} text-white shadow-lg` 
                    : 'text-gray-500 hover:bg-gray-100'
                }`}
              >
                <Svg className="w-4 h-4" />
                <span className="text-xs font-bold whitespace-nowrap">{scale}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default App;
