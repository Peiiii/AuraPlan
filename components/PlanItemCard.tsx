
import React from 'react';
import { PlanItem } from '../types';
import { SCALE_CONFIG } from '../constants';
import { usePresenter } from '../presenter';

interface PlanItemCardProps {
  item: PlanItem;
}

export const PlanItemCard: React.FC<PlanItemCardProps> = ({ item }) => {
  const presenter = usePresenter();
  const config = SCALE_CONFIG[item.scale];

  return (
    <div className={`group flex items-center justify-between p-5 mb-4 rounded-[2rem] glass transition-all duration-500 hover:shadow-xl hover:-translate-y-1 ${item.completed ? 'opacity-50' : ''}`}>
      <div className="flex items-center space-x-5 flex-1">
        <button
          onClick={() => presenter.plan.togglePlan(item.id)}
          className={`w-7 h-7 rounded-full border-2 transition-all flex items-center justify-center ${
            item.completed 
              ? `${config.color} border-transparent scale-110 shadow-lg` 
              : `border-gray-200 hover:border-${config.color.split('-')[1]}-400`
          }`}
        >
          {item.completed && (
            <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
            </svg>
          )}
        </button>
        <span className={`text-gray-700 text-lg transition-all duration-500 ${item.completed ? 'line-through decoration-gray-400 font-light' : 'font-medium'}`}>
          {item.text}
        </span>
      </div>
      <button
        onClick={() => presenter.plan.deletePlan(item.id)}
        className="opacity-0 group-hover:opacity-100 p-2 text-gray-300 hover:text-rose-400 transition-all rounded-xl hover:bg-rose-50"
      >
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
        </svg>
      </button>
    </div>
  );
};
