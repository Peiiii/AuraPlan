
import React from 'react';
import { PlanItem, TimeScale } from '../types';
import { SCALE_CONFIG } from '../constants';

interface PlanItemCardProps {
  item: PlanItem;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

export const PlanItemCard: React.FC<PlanItemCardProps> = ({ item, onToggle, onDelete }) => {
  const config = SCALE_CONFIG[item.scale];

  return (
    <div className={`group flex items-center justify-between p-4 mb-3 rounded-2xl glass transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5 ${item.completed ? 'opacity-60' : ''}`}>
      <div className="flex items-center space-x-4 flex-1">
        <button
          onClick={() => onToggle(item.id)}
          className={`w-6 h-6 rounded-full border-2 transition-colors flex items-center justify-center ${
            item.completed 
              ? `${config.color} border-transparent` 
              : `border-gray-200 hover:border-${config.color.split('-')[1]}-300`
          }`}
        >
          {item.completed && (
            <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
            </svg>
          )}
        </button>
        <span className={`text-gray-700 transition-all duration-300 ${item.completed ? 'line-through decoration-gray-400' : 'font-medium'}`}>
          {item.text}
        </span>
      </div>
      <button
        onClick={() => onDelete(item.id)}
        className="opacity-0 group-hover:opacity-100 p-2 text-gray-400 hover:text-rose-500 transition-all rounded-lg hover:bg-rose-50"
      >
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
        </svg>
      </button>
    </div>
  );
};
