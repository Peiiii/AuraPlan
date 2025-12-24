
import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { TimeScale, PlanItem } from './types';
import { SCALE_CONFIG } from './constants';
import { PlanItemCard } from './components/PlanItemCard';
import { AISpark } from './components/AISpark';

const App: React.FC = () => {
  const [viewMode, setViewMode] = useState<'focus' | 'horizon'>('focus');
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

  const filteredPlans = useMemo(() => plans.filter(p => p.scale === activeScale), [plans, activeScale]);
  const activeConfig = SCALE_CONFIG[activeScale];
  const Icon = activeConfig.icon;

  // 全景视野视图组件
  const HorizonView = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {(Object.keys(TimeScale) as Array<keyof typeof TimeScale>).map((key) => {
        const scale = TimeScale[key];
        const config = SCALE_CONFIG[scale];
        const items = plans.filter(p => p.scale === scale);
        const Svg = config.icon;

        return (
          <div 
            key={scale} 
            onClick={() => { setActiveScale(scale); setViewMode('focus'); }}
            className={`group cursor-pointer glass p-6 rounded-[2.5rem] border border-white/50 transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 relative overflow-hidden h-[320px] flex flex-col`}
          >
            <div className={`absolute top-0 right-0 w-24 h-24 ${config.color} opacity-[0.03] blur-2xl group-hover:opacity-10 transition-opacity`}></div>
            
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className={`w-10 h-10 rounded-2xl ${config.light} flex items-center justify-center`}>
                  <Svg className={`w-5 h-5 ${config.text}`} />
                </div>
                <h3 className="font-serif text-xl text-gray-800">{scale}</h3>
              </div>
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{items.length} 灵感</span>
            </div>

            <div className="flex-1 overflow-y-auto no-scrollbar space-y-2">
              {items.length > 0 ? (
                items.slice(0, 5).map(item => (
                  <div key={item.id} className="flex items-center space-x-2 text-sm text-gray-600">
                    <div className={`w-1.5 h-1.5 rounded-full ${item.completed ? 'bg-gray-300' : config.color}`}></div>
                    <span className={`truncate ${item.completed ? 'line-through opacity-50' : ''}`}>{item.text}</span>
                  </div>
                ))
              ) : (
                <p className="text-xs italic text-gray-300 mt-4">尚无规划...</p>
              )}
              {items.length > 5 && (
                <p className="text-[10px] text-gray-400 text-center mt-2">查看更多 +{items.length - 5}</p>
              )}
            </div>

            <div className="mt-4 pt-4 border-t border-gray-100/50">
               <p className="text-[10px] text-gray-400 leading-tight uppercase tracking-tighter">{config.description}</p>
            </div>
          </div>
        );
      })}
    </div>
  );

  return (
    <div className="min-h-screen pb-24 selection:bg-indigo-100 transition-colors duration-1000">
      {/* 背景动态光影 */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden -z-10">
        <div className={`absolute top-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full opacity-10 blur-[100px] transition-all duration-1000 ${viewMode === 'horizon' ? 'bg-indigo-400' : activeConfig.color}`}></div>
        <div className={`absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full opacity-5 blur-[100px] transition-all duration-1000 ${viewMode === 'horizon' ? 'bg-rose-400' : activeConfig.color}`}></div>
      </div>

      <header className="max-w-6xl mx-auto px-6 pt-16 flex items-end justify-between">
        <div>
          <h1 className="text-4xl md:text-5xl font-serif text-gray-900 tracking-tight">灵感计划 <span className="text-gray-300 font-light">Aura</span></h1>
          <p className="text-gray-500 mt-2 text-sm tracking-wide uppercase font-medium">
            {viewMode === 'focus' ? `${activeScale}视角` : '全景视野'}
          </p>
        </div>
        
        <button 
          onClick={() => setViewMode(viewMode === 'focus' ? 'horizon' : 'focus')}
          className="flex items-center space-x-2 px-6 py-3 rounded-2xl glass border border-white/50 hover:bg-white transition-all shadow-sm hover:shadow-md group"
        >
          {viewMode === 'focus' ? (
            <>
              <svg className="w-5 h-5 text-gray-600 group-hover:scale-110 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
              </svg>
              <span className="text-sm font-medium text-gray-600">全景</span>
            </>
          ) : (
            <>
              <svg className="w-5 h-5 text-gray-600 group-hover:scale-110 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
              <span className="text-sm font-medium text-gray-600">聚焦</span>
            </>
          )}
        </button>
      </header>

      <main className="max-w-6xl mx-auto px-6 mt-12">
        {viewMode === 'focus' ? (
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-12 animate-in fade-in duration-500">
            <div className="space-y-8">
              {/* 输入框表单 */}
              <form onSubmit={addPlan} className="relative group">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder={`为你的“${activeScale}”添上一笔灵感...`}
                  className="w-full bg-white/40 border border-white/50 backdrop-blur-md rounded-[2rem] px-8 py-5 text-lg focus:outline-none focus:ring-4 focus:ring-opacity-10 transition-all shadow-sm focus:shadow-2xl placeholder:text-gray-400"
                  style={{ '--tw-ring-color': activeConfig.color.replace('bg-', '') } as any}
                />
                <button
                  type="submit"
                  className={`absolute right-3 top-3 bottom-3 px-8 rounded-2xl text-white font-medium transition-all hover:scale-105 active:scale-95 shadow-md ${activeConfig.color}`}
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
                  <div className="py-20 text-center glass rounded-[2.5rem]">
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
                <div className="p-5 rounded-3xl bg-white/30 border border-white/50 text-[11px] text-gray-400 leading-relaxed tracking-tight">
                  {activeConfig.description}
                </div>
              </div>
            </aside>
          </div>
        ) : (
          <HorizonView />
        )}
      </main>

      {/* 移动端导航 (仅聚焦模式显示) */}
      {viewMode === 'focus' && (
        <div className="lg:hidden fixed bottom-6 left-6 right-6 flex items-center justify-center animate-in slide-in-from-bottom-8 duration-500">
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
      )}
    </div>
  );
};

export default App;
