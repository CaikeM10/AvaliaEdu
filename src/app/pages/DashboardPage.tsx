import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
  PolarRadiusAxis,
} from "recharts";
import {
  FileText,
  Users,
  TrendingUp,
  AlertTriangle,
  ArrowUpRight,
  ArrowDownRight,
  School,
  Clock,
  CheckCircle,
  ScanLine,
  BarChart3,
  BookOpen,
} from "lucide-react";
import { useNavigate } from "react-router";

const trendData = [
  { mes: "Ago", media: 58 },
  { mes: "Set", media: 62 },
  { mes: "Out", media: 60 },
  { mes: "Nov", media: 65 },
  { mes: "Dez", media: 63 },
  { mes: "Jan", media: 70 },
  { mes: "Fev", media: 68 },
  { mes: "Mar", media: 74 },
];

const schoolRanking = [
  { escola: "E.M. Rui Barbosa", media: 78, alunos: 342 },
  { escola: "E.M. Tiradentes", media: 74, alunos: 289 },
  { escola: "E.M. Santos Dumont", media: 71, alunos: 415 },
  { escola: "E.M. Dom Pedro II", media: 68, alunos: 378 },
  { escola: "E.M. José de Alencar", media: 65, alunos: 201 },
];

const skillRadarData = [
  { skill: "Álgebra", value: 72 },
  { skill: "Geometria", value: 55 },
  { skill: "Estatística", value: 68 },
  { skill: "Números", value: 80 },
  { skill: "Leitura", value: 74 },
  { skill: "Escrita", value: 61 },
];

const scoreDistribution = [
  { faixa: "0–20%", alunos: 48 },
  { faixa: "21–40%", alunos: 120 },
  { faixa: "41–60%", alunos: 280 },
  { faixa: "61–80%", alunos: 340 },
  { faixa: "81–100%", alunos: 212 },
];

const recentActivity = [
  { icon: ScanLine, text: "Prova de Matemática – 8º Ano A escaneada", time: "há 10 min", color: "#2563EB" },
  { icon: CheckCircle, text: "37 gabaritos corrigidos automaticamente", time: "há 25 min", color: "#10B981" },
  { icon: FileText, text: "Nova prova de LP – 7º Ano criada", time: "há 1h", color: "#F59E0B" },
  { icon: Users, text: "Aluno Carlos Mendes cadastrado na turma 9A", time: "há 2h", color: "#8B5CF6" },
  { icon: BarChart3, text: "Relatório mensal de desempenho gerado", time: "há 3h", color: "#10B981" },
  { icon: BookOpen, text: "12 questões adicionadas ao banco", time: "há 4h", color: "#2563EB" },
];

const statCards = [
  {
    label: "Provas Aplicadas",
    value: "1.248",
    change: "+12%",
    up: true,
    icon: FileText,
    color: "#2563EB",
    bg: "#EFF6FF",
  },
  {
    label: "Alunos Avaliados",
    value: "18.540",
    change: "+8%",
    up: true,
    icon: Users,
    color: "#10B981",
    bg: "#ECFDF5",
  },
  {
    label: "Média Geral",
    value: "74,2%",
    change: "+3,1%",
    up: true,
    icon: TrendingUp,
    color: "#F59E0B",
    bg: "#FFFBEB",
  },
  {
    label: "Habilidade Crítica",
    value: "Geometria",
    change: "52% domínio",
    up: false,
    icon: AlertTriangle,
    color: "#EF4444",
    bg: "#FEF2F2",
  },
];

