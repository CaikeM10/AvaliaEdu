import { useState } from "react";
import { useNavigate } from "react-router";
import { GraduationCap, Eye, EyeOff, BarChart3, CheckCircle2, BookOpen } from "lucide-react";

export function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("maria.silva@sme.fortaleza.ce.gov.br");
  const [password, setPassword] = useState("••••••••");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleLogin = () => {
    setLoading(true);
    setTimeout(() => {
      navigate("/app/dashboard");
    }, 1200);
  };

  return (
    <div
      className="min-h-screen flex"
      style={{ fontFamily: "'Inter', sans-serif", background: "#F8FAFC" }}
    >
      {/* Left Panel - Branding */}
      <div className="hidden lg:flex flex-col justify-between w-1/2 bg-[#0F172A] p-12 relative overflow-hidden">
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-0 left-0 w-full h-full"
            style={{
              backgroundImage: "radial-gradient(circle at 25px 25px, white 2px, transparent 0)",
              backgroundSize: "50px 50px"
            }}
          />
        </div>
        {/* Accent circle */}
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-[#2563EB] rounded-full opacity-10" />
        <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-[#10B981] rounded-full opacity-10" />

        {/* Logo */}
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 bg-[#2563EB] rounded-xl flex items-center justify-center">
              <GraduationCap size={22} className="text-white" />
            </div>
            <div>
              <div className="text-xl font-bold text-white">AvaliaEdu</div>
              <div className="text-xs text-blue-300">Plataforma Inteligente de Avaliação Educacional</div>
            </div>
          </div>
        </div>

        {/* Center content */}
        <div className="relative z-10">
          <h1 className="text-3xl font-bold text-white mb-4 leading-tight">
            Avaliação educacional<br />
            <span className="text-[#2563EB]">inteligente</span> para<br />
            municípios brasileiros
          </h1>
          <p className="text-slate-400 text-sm mb-8 leading-relaxed">
            Crie provas alinhadas ao SAEB e SPAECE, escaneie gabaritos automaticamente e gere relatórios pedagógicos em minutos.
          </p>

          {/* Features */}
          <div className="space-y-4">
            {[
              { icon: CheckCircle2, text: "Correção automática por visão computacional" },
              { icon: BarChart3, text: "Analytics alinhados ao SAEB e SPAECE" },
              { icon: BookOpen, text: "Banco de questões com habilidades categorizadas" },
            ].map((f, i) => (
              <div key={i} className="flex items-center gap-3">
                <f.icon size={18} className="text-[#10B981] flex-shrink-0" />
                <span className="text-sm text-slate-300">{f.text}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Stats */}
        <div className="relative z-10 grid grid-cols-3 gap-4">
          {[
            { value: "240+", label: "Escolas" },
            { value: "18.5k", label: "Alunos" },
            { value: "98%", label: "Precisão OMR" },
          ].map((s, i) => (
            <div key={i} className="bg-white/5 rounded-xl p-4 border border-white/10">
              <div className="text-xl font-bold text-white">{s.value}</div>
              <div className="text-xs text-slate-400">{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Right Panel - Login Form */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          {/* Mobile Logo */}
          <div className="lg:hidden flex items-center gap-3 mb-8 justify-center">
            <div className="w-10 h-10 bg-[#2563EB] rounded-xl flex items-center justify-center">
              <GraduationCap size={22} className="text-white" />
            </div>
            <div className="text-xl font-bold text-[#0F172A]">AvaliaEdu</div>
          </div>

          <div className="mb-8">
            <h2 className="text-2xl font-bold text-[#0F172A]">Bem-vindo de volta</h2>
            <p className="text-slate-500 text-sm mt-1">Entre na sua conta para continuar</p>
          </div>

          {/* Role selector */}
          <div className="flex gap-2 mb-6 p-1 bg-gray-100 rounded-lg">
            {["Professor", "Diretor", "Secretaria"].map((role, i) => (
              <button
                key={role}
                className={`flex-1 py-1.5 px-3 rounded-md text-xs font-medium transition-all ${
                  i === 0 ? "bg-white text-[#2563EB] shadow-sm" : "text-slate-500 hover:text-slate-700"
                }`}
              >
                {role}
              </button>
            ))}
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-[#0F172A] mb-1.5">E-mail institucional</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm text-[#0F172A] focus:outline-none focus:ring-2 focus:ring-[#2563EB]/30 focus:border-[#2563EB] bg-white transition-all"
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-sm font-medium text-[#0F172A]">Senha</label>
                <button className="text-xs text-[#2563EB] hover:underline">Esqueceu a senha?</button>
              </div>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm text-[#0F172A] focus:outline-none focus:ring-2 focus:ring-[#2563EB]/30 focus:border-[#2563EB] bg-white transition-all pr-10"
                />
                <button
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <input type="checkbox" id="remember" className="w-4 h-4 accent-[#2563EB] rounded" defaultChecked />
              <label htmlFor="remember" className="text-sm text-slate-600">Manter conectado</label>
            </div>

            <button
              onClick={handleLogin}
              disabled={loading}
              className="w-full bg-[#2563EB] text-white py-3 rounded-lg text-sm font-semibold hover:bg-blue-700 transition-all shadow-md hover:shadow-lg disabled:opacity-70 flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Entrando...
                </>
              ) : (
                "Entrar na Plataforma"
              )}
            </button>
          </div>

          <div className="mt-6 pt-6 border-t border-gray-100">
            <div className="flex items-center gap-2 text-xs text-slate-400 justify-center">
              <div className="w-2 h-2 rounded-full bg-[#10B981]" />
              Sistema operacional · Versão 2.4.1
            </div>
          </div>

          <p className="text-center text-xs text-slate-400 mt-4">
            © 2026 AvaliaEdu · Todos os direitos reservados
          </p>
        </div>
      </div>
    </div>
  );
}
