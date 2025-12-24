
export enum TimeScale {
  DAY = '今日',
  WEEK = '本周',
  MONTH = '本月',
  YEAR = '年度',
  FIVE_YEARS = '五年',
  LIFETIME = '一生'
}

export interface PlanItem {
  id: string;
  text: string;
  completed: boolean;
  scale: TimeScale;
  createdAt: number;
}

export interface AIInsight {
  prompt: string;
  suggestion: string;
  vision: string;
}
