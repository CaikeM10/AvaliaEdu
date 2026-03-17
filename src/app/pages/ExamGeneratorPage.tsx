import { useState } from "react";
import { useNavigate } from "react-router";
import { Wand2, FileText, BarChart3, Sliders, CheckCircle2, RefreshCw } from "lucide-react";

const skillOptions: Record<string, string[]> = {
  Matemática: ["Álgebra (EF07MA04)", "Geometria (EF08MA12)", "Estatística (EF07MA31)", "Números (EF06MA01)", "Funções (EF09MA12)"],
  "Língua Portuguesa": ["Leitura (EF06LP01)", "Produção Textual (EF08LP03)", "Análise Linguística (EF07LP16)", "Compreensão (EF09LP08)"],
};

const difficultyColors = {
  Fácil: "bg-green-500",
  Médio: "bg-yellow-500",
  Difícil: "bg-red-500",
};

export function ExamGeneratorPage() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [subject, setSubject] = useState("Matemática");
  const [grade, setGrade] = useState("8º Ano");
  const [assessmentType, setAssessmentType] = useState("Simulado SAEB");
  const [questionCount, setQuestionCount] = useState(20);
  const [selectedSkills, setSelectedSkills] = useState<string[]>(["Álgebra (EF07MA04)", "Geometria (EF08MA12)"]);
  const [diffDist, setDiffDist] = useState({ Fácil: 30, Médio: 50, Difícil: 20 });
  const [generating, setGenerating] = useState(false);
  const [generated, setGenerated] = useState(false);
  const [examTitle, setExamTitle] = useState("Simulado SAEB – Matemática · 8º Ano");

  const toggleSkill = (skill: string) => {
    setSelectedSkills((prev) =>
      prev.includes(skill) ? prev.filter((s) => s !== skill) : [...prev, skill]
    );
  };

  const handleGenerate = () => {
    setGenerating(true);
    setTimeout(() => {
      setGenerating(false);
      setGenerated(true);
      setStep(3);
    }, 2000);
  };

  const stepLabels = ["Configurar", "Habilidades", "Revisar"];

  return (
    <div className="max-w-4xl space-y-5">
      {/* Header */}
      <div>
        <h1 className="text-xl font-bold text-[#0F172A]">Gerador de Provas</h1>
        <p className="text-sm text-slate-500 mt-0.5">Crie provas equilibradas automaticamente com base nas habilidades SAEB/SPAECE</p>
      </div>

      {/* Stepper */}
      <div className="flex items-center gap-0">
        {stepLabels.map((label, i) => (
          <div key={i} className="flex items-center flex-1">
            <div className="flex items-center gap-2">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all ${
                  step > i + 1
                    ? "bg-[#10B981] text-white"
                    : step === i + 1
                    ? "bg-[#2563EB] text-white"
                    : "bg-gray-100 text-slate-400"
                }`}
              >
                {step > i + 1 ? <CheckCircle2 size={16} /> : i + 1}
              </div>
              <span className={`text-sm font-medium ${step === i + 1 ? "text-[#2563EB]" : step > i + 1 ? "text-[#10B981]" : "text-slate-400"}`}>
                {label}
              </span>
            </div>
            {i < stepLabels.length - 1 && (
              <div className={`flex-1 h-0.5 mx-3 ${step > i + 1 ? "bg-[#10B981]" : "bg-gray-200"}`} />
            )}
          </div>
        ))}
      </div>

      {/* Step 1: Configuration */}
      {step === 1 && (
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 space-y-5">
          <h2 className="font-semibold text-[#0F172A]">Configurações da Prova</h2>
          <div>
            <label className="text-sm font-medium text-[#0F172A] block mb-1.5">Título da prova</label>
            <input
              value={examTitle}
              onChange={(e) => setExamTitle(e.target.value)}
              className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#2563EB]/30 focus:border-[#2563EB]"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-[#0F172A] block mb-1.5">Disciplina</label>
              <select
                value={subject}
                onChange={(e) => {
                  setSubject(e.target.value);
                  setSelectedSkills([]);
                }}
                className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#2563EB]/30 bg-white"
              >
                <option>Matemática</option>
                <option>Língua Portuguesa</option>
              </select>
            </div>
            <div>
              <label className="text-sm font-medium text-[#0F172A] block mb-1.5">Ano Escolar</label>
              <select
                value={grade}
                onChange={(e) => setGrade(e.target.value)}
                className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#2563EB]/30 bg-white"
              >
                <option>6º Ano</option>
                <option>7º Ano</option>
                <option>8º Ano</option>
                <option>9º Ano</option>
              </select>
            </div>
            <div>
              <label className="text-sm font-medium text-[#0F172A] block mb-1.5">Tipo de Avaliação</label>
              <select
                value={assessmentType}
                onChange={(e) => setAssessmentType(e.target.value)}
                className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#2563EB]/30 bg-white"
              >
                <option>Simulado SAEB</option>
                <option>Simulado SPAECE</option>
                <option>Avaliação Diagnóstica</option>
                <option>Prova Bimestral</option>
              </select>
            </div>
            <div>
              <label className="text-sm font-medium text-[#0F172A] block mb-1.5">
                Quantidade de Questões: <span className="text-[#2563EB] font-bold">{questionCount}</span>
              </label>
              <input
                type="range"
                min={5}
                max={40}
                value={questionCount}
                onChange={(e) => setQuestionCount(Number(e.target.value))}
                className="w-full accent-[#2563EB]"
              />
              <div className="flex justify-between text-xs text-slate-400 mt-1">
                <span>5</span><span>40</span>
              </div>
            </div>
          </div>

          {/* Difficulty distribution */}
          <div>
            <label className="text-sm font-medium text-[#0F172A] block mb-3">
              <Sliders size={14} className="inline mr-1" />
              Distribuição por Dificuldade
            </label>
            <div className="space-y-3">
              {(Object.keys(diffDist) as (keyof typeof diffDist)[]).map((d) => (
                <div key={d} className="flex items-center gap-4">
                  <span className="text-sm text-slate-600 w-16">{d}</span>
                  <input
                    type="range"
                    min={0}
                    max={100}
                    value={diffDist[d]}
                    onChange={(e) => setDiffDist({ ...diffDist, [d]: Number(e.target.value) })}
                    className="flex-1 accent-[#2563EB]"
                  />
                  <div className="flex items-center gap-2 w-20">
                    <div className={`w-2 h-2 rounded-full ${difficultyColors[d]}`} />
                    <span className="text-sm font-bold text-[#0F172A] w-10">{diffDist[d]}%</span>
                  </div>
                </div>
              ))}
            </div>
            {/* Visual bar */}
            <div className="flex rounded-full h-3 overflow-hidden mt-3">
              <div className="bg-green-500 transition-all" style={{ width: `${diffDist.Fácil}%` }} />
              <div className="bg-yellow-500 transition-all" style={{ width: `${diffDist.Médio}%` }} />
              <div className="bg-red-500 transition-all" style={{ width: `${diffDist.Difícil}%` }} />
            </div>
          </div>

          <div className="flex justify-end">
            <button
              onClick={() => setStep(2)}
              className="bg-[#2563EB] text-white px-6 py-2.5 rounded-lg text-sm font-medium hover:bg-blue-700 transition-all shadow-sm"
            >
              Próximo: Selecionar Habilidades
            </button>
          </div>
        </div>
      )}

      {/* Step 2: Skills */}
      {step === 2 && (
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 space-y-5">
          <div className="flex items-center justify-between">
            <h2 className="font-semibold text-[#0F172A]">Selecione as Habilidades</h2>
            <span className="text-xs text-slate-500">{selectedSkills.length} selecionadas</span>
          </div>
          <p className="text-sm text-slate-500">Selecione as habilidades que devem ser avaliadas nesta prova. O sistema distribuirá as questões automaticamente.</p>

          <div className="grid gap-2">
            {(skillOptions[subject] || []).map((skill) => {
              const selected = selectedSkills.includes(skill);
              return (
                <button
                  key={skill}
                  onClick={() => toggleSkill(skill)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl border-2 text-left transition-all ${
                    selected
                      ? "border-[#2563EB] bg-blue-50"
                      : "border-gray-200 hover:border-gray-300 hover:bg-gray-50"
                  }`}
                >
                  <div
                    className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-all ${
                      selected ? "border-[#2563EB] bg-[#2563EB]" : "border-gray-300"
                    }`}
                  >
                    {selected && <CheckCircle2 size={12} className="text-white" />}
                  </div>
                  <span className={`text-sm font-medium ${selected ? "text-[#2563EB]" : "text-[#0F172A]"}`}>{skill}</span>
                </button>
              );
            })}
          </div>

          {/* Distribution preview */}
          {selectedSkills.length > 0 && (
            <div className="bg-gray-50 rounded-xl p-4">
              <p className="text-xs font-semibold text-slate-500 mb-3">DISTRIBUIÇÃO ESTIMADA ({questionCount} questões)</p>
              <div className="space-y-2">
                {selectedSkills.map((sk, i) => {
                  const count = Math.round(questionCount / selectedSkills.length);
                  const width = Math.round(100 / selectedSkills.length);
                  const colors = ["#2563EB", "#10B981", "#F59E0B", "#8B5CF6", "#EF4444"];
                  return (
                    <div key={i} className="flex items-center gap-3">
                      <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: colors[i % colors.length] }} />
                      <span className="text-xs text-slate-600 flex-1 truncate">{sk}</span>
                      <span className="text-xs font-medium text-[#0F172A]">{count} questões</span>
                      <div className="w-24 bg-gray-200 rounded-full h-1.5">
                        <div className="h-1.5 rounded-full" style={{ width: `${width}%`, backgroundColor: colors[i % colors.length] }} />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          <div className="flex justify-between">
            <button
              onClick={() => setStep(1)}
              className="px-6 py-2.5 border border-gray-200 rounded-lg text-sm text-slate-600 hover:bg-gray-50 transition-all"
            >
              Voltar
            </button>
            <button
              onClick={handleGenerate}
              disabled={selectedSkills.length === 0 || generating}
              className="flex items-center gap-2 bg-[#2563EB] text-white px-6 py-2.5 rounded-lg text-sm font-medium hover:bg-blue-700 transition-all shadow-sm disabled:opacity-60"
            >
              {generating ? (
                <>
                  <RefreshCw size={15} className="animate-spin" />
                  Gerando prova...
                </>
              ) : (
                <>
                  <Wand2 size={15} />
                  Gerar Prova Automaticamente
                </>
              )}
            </button>
          </div>
        </div>
      )}

      {/* Step 3: Review */}
      {step === 3 && generated && (
        <div className="space-y-4">
          <div className="bg-[#ECFDF5] border border-[#10B981]/30 rounded-xl p-4 flex items-center gap-3">
            <CheckCircle2 size={20} className="text-[#10B981]" />
            <div>
              <p className="text-sm font-semibold text-[#065F46]">Prova gerada com sucesso!</p>
              <p className="text-xs text-[#065F46]/70">{questionCount} questões balanceadas conforme as habilidades selecionadas</p>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="font-bold text-[#0F172A]">{examTitle}</h2>
                <div className="flex items-center gap-3 mt-1">
                  <span className="text-xs text-slate-500">{grade}</span>
                  <span className="text-xs text-slate-300">·</span>
                  <span className="text-xs text-slate-500">{assessmentType}</span>
                  <span className="text-xs text-slate-300">·</span>
                  <span className="text-xs text-slate-500">{questionCount} questões</span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button className="flex items-center gap-2 border border-gray-200 text-slate-600 px-3 py-2 rounded-lg text-sm hover:bg-gray-50 transition-all">
                  <RefreshCw size={14} />
                  Regenerar
                </button>
                <button
                  onClick={() => navigate("/app/exam-library")}
                  className="flex items-center gap-2 bg-[#2563EB] text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-all"
                >
                  <FileText size={14} />
                  Salvar & Visualizar
                </button>
              </div>
            </div>

            {/* Summary cards */}
            <div className="grid grid-cols-4 gap-3 mb-5">
              {[
                { label: "Total de questões", value: questionCount, color: "#2563EB" },
                { label: "Questões Fáceis", value: Math.round(questionCount * diffDist.Fácil / 100), color: "#10B981" },
                { label: "Questões Médias", value: Math.round(questionCount * diffDist.Médio / 100), color: "#F59E0B" },
                { label: "Questões Difíceis", value: Math.round(questionCount * diffDist.Difícil / 100), color: "#EF4444" },
              ].map((s, i) => (
                <div key={i} className="bg-gray-50 rounded-xl p-4 text-center">
                  <div className="text-2xl font-bold" style={{ color: s.color }}>{s.value}</div>
                  <div className="text-xs text-slate-500 mt-0.5">{s.label}</div>
                </div>
              ))}
            </div>

            {/* Sample questions */}
            <div>
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide mb-3">Prévia das Questões</p>
              <div className="space-y-3">
                {[
                  { num: 1, text: "Resolva a equação 3x − 7 = 14 e determine o valor de x.", skill: "EF07MA04", diff: "Fácil", alt: ["x = 5", "x = 7", "x = 3", "x = 9"] },
                  { num: 2, text: "Calcule a área de um triângulo retângulo com catetos de 6cm e 8cm.", skill: "EF08MA12", diff: "Médio", alt: ["24 cm²", "48 cm²", "12 cm²", "36 cm²"] },
                  { num: 3, text: "Em um sistema de equações x + y = 10 e x − y = 4, qual é o valor de x?", skill: "EF09MA12", diff: "Difícil", alt: ["x = 7", "x = 5", "x = 3", "x = 9"] },
                ].map((q) => (
                  <div key={q.num} className="border border-gray-100 rounded-xl p-4 hover:border-gray-200 transition-all">
                    <div className="flex items-start gap-3">
                      <div className="w-7 h-7 rounded-full bg-[#2563EB] text-white flex items-center justify-center text-xs font-bold flex-shrink-0">
                        {q.num}
                      </div>
                      <div className="flex-1">
                        <p className="text-sm text-[#0F172A] mb-2">{q.text}</p>
                        <div className="grid grid-cols-2 gap-1.5">
                          {q.alt.map((a, i) => (
                            <div key={i} className="flex items-center gap-2 text-xs text-slate-600">
                              <span className="w-5 h-5 rounded-full border border-gray-300 flex items-center justify-center text-xs font-medium flex-shrink-0">
                                {String.fromCharCode(65 + i)}
                              </span>
                              {a}
                            </div>
                          ))}
                        </div>
                      </div>
                      <div className="flex flex-col items-end gap-1">
                        <span className="bg-slate-100 text-slate-600 text-xs px-2 py-0.5 rounded font-mono">{q.skill}</span>
                        <span className={`text-xs px-2 py-0.5 rounded font-medium ${q.diff === "Fácil" ? "bg-green-100 text-green-700" : q.diff === "Médio" ? "bg-yellow-100 text-yellow-700" : "bg-red-100 text-red-700"}`}>
                          {q.diff}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
                <div className="text-center py-2">
                  <span className="text-xs text-slate-400">... e mais {questionCount - 3} questões</span>
                </div>
              </div>
            </div>

            <div className="flex gap-3 mt-5 pt-5 border-t border-gray-100">
              <button className="flex items-center gap-2 border border-gray-200 text-slate-600 px-4 py-2 rounded-lg text-sm hover:bg-gray-50 transition-all">
                <BarChart3 size={14} />
                Distribuição de Habilidades
              </button>
              <button
                onClick={() => navigate("/app/exam-library")}
                className="flex items-center gap-2 bg-[#10B981] text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-emerald-600 transition-all ml-auto"
              >
                <FileText size={14} />
                Ir para Biblioteca de Provas
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
