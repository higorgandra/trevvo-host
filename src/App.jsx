{/* Versão: 1.2.0 */}
import React, { useState, useEffect } from 'react';
import {
  Server, 
  Globe, 
  ShieldCheck, 
  Cpu, 
  Headphones, 
  Menu, 
  X, 
  ChevronDown, 
  ChevronLeft,
  ChevronRight,
  ChevronUp, 
  Cloud, 
  Zap,
  CheckCircle,
  RotateCw,
  Award
} from 'lucide-react';
import { 
  Clock, FileText, CreditCard, AlertTriangle, Mail, Shuffle, Users, HelpCircle 
} from 'lucide-react';
import { Link } from 'react-router-dom';

// --- Componentes de UI Reutilizáveis ---

const Section = ({ children, id, className = "" }) => (
  <section id={id} className={`py-16 md:py-24 px-4 ${className}`}>
    <div className="max-w-7xl mx-auto">
      {children}
    </div>
  </section>
);

const Button = ({ children, variant = 'primary', className = "", onClick }) => {
  // Ajuste para hover e sombras usando a cor personalizada
  const baseStyle = "px-6 py-3 rounded-lg font-bold transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-1";
  const variants = {
    // Texto branco com sombra de texto para garantir leitura no verde neon
    primary: "bg-[#4CD91E] text-white hover:brightness-110 shadow-green-900/20",
    secondary: "bg-white text-[#0A1F04] border border-gray-200 hover:bg-gray-50",
    outline: "border-2 border-white text-white hover:bg-white hover:text-[#0A1F04]"
  };
  
  return (
    <button onClick={onClick} className={`${baseStyle} ${variants[variant]} ${className}`}>
      {children}
    </button>
  );
};

const Badge = ({ children }) => (
  <span className="inline-block bg-[#4CD91E]/20 text-[#2a850e] text-xs font-bold px-2 py-1 rounded mb-2">
    {children}
  </span>
);

// --- Componentes Principais ---

