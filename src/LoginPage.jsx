import React from 'react';
import { Server, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

const LoginPage = () => {
  return (
    <div className="relative bg-[#051402] text-white min-h-screen flex items-center justify-center p-4 overflow-hidden">
      {/* Abstract Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 opacity-20 pointer-events-none">
        <div className="absolute top-[-10%] right-[-5%] w-96 h-96 bg-[#4CD91E] rounded-full blur-3xl"></div>
        <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-green-800 rounded-full blur-3xl"></div>
      </div>

      {/* Botão para voltar */}
      <Link to="/" className="absolute top-6 left-6 z-20 flex items-center gap-2 text-green-200 hover:text-white transition-colors">
        <ArrowLeft size={20} />
        <span>Voltar ao Início</span>
      </Link>

      <div className="relative z-10 w-full max-w-md">
        <div className="bg-black/30 backdrop-blur-sm border border-[#4CD91E]/30 p-8 rounded-2xl shadow-2xl text-center">
          {/* Logo */}
          <div className="flex justify-center items-center gap-2 mb-6">
            <div className="w-10 h-10 bg-[#4CD91E] rounded-lg flex items-center justify-center text-white shadow-lg shadow-green-500/30">
              <Server size={24} />
            </div>
            <span className="text-2xl font-bold text-white">
              Trevvo<span className="text-[#4CD91E]">Host</span>
            </span>
          </div>

          <h2 className="text-2xl font-bold mb-1">Área do Cliente</h2>
          <p className="text-green-200/70 mb-8">Acesse sua conta para gerenciar seus serviços.</p>

          <form className="space-y-6 text-left">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-green-100 mb-2">
                E-mail
              </label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="seuemail@exemplo.com"
                className="w-full bg-black/40 border border-green-800/50 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#4CD91E] transition-all"
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-green-100 mb-2">
                Senha
              </label>
              <input
                type="password"
                id="password"
                name="password"
                placeholder="••••••••"
                className="w-full bg-black/40 border border-green-800/50 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#4CD91E] transition-all"
              />
            </div>

            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-2">
                <input id="remember-me" name="remember-me" type="checkbox" className="h-4 w-4 rounded border-gray-600 bg-gray-800 text-[#4CD91E] focus:ring-[#4CD91E]" />
                <label htmlFor="remember-me" className="text-gray-300">Lembrar-me</label>
              </div>
              <a href="#" className="font-medium text-[#4CD91E] hover:text-green-400">Esqueceu a senha?</a>
            </div>

            <div>
              <button type="submit" className="w-full bg-[#4CD91E] text-white font-bold py-3 px-4 rounded-lg hover:brightness-110 transition-all shadow-lg shadow-green-500/20">
                Entrar
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;