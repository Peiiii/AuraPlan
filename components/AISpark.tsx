
import React, { useState, useEffect, useRef } from 'react';
import { TimeScale, AIInsight } from '../types';
import { geminiService } from '../services/geminiService';
import { SCALE_CONFIG } from '../constants';

interface AISparkProps {
  scale: TimeScale;
  tasks: string[];
}

export const AISpark: React.FC<AISparkProps> = ({ scale, tasks }) => {
  const [insight, setInsight] = useState<AIInsight | null>(null);
  const [loading, setLoading] = useState(false);
  const config = SCALE_CONFIG[scale];
  
  // 用于追踪任务是否真正变化
  const prevTasksRef = useRef<string[]>([]);
  const prevScaleRef = useRef<TimeScale | null>(null);

  const fetchInsight = async () => {
    if (tasks.length === 0) return;
    setLoading(true);
    const result = await geminiService.getCreativeInsight(scale, tasks);
    setInsight(result);
    setLoading(false);
  };

  useEffect(() => {
    // 只有在以下情况触发：
    // 1. 尺度切换
    // 2. 任务从无到有
    // 3. 任务内容发生变化（通过简单的字符串化比较）
    const tasksChanged = JSON.stringify(tasks) !== JSON.stringify(prevTasksRef.current);
    const scaleChanged = scale !== prevScaleRef.current;

    if ((tasksChanged || scaleChanged) && tasks.length > 0) {
      fetchInsight();
    }
    
    prevTasksRef.current = tasks;
    prevScaleRef.current = scale;
  }, [scale, tasks]);

  // 如果没有任务内容，则不渲染反思组件
  if (tasks.length === 0) return null;

  return (
    <div className={`mt-8 p-6 rounded-[2rem] ${config.light} border border-white/50 relative overflow-hidden transition-all duration-500 animate-in fade-in zoom-in-95`}>
      <div className="absolute top-0 right-0 p-4">
        <button 
          onClick={fetchInsight}
          disabled={loading}
          title="重新生成灵感"
          className={`p-2 rounded-xl bg-white/50 hover:bg-white transition-all ${loading ? 'animate-spin' : 'hover:scale-110'}`}
        >
          <svg className={`w-5 h-5 ${config.text}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
        </button>
      </div>

      <div className="relative z-10 space-y-4">
        <h3 className={`text-xs font-bold uppercase tracking-widest ${config.text} opacity-70`}>AI 深度反思</h3>
        {loading ? (
          <div className="space-y-3 animate-pulse">
            <div className="h-4 bg-white/40 rounded w-3/4"></div>
            <div className="h-4 bg-white/40 rounded w-1/2"></div>
          </div>
        ) : (
          <>
            <p className="font-serif text-xl italic text-gray-800 leading-relaxed">
              “{insight?.vision}”
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
              <div className="bg-white/40 p-4 rounded-2xl border border-white/50">
                <span className="text-[10px] font-bold text-gray-400 block mb-1 uppercase tracking-tighter">想象力跃迁</span>
                <p className="text-sm text-gray-600 leading-snug">{insight?.suggestion}</p>
              </div>
              <div className="bg-white/40 p-4 rounded-2xl border border-white/50">
                <span className="text-[10px] font-bold text-gray-400 block mb-1 uppercase tracking-tighter">创意引导词</span>
                <p className="text-sm text-gray-600 leading-snug">{insight?.prompt}</p>
              </div>
            </div>
          </>
        )}
      </div>
      
      {/* 装饰性光晕 */}
      <div className={`absolute -bottom-12 -right-12 w-32 h-32 rounded-full ${config.color} opacity-10 blur-3xl`}></div>
      <div className={`absolute -top-12 -left-12 w-32 h-32 rounded-full ${config.color} opacity-5 blur-3xl`}></div>
    </div>
  );
};
