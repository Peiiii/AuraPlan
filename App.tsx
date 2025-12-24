
import React, { useState, useMemo } from 'react';
import { usePlanStore, useUIStore } from './stores';
import { SCALE_CONFIG } from './constants';
import { PlanItemCard } from './components/PlanItemCard';
import { AISpark } from './components/AISpark';
import { HorizonView } from './components/HorizonView';
import { usePresenter, PresenterProvider } from './presenter';
// Import TimeScale which was missing and causing build errors
import { TimeScale } from './types';

const Main: React.FC = () => {
  const presenter = usePresenter();
  const plans = usePlanStore(s => s.plans);
  const { viewMode, activeScale } = useUIStore();
  const [inputValue, setInputValue] = useState('');

  const filteredPlans = useMemo(() => plans.filter(p => p.scale === activeScale), [plans, activeScale]);
  const activeConfig = SCALE_CONFIG[activeScale];

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;
    presenter.plan.addPlan(inputValue, activeScale);
    setInputValue('');
  };

  return (
    <div className="min-h-screen pb-40 transition-all duration-1000 selection:bg-indigo-100">
      {/* Immersive Background Effects */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden -z-10 bg-[#fdfefe]">
        <div className={`absolute top-[-20%] right-[-10%] w-[80%] h-[80%] rounded-full opacity-[0.12] blur-[150px] transition-all duration-1000 ${viewMode === 'horizon' ? 'bg-indigo-400' : activeConfig.color}`}></div>
        <div className={`absolute bottom-[-20%] left-[-10%] w-[70%] h-[70%] rounded-full opacity-[0.08] blur-[150px] transition-all duration-1000 ${viewMode === 'horizon' ? 'bg-rose-400' : activeConfig.color}`}></div>
      </div>

      <header className="max-w-6xl mx-auto px-10 pt-24 pb-12 flex flex-col md:flex-row items-start md:items-end justify-between space-y-8 md:space-y-0">
        <div className="animate-in slide-in-from-left duration-1000">
          <h1 className="text-6xl md:text-7xl font-serif text-gray-900 tracking-tighter">灵感计划 <span className="text-gray-200 font-extralight italic">Aura</span></h1>
          <p className="text-gray-400 mt-6 text-xs tracking-[0.4em] uppercase font-black flex items-center">
            <span className={`w-1.5 h-1.5 rounded-full mr-3 ${viewMode === 'focus' ? activeConfig.color : 'bg-indigo-400 animate-pulse'}`}></span>
            {viewMode === 'focus' ? `${activeScale}视角 · Focus` : '全景视野 · Horizon Panorama'}
          </p>
        </div>
        
        <button 
          onClick={presenter.ui.toggleView}
          className="flex items-center space-x-4 px-10 py-5 rounded-[2.5rem] glass border border-white/80 hover:bg-white transition-all shadow-2xl hover:shadow-indigo-100/50 group active:scale-95"
        >
          <div className="relative w-7 h-7 overflow-hidden">
            <div className={`transition-transform duration-700 ease-[cubic-bezier(0.23, 1, 0.32, 1)] ${viewMode === 'focus' ? 'translate-y-0' : '-translate-y-full'}`}>
              <svg className="w-7 h-7 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
              </svg>
              <svg className="w-7 h-7 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
            </div>
          </div>
          <span className="text-sm font-black text-gray-700 tracking-[0.2em]">{viewMode === 'focus' ? '全景' : '聚焦'}</span>
        </button>
      </header>

      <main className="max-w-6xl mx-auto px-10">
        {viewMode === 'focus' ? (
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-20 animate-in fade-in slide-in-from-bottom-8 duration-1000">
            <div className="space-y-16">
              {/* Exquisite Input Form */}
              <form onSubmit={handleAdd} className="relative group">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder={`为你的“${activeScale}”镌刻灵感...`}
                  className="w-full bg-white/60 border border-white/80 backdrop-blur-2xl rounded-[3rem] px-12 py-8 text-2xl focus:outline-none focus:ring-[12px] focus:ring-opacity-5 transition-all shadow-xl focus:shadow-3xl placeholder:text-gray-300 font-serif italic"
                  style={{ '--tw-ring-color': activeConfig.color.replace('bg-', '') } as any}
                />
                <button
                  type="submit"
                  className={`absolute right-5 top-5 bottom-5 px-12 rounded-[2.2rem] text-white font-black tracking-widest transition-all hover:scale-105 active:scale-95 shadow-2xl ${activeConfig.color} hover:brightness-110`}
                >
                  添加
                </button>
              </form>

              {/* Tasks List */}
              <section className="space-y-8">
                <div className="flex items-center justify-between px-6">
                  <h2 className="text-[10px] font-black text-gray-400 uppercase tracking-[0.5em]">生命轨迹 · Path</h2>
                  <div className="flex items-center space-x-2">
                    <span className="text-[10px] bg-white border border-gray-100 text-gray-500 px-4 py-1.5 rounded-full font-black shadow-sm tracking-widest">{filteredPlans.length} 灵感碎片</span>
                  </div>
                </div>
                
                {filteredPlans.length > 0 ? (
                  <div className="space-y-5">
                    {filteredPlans.map(item => (
                      <PlanItemCard key={item.id} item={item} />
                    ))}
                  </div>
                ) : (
                  <div className="py-32 text-center glass rounded-[4rem] border-dashed border-gray-200/50">
                    <p className="font-serif italic text-gray-300 text-3xl tracking-widest">虚位以待，期君执笔。</p>
                  </div>
                )}
              </section>

              <AISpark scale={activeScale} tasks={filteredPlans.map(p => p.text)} />
            </div>

            {/* Scaling Navigation Side Panel */}
            <aside className="hidden lg:block">
              <div className="sticky top-16 space-y-12">
                <div className="px-6">
                  <h2 className="text-[10px] font-black text-gray-400 uppercase tracking-[0.5em] mb-8">时间刻度</h2>
                  <nav className="space-y-4">
                    {(Object.keys(TimeScale) as Array<keyof typeof TimeScale>).map((key) => {
                      const scale = TimeScale[key];
                      const config = SCALE_CONFIG[scale];
                      const isActive = activeScale === scale;
                      const Svg = config.icon;

                      return (
                        <button
                          key={scale}
                          onClick={() => presenter.ui.switchScale(scale)}
                          className={`w-full flex items-center space-x-5 px-8 py-5 rounded-[2.2rem] transition-all duration-700 ${
                            isActive 
                              ? `${config.light} ${config.text} shadow-2xl translate-x-4 border border-white/50 scale-105 font-black` 
                              : 'text-gray-300 hover:bg-gray-50 hover:text-gray-500 hover:translate-x-2 font-medium'
                          }`}
                        >
                          <Svg className={`w-6 h-6 ${isActive ? config.text : 'opacity-20 transition-opacity group-hover:opacity-100'}`} />
                          <span className="text-sm tracking-[0.2em]">{scale}</span>
                        </button>
                      );
                    })}
                  </nav>
                </div>
                <div className="p-10 rounded-[3rem] glass border border-white/80 text-xs text-gray-400 leading-relaxed tracking-[0.1em] shadow-sm italic text-center">
                  “{activeConfig.description}”
                </div>
              </div>
            </aside>
          </div>
        ) : (
          <HorizonView />
        )}
      </main>

      {/* Mobile Floating Tab Bar */}
      {viewMode === 'focus' && (
        <div className="lg:hidden fixed bottom-12 left-10 right-10 flex items-center justify-center animate-in slide-in-from-bottom-20 duration-1000">
          <div className="glass shadow-3xl rounded-[3rem] px-6 py-5 flex items-center space-x-3 overflow-x-auto no-scrollbar max-w-full border border-white/80">
            {(Object.keys(TimeScale) as Array<keyof typeof TimeScale>).map((key) => {
              const scale = TimeScale[key];
              const config = SCALE_CONFIG[scale];
              const isActive = activeScale === scale;
              const Svg = config.icon;

              return (
                <button
                  key={scale}
                  onClick={() => presenter.ui.switchScale(scale)}
                  className={`flex-shrink-0 flex items-center space-x-2 px-6 py-4 rounded-full transition-all duration-500 ${
                    isActive 
                      ? `${config.color} text-white shadow-2xl scale-110` 
                      : 'text-gray-400 hover:bg-white'
                  }`}
                >
                  <Svg className="w-5 h-5" />
                  <span className="text-xs font-black whitespace-nowrap tracking-widest">{scale}</span>
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

const App: React.FC = () => (
  <PresenterProvider>
    <Main />
  </PresenterProvider>
);

export default App;