export function DashboardPage() {
  const navigate = useNavigate();
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-[#0F172A]">Dashboard</h1>
          <p className="text-sm text-slate-500 mt-0.5">Secretaria Municipal de Educação de Fortaleza · Março 2026</p>
        </div>
        <div className="flex items-center gap-3">
          <select className="text-sm border border-gray-200 rounded-lg px-3 py-2 bg-white text-slate-600 focus:outline-none focus:ring-2 focus:ring-[#2563EB]/30">
            <option>Todas as escolas</option>
            <option>E.M. Rui Barbosa</option>
            <option>E.M. Tiradentes</option>
          </select>
          <button
            onClick={() => navigate("/app/exam-generator")}
            className="bg-[#2563EB] text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-all shadow-sm flex items-center gap-2"
          >
            <FileText size={15} />
            Nova Prova
          </button>
        </div>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards.map((card, i) => {
          const Icon = card.icon;
          return (
            <div key={i} className="bg-white rounded-xl p-5 shadow-sm border border-gray-100 hover:shadow-md transition-all cursor-pointer">
              <div className="flex items-start justify-between mb-3">
                <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: card.bg }}>
                  <Icon size={18} style={{ color: card.color }} />
                </div>
                <span
                  className={`text-xs font-medium flex items-center gap-1 ${
                    card.up ? "text-[#10B981]" : "text-[#EF4444]"
                  }`}
                >
                  {card.up ? <ArrowUpRight size={13} /> : <ArrowDownRight size={13} />}
                  {card.change}
                </span>
              </div>
              <div className="text-xl font-bold text-[#0F172A]">{card.value}</div>
              <div className="text-xs text-slate-500 mt-0.5">{card.label}</div>
            </div>
          );
        })}
      </div>

      {/* Charts Row 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Trend */}
        <div className="lg:col-span-2 bg-white rounded-xl p-5 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="font-semibold text-[#0F172A] text-sm">Evolução da Média Geral</h3>
              <p className="text-xs text-slate-400">Agosto 2025 – Março 2026</p>
            </div>
            <select className="text-xs border border-gray-200 rounded-lg px-2 py-1 bg-white text-slate-500 focus:outline-none">
              <option>Todas as disciplinas</option>
              <option>Matemática</option>
              <option>Língua Portuguesa</option>
            </select>
          </div>
          <ResponsiveContainer width="100%" height={200}>
            <AreaChart data={trendData}>
              <defs>
                <linearGradient id="colorMedia" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#2563EB" stopOpacity={0.15} />
                  <stop offset="95%" stopColor="#2563EB" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" />
              <XAxis dataKey="mes" tick={{ fontSize: 11, fill: "#94A3B8" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: "#94A3B8" }} axisLine={false} tickLine={false} domain={[50, 85]} />
              <Tooltip
                contentStyle={{ borderRadius: 8, border: "1px solid #E2E8F0", fontSize: 12 }}
                formatter={(v: number) => [`${v}%`, "Média"]}
              />
              <Area
                type="monotone"
                dataKey="media"
                stroke="#2563EB"
                strokeWidth={2.5}
                fill="url(#colorMedia)"
                dot={{ r: 4, fill: "#2563EB", strokeWidth: 2, stroke: "white" }}
                activeDot={{ r: 5 }}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Radar */}
        <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
          <div className="mb-4">
            <h3 className="font-semibold text-[#0F172A] text-sm">Domínio por Habilidade</h3>
            <p className="text-xs text-slate-400">Percentual de domínio médio</p>
          </div>
          <ResponsiveContainer width="100%" height={200}>
            <RadarChart data={skillRadarData}>
              <PolarGrid stroke="#F1F5F9" />
              <PolarAngleAxis dataKey="skill" tick={{ fontSize: 10, fill: "#64748B" }} />
              <PolarRadiusAxis tick={{ fontSize: 9, fill: "#94A3B8" }} domain={[0, 100]} />
              <Radar
                name="Domínio"
                dataKey="value"
                stroke="#2563EB"
                fill="#2563EB"
                fillOpacity={0.2}
                strokeWidth={2}
              />
            </RadarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Charts Row 2 */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Score Distribution */}
        <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
          <div className="mb-4">
            <h3 className="font-semibold text-[#0F172A] text-sm">Distribuição de Notas</h3>
            <p className="text-xs text-slate-400">Total de alunos por faixa</p>
          </div>
          <ResponsiveContainer width="100%" height={180}>
            <BarChart data={scoreDistribution} barSize={28}>
              <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" vertical={false} />
              <XAxis dataKey="faixa" tick={{ fontSize: 10, fill: "#94A3B8" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 10, fill: "#94A3B8" }} axisLine={false} tickLine={false} />
              <Tooltip
                contentStyle={{ borderRadius: 8, border: "1px solid #E2E8F0", fontSize: 12 }}
                formatter={(v: number) => [v, "Alunos"]}
              />
              <Bar dataKey="alunos" fill="#2563EB" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* School Ranking */}
        <div className="lg:col-span-2 bg-white rounded-xl p-5 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="font-semibold text-[#0F172A] text-sm">Ranking de Escolas</h3>
              <p className="text-xs text-slate-400">Por média geral · Março 2026</p>
            </div>
            <button
              onClick={() => navigate("/app/schools")}
              className="text-xs text-[#2563EB] hover:underline flex items-center gap-1"
            >
              Ver todas <ArrowUpRight size={12} />
            </button>
          </div>
          <div className="space-y-3">
            {schoolRanking.map((s, i) => (
              <div key={i} className="flex items-center gap-3">
                <span
                  className={`w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 ${
                    i === 0
                      ? "bg-[#F59E0B] text-white"
                      : i === 1
                      ? "bg-slate-300 text-slate-700"
                      : i === 2
                      ? "bg-amber-600 text-white"
                      : "bg-gray-100 text-slate-500"
                  }`}
                >
                  {i + 1}
                </span>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-medium text-[#0F172A] truncate">{s.escola}</span>
                    <span className="text-xs font-bold text-[#2563EB] ml-2">{s.media}%</span>
                  </div>
                  <div className="w-full bg-gray-100 rounded-full h-1.5">
                    <div
                      className="h-1.5 rounded-full bg-[#2563EB] transition-all"
                      style={{ width: `${s.media}%` }}
                    />
                  </div>
                </div>
                <div className="flex items-center gap-1 text-xs text-slate-400 flex-shrink-0">
                  <School size={12} />
                  {s.alunos}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Recent Activity */}
        <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-[#0F172A] text-sm">Atividade Recente</h3>
            <button className="text-xs text-[#2563EB] hover:underline">Ver histórico</button>
          </div>
          <div className="space-y-3">
            {recentActivity.map((a, i) => {
              const Icon = a.icon;
              return (
                <div key={i} className="flex items-start gap-3">
                  <div
                    className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0"
                    style={{ backgroundColor: a.color + "15" }}
                  >
                    <Icon size={14} style={{ color: a.color }} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-[#0F172A] leading-snug">{a.text}</p>
                    <div className="flex items-center gap-1 mt-0.5">
                      <Clock size={10} className="text-slate-400" />
                      <span className="text-xs text-slate-400">{a.time}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
          <h3 className="font-semibold text-[#0F172A] text-sm mb-4">Ações Rápidas</h3>
          <div className="grid grid-cols-2 gap-3">
            {[
              { label: "Gerar Nova Prova", icon: FileText, path: "/app/exam-generator", color: "#2563EB", bg: "#EFF6FF" },
              { label: "Escanear Gabaritos", icon: ScanLine, path: "/app/scan-exams", color: "#10B981", bg: "#ECFDF5" },
              { label: "Ver Resultados", icon: BarChart3, path: "/app/correction-results", color: "#F59E0B", bg: "#FFFBEB" },
              { label: "Banco de Questões", icon: BookOpen, path: "/app/question-bank", color: "#8B5CF6", bg: "#F5F3FF" },
              { label: "Relatórios", icon: TrendingUp, path: "/app/analytics", color: "#EF4444", bg: "#FEF2F2" },
              { label: "Gerenciar Alunos", icon: Users, path: "/app/students", color: "#06B6D4", bg: "#ECFEFF" },
            ].map((action, i) => {
              const Icon = action.icon;
              return (
                <button
                  key={i}
                  onClick={() => navigate(action.path)}
                  className="flex items-center gap-3 p-3 rounded-lg border border-gray-100 hover:border-gray-200 hover:shadow-sm transition-all text-left group"
                >
                  <div
                    className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform"
                    style={{ backgroundColor: action.bg }}
                  >
                    <Icon size={15} style={{ color: action.color }} />
                  </div>
                  <span className="text-xs font-medium text-[#0F172A] leading-tight">{action.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
