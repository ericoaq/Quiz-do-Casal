export interface Question {
  id: number;
  title: string;
  options: string[];
  correctAnswer: string;
  hint: string;
  icon: string;
}

export type QuizStep = 'welcome' | 'q1' | 'q2' | 'dica' | 'q3' | 'roulette' | 'scale' | 'completed';

export interface DessertOption {
  name: string;
  color: string;
  textColor: string;
  bgColor: string;
}
