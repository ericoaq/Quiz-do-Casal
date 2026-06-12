import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Heart, Award, ZoomIn, Upload, X } from 'lucide-react';

interface PolaroidCard {
  id: string;
  title: string;
  date: string;
  imageSrc: string;
  backText: string;
  sticker: string;
  tag: string;
}

interface PolaroidMuralProps {
  lovePercentage: number;
  selectedDessert: string;
}

export const PolaroidMural: React.FC<PolaroidMuralProps> = ({
  lovePercentage,
  selectedDessert
}) => {
  const [customPhotos, setCustomPhotos] = useState<Record<string, string>>({});
  const [enlargedCard, setEnlargedCard] = useState<PolaroidCard | null>(null);

  useEffect(() => {
    // Load saved couple photos from localStorage
    const saved = localStorage.getItem('amour_mural_photos');
    if (saved) {
      try {
        setCustomPhotos(JSON.parse(saved));
      } catch (e) {
        console.error(e);
      }
    }
  }, []);

  const handlePhotoUpload = (id: string, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64Data = reader.result as string;
        const updated = { ...customPhotos, [id]: base64Data };
        setCustomPhotos(updated);
        localStorage.setItem('amour_mural_photos', JSON.stringify(updated));
      };
      reader.readAsDataURL(file);
    }
  };

  const polaroidData: PolaroidCard[] = [
    {
      id: "aliancas",
      title: "Passo das Alianças 💍",
      date: "03 de Agosto de 2024",
      imageSrc: customPhotos["aliancas"] || "https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?auto=format&fit=crop&q=80&w=400",
      tag: "O COMEÇO",
      sticker: "🌟",
      backText: "No dia 03/08/2024, nossas mãos se uniram. Colocar a aliança no seu dedo foi o meu sim mais feliz, uma marca na história das nossas vidas que brilha forte! ❤️"
    },
    {
      id: "couple",
      title: "Nós Dois Juntos 👩‍❤️‍👨",
      date: "Nosso Olhar Eterno",
      imageSrc: customPhotos["couple"] || "https://images.unsplash.com/photo-1518199266791-5375a83164ba?auto=format&fit=crop&q=80&w=400",
      tag: "DIA DOS NAMORADOS",
      sticker: "💖",
      backText: "Amanhã faltará apenas 1 mês para completarmos dois anos. Amo você ontem, hoje e para sempre!"
    },
    {
      id: "doce",
      title: `Casal Perfeito ✨`,
      date: "Momentos Mágicos",
      imageSrc: customPhotos["doce"] || "https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?auto=format&fit=crop&q=80&w=400",
      tag: "NOSSO MOMENTO",
      sticker: "📸",
      backText: `Você escolheu saborear ${selectedDessert} hoje à noite! Para selar nosso romance da forma mais doce possível. Aguarde esse carinho divino no nosso jantar ideal hoje. Te amo demais! 😋🍒`
    }
  ];

  return (
    <div className="w-full flex flex-col items-center mt-2">
      <div className="flex items-center gap-1.5 justify-center mb-5 bg-[#ffe5ec] border border-[#ffb3c1] rounded-full px-4 py-1">
        <Sparkles className="w-3.5 h-3.5 text-[#ff4d6d] animate-pulse" />
        <span className="font-sans text-[10px] font-bold text-[#c9184a] uppercase tracking-wider">Mini-Mural Polaroid Interativo ✨</span>
      </div>

      <p className="font-sans text-[11px] text-[#5c0d16] text-center max-w-[290px] mb-6 leading-relaxed bg-[#fff0f5] p-2 rounded-xl border border-[#ffccd5]">
        Clique nos retratos para <span className="font-bold underline">AMPLIAR</span>! Você também pode <span className="font-bold underline">ARRASTÁ-LOS</span> pela mesa ou <span className="font-bold underline">TROCAR AS FOTOS</span>! 👇🌟
      </p>

      {/* Scattered Interactive Workspace Desk Board */}
      <div className="relative w-full h-[370px] bg-[#fffbfb] border border-[#ffccd5]/50 rounded-[28px] overflow-hidden p-4 shadow-inner flex items-center justify-center">
        
        <div className="absolute inset-0 bg-[radial-gradient(#ffccd5_1px,transparent_1px)] [background-size:16px_16px] opacity-40" />

        {polaroidData.map((pol, index) => {
          const tiltX = index === 0 ? -6 : index === 1 ? 0 : 7;
          const tiltY = index === 0 ? -12 : index === 1 ? -1 : 16;
          const leftOffset = index === 0 ? "2%" : index === 1 ? "24%" : "44%";
          const topOffset = index === 0 ? "8%" : index === 1 ? "14%" : "10%";

          return (
            <motion.div
              key={pol.id}
              drag
              dragConstraints={{ left: -10, right: 10, top: -10, bottom: 10 }}
              dragElastic={0.05}
              whileDrag={{ scale: 1.05, zIndex: 50, shadow: "0px 15px 30px rgba(0,0,0,0.15)" }}
              initial={{ opacity: 0, scale: 0.8, rotate: tiltX }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.15 }}
              style={{
                position: 'absolute',
                left: leftOffset,
                top: topOffset,
                perspective: '1000px',
                zIndex: index + 10,
              }}
              className="cursor-grab active:cursor-grabbing shrink-0 select-none pb-4"
            >
              <div className="relative w-36 sm:w-40 h-[190px] sm:h-[210px] transform-gpu">
                <div className="w-full h-full relative" onClick={() => setEnlargedCard(pol)}>
                  
                  {/* FRONT SIDE */}
                  <div className="absolute inset-0 bg-white border border-[#eae0d5] p-2 pb-5 rounded-md shadow-[0_4px_12px_rgba(255,179,193,0.3)] flex flex-col">
                    <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-white/95 border border-[#ffb3c1] text-xs w-6 h-6 rounded-full flex items-center justify-center shadow-xs z-10">
                      {pol.sticker}
                    </div>

                    <div className="w-full h-24 sm:h-28 bg-[#fff0f5] overflow-hidden rounded-xs border border-[#ffccd5] relative group cursor-pointer">
                      <img 
                        src={pol.imageSrc} 
                        alt={pol.title} 
                        className="w-full h-full object-cover select-none pointer-events-none" 
                        referrerPolicy="no-referrer"
                      />
                      {/* Hover action overlay */}
                      <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <ZoomIn className="w-6 h-6 text-white" />
                      </div>

                      {/* Photo Upload Input just for this frame */}
                      <label 
                        className="absolute bottom-1 right-1 w-6 h-6 bg-white/80 hover:bg-white text-[#ff4d6d] rounded-full flex items-center justify-center cursor-pointer shadow-sm z-20 transition-transform hover:scale-110"
                        onClick={e => e.stopPropagation()} // prevent modal open
                        title="Trocar Foto"
                      >
                        <Upload className="w-3 h-3" />
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => handlePhotoUpload(pol.id, e)}
                          className="hidden"
                        />
                      </label>
                    </div>

                    <div className="flex-1 mt-2.5 flex flex-col justify-between text-center">
                      <span className="font-serif text-[10px] font-black text-[#5c0d16] leading-none mb-1 block select-none">
                        {pol.title}
                      </span>
                      <span className="font-mono text-[7.5px] font-medium text-[#c9184a] tracking-tight uppercase block select-none">
                        {pol.date}
                      </span>
                    </div>

                    <div className="mt-1 flex items-center justify-center">
                      <span className="text-[6.5px] font-sans font-bold bg-[#fff0f5] px-1.5 py-0.5 rounded-full border border-[#ffb3c1]/50 text-[#ff4d6d] tracking-wider scale-95 uppercase select-none">
                        {pol.tag}
                      </span>
                    </div>
                  </div>

                </div>
              </div>
            </motion.div>
          );
        })}

        <div className="absolute bottom-2.5 left-1/2 -translate-x-1/2 bg-white/95 border border-[#ffb3c1] rounded-xl px-3 py-1.5 flex items-center gap-1.5 shadow-sm text-[9.5px] text-[#c9184a] z-5 pointer-events-none">
          <Award className="w-3.5 h-3.5 text-[#ff4d6d]" />
          Seu Score Absoluto: <strong className="text-[#ff4d6d]">{lovePercentage}% de Amor!</strong> ✨📈
        </div>

      </div>

      {/* LIGHTBOX MODAL */}
      <AnimatePresence>
        {enlargedCard && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 sm:p-6"
            onClick={() => setEnlargedCard(null)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              onClick={e => e.stopPropagation()}
              className="bg-white rounded-2xl w-full max-w-sm sm:max-w-md overflow-hidden shadow-2xl relative"
            >
              <button 
                onClick={() => setEnlargedCard(null)}
                className="absolute top-3 right-3 bg-white/80 hover:bg-white text-black rounded-full w-8 h-8 flex items-center justify-center z-20 shadow-md transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
              
              <div className="w-full aspect-[4/5] bg-neutral-200 relative">
                <img 
                  src={enlargedCard.imageSrc} 
                  alt={enlargedCard.title}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="p-5 sm:p-6 text-center bg-[#fff0f5]">
                <h4 className="font-serif text-xl sm:text-2xl font-bold text-[#5c0d16] mb-2">{enlargedCard.title}</h4>
                <p className="font-sans text-xs sm:text-sm text-[#c9184a] font-medium opacity-90 italic mb-4">
                  {enlargedCard.date}
                </p>
                <p className="font-sans text-xs sm:text-sm text-neutral-700 leading-relaxed">
                  {enlargedCard.backText}
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
