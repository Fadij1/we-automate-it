export interface PipelineNode {
  id: string;
  title: string;
  type: 'trigger' | 'ai' | 'automation' | 'output';
  icon: string;
  description: string;
  statsEffect: {
    hoursSaved: number;
    efficiencyBoost: number;
    costReduction: number;
  };
}

export interface MatchingCard {
  id: string;
  title: string;
  category: 'challenge' | 'solution';
  description: string;
  matchingPairId: string;
  iconName: string;
  badge: string;
  color: string;
}

export interface ChatMessage {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: string;
  actionButton?: {
    text: string;
    href: string;
  };
}
