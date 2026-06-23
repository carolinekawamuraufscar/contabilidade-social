export interface GlossaryTerm {
  term: string;
  category: 'Produção' | 'Renda' | 'Governo' | 'Setor Externo';
  definition: string;
  formula?: string;
  example: string;
}

export interface QuizQuestion {
  question: string;
  options: string[];
  correctAnswerIndex: number;
  explanation: string;
}

export interface ReignsCard {
  id: string;
  characterName: string;
  characterTitle: string;
  characterImage: string;
  speech: string;
  leftText: string;
  leftSubtext: string;
  leftDelta: {
    pib: number;
    inflacao: number;
    bemEstar: number;
    contasPublicas: number;
  };
  rightText: string;
  rightSubtext: string;
  rightDelta: {
    pib: number;
    inflacao: number;
    bemEstar: number;
    contasPublicas: number;
  };
}

export const REIGNS_CARDS: ReignsCard[] = [
  {
    id: "consumo_impostos",
    characterName: "Líder Sindical dos Trabalhadores",
    characterTitle: "Renda & Consumo das Famílias",
    characterImage: "workers",
    speech: "Ministro(a), o custo de vida está altíssimo e o salário da população não acompanhou. Se reduzíssemos os impostos sobre a renda ou alimentos, o povo poderia consumir mais! O que acha?",
    leftText: "NEGAR",
    leftSubtext: "A arrecadação do governo continua e o consumo segue em mesmo nível; porém, o governo perde popularidade, no que impacta negativamente no Bem Estar.",
    leftDelta: { pib: 0, inflacao: 0, bemEstar: -5, contasPublicas: 5 },
    rightText: "ACEITAR",
    rightSubtext: "Com a diminuição dos impostos, a renda geral aumenta e por consequência, seu consumo, o que impacta positivamente o PIB; porém, há menos arrecadação para o governo, que impacta as Contas Públicas negativamente.",
    rightDelta: { pib: 5, inflacao: 0, bemEstar: 20, contasPublicas: -20 }
  },
  {
    id: "investimento_juros",
    characterName: "Representante da Associação Brasileira da Infraestrutura e Indústrias de Base",
    characterTitle: "Setor de Infraestrutura & Indústria",
    characterImage: "central_bank",
    speech: "Ministro(a), as taxas de juros básicas definidas pelo Banco Central estão prejudicando os empréstimos dos empresários! Precisamos pressionar para que sejam diminuídas e os bancos públicos subsidiem o crédito. Você concorda?",
    leftText: "NEGAR",
    leftSubtext: "Mantém a taxa de juros, mas o investimento é desestimulado, o que impacta negativamente no PIB, além do Bem Estar reduzir por menos empregos; porém, a Inflação diminui, pois com a demanda mais esfriada, os preços se controlam.",
    leftDelta: { pib: -5, inflacao: -5, bemEstar: -5, contasPublicas: 0 },
    rightText: "ACEITAR",
    rightSubtext: "Reduz a taxa de juros, então a taxa de investimento aumenta - pois o custo do capital cai e é ampliada a capacidade produtiva - e além do PIB ser impactado positivamente, o Bem estar também sobe por causa do aumento de empregos; porém, a Inflação aumenta e as Contas Públicas são impactadas negativamente.",
    rightDelta: { pib: 5, inflacao: 5, bemEstar: 5, contasPublicas: -20 }
  },
  {
    id: "gastos_educacao",
    characterName: "Reitor da Universidade de São Carlos (UFSCAR)",
    characterTitle: "Ensino Superior & Pesquisa Pública",
    characterImage: "social",
    speech: "A educação é um motor fundamental na economia, Ministro(a). As universidades precisam de mais verbas para a pesquisa, para pagamento dos servidores e garantir bolsas de permanência estudantil! Está de acordo?",
    leftText: "NEGAR",
    leftSubtext: "O governo mantém os gastos, e o PIB estagna, mantendo a Inflação controlada; porém, há mais desempregos e mão de obra qualificada para as empresas.",
    leftDelta: { pib: 0, inflacao: -5, bemEstar: -20, contasPublicas: 5 },
    rightText: "ACEITAR",
    rightSubtext: "Os gastos do governo sobem, o que aumenta o PIB no curto prazo, e o Bem Estar também aumenta, pela maior geração de empregos e tecnologia para o longo prazo; porém, as Contas Públicas sofrem impacto negativo, e aumenta a Inflação.",
    rightDelta: { pib: 5, inflacao: 5, bemEstar: 20, contasPublicas: -20 }
  },
  {
    id: "tarifas_importacao",
    characterName: "Representante da Confederação Nacional da Indústria (CNI)",
    characterTitle: "Indústria de Bens de Consumo",
    characterImage: "industry",
    speech: "Ministro(a), os preços dos produtos vindos do exterior estão barateados, e nossa produção não tem chance de competir. Precisamos elevar as tarifas de importação para proteger nossa indústria nacional! Aceita essa proposta?",
    leftText: "NEGAR",
    leftSubtext: "Mantém o livre mercado, e a Inflação se mantém controlada; porém o emprego cai com a redução da produção, portanto o Bem Estar diminui, além de menor arrecadação nas Contas Públicas e menor PIB.",
    leftDelta: { pib: -5, inflacao: -5, bemEstar: -20, contasPublicas: -5 },
    rightText: "ACEITAR",
    rightSubtext: "A importação de produtos cai, fazendo com que a balança comercial se torne mais positiva e impactando positivamente no PIB. O consumo das famílias se volta mais aos produtos nacionais, aumentando os empregos e consequentemente, aumenta o Bem Estar. Além disso, as Contas Públicas recebem mais arrecadação; porém a Inflação sobe por causa da menor concorrência.",
    rightDelta: { pib: 5, inflacao: 20, bemEstar: 5, contasPublicas: 20 }
  }
];


