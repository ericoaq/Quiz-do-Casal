import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  HeartHandshake, 
  Utensils, 
  MessageCircle, 
  Heart, 
  Sparkles, 
  X, 
  ArrowRight,
  Compass,
  PartyPopper,
  Music,
  VolumeX
} from 'lucide-react';

import { QuizStep } from './types';
import { QUESTIONS_DATA } from './questionsData';
import { DessertRoulette } from './components/DessertRoulette';
import { LoveSlider } from './components/LoveSlider';
import { CoupleCelebration } from './components/CoupleCelebration';
import { ErrorPopup } from './components/ErrorPopup';
import { HeartConfetti } from './components/HeartConfetti';
import { RomanticSynth } from './utils/romanticSynth';

export default function App() {

  const [step, setStep] = useState<QuizStep>('welcome');
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [showError, setShowError] = useState(false);
  const [customErrorMessage, setCustomErrorMessage] = useState<string>('');
  const [shakeApp, setShakeApp] = useState(false);
  const [selectedDessert, setSelectedDessert] = useState<string | null>(null);
  const [lovePercentage, setLovePercentage] = useState<number>(100);

  // Global Synthesizer Sound Engine - zero network overhead, immune to CORS/iframe blocks
  const [synth] = useState(() => new RomanticSynth());
  const [isPlaying, setIsPlaying] = useState(false);

  // Self-cleaning active audio loops on unmount conditions
  useEffect(() => {
    return () => {
      synth.stop();
    };
  }, [synth]);

  const toggleMusic = () => {
    if (isPlaying) {
      synth.stop();
      setIsPlaying(false);
    } else {
      synth.start();
      setIsPlaying(true);
    }
  };

  // Restart the whole quiz flow
  const resetQuiz = () => {
    setStep('welcome');
    setSelectedOption(null);
    setShowError(false);
    setCustomErrorMessage('');
    setSelectedDessert(null);
    setLovePercentage(100);
  };

  // Get current active question based on step state
  let currentQuestion = QUESTIONS_DATA[0];
  if (step === 'q1') currentQuestion = QUESTIONS_DATA[0];
  if (step === 'q2') currentQuestion = QUESTIONS_DATA[1];
  if (step === 'q3') currentQuestion = QUESTIONS_DATA[2];

  const handleOptionSelect = (option: string) => {
    setSelectedOption(option);
  };

  const handleNextStep = () => {
    if (!selectedOption) return;

    // Check if the selected option is correct
    if (selectedOption !== currentQuestion.correctAnswer) {
      // Find humor responses and funny sweet callouts for each incorrect choice
      let msg = "Tente de novo, meu amor! 👀💖";
      
      if (currentQuestion.id === 1) { // Alianças
        if (selectedOption === '03/08/2024') {
          msg = "Hum... Quase lá, amor! Nessa data a gente já vivia sob pura ansiedade, mas o dia oficial foi outro! 💍✨";
        } else if (selectedOption === '13/07/2024') {
          msg = "Ih, viajou! Em julho a gente ainda tava engatinhando nos deliciosos preparativos... 😂❄️";
        } else if (selectedOption === '20/07/2024') {
          msg = "Errou! Esqueceu a data real das nossas alianças? Vou ter que cobrar beijos adicionais como multa! 😘💖";
        }
      } else if (currentQuestion.id === 2) { // Restaurantes nunca fomos
        if (selectedOption === 'Madero') {
          msg = "Espera aí, amor! Nós já fomos no Madero devorar aquele hambúrguer delicioso com batatinha frita! 🍔🍟";
        } else if (selectedOption === 'Hannover') {
          msg = "Epa! Como esquecer aquele fondue dos deuses à luz de velas regado a morangos no Hannover? 🥰🍫🍷";
        } else if (selectedOption === 'Holy burguer') {
          msg = "Lógico que fomos! Aquele hambúrguer suculento no Holy Burguer no centro já foi devorado por nós! 😋🍔";
        }
      } else if (currentQuestion.id === 3) { // Primeiro momento Eu Te Amo
        if (selectedOption === 'Pelo WhatsApp depois do shopping') {
          msg = "Nananinanão! Nosso primeiro 'Eu te amo' não foi frio por mensagem assim não, foi caloroso e inesquecível! 📱💔";
        } else if (selectedOption === 'Na escola depois de termos ficado a primeira vez') {
          msg = "Na escola a gente só trocava olhares bobos e sorria! O 'Eu te amo' demorou um pouquinho mais para florescer! 🏫💞";
        }
      }

      setCustomErrorMessage(msg);
      // Trigger a visual shake keyframe feedback
      setShakeApp(true);
      setTimeout(() => setShakeApp(false), 500);
      setShowError(true);
      return;
    }

    // If correct!
    if (step === 'q1') {
      setStep('q2');
      setSelectedOption(null);
    } else if (step === 'q2') {
      setStep('dica');
      setSelectedOption(null);
    } else if (step === 'q3') {
      setStep('roulette');
      setSelectedOption(null);
    }
  };

  const handleRetry = () => {
    setShowError(false);
    setSelectedOption(null);
  };


  // Maps custom dynamic icon
  const renderQuestionIcon = (iconName: string) => {
    switch (iconName) {
      case 'HeartHandshake':
        return <HeartHandshake className="w-7 h-7 text-primary animate-pulse" />;
      case 'Utensils':
        return <Utensils className="w-7 h-7 text-primary" />;
      case 'MessageCircleHeart':
        return <MessageCircle className="w-7 h-7 text-primary animate-bounce" />;
      default:
        return <Heart className="w-7 h-7 text-primary" />;
    }
  };

  const getStepProgress = (): string => {
    switch (step) {
      case 'welcome': return '0%';
      case 'q1': return '14%';
      case 'q2': return '28%';
      case 'dica': return '42%';
      case 'q3': return '57%';
      case 'roulette': return '71%';
      case 'scale': return '85%';
      case 'completed': return '100%';
      default: return '0%';
    }
  };

  const getStepHeaderLabel = (): string => {
    switch (step) {
      case 'q1': return 'Passo 2 de 8 - Nossas Alianças';
      case 'q2': return 'Passo 3 de 8 - Restaurantes';
      case 'dica': return 'Passo 4 de 8 - De Olho na Dica 👀';
      case 'q3': return 'Passo 5 de 8 - Primeiro Eu Te Amo';
      case 'roulette': return 'Passo 6 de 8 - Nosso Doce';
      case 'scale': return 'Passo 7 de 8 - Quão Grande é o Seu Amor?';
      case 'completed': return 'Passo 8 de 8 - Nosso Presente Especial 🎁❤️';
      default: return '';
    }
  };


  const shakeVariants = {
    idle: { x: 0 },
    shake: {
      x: [0, -8, 8, -6, 6, -3, 3, 0],
      transition: { duration: 0.45, ease: 'easeInOut' }
    }
  };

  return (
    <div className="w-full min-h-screen py-8 px-4 flex items-center justify-center relative select-none overflow-hidden">
      
      {/* Absolute Decorative Floating Love Hearts in background */}
      <div className="absolute top-[-10%] left-[-10%] w-[120%] h-[40%] bg-gradient-to-b from-[#ffdad9]/30 to-transparent rounded-[100%] opacity-70 pointer-events-none"></div>
      <div className="absolute bottom-10 right-10 w-72 h-72 bg-[#fed65b]/5 rounded-full blur-3xl pointer-events-none"></div>
      
      {/* Rain falling hearts visible ONLY on final screen */}
      {step === 'completed' && <HeartConfetti />}

      {/* Main Handheld Layout Container with elegant custom shake transition feedback */}
      <motion.main 
        variants={shakeVariants}
        animate={shakeApp ? 'shake' : 'idle'}
        className="w-full max-w-[450px] min-h-[660px] max-h-[885px] relative bg-cream-surface rounded-[32px] shadow-[0_20px_50px_rgba(123,84,85,0.15)] overflow-hidden flex flex-col justify-between border border-outline-variant/40"
      >
        
        {/* Animated progressive gold progress bar */}
        <div className="w-full h-1.5 bg-surface-variant absolute top-0 left-0 z-10">
          <motion.div 
            className="h-full bg-secondary-container"
            initial={{ width: '0%' }}
            animate={{ width: getStepProgress() }}
            transition={{ duration: 0.6, ease: 'easeInOut' }}
          />
        </div>

        {/* Global navigation and progress indicators + Music trigger */}
        {step !== 'welcome' ? (
          <div className="pt-6 px-6 pb-2 flex justify-between items-center relative z-20 transition-all">
            <button 
              onClick={resetQuiz}
              className="w-9 h-9 flex items-center justify-center text-[#ff4d6d] hover:bg-[#fff0f5] rounded-full transition-colors active:scale-90"
              title="Voltar ao início"
            >
              <X className="w-5 h-5" />
            </button>
            
            <span className="font-sans text-[10px] font-bold text-primary tracking-wider uppercase text-center">
              {getStepHeaderLabel()}
            </span>

            {/* Premium Integrated Header Sound Control */}
            <button
              onClick={toggleMusic}
              className="w-9 h-9 flex items-center justify-center bg-primary/10 hover:bg-primary/20 rounded-full text-[#ff4d6d] transition-colors active:scale-90 relative"
              title={isPlaying ? 'Pausar música' : 'Iniciar música em tom romântico'}
            >
              {isPlaying ? (
                <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 4, ease: 'linear' }}>
                  <Music className="w-4 h-4 text-primary" />
                </motion.div>
              ) : (
                <VolumeX className="w-4 h-4 text-primary" />
              )}
            </button>
          </div>
        ) : (
          /* Welcome Screen floating music trigger */
          <div className="absolute top-6 right-6 z-30">
            <button
              onClick={toggleMusic}
              className="w-9 h-9 flex items-center justify-center bg-white/95 hover:bg-[#ff4d6d] hover:text-white border border-[#ffe5ec] rounded-full text-[#ff4d6d] shadow-md transition-colors active:scale-90"
              title="Deixe o som rodar ✨"
            >
              {isPlaying ? (
                <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 4, ease: 'linear' }}>
                  <Music className="w-4.5 h-4.5 text-primary" />
                </motion.div>
              ) : (
                <VolumeX className="w-4.5 h-4.5" />
              )}
            </button>
          </div>
        )}

        {/* Dynamic content rendering with slide and fade transitions */}
        <div className="flex-1 px-6 pb-6 pt-3 relative z-10 flex flex-col justify-center">
          <AnimatePresence mode="wait">
            
            {/* WELCOME SCREEN (PAGE 1) */}
            {step === 'welcome' && (
              <motion.div
                key="welcome"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="flex flex-col items-center text-center py-6 h-full justify-between"
              >
                {/* Gold glowing beating heart motif */}
                <div className="mb-4 relative animate-heartbeat">
                  <Heart className="w-14 h-14 text-secondary-container fill-secondary-container drop-shadow-[0_2px_12px_rgba(254,214,91,0.5)]" />
                  <Sparkles className="absolute -top-1 -right-2 w-5 h-5 text-[#ff4d6d] animate-pulse" />
                </div>

                {/* Content text block with responsive elegant serif fonts */}
                <div className="mb-6 px-2">
                  <h1 className="font-serif text-[26px] font-bold text-surface-tint tracking-tight leading-tight">
                    Oi, meu amor! 🌹<br />
                    <span className="italic text-primary font-semibold text-2xl">Feliz Dia dos Namorados!</span>
                  </h1>
                  
                  {/* Detailed paragraph describing relationship anniversary details from prompt page 1 */}
                  <div className="font-sans text-[11.5px] text-on-surface-variant leading-relaxed space-y-2 mt-4 max-w-[280px] mx-auto text-center">
                    <p>
                        Hoje é o dia dos namorados, e amanhã faltará apenas <strong>1 mês</strong> para celebrarmos os nossos <strong>2 anos</strong> juntos… ❤️
                    </p>
                    <p>
                        E para comemorar, eu tenho um presente muito especial reservado para você!
                    </p>
                    <p className="font-bold text-primary italic">
                        Mas para ganhar, antes você precisa acertar algumas perguntas sobre nós… 💖
                    </p>
                  </div>
                </div>

                {/* Romantic Arch frame representing stairs of a beautiful palace */}
                <div className="w-full max-w-[220px] aspect-[4/5] rounded-t-[100px] rounded-b-xl overflow-hidden mb-6 shadow-md bg-surface-container relative border border-[#ffffff]/40">
                  <img 
                    alt="Monumento Histórico Nosso Amor"
                    className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                    referrerPolicy="no-referrer"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuA3tx-nQHxkHnEsXh5OEkSobaKOqnyJP0OjF3_dHB9O-bz7_ueI5UkD7nRx9z98MfIgWO_CiCd0Zga9pygmjxm8O90b9MVmihDW49nG8zS__SW40DDz-dE0do2rKTe3-0nFJjSyYjMcnEnZnq8jBZPqr1p9eK_WBUAulx2eeeagX9gJxRnVygJ4ahnGXvUnk4t8xsiGvejpXuQD9EYfIdOJ_bhkRLQmC613YAOSGORtI6TMz5jJs6SnT1feRoNv4lGaXh2oVxdDZMSt"
                  />
                </div>

                {/* Primary CTA button */}
                <button
                  onClick={() => setStep('q1')}
                  className="w-full max-w-[290px] h-14 bg-gradient-to-r from-[#ff4d6d] to-[#ff758f] text-white font-black text-[15px] rounded-full shadow-[0_8px_20px_rgba(255,77,109,0.3)] hover:shadow-[0_12px_24px_rgba(255,77,109,0.55)] hover:scale-102 active:scale-95 transition-all duration-300 flex items-center justify-center gap-2 group border border-white/20 cursor-pointer"
                >
                  Estou pronto para o quiz! 🏹❤️
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
              </motion.div>
            )}

            {/* QUESTIONS STATE (STAGE 2, 3, 5) */}
            {(step === 'q1' || step === 'q2' || step === 'q3') && (
              <motion.div
                key={`question-${currentQuestion.id}`}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.35 }}
                className="flex flex-col h-full justify-between py-2"
              >
                {/* Header question and interactive icon */}
                <div className="text-center mb-6">
                  <div className="w-14 h-14 mx-auto mb-4 bg-primary/10 rounded-full flex items-center justify-center shadow-inner">
                    {renderQuestionIcon(currentQuestion.icon)}
                  </div>
                  <h2 className="font-serif text-2xl font-bold text-[#5c0d16] leading-tight px-3">
                    {currentQuestion.title}
                  </h2>
                  <p className="font-sans text-[11px] text-[#ff4d6d] max-w-[250px] mx-auto mt-2 leading-relaxed italic">
                    {currentQuestion.hint}
                  </p>
                </div>

                {/* Interactive premium option selector layout */}
                <div className="flex flex-col gap-3 my-4">
                  {currentQuestion.options.map((option) => {
                    const isSelected = selectedOption === option;
                    return (
                      <button
                        key={option}
                        onClick={() => handleOptionSelect(option)}
                        className={`group relative w-full rounded-2xl p-4 text-left flex items-center justify-between border transition-all duration-300 select-none cursor-pointer ${
                          isSelected 
                            ? 'bg-[#ffccd5]/30 border-primary shadow-[0_4px_14px_rgba(255,77,109,0.15)]' 
                            : 'bg-white border-[#ffccd5]/60 hover:border-[#ff4d6d] hover:bg-[#fff0f5]'
                        }`}
                      >
                        <span className={`font-sans text-[12.5px] font-bold ${
                          isSelected ? 'text-[#c9184a]' : 'text-[#5d3a3b]'
                        }`}>
                          {option}
                        </span>

                        {/* Interactive custom circular dot indicator */}
                        <div className={`w-5.5 h-5.5 rounded-full border-2 flex items-center justify-center transition-all ${
                          isSelected ? 'border-[#ff4d6d] bg-[#ff8fa3]/25' : 'border-[#ffccd5] group-hover:border-[#ff4d6d]'
                        }`}>
                          <div className={`w-2.5 h-2.5 rounded-full bg-[#ff4d6d] transition-opacity duration-200 ${
                            isSelected ? 'opacity-100' : 'opacity-0'
                          }`} />
                        </div>
                      </button>
                    );
                  })}
                </div>

                {/* Progressive confirmation button layout */}
                <button
                  onClick={handleNextStep}
                  disabled={!selectedOption}
                  className={`w-full max-w-[280px] h-12 mx-auto rounded-full font-bold text-xs flex items-center justify-center gap-2 shadow-sm transition-all text-white border border-transparent ${
                    selectedOption 
                      ? 'bg-gradient-to-r from-[#ff4d6d] to-[#ff758f] cursor-pointer hover:shadow-[0_8px_20px_rgba(255,77,109,0.35)] hover:scale-102 border-white/15' 
                      : 'bg-slate-200 text-slate-400 border border-slate-300 cursor-not-allowed opacity-60'
                  }`}
                >
                  Continuar Resposta
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </motion.div>
            )}

            {/* INTERMEDIATE DICA SCREEN (STAGE 4) */}
            {step === 'dica' && (
              <motion.div
                key="dica"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.35 }}
                className="flex flex-col h-full justify-between items-center text-center py-4"
              >
                <div>
                  <div className="w-16 h-16 rounded-full bg-[#ffccd5]/20 border border-[#ff4d6d] flex items-center justify-center mb-4 mx-auto shadow-inner text-primary">
                    <Compass className="w-8 h-8 animate-spin" style={{ animationDuration: '6s' }} />
                  </div>
                  
                  <span className="text-[10px] tracking-widest uppercase font-bold text-primary opacity-70 block mb-1">Dica Secreta</span>
                  <h2 className="font-serif text-[28px] font-black text-[#601a24] leading-tight">
                    Já fica a dica… 👀👀
                  </h2>
                </div>

                {/* Beautiful illustration or card showcasing visual clues about the upcoming plan */}
                <div className="w-full max-w-[280px] bg-[#fffbfb] rounded-3xl p-5 border-2 border-dashed border-[#ffccd5] shadow-inner my-6 text-left relative overflow-hidden">
                  <div className="absolute -top-6 -right-6 w-16 h-16 bg-primary/10 rounded-full blur-xl pointer-events-none" />
                  
                  <h4 className="font-serif text-[15px] font-bold text-primary mb-2 flex items-center gap-1.5 leading-none">
                    <Sparkles className="w-4 h-4 text-[#ff4d6d]" />
                    Plano Perfeito: Terraço Itália
                  </h4>
                  
                  <p className="font-sans text-[11px] text-on-surface-variant leading-relaxed">
                    Estar no topo do mundo admirando as luzes de São Paulo é o plano ideal para comemorar os nossos melhores anos juntos. Fica a dica para o nosso próximo jantar dos sonhos! 🕯️🌃✨
                  </p>
                </div>

                <button
                  onClick={() => setStep('q3')}
                  className="w-full max-w-[280px] h-12 bg-gradient-to-r from-[#ff4d6d] to-[#ff758f] text-white font-bold rounded-full shadow-[0_8px_20px_rgba(255,77,109,0.3)] hover:shadow-[0_12px_24px_rgba(255,77,109,0.45)] hover:scale-102 active:scale-95 transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer border border-white/20"
                >
                  Ir para a Próxima Pergunta
                  <ArrowRight className="w-4 h-4" />
                </button>
              </motion.div>
            )}

            {/* DESSERT ROULETTE (STAGE 6) */}
            {step === 'roulette' && (
              <motion.div
                key="roulette"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.35 }}
                className="w-full h-full"
              >
                <DessertRoulette 
                  onComplete={(dessert) => {
                    setSelectedDessert(dessert);
                    setStep('scale');
                  }} 
                />
              </motion.div>
            )}

            {/* SCALE MEASURE TEMPERATURE (STAGE 7) */}
            {step === 'scale' && (
              <motion.div
                key="scale"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.35 }}
                className="w-full h-full"
              >
                <LoveSlider 
                  selectedDessert={selectedDessert || 'Pétit gateau'} 
                  onReset={resetQuiz} 
                  onComplete={(val) => {
                    setLovePercentage(val);
                    setStep('completed');
                  }}
                />
              </motion.div>
            )}

            {/* COMPLETED CELEBRATION BLOCK WITH MUSIC AND COUPLE PHOTO (STAGE 8) */}
            {step === 'completed' && (
              <motion.div
                key="completed"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4 }}
                className="w-full h-full"
              >
                <CoupleCelebration 
                  lovePercentage={lovePercentage}
                  selectedDessert={selectedDessert || 'Delícia Secreta'} 
                  onReset={resetQuiz} 
                />
              </motion.div>
            )}

          </AnimatePresence>
        </div>
      </motion.main>

      {/* Pop-up for Wrong answers */}
      <ErrorPopup 
        isOpen={showError} 
        onRetry={handleRetry} 
        message={customErrorMessage}
      />

    </div>
  );
}
