
import React, { useEffect, useState } from 'react';
import { TimeScale } from '../types';
import { usePresenter } from '../presenter';
import { useAIStore } from '../stores';
import { SCALE_CONFIG } from '../constants';

interface AISparkProps {
  scale: TimeScale;
  tasks: string[];
}

export const AISpark: React.FC<AISparkProps> = ({ scale, tasks }) => {
  const presenter = usePresenter();
  const insightData = useAIStore(s => s.insights[scale]);
  const [loading, setLoading] = useState(false);
  const config = SCALE_CONFIG[scale];

  useEffect(() => {
    if (tasks.length > 0) {
      setLoading(true);
      presenter.ai.fetchInsightIfNeeded(scale, tasks).finally(() => setLoading(false));
    }
  }, [scale, tasks, presenter.ai]);

  if (tasks.length === 0) return null;
  if (!insightData && !loading) return null;

  return (
    <div className={`mt-10 p-8 rounded-[3rem] ${config.light} border border-white/60 relative overflow-hidden shadow-sm transition-all duration-700 animate-in fade-in slide-in-from-bottom-6`}>
      <div className="absolute top-0 right-0 p-6">
        <button 
          onClick={() => {
            setLoading(true);
            presenter.ai.fetchInsightIfNeeded(scale, tasks).finally(() => setLoading(false));
          }}
          disabled={loading}
          className={`p-3 rounded-2xl bg-white/60 hover:bg-white transition-all shadow-sm ${loading ? 'animate-spin opacity-50' : 'hover:scale-110 active:scale-95'}`}
        >
          <svg className={`w-5 h-5 ${config.text}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
        </button>
      </div>

      <div className="relative z-10 space-y-6">
        <div className="flex items-center space-x-2">
          <span className={`w-2 h-2 rounded-full ${config.color} animate-pulse`}></span>
          <h3 className={`text-xs font-bold uppercase tracking-[0.2em] ${config.text} opacity-80`}>AI 哲学洞察</h3>
        </div>
        
        {loading ? (
          <div className="space-y-4 py-2">
            <div className="h-6 bg-white/50 rounded-full w-4/5 animate-pulse"></div>
            <div className="h-4 bg-white/50 rounded-full w-2/3 animate-pulse"></div>
          </div>
        ) : (
          <>
            <p className="font-serif text-2xl italic text-gray-800 leading-[1.6] tracking-tight">
              “{insightData?.insight.vision}”
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
              <div className="bg-white/50 p-6 rounded-[2rem] border border-white/40 shadow-sm backdrop-blur-sm">
                <span className="text-[10px] font-bold text-gray-400 block mb-2 uppercase tracking-widest">想象力跃迁</span>
                <p className="text-sm text-gray-600 leading-relaxed font-medium">{insightData?.insight.suggestion}</p>
              </div>
              <div className="bg-white/50 p-6 rounded-[2rem] border border-white/40 shadow-sm backdrop-blur-sm">
                <span className="text-[10px] font-bold text-gray-400 block mb-2 uppercase tracking-widest">灵感引导词</span>
                <p className="text-sm text-gray-600 leading-relaxed font-medium">{insightData?.insight.prompt}</p>
              </div>
            </div>
          </>
        )}
      </div>
      
      {/* Decorative Blur Backgrounds */}
      <div className={`absolute -bottom-16 -right-16 w-48 h-48 rounded-full ${config.color} opacity-10 blur-[80px]`}></div>
      <div className={`absolute -top-16 -left-16 w-48 h-48 rounded-full ${config.color} opacity-5 blur-[80px]`}></div>
    </div>
  );
};
