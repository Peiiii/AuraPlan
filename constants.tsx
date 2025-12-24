
import React from 'react';
import { TimeScale } from './types';

export const SCALE_CONFIG = {
  [TimeScale.DAY]: {
    color: 'bg-blue-400',
    text: 'text-blue-600',
    light: 'bg-blue-50',
    description: '关注当下，纯粹行动。',
    icon: (props: any) => (
      <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707m12.728 0l-.707-.707M6.343 6.343l-.707-.707m12.728 12.728L5.757 5.757" />
      </svg>
    )
  },
  [TimeScale.WEEK]: {
    color: 'bg-emerald-400',
    text: 'text-emerald-600',
    light: 'bg-emerald-50',
    description: '寻找节奏，积蓄动力。',
    icon: (props: any) => (
      <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
    )
  },
  [TimeScale.MONTH]: {
    color: 'bg-indigo-400',
    text: 'text-indigo-600',
    light: 'bg-indigo-50',
    description: '成长的阶段，有意义的转变。',
    icon: (props: any) => (
      <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    )
  },
  [TimeScale.YEAR]: {
    color: 'bg-amber-400',
    text: 'text-amber-600',
    light: 'bg-amber-50',
    description: '变革的轨道，周而复始。',
    icon: (props: any) => (
      <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    )
  },
  [TimeScale.FIVE_YEARS]: {
    color: 'bg-rose-400',
    text: 'text-rose-600',
    light: 'bg-rose-50',
    description: '远见之路，构建可期的未来。',
    icon: (props: any) => (
      <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
      </svg>
    )
  },
  [TimeScale.LIFETIME]: {
    color: 'bg-violet-400',
    text: 'text-violet-600',
    light: 'bg-violet-50',
    description: '生命的本质，传承与永恒的光芒。',
    icon: (props: any) => (
      <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
      </svg>
    )
  }
};
