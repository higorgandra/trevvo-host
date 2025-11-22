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
  ChevronUp, 
  Cloud, 
  Zap,
  CheckCircle,
  RotateCw,
  Award
} from 'lucide-react';

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

  // Detectar scroll para mudar a navbar
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="font-sans text-gray-800 bg-gray-50 min-h-screen">
      
      {/* --- Navbar --- */}
      <nav className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-white shadow-md py-3' : 'bg-transparent py-5'}`}>
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
            {['Início', 'Serviços', 'Revenda', 'VPS', 'FAQ'].map((item) => (
              <button 
                key={item} 
                onClick={() => scrollToSection(item.toLowerCase() === 'início' ? 'hero' : item.toLowerCase())}
                className={`font-medium hover:text-[#4CD91E] transition-colors ${isScrolled ? 'text-gray-700' : 'text-gray-100'}`}
              >
                {item}
              </button>
            ))}
            <button 
              onClick={() => scrollToSection('contato')}
              className="bg-[#4CD91E] text-white px-5 py-2 rounded-full font-medium hover:brightness-110 transition-all shadow-lg shadow-green-500/20"
            >
              Área do Cliente
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className={isScrolled ? 'text-[#0A1F04]' : 'text-white'}>
              {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        {mobileMenuOpen && (
          <div className="md:hidden absolute top-full left-0 w-full bg-white shadow-xl py-4 flex flex-col items-center space-y-4 border-t">
            {['Início', 'Serviços', 'Revenda', 'VPS', 'FAQ', 'Contato'].map((item) => (
              <button 
                key={item}
                onClick={() => scrollToSection(item.toLowerCase() === 'início' ? 'hero' : item.toLowerCase())}
                className="text-gray-800 font-medium text-lg py-2 w-full text-center hover:bg-green-50 hover:text-[#4CD91E]"
              >
                {item}
              </button>
            ))}
          </div>
        )}
      </nav>

      {/* --- Hero Section --- */}
      {/* Fundo alterado para um tom de verde muito escuro (quase preto) para contraste com o neon */}
      <header id="hero" className="relative bg-[#051402] text-white min-h-[90vh] flex items-center pt-20 overflow-hidden">
        {/* Abstract Background Elements */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 opacity-20">
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
      <section className="bg-white py-12 border-b border-gray-200">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-center text-[#0A1F04] mb-6">
            Registre seu domínio agora mesmo
          </h2>
          <form action="#" className="flex flex-col md:flex-row gap-2 md:gap-0">
            {/* Input com label flutuante */}
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
                className="pointer-events-none absolute left-4 select-none text-gray-500 transition-all duration-200 top-1/2 -translate-y-1/2 text-lg 
                           peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:text-lg
                           peer-focus:top-1.5 peer-focus:-translate-y-0 peer-focus:text-xs
                           peer-[:not(:placeholder-shown)]:top-1.5 peer-[:not(:placeholder-shown)]:-translate-y-0 peer-[:not(:placeholder-shown)]:text-xs"
              >
                Digite o domínio desejado
              </label>
            </div>
            
            {/* Seletor de Extensão */}
            <div className="flex h-[50px] bg-gray-200 text-gray-700 font-semibold items-center px-4 rounded-md md:rounded-none">
              <span>.com.br</span>
              <ChevronDown size={20} className="ml-2" />
            </div>

            {/* Botão de Busca */}
            <button type="submit" className="h-[50px] bg-[#4CD91E] text-white px-8 rounded-md md:rounded-l-none font-bold hover:brightness-110 transition-all text-lg">
              Buscar
            </button>
          </form>

          <ul className="mt-8 flex flex-col md:flex-row justify-center gap-x-8 gap-y-4 text-sm text-gray-600">
            <li className="flex items-center gap-2">
              <CheckCircle size={16} className="text-[#4CD91E] flex-shrink-0" />
              <span className="whitespace-nowrap">Mais credibilidade aos seus clientes</span>
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle size={16} className="text-[#4CD91E] flex-shrink-0" />
              <span className="whitespace-nowrap">Exclusividade do nome da sua marca</span>
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle size={16} className="text-[#4CD91E] flex-shrink-0" />
              <span className="whitespace-nowrap">Mais chances de ser encontrado</span>
            </li>
          </ul>
        </div>
      </section>

      {/* --- Black Friday Offers --- */}
      <div className="bg-gray-50 py-12">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-[#0A1F04] mb-8">
            Não perca as ofertas da Black Friday
          </h2>
          <div className="flex flex-col md:flex-row justify-center items-center gap-x-12 gap-y-6 text-gray-700">
            <div className="flex items-center gap-3">
              <Headphones size={20} className="text-[#4CD91E]" />
              <span className="font-medium">Suporte 24h</span>
            </div>
            <div className="flex items-center gap-3">
              <Award size={20} className="text-[#4CD91E]" />
              <span className="font-medium">30 dias para pedir reembolso</span>
            </div>
            <div className="flex items-center gap-3">
              <RotateCw size={20} className="text-[#4CD91E]" />
              <span className="font-medium">Cancele a qualquer momento</span>
            </div>
          </div>
        </div>
      </div>

      {/* --- VPS Section --- */}
      <Section id="vps">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-[#0A1F04]">Servidores VPS Robustos</h2>
          <p className="text-gray-600 mt-4">
            Ambientes isolados com proteção DDoS Grátis e autonomia total (Root).
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {/* VPS Plan 1 */}
          <VPSCard 
            title="Smart-Web"
            price="29,90"
            features={[
              "Até 16GB de RAM",
              "Até 8 Cores",
              "400GB HD Raid 10",
              "Até 3 IP's (IPV4)",
              "Proteção DDoS Grátis"
            ]}
            description="Melhor custo x benefício para serviços WEB e sites."
            highlight={false}
          />
          
          {/* VPS Plan 2 */}
          <VPSCard 
            title="Full-Range"
            price="34,90"
            features={[
              "Até 12GB RAM",
              "Até 10 Cores (Dedicados)",
              "480GB HD",
              "Até 3 IP's (IPV4)",
              "Escalabilidade Garantida"
            ]}
            description="Recursos robustos para qualquer atividade pesada."
            highlight={true}
            tag="Mais Vendido"
          />

          {/* VPS Plan 3 */}
          <VPSCard 
            title="Windows Server"
            price="30,90"
            features={[
              "Até 32GB de RAM",
              "Até 180GB HD",
              "Até 3 IP's (IPV4)",
              "Windows Server OS",
              "Desempenho Superior"
            ]}
            description="Facilidades do Windows com custo reduzido."
            highlight={false}
          />
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

      {/* --- Services Grid --- */}
      <Section id="serviços">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-[#0A1F04]">Nossos Produtos</h2>
          <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
            Da hospedagem básica à infraestrutura robusta de servidores, temos tudo o que você precisa para crescer online.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          <ServiceCard 
            icon={<Cloud size={40} />}
            title="Revenda de Hospedagem"
            desc="Monte sua própria empresa de hospedagem com nossa infraestrutura white-label."
          />
          <ServiceCard 
            icon={<Server size={40} />}
            title="Servidores VPS"
            desc="Plataformas isoladas para jogos, sistemas e aplicações pesadas."
          />
          <ServiceCard 
            icon={<Globe size={40} />}
            title="Hospedagem de Sites"
            desc="Ambiente seguro, cPanel e tudo que seu site precisa para rodar liso."
          />
          <ServiceCard 
            icon={<ShieldCheck size={40} />}
            title="Registro de Domínios"
            desc="Garanta o endereço da sua marca na internet agora mesmo."
          />
        </div>
      </Section>

      {/* --- Revenda Highlight --- */}
      <div id="revenda" className="bg-white py-20 border-y border-gray-200">
        <div className="max-w-7xl mx-auto px-4 grid lg:grid-cols-2 gap-16 items-center">
          <div>
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
            
            <div className="bg-green-50 p-6 rounded-xl border border-green-100">
              <p className="text-sm text-[#0A1F04] font-bold mb-2 uppercase tracking-wider">Promoção Trimestral</p>
              <p className="text-gray-700">Assine o plano trimestral e ganhe <span className="font-bold text-[#4CD91E]">10% de desconto</span>.</p>
            </div>
          </div>

          <div className="relative">
             {/* Price Card */}
            <div className="bg-white rounded-2xl shadow-2xl border border-gray-100 p-8 text-center transform hover:-translate-y-2 transition-transform duration-300">
               <h3 className="text-2xl font-bold text-gray-800">Revenda Mensal</h3>
               <div className="my-6">
                 <span className="text-gray-400 text-lg align-top">R$</span>
                 <span className="text-5xl font-extrabold text-[#4CD91E]">49</span>
                 <span className="text-gray-600 text-xl font-bold">,90</span>
                 <span className="text-gray-400 block mt-2">/mês</span>
               </div>
               <Button className="w-full shadow-green-200">Contratar Agora</Button>
               <p className="text-xs text-gray-500 mt-4">Plataforma Linux. Ativação imediata.</p>

               <div className="mt-8 pt-8 border-t border-gray-100">
                 <h4 className="text-lg font-bold text-gray-800 mb-2">Ou Plano Trimestral</h4>
                 <p className="text-gray-600">Por apenas <span className="font-bold text-[#4CD91E]">R$ 134,73</span></p>
               </div>
            </div>
             {/* Decor */}
            <div className="absolute -z-10 top-10 -right-10 w-full h-full bg-[#4CD91E]/10 rounded-2xl"></div>
          </div>
        </div>
      </div>

      {/* --- FAQ Section --- */}
      <Section id="faq" className="bg-white">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-[#0A1F04] text-center mb-12">Perguntas Frequentes</h2>
          
          <div className="space-y-4">
            <AccordionItem title="Qual a diferença entre VPS e Hospedagem?">
              Diferente de uma hospedagem comum onde recursos são compartilhados, um VPS tem autonomia total (acesso root) para executar aplicativos e configurações isoladas, sem interferência de terceiros.
            </AccordionItem>
            <AccordionItem title="Posso instalar jogos no meu servidor?">
              Sim! Você poderá instalar qualquer aplicação em seu servidor (Minecraft, GTA RP, etc.), contanto que siga nossos termos de serviço e leis vigentes.
            </AccordionItem>
            <AccordionItem title="A Trevvo configura o jogo para mim?">
              Não instalamos servidores de jogos específicos (mods, plugins do jogo). Oferecemos suporte operacional para garantir que o VPS (infraestrutura) esteja online e funcional.
            </AccordionItem>
            <AccordionItem title="Qual o prazo para ativação?">
              Nossos servidores são entregues em um prazo médio de duas horas, com prazo máximo de 48 horas úteis.
            </AccordionItem>
            <AccordionItem title="Quais as formas de pagamento?">
              Aceitamos pagamentos através de boleto e transferência bancária para todos os nossos serviços.
            </AccordionItem>
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

const AccordionItem = ({ title, children }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border border-gray-200 rounded-lg overflow-hidden bg-gray-50">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-6 py-4 text-left flex justify-between items-center bg-white hover:bg-gray-50 transition-colors"
      >
        <span className={`font-semibold ${isOpen ? 'text-[#4CD91E]' : 'text-gray-800'}`}>{title}</span>
        {isOpen ? <ChevronUp className="text-[#4CD91E]" /> : <ChevronDown className="text-gray-400" />}
      </button>
      
      <div className={`transition-all duration-300 ease-in-out overflow-hidden ${isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
        <div className="px-6 py-4 text-gray-600 border-t border-gray-100 bg-gray-50">
          {children}
        </div>
      </div>
    </div>
  );
};