export const GLOSSARY_TERMS: GlossaryTerm[] = [
  {
    term: 'PIB (Produto Interno Bruto)',
    category: 'Produção',
    definition: 'Soma de todos os bens e serviços finais produzidos em uma determinada região geográfica dentro de um período de tempo (geralmente trimestral ou anual).',
    formula: 'PIB = C + I + G + (X - M)',
    example: 'Quando você consome uma pizza, investe em uma nova máquina para sua padaria ou o governo constrói uma estrada, todos esses valores são computados no PIB.'
  },
  {
    term: 'PNB (Produto Nacional Bruto)',
    category: 'Renda',
    definition: 'Soma do PIB com os ingressos líquidos de renda vindos do exterior, deduzidos os pagamentos de renda enviados para o exterior.',
    formula: 'PNB = PIB + Renda Recebida de Fora - Renda Enviada para Fora',
    example: 'A lucro enviado por uma multinacional sediada no Brasil para sua matriz estrangeira é subtraído do nosso PNB, enquanto o salário enviado por um engenheiro brasileiro trabalhando nos EUA para sua família é somado.'
  },
  {
    term: 'VAB (Valor Adicionado Bruto)',
    category: 'Produção',
    definition: 'O valor que a atividade de produção adiciona aos insumos (bens intermediários) consumidos no processo. Ele mede a real contribuição de cada setor produtivo.',
    formula: 'VAB = Valor Bruto da Produção (VBP) - Consumo Intermediário (CI)',
    example: 'Se uma montadora compra aço por R$10.000 e pneus por R$2.000 (bens intermediários) e vende o carro por R$25.000 (VBP), o VAB gerado é de R$13.000.'
  },
  {
    term: 'Deflator do PIB',
    category: 'Produção',
    definition: 'Uma medida de nível de preços de todos os bens e serviços finais produzidos internamente na economia. Diferente do IPCA, ele não inclui produtos importados.',
    formula: 'Deflator = (PIB Nominal / PIB Real) * 100',
    example: 'Se o PIB Nominal cresceu 10% devido puramente à alta de preços generalizada, mas a produção física continuou igual (PIB Real estável), o Deflator aumenta para mostrar a inflação implícita.'
  },
  {
    term: 'Déficit Público',
    category: 'Governo',
    definition: 'Ocorre quando o total das despesas realizadas pelo setor público é maior do que as suas receitas globais de arrecadação fiscal (como impostos) no mesmo período.',
    formula: 'Déficit = Gastos (G) - Receitas de Impostos (T)',
    example: 'Se o governo da União arrecada R$100 bilhões em impostos mas gasta R$120 bilhões com previdência, infraestrutura e folha de pagamento, o déficit é de R$20 bilhões.'
  },
  {
    term: 'Superávit Primário',
    category: 'Governo',
    definition: 'A diferença positiva entre as receitas e as despesas do setor público, desconsiderando o pagamento de juros da dívida pública.',
    formula: 'Resultado Primário = Receitas Não-Financeiras - Despesas Não-Financeiras',
    example: 'Fazer superávit primário significa que o governo economizou recursos de suas atividades essenciais para honrar parte dos juros da dívida contraída em anos anteriores.'
  },
  {
    term: 'Balança Comercial',
    category: 'Setor Externo',
    definition: 'O registro contábil de todas as exportações e importações de mercadorias físicas realizadas por um país com o resto do mundo.',
    formula: 'Saldo Comercial = Exportações (X) - Importações (M)',
    example: 'Se o Brasil exportar R$50 bilhões em soja e minério de ferro e importar R$40 bilhões em computadores e defensivos agrícolas, haverá um superávit comercial de R$10 bilhões.'
  }
];

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    question: 'Pela Ótica da Despesa nas Contas Nacionais, qual das seguintes alternativas representa a equação fundamental da demanda agregada?',
    options: [
      'PIB = C + I + G + (X - M)',
      'PIB = Salários + Lucros + Juros + Aluguéis',
      'PIB = Valor de Produção - Impostos + Subsídios',
      'PIB = Consumo + Poupança - Importações'
    ],
    correctAnswerIndex: 0,
    explanation: 'A ótica da despesa quantifica o PIB como os gastos dos agentes econômicos: Consumo das famílias (C), Investimento privado (I), Gastos do governo (G) e as Exportações Líquidas (Exportações X menos Importações M).'
  },
  {
    question: 'Qual a diferença principal entre o Produto Interno Bruto (PIB) e o Produto Nacional Bruto (PNB)?',
    options: [
      'O PIB é tributado, o PNB não possui impostos embutidos.',
      'O PIB considera o critério de territorialidade física, enquanto o PNB considera quem é o proprietário dos fatores de produção (nacionalidade).',
      'O PIB mede apenas bens industriais e o PNB mede os serviços.',
      'Não há diferença técnica, ambos são sinônimos perfeitos.'
    ],
    correctAnswerIndex: 1,
    explanation: 'O PIB mede o que é gerado dentro dos limites físicos do país. O PNB ajusta esse valor somando a renda obtida por brasileiros fora do país e deduzindo a renda que estrangeiros geram aqui dentro e enviam para fora.'
  },
  {
    question: 'Para evitar o problema econômico da "dupla contagem" ao somar o produto de uma nação, o que se deve calcular?',
    options: [
      'A soma apenas dos impostos coletados nas vendas.',
      'O valor adicionado bruto (VAB) de cada etapa de produção.',
      'O valor bruto de todas as transações, incluindo insumos.',
      'A despesa com transportes de mercadorias secundárias.'
    ],
    correctAnswerIndex: 1,
    explanation: 'A dupla contagem ocorre se somarmos a farinha vendida pelo moinho ao padeiro e também o pão final vendido ao consumidor. Devemos somar apenas o valor adicionado (VAB) por cada agente em sua respectiva etapa.'
  },
  {
    question: 'O Resultado Primário do Governo refere-se:',
    options: [
      'Ao orçamento da educação básica e ensino fundamental.',
      'À diferença de arrecadação tributária antes e depois do reajuste salarial.',
      'À apuração de receitas menos despesas, descartando o pagamento de juros da dívida.',
      'Ao saldo positivo gerado exclusivamente pelo comércio de commodities estatais.'
    ],
    correctAnswerIndex: 2,
    explanation: 'Dizemos resultado "primário" pois foca no dia a dia governamental (saúde, segurança, infraestrutura) contra impostos, deixando os gastos de refinanciamento de dívida (juros nominativos) em outra conta paralela.'
  },
  {
    question: 'Se o PIB Nominal cresce 8% em um ano mas o Deflator de Preços reportar uma inflação implícita de 5%, qual foi o crescimento do PIB Real?',
    options: [
      'Aproximadamente 3%',
      'Exatos 13%',
      'Menos de 0.5%',
      'O PIB Real não pode ser calculado sem conhecer os juros domésticos.'
    ],
    correctAnswerIndex: 0,
    explanation: 'O crescimento real subtrai o efeito monetário puro (inflação) da variação do PIB nominal. Portanto, descontando os 5% da inflação dos 8% de crescimento nominal, sobra cerca de 3% de crescimento físico real.'
  }
];
