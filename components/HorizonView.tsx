
import React from 'react';
import { TimeScale } from '../types';
import { SCALE_CONFIG } from '../constants';
import { usePresenter } from '../presenter';
import { usePlanStore } from '../stores';

export const HorizonView: React.FC = () => {
  const presenter = usePresenter();
  const plans = usePlanStore(s => s.plans);

  return (
    <div className="relative pb-32 animate-in fade-in duration-1000 max-w-5xl mx-auto">
      {/* Vertical Life River Line */}
      <div className="absolute left-8 lg:left-[45px] top-4 bottom-4 w-[2px] bg-gradient-to-b from-blue-200 via-rose-200 to-violet-200 opacity-30 hidden sm:block"></div>

      <div className="space-y-16 lg:space-y-24">
        {(Object.keys(TimeScale) as Array<keyof typeof TimeScale>).map((key, idx) => {
          const scale = TimeScale[key];
          const config = SCALE_CONFIG[scale];
          const items = plans.filter(p => p.scale === scale);
          const Svg = config.icon;

          return (
            <div 
              key={scale} 
              className="flex flex-col sm:flex-row items-start sm:items-center space-y-6 sm:space-y-0 sm:space-x-12 relative group"
            >
              {/* Scale Node */}
              <div className="relative z-10">
                <div 
                  onClick={() => presenter.ui.switchScale(scale)}
                  className={`w-20 h-20 lg:w-24 lg:h-24 rounded-[2rem] lg:rounded-[2.5rem] ${config.light} flex items-center justify-center cursor-pointer transition-all duration-500 shadow-lg group-hover:scale-110 group-hover:rotate-6 border-4 border-white group-hover:shadow-2xl relative overflow-hidden`}
                >
                  <div className={`absolute inset-0 ${config.color} opacity-0 group-hover:opacity-10 transition-opacity`}></div>
                  <Svg className={`w-10 h-10 lg:w-12 lg:h-12 ${config.text} transition-transform group-hover:scale-110`} />
                </div>
                {/* Text Label on the Side/Bottom */}
                <div className="absolute top-1/2 -translate-y-1/2 -left-32 hidden lg:block text-right">
                   <h3 className="font-serif text-2xl text-gray-800 tracking-tighter opacity-80 group-hover:opacity-100 transition-opacity">{scale}</h3>
                   <span className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">{config.description.split('，')[0]}</span>
                </div>
                <h3 className="lg:hidden font-serif text-xl text-gray-800 mt-2 ml-1">{scale}</h3>
              </div>

              {/* Panorama Card */}
              <div 
                onClick={() => presenter.ui.switchScale(scale)}
                className="flex-1 w-full glass p-8 lg:p-10 rounded-[3rem] lg:rounded-[4rem] border border-white/80 hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 cursor-pointer group relative overflow-hidden min-h-[200px] flex flex-col justify-center"
              >
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    {items.length > 0 ? (
                      <div className="flex flex-wrap gap-3">
                        {items.slice(0, 8).map(item => (
                          <div 
                            key={item.id} 
                            className={`px-5 py-2 rounded-full text-sm font-medium border backdrop-blur-sm transition-all ${
                              item.completed 
                                ? 'bg-gray-50/50 border-gray-100 text-gray-300 line-through' 
                                : `${config.light} border-white/50 text-gray-600 shadow-sm group-hover:shadow-md`
                            }`}
                          >
                            {item.text}
                          </div>
                        ))}
                        {items.length > 8 && (
                          <div className="flex items-center px-3 text-xs text-gray-400 italic">+{items.length - 8} 更多星点</div>
                        )}
                      </div>
                    ) : (
                      <div className="py-6 px-4">
                        <p className="text-gray-300 italic font-serif text-xl lg:text-2xl tracking-wide">空旷的宇宙，等待你的第一颗星...</p>
                      </div>
                    )}
                  </div>
                  
                  {/* Subtle Stats */}
                  <div className="hidden md:flex flex-col items-end pl-8 border-l border-gray-100/50">
                    <p className={`text-[10px] font-bold uppercase tracking-widest ${config.text} mb-2`}>进度概览</p>
                    <div className="text-3xl font-serif text-gray-400 tabular-nums">
                      {items.filter(i => i.completed).length}<span className="text-xl mx-1 text-gray-200">/</span>{items.length}
                    </div>
                  </div>
                </div>

                {/* Aesthetic Orb Decoration */}
                <div className={`absolute -right-20 -bottom-20 w-64 h-64 rounded-full ${config.color} opacity-[0.03] group-hover:opacity-[0.08] transition-all duration-1000 blur-[80px]`}></div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
