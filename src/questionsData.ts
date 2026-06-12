import { Question, DessertOption } from './types';

export const QUESTIONS_DATA: Question[] = [
  {
    id: 1,
    title: 'Qual foi a data das nossas alianças?',
    options: ['08/08/2024', '03/08/2024', '13/07/2024', '20/07/2024'],
    correctAnswer: '03/08/2024',
    hint: 'Aquele dia de emoção pura marcando nosso compromisso... 💕',
    icon: 'HeartHandshake'
  },
  {
    id: 2,
    title: 'Quais desses restaurantes nós nunca fomos juntos?',
    options: ['Madero', 'Hannover', 'Terraço Itália', 'Holy burguer'],
    correctAnswer: 'Terraço Itália',
    hint: 'Dica: Fica em um prédio super alto de São Paulo com vista panorâmica, mas ainda está nos planos... 🏙️',
    icon: 'Utensils'
  },
  {
    id: 3,
    title: 'Qual foi o primeiro momento em que dizemos "eu te amo"?',
    options: [
      'Pelo Whatsapp depois do shopping',
      'No cinema depois do filme acabar',
      'Na escola depois de termos ficado a primeira vez'
    ],
    correctAnswer: 'Pelo Whatsapp depois do shopping',
    hint: 'Aquele momento inesquecível de coragem no digital... 📱💖',
    icon: 'MessageCircleHeart'
  }
];

export const DESSERT_OPTIONS: DessertOption[] = [
  { name: 'Pétit gateau', color: '#D4A5A5', textColor: '#513434', bgColor: '#FDF0F0' },
  { name: 'Brownie com sorvete', color: '#E5C1C1', textColor: '#5D3D3D', bgColor: '#FEF5F5' },
  { name: 'Fundue de chocolate', color: '#B38686', textColor: '#4A2A2A', bgColor: '#FAF0F0' },
  { name: 'Pipoca doce', color: '#e9c349', textColor: '#514210', bgColor: '#FEFAF0' }
];

