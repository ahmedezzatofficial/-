import { LucideIcon } from 'lucide-react';

export interface LinkItem {
  id: string;
  title: string;
  subtitle?: string;
  url: string;
  icon?: any; // Changed from LucideIcon to any to support custom SVGs
  featured?: boolean;
}

export interface SocialLink {
  platform: string;
  url: string;
  icon: any;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
  isError?: boolean;
}

export enum LoadingState {
  IDLE = 'IDLE',
  LOADING = 'LOADING',
  SUCCESS = 'SUCCESS',
  ERROR = 'ERROR'
}