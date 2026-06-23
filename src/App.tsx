import React, { useState, useMemo } from 'react';
import { 
  ChevronLeft, 
  ChevronRight, 
  Search, 
  Play, 
  Award, 
  HelpCircle, 
  BookOpen, 
  RotateCcw, 
  Info, 
  User, 
  CheckCircle2, 
  XCircle, 
  ArrowRight,
  Sparkles,
  Map,
  X,
  Briefcase,
  ShoppingBag,
  Building2,
  Globe,
  Plus,
  Minus,
  TrendingUp,
  Flame,
  Heart,
  Coins
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { GLOSSARY_TERMS, QUIZ_QUESTIONS, REIGNS_CARDS, GlossaryTerm, QuizQuestion, ReignsCard } from './data';
// @ts-ignore
import esplanadaBg from './assets/images/esplanada_bg_1781448909333.jpg';

// Componente visual ondulado
const Squiggle = ({ className = "w-full text-gray-800" }: { className?: string }) => (
  <svg viewBox="0 0 100 10" preserveAspectRatio="none" className={`h-2 ${className}`} fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M 0 5 Q 12.5 0, 25 5 T 50 5 T 75 5 T 100 5 animate-pulse" />
  </svg>
);

const RoundedQuestionMark = ({ className = "text-[#8ebcb0]" }: { className?: string }) => (
  <svg 
    viewBox="0 0 40 50" 
    className={className} 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
  >
    <path 
      d="M10 16C10 11 14 6.5 20 6.5C26 6.5 30 11 30 16C30 20.5 27 23.5 24 26C21 28.5 20 30.2 20 33" 
      stroke="currentColor" 
      strokeWidth="9.5" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    />
    <circle cx="20" cy="43.5" r="5.5" fill="currentColor" />
  </svg>
);

const StatGauge = ({ value, icon: Icon, label, showInfluence }: { value: number; icon: any; label: string; showInfluence: boolean }) => {
  const radius = 20;
  const stroke = 3;
  const normalizedRadius = radius - stroke * 2;
  const circumference = normalizedRadius * 2 * Math.PI;
  const strokeDashoffset = circumference - (value / 100) * circumference;

  // Alerta para niveis criticos
  const isCritical = value <= 25 || value >= 80;
  const strokeColor = isCritical ? '#f43f5e' : '#14b8a6';

  return (
    <div className="flex flex-col items-center gap-1 relative group cursor-help select-none">
      <div className={`relative h-11 w-11 flex items-center justify-center rounded-full transition-all duration-300 ${isCritical ? 'bg-rose-50 border border-rose-200/50' : 'bg-slate-100 hover:bg-slate-200/80'} shadow-sm`}>
        {/* Traco do indicador circular */}
        <svg className="absolute inset-0 transform -rotate-90" width="100%" height="100%" viewBox="0 0 40 40">
          <circle
            className={isCritical ? "text-rose-100/35" : "text-gray-100"}
            strokeWidth={stroke}
            stroke="currentColor"
            fill="transparent"
            r={normalizedRadius}
            cx="20"
            cy="20"
          />
          <circle
            className="transition-all duration-500 ease-out"
            strokeWidth={stroke}
            stroke={strokeColor}
            strokeDasharray={circumference + ' ' + circumference}
            style={{ strokeDashoffset }}
            strokeLinecap="round"
            fill="transparent"
            r={normalizedRadius}
            cx="20"
            cy="20"
          />
        </svg>
        <Icon className={`z-10 ${isCritical ? 'text-rose-600' : 'text-[#152352]'} transition-colors duration-300`} size={18} />
      </div>

      {/* Rotulo numerico de porcentagem abaixo */}
      <span className={`text-[10px] font-black tracking-tight ${isCritical ? 'text-rose-600 animate-pulse' : 'text-[#152352]/75'}`}>
        {value}%
      </span>
      
      {/* Balao de dica ao passar o mouse */}
      <div className="absolute top-[52px] md:top-2 md:left-[52px] bg-[#152352] text-white text-[10px] px-2.5 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 pointer-events-none transition-all duration-200 z-50 whitespace-nowrap font-bold shadow-lg border border-slate-700/50">
        <span className="text-slate-300 font-medium">{label}:</span>{' '}
        <span className={isCritical ? 'text-rose-300' : 'text-teal-300'}>{value}%</span>
      </div>

      {/* Ponto indicador de impacto */}
      {showInfluence && (
        <div className="absolute -bottom-1 h-1.5 w-1.5 bg-amber-500 rounded-full animate-ping" />
      )}
    </div>
  );
};

const CharacterIllustration = ({ type }: { type: string }) => {
  switch (type) {
    case 'industry':
      return (
        <svg viewBox="0 0 120 120" className="w-full h-full text-amber-700">
          <defs>
            <linearGradient id="grad-ind" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#fffbeb" />
              <stop offset="100%" stopColor="#fef3c7" />
            </linearGradient>
          </defs>
          <rect width="120" height="120" rx="36" fill="url(#grad-ind)" />
          {/* Fábricas estilizadas */}
          <path d="M25 85 L25 55 L45 70 L45 55 L65 70 L65 45 L85 62 L85 85 Z" fill="#d97706" opacity="0.15" />
          <path d="M35 85 L35 60 L50 72 L50 60 L65 72 L65 52 L80 67 L80 85 Z" fill="#b45309" />
          {/* Chaminés de fábrica e fumaça */}
          <line x1="42" y1="60" x2="42" y2="40" stroke="#78350f" strokeWidth="4" strokeLinecap="round" />
          <line x1="58" y1="60" x2="58" y2="35" stroke="#78350f" strokeWidth="4" strokeLinecap="round" />
          <circle cx="42" cy="30" r="4" fill="#d97706" opacity="0.6" />
          <circle cx="46" cy="22" r="5" fill="#d97706" opacity="0.4" />
          <circle cx="58" cy="25" r="5" fill="#d97706" opacity="0.6" />
          <circle cx="64" cy="16" r="7" fill="#d97706" opacity="0.3" />
          {/* Grande engrenagem no fundo/frente */}
          <circle cx="85" cy="85" r="16" fill="none" stroke="#78350f" strokeWidth="5" />
          <circle cx="85" cy="85" r="8" fill="#fef3c7" stroke="#78350f" strokeWidth="3" />
          {/* Dentes da engrenagem */}
          <path d="M85 64 L85 69 M85 101 L85 106 M64 85 L69 85 M101 85 L106 85 M70 70 L74 74 M96 96 L100 100 M70 100 L74 96 M96 70 L100 74" stroke="#78350f" strokeWidth="4" strokeLinecap="round" />
          {/* Linhas de grade em primeiro plano indicando planejamento */}
          <path d="M20 95 L100 95" stroke="#78350f" strokeWidth="2" opacity="0.4" strokeLinecap="round" />
        </svg>
      );
    case 'workers':
      return (
        <svg viewBox="0 0 120 120" className="w-full h-full text-rose-700">
          <defs>
            <linearGradient id="grad-work" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#fff5f5" />
              <stop offset="100%" stopColor="#fee2e2" />
            </linearGradient>
          </defs>
          <rect width="120" height="120" rx="36" fill="url(#grad-work)" />
          {/* Sol nascente e silhueta de casas */}
          <circle cx="60" cy="55" r="22" fill="#fca5a5" opacity="0.3" />
          <path d="M25 85 L35 72 L45 85 M40 85 L52 68 L64 85 M75 85 L95 85 M75 85 L75 75 L88 75 L88 85 Z" stroke="#b91c1c" strokeWidth="3" strokeLinejoin="round" fill="none" opacity="0.4" />
          {/* Silhuetas de cooperativa de trabalhadores/família, cabeças e ombros estilizados sobrepostos */}
          <path d="M30 90 C30 75, 45 75, 50 90 Z" fill="#991b1b" />
          <circle cx="40" cy="68" r="9" fill="#991b1b" />
          
          <path d="M65 90 C65 72, 85 72, 90 90 Z" fill="#b91c1c" />
          <circle cx="78" cy="64" r="10" fill="#b91c1c" />

          {/* Capacete de proteção sobreposto para representação do trabalho */}
          <path d="M35 59 C35 54, 45 54, 45 59 Z" fill="#f59e0b" />
          <rect x="33" y="58" width="14" height="2" fill="#d97706" rx="0.5" />
        </svg>
      );
    case 'central_bank':
      return (
        <svg viewBox="0 0 120 120" className="w-full h-full text-indigo-700">
          <defs>
            <linearGradient id="grad-bank" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#edf2ff" />
              <stop offset="100%" stopColor="#e0e7ff" />
            </linearGradient>
          </defs>
          <rect width="120" height="120" rx="36" fill="url(#grad-bank)" />
          {/* Classic Pillars temple facade */}
          <path d="M25 80 L95 80 M25 45 L95 45 M25 45 L60 25 L95 45 Z" stroke="#3730a3" strokeWidth="4" strokeLinejoin="round" fill="none" />
          {/* Pillars */}
          <line x1="35" y1="45" x2="35" y2="80" stroke="#3730a3" strokeWidth="4.5" />
          <line x1="50" y1="45" x2="50" y2="80" stroke="#3730a3" strokeWidth="4.5" />
          <line x1="70" y1="45" x2="70" y2="80" stroke="#3730a3" strokeWidth="4.5" />
          <line x1="85" y1="45" x2="85" y2="80" stroke="#3730a3" strokeWidth="4.5" />
          {/* Golden percent / Coin overlay */}
          <circle cx="60" cy="85" r="20" fill="gold" stroke="#3730a3" strokeWidth="3.5" />
          {/* % inside coin */}
          <text x="60" y="91" fill="#3730a3" fontSize="18" fontWeight="900" textAnchor="middle" fontFamily="sans-serif">%</text>
        </svg>
      );
    case 'infrastructure':
      return (
        <svg viewBox="0 0 120 120" className="w-full h-full text-violet-700">
          <defs>
            <linearGradient id="grad-infra" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#f3e8ff" />
              <stop offset="100%" stopColor="#e9d5ff" />
            </linearGradient>
          </defs>
          <rect width="120" height="120" rx="36" fill="url(#grad-infra)" />
          {/* Suspension Bridge */}
          <path d="M15 75 C45 35, 75 35, 105 75" fill="none" stroke="#6b21a8" strokeWidth="4" strokeDasharray="1 1" opacity="0.3" />
          <path d="M15 80 C45 42, 75 42, 105 80" fill="none" stroke="#6b21a8" strokeWidth="3" />
          {/* Vertical suspension cables */}
          <line x1="35" y1="65" x2="35" y2="80" stroke="#6b21a8" strokeWidth="1.5" />
          <line x1="50" y1="55" x2="50" y2="80" stroke="#6b21a8" strokeWidth="1.5" />
          <line x1="70" y1="55" x2="70" y2="80" stroke="#6b21a8" strokeWidth="1.5" />
          <line x1="85" y1="65" x2="85" y2="80" stroke="#6b21a8" strokeWidth="1.5" />
          {/* Highway curves */}
          <path d="M20 92 Q60 50 100 92" stroke="#4c1d95" strokeWidth="8.5" fill="none" strokeLinecap="round" />
          {/* Bridge Pillars */}
          <rect x="25" y="55" width="8" height="35" fill="#6b21a8" rx="1.5" />
          <rect x="87" y="55" width="8" height="35" fill="#6b21a8" rx="1.5" />
        </svg>
      );
    case 'agro':
      return (
        <svg viewBox="0 0 120 120" className="w-full h-full text-[#15803d]">
          <defs>
            <linearGradient id="grad-agro" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#f0fdf4" />
              <stop offset="100%" stopColor="#dcfce7" />
            </linearGradient>
          </defs>
          <rect width="120" height="120" rx="36" fill="url(#grad-agro)" />
          {/* Sun setting */}
          <circle cx="60" cy="45" r="18" fill="#f59e0b" opacity="0.3" />
          <circle cx="60" cy="45" r="12" fill="#fbbf24" stroke="#15803d" strokeWidth="2" />
          {/* Rolling Hills (curves) */}
          <path d="M10 85 C35 70, 55 65, 110 85 L110 110 L10 110 Z" fill="#22c55e" opacity="0.15" />
          <path d="M10 90 C30 80, 75 75, 110 95 L110 110 L10 110 Z" fill="#16a34a" />
          {/* Parallel farm stripes on ground */}
          <path d="M40 85 L25 110" stroke="#14532d" strokeWidth="3" opacity="0.5" />
          <path d="M60 81 L55 110" stroke="#14532d" strokeWidth="3" opacity="0.5" />
          <path d="M80 84 L85 110" stroke="#14532d" strokeWidth="3" opacity="0.5" />
          {/* Dynamic Sprout/Wheat stalks */}
          <path d="M92 88 Q88 70 85 55 M92 88 Q96 72 101 58" fill="none" stroke="#14532d" strokeWidth="2.5" strokeLinecap="round" />
          <circle cx="85" cy="55" r="3" fill="#fbbf24" stroke="#14532d" strokeWidth="1.5" />
          <circle cx="101" cy="58" r="3" fill="#fbbf24" stroke="#14532d" strokeWidth="1.5" />
          <circle cx="89" cy="64" r="2.5" fill="#fbbf24" stroke="#14532d" strokeWidth="1" />
          <circle cx="97" cy="67" r="2.5" fill="#fbbf24" stroke="#14532d" strokeWidth="1" />
        </svg>
      );
    case 'treasury':
      return (
        <svg viewBox="0 0 120 120" className="w-full h-full text-zinc-700">
          <defs>
            <linearGradient id="grad-treas" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#fafafa" />
              <stop offset="100%" stopColor="#f4f4f5" />
            </linearGradient>
          </defs>
          <rect width="120" height="120" rx="36" fill="url(#grad-treas)" />
          {/* Fundo do livro de registro */}
          <rect x="35" y="30" width="50" height="65" rx="4" fill="none" stroke="#3f3f46" strokeWidth="3.5" />
          <line x1="45" y1="42" x2="75" y2="42" stroke="#3f3f46" strokeWidth="3" />
          <line x1="45" y1="52" x2="65" y2="52" stroke="#3f3f46" strokeWidth="3" />
          {/* Selo oficial */}
          <circle cx="70" cy="72" r="10" fill="#dc2626" opacity="0.85" />
          <path d="M66 69 Q70 76 74 69" fill="none" stroke="white" strokeWidth="2" />
          {/* Prato da balanca */}
          <path d="M15 80 L45 80 M15 80 Q30 92 45 80" fill="none" stroke="#27272a" strokeWidth="2.5" />
          <line x1="45" y1="80" x2="45" y2="80" />
          {/* Base da balanca */}
          <line x1="60" y1="15" x2="60" y2="105" stroke="#27272a" strokeWidth="3.5" opacity="0.1" />
          {/* Moedas empilhadas */}
          <circle cx="30" cy="85" r="10" fill="gold" stroke="#27272a" strokeWidth="2" />
          <circle cx="30" cy="90" r="10" fill="gold" stroke="#27272a" strokeWidth="2" />
          <circle cx="90" cy="85" r="10" fill="#f59e0b" stroke="#27272a" strokeWidth="2" />
          <circle cx="90" cy="90" r="10" fill="gold" stroke="#27272a" strokeWidth="2" />
        </svg>
      );
    case 'tech':
      return (
        <svg viewBox="0 0 120 120" className="w-full h-full text-cyan-700">
          <defs>
            <linearGradient id="grad-tech" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#ecfeff" />
              <stop offset="100%" stopColor="#cffafe" />
            </linearGradient>
          </defs>
          <rect width="120" height="120" rx="36" fill="url(#grad-tech)" />
          {/* Desenho do processador */}
          <rect x="35" y="35" width="50" height="50" rx="10" fill="#0891b2" stroke="#0e7490" strokeWidth="3" />
          <rect x="45" y="45" width="30" height="30" rx="6" fill="#22d3ee" stroke="#0891b2" strokeWidth="2" />
          {/* Conexoes de circuito */}
          <path d="M15 60 L35 60 M85 60 L105 60 M60 15 L60 35 M60 85 L60 105 M25 25 L40 40 M95 95 L80 80 M25 95 L40 80 M95 25 L80 40" stroke="#0891b2" strokeWidth="3.5" strokeLinecap="round" />
          <circle cx="15" cy="60" r="4.5" fill="#22d3ee" stroke="#0e7490" strokeWidth="1.5" />
          <circle cx="105" cy="60" r="4.5" fill="#22d3ee" stroke="#0e7490" strokeWidth="1.5" />
          <circle cx="60" cy="15" r="4.5" fill="#22d3ee" stroke="#0e7490" strokeWidth="1.5" />
          <circle cx="60" cy="105" r="4.5" fill="#22d3ee" stroke="#0e7490" strokeWidth="1.5" />
          {/* Centro brilhante */}
          <circle cx="60" cy="60" r="4" fill="#ecfeff" />
        </svg>
      );
    case 'social':
      return (
        <svg viewBox="0 0 120 120" className="w-full h-full text-emerald-700">
          <defs>
            <linearGradient id="grad-social" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#f0fdfa" />
              <stop offset="100%" stopColor="#ccfbf1" />
            </linearGradient>
          </defs>
          <rect width="120" height="120" rx="36" fill="url(#grad-social)" />
          {/* Desenho do livro aberto */}
          <path d="M60 82 C55 77, 43 77, 30 82 L30 45 C43 40, 55 40, 60 45" stroke="#0f766e" strokeWidth="3.5" fill="none" strokeLinecap="round" />
          <path d="M60 82 C65 77, 77 77, 90 82 L90 45 C77 40, 65 40, 60 45" stroke="#0f766e" strokeWidth="3.5" fill="none" strokeLinecap="round" />
          {/* Desenho do estetoscopio */}
          <path d="M60 45 L60 90" stroke="#0f766e" strokeWidth="2.5" opacity="0.3" />
          {/* Cruz medica */}
          <rect x="54" y="24" width="12" height="12" rx="2" fill="#14b8a6" stroke="#0f766e" strokeWidth="2" />
          <path d="M60 21 L60 39 M51 30 L69 30" stroke="#0f766e" strokeWidth="2.5" strokeLinecap="round" />
          {/* Detalhes de formatura */}
          <path d="M35 34 L18 38 L18 48" fill="none" stroke="#0d9488" strokeWidth="2" strokeLinecap="round" />
        </svg>
      );
    default:
      return (
        <svg viewBox="0 0 120 120" className="w-full h-full text-slate-700">
          <rect width="120" height="120" rx="36" fill="#f1f5f9" />
          <circle cx="60" cy="48" r="18" fill="#475569" />
          <path d="M60 70 C35 70, 25 86, 25 100 L95 100 C95 86, 85 70, 60 70 Z" fill="#475569" />
        </svg>
      );
  }
};

const RoundedBook = ({ className = "text-[#8ebcb0]" }: { className?: string }) => (
  <svg 
    viewBox="0 0 50 40" 
    className={className} 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
  >
    {/* Pagina esquerda */}
    <path 
      d="M25 32C21 29 14 29 7 32V10C14 7 21 7 25 10" 
      stroke="currentColor" 
      strokeWidth="7.5" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    />
    {/* Pagina direita */}
    <path 
      d="M25 32C29 29 36 29 43 32V10C36 7 29 7 25 10" 
      stroke="currentColor" 
      strokeWidth="7.5" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    />
    {/* Centro do livro */}
    <path 
      d="M25 10V32" 
      stroke="currentColor" 
      strokeWidth="7.5" 
      strokeLinecap="round" 
    />
  </svg>
);

const RoundedLightbulb = ({ className = "text-[#8ebcb0]" }: { className?: string }) => (
  <svg 
    viewBox="0 0 40 50" 
    className={className} 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
  >
    {/* Cupula da lampada */}
    <path 
      d="M10 20C10 13.5 14 9 20 9C26 9 30 13.5 30 20C30 25.5 26.5 28.5 24.5 32C23.5 33.5 23.5 35.5 23.5 37H16.5C16.5 35.5 16.5 33.5 15.5 32C13.5 28.5 10 25.5 10 20Z" 
      stroke="currentColor" 
      strokeWidth="7.5" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    />
    {/* Base de contato */}
    <path 
      d="M16.5 43.5H23.5" 
      stroke="currentColor" 
      strokeWidth="7.5" 
      strokeLinecap="round" 
    />
  </svg>
);

const GLOSSARY_INTERACTIVE_CARDS = [
  {
    id: "pib",
    title: "PIB",
    theme: "purple",
    bgClass: "bg-[#9995ce]/70 text-[#152352] shadow-lg shadow-[#152352]/5",
    pillClass: "bg-white/60 hover:bg-white text-[#2c3d75] hover:shadow-2xs focus:ring-2 focus:ring-white/85",
    activePillClass: "bg-white text-[#152352] shadow-md font-extrabold ring-2 ring-white/50",
    questions: [
      {
        label: "O que é?",
        title: "O que é PIB? (Produto Interno Bruto)",
        explanation: "O PIB é o principal indicador da economia. Ele representa a soma de todos os bens e serviços finais produzidos em uma região (cidade, estado ou país) dentro de um determinado período (geralmente anual ou trimestral).",
        formula: "Ótica da Despesa: PIB = C + I + G + (X - M)",
        example: "Sempre que você vai ao mercado, as empresas compram novos maquinários ou o governo constrói uma creche pública, esses valores são somados no cálculo do PIB nacional."
      },
      {
        label: "Pra que serve?",
        title: "Para que serve o PIB?",
        explanation: "Funciona como o termômetro supremo da saúde macroeconômica. Serve para avaliar se a atividade econômica do país está em expansão ou recessão, comparar o tamanho financeiro de diferentes países e orientar decisões de investimentos.",
        example: "Um PIB em alta consistente cria um ambiente confiável para empresas abrirem vagas de emprego e aumentarem a capacidade de produção de alimentos e serviços."
      },
      {
        label: "Como é medido?",
        title: "As Três Óticas Fundamentais",
        explanation: "Calcula-se o PIB por três visões equivalentes: pela Ótica da Despesa (consumo e investimento), pela Ótica do Rendimento (soma de salários, lucros e juros pagos na economia) e pela Ótica da Produção/Valor Adicionado (soma de tudo que cada empresa gerou descontando os insumos brutos).",
        formula: "Produção: PIB = Valor Bruto de Produção - Consumo Intermediário",
        example: "Evita-se a dupla contagem: para medir o PIB de uma pizza, não somamos o trigo e o leite comprados de forma isolada se já estivermos somando o preço final da pizza no restaurante."
      },
      {
        label: "O que o crescimento significa?",
        title: "Significado do Crescimento do PIB",
        explanation: "O crescimento real indica que a quantidade física de produtos e serviços gerada aumentou (descontando a inflação). No entanto, crescimento bruto não equivale a uma distribuição de renda justa. Para entender a melhora individual, cruza-se o PIB com o PIB per capita e IDH.",
        example: "Se o PIB cresce mas fica concentrado na mão de poucas empresas, a população em geral não vê melhora palpável no poder real de compra cotidiano."
      }
    ]
  },
  {
    id: "inflacao",
    title: "Inflação",
    theme: "green",
    bgClass: "bg-[#9ebeb4]/70 text-[#152352] shadow-lg shadow-[#152352]/5",
    pillClass: "bg-white/60 hover:bg-white text-[#2c3d75] hover:shadow-2xs focus:ring-2 focus:ring-white/85",
    activePillClass: "bg-white text-[#152352] shadow-md font-extrabold ring-2 ring-white/50",
    questions: [
      {
        label: "O que é?", // Corresponde exatamente ao título no mockup (o termo se repete para fins de consistência visual, mas aponta para o conteúdo de Inflação)
        title: "O que é Inflação?",
        explanation: "É a variação de aumento contínuo e generalizado dos preços médios de bens e serviços cotidianos. Ela não ocorre quando apenas um produto sobe de preço isoladamente, mas sim quando o custo de vida médio da população se eleva, reduzindo o valor de compra da moeda física.",
        example: "Se há um ano com R$ 100,00 você enchia o carrinho de supermercado, e hoje compra apenas metade daqueles mesmos alimentos, ocorreu uma perda inflacionária visível."
      },
      {
        label: "Pra que serve?",
        title: "Pra que serve medir a Inflação?",
        explanation: "Medir a inflação é vital para balizar o reajuste anual de salários, aposentadorias, aluguéis e contratos econômicos. Ela orienta o Banco Central a calibrar os juros básicos para evitar que a moeda perca seu valor real de compra aceleradamente.",
        example: "Se a inflação mensal projetada sobe acima do aceitável, o Banco Central tende a subir a taxa Selic para encarecer o crédito e acalmar a febre de consumo do varejo."
      },
      {
        label: "Como é medido?",
        title: "O Cálculo e o IPCA do IBGE",
        explanation: "É calculado oficialmente no Brasil pelo índice IPCA (Índice de Preços ao Consumidor Amplo). Técnicos do IBGE realizam pesquisas diárias de preços em milhares de pontos comerciais e residências em várias capitais.",
        formula: "IPCA = Σ (Média da Variação de Preços do Item * Peso do Item)",
        example: "Alimentos e habitação pesam muito mais do que vestuário, pois comprometem uma fatia bem maior do faturamento mensal bruto de uma família urbana de classe média."
      },
      {
        label: "O que o crescimento significa?",
        title: "Impactos do Avanço Inflacionário",
        explanation: "O descontrole de preços gera incertezas absurdas na sociedade. Empresas travam contratações por medo do aumento súbito de custos de insumos, e investidores retiram capital de projetos produtivos industriais reais para buscar proteção puramente financeira.",
        example: "Famílias de baixa renda são as maiores prejudicadas, pois não têm acesso simples a contas e fundos financeiros de proteção inflacionária diária."
      }
    ]
  },
  {
    id: "texto3",
    title: "IPCA (Índice Nacional de Preços ao Consumidor Amplo)",
    theme: "green",
    bgClass: "bg-[#9ebeb4]/70 text-[#152352] shadow-lg shadow-[#152352]/5",
    pillClass: "bg-white/60 hover:bg-white text-[#2c3d75] hover:shadow-2xs focus:ring-2 focus:ring-white/85",
    activePillClass: "bg-white text-[#152352] shadow-md font-extrabold ring-2 ring-white/50",
    questions: [
      {
        label: "O que é?",
        title: "O que é o IPCA?",
        explanation: "É o índice oficial de inflação do Brasil. Ele aponta se os preços, na média, subiram ou caíram de um mês para o outro.",
        example: "Se o IPCA acumulado do ano foi de 4,5%, significa que o custo de vida geral no país encareceu nessa proporção."
      },
      {
        label: "Pra que serve?",
        title: "Para que serve o IPCA?",
        explanation: "Serve para orientar a política monetária do país (como a definição da taxa de juros Selic pelo Banco Central) e para atualizar contratos, aluguéis e salários, protegendo o dinheiro da perda de valor.",
        example: "O Banco Central olha para o IPCA para decidir se aumenta os juros (para frear o consumo e segurar os preços) ou se baixa os juros (para estimular a economia)."
      },
      {
        label: "Como é medido?",
        title: "Como o IPCA é medido?",
        explanation: "O IBGE realiza a Pesquisa de Orçamentos Familiares (POF) para entender o que as famílias que ganham de 1 a 40 salários mínimos consomem. É criada uma \"cesta de produtos e serviços\" (arroz, feijão, passagem de ônibus, mensalidade escolar, etc.). Cada item tem um \"peso\" diferente com base no quanto ele pesa no bolso do brasileiro.",
        formula: "IPCA = Σ (Variação do Preço do Item * Peso do Item)",
        example: "Um aumento de 10% no preço do arroz impacta muito mais o IPCA do que um aumento de 10% no preço do cinema, porque as famílias gastam uma fatia maior da sua renda com alimentação básica do que com lazer."
      },
      {
        label: "O que o crescimento significa?",
        title: "O que o crescimento do IPCA significa?",
        explanation: "Quando o IPCA cresce (inflação), significa que o dinheiro perdeu poder de compra. Você precisa de mais notas de Real para comprar as mesmas coisas que comprava antes.",
        example: "Se o IPCA sobe muito e o seu salário continua igual, aquela compra de supermercado que antes custava R$ 200,00 passa a custar R$ 220,00, te forçando a deixar itens fora do carrinho."
      }
    ]
  },
  {
    id: "texto4",
    title: "Índice Big Mac",
    theme: "purple",
    bgClass: "bg-[#9995ce]/70 text-[#152352] shadow-lg shadow-[#152352]/5",
    pillClass: "bg-white/60 hover:bg-white text-[#2c3d75] hover:shadow-2xs focus:ring-2 focus:ring-white/85",
    activePillClass: "bg-white text-[#152352] shadow-md font-extrabold ring-2 ring-white/50",
    questions: [
      {
        label: "O que é?",
        title: "O que é o Índice Big Mac?",
        explanation: "Um indicador econômico informal criado pela revista The Economist que usa o preço do famoso hambúrguer do McDonald's para comparar o poder de compra e avaliar se a moeda de um país está \"barata\" ou \"cara\" em relação ao dólar americano.",
        example: "Se um Big Mac custa US$ 5,60 nos EUA e o equivalente a US$ 4,50 no Brasil (convertendo o preço em Reais para Dólares), a teoria diz que o Real está desvalorizado frente ao dólar."
      },
      {
        label: "Pra que serve?",
        title: "Para que serve o Índice Big Mac?",
        explanation: "Serve para explicar de forma simples e visual o conceito de Paridade do Poder de Compra (PPC)- a ideia de que, no longo prazo, as taxas de câmbio deveriam se ajustar para que uma mesma cesta de bens custe o mesmo em qualquer lugar do mundo.",
        example: "Economistas e professores usam o índice para mostrar como o câmbio de mercado muitas vezes não reflete o custo de vida real de um país."
      },
      {
        label: "Como é medido?",
        title: "Como o Índice Big Mac é medido?",
        explanation: "A revista The Economist levanta o preço local do Big Mac em dezenas de países, converte esses valores para o dólar americano usando a taxa de câmbio atual e compara com o preço do sanduíche nos Estados Unidos.",
        example: "Como o Big Mac leva os mesmos ingredientes básicos em quase todo o mundo (carne, pão, queijo, alface) e envolve custos locais (aluguel, mão de obra), ele funciona como uma \"cesta básica global\" padronizada."
      },
      {
        label: "O que o crescimento significa?",
        title: "O que o crescimento do Índice Big Mac significa?",
        explanation: "Se o Índice Big Mac de um país cresce em dólares, isso significa que o sanduíche naquele país ficou mais caro para um estrangeiro. Isso pode acontecer porque a inflação local subiu ou porque a moeda daquele país se valorizou frente ao dólar.",
        example: "Se o preço do Big Mac no Brasil saltar de US$ 4,00 para US$ 5,00 em um ano, o Real se tornou uma moeda mais \"cara\" no cenário internacional, diminuindo a margem de subvalorização cambial."
      }
    ]
  }
];

export default function App() {
  const [activeTab, setActiveTab ] = useState<string>('Início');
  
  // Estados do mapa interativo
  const [currentDialog, setCurrentDialog] = useState<number>(0);
  const [activeLayer, setActiveLayer] = useState<number>(0);
  const [showPibEmpregosModal, setShowPibEmpregosModal] = useState<boolean>(false);
  const [pibEmpregosStep, setPibEmpregosStep] = useState<number>(0);
  const [showPibInflacaoModal, setShowPibInflacaoModal] = useState<boolean>(false);
  const [pibInflacaoStep, setPibInflacaoStep] = useState<number>(0);

  // Estados do tour guiado
  const [tourStep, setTourStep] = useState<number | null>(null);

  // Estados do glossario
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('Todos');
  const [expandedTerm, setExpandedTerm] = useState<string | null>(null);
  const [selectedGlossary, setSelectedGlossary] = useState<{ cardId: string; questionIdx: number } | null>(null);

  // Estados do quiz
  const [quizQuestions, setQuizQuestions] = useState<QuizQuestion[]>(QUIZ_QUESTIONS);
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState<number>(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState<boolean>(false);
  const [quizScore, setQuizScore] = useState<number>(0);
  const [showQuizResults, setShowQuizResults] = useState<boolean>(false);

  // Estados do minijogo
  const [reignsStats, setReignsStats] = useState({
    pib: 50,
    inflacao: 50,
    bemEstar: 50,
    contasPublicas: 50,
  });
  const [currentReignsIdx, setCurrentReignsIdx] = useState<number>(0);
  const [reignsGameOver, setReignsGameOver] = useState<boolean>(false);
  const [reignsGameWon, setReignsGameWon] = useState<boolean>(false);
  const [reignsGameOverReason, setReignsGameOverReason] = useState<string>('');
  const [reignsHoveredOption, setReignsHoveredOption] = useState<'left' | 'right' | null>(null);
  const [reignsDragOffset, setReignsDragOffset] = useState<number>(0);
  const [reignsHistory, setReignsHistory] = useState<{cardId: string; choice: 'left' | 'right'}[]>([]);
  const [showReignsTutorial, setShowReignsTutorial] = useState<boolean>(true);
  const [tableauScale, setTableauScale] = useState<number | 'auto'>('auto');

  const getTableauScaleStyle = () => {
    let scale = 1;
    if (tableauScale === 'auto') {
      if (typeof window !== 'undefined' && window.innerHeight <= 860) {
        scale = 0.72; // Proporcao para telas menores
      } else {
        scale = 1;
      }
    } else {
      scale = tableauScale;
    }

    if (scale === 1) {
      return {
        width: '100%',
        height: '100%',
        transform: 'none',
        transformOrigin: 'top left',
      };
    }

    const percentage = 100 / scale;
    return {
      width: `${percentage}%`,
      height: `${percentage}%`,
      transform: `scale(${scale})`,
      transformOrigin: 'top left',
    };
  };

  // Configuracoes dos paineis do Tableau
  const layers = [
    { 
      name: 'PIB', 
      color: 'bg-[#9ebeb4]',
      url: 'https://public.tableau.com/views/PIBBrasil_17820701333440/PIB?:language=pt-BR&:embed=y&:showVizHome=no&:display_count=n&:origin=viz_share_link' 
    },
    { 
      name: 'Inflação', 
      color: 'bg-[#9995ce]',
      url: 'https://public.tableau.com/views/Brasil-PIBIPCA/Inflao?:language=pt-BR&:embed=y&:showVizHome=no&:display_count=n&:origin=viz_share_link' 
    },
  ];

  const dialogos = activeLayer === 0 ? [
    (
      <p key={0} className="text-gray-700 leading-relaxed text-xs md:text-sm xl:text-base h-[120px] md:h-[140px] xl:h-[160px] overflow-y-auto pr-2 short-screen-dialogue">
        Pense no Brasil como um bolo gigante. Cada estado contribui com um pedaço desse bolo. O mapa mostra o tamanho aproximado da fatia que cada estado coloca na mesa. O PIB (Produto Interno Bruto) mede justamente a soma de todas as riquezas produzidas em um ano, ou seja, o tamanho total desse bolo.
      </p>
    ),
    (
      <p key={1} className="text-gray-700 leading-relaxed text-xs md:text-sm xl:text-base h-[120px] md:h-[140px] xl:h-[160px] overflow-y-auto pr-2 short-screen-dialogue">
        Olhando para o mapa, quanto mais escura a cor do estado, maior é a fatia daquele estado no bolo da nossa economia. Note como São Paulo (SP) se destaca com a cor mais escura por ser o estado que mais produz e gera valor no país.
      </p>
    ),
    (
      <p key={2} className="text-gray-700 leading-relaxed text-xs md:text-sm xl:text-base h-[120px] md:h-[140px] xl:h-[160px] overflow-y-auto pr-2 short-screen-dialogue">
        Logo abaixo, o gráfico de pizza mostra isso em porcentagem. Veja como pouquíssimos estados ficam com as maiores fatias da pizza, enquanto a grande maioria divide pedacinhos bem pequenos. Isso revela como a riqueza do nosso país é concentrada!
      </p>
    )
  ] : [
    (
      <p key={0} className="text-gray-700 leading-relaxed text-xs md:text-sm xl:text-base h-[120px] md:h-[140px] xl:h-[160px] overflow-y-auto pr-2 short-screen-dialogue">
        Você já percebeu que as coisas no mercado parecem ficar mais caras com o tempo? Imagine que hoje um Big Mac custa R$ 30, e no mês que vem passa para R$ 31. Esse aumento generalizado nos preços das coisas é o que chamamos de Inflação.
      </p>
    ),
    (
      <p key={1} className="text-gray-700 leading-relaxed text-xs md:text-sm xl:text-base h-[120px] md:h-[140px] xl:h-[160px] overflow-y-auto pr-2 short-screen-dialogue">
        Agora imagine que o preço do Big Mac aumentou em todos os estados, mas em alguns ele subiu apenas alguns centavos e, em outros, aumentou bem mais. O gráfico faz exatamente essa comparação, mas utilizando o IPCA, que considera centenas de produtos e serviços consumidos pelas famílias brasileiras.
      </p>
    ),
    (
      <p key={2} className="text-gray-700 leading-relaxed text-xs md:text-sm xl:text-base h-[120px] md:h-[140px] xl:h-[160px] overflow-y-auto pr-2 short-screen-dialogue">
        Ainda usando o exemplo do Big Mac: Em vez de olhar apenas para o preço do Big Mac, o IPCA acompanha centenas de produtos e serviços como alimentação, transporte, combustível, energia elétrica, aluguel, educação, saúde, entre outros. Assim, o IPCA mostra quanto, em média, os preços aumentaram.
      </p>
    )
  ];

  // Iniciar o tour guiado
  const startTour = () => {
    setActiveTab('Mapa Interativo');
    setTourStep(0);
  };

  // Finalizar o tour
  const endTour = () => {
    setTourStep(null);
  };

  // Filtro do glossario
  const filteredTerms = useMemo(() => {
    return GLOSSARY_TERMS.filter(item => {
      const matchesSearch = item.term.toLowerCase().includes(searchTerm.toLowerCase()) || 
                            item.definition.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            item.example.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === 'Todos' || item.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchTerm, selectedCategory]);

  // Selecionar resposta do quiz
  const handleQuizAnswer = (optionIdx: number) => {
    if (isAnswered) return;
    setSelectedOption(optionIdx);
    setIsAnswered(true);
    if (optionIdx === quizQuestions[currentQuestionIdx].correctAnswerIndex) {
      setQuizScore(prev => prev + 1);
    }
  };

  // Proxima pergunta do quiz
  const handleNextQuizQuestion = () => {
    setSelectedOption(null);
    setIsAnswered(false);
    if (currentQuestionIdx < quizQuestions.length - 1) {
      setCurrentQuestionIdx(prev => prev + 1);
    } else {
      setShowQuizResults(true);
    }
  };

  // Reiniciar o quiz
  const resetQuiz = () => {
    setCurrentQuestionIdx(0);
    setSelectedOption(null);
    setIsAnswered(false);
    setQuizScore(0);
    setShowQuizResults(false);
  };

  // Funcoes do minijogo de decisoes
  const handleReignsChoice = (choice: 'left' | 'right') => {
    const currentCard = REIGNS_CARDS[currentReignsIdx];
    const deltas = choice === 'left' ? currentCard.leftDelta : currentCard.rightDelta;

    const newStats = {
      pib: Math.max(0, Math.min(100, reignsStats.pib + deltas.pib)),
      inflacao: Math.max(0, Math.min(100, reignsStats.inflacao + deltas.inflacao)),
      bemEstar: Math.max(0, Math.min(100, reignsStats.bemEstar + deltas.bemEstar)),
      contasPublicas: Math.max(0, Math.min(100, reignsStats.contasPublicas + deltas.contasPublicas)),
    };

    setReignsStats(newStats);
    setReignsHistory(prev => [...prev, { cardId: currentCard.id, choice }]);

    // Verifica condicoes de fim de jogo
    if (newStats.pib <= 0) {
      setReignsGameOver(true);
      setReignsGameOverReason("Recessão Histórica! O PIB nacional afundou, levando o país a um colapso produtivo geral e recessão econômica profunda e prolongada.");
      return;
    }
    if (newStats.pib >= 100) {
      setReignsGameOver(true);
      setReignsGameOverReason("Crescimento Desenfreado / Especulação! O PIB cresceu de forma totalmente irracional e especulativa, estourando bolhas gigantescas e paralisando bancos.");
      return;
    }
    if (newStats.inflacao <= 0) {
      setReignsGameOver(true);
      setReignsGameOverReason("Deflação Espiral e Estagnação! Preços caindo de forma crônica fizeram as empresas suspenderem os investimentos e o consumo paralisou, congelando a atividade econômica.");
      return;
    }
    if (newStats.inflacao >= 100) {
      setReignsGameOver(true);
      setReignsGameOverReason("Hiperinflação Descontrolada! Os preços subiram de forma tão vertiginosa que a moeda perdeu todo o seu poder de compra, desestruturando os mercados e o comércio local.");
      return;
    }
    if (newStats.bemEstar <= 0) {
      setReignsGameOver(true);
      setReignsGameOverReason("Crise e Instabilidade Social! O bem-estar das famílias despencou a níveis críticos, gerando protestos generalizados, revoltas civis e greves nacionais incessantes.");
      return;
    }
    if (newStats.bemEstar >= 100) {
      setReignsGameOver(true);
      setReignsGameOverReason("Super Bem-estar Utópico! A sociedade atingiu um bem-estar tão alto e assistencial que parou de produzir, gerando uma crise de oferta de trabalho e colapso geral do PIB produtivo.");
      return;
    }
    if (newStats.contasPublicas <= 0) {
      setReignsGameOver(true);
      setReignsGameOverReason("Insolvência Fiscal e Default! As contas públicas zeraram, o Estado declarou moratória (default) perante os credores internacionais e o país faliu soberanamente.");
      return;
    }
    if (newStats.contasPublicas >= 100) {
      setReignsGameOver(true);
      setReignsGameOverReason("Tributação Extrema / Ditadura Fiscal! O governo acumulou reservas fiscais confiscando quase 100% dos recursos privados, asfixiando totalmente a atividade de mercado.");
      return;
    }

    // Avanca para o proximo card ou vitoria
    if (currentReignsIdx < REIGNS_CARDS.length - 1) {
      setCurrentReignsIdx(prev => prev + 1);
    } else {
      setReignsGameWon(true);
    }
    setReignsHoveredOption(null);
  };

  const resetReignsGame = () => {
    setReignsStats({
      pib: 50,
      inflacao: 50,
      bemEstar: 50,
      contasPublicas: 50,
    });
    setCurrentReignsIdx(0);
    setReignsGameOver(false);
    setReignsGameWon(false);
    setReignsGameOverReason('');
    setReignsHoveredOption(null);
    setReignsDragOffset(0);
    setReignsHistory([]);
  };

  return (
    <div className={`h-screen w-full max-w-full overflow-hidden bg-[#656c9a] p-4 md:p-6 lg:p-8 font-sans text-gray-800 selection:bg-indigo-200 relative ${
      activeTab === 'Mapa Interativo' || activeTab === 'Glossário' || activeTab === 'Jogo' || activeTab === 'Início' || activeTab === 'Sobre o projeto' ? 'short-screen-interactive-map' : 'short-screen-overflow-override'
    }`}>
      
      {/* Elementos de fundo animados dinâmicos por trás do conteúdo para uma atmosfera de aprendizado lúdica */}
      <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-[#777eae]/30 to-transparent pointer-events-none z-0"></div>
      
      {/* ------------------- CAMADAS DE TOUR INTERATIVO ------------------- */}
      {showPibEmpregosModal && (
        <div className="absolute inset-0 bg-black/45 backdrop-blur-xs z-50 flex flex-col justify-center items-center p-4">
          <div className="bg-[#f5f4f0]/95 backdrop-blur-md rounded-[2.5rem] p-6 sm:p-8 md:p-10 shadow-2xl max-w-2xl w-full border border-[#858cb5]/25 relative animate-in fade-in zoom-in-95 duration-300 flex flex-col pointer-events-auto">
            
            <button 
              onClick={() => setShowPibEmpregosModal(false)}
              className="absolute top-5 right-5 text-gray-400 hover:text-black hover:bg-gray-200 p-2 rounded-full cursor-pointer transition-all z-10"
            >
              <X size={18} />
            </button>

            {/* Layout dividido: Coluna esquerda com a mascote, Coluna direita com as informações */}
            <div className="flex flex-col md:flex-row gap-6 md:gap-8 items-center md:items-stretch mt-2 text-left">
              
              {/* Painel da Mascote (Fundo transparente atrás) */}
              <div className="w-full md:w-2/5 flex items-center justify-center bg-transparent relative min-h-[180px] md:min-h-[260px]">
                {pibEmpregosStep === 0 && (
                  <img 
                    src="Dessa-explicando1.PNG" 
                    alt="Dessa explicando" 
                    className="h-44 sm:h-56 md:h-64 object-contain drop-shadow-xl transform hover:scale-105 transition-transform duration-300"
                    referrerPolicy="no-referrer"
                  />
                )}
                {pibEmpregosStep === 1 && (
                  <img 
                    src="Dessa-apontando.PNG" 
                    alt="Dessa apontando" 
                    className="h-44 sm:h-56 md:h-64 object-contain drop-shadow-xl transform hover:scale-105 transition-transform duration-300"
                    referrerPolicy="no-referrer"
                  />
                )}
                {pibEmpregosStep === 2 && (
                  <img 
                    src="Dessa-explicando2.PNG" 
                    alt="Dessa explicando mais" 
                    className="h-44 sm:h-56 md:h-64 object-contain drop-shadow-xl transform hover:scale-105 transition-transform duration-300"
                    referrerPolicy="no-referrer"
                  />
                )}
              </div>

              {/* Painel de Informações */}
              <div className="w-full md:w-3/5 flex flex-col justify-between">
                <div>
                  <h3 className="font-extrabold text-xl sm:text-2xl text-black leading-tight">
                    A Relação entre PIB e Empregos
                  </h3>
                  <p className="text-[10px] sm:text-xs text-gray-500 uppercase tracking-widest font-bold mt-1">
                    Parte {pibEmpregosStep + 1} de 3
                  </p>
                </div>

                {/* Conteúdo de texto do passo */}
                <div className="text-gray-700 text-xs sm:text-sm md:text-base leading-relaxed mt-4 mb-6 min-h-[130px] md:min-h-[155px] flex items-start flex-col">
                  {pibEmpregosStep === 0 && (
                    <div className="w-full">
                      <p className="font-extrabold text-[#656c9a] mb-2 text-xs sm:text-sm uppercase tracking-wide">
                        O que um PIB grande significa no dia a dia?
                      </p>
                      <p className="text-gray-700 text-xs sm:text-sm leading-relaxed">
                        Agora você deve estar se perguntando: 'Se um estado tem um PIB gigante e produz muito, a vida das pessoas lá é automaticamente perfeita?' <strong>Nem sempre!</strong> Um PIB alto significa que a economia está girando e que há muitas indústrias e comércios funcionando.
                      </p>
                    </div>
                  )}
                  {pibEmpregosStep === 1 && (
                    <div className="w-full">
                      <p className="font-extrabold text-[#656c9a] mb-2 text-xs sm:text-sm uppercase tracking-wide">
                        Distribuição e Emprego
                      </p>
                      <p className="text-gray-700 text-xs sm:text-sm leading-relaxed">
                        Geralmente, estados com maior PIB conseguem gerar mais oportunidades de emprego e atrair investimentos. É por isso que muitas pessoas mudam de região procurando trabalho nos estados que aparecem mais escuros no nosso primeiro mapa.
                      </p>
                    </div>
                  )}
                  {pibEmpregosStep === 2 && (
                    <div className="w-full">
                      <p className="font-extrabold text-[#656c9a] mb-2 text-xs sm:text-sm uppercase tracking-wide">
                        O desafio do desenvolvimento
                      </p>
                      <p className="text-gray-700 text-xs sm:text-sm leading-relaxed">
                        Porém, o grande desafio da <strong>Contabilidade Social</strong> é fazer com que esse bolo gigante do PIB seja transformado em hospitais de qualidade, escolas e segurança para toda a população, e não fique guardado com poucas pessoas.
                      </p>
                    </div>
                  )}
                </div>
              </div>

            </div>

            {/* Controle de navegação e paginação */}
            <div className="flex justify-between items-center w-full mt-auto pt-4 border-t border-gray-200">
              <div className="flex gap-1.5 items-center">
                {[0, 1, 2].map((idx) => (
                  <div 
                    key={idx} 
                    className={`h-2 rounded-full transition-all duration-300 ${
                      idx === pibEmpregosStep ? 'w-4 bg-[#656c9a]' : 'w-2 bg-gray-300'
                    }`}
                  />
                ))}
              </div>

              <div className="flex gap-2">
                <button 
                  onClick={() => setPibEmpregosStep(prev => prev - 1)}
                  disabled={pibEmpregosStep === 0}
                  className="px-4 py-2 text-gray-500 hover:text-black hover:bg-gray-200 disabled:opacity-30 disabled:hover:bg-transparent rounded-full text-xs font-bold transition-all cursor-pointer disabled:cursor-not-allowed"
                >
                  Anterior
                </button>
                {pibEmpregosStep < 2 ? (
                  <button 
                    onClick={() => setPibEmpregosStep(prev => prev + 1)}
                    className="px-5 py-2 bg-[#656c9a] hover:bg-[#525883] text-white rounded-full text-xs font-bold shadow-md transition-all cursor-pointer uppercase tracking-wider flex items-center gap-1"
                  >
                    Próximo
                  </button>
                ) : (
                  <button 
                    onClick={() => setShowPibEmpregosModal(false)}
                    className="px-6 py-2 bg-[#8ebcb0] hover:bg-[#77a599] text-white rounded-full text-xs font-bold shadow-md hover:shadow-lg transition-all cursor-pointer uppercase tracking-wider"
                  >
                    Concluir!
                  </button>
                )}
              </div>
            </div>

          </div>
        </div>
      )}

      {showPibInflacaoModal && (
        <div className="absolute inset-0 bg-black/45 backdrop-blur-xs z-50 flex flex-col justify-center items-center p-4">
          <div className="bg-[#f5f4f0]/95 backdrop-blur-md rounded-[2.5rem] p-6 sm:p-8 md:p-10 shadow-2xl max-w-2xl w-full border border-[#858cb5]/25 relative animate-in fade-in zoom-in-95 duration-300 flex flex-col pointer-events-auto">
            
            <button 
              onClick={() => setShowPibInflacaoModal(false)}
              className="absolute top-5 right-5 text-gray-400 hover:text-black hover:bg-gray-200 p-2 rounded-full cursor-pointer transition-all z-10"
            >
              <X size={18} />
            </button>

            {/* Layout dividido: Coluna esquerda com a mascote, Coluna direita com as informações */}
            <div className="flex flex-col md:flex-row gap-6 md:gap-8 items-center md:items-stretch mt-2 text-left">
              
              {/* Painel da Mascote (Fundo transparente atrás, boneca ampliada) */}
              <div className="w-full md:w-2/5 flex items-center justify-center bg-transparent relative min-h-[180px] md:min-h-[260px]">
                {pibInflacaoStep === 0 && (
                  <img 
                    src="Dessa-explicando1.PNG" 
                    alt="Dessa explicando" 
                    className="h-44 sm:h-56 md:h-64 object-contain drop-shadow-xl transform hover:scale-105 transition-transform duration-300"
                    referrerPolicy="no-referrer"
                  />
                )}
                {pibInflacaoStep === 1 && (
                  <img 
                    src="Dessa-apontando.PNG" 
                    alt="Dessa apontando" 
                    className="h-44 sm:h-56 md:h-64 object-contain drop-shadow-xl transform hover:scale-105 transition-transform duration-300"
                    referrerPolicy="no-referrer"
                  />
                )}
                {pibInflacaoStep === 2 && (
                  <img 
                    src="Dessa-explicando2.PNG" 
                    alt="Dessa explicando mais" 
                    className="h-44 sm:h-56 md:h-64 object-contain drop-shadow-xl transform hover:scale-105 transition-transform duration-300"
                    referrerPolicy="no-referrer"
                  />
                )}
              </div>

              {/* Painel de Informações */}
              <div className="w-full md:w-3/5 flex flex-col justify-between">
                <div>
                  <h3 className="font-extrabold text-xl sm:text-2xl text-black leading-tight">
                    PIB VS Inflação
                  </h3>
                  <p className="text-[10px] sm:text-xs text-gray-500 uppercase tracking-widest font-bold mt-1">
                    Parte {pibInflacaoStep + 1} de 3
                  </p>
                </div>

                {/* Conteúdo de texto do passo */}
                <div className="text-gray-700 text-xs sm:text-sm md:text-base leading-relaxed mt-4 mb-6 min-h-[130px] md:min-h-[155px] flex items-start flex-col">
                  {pibInflacaoStep === 0 && (
                    <div className="w-full">
                      <p className="font-extrabold text-[#656c9a] mb-2 text-xs sm:text-sm uppercase tracking-wide">
                        A grande batalha econômica
                      </p>
                      <p className="text-gray-700 text-xs sm:text-sm leading-relaxed">
                        Agora vamos unir tudo o que aprendemos! Na economia, existe uma eterna batalha entre o crescimento do PIB e o controle da Inflação. É o equilíbrio perfeito que o país precisa encontrar.
                      </p>
                    </div>
                  )}
                  {pibInflacaoStep === 1 && (
                    <div className="w-full">
                      <p className="font-extrabold text-[#656c9a] mb-2 text-xs sm:text-sm uppercase tracking-wide">
                        O que acontece se a inflação vencer?
                      </p>
                      <p className="text-gray-700 text-xs sm:text-sm leading-relaxed">
                        Não adianta nada o PIB do país crescer e as empresas produzirem mais se a inflação subir rápido demais. Se os preços dispararem, o seu salário passa a valer menos e o seu 'poder de compra' diminui, ou seja, você leva menos compras para casa com o mesmo dinheiro.
                      </p>
                    </div>
                  )}
                  {pibInflacaoStep === 2 && (
                    <div className="w-full">
                      <p className="font-extrabold text-[#656c9a] mb-2 text-xs sm:text-sm uppercase tracking-wide">
                        O cenário ideal
                      </p>
                      <p className="text-gray-700 text-xs sm:text-sm leading-relaxed">
                        O cenário dos sonhos para qualquer país é ver o bolo do PIB crescer de forma justa (mais empregos e renda) enquanto as barras da inflação continuam baixinhas e controladas. Assim, o país avança e o dinheiro do trabalhador rende de verdade!
                      </p>
                    </div>
                  )}
                </div>
              </div>

            </div>

            {/* Controle de navegação e paginação */}
            <div className="flex justify-between items-center w-full mt-auto pt-4 border-t border-gray-200">
              <div className="flex gap-1.5 items-center">
                {[0, 1, 2].map((idx) => (
                  <div 
                    key={idx} 
                    className={`h-2 rounded-full transition-all duration-300 ${
                      idx === pibInflacaoStep ? 'w-4 bg-[#656c9a]' : 'w-2 bg-gray-300'
                    }`}
                  />
                ))}
              </div>

              <div className="flex gap-2">
                <button 
                  onClick={() => setPibInflacaoStep(prev => prev - 1)}
                  disabled={pibInflacaoStep === 0}
                  className="px-4 py-2 text-gray-500 hover:text-black hover:bg-gray-200 disabled:opacity-30 disabled:hover:bg-transparent rounded-full text-xs font-bold transition-all cursor-pointer disabled:cursor-not-allowed"
                >
                  Anterior
                </button>
                {pibInflacaoStep < 2 ? (
                  <button 
                    onClick={() => setPibInflacaoStep(prev => prev + 1)}
                    className="px-5 py-2 bg-[#656c9a] hover:bg-[#525883] text-white rounded-full text-xs font-bold shadow-md transition-all cursor-pointer uppercase tracking-wider flex items-center gap-1"
                  >
                    Próximo
                  </button>
                ) : (
                  <button 
                    onClick={() => setShowPibInflacaoModal(false)}
                    className="px-6 py-2 bg-[#8ebcb0] hover:bg-[#77a599] text-white rounded-full text-xs font-bold shadow-md hover:shadow-lg transition-all cursor-pointer uppercase tracking-wider"
                  >
                    Concluir!
                  </button>
                )}
              </div>
            </div>

          </div>
        </div>
      )}

      {/* ------------------- CAMADAS DE TOUR INTERATIVO ------------------- */}
      {tourStep !== null && (
        <div className={`absolute inset-0 bg-black/15 z-50 flex flex-col p-4 pointer-events-none transition-all duration-300 ${
          tourStep === 0 
            ? 'justify-center items-center' 
            : tourStep === 2 
            ? 'justify-end items-center pb-2 md:pb-4' 
            : 'justify-end items-center pb-6 md:pb-12'
        }`}>
          <div className={`bg-[#f5f4f0]/95 backdrop-blur-md rounded-[2.5rem] p-6 md:p-8 shadow-2xl w-full border border-[#858cb5]/20 relative animate-in fade-in zoom-in-95 duration-300 pointer-events-auto transition-all duration-300 ${
            tourStep === 2 ? 'max-w-md' : 'max-w-lg'
          }`}>
            <button 
              onClick={endTour}
              className="absolute top-5 right-5 text-gray-400 hover:text-black hover:bg-gray-200 p-2 rounded-full cursor-pointer transition-all"
            >
              <X size={18} />
            </button>

            <div className="mb-4">
              <h3 className="font-extrabold text-lg md:text-xl text-black">
                {tourStep === 0 && 'Bem-vindo ao Tour Interativo!'}
                {tourStep === 1 && 'Abas do Site'}
                {tourStep === 2 && 'Mudar de Botões'}
                {tourStep === 3 && 'Painel do Tableau'}
                {tourStep === 4 && 'Explicação Guiada'}
              </h3>
              <p className="text-xs text-gray-500 uppercase tracking-wider font-semibold mt-0.5">
                PASSO {tourStep + 1} de 5
              </p>
            </div>

            <div className="text-gray-700 text-sm md:text-base leading-relaxed mb-6">
              {tourStep === 0 && (
                <div className="flex flex-col items-center text-center">
                  <div className="relative mb-4 flex justify-center w-full">
                    <img 
                      src="Dessa-acenando1.PNG" 
                      alt="Dessa acenando" 
                      className="h-28 sm:h-36 object-contain drop-shadow-xl transform hover:scale-105 transition-transform duration-300"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <p className="text-gray-700 text-sm md:text-base leading-relaxed">
                    Olá! Eu serei o seu mascote virtual e professor nessa jornada educativa sobre <strong>Contabilidade Social</strong>. 
                    <br /><br />
                    Fiz uma breve apresentação para você aprender a usar todos os recursos interativos desta plataforma. Vamos começar?
                  </p>
                </div>
              )}
              {tourStep === 1 && (
                <p>
                  Aqui no topo, você pode trocar de página instantaneamente:
                  <br /><br />
                  • <strong>Como o Glossário:</strong> Para encontrar explicações de termos difíceis.
                  <br />
                  • <strong>Ou o Jogo:</strong> Para testar seus conhecimentos.
                </p>
              )}
              {tourStep === 2 && (
                <div className="flex flex-col items-center text-center">
                  <p className="text-gray-700 text-xs sm:text-sm md:text-sm leading-relaxed">
                    Estes são os <strong>Botões</strong> de visualização no topo do painel.
                    <br /><br />
                    Sempre que clicar em um botão, nossa base de dados do Tableau mudará no painel ao lado, revelando novas visões macroeconômicas.
                  </p>
                </div>
              )}
              {tourStep === 3 && (
                <p>
                  Aqui fica incorporado o seu <strong>Painel Interativo do Tableau</strong>!
                  <br /><br />
                  Você pode interagir diretamente com ele: clicar em botões, tabelas, filtros e passar o mouse nos números para detalhar os dados.
                </p>
              )}
              {tourStep === 4 && (
                <p>
                  Enquanto explora os botões, fique de olho aqui. Eu estarei sempre presente nesta <strong>janela de diálogo</strong> traduzindo termos complexos para histórias simples de entender!
                  <br /><br />
                  Dica: Use as <strong>setas no final do balão</strong> para caminhar pelas páginas!
                </p>
              )}
            </div>

            <div className="flex justify-between items-center border-t border-gray-200 pt-4">
              <button 
                onClick={endTour}
                className="text-gray-500 hover:text-black font-semibold text-sm transition-all cursor-pointer"
              >
                Pular Tour
              </button>

              <div className="flex gap-2">
                {tourStep > 0 && (
                  <button 
                    onClick={() => setTourStep(prev => prev !== null ? prev - 1 : null)}
                    className="px-4 py-2 bg-gray-200 hover:bg-gray-350 text-gray-800 rounded-full text-xs font-bold transition-all cursor-pointer"
                  >
                    Voltar
                  </button>
                )}

                {tourStep < 4 ? (
                  <button 
                    onClick={() => setTourStep(prev => prev !== null ? prev + 1 : null)}
                    className="px-5 py-2 bg-[#9ebeb4] hover:bg-[#8ba69e] text-white rounded-full text-xs font-bold shadow-md transition-all cursor-pointer"
                  >
                    Avançar
                  </button>
                ) : (
                  <button 
                    onClick={endTour}
                    className="px-6 py-2 bg-[#8ebcb0] hover:bg-[#77a599] text-white rounded-full text-xs font-bold shadow-md hover:shadow-lg transition-all cursor-pointer uppercase tracking-wider"
                  >
                    Concluir Tour!
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Estrutura do App */}
      <div className="max-w-[1400px] mx-auto h-full flex flex-col gap-3 md:gap-4 lg:gap-5 relative z-10">
        
        {/* Barra de Navegacao */}
        <header className={`shrink-0 transition-all duration-300 ${
          activeTab === 'Início'
            ? 'bg-transparent shadow-none px-4 py-2 flex justify-start items-center gap-6 border-none text-white'
            : 'bg-[#f5f4f0] rounded-full px-5 md:px-8 py-3 flex flex-col lg:flex-row justify-between items-center drop-shadow-md gap-3'
        } ${
          tourStep === 1 ? 'ring-4 ring-[#8ebcb0] scale-[1.02] relative z-40 bg-[#fbfbf8] shadow-[0_0_30px_rgba(142,188,176,0.9)]' : ''
        }`}>
          {activeTab !== 'Início' && (
            <div className="flex items-center gap-2">
              <span className="text-[#8ebcb0] text-lg font-bold">●</span>
              <h1 className="font-extrabold text-base md:text-lg xl:text-xl tracking-tight uppercase text-black">
                DATA STORYTELLING: Contabilidade Social
              </h1>
            </div>
          )}
          <nav className={
            activeTab === 'Início'
              ? "flex flex-wrap justify-center items-center gap-3 sm:gap-5 md:gap-6 text-lg md:text-xl xl:text-2xl text-white"
              : "flex flex-wrap justify-center gap-1.5 md:gap-5 text-sm md:text-base xl:text-lg text-gray-700"
          }>
            {(activeTab === 'Início'
              ? ['Início', 'Mapa Interativo', 'Glossário', 'Jogo']
              : ['Início', 'Mapa Interativo', 'Glossário', 'Jogo', 'Sobre o projeto']
            ).map((item) => (
              <a 
                key={item} 
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  // Bloqueia cliques durante o tour guiado
                  if (tourStep !== null) return;
                  setActiveTab(item);
                }}
                className={
                  activeTab === 'Início'
                    ? `transition-all px-3 pt-1.5 pb-0.5 font-black tracking-wide border-b-4 ${
                        item === activeTab
                          ? 'border-[#8ebcb0] text-white' 
                          : 'text-white/70 hover:text-white border-transparent hover:border-[#8ebcb0]/40'
                      }`
                    : `hover:text-black transition-all px-3 py-1 font-semibold ${
                        item === activeTab
                          ? 'border-b-[3px] border-black text-black' 
                          : 'hover:bg-gray-200/50 rounded-lg text-gray-500'
                      }`
                }
              >
                {item}
              </a>
            ))}
          </nav>
        </header>

        {/* Roteamento condicional das abas */}
        <AnimatePresence mode="wait">
          {/* ABA 1: INICIO */}
          {activeTab === 'Início' && (
            <motion.div
              key="Início"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.18, ease: 'easeOut' }}
              className="flex-1 min-h-0 grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-stretch justify-center h-full relative"
            >
              
              {/* Coluna esquerda: Texto */}
              <div className="lg:col-span-6 flex flex-col items-center justify-between px-4 pt-10 pb-10 lg:pt-14 lg:pb-14 h-full lg:-translate-y-6 xl:-translate-y-10 lg:translate-x-6 xl:translate-x-14 transition-transform duration-300">

                <div className="w-full lg:max-w-[680px] flex flex-col items-center text-center gap-5 md:gap-7 lg:gap-8 lg:py-4">
                  <div className="space-y-1.5 md:space-y-2">
                    <span className="text-[#8ebcb0] font-black text-3xl md:text-4xl xl:text-[2.65rem] tracking-[0.12em] uppercase block text-contour-sm">
                      DATA STORYTELLING:
                    </span>
                    <h2 className="text-white font-extrabold text-4xl md:text-6xl xl:text-[3.8rem] tracking-wide leading-tight sm:whitespace-nowrap text-wrap">
                      Contabilidade Social
                    </h2>
                  </div>
                  
                  <p className="text-[#cbd5e1]/90 text-lg md:text-xl xl:text-2xl font-medium max-w-xl leading-relaxed">
                     Uma jornada visual e interativa pela macroeconomia e seus indicadores econômicos.
                  </p>

                  {/* Botao Comecar */}
                  <div className="mt-6 md:mt-8 lg:mt-12 flex flex-col items-center gap-2 w-full max-w-[280px] sm:max-w-none">
                    <button 
                      onClick={startTour}
                      className="w-full sm:w-auto px-10 sm:px-14 py-3.5 sm:py-4 bg-[#8ebcb0] hover:bg-[#77a599] text-white font-extrabold rounded-full text-sm sm:text-base md:text-lg xl:text-xl tracking-[0.2em] shadow-md hover:shadow-lg transition-all duration-300 hover:scale-[1.03] active:scale-95 flex items-center justify-center gap-2 border border-white/40 whitespace-nowrap cursor-pointer uppercase align-middle"
                    >
                      COMEÇAR
                    </button>
                  </div>

                </div>

                {/* Link para o Sobre o projeto */}
                <button 
                  onClick={() => {
                    if (tourStep !== null) return;
                    setActiveTab('Sobre o projeto');
                  }}
                  className="group flex items-center justify-center gap-2 text-white/50 hover:text-white transition-all mt-10 lg:mt-0 text-xs md:text-sm font-semibold tracking-[0.25em] uppercase cursor-pointer lg:self-center lg:-mb-1"
                >
                  <span>Sobre o projeto</span>
                  <ArrowRight className="w-3.5 h-3.5 -mr-1 transition-transform group-hover:translate-x-1 duration-200" />
                </button>
              </div>

              {/* Coluna direita: Mascote */}
              <div className="lg:col-span-6 flex justify-center lg:justify-end items-end relative select-none animate-[fadeIn_0.5s_ease-out] min-h-0 pointer-events-none h-full">
                <div className="relative w-full h-full flex items-end justify-center lg:justify-end">
                  {/* Ilustracao da Mascote */}
                  <img 
                    src="dessa-inicio-atualizado2.png" 
                    alt="Mascote Início"
                    className="h-auto max-h-[72vh] lg:max-h-none lg:h-[108%] xl:h-[111%] w-auto object-contain absolute lg:bottom-[16px] right-0 lg:right-[15%] xl:right-[18%] z-10 drop-shadow-2xl select-none pointer-events-auto"
                    referrerPolicy="no-referrer"
                  />
                </div>
              </div>

            </motion.div>
          )}

        {/* ABA 2: MAPA INTERATIVO */}
        {activeTab === 'Mapa Interativo' && (
          <motion.main
            key="Mapa Interativo"
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.18, ease: 'easeOut' }}
            className="flex-1 min-h-0 grid grid-cols-1 lg:grid-cols-[4fr_7fr] gap-6 lg:gap-12 xl:gap-14 items-stretch pb-2"
          >
            
            {/* Coluna esquerda: Mascote e Dialogo */}
            <div className="flex flex-col items-center h-full justify-end pb-2 relative min-h-0">
              
              {/* Container do Mascote */}
              <div className="absolute inset-0 top-0 bottom-0 flex items-end justify-center z-0 pointer-events-none">
                <img 
                  src={
                    currentDialog === 0 
                      ? "Dessa-explicando1.PNG" 
                      : currentDialog === 1 
                      ? "Dessa-apontando.PNG" 
                      : "Dessa-explicando2.PNG"
                  } 
                  alt="Mascote Mapa Interativo" 
                  className="h-full w-auto max-h-none object-contain object-bottom drop-shadow-[0_15px_15px_rgba(0,0,0,0.15)]"
                  referrerPolicy="no-referrer"
                />
              </div>

              {/* Balao de Fala */}
              <div className={`w-full max-w-[500px] relative shrink-0 transition-all duration-300 ${
                tourStep === 4 ? 'ring-4 ring-offset-4 ring-[#9ebeb4] scale-[1.02] z-40 relative bg-white/90 rounded-3xl' : 'z-10'
              }`}>
                <div className="absolute -top-5 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[14px] border-l-transparent border-r-[14px] border-r-transparent border-b-[20px] border-b-[#f5f4f0]/90"></div>
                
                <div className="bg-[#f5f4f0]/90 backdrop-blur-xs rounded-[2.5rem] md:rounded-[3rem] px-5 pt-4 pb-3 md:px-5 md:pt-4 md:pb-3 xl:px-6 xl:pt-5 xl:pb-3 drop-shadow-xl w-full flex flex-col">
                  <h2 className="font-bold text-sm md:text-base xl:text-lg mb-1 md:mb-2 text-black uppercase flex items-center gap-1.5">
                    <span className="h-2 w-2 rounded-full bg-[#9ebeb4] animate-ping" />
                    Explicação da professora:
                  </h2>
                  
                  {/* Dialogo atual */}
                  <div className="flex-1">
                    {dialogos[currentDialog]}
                  </div>

              {/* Controles de diálogo */}
                  <div className="flex justify-between items-center mt-2 pt-2 border-t border-gray-300/60">
                    <div className="flex gap-1.5 items-center">
                      {dialogos.map((_, idx) => (
                        <div 
                          key={idx} 
                          className={`h-2 rounded-full transition-all duration-300 ${
                            idx === currentDialog ? 'w-4 bg-[#656c9a]' : 'w-2 bg-gray-300'
                          }`}
                        />
                      ))}
                    </div>

                    <div className="flex gap-2 text-gray-600">
                      <button 
                        onClick={() => setCurrentDialog(prev => prev - 1)}
                        disabled={currentDialog === 0}
                        className="p-1 rounded-full hover:bg-gray-200 disabled:opacity-30 disabled:hover:bg-transparent transition-all cursor-pointer disabled:cursor-not-allowed"
                      >
                        <ChevronLeft size={20} />
                      </button>
                      <button 
                        onClick={() => {
                          if (currentDialog === dialogos.length - 1) {
                            if (activeLayer === 0) {
                              setShowPibEmpregosModal(true);
                              setPibEmpregosStep(0);
                            } else if (activeLayer === 1) {
                              setShowPibInflacaoModal(true);
                              setPibInflacaoStep(0);
                            }
                          } else {
                            setCurrentDialog(prev => prev + 1);
                          }
                        }}
                        className="p-1 rounded-full hover:bg-gray-200 transition-all cursor-pointer"
                      >
                        <ChevronRight size={20} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              
            </div>

            {/* Coluna direita: Tableau e Camadas */}
            <div className="flex flex-col space-y-4 h-full w-full">

              {/* Exibicao do Tableau */}
              <div className={`bg-[#f5f4f0] rounded-[2.5rem] p-4 md:p-6 drop-shadow-2xl flex-1 flex flex-col relative overflow-hidden group min-h-0 transition-all duration-300 ${
                tourStep === 3 ? 'ring-4 ring-offset-4 ring-[#8ebcb0] scale-[1.01] z-40 relative shadow-[0_0_35px_rgba(142,188,176,0.9)]' : ''
              }`}>
                {/* Barra de controle */}
                <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-2.5 mb-3 px-1 select-none">
                  {/* Bloco esquerdo com os seletores integrados */}
                  <div className="flex flex-row items-center gap-1.5 sm:gap-2.5 w-full lg:w-auto overflow-x-auto no-scrollbar pb-1 lg:pb-0">
                    <div className="flex items-center gap-1 shrink-0">
                      <span className="w-2 h-2 rounded-full bg-[#9995ce] animate-pulse"></span>
                    </div>

                    {/* Seletores de camada integrados */}
                    <div 
                      className={`flex items-center bg-[#858cb5]/20 border border-[#858cb5]/45 rounded-full p-0.5 gap-0.5 transition-all duration-300 shrink-0 ${
                        tourStep === 2 ? 'ring-4 ring-offset-2 ring-[#8ebcb0] scale-[1.06] z-50 relative bg-white shadow-[0_0_35px_rgba(142,188,176,1)]' : ''
                      }`}
                    >
                      {layers.map((layer, idx) => {
                        const isActive = activeLayer === idx;
                        return (
                          <button
                            key={layer.name}
                            onClick={() => {
                              // Bloqueia cliques durante outras etapas do tour
                              if (tourStep !== null && tourStep !== 2) return;
                              setActiveLayer(idx);
                              setCurrentDialog(0);
                            }}
                            className={`text-[9px] sm:text-xs font-extrabold rounded-full px-2.5 sm:px-4 py-1.5 transition-all tracking-wider uppercase cursor-pointer whitespace-nowrap ${
                              isActive
                                ? `${layer.color} text-white shadow-xs font-bold`
                                : 'text-[#444a70] hover:bg-white/50'
                            }`}
                          >
                            {layer.name}
                          </button>
                        );
                      })}
                    </div>

                    {/* Botao PIB e Empregos */}
                    <button
                      onClick={() => {
                        setShowPibEmpregosModal(true);
                        setPibEmpregosStep(0);
                      }}
                      className="text-[9px] sm:text-xs font-black bg-[#9ebeb4]/20 hover:bg-[#9ebeb4]/35 text-[#3d574e] border border-[#9ebeb4]/60 rounded-full px-2.5 sm:px-4 py-1.5 transition-all tracking-wider uppercase cursor-pointer flex items-center gap-1 sm:gap-1.5 shadow-2xs pointer-events-auto shrink-0 whitespace-nowrap"
                      title="A Relação entre PIB e Empregos"
                    >
                      <Briefcase size={12} className="text-[#3d574e] shrink-0" />
                      <span>PIB e Empregos</span>
                    </button>

                    {/* Botao PIB VS Inflacao */}
                    <button
                      onClick={() => {
                        setShowPibInflacaoModal(true);
                        setPibInflacaoStep(0);
                      }}
                      className="text-[9px] sm:text-xs font-black bg-[#9995ce]/20 hover:bg-[#9995ce]/35 text-[#3c395a] border border-[#9995ce]/60 rounded-full px-2.5 sm:px-4 py-1.5 transition-all tracking-wider uppercase cursor-pointer flex items-center gap-1 sm:gap-1.5 shadow-2xs pointer-events-auto shrink-0 whitespace-nowrap"
                      title="A Relação entre PIB e Inflação"
                    >
                      <Coins size={12} className="text-[#3c395a] shrink-0" />
                      <span>PIB VS Inflação</span>
                    </button>
                  </div>
                  
                  {/* Seletor de visualizacao */}
                  <div className="flex items-center bg-[#858cb5]/15 border border-[#858cb5]/25 rounded-full p-0.5 gap-0.5 self-stretch lg:self-auto justify-between lg:justify-start">
                    <span className="text-[9px] font-bold text-[#4c5175] uppercase tracking-widest pl-2 pr-1 hidden sm:inline-block">Zoom:</span>
                    {[
                      { label: 'Auto (Ajustado)', value: 'auto' },
                      { label: '100%', value: 1.0 },
                      { label: '85%', value: 0.85 },
                      { label: '75%', value: 0.75 },
                      { label: '65%', value: 0.65 }
                    ].map((opt) => (
                      <button
                        key={opt.value}
                        onClick={() => setTableauScale(opt.value as any)}
                        className={`text-[9px] sm:text-[10px] font-extrabold rounded-full px-2.5 py-1 transition-all tracking-tight cursor-pointer ${
                          tableauScale === opt.value
                            ? 'bg-[#656c9a] text-white shadow-xs'
                            : 'text-[#444a70] hover:bg-white/50'
                        }`}
                        title={opt.label}
                      >
                        {opt.value === 'auto' ? 'Auto' : `${(opt.value as number) * 100}%`}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex-1 w-full overflow-hidden rounded-2xl bg-white shadow-inner relative">
                  <iframe 
                    key={layers[activeLayer].url}
                    src={layers[activeLayer].url} 
                    title={`Tableau BI Dashboard - ${layers[activeLayer].name}`}
                    className="border-none absolute inset-0 text-black text-center w-full h-full"
                    style={getTableauScaleStyle()}
                    allowFullScreen
                  >
                    <p className="text-gray-500 font-medium">Seu dashboard do Tableau aparecerá aqui.</p>
                  </iframe>
                </div>
              </div>

            </div>
          </motion.main>
        )}

        {/* TAB 3: GLOSSÁRIO */}
        {activeTab === 'Glossário' && (
          <motion.div
            key="Glossário"
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.18, ease: 'easeOut' }}
            className="flex-1 min-h-0 grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 xl:gap-12 items-stretch h-full pb-4"
          >
            {/* Coluna esquerda: Mascote pensando */}
            <div className="lg:col-span-5 flex flex-col items-center justify-center relative min-h-[320px] md:min-h-[460px] select-none">
              
              {/* Blob decorativo */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
                <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className="w-[370px] h-[370px] sm:w-[440px] sm:h-[440px] md:w-[540px] md:h-[540px] xl:w-[600px] xl:h-[600px] text-[#9fa2c4]/24 fill-current transition-all duration-300">
                  <path d="M41.7,-60.5C54.4,-53,65.3,-41.4,70.9,-27.2C76.5,-12.9,76.8,4.1,72.4,19.3C68,34.4,58.8,47.8,46.3,56.8C33.8,65.8,18,70.4,2.2,67.4C-13.6,64.4,-29.4,53.8,-42.6,44.2C-55.8,34.6,-66.4,26,-70.9,13.7C-75.3,1.3,-73.6,-14.8,-66.6,-28.4C-59.5,-41.9,-47.1,-53,-33.6,-60C-20.2,-67,-9.1,-70,-0.1,-69.8C8.9,-69.7,18.9,-66.5,41.7,-60.5Z" transform="translate(100 100)" />
                </svg>
              </div>

              {/* Elementos flutuantes animados */}
              {/* Interrogacao */}
              <motion.div
                animate={{ y: [0, -10, 0], rotate: [-15, -20, -15] }}
                transition={{ duration: 4.2, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-2 left-6 md:left-12 w-12 h-15 text-[#9ebeb4] drop-shadow-[0_2px_4px_rgba(0,0,0,0.15)] select-none"
              >
                <RoundedQuestionMark />
              </motion.div>

              {/* Lampada */}
              <motion.div
                animate={{ y: [0, 10, 0], rotate: [12, 18, 12] }}
                transition={{ duration: 3.8, repeat: Infinity, ease: "easeInOut", delay: 0.4 }}
                className="absolute top-[20%] right-6 md:right-10 w-14 h-18 text-[#9ebeb4] drop-shadow-[0_3px_5px_rgba(0,0,0,0.15)] select-none"
              >
                <RoundedLightbulb />
              </motion.div>

              {/* Livro */}
              <motion.div
                animate={{ y: [0, -8, 0], rotate: [-20, -15, -20] }}
                transition={{ duration: 4.8, repeat: Infinity, ease: "easeInOut", delay: 0.9 }}
                className="absolute bottom-[10%] left-6 md:left-10 w-15 h-12 text-[#9ebeb4] drop-shadow-[0_2px_4px_rgba(0,0,0,0.15)] select-none"
              >
                <RoundedBook />
              </motion.div>

              {/* Ilustracao do Mascote */}
              <img 
                src="Dessa-pensando1-34.png" 
                alt="Mascote Glossário"
                className="w-auto h-auto max-h-[48vh] sm:max-h-[54vh] md:max-h-[62vh] lg:max-h-[72vh] xl:max-h-[80vh] object-contain relative z-10 drop-shadow-[0_20px_40px_rgba(30,41,59,0.25)] hover:scale-[1.03] transition-all duration-300 ease-out pointer-events-none"
                referrerPolicy="no-referrer"
              />

            </div>

            {/* Coluna direita: Cards do glossario */}
            <div className="lg:col-span-7 w-full grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-5 h-full items-stretch">
              {GLOSSARY_INTERACTIVE_CARDS.map((card) => (
                <div 
                  key={card.id}
                  className={`flex flex-col p-5 md:p-6 rounded-[2rem] ${card.bgClass} transition-all duration-300 transform border border-white/95 short-screen-glossary-card`}
                >
                  {/* Título do Card */}
                  <div className="text-center mb-5 select-none short-screen-glossary-title">
                    <span className="font-black text-white text-lg md:text-xl tracking-[0.2em] uppercase block">
                      {card.title}
                    </span>
                    <div className="w-12 h-1 bg-white/25 mx-auto mt-1.5 rounded-full" />
                  </div>

                  {/* Lista de perguntas estilo pílula */}
                  <div className="flex flex-col gap-2.5 short-screen-glossary-gap">
                    {card.questions.map((question, qIdx) => {
                      const isActive = selectedGlossary?.cardId === card.id && selectedGlossary?.questionIdx === qIdx;
                      return (
                        <button
                          key={qIdx}
                          onClick={() => {
                            if (isActive) {
                              setSelectedGlossary(null);
                            } else {
                              setSelectedGlossary({ cardId: card.id, questionIdx: qIdx });
                            }
                          }}
                          className={`w-full py-3 px-4 rounded-xl text-base md:text-lg lg:text-[1.1rem] font-extrabold tracking-wide transition-all duration-300 transform select-none cursor-pointer whitespace-normal leading-tight text-center short-screen-glossary-button ${
                            isActive ? card.activePillClass : card.pillClass
                          }`}
                        >
                          {question.label}
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>

            {/* Modal Informativo do Glossario */}
            <AnimatePresence mode="wait">
              {selectedGlossary && (
                <motion.div
                  key="glossary-modal"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.15, ease: "easeOut" }}
                  className="fixed inset-0 z-50 flex items-center justify-center p-4"
                >
                  {/* Fundo escurecido */}
                  <div 
                    onClick={() => setSelectedGlossary(null)}
                    className="absolute inset-0 bg-[#0e1630]/75 backdrop-blur-md cursor-pointer"
                  />
                  
                  {/* Card do Modal */}
                  {(() => {
                    const activeCard = GLOSSARY_INTERACTIVE_CARDS.find(c => c.id === selectedGlossary.cardId);
                    const activeQuestion = activeCard?.questions[selectedGlossary.questionIdx];
                    if (!activeCard || !activeQuestion) return null;

                    const isPurpleTheme = activeCard.theme === 'purple';
                    const themeTitleColor = 'text-[#152352]';
                    const themePillColor = isPurpleTheme ? 'bg-[#9995ce]/30 text-[#152352]' : 'bg-[#9ebeb4]/30 text-[#152352]';
                    const themeBorderClass = isPurpleTheme ? 'border-[#9995ce]/65 bg-[#9995ce]/12' : 'border-[#9ebeb4]/65 bg-[#9ebeb4]/12';
                    const themeButtonClass = isPurpleTheme ? 'bg-[#656c9a] hover:bg-[#525883]' : 'bg-[#9ebeb4] hover:bg-[#8ba69e]';

                    return (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 15 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 15 }}
                        transition={{ type: "spring", damping: 25, stiffness: 400 }}
                        className="relative bg-[#f5f4f0] rounded-[2.5rem] max-w-xl w-full shadow-2xl border-2 border-white overflow-hidden z-10 flex flex-col"
                      >
                        {/* Cabecalho colorido */}
                        <div className={`px-6 py-4 ${isPurpleTheme ? 'bg-[#9995ce]' : 'bg-[#9ebeb4]'} flex items-center justify-between border-b-2 border-white/40`}>
                          <div className="flex items-center gap-2">
                            <span className={`${themePillColor} text-xs uppercase font-extrabold px-3.5 py-1.5 rounded-full tracking-wider border border-white/50 shadow-xs`}>
                              {activeCard.title}
                            </span>
                          </div>
                          
                          {/* Botao fechar */}
                          <button
                            onClick={() => setSelectedGlossary(null)}
                            className="p-1.5 rounded-full bg-white/70 hover:bg-white text-gray-700 hover:text-black transition shadow-xs cursor-pointer"
                            aria-label="Fechar"
                          >
                            <X size={16} />
                          </button>
                        </div>

                        {/* Conteúdo do modal */}
                        <div className="p-6 md:p-8 space-y-6 overflow-y-auto max-h-[60vh]">
                          {/* Título da Pergunta */}
                          <div className="space-y-1">
                            <span className="text-[10px] md:text-xs text-gray-400 font-extrabold uppercase tracking-widest">PERGUNTA E CONCEITO:</span>
                            <h3 className={`text-xl md:text-2xl font-black ${themeTitleColor} leading-tight`}>
                              {activeQuestion?.title || activeQuestion?.label}
                            </h3>
                          </div>

                          {/* Explicação Detalhada */}
                          <div className="space-y-1">
                            <span className="text-[10px] md:text-xs text-gray-400 font-extrabold uppercase tracking-widest block">EXPLICAÇÃO:</span>
                            <p className="text-gray-805 text-sm md:text-base leading-relaxed font-semibold">
                              {activeQuestion.explanation}
                            </p>
                          </div>

                          {/* Fórmula se existir */}
                          {activeQuestion.formula && (
                            <div className={`p-4 rounded-2xl border-l-4 ${themeBorderClass} flex flex-col gap-1 shadow-xs`}>
                              <span className="text-[10px] md:text-xs text-gray-500 font-black uppercase tracking-widest block">
                                Expressão Econômica:
                              </span>
                              <div className="font-mono text-left text-xs md:text-sm font-black text-gray-900 break-all select-all">
                                {activeQuestion.formula}
                              </div>
                            </div>
                          )}

                          {/* Caso Real Prático (Exemplo de Storytelling de Dados) */}
                          <div className="bg-[#e4a834]/10 p-5 rounded-[2rem] border-l-4 border-[#e4a834] flex flex-col gap-1.5 shadow-xs">
                            <div className="flex items-center gap-1.5">
                              <Sparkles className="text-[#e4a834]" size={16} />
                              <span className="text-[10px] md:text-xs text-amber-800 font-black uppercase tracking-widest">
                                Caso Real (Exemplo Prático):
                              </span>
                            </div>
                            <p className="text-gray-800 text-xs md:text-sm leading-relaxed italic font-medium">
                              "{activeQuestion.example}"
                            </p>
                          </div>
                        </div>

                        {/* Ações do Rodapé do modal */}
                        <div className="p-6 pt-2 bg-[#f0eee8] border-t border-gray-200/55 flex justify-end">
                          <button
                            onClick={() => setSelectedGlossary(null)}
                            className={`px-8 py-3 ${themeButtonClass} text-white font-black text-sm tracking-wider rounded-full shadow-md hover:shadow-lg hover:scale-103 active:scale-95 transition cursor-pointer uppercase`}
                          >
                            Entendi, ótimo!
                          </button>
                        </div>
                      </motion.div>
                    );
                  })()}
                </motion.div>
              )}
            </AnimatePresence>

          </motion.div>
        )}

        {/* TAB 4: JOGO */}
        {activeTab === 'Jogo' && (
          <motion.div
            key="Jogo"
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.18, ease: 'easeOut' }}
            className="flex-1 min-h-0 p-2 sm:p-4 lg:p-6 flex flex-col justify-center h-full relative overflow-hidden text-white"
          >
            {/* Imagem de fundo ambiente da Esplanada dos Ministérios */}
            <div className="absolute inset-0 z-0 select-none pointer-events-none overflow-hidden">
              <img 
                src={esplanadaBg} 
                alt="Brasília Esplanada dos Ministérios Background" 
                className="w-full h-full object-cover object-center transform scale-102"
                referrerPolicy="no-referrer"
              />
              {/* Gradiente visual sutil sobre o fundo para manter a elegância da interface */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-slate-950/50 pointer-events-none" />
            </div>

            {/* Tela Interativa Principal */}
            {showReignsTutorial ? (
              /* Tela de Tutorial */
              <div className="flex-1 w-full flex flex-col items-center justify-center min-h-0 z-10 py-4 px-2 select-none relative gap-4">
                <div className="relative w-full max-w-[420px] flex justify-center items-center">
                  <div className="w-full bg-[#858cb5] border-2 border-white/20 rounded-[2.5rem] shadow-2xl shadow-slate-900/40 flex flex-col overflow-hidden relative p-8 sm:p-10 text-center text-white">
                    <div className="relative mb-6 flex justify-center">
                      <img 
                        src="Dessa-acenando1.PNG" 
                        alt="Dessa acenando" 
                        className="h-28 sm:h-36 object-contain drop-shadow-xl transform hover:scale-105 transition-transform duration-300"
                        referrerPolicy="no-referrer"
                      />
                    </div>

                    <h3 className="text-xl sm:text-2xl font-black text-white uppercase tracking-tight mb-2">
                      Bem-vindo ao Jogo!
                    </h3>

                    <p className="text-slate-100 text-xs sm:text-sm leading-relaxed mb-6 font-semibold max-w-sm mx-auto">
                      Esse jogo é baseado na identidade básica do PIB sob a ótica da demanda e você é o(a) Ministro(a) da Fazenda que precisa tomar decisões para garantir a estabilidade do país!
                      <br />
                      <span className="text-amber-200 font-extrabold block mt-3 text-xs uppercase tracking-wider font-sans">
                        Fórmula Base: Y = C + I + G + (X - M)
                      </span>
                    </p>

                    <button 
                      onClick={() => setShowReignsTutorial(false)}
                      className="w-full px-6 py-3.5 bg-[#9ebeb4] hover:bg-[#83aa9f] text-[#152352] font-black text-xs sm:text-sm rounded-full flex items-center justify-center gap-2 shadow-md transition-all cursor-pointer uppercase tracking-wider"
                    >
                      Entendi, vamos jogar!
                    </button>
                  </div>
                </div>
              </div>
            ) : reignsGameOver ? (
              /* Tela de Fim de Jogo */
              <div className="flex-1 w-full flex flex-col items-center justify-center min-h-0 z-10 py-4 px-2 select-none relative gap-4">
                <div className="relative w-full max-w-[420px] flex justify-center items-center">
                  <div className="w-full bg-[#858cb5] border-2 border-white/20 rounded-[2.5rem] shadow-2xl shadow-slate-900/40 flex flex-col overflow-hidden relative p-8 sm:p-10 text-center text-white">
                    <div className="relative mb-6 flex justify-center">
                      <div className="h-24 w-24 sm:h-28 sm:w-28 bg-red-500/20 text-red-400 rounded-full flex items-center justify-center text-5xl shadow-xl border-4 border-red-500/30">
                        💥
                      </div>
                    </div>

                    <h3 className="text-2xl sm:text-3xl font-black text-white uppercase tracking-tight mb-3">
                      Governo Destituído!
                    </h3>

                    <p className="text-slate-100 text-sm leading-relaxed mb-8 max-w-sm font-semibold mx-auto">
                      {reignsGameOverReason}
                      <br />
                      <span className="text-amber-200 font-extrabold block mt-3 text-xs uppercase tracking-wider">
                        Dica: No equilíbrio das contas nacionais, extremos de teto ou escassez enfraquecem o PIB!
                      </span>
                    </p>

                    <div className="flex flex-col gap-3 w-full justify-center">
                      <button 
                        onClick={() => setActiveTab('Glossário')}
                        className="px-6 py-3 bg-white/10 hover:bg-white/15 border border-white/20 text-white font-extrabold text-xs sm:text-sm rounded-full shadow-md cursor-pointer uppercase tracking-wider transition-all"
                      >
                        Consultar Glossário
                      </button>
                      <button 
                        onClick={resetReignsGame}
                        className="px-6 py-3 bg-[#9ebeb4] hover:bg-[#83aa9f] text-[#152352] font-black text-xs sm:text-sm rounded-full flex items-center justify-center gap-2 shadow-md transition-all cursor-pointer uppercase tracking-wider"
                      >
                        <RotateCcw size={16} />
                        Reiniciar Jogo
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ) : reignsGameWon ? (
              /* Tela de Vitoria */
              <div className="flex-1 w-full flex flex-col items-center justify-center min-h-0 z-10 py-4 px-2 select-none relative gap-4">
                <div className="relative w-full max-w-[420px] flex justify-center items-center">
                  <div className="w-full bg-[#858cb5] border-2 border-white/20 rounded-[2.5rem] shadow-2xl shadow-slate-900/40 flex flex-col overflow-hidden relative p-8 sm:p-10 text-center text-white">
                    <div className="relative mb-6 flex justify-center">
                      <div className="h-24 w-24 sm:h-28 sm:w-28 bg-[#8ebcb0]/25 text-[#8ebcb0] rounded-full flex items-center justify-center text-5xl shadow-xl border-4 border-[#8ebcb0]/30 animate-bounce">
                        🏆
                      </div>
                    </div>

                    <h3 className="text-2xl sm:text-3xl font-black text-white uppercase tracking-tight mb-3">
                      PIB Estabilizado!
                    </h3>

                    <p className="text-slate-100 text-xs sm:text-sm leading-relaxed mb-6 max-w-sm font-semibold mx-auto">
                      Parabéns! Você concluiu todas as rodadas mantendo o equilíbrio fundamental da demanda agregada!
                      <br />
                      <span className="text-amber-200 font-extrabold block mt-3 text-xs uppercase tracking-wider font-sans">
                        Você conseguiu manter o PIB estável, controlou a Inflação, salvaguardou o Bem-Estar das famílias e garantiu a higidez das Contas Públicas com maestria! Y = C + I + G + (X-M) em perfeito equilíbrio!
                      </span>
                    </p>

                    <div className="flex flex-col gap-3 w-full justify-center">
                      <button 
                        onClick={() => setActiveTab('Mapa Interativo')}
                        className="px-6 py-3 bg-[#5d6bb3] hover:bg-[#4b589e] text-white font-extrabold text-xs sm:text-sm rounded-full shadow-md cursor-pointer uppercase tracking-wider transition-all"
                      >
                        Estudar nos Mapas
                      </button>
                      <button 
                        onClick={resetReignsGame}
                        className="px-6 py-3 bg-white text-[#152352] font-black text-xs sm:text-sm rounded-full flex items-center justify-center gap-2 shadow-md hover:bg-gray-100 transition-all cursor-pointer uppercase tracking-wider"
                      >
                        <RotateCcw size={16} />
                        Jogar Novamente
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              /* Gameplay Ativo */
              (() => {
                const currentCard = REIGNS_CARDS[currentReignsIdx];
                return (
                  <div className="flex-1 w-full flex flex-col items-center justify-center min-h-0 z-10 py-4 px-2 select-none relative gap-4">
                    
                    {/* Card Interativo Central */}
                    <div className="relative w-full max-w-[420px] flex justify-center items-center">
                      
                      {/* Indicador esquerdo */}
                      <div className="absolute -left-14 lg:-left-20 xl:-left-24 hidden md:flex flex-col items-center justify-between h-32 w-10 py-5 select-none pointer-events-none bg-white/15 backdrop-blur-xs border border-white/25 rounded-full shadow-md">
                        <motion.span 
                          animate={{ x: [-3, 1, -3], opacity: [0.6, 0.9, 0.6] }}
                          transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
                          className="text-lg font-black text-rose-250 drop-shadow-[0_1px_2px_rgba(239,68,68,0.15)]"
                        >
                          ◀
                        </motion.span>
                        <div className="h-12 flex items-center justify-center relative">
                          <span className="text-[9px] font-black tracking-[0.25em] text-white/70 transform -rotate-90 whitespace-nowrap origin-center block">
                            NEGAR
                          </span>
                        </div>
                      </div>

                      {/* Indicador direito */}
                      <div className="absolute -right-14 lg:-right-20 xl:-right-24 hidden md:flex flex-col items-center justify-between h-32 w-10 py-5 select-none pointer-events-none bg-white/15 backdrop-blur-xs border border-white/25 rounded-full shadow-md">
                        <motion.span 
                          animate={{ x: [3, -1, 3], opacity: [0.6, 0.9, 0.6] }}
                          transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
                          className="text-lg font-black text-emerald-250 drop-shadow-[0_1px_2px_rgba(16,185,129,0.15)]"
                        >
                          ▶
                        </motion.span>
                        <div className="h-12 flex items-center justify-center relative">
                          <span className="text-[9px] font-black tracking-[0.25em] text-white/70 transform rotate-90 whitespace-nowrap origin-center block">
                            ACEITAR
                          </span>
                        </div>
                      </div>

                      <motion.div 
                        drag="x"
                        dragConstraints={{ left: 0, right: 0 }}
                        dragElastic={0.7}
                        whileDrag={{ scale: 1.05, cursor: 'grabbing' }}
                        onDrag={(event, info) => {
                          setReignsDragOffset(info.offset.x);
                          if (info.offset.x < -15) {
                            setReignsHoveredOption('left');
                          } else if (info.offset.x > 15) {
                            setReignsHoveredOption('right');
                          } else {
                            setReignsHoveredOption(null);
                          }
                        }}
                        onDragEnd={(event, info) => {
                          setReignsDragOffset(0);
                          setReignsHoveredOption(null);
                          if (info.offset.x < -100) {
                            handleReignsChoice('left');
                          } else if (info.offset.x > 100) {
                            handleReignsChoice('right');
                          }
                        }}
                        style={{
                          rotate: reignsDragOffset * 0.04,
                        }}
                        className="w-full bg-white border border-gray-100 rounded-[2.5rem] shadow-2xl shadow-slate-900/40 flex flex-col overflow-hidden relative cursor-grab active:cursor-grabbing transition-shadow duration-300 pointer-events-auto"
                      >
                        
                        {/* Carimbos Visuais Dinâmicos de Opacidade e Descrições de Escolha - Visíveis apenas durante ações de arrastar da carta */}
                        {Math.abs(reignsDragOffset) > 15 && (
                          <div 
                            className="absolute inset-0 pointer-events-none flex flex-col justify-center items-center p-6 z-30 transition-all rounded-[2.5rem]"
                            style={{ 
                              backgroundColor: reignsDragOffset < 0 
                                ? `rgba(244, 63, 94, ${Math.min(0.22, Math.abs(reignsDragOffset) / 180)})` 
                                : `rgba(16, 185, 129, ${Math.min(0.22, Math.abs(reignsDragOffset) / 180)})`
                            }}
                          >
                            {reignsDragOffset < 0 ? (
                              <div 
                                className="flex flex-col items-center justify-center text-center gap-4 px-4 scale-105"
                                style={{ opacity: Math.min(1, (Math.abs(reignsDragOffset) - 15) / 50) }}
                              >
                                <div className="border-[5px] border-rose-500 text-rose-600 font-extrabold text-3xl px-8 py-2.5 rounded-2xl transform -rotate-12 uppercase tracking-wider bg-white/95 shadow-xl">
                                  NEGAR
                                </div>
                                <p className="text-[#152352] bg-white border border-rose-100 font-extrabold text-xs sm:text-sm px-4 py-3 rounded-2xl shadow-lg max-w-[280px] leading-relaxed">
                                  "{currentCard.leftSubtext}"
                                </p>
                              </div>
                            ) : (
                              <div 
                                className="flex flex-col items-center justify-center text-center gap-4 px-4 scale-105"
                                style={{ opacity: Math.min(1, (Math.abs(reignsDragOffset) - 15) / 50) }}
                              >
                                <div className="border-[5px] border-emerald-500 text-emerald-600 font-extrabold text-3xl px-8 py-2.5 rounded-2xl transform rotate-12 uppercase tracking-wider bg-white/95 shadow-xl">
                                  ACEITAR
                                </div>
                                <p className="text-[#152352] bg-white border border-emerald-100 font-extrabold text-xs sm:text-sm px-4 py-3 rounded-2xl shadow-lg max-w-[280px] leading-relaxed">
                                  "{currentCard.rightSubtext}"
                                </p>
                              </div>
                            )}
                          </div>
                        )}

                        {/* Barras de Progresso Macroeconômicas Integradas */}
                        <div className="px-8 py-7 bg-[#858cb5] border-b-2 border-white/20 grid grid-cols-4 gap-4 md:gap-7 select-none relative z-10 shadow-sm short-screen-reigns-bars">
                          {[
                            { value: reignsStats.pib, label: "PIB", shortLabel: "PIB", icon: TrendingUp, active: reignsHoveredOption === 'left' ? currentCard.leftDelta.pib !== 0 : reignsHoveredOption === 'right' ? currentCard.rightDelta.pib !== 0 : false },
                            { value: reignsStats.inflacao, label: "Inflação", shortLabel: "Inflação", icon: Flame, active: reignsHoveredOption === 'left' ? currentCard.leftDelta.inflacao !== 0 : reignsHoveredOption === 'right' ? currentCard.rightDelta.inflacao !== 0 : false },
                            { value: reignsStats.bemEstar, label: "Bem Estar", shortLabel: "Bem Estar", icon: Heart, active: reignsHoveredOption === 'left' ? currentCard.leftDelta.bemEstar !== 0 : reignsHoveredOption === 'right' ? currentCard.rightDelta.bemEstar !== 0 : false },
                            { value: reignsStats.contasPublicas, label: "Contas Públicas", shortLabel: "Contas Públicas", icon: Coins, active: reignsHoveredOption === 'left' ? currentCard.leftDelta.contasPublicas !== 0 : reignsHoveredOption === 'right' ? currentCard.rightDelta.contasPublicas !== 0 : false },
                          ].map((item, idx) => {
                            const isCritical = item.value <= 25 || item.value >= 80;
                            return (
                              <div 
                                key={idx} 
                                className={`flex flex-col gap-2 relative group transition-all duration-300 ${item.active ? 'scale-105 filter drop-shadow-md' : ''}`}
                              >
                                <div className="flex items-center justify-between">
                                  <div className="flex items-center gap-2 min-w-0">
                                    <item.icon size={15} className={`${isCritical ? 'text-rose-200 animate-bounce' : 'text-white'} ${item.active ? 'text-amber-300' : ''} transition-colors duration-200`} />
                                    <span className={`text-xs md:text-sm font-black tracking-tight truncate ${isCritical ? 'text-rose-100 font-extrabold' : 'text-white'} ${item.active ? 'text-amber-200' : ''}`}>
                                      {item.shortLabel}
                                    </span>
                                  </div>
                                  <span className={`text-xs md:text-sm font-black tracking-tight ${isCritical ? 'text-rose-200 animate-pulse' : 'text-white'} ${item.active ? 'text-amber-200 animate-pulse' : ''}`}>
                                    {item.value}%
                                  </span>
                                </div>
                                <div className={`w-full h-4 bg-white/20 rounded-full overflow-hidden relative shadow-inner border transition-all duration-300 ${item.active ? 'border-amber-300 ring-2 ring-amber-300/30' : 'border-white/10'}`}>
                                  <div 
                                    className={`h-full rounded-full transition-all duration-500 ease-out ${isCritical ? 'bg-gradient-to-r from-rose-450 to-rose-550 shadow-md shadow-rose-400' : 'bg-gradient-to-r from-[#9ebeb4] to-[#afcfc6] shadow-sm shadow-[#9ebeb4]/40'}`}
                                    style={{ width: `${item.value}%` }}
                                  />
                                </div>
                                
                                {/* Dica flutuante ao passar o mouse */}
                                <div className="absolute top-[44px] left-1/2 transform -translate-x-1/2 bg-[#152352] text-white text-[10px] px-2.5 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 pointer-events-none transition-all duration-200 z-50 whitespace-nowrap font-bold shadow-lg border border-slate-700/50">
                                  {item.label}: <span className={isCritical ? 'text-rose-300' : 'text-teal-350'}>{item.value}%</span>
                                </div>
                                 
                                {/* Pulso Indicador Dinâmico Ativo */}
                                {item.active && (
                                  <div className="absolute -bottom-2.5 left-1/2 transform -translate-x-1/2 flex items-center justify-center">
                                    <div className="absolute h-3 w-3 bg-amber-400 rounded-full animate-ping opacity-75" />
                                    <div className="h-2 w-2 bg-amber-400 rounded-full shadow-sm" />
                                  </div>
                                )}
                              </div>
                            );
                          })}
                        </div>

                        {/* Corpo do Card de Personagem */}
                        <div className="p-8 md:p-10 flex-grow flex flex-col justify-around items-center text-center text-gray-800 min-h-[500px] bg-gradient-to-b from-white via-[#858cb5]/5 to-white animate-fade-in short-screen-reigns-body">
                          <div className="flex flex-col items-center w-full gap-2 select-none">
                            {/* Nome do Personagem */}
                            <h4 className="text-[#152352] text-base sm:text-lg font-black leading-tight max-w-[340px] tracking-tight font-serif px-6 py-2.5 bg-white/75 rounded-2xl border border-[#9ebeb4]/50 shadow-2xs">
                              {currentCard.characterName}
                            </h4>
                          </div>

                          {/* Frame da ilustração do personagem */}
                          <div className="w-28 h-28 sm:w-32 sm:h-32 mt-4 mb-2 relative rounded-full overflow-hidden shadow-xl border-2 border-[#858cb5]/45 hover:scale-105 transition-all duration-300 pointer-events-none bg-slate-50 short-screen-reigns-mascot-frame">
                            <CharacterIllustration type={currentCard.characterImage} />
                          </div>

                          {/* Balão de fala de diálogo - espaço horizontal expandido */}
                          <div className="relative mt-4 w-full max-w-[440px] px-6 py-5 bg-white border border-[#9ebeb4]/50 rounded-[1.75rem] shadow-sm select-none">
                            {/* Seta do balão de fala apontando para CIMA */}
                            <div className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-3 h-3 bg-white rotate-45 border-t border-l border-[#9ebeb4]/50" />
                            
                            {/* Detalhes estéticos de aspas */}
                            <span className="absolute top-1.5 left-3.5 text-3xl text-[#858cb5]/30 font-serif leading-none pointer-events-none select-none">“</span>
                            <p className="relative z-10 text-xs sm:text-sm text-slate-700 font-bold leading-relaxed text-justify px-2 font-sans">
                              {currentCard.speech}
                            </p>
                            <span className="absolute bottom-1.5 right-3.5 text-3xl text-[#858cb5]/30 font-serif leading-none pointer-events-none select-none">”</span>
                          </div>
                        </div>

                         {/* Alça interativa de ajuda para arrastar dentro do rodapé do card */}
                        <div className="px-6 py-4 shrink-0 bg-[#858cb5] border-t-2 border-white/20 flex flex-col items-center select-none shadow-inner relative overflow-hidden">
                          {/* Pulso de luz sutil em segundo plano */}
                          <div className="absolute inset-0 bg-white/5 animate-pulse pointer-events-none" />
                          
                          <div className="w-10 h-1 bg-white/45 rounded-full mb-3.5 relative z-10" />
                          
                          <div className="flex items-center gap-4 justify-center w-full relative z-10">
                            {/* Seta animada para a esquerda */}
                            <motion.span 
                              animate={{ x: [-6, 2, -6], opacity: [0.3, 1, 0.3] }}
                              transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
                              className="text-white text-base font-black selection:bg-transparent"
                            >
                              ◀◀
                            </motion.span>
                            
                            {/* Chamada para ação central */}
                            <span className="text-[10px] sm:text-[11px] font-black tracking-widest uppercase text-white font-mono flex items-center gap-2 select-none">
                              Arraste lateralmente para Decidir
                            </span>
                            
                            {/* Seta animada para a direita */}
                            <motion.span 
                              animate={{ x: [6, -2, 6], opacity: [0.3, 1, 0.3] }}
                              transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
                              className="text-white text-base font-black selection:bg-transparent"
                            >
                              ▶▶
                            </motion.span>
                          </div>
                        </div>

                      </motion.div>
                    </div>

                  </div>
                );
              })()
            )}
          </motion.div>
        )}

        {/* TAB 5: SOBRE O PROJETO */}
        {activeTab === 'Sobre o projeto' && (
          <motion.div
            key="Sobre o projeto"
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.18, ease: 'easeOut' }}
            className="flex-1 min-h-0 flex flex-col h-full overflow-hidden"
          >
            {/* Grid Bento */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 lg:gap-4 items-stretch py-1 flex-1 min-h-0">
              
              {/* Lado esquerdo: Foto da professora */}
              <div className="lg:col-span-4 flex flex-col gap-3 lg:gap-4">
                
                {/* 1. Frame da professora */}
                <div className="bg-[#cbd2f5] border border-white/80 rounded-[2.2rem] p-4 sm:p-5 flex flex-col items-center justify-between shadow-xl min-h-[320px] lg:min-h-[350px] xl:min-h-[370px] relative transition-all duration-300 hover:border-white hover:shadow-2xl flex-1 short-screen-bento-min-h">
                  <div className="flex-1 flex items-center justify-center w-full">
                    <img 
                       src="Dessa-a-pose1.PNG" 
                       alt="Mascote Sobre o projeto" 
                       className="w-auto h-auto max-h-[360px] sm:max-h-[400px] md:max-h-[440px] lg:max-h-[480px] xl:max-h-[520px] scale-[1.08] origin-bottom object-contain drop-shadow-2xl short-screen-bento-mascot"
                       referrerPolicy="no-referrer"
                    />
                  </div>
                  
                  {/* Legenda */}
                  <div className="text-center w-full mt-2 select-none">
                    <span className="font-extrabold text-[#152352] text-[10px] sm:text-xs tracking-[0.2em] uppercase block">
                      A Professora do Projeto
                    </span>
                    <div className="w-1/2 h-[2px] bg-[#152352]/30 mx-auto mt-1.5 rounded-full" />
                  </div>
                </div>

                {/* 2. Autoria e creditos */}
                <div className="bg-[#9995ce] border border-white/80 rounded-[2.2rem] p-4 sm:p-5 flex flex-col justify-center shadow-lg relative min-h-[120px] lg:min-h-[130px] xl:min-h-[140px] transition-all duration-300 hover:border-white hover:shadow-xl">
                  <div>
                    <h3 className="font-black text-[#152352] text-sm lg:text-base xl:text-lg tracking-wider uppercase mb-1 select-none">
                      AUTORIA E CRÉDITOS
                    </h3>
                    <div className="w-10 h-[1.5px] bg-[#152352]/35 mt-0.5 mb-1.5 rounded-full" />
                    <div className="text-[#2c3d75] text-xs sm:text-sm leading-relaxed font-bold flex flex-col gap-0.5">
                      <p className="text-[#152352] font-black">Caroline Tiemi Kawamura dos Santos</p>
                      <p className="text-[#152352] font-black">Isabela Milena Gomes de Moraes</p>
                      <p className="text-[#152352] font-black">Isabella Borges Ardenghi</p>
                      <p className="text-[#152352] font-black">Yasmim da Silva Pinheiro</p>
                      <p className="text-[#2f407b] text-[10px] mt-1.5 uppercase tracking-wider font-extrabold select-none">Curso de Economia · Contabilidade Social</p>
                    </div>
                  </div>
                </div>

              </div>

              {/* Lado direito: Proposito e metodologia */}
              <div className="lg:col-span-8 flex flex-col gap-3 lg:gap-4 flex-1 min-h-0">
                
                {/* 3. Proposito Pedagogico */}
                <div className="bg-[#9ebeb4]/70 border border-white/80 rounded-[2.2rem] p-4 lg:p-4.5 flex flex-col justify-between shadow-md transition-all duration-300 hover:border-white hover:shadow-lg w-full flex-initial">
                  <div>
                    <h3 className="text-[#152352] font-black text-sm lg:text-base xl:text-lg tracking-wider uppercase mb-1 select-none">
                      1. PROPÓSITO PEDAGÓGICO
                    </h3>
                    <p className="text-[#2c3d75] text-xs sm:text-sm md:text-sm leading-relaxed font-bold">
                      Democratizar a Contabilidade Social e conceitos de PIB/Inflação usando <span className="text-[#152352] font-black uppercase bg-white/50 px-2 py-0.5 rounded-lg border border-white/65 shadow-3xs text-[10px] sm:text-xs">Data Storytelling</span> e <span className="text-[#152352] font-black uppercase bg-white/50 px-2 py-0.5 rounded-lg border border-white/65 shadow-3xs text-[10px] sm:text-xs">Game-Based Learning</span>.
                    </p>
                  </div>

                  {/* Icones temáticos */}
                  <div className="flex items-center gap-3 mt-2 select-none border-t border-white/35 pt-2">
                    {/* Icone 1: Grafico */}
                    <div className="p-1.5 bg-white/60 border border-white/70 rounded-xl shadow-2xs">
                      <svg className="w-5 h-5 text-[#152352]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 002 2h2a2 2 0 002-2" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3 3v18h18" />
                      </svg>
                    </div>

                    {/* Icone 2: Livro aberto */}
                    <div className="p-1.5 bg-white/60 border border-white/70 rounded-xl shadow-2xs">
                      <svg className="w-5 h-5 text-[#152352]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.168.477 4 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.168.477-4 1.253" />
                      </svg>
                    </div>

                    {/* Icone 3: Parceria */}
                    <div className="p-1.5 bg-white/60 border border-white/70 rounded-xl shadow-2xs">
                      <svg className="w-5 h-5 text-[#152352]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                      </svg>
                    </div>
                  </div>
                </div>

                {/* Linhas internas do grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 lg:gap-4 flex-1 min-h-0">
                  
                  {/* 4. Metodologia */}
                  <div className="bg-[#9fa2c4] border border-white/80 rounded-[2.2rem] p-4 lg:p-5 flex flex-col justify-between shadow-xs transition-all duration-300 hover:border-white hover:shadow-md flex-1 min-h-0 font-sans">
                    <div className="flex flex-col h-full flex-1 min-h-0">
                      <h4 className="text-[#152352] font-black text-sm lg:text-base xl:text-lg tracking-wider uppercase mb-1 select-none">
                        2. METODOLOGIA E FERRAMENTAS (STACK)
                      </h4>
                      
                      {/* Tech grid badges - horizontal layout to fill the space */}
                      <div className="flex flex-col gap-2 mt-2 lg:mt-3 select-none flex-1 justify-between min-h-0">
                        {/* Data Narrative */}
                        <div className="bg-white/60 border border-white/70 p-2 sm:p-2.5 rounded-2xl flex items-center gap-3 shadow-3xs flex-1 min-h-0">
                          <div className="w-8 h-8 shrink-0 bg-indigo-100/60 border border-indigo-200/45 rounded-full flex items-center justify-center shadow-3xs">
                            <span className="text-indigo-600 text-sm">📚</span>
                          </div>
                          <div className="flex flex-col min-w-0">
                            <span className="font-extrabold text-[#152352] text-xs sm:text-sm leading-tight">Data Narrative</span>
                            <span className="text-[10px] sm:text-xs text-[#2c3d75] font-bold mt-0.5 leading-none">Data Storytelling</span>
                          </div>
                        </div>

                        {/* 3D Modeling */}
                        <div className="bg-white/60 border border-white/70 p-2 sm:p-2.5 rounded-2xl flex items-center gap-3 shadow-3xs flex-1 min-h-0">
                          <div className="w-8 h-8 shrink-0 bg-orange-100/60 border border-orange-200/45 rounded-full flex items-center justify-center shadow-3xs">
                            <span className="text-orange-600 text-sm">🎨</span>
                          </div>
                          <div className="flex flex-col min-w-0">
                            <span className="font-extrabold text-[#152352] text-xs sm:text-sm leading-tight">3D Modeling</span>
                            <span className="text-[10px] sm:text-xs text-[#2c3d75] font-bold mt-0.5 leading-none">Mascote Toy Art no Blender</span>
                          </div>
                        </div>

                        {/* Business Intelligence */}
                        <div className="bg-white/60 border border-white/70 p-2 sm:p-2.5 rounded-2xl flex items-center gap-3 shadow-3xs flex-1 min-h-0">
                          <div className="w-8 h-8 shrink-0 bg-blue-100/60 border border-blue-200/45 rounded-full flex items-center justify-center shadow-3xs">
                            <span className="text-blue-600 text-sm">📊</span>
                          </div>
                          <div className="flex flex-col min-w-0">
                            <span className="font-extrabold text-[#152352] text-xs sm:text-sm leading-tight">Business Intelligence</span>
                            <span className="text-[10px] sm:text-xs text-[#2c3d75] font-bold mt-0.5 leading-none">Dashboard no Tableau</span>
                          </div>
                        </div>

                        {/* Coding */}
                        <div className="bg-white/60 border border-white/70 p-2 sm:p-2.5 rounded-2xl flex items-center gap-3 shadow-3xs flex-1 min-h-0">
                          <div className="w-8 h-8 shrink-0 bg-purple-100/60 border border-purple-200/45 rounded-full flex items-center justify-center shadow-3xs">
                            <span className="text-purple-600 text-sm">💻</span>
                          </div>
                          <div className="flex flex-col min-w-0">
                            <span className="font-extrabold text-[#152352] text-xs sm:text-sm leading-tight">Coding</span>
                            <span className="text-[10px] sm:text-xs text-[#2c3d75] font-bold mt-0.5 leading-none">TypeScript/HTML</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* 5. FONTES DOS DADOS ECONÔMICOS */}
                  <div className="bg-[#b3b7d6] border border-white/80 rounded-[2.2rem] p-4 lg:p-5 flex flex-col justify-between shadow-xs transition-all duration-300 hover:border-white hover:shadow-md flex-1 min-h-0">
                    <div className="min-h-0 flex flex-col h-full justify-between">
                      <div>
                        <h4 className="text-[#152352] font-black text-sm lg:text-base xl:text-lg tracking-wider uppercase mb-1.5 select-none">
                          3. FONTES DOS DADOS ECONÔMICOS
                        </h4>
                        <div className="text-[#1c2c56] text-xs sm:text-sm leading-relaxed font-bold space-y-2 md:space-y-3 max-h-[180px] lg:max-h-[220px] overflow-y-auto pr-1">
                          <p>
                            • <span className="text-[#152352] font-black">IBGE</span>. Explica: Inflação. Rio de Janeiro: IBGE, 2026. Disponível em:{' '}
                            <a 
                              href="https://www.ibge.gov.br/explica/inflacao.php" 
                              target="_blank" 
                              rel="noopener noreferrer" 
                              className="underline hover:text-white transition-colors"
                            >
                              ibge.gov.br/explica/inflacao.php
                            </a>
                            . Acesso em: 16/06/2026.
                          </p>
                          <p>
                            • <span className="text-[#152352] font-black">IPEA</span>. Ipeadata: Macroeconômico. Regional. Produto Interno Bruto (PIB) estadual. Brasília: IPEA, 2026. Disponível em:{' '}
                            <a 
                              href="http://www.ipeadata.gov.br" 
                              target="_blank" 
                              rel="noopener noreferrer" 
                              className="underline hover:text-white transition-colors"
                            >
                              ipeadata.gov.br
                            </a>
                            . Acesso em: 16/06/2026.
                          </p>
                          <p>
                            • Link adicional de referência:{' '}
                            <a 
                              href="https://www.ibge.gov.br/explica/inflacao.php" 
                              target="_blank" 
                              rel="noopener noreferrer" 
                              className="underline hover:text-white transition-colors break-all"
                            >
                              https://www.ibge.gov.br/explica/inflacao.php
                            </a>
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Linha de ícones inferiores */}
                    <div className="flex gap-2.5 items-center mt-3 select-none">
                      {/* Ícone do mapa */}
                      <div className="p-1.5 bg-white/70 border border-white/90 rounded-lg text-[#152352] shadow-3xs">
                        <svg className="w-4.5 h-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                        </svg>
                      </div>
                      {/* Ícone de gráfico de barras */}
                      <div className="p-1.5 bg-white/70 border border-white/90 rounded-lg text-[#152352] shadow-3xs">
                        <svg className="w-4.5 h-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M7 12l3-3 3 3 4-4M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                        </svg>
                      </div>
                      {/* Ícone de cédula de dinheiro */}
                      <div className="p-1.5 bg-white/70 border border-white/90 rounded-lg text-[#152352] shadow-3xs">
                        <svg className="w-4.5 h-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 114 0z" />
                        </svg>
                      </div>
                    </div>
                  </div>

                </div>

              </div>

            </div>

          </motion.div>
        )}
      </AnimatePresence>

      </div>
    </div>
  );
}