export default function App() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [selectedVpsPlan, setSelectedVpsPlan] = useState('Full-Range');
  const [selectedServiceIndex, setSelectedServiceIndex] = useState(0);
  const [selectedHostingPlan, setSelectedHostingPlan] = useState('Super');
  const [selectedResellerCycle, setSelectedResellerCycle] = useState('mensal');
  const [resellerDropdownOpen, setResellerDropdownOpen] = useState(false);
  const [selectedFaq, setSelectedFaq] = useState(0);
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      // Define se o fundo da navbar deve ser branco
      setIsScrolled(currentScrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (mobileMenuOpen) {
      // Adiciona a classe para esconder o overflow do body
      document.body.classList.add('overflow-hidden');
    }

    // Função de limpeza: remove a classe quando o componente é desmontado ou o estado muda
    return () => {
      document.body.classList.remove('overflow-hidden');
    };
  }, [mobileMenuOpen]);

  const scrollToSection = (id) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    const navbar = document.getElementById('main-navbar');
    if (element) {
      const navbarHeight = navbar ? navbar.offsetHeight : 0;
      const elementPosition = element.getBoundingClientRect().top + window.scrollY;
      const offsetPosition = elementPosition - navbarHeight;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  const vpsPlans = [
    {
      id: 'Smart-Web',
      title: "Smart-Web",
      price: "29,90",
      features: [
        "Até 16GB de RAM",
        "Até 8 Cores",
        "400GB HD Raid 10",
        "Até 3 IP's (IPV4)",
        "Proteção DDoS Grátis"
      ],
      description: "Melhor custo x benefício para serviços WEB e sites.",
      highlight: true,
      tag: "Custo-Benefício"
    },
    {
      id: 'Full-Range',
      title: "Full-Range",
      price: "34,90",
      features: [
        "Até 12GB RAM",
        "Até 10 Cores (Dedicados)",
        "480GB HD",
        "Até 3 IP's (IPV4)",
        "Escalabilidade Garantida"
      ],
      description: "Recursos robustos para qualquer atividade pesada.",
      highlight: true,
      tag: "Mais Vendido"
    },
    {
      id: 'Windows Server',
      title: "Windows Server",
      price: "30,90",
      features: ["Até 32GB de RAM", "Até 180GB HD", "Até 3 IP's (IPV4)", "Windows Server OS", "Desempenho Superior"],
      description: "Facilidades do Windows com custo reduzido.",
      highlight: true,
      tag: "Para Windows"
    }
  ];

  const hostingPlans = [
    {
      id: 'PRO',
      name: 'Plano PRO',
      price: '14,90',
      features: [
        { value: '5GB', label: 'Espaço para o site' },
        { value: '100GB', label: 'Transferência Mensal' },
        { value: 'ILIMITADO', label: 'Contas de email, subdomínio e Banco de Dados' }
      ],
      highlight: false
    },
    {
      id: 'Super',
      name: 'Plano Super',
      price: '17,90',
      features: [
        { value: '10GB', label: 'Espaço para o site' },
        { value: '200GB', label: 'Transferência Mensal' },
        { value: 'ILIMITADO', label: 'Contas de email, subdomínio e Banco de Dados' }
      ],
      highlight: true
    },
    {
      id: 'Mega',
      name: 'Plano Mega',
      price: '22,90',
      features: [
        { value: 'ILIMITADO', label: 'Espaço para o site' },
        { value: 'ILIMITADO', label: 'Transferência Mensal' },
        { value: 'ILIMITADO', label: 'Contas de email, subdomínio e Banco de Dados' }
      ],
      highlight: false
    }
  ];

  // Para facilitar o acesso ao plano de hospedagem selecionado
  const selectedHostingPlanData = hostingPlans.find(p => p.id === selectedHostingPlan);

  const servicesData = [
    {
      icon: <Cloud size={40} />,
      title: "Revenda de Hospedagem",
      desc: "Monte sua própria empresa de hospedagem com nossa infraestrutura white-label."
    },
    {
      icon: <Server size={40} />,
      title: "Servidores VPS",
      desc: "Plataformas isoladas para jogos, sistemas e aplicações pesadas."
    },
    {
      icon: <Globe size={40} />,
      title: "Hospedagem de Sites",
      desc: "Ambiente seguro, cPanel e tudo que seu site precisa para rodar liso."
    },
    {
      icon: <ShieldCheck size={40} />,
      title: "Registro de Domínios",
      desc: "Garanta o endereço da sua marca na internet agora mesmo."
    }
  ];

  const handleNextService = () => {
    setSelectedServiceIndex((prevIndex) => (prevIndex + 1) % servicesData.length);
  };

  const handlePrevService = () => {
    setSelectedServiceIndex((prevIndex) => (prevIndex - 1 + servicesData.length) % servicesData.length);
  };

  // Para facilitar o acesso ao serviço selecionado
  const selectedService = servicesData[selectedServiceIndex];

  const resellerCycles = {
    mensal: {
      id: 'mensal',
      name: '1 mês',
      priceInt: '49',
      priceDec: '90',
      savings: 'Black Friday',
      renewalInfo: 'Renovação por R$49,90/mês. Cancele quando quiser.',
      bonus: 'Quer um domínio grátis? Escolha um plano de 12 meses ou mais.'
    },
    trimestral: {
        id: 'trimestral',
        name: '3 meses',
        priceInt: '44',
        priceDec: '91',
        oldPrice: '49,90',
        savings: 'R$14,97',
        renewalInfo: 'Renovação por R$49,90/mês. Cancele quando quiser.',
        bonus: 'Ótimas notícias! Seu domínio GRÁTIS está incluído neste pedido.'
    },
    semestral: {
        id: 'semestral',
        name: '6 meses',
        priceInt: '42',
        priceDec: '42',
        oldPrice: '49,90',
        savings: 'R$44,88',
        renewalInfo: 'Renovação por R$49,90/mês. Cancele quando quiser.',
        bonus: 'Ótimas notícias! Seu domínio GRÁTIS está incluído neste pedido.'
    },
    anual: {
        id: 'anual',
        name: '1 ano',
        priceInt: '39',
        priceDec: '92',
        oldPrice: '49,90',
        savings: 'R$119,76',
        renewalInfo: 'Renovação por R$49,90/mês. Cancele quando quiser.',
        bonus: 'Ótimas notícias! Seu domínio GRÁTIS + 2 meses GRÁTIS estão incluídos neste pedido.'
    }
  };

  const selectedCycleData = resellerCycles[selectedResellerCycle];

  const faqData = [
    {
      icon: <Clock size={24} />,
      question: "Após o pagamento do boleto, quanto tempo leva para o meu pedido ser concluído?",
      answer: "A compensação de boletos bancários pode levar até 48 horas úteis. Assim que o pagamento for confirmado em nosso sistema, seu serviço será ativado automaticamente."
    },
    {
      icon: <FileText size={24} />,
      question: "Como emitir uma 2ª via da fatura?",
      answer: "Você pode emitir a segunda via de sua fatura a qualquer momento através da sua 'Área do Cliente', na seção 'Faturas'."
    },
    {
      icon: <CreditCard size={24} />,
      question: "Quais meios de pagamento são aceitos pela Trevvo?",
      answer: "Aceitamos pagamentos via boleto bancário, transferência e PIX. Na 'Área do Cliente', você pode escolher a forma de pagamento que preferir ao finalizar um pedido ou pagar uma fatura."
    },
    {
      icon: <AlertTriangle size={24} />,
      question: "Quanto tempo após o vencimento de minha fatura o meu serviço será bloqueado?",
      answer: "O serviço é suspenso 5 dias após a data de vencimento. Após 15 dias de vencimento, o serviço é cancelado e os arquivos são removidos permanentemente."
    },
    {
      icon: <Mail size={24} />,
      question: "Como criar uma nova conta de e-mail pelo painel de controle?",
      answer: "Acesse seu painel cPanel, vá para a seção 'Contas de E-mail', preencha os dados solicitados (endereço de e-mail, senha) e clique em 'Criar Conta'."
    },
    {
      icon: <Shuffle size={24} />,
      question: "Como transferir meu site para a Trevvo?",
      answer: "Nossa equipe de suporte pode auxiliar na migração do seu site. Abra um ticket de suporte em sua 'Área do Cliente' com os dados de acesso do seu provedor antigo para iniciarmos o processo."
    },
    {
      icon: <Users size={24} />,
      question: "O que é uma revenda de hospedagem?",
      answer: "É um serviço que permite que você crie e gerencie múltiplas contas de hospedagem de sites para seus próprios clientes, utilizando nossa infraestrutura. É ideal para agências e desenvolvedores."
    },
    {
      icon: <HelpCircle size={24} />,
      question: "Qual a diferença entre Domínio e Hospedagem?",
      answer: "O Domínio é o endereço do seu site na internet (ex: seusite.com). A Hospedagem é o serviço que armazena os arquivos do seu site e os torna acessíveis online. Você precisa de ambos para ter um site no ar."
    }
  ];

  return (
    <>
      {/* --- Navbar --- (Movida para fora do container principal para evitar problemas de overflow) */}
      <nav id="main-navbar" className={`fixed w-full z-50 transition-all duration-300 
        ${isScrolled ? 'bg-white shadow-md py-3' : 'bg-transparent py-5'}
      `}>
        <div className="max-w-7xl mx-auto px-4 flex justify-between items-center">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => scrollToSection('hero')}>
            <div className="w-10 h-10 bg-[#4CD91E] rounded-lg flex items-center justify-center text-white shadow-lg shadow-green-500/30">
              <Server size={24} />
            </div>
            <span className={`text-2xl font-bold ${isScrolled ? 'text-[#0A1F04]' : 'text-white'}`}>
              Trevvo<span className="text-[#4CD91E]">Host</span>
            </span>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-8">
            {['Início', 'Registre', 'Hospedagem', 'Revenda', 'VPS', 'Ajuda'].map((item) => (
              <button 
                key={item} 
                onClick={() => scrollToSection(item.toLowerCase() === 'início' ? 'hero' : (item.toLowerCase() === 'ajuda' ? 'faq' : item.toLowerCase()))}
                className={`font-medium hover:text-[#4CD91E] transition-colors ${isScrolled ? 'text-gray-700' : 'text-gray-100'}`}
              >
                {item}
              </button>
            ))}
            <Link 
              to="/login"
              className="bg-[#4CD91E] text-white px-5 py-2 rounded-full font-medium hover:brightness-110 transition-all shadow-lg shadow-green-500/20"
            >
              Área do Cliente
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-4">
            <Link to="/login" className="bg-[#4CD91E] text-white px-4 py-2 rounded-full font-medium hover:brightness-110 transition-all shadow-md shadow-green-500/20">
              Entrar
            </Link>
            <button onClick={() => setMobileMenuOpen(true)} className={isScrolled ? 'text-[#0A1F04]' : 'text-white'}>
              <Menu size={28} />
            </button>
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        {mobileMenuOpen && (
          <div className="md:hidden fixed inset-0 bg-white z-50 flex flex-col items-center justify-center space-y-8">
            {/* Botão de Fechar (dentro do menu) */}
            <button 
              onClick={() => setMobileMenuOpen(false)} 
              className="absolute top-5 right-4 text-gray-800"
            >
              <X size={32} />
            </button>

            {['Início', 'Registre', 'Hospedagem', 'Revenda', 'VPS', 'Ajuda'].map((item) => (
              <button 
                key={item}
                onClick={() => scrollToSection(item.toLowerCase() === 'início' ? 'hero' : (item.toLowerCase() === 'ajuda' ? 'faq' : item.toLowerCase()))}
                className="text-gray-800 font-semibold text-2xl py-2 w-full text-center hover:text-[#4CD91E] transition-colors"
              >
                {item}
              </button>
            ))}
          </div>
        )}
      </nav>

      <div className="font-sans text-gray-800 bg-gray-50 min-h-screen">

      {/* --- Hero Section --- */}
      {/* Fundo alterado para um tom de verde muito escuro (quase preto) para contraste com o neon */}
      <header id="hero" className="relative bg-[#051402] text-white min-h-screen flex items-center pt-20 overflow-x-hidden">
        {/* Abstract Background Elements */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 opacity-20 pointer-events-none">
          <div className="absolute top-[-10%] right-[-5%] w-96 h-96 bg-[#4CD91E] rounded-full blur-3xl"></div>
          <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-green-800 rounded-full blur-3xl"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-2 gap-12 items-center relative z-10">
          <div className="space-y-6 animate-fade-in-up">
            <h1 className="text-4xl md:text-6xl font-extrabold leading-tight">
              Hospedagem, Revenda e <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#4CD91E] to-emerald-400">
                Servidores VPS
              </span>
            </h1>
            <p className="text-lg md:text-xl text-green-100 max-w-lg">
              Encontre a solução ideal para seu projeto com nossa variada gama de serviços em alta tecnologia e suporte 24/7.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button variant="primary" onClick={() => scrollToSection('vps')}>
                Ver Planos VPS
              </Button>
              <Button variant="outline" onClick={() => scrollToSection('revenda')}>
                Conhecer Revenda
              </Button>
            </div>
            <div className="flex items-center gap-4 pt-6 text-sm text-green-200">
              <div className="flex items-center gap-1"><CheckCircle size={16} className="text-[#4CD91E]"/> Ativação Rápida</div>
              <div className="flex items-center gap-1"><CheckCircle size={16} className="text-[#4CD91E]"/> Suporte BR</div>
              <div className="flex items-center gap-1"><CheckCircle size={16} className="text-[#4CD91E]"/> Uptime 99.9%</div>
            </div>
          </div>
          
          {/* Hero Illustration */}
          <div className="hidden md:block relative">
            <div className="relative bg-black/30 backdrop-blur-sm border border-[#4CD91E]/30 p-8 rounded-2xl shadow-2xl transform rotate-2 hover:rotate-0 transition-all duration-500">
              <div className="flex justify-between items-center mb-6 border-b border-white/10 pb-4">
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                  <div className="w-3 h-3 rounded-full bg-[#4CD91E]"></div>
                </div>
                <div className="text-xs text-green-200 font-mono">root@trevvo-vps:~#</div>
              </div>
              <div className="space-y-3 font-mono text-sm text-[#4CD91E]">
                <p>$ apt-get update</p>
                <p className="text-white/80">Hit:1 http://trevvo.mirror/ubuntu focal InRelease</p>
                <p>$ status check --all</p>
                <div className="grid grid-cols-2 gap-4 mt-4">
                   <div className="bg-black/60 p-3 rounded border border-[#4CD91E]/20">
                      <p className="text-gray-400 text-xs">CPU Usage</p>
                      <div className="w-full bg-gray-700 h-1 mt-2 rounded"><div className="bg-[#4CD91E] h-1 w-[20%] rounded"></div></div>
                   </div>
                   <div className="bg-black/60 p-3 rounded border border-[#4CD91E]/20">
                      <p className="text-gray-400 text-xs">Memory</p>
                      <div className="w-full bg-gray-700 h-1 mt-2 rounded"><div className="bg-emerald-500 h-1 w-[45%] rounded"></div></div>
                   </div>
                </div>
                <p className="animate-pulse">$ _</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* --- Domain Search Bar (New) --- */}
      <section id="registre" className="bg-white py-16 md:py-24 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-[#0A1F04] mb-4">
              Escolha um domínio e verifique a disponibilidade
            </h2>
            <p className="text-lg text-gray-600">
              Quer ter <span className="font-semibold text-gray-800">seusite.com</span> e seu email <span className="font-semibold text-gray-800">@seusite.com</span>? É simples e rápido.
            </p>
          </div>

          <div className="max-w-3xl mx-auto mt-10">
            <h3 className="text-2xl font-bold text-center text-[#0A1F04] mb-6">
              Registre um novo domínio!
            </h3>
            <form action="#" className="flex flex-col md:flex-row gap-2 md:gap-0">
              <div className="relative flex-grow h-[50px] bg-gray-100 rounded-md md:rounded-r-none border border-gray-300 focus-within:border-[#4CD91E] focus-within:ring-1 focus-within:ring-[#4CD91E] transition-all">
                <input 
                  id="domain" 
                  name="domain"
                  placeholder="Digite o domínio desejado" 
                  required 
                  className="peer w-full h-full border-none bg-transparent p-0 pt-4 text-lg text-gray-800 placeholder-transparent focus:outline-none focus-visible:outline-none px-4" 
                />
                <label 
                  htmlFor="domain" 
                  className="pointer-events-none absolute left-4 select-none text-gray-500 transition-all duration-200 top-1/2 -translate-y-1/2 text-lg peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:text-lg peer-focus:top-1.5 peer-focus:-translate-y-0 peer-focus:text-xs peer-[:not(:placeholder-shown)]:top-1.5 peer-[:not(:placeholder-shown)]:-translate-y-0 peer-[:not(:placeholder-shown)]:text-xs"
                >
                  Digite o domínio desejado
                </label>
              </div>
              <button type="submit" className="h-[50px] bg-[#4CD91E] text-white px-8 rounded-md md:rounded-l-none font-bold hover:brightness-110 transition-all text-lg">
                Buscar
              </button>
            </form>
          </div>

          <div className="max-w-4xl mx-auto mt-12 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="bg-green-50 p-6 rounded-lg border border-green-200">
              <p className="text-xl font-bold text-[#0A1F04]">Dominio.com</p>
              <p className="text-gray-600">Por apenas <span className="font-bold">R$22,80/ano</span></p>
            </div>
            <div className="bg-green-50 p-6 rounded-lg border border-green-200">
              <p className="text-xl font-bold text-[#0A1F04]">Dominio.net</p>
              <p className="text-gray-600">A partir de <span className="font-bold">R$22,80/ano</span></p>
            </div>
            <div className="bg-green-50 p-6 rounded-lg border border-green-200">
              <p className="text-xl font-bold text-[#0A1F04]">Dominio.org</p>
              <p className="text-gray-600">A partir de <span className="font-bold">R$15,99/ano</span></p>
            </div>
          </div>
          <p className="text-center text-gray-600 mt-6">+ proteção de privacidade <span className="font-bold">R$5,00</span></p>
          <p className="text-center text-gray-500 mt-4 max-w-2xl mx-auto">Escolha o tipo de domínio que deseja e o reserve por 1 ano, sendo possível renovar o período de reserva por mais tempo.</p>

          <div className="mt-20">
            <h2 className="text-3xl font-bold text-center text-[#0A1F04] mb-12">Porque registrar um domínio na Trevvo?</h2>
            <div className="bg-green-50 border border-green-200 rounded-2xl p-8 md:p-12 max-w-4xl mx-auto">
              <h3 className="text-2xl font-bold text-[#0A1F04] mb-8">Potencialize sua presença online com um domínio próprio.</h3>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 text-[#4CD91E] bg-white p-3 rounded-full border border-green-100 shadow-sm">
                    <Globe size={24} />
                  </div>
                  <p className="text-gray-700 leading-relaxed">Mantenha sua marca na internet sempre disponível para novos visitantes e ganhe credibilidade no mercado.</p>
                </div>
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 text-[#4CD91E] bg-white p-3 rounded-full border border-green-100 shadow-sm">
                    <Server size={24} />
                  </div>
                  <p className="text-gray-700 leading-relaxed">Gerencie subdomínios (ex: <span className="font-mono">loja.seusite.com</span>) e crie emails profissionais (ex: <span className="font-mono">contato@seusite.com</span>).</p>
                </div>
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 text-[#4CD91E] bg-white p-3 rounded-full border border-green-100 shadow-sm">
                    <ShieldCheck size={24} />
                  </div>
                  <p className="text-gray-700 leading-relaxed">Adquira variações do seu domínio e redirecione todas para seu site principal, evitando que sua marca seja confundida.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- Services Grid --- */}
      <Section id="serviços">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-[#0A1F04]">Nossos Produtos</h2>
          <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
            Da hospedagem básica à infraestrutura robusta de servidores, temos tudo o que você precisa para crescer online.
          </p>
        </div>

        {/* Mobile Carousel */}
        <div className="md:hidden">
          {/* Navegador de Serviços */}
          <div className="flex items-center justify-center gap-4 mb-8">
            <button onClick={handlePrevService} className="p-3 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors">
              <ChevronLeft className="text-gray-600" />
            </button>
            <h3 className="text-xl font-bold text-[#0A1F04] text-center w-64">
              {selectedService.title}
            </h3>
            <button onClick={handleNextService} className="p-3 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors">
              <ChevronRight className="text-gray-600" />
            </button>
          </div>

          {/* Card do Serviço Exibido */}
          <div className="max-w-sm mx-auto">
            <ServiceCard
              key={selectedServiceIndex}
              icon={selectedService.icon}
              title={selectedService.title}
              desc={selectedService.desc}
            />
          </div>
        </div>

        {/* Desktop Grid */}
        <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {servicesData.map((service, index) => (
            <ServiceCard key={index} {...service} />
          ))}
        </div>
      </Section>

      {/* --- Hospedagem de Sites --- */}
      <Section id="hospedagem" className="bg-white">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-[#0A1F04]">Hospedagem de Sites</h2>
          <p className="text-gray-600 mt-4 max-w-2xl mx-auto">Planos com cPanel, suporte e recursos para seu site crescer com estabilidade.</p>
        </div>

        {/* Mobile Tab Selector */}
        <div className="md:hidden mb-8 bg-gray-200 p-1 rounded-lg flex justify-between">
          {hostingPlans.map(plan => (
            <button
              key={plan.id}
              onClick={() => setSelectedHostingPlan(plan.id)}
              className={`w-1/3 py-2 text-sm font-bold rounded-md transition-all duration-300 ${selectedHostingPlan === plan.id ? 'bg-white text-[#0A1F04] shadow' : 'bg-transparent text-gray-600'}`}
            >
              {plan.id}
            </button>
          ))}
        </div>

        {/* Mobile Card Display */}
        <div className="md:hidden">
          <HostingPlanCard {...selectedHostingPlanData} />
        </div>

        {/* Desktop Grid */}
        <div className="hidden md:grid md:grid-cols-3 gap-8">
          {hostingPlans.map(plan => (
            <HostingPlanCard key={plan.id} {...plan} />
          ))}
        </div>

        <div className="mt-8 text-center">
          <p className="text-sm text-gray-600">Os valores mostrados são baseados nos pagamentos até a data de vencimento, que contam com desconto de 10%.</p>
          <p className="text-sm text-gray-600 mt-2">Todos os planos são oferecidos na plataforma <span className="font-bold">Linux</span>.</p>
        </div>

        <div className="mt-8 bg-green-50 p-6 rounded-xl border border-green-100">
          <h4 className="font-bold text-[#0A1F04] mb-4">Em todos os planos você conta com:</h4>
          <div className="grid md:grid-cols-2 gap-4 text-gray-700">
            <ul className="space-y-2">
              <li className="flex items-start"><CheckCircle className="text-[#4CD91E] mr-3 mt-1"/>Suporte Técnico – Resolução rápida de dúvidas e incidentes</li>
              <li className="flex items-start"><CheckCircle className="text-[#4CD91E] mr-3 mt-1"/>Sub-Domínios ilimitados para registro</li>
              <li className="flex items-start"><CheckCircle className="text-[#4CD91E] mr-3 mt-1"/>cPanel – Interface fácil e intuitiva</li>
            </ul>
            <ul className="space-y-2">
              <li className="flex items-start"><CheckCircle className="text-[#4CD91E] mr-3 mt-1"/>Banco MySQL ilimitado</li>
              <li className="flex items-start"><CheckCircle className="text-[#4CD91E] mr-3 mt-1"/>Scripts Prontos – Mais de 250 scripts (Softaculous)</li>
              <li className="flex items-start"><CheckCircle className="text-[#4CD91E] mr-3 mt-1"/>Contas FTP ilimitadas e sem restrições</li>
            </ul>
          </div>
        </div>
      </Section>
      {/* --- VPS Section --- */}
      <Section id="vps">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-[#0A1F04]">Servidores VPS Robustos</h2>
          <p className="text-gray-600 mt-4">
            Ambientes isolados com proteção DDoS Grátis e autonomia total (Root).
          </p>
        </div>

        {/* Mobile Tab Selector */}
        <div className="md:hidden mb-8 bg-gray-200 p-1 rounded-lg flex justify-between">
          {vpsPlans.map(plan => (
            <button
              key={plan.id}
              onClick={() => setSelectedVpsPlan(plan.id)}
              className={`w-1/3 py-2 text-sm font-bold rounded-md transition-all duration-300 ${selectedVpsPlan === plan.id ? 'bg-white text-[#0A1F04] shadow' : 'bg-transparent text-gray-600'}`}
            >
              {plan.title === 'Windows Server' ? 'Windows' : plan.title}
            </button>
          ))}
        </div>

        {/* Mobile Card Display */}
        <div className="md:hidden">
          {vpsPlans.filter(plan => plan.id === selectedVpsPlan).map(plan => (
            <VPSCard key={plan.id} {...plan} />
          ))}
        </div>

        {/* Desktop Grid */}
        <div className="hidden md:grid md:grid-cols-3 gap-8">
          {vpsPlans.map(plan => (
            <VPSCard 
              key={plan.id}
              title={plan.title}
              price={plan.price}
              features={plan.features}
              description={plan.description}
              highlight={plan.highlight}
              tag={plan.tag}
            />
          ))}
        </div>
        
        <div className="mt-12 text-center bg-green-50 rounded-xl p-6 border border-green-100">
          <h4 className="font-bold text-[#0A1F04] flex items-center justify-center gap-2">
            <Headphones size={20}/> Suporte Especializado
          </h4>
          <p className="text-gray-600 mt-2">
            Fazemos a instalação e configuração de software local mediante solicitação (apenas em servidores Linux).
          </p>
        </div>
      </Section>

      {/* --- Revenda Highlight --- */}
      <div id="revenda" className="bg-white py-20 border-y border-gray-200 overflow-x-hidden">
        <div className="max-w-7xl mx-auto px-4 grid lg:grid-cols-2 gap-16 items-center">
          {/* Coluna de Informações */}
          <div className="lg:pr-8">
              <Badge>TOP SELLER</Badge>
              <h2 className="text-3xl md:text-4xl font-bold text-[#0A1F04] mb-6">
                  Revenda de Hospedagem <span className="text-[#4CD91E]">Premium</span>
              </h2>
              <p className="text-gray-600 mb-6 text-lg leading-relaxed">
                  A forma de visualizar a web mudou. Oferecemos uma estrutura especial para as necessidades de uma WEB evoluída, com sistemas inteligentes e escalabilidade.
              </p>
              
              <ul className="space-y-4 mb-8">
                  {[
                      "Recursos Ilimitados (Armazenamento e Tráfego)",
                      "Painel cPanel/WHM + Softaculous",
                      "Suporte Técnico Diferenciado 24/7",
                      "Infraestrutura 100% Cloud",
                      "Suporte Emergencial Dia e Noite"
                  ].map((item, i) => (
                      <li key={i} className="flex items-center text-gray-700">
                          <CheckCircle size={20} className="text-[#4CD91E] mr-3" />
                          {item}
                      </li>
                  ))}
              </ul>
          </div>

          {/* Coluna de Preço e Seleção */}
          <div className="relative">
            <div className="bg-white rounded-2xl shadow-2xl border border-gray-100 p-8">
              <h3 className="text-xl font-bold text-gray-800 mb-4">
                Revenda de Hospedagem Premium
              </h3>
              {/* Novo Seletor de Período */}
              <div className="mb-8">
                <label id="period-label" className="block text-sm font-bold text-gray-600 mb-2">Período</label>
                <div className="relative">
                  <button
                    onClick={() => setResellerDropdownOpen(!resellerDropdownOpen)}
                    className="w-full flex justify-between items-center bg-gray-100 border border-gray-300 rounded-lg py-3 px-4 text-lg font-semibold text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#4CD91E] focus:border-transparent"
                    aria-haspopup="true"
                    aria-expanded={resellerDropdownOpen}
                  >
                    <span>{selectedCycleData.name}</span>
                    <ChevronDown className={`transition-transform duration-300 ${resellerDropdownOpen ? 'rotate-180' : ''}`} />
                  </button>

                  {resellerDropdownOpen && (
                    <div className="absolute top-full left-0 w-full mt-2 bg-white border border-gray-200 rounded-lg shadow-lg z-20 overflow-hidden">
                      {Object.values(resellerCycles).map(cycle => (
                        <button
                          key={cycle.id}
                          onClick={() => {
                            setSelectedResellerCycle(cycle.id);
                            setResellerDropdownOpen(false);
                          }}
                          className={`w-full text-left px-4 py-3 text-lg font-medium transition-colors ${selectedResellerCycle === cycle.id ? 'bg-[#4CD91E] text-white' : 'text-gray-700 hover:bg-gray-100'}`}
                        >
                          {cycle.name}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Pricing Display */}
              <div className="text-center my-8">
                {selectedCycleData.savings && (
                  <div className="inline-block bg-red-100 text-red-600 text-sm font-bold px-3 py-1 rounded-full mb-4">
                    {selectedCycleData.id === 'mensal' ? selectedCycleData.savings : `ECONOMIZE ${selectedCycleData.savings}`}
                  </div>
                )}
                <div className="flex items-baseline justify-center gap-2">
                  <div className="text-5xl font-extrabold text-[#0A1F04]">
                    <span className="align-top text-2xl">R$</span>
                    {selectedCycleData.priceInt}<span className="text-2xl">,{selectedCycleData.priceDec}</span>
                  </div>
                  {selectedCycleData.oldPrice && (
                    <div className="text-2xl text-gray-400 line-through">
                      R${selectedCycleData.oldPrice}
                    </div>
                  )}
                </div>
                <p className="text-gray-500">/mês</p>
              </div>

              {/* Botão e Informações Adicionais */}
              <Button className="w-full shadow-green-200">Contratar Agora</Button>
              <div className="text-xs text-gray-500 mt-4 space-y-1 text-center">
                <p className="flex items-center justify-center gap-1.5">
                  <CheckCircle size={14} className="text-green-500" /> Plataforma Linux
                </p>
                <p className="flex items-center justify-center gap-1.5">
                  <Zap size={14} className="text-green-500" /> Ativação imediata
                </p>
              </div>

              {selectedCycleData.renewalInfo && <p className="text-xs text-gray-500 mt-2 text-center">{selectedCycleData.renewalInfo}</p>}

              {selectedCycleData.bonus && (
                <div className="mt-6 bg-green-50 p-4 rounded-lg border border-green-200 text-center text-sm text-green-800" dangerouslySetInnerHTML={{ __html: selectedCycleData.bonus }}>
                </div>
              )}
            </div>
            {/* Elemento decorativo */}
            <div className="absolute -z-10 top-4 -right-4 w-full h-full bg-[#4CD91E]/10 rounded-2xl hidden lg:block"></div>
          </div>
        </div>
      </div>


      {/* --- 10 Motivos para escolher a TrevvoHost --- */}
      <Section id="motivos" className="bg-[#F0F8FF]">
        <div className="flex flex-col items-center justify-center gap-6">
          <h2 className="text-2xl font-bold md:text-[32px] md:leading-10 text-center text-[#202020] mb-4">Por que escolher a TrevvoHost?</h2>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-4">
            {/* Card 1: Performance */}
            <div className="flex w-full max-w-[364px] flex-col items-start gap-2.5 rounded-2xl bg-white p-6">
              <div className="flex w-full items-center justify-between">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" clipRule="evenodd" d="M17.4317 1.0811C17.1827 1.13032 16.8627 1.3671 16.752 1.58409C16.6277 1.82774 16.6028 2.15142 16.6897 2.39469C16.7885 2.67136 17.0604 2.93872 17.3196 3.01406C17.391 3.03482 17.8283 3.11514 18.2914 3.19254C18.7545 3.26997 19.1364 3.33662 19.1401 3.34065C19.1479 3.34914 13.5841 6.90654 13.548 6.91607C13.5348 6.91958 12.8088 6.08579 11.9346 5.06322C10.0888 2.90418 10.0932 2.9091 9.94644 2.8119C9.72653 2.66625 9.35654 2.61686 9.11068 2.70033C8.94144 2.75778 2.00829 6.32169 1.81692 6.44961C1.297 6.7971 1.23096 7.52212 1.67844 7.9696C1.90668 8.19786 2.24527 8.31069 2.54023 8.25681C2.71956 8.22405 2.6526 8.25738 6.1264 6.47162C7.78651 5.61822 9.15271 4.92076 9.1624 4.92172C9.1721 4.92266 9.93064 5.80343 10.848 6.87897C11.7654 7.9545 12.5778 8.89377 12.6533 8.96622C12.8111 9.11764 12.9822 9.20406 13.188 9.23618C13.3641 9.26363 13.5928 9.23469 13.7376 9.1666C13.7956 9.13934 15.3427 8.15798 17.1755 6.98577C19.0084 5.81358 20.5103 4.8562 20.5131 4.85826C20.5158 4.86033 20.4428 5.30975 20.3508 5.857C20.2537 6.43468 20.1829 6.9275 20.182 7.03199C20.1787 7.41328 20.3997 7.75941 20.7534 7.92698C20.9058 7.99914 20.9327 8.00399 21.18 8.00399C21.432 8.00399 21.4514 8.0003 21.6054 7.92304C21.8698 7.79034 22.0734 7.53714 22.1485 7.24799C22.1639 7.18859 22.3391 6.16259 22.5379 4.96799C22.8868 2.87195 22.8985 2.79026 22.8732 2.63231C22.8087 2.22866 22.5104 1.89825 22.1256 1.80412C21.9275 1.75566 17.6881 1.05592 17.609 1.05863C17.5667 1.06007 17.4869 1.07018 17.4317 1.0811ZM8.16004 7.59537C8.03164 7.6323 2.64751 10.0099 2.50723 10.0916C2.27644 10.226 2.08502 10.5126 2.0392 10.7923C2.00808 10.9823 2.00834 21.1792 2.03947 21.3693C2.10931 21.7958 2.44428 22.1307 2.87076 22.2006C3.07447 22.2339 20.5051 22.2319 20.712 22.1985C21.1271 22.1314 21.4667 21.7921 21.5297 21.3816C21.5447 21.2833 21.5508 19.0168 21.5466 15.084L21.54 8.93999L21.4898 8.81774C21.3304 8.43014 21.0095 8.19458 20.6021 8.16609C20.4853 8.15793 20.3905 8.16635 20.2986 8.19304C20.2252 8.2144 18.9408 8.77269 17.4445 9.43367L14.724 10.6355L13.407 11.3333C12.3799 11.8775 12.0857 12.0238 12.0704 11.9976C12.0597 11.9791 11.394 11.0362 10.5911 9.9021C9.27352 8.04105 9.11851 7.83141 8.99968 7.74957C8.74953 7.57725 8.4281 7.51823 8.16004 7.59537ZM5.71804 10.8533L4.03204 11.5998V15.9039V20.208H5.72404H7.41604V15.156C7.41604 12.3774 7.41333 10.1046 7.41004 10.1054C7.40676 10.1062 6.64533 10.4428 5.71804 10.8533ZM17.856 11.4454L16.188 12.184L16.182 16.196L16.1759 20.208H17.856H19.536V15.456C19.536 12.8424 19.5334 10.7046 19.53 10.7054C19.5267 10.7062 18.7734 11.0392 17.856 11.4454ZM9.43204 15.9792V20.208H11.784H14.136V16.7152C14.136 13.3965 14.134 13.2234 14.094 13.2437C14.071 13.2555 13.6362 13.4853 13.128 13.7543C12.6198 14.0233 12.15 14.2621 12.084 14.2849C11.7393 14.4042 11.261 14.2673 11.0302 13.9834C10.9857 13.9287 10.6177 13.4142 10.2123 12.84C9.80697 12.2658 9.46557 11.7857 9.45367 11.7732C9.44083 11.7597 9.43204 13.4685 9.43204 15.9792Z" fill="#4CD91E"></path></svg>
              </div>
              <div className="flex flex-col items-start gap-1">
                <p className="font-bold text-xl text-[#202020]"><strong>Alta Performance</strong></p>
                <p className="text-base text-[#444]">Nossa infraestrutura é otimizada para oferecer carregamento rápido e estabilidade, assegurando que seus visitantes tenham a melhor experiência de navegação possível.</p>
              </div>
            </div>
            {/* Card 2: Segurança */}
            <div className="flex w-full max-w-[364px] flex-col items-start gap-2.5 rounded-2xl bg-white p-6">
              <div className="flex w-full items-center justify-between">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" clipRule="evenodd" d="M3.437 1C2.09108 1 1 2.09108 1 3.43699V6.54091V20.563C1 21.9089 2.09108 23 3.437 23H20.563C21.909 23 23 21.9089 23 20.563V6.54091V3.43699C23 2.09109 21.909 1 20.563 1H3.437ZM21.2398 5.66083V3.43699C21.2398 3.06318 20.9369 2.76017 20.563 2.76017H3.437C3.0632 2.76017 2.76017 3.06319 2.76017 3.43699V5.66083H21.2398ZM2.76017 7.42099H21.2398V20.563C21.2398 20.9368 20.9369 21.2398 20.563 21.2398H3.437C3.06319 21.2398 2.76017 20.9368 2.76017 20.563V7.42099ZM10.5447 12C10.5447 11.1962 11.1963 10.5447 12 10.5447C12.8037 10.5447 13.4553 11.1962 13.4553 12V12.6768H10.5447V12ZM8.78456 12.7507V12C8.78456 10.2241 10.2242 8.78453 12 8.78453C13.7758 8.78453 15.2155 10.2241 15.2155 12V12.7507C15.8918 12.9599 16.3831 13.5903 16.3831 14.3353V17.4491C16.3831 18.365 15.6406 19.1077 14.7246 19.1077H9.27541C8.35939 19.1077 7.61687 18.365 7.61687 17.4491V14.3353C7.61687 13.5903 8.10821 12.9599 8.78456 12.7507ZM9.37704 17.3475V14.437H14.623V17.3475H9.37704Z" fill="#4CD91E"></path></svg>
              </div>
              <div className="flex flex-col items-start gap-1">
                <p className="font-bold text-xl text-[#202020]"><strong>Segurança Avançada</strong></p>
                <p className="text-base text-[#444]">Conte com ferramentas de segurança avançadas, como proteção DDoS, SSL e backups. Ambiente sempre atualizado e seguro para seus dados.</p>
              </div>
            </div>
            {/* Card 3: Facilidade */}
            <div className="flex w-full max-w-[364px] flex-col items-start gap-2.5 rounded-2xl bg-white p-6">
              <div className="flex w-full items-center justify-between">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" clipRule="evenodd" d="M2.88799 0.827544C1.99274 0.989976 1.21649 1.66219 0.919751 2.532C0.794039 2.9005 0.752951 3.42689 0.831575 3.66173C0.916463 3.91524 1.14312 4.16827 1.38012 4.27414C1.62549 4.38372 1.98842 4.37518 2.22873 4.25417C2.29958 4.21853 2.41555 4.13225 2.48645 4.06246C2.68065 3.87134 2.76549 3.67258 2.79427 3.3414C2.82247 3.0169 3.01699 2.82247 3.34169 2.79427C3.67253 2.76554 3.87137 2.68061 4.06243 2.48647C4.13222 2.41558 4.2185 2.29961 4.25414 2.22876C4.37515 1.98845 4.38369 1.62552 4.27411 1.38014C4.16825 1.14314 3.91521 0.916489 3.6617 0.831601C3.51816 0.783553 3.14138 0.78156 2.88799 0.827544ZM7.77465 0.826801C7.49592 0.929497 7.28496 1.11677 7.16659 1.36651C7.09716 1.51303 7.09197 1.54236 7.09197 1.788C7.09197 2.03405 7.09706 2.06261 7.16669 2.208C7.2491 2.38006 7.41413 2.56078 7.5749 2.65498C7.79385 2.7833 7.79568 2.7834 9.64961 2.78371C11.5486 2.78402 11.5005 2.78758 11.7468 2.62954C12.2826 2.28581 12.371 1.55218 11.9316 1.09613C11.8009 0.960432 11.67 0.878064 11.506 0.828312C11.3418 0.778512 7.90951 0.777145 7.77465 0.826801ZM15.636 0.824041C15.4107 0.898849 15.1774 1.08574 15.0608 1.28479C14.7395 1.8331 15.0332 2.5632 15.6486 2.74598C15.7191 2.76689 15.8206 2.78407 15.8743 2.78414C16.1038 2.78446 16.3063 2.89123 16.4087 3.06581C16.4534 3.14225 16.4789 3.23722 16.5018 3.41354C16.5417 3.72038 16.6268 3.90274 16.8115 4.07746C17.4032 4.63706 18.3714 4.29902 18.4876 3.49219C18.5379 3.14261 18.4418 2.65699 18.2398 2.24059C17.9052 1.551 17.3 1.05629 16.5517 0.860688C16.3056 0.796368 15.7824 0.775417 15.636 0.824041ZM1.48665 7.11374C1.20305 7.22177 0.996695 7.40527 0.878591 7.65451L0.803975 7.812L0.797039 9.588C0.789791 11.4452 0.790775 11.4659 0.894407 11.6742C0.958751 11.8036 1.15958 12.0107 1.29324 12.0856C1.75802 12.3458 2.33988 12.1983 2.62951 11.7469C2.78755 11.5005 2.784 11.5486 2.78369 9.64963C2.78337 7.79571 2.78328 7.79388 2.65495 7.57493C2.56075 7.41415 2.38003 7.24913 2.20797 7.16671C2.06949 7.1004 2.02502 7.0914 1.81197 7.08662C1.6559 7.08314 1.54214 7.09262 1.48665 7.11374ZM17.1922 7.1149C17.0468 7.16263 16.8465 7.29804 16.7439 7.41797C16.5396 7.65665 16.4889 7.86602 16.4889 8.472C16.4889 9.0931 16.543 9.29138 16.7807 9.54274C17.0085 9.78365 17.3286 9.89381 17.6538 9.84317C18.0611 9.77976 18.4044 9.45034 18.4796 9.05074C18.5171 8.85178 18.5099 8.00815 18.4693 7.836C18.4232 7.64066 18.3369 7.4945 18.1798 7.34597C17.9796 7.15661 17.825 7.09505 17.532 7.08797C17.3788 7.08425 17.2559 7.09399 17.1922 7.1149ZM11.856 10.227C11.1497 10.2969 10.5255 10.8025 10.3045 11.484C10.2213 11.7404 10.1996 12.1933 10.2585 12.444C10.2802 12.5364 10.6911 13.7568 11.1716 15.156C11.6522 16.5552 12.396 18.7226 12.8246 19.9725C13.2725 21.2787 13.6424 22.3196 13.6947 22.4205C13.758 22.5424 13.8447 22.6549 13.9788 22.7889C14.2819 23.0915 14.5576 23.2083 14.9674 23.2076C15.3963 23.2069 15.6675 23.094 15.9733 22.7889C16.1201 22.6424 16.1873 22.5527 16.2527 22.416C16.3 22.317 16.6764 21.2586 17.0889 20.064C17.5015 18.8694 17.851 17.8791 17.8655 17.8634C17.8801 17.8477 18.3348 17.6785 18.876 17.4874C21.1038 16.7009 22.2325 16.2931 22.3679 16.2259C22.6669 16.0776 22.8666 15.8996 23.0227 15.6424C23.1465 15.4384 23.188 15.2935 23.2019 15.0166C23.2253 14.549 23.1109 14.2524 22.779 13.9203C22.6328 13.774 22.5227 13.688 22.404 13.6274C22.3116 13.5802 21.3936 13.2584 20.364 12.9122C19.3344 12.5661 17.169 11.8362 15.552 11.2904C13.935 10.7446 12.5472 10.2823 12.468 10.2631C12.2784 10.217 12.0769 10.2052 11.856 10.227ZM12.3637 12.4525C12.4321 12.6476 14.5612 18.846 14.7785 19.4824C14.8788 19.7762 14.9684 20.0084 14.9776 19.9984C14.9868 19.9883 15.2504 19.2402 15.5634 18.336C15.8764 17.4318 16.1598 16.6413 16.1933 16.5793C16.2711 16.4353 16.4351 16.2714 16.5803 16.1923C16.6696 16.1437 18.955 15.3195 19.8679 15.0066C19.9647 14.9735 20.0349 14.9378 20.0239 14.9274C20.013 14.917 18.897 14.5359 17.544 14.0805C16.191 13.625 14.4612 13.0419 13.7001 12.7847L12.3163 12.317L12.3637 12.4525ZM1.51639 14.9655C1.44624 14.9844 1.34227 15.0271 1.28537 15.0605C1.13721 15.1473 0.943943 15.3613 0.868679 15.5219C0.807455 15.6526 0.804047 15.6787 0.805391 16.008C0.806519 16.2871 0.817199 16.3947 0.859319 16.5517C1.06245 17.3088 1.55011 17.9048 2.24057 18.2398C2.65697 18.4418 3.14258 18.538 3.49217 18.4876C4.31844 18.3686 4.64781 17.3492 4.04443 16.7785C3.86757 16.6113 3.70315 16.5395 3.40925 16.5013C3.23702 16.4789 3.14179 16.4532 3.06578 16.4087C2.89121 16.3064 2.78443 16.1038 2.78412 15.8744C2.78393 15.7461 2.72297 15.545 2.6471 15.4223C2.40343 15.0284 1.9554 14.8474 1.51639 14.9655ZM7.90862 16.5147C7.54701 16.5674 7.21877 16.8543 7.11312 17.2102C7.05485 17.4064 7.07561 17.7315 7.15781 17.9101C7.23381 18.0751 7.42826 18.2879 7.58124 18.3734C7.76897 18.4784 7.93509 18.5033 8.45071 18.5036C8.7096 18.5038 8.9796 18.4931 9.05071 18.4797C9.23993 18.444 9.4116 18.3512 9.55706 18.2057C9.71585 18.0469 9.81033 17.8647 9.84314 17.6538C9.92815 17.1079 9.54348 16.5901 8.99378 16.5106C8.80838 16.4838 8.10257 16.4865 7.90862 16.5147Z" fill="#4CD91E"></path></svg>
              </div>
              <div className="flex flex-col items-start gap-1">
                <p className="font-bold text-xl text-[#202020]"><strong>Facilidade de Uso</strong></p>
                <p className="text-base text-[#444]">Nossas interfaces e painéis de controle são fáceis de usar, permitindo que você gerencie seus emails, bancos de dados e arquivos de forma simples e intuitiva.</p>
              </div>
            </div>
            {/* Card 4: Crescimento */}
            <div className="flex w-full max-w-[364px] flex-col items-start gap-2.5 rounded-2xl bg-white p-6">
              <div className="flex w-full items-center justify-between">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" clipRule="evenodd" d="M21.7795 1.69102C21.7795 1.69102 22.0674 1.8766 22.113 1.92129C22.1257 1.93485 22.3118 2.22329 22.3118 2.22329L22.3122 2.22426L22.3132 2.22655L22.3157 2.23252L22.3229 2.25C22.3286 2.26408 22.3362 2.283 22.3453 2.30656C22.3637 2.35368 22.3885 2.41946 22.4177 2.50231C22.4761 2.66786 22.5526 2.90258 22.6309 3.19369C22.7869 3.7738 22.9533 4.58968 22.9937 5.53587C23.0746 7.4308 22.6475 9.90607 20.5651 11.9926C19.7999 12.7837 18.7053 13.5678 17.4989 14.333C18.1887 15.7641 18.2244 17.1897 17.7943 18.5397C17.2925 20.115 16.1805 21.5186 14.9481 22.719C14.7294 22.932 14.4254 23.0335 14.1226 22.9944C13.8197 22.9554 13.5514 22.7802 13.3938 22.5187L10.3563 17.4764L6.52644 13.6466L1.484 10.609C1.22247 10.4515 1.04724 10.1831 1.00821 9.88029C0.969184 9.57748 1.07063 9.27343 1.28366 9.05472C2.48406 7.82231 3.88759 6.71036 5.46298 6.20848C6.81264 5.77852 8.23776 5.81413 9.66859 6.5034C10.4348 5.29683 11.2203 4.20187 12.0102 3.43781C14.0967 1.3554 16.572 0.928242 18.467 1.00915C19.4132 1.04955 20.229 1.21597 20.8091 1.37197C21.1003 1.45026 21.335 1.52672 21.5005 1.58512C21.5834 1.61435 21.6492 1.63915 21.6963 1.6575C21.7198 1.66668 21.7388 1.67425 21.7528 1.67998L21.7703 1.68715L21.7763 1.68965L21.7795 1.69102ZM22.113 1.92129L22.3118 2.22329C22.2105 1.98399 22.0188 1.79231 21.7795 1.69102L22.113 1.92129ZM15.5797 13.1589C15.6339 13.1219 15.6904 13.091 15.7485 13.066C17.2227 12.1664 18.411 11.3446 19.1321 10.5974L19.1446 10.5847C20.7194 9.00986 21.0607 7.14845 20.9955 5.62119C20.9628 4.85534 20.8272 4.18809 20.6995 3.71307C20.6674 3.59385 20.6361 3.4875 20.6073 3.39556C20.5153 3.36678 20.409 3.33542 20.2898 3.30336C19.8148 3.17562 19.1475 3.04003 18.3816 3.00733C16.8544 2.94212 14.993 3.28348 13.4182 4.85829L13.4054 4.87081C12.6609 5.58923 11.8389 6.77508 10.9415 8.24324C10.9156 8.30523 10.8831 8.36553 10.8438 8.42318C10.8251 8.45065 10.8052 8.47688 10.7843 8.50187C10.7259 8.59857 10.6678 8.69535 10.6099 8.79223L15.209 13.3913C15.3105 13.3308 15.4113 13.2703 15.5112 13.21C15.5331 13.1922 15.5559 13.1751 15.5797 13.1589ZM15.5391 15.519C15.5495 15.5132 15.5598 15.5071 15.57 15.5009L15.7781 15.3788C16.1627 16.2789 16.1473 17.1207 15.8887 17.9326C15.6315 18.7399 15.1205 19.5527 14.4279 20.3593L12.5532 17.2475C13.0494 16.9573 13.5523 16.6676 14.0556 16.3778L14.1786 16.307C14.6348 16.0442 15.0909 15.7813 15.5391 15.519ZM13.4232 14.434L9.56699 10.5777L9.32806 10.9931C9.01382 11.5397 8.69544 12.0935 8.36506 12.6568L11.3454 15.6372C11.9126 15.3039 12.4864 14.9736 13.0516 14.6481L13.0531 14.6472L13.1805 14.5738L13.4232 14.434ZM6.07007 8.11412C6.88142 7.85565 7.72261 7.84009 8.62212 8.22397C8.27715 8.8101 7.92142 9.4278 7.56675 10.0437C7.29347 10.5182 7.0207 10.9918 6.75409 11.4489L3.64331 9.57496C4.44998 8.88231 5.2627 8.37132 6.07007 8.11412ZM15.6196 6.61321C15.6196 5.63584 16.412 4.84375 17.3891 4.84375C18.3663 4.84375 19.1585 5.63601 19.1585 6.61321C19.1585 7.5904 18.3663 8.38267 17.3891 8.38267C16.412 8.38267 15.6196 7.59057 15.6196 6.61321ZM17.3891 6.84375C17.5164 6.84375 17.6196 6.74065 17.6196 6.61321C17.6196 6.48576 17.5164 6.38267 17.3891 6.38267C17.2617 6.38267 17.1585 6.48593 17.1585 6.61321C17.1585 6.74048 17.2617 6.84375 17.3891 6.84375ZM4.23478 17.5605C4.7232 16.95 5.62218 16.8701 6.21059 17.385C6.85401 17.948 6.83179 18.9559 6.16418 19.4899L6.05947 19.5737L3.36552 20.1724L3.92016 17.9538L4.23478 17.5605ZM7.5276 15.8798C6.08188 14.6148 3.87309 14.8111 2.67304 16.3112L2.33999 16.7275C2.17246 16.9369 2.05207 17.18 1.98703 17.4401L1.03281 21.257C0.948751 21.5932 1.04478 21.949 1.2866 22.1973C1.52842 22.4456 1.88156 22.5509 2.21988 22.4757L6.54782 21.514C6.81007 21.4557 7.0555 21.3381 7.26528 21.1703L7.41357 21.0517C9.05388 19.7394 9.10849 17.2631 7.5276 15.8798Z" fill="#4CD91E"></path></svg>
              </div>
              <div className="flex flex-col items-start gap-1">
                <p className="font-bold text-xl text-[#202020]"><strong>Preparado para seu Crescimento</strong></p>
                <p className="text-base text-[#444]">Nossa solução foi desenhada para acompanhar o seu crescimento com todos os recursos que seu negócio precisa. Expanda de forma escalável e segura.</p>
              </div>
            </div>
          </div>
          <Button variant="primary" onClick={() => scrollToSection('hospedagem')} className="mt-8">
            Confira nossos planos
          </Button>
        </div>
      </Section>

      {/* --- FAQ Section --- */}
      <Section id="faq" className="bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-[#0A1F04] mb-4">Central de Ajuda TrevvoHost</h2>
            <p className="text-lg text-gray-600 mb-8">Como podemos te ajudar hoje?</p>
            
            <div className="max-w-3xl mx-auto">
              <form action="#" className="flex flex-col sm:flex-row gap-2 sm:gap-0">
                <div className="relative flex-grow h-[50px] bg-gray-100 rounded-md sm:rounded-r-none border border-gray-300 focus-within:border-[#4CD91E] focus-within:ring-1 focus-within:ring-[#4CD91E] transition-all">
                  <input 
                    id="help-search" 
                    name="help-search"
                    placeholder="Escreva aqui sua dúvida =)" 
                    className="peer w-full h-full border-none bg-transparent p-0 pt-4 text-lg text-gray-800 placeholder-transparent focus:outline-none focus-visible:outline-none px-4" 
                  />
                  <label 
                    htmlFor="help-search" 
                    className="pointer-events-none absolute left-4 select-none text-gray-500 transition-all duration-200 top-1/2 -translate-y-1/2 text-lg peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:text-lg peer-focus:top-1.5 peer-focus:-translate-y-0 peer-focus:text-xs peer-[:not(:placeholder-shown)]:top-1.5 peer-[:not(:placeholder-shown)]:-translate-y-0 peer-[:not(:placeholder-shown)]:text-xs"
                  >
                    Escreva aqui sua dúvida =)
                  </label>
                </div>
                <button type="submit" className="h-[50px] bg-[#4CD91E] text-white px-8 rounded-md sm:rounded-l-none font-bold hover:brightness-110 transition-all text-lg flex items-center justify-center gap-2">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M11 19C15.4183 19 19 15.4183 19 11C19 6.58172 15.4183 3 11 3C6.58172 3 3 6.58172 3 11C3 15.4183 6.58172 19 11 19Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><path d="M21 21L16.65 16.65" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  <span className="sm:hidden">Buscar</span>
                </button>
              </form>
              <p className="text-xs text-gray-500 mt-2">Sua resposta será apresentada na nossa página de ajuda ao cliente.</p>
            </div>
          </div>

          <div className="max-w-3xl mx-auto">
            <div className="space-y-2">
              <h3 className="text-2xl font-bold text-[#0A1F04] mb-6 pt-8 border-t border-gray-200 mt-12">Ou pesquise suas dúvidas abaixo:</h3>
              {faqData.map((faq, index) => (
                <div key={index} className={`border rounded-lg overflow-hidden transition-all duration-300 ${selectedFaq === index ? 'border-[#4CD91E] bg-white' : 'border-gray-200 bg-gray-50'}`}>
                  <button 
                    onClick={() => setSelectedFaq(index)}
                    className="w-full p-5 text-left flex justify-between items-center gap-4"
                  >
                    <div className={`flex-shrink-0 transition-colors ${selectedFaq === index ? 'text-[#4CD91E]' : 'text-gray-500'}`}>{faq.icon}</div>
                    <span className={`flex-grow font-semibold ${selectedFaq === index ? 'text-[#0A1F04]' : 'text-gray-700'}`}>{faq.question}</span>
                    <ChevronDown className={`transform transition-transform duration-300 ${selectedFaq === index ? 'rotate-180 text-[#4CD91E]' : 'text-gray-400'}`} />
                  </button>
                  <div className={`transition-all duration-500 ease-in-out overflow-hidden ${selectedFaq === index ? 'max-h-96' : 'max-h-0'}`}>
                    <div className="px-5 pb-5 text-gray-600">
                      <p className="pl-10 border-l-2 border-green-100 ml-3">{faq.answer}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Section>

      {/* --- Footer --- */}
      <footer id="contato" className="bg-[#051402] text-gray-400 pt-16 pb-8">
        <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-4 gap-8 mb-12">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-2 mb-4 text-white">
              <Server size={24} className="text-[#4CD91E]"/>
              <span className="text-2xl font-bold">TrevvoHost</span>
            </div>
            <p className="max-w-sm mb-6 text-gray-400">
              Soluções em alta tecnologia para o seu projeto. Hospedagem, VPS e Revenda com suporte que entende você.
            </p>
            <div className="flex gap-4">
              {/* Social placeholders */}
              <div className="w-10 h-10 bg-[#1a3310] rounded-full flex items-center justify-center text-white hover:bg-[#4CD91E] hover:text-white transition-colors cursor-pointer"><Globe size={18}/></div>
              <div className="w-10 h-10 bg-[#1a3310] rounded-full flex items-center justify-center text-white hover:bg-[#4CD91E] hover:text-white transition-colors cursor-pointer"><Headphones size={18}/></div>
            </div>
          </div>
          
          <div>
            <h4 className="text-white font-bold mb-4">Serviços</h4>
            <ul className="space-y-2">
              <li><a href="#revenda" className="hover:text-[#4CD91E] transition-colors">Revenda Premium</a></li>
              <li><a href="#vps" className="hover:text-[#4CD91E] transition-colors">Servidores VPS</a></li>
              <li><a href="#serviços" className="hover:text-[#4CD91E] transition-colors">Hospedagem de Sites</a></li>
              <li><a href="#serviços" className="hover:text-[#4CD91E] transition-colors">Registro de Domínio</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-white font-bold mb-4">Atendimento</h4>
            <ul className="space-y-2">
              <li>Área do Cliente</li>
              <li>Ticket de Suporte</li>
              <li>Status do Servidor</li>
              <li>Termos de Uso</li>
            </ul>
          </div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 border-t border-[#1a3310] pt-8 text-center text-sm">
          <p>&copy; {new Date().getFullYear()} TrevvoHost. Todos os direitos reservados.</p>
        </div>
      </footer>
    </div>
    </>
  );
}

// --- Subcomponentes ---

const ServiceCard = ({ icon, title, desc }) => (
  <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-100 hover:shadow-xl transition-shadow duration-300 flex flex-col items-center text-center group">
    <div className="text-[#4CD91E] mb-4 bg-green-50 p-4 rounded-full group-hover:scale-110 transition-transform duration-300">
      {icon}
    </div>
    <h3 className="text-xl font-bold text-[#0A1F04] mb-3">{title}</h3>
    <p className="text-gray-600 text-sm leading-relaxed">{desc}</p>
  </div>
);

const VPSCard = ({ title, price, features, description, highlight, tag }) => (
  <div className={`relative flex flex-col p-8 rounded-2xl transition-all duration-300 ${highlight ? 'bg-white shadow-2xl border-2 border-[#4CD91E] scale-105 z-10' : 'bg-white shadow-lg border border-gray-100'}`}>
    {tag && (
      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-[#4CD91E] text-white px-4 py-1 rounded-full text-sm font-bold uppercase tracking-wide shadow-md">
        {tag}
      </div>
    )}
    
    <h3 className="text-xl font-bold text-[#0A1F04] text-center mb-2">{title}</h3>
    <p className="text-gray-500 text-center text-sm mb-6 h-10">{description}</p>
    
    <div className="text-center mb-8 border-b border-gray-100 pb-8">
      <span className="text-sm text-gray-400">A partir de</span>
      <div className="text-[#0A1F04] font-extrabold text-4xl mt-1">
        R$ {price}<span className="text-lg text-gray-500 font-medium">/mês</span>
      </div>
    </div>
    
    <ul className="space-y-4 mb-8 flex-grow">
      {features.map((feat, i) => (
        <li key={i} className="flex items-center text-sm text-gray-700">
          <Zap size={16} className="text-[#4CD91E] mr-3 flex-shrink-0" />
          {feat}
        </li>
      ))}
    </ul>
    
    <Button variant={highlight ? 'primary' : 'secondary'} className="w-full">
      Configurar VPS
    </Button>
  </div>
);

const HostingPlanCard = ({ name, price, features, highlight }) => (
  <div className={`bg-white p-8 rounded-2xl text-center transition-all duration-300 ${highlight ? 'shadow-2xl border-2 border-[#4CD91E] scale-105 z-10' : 'shadow-lg border border-gray-100'}`}>
    <h3 className="text-xl font-bold text-[#0A1F04] mb-2">{name}</h3>
    <div className="my-4">
      <div className="text-4xl font-extrabold text-[#4CD91E]">R$ {price}</div>
      <div className="text-gray-500 text-sm">Mensal</div>
    </div>

    <ul className="space-y-3 text-gray-700 mb-8">
      {features.map((feature, index) => (
        <li key={index}>
          <p className="font-semibold text-lg">{feature.value}</p>
          <p className="text-sm text-gray-500">{feature.label}</p>
        </li>
      ))}
    </ul>

    <Button variant={highlight ? 'primary' : 'secondary'} className="w-full">
      Contratar {name}
    </Button>
  </div>
);