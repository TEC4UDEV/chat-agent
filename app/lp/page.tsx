import Link from "next/link";

export const metadata = {
  title: "Chat Agent — Atendimento Inteligente com IA para o seu e-commerce",
  description:
    "Automatize o atendimento do seu e-commerce com um agente de chat com IA. Integração nativa com VTEX, dashboard em tempo real e fácil instalação.",
};

/* ─── Ícones inline ─────────────────────────────────────── */

function IconBot() {
  return (
    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15M14.25 3.104c.251.023.501.05.75.082M19.8 15l-1.57.393A9.065 9.065 0 0112 15a9.065 9.065 0 00-6.23-.607L5 14.5m14.8.5l.208.083a.75.75 0 01-.064 1.386l-.677.226A21.965 21.965 0 0112 17c-2.636 0-5.168-.474-7.268-1.254l-.677-.226a.75.75 0 01-.064-1.386l.209-.083M5 14.5l-.208.083A.75.75 0 004.857 16l.677.226A21.965 21.965 0 0012 17m0 0v4m0-4c2.636 0 5.168-.474 7.268-1.254" />
    </svg>
  );
}

function IconVtex() {
  return (
    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 21v-7.5a.75.75 0 01.75-.75h3a.75.75 0 01.75.75V21m-4.5 0H2.36m11.14 0H18m0 0h3.64m-1.39 0V9.349m-16.5 11.65V9.35m0 0a3.001 3.001 0 003.75-.615A2.993 2.993 0 009.75 9.75c.896 0 1.7-.393 2.25-1.016a2.993 2.993 0 002.25 1.016 2.993 2.993 0 002.25-1.016 3.001 3.001 0 003.75.614m-16.5 0a3.004 3.004 0 01-.621-4.72L4.318 3.44A1.5 1.5 0 015.378 3h13.243a1.5 1.5 0 011.06.44l1.19 1.189a3 3 0 01-.621 4.72m-13.5 8.65h3.75a.375.375 0 00.375-.375v-1.875a.375.375 0 00-.375-.375H6.375a.375.375 0 00-.375.375v1.875c0 .207.168.375.375.375z" />
    </svg>
  );
}

function IconDashboard() {
  return (
    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 3m8.5-3l1 3m0 0l.5 1.5m-.5-1.5h-9.5m0 0l-.5 1.5M9 11.25v1.5M12 9v3.75m3-6.75v6.75" />
    </svg>
  );
}

function IconEmbed() {
  return (
    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5" />
    </svg>
  );
}

function IconAI() {
  return (
    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z" />
    </svg>
  );
}

function IconChat() {
  return (
    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 01.865-.501 48.172 48.172 0 003.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z" />
    </svg>
  );
}

function IconCheck() {
  return (
    <svg className="h-5 w-5 shrink-0 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
    </svg>
  );
}

function IconArrow() {
  return (
    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
    </svg>
  );
}

/* ─── Componentes de seção ───────────────────────────────── */

function Badge({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-blue-700 dark:border-blue-800 dark:bg-blue-950/40 dark:text-blue-300">
      {children}
    </span>
  );
}

function FeatureCard({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="group rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md dark:border-zinc-700 dark:bg-zinc-800/60">
      <div className="mb-4 inline-flex rounded-xl bg-blue-50 p-3 text-blue-600 dark:bg-blue-950/40 dark:text-blue-400">
        {icon}
      </div>
      <h3 className="mb-2 text-base font-semibold text-zinc-900 dark:text-zinc-50">{title}</h3>
      <p className="text-sm leading-relaxed text-zinc-500 dark:text-zinc-400">{description}</p>
    </div>
  );
}

function StepCard({
  step,
  title,
  description,
}: {
  step: string;
  title: string;
  description: string;
}) {
  return (
    <div className="flex gap-4">
      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-blue-600 text-sm font-bold text-white">
        {step}
      </div>
      <div>
        <h3 className="font-semibold text-zinc-900 dark:text-zinc-50">{title}</h3>
        <p className="mt-1 text-sm leading-relaxed text-zinc-500 dark:text-zinc-400">{description}</p>
      </div>
    </div>
  );
}

/* ─── Mock visual do widget ──────────────────────────────── */

function WidgetMock() {
  return (
    <div className="w-full max-w-xs overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-2xl dark:border-zinc-700 dark:bg-zinc-800">
      {/* Header */}
      <div className="flex items-center gap-3 bg-blue-600 px-4 py-3">
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white/20">
          <IconBot />
        </div>
        <div>
          <p className="text-sm font-semibold text-white">Assistente</p>
          <p className="text-xs text-blue-200">Online agora</p>
        </div>
        <div className="ml-auto h-2 w-2 rounded-full bg-green-400" />
      </div>
      {/* Messages */}
      <div className="space-y-3 p-4">
        <div className="flex gap-2">
          <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900">
            <IconBot />
          </div>
          <div className="max-w-[80%] rounded-2xl rounded-tl-none bg-zinc-100 px-3 py-2 text-xs text-zinc-700 dark:bg-zinc-700 dark:text-zinc-200">
            Olá! Como posso ajudar você hoje? 👋
          </div>
        </div>
        <div className="flex justify-end">
          <div className="max-w-[80%] rounded-2xl rounded-tr-none bg-blue-600 px-3 py-2 text-xs text-white">
            Quero rastrear meu pedido
          </div>
        </div>
        <div className="flex gap-2">
          <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900">
            <IconBot />
          </div>
          <div className="max-w-[80%] rounded-2xl rounded-tl-none bg-zinc-100 px-3 py-2 text-xs text-zinc-700 dark:bg-zinc-700 dark:text-zinc-200">
            Claro! Me informe o número do pedido e já consulto para você 🔍
          </div>
        </div>
      </div>
      {/* Input */}
      <div className="border-t border-zinc-100 p-3 dark:border-zinc-700">
        <div className="flex items-center gap-2 rounded-xl border border-zinc-200 bg-zinc-50 px-3 py-2 dark:border-zinc-600 dark:bg-zinc-700">
          <span className="flex-1 text-xs text-zinc-400">Digite sua mensagem…</span>
          <div className="flex h-6 w-6 items-center justify-center rounded-lg bg-blue-600">
            <svg className="h-3 w-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── Mock do dashboard ──────────────────────────────────── */

function DashboardMock() {
  const bars = [40, 65, 50, 80, 60, 90, 75];
  return (
    <div className="w-full overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-2xl dark:border-zinc-700 dark:bg-zinc-800">
      <div className="border-b border-zinc-100 px-5 py-4 dark:border-zinc-700">
        <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-50">Visão geral — últimos 7 dias</p>
      </div>
      <div className="grid grid-cols-3 gap-px bg-zinc-100 dark:bg-zinc-700">
        {[
          { label: "Threads", value: "1.284" },
          { label: "Respondidas", value: "96%" },
          { label: "Custo total", value: "R$ 42,30" },
        ].map((s) => (
          <div key={s.label} className="bg-white px-4 py-3 dark:bg-zinc-800">
            <p className="text-xs text-zinc-500 dark:text-zinc-400">{s.label}</p>
            <p className="mt-0.5 text-lg font-bold text-zinc-900 dark:text-zinc-50">{s.value}</p>
          </div>
        ))}
      </div>
      <div className="flex items-end gap-1.5 px-5 py-5">
        {bars.map((h, i) => (
          <div
            key={i}
            className="flex-1 rounded-t-md bg-blue-500 opacity-80 transition-all"
            style={{ height: `${h * 0.7}px` }}
          />
        ))}
      </div>
      <div className="flex justify-between px-5 pb-4 text-[10px] text-zinc-400">
        {["Seg", "Ter", "Qua", "Qui", "Sex", "Sáb", "Dom"].map((d) => (
          <span key={d}>{d}</span>
        ))}
      </div>
    </div>
  );
}

/* ─── Página principal ───────────────────────────────────── */

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white font-sans text-zinc-900 dark:bg-zinc-950 dark:text-zinc-50">
      {/* Nav */}
      <header className="sticky top-0 z-50 border-b border-zinc-100 bg-white/80 backdrop-blur dark:border-zinc-800 dark:bg-zinc-950/80">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600">
              <IconChat />
            </div>
            <span className="font-bold text-zinc-900 dark:text-zinc-50">Chat Agent</span>
          </div>
          <nav className="hidden items-center gap-6 text-sm text-zinc-500 sm:flex dark:text-zinc-400">
            <a href="#funcionalidades" className="hover:text-zinc-900 dark:hover:text-zinc-50">Funcionalidades</a>
            <a href="#como-funciona" className="hover:text-zinc-900 dark:hover:text-zinc-50">Como funciona</a>
            <a href="#integracoes" className="hover:text-zinc-900 dark:hover:text-zinc-50">Integrações</a>
          </nav>
          <div className="flex items-center gap-3">
            <Link href="/login" className="text-sm font-medium text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-50">
              Entrar
            </Link>
            <Link
              href="/cadastro"
              className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700"
            >
              Começar grátis
            </Link>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden pb-24 pt-20">
        {/* Background glow */}
        <div className="pointer-events-none absolute inset-0 flex justify-center">
          <div className="h-[500px] w-[800px] rounded-full bg-blue-500/10 blur-3xl" />
        </div>

        <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div>
              <Badge>
                <IconAI />
                IA generativa + VTEX
              </Badge>
              <h1 className="mt-5 text-4xl font-extrabold leading-tight tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-5xl lg:text-6xl">
                Atendimento inteligente para o seu{" "}
                <span className="text-blue-600">e-commerce</span>
              </h1>
              <p className="mt-5 text-lg leading-relaxed text-zinc-500 dark:text-zinc-400">
                Um agente de chat com IA que responde clientes, consulta pedidos em
                tempo real na VTEX, aprende sobre seus produtos e gera dados de uso
                para você acompanhar tudo no dashboard.
              </p>
              <ul className="mt-6 space-y-2">
                {[
                  "Instalação em minutos — basta um snippet de código",
                  "Integração nativa com VTEX (pedidos, produtos, estoque)",
                  "Dashboard com threads, custo por conversa e histórico",
                  "Widget personalizável com a identidade da sua marca",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm text-zinc-600 dark:text-zinc-400">
                    <IconCheck />
                    {item}
                  </li>
                ))}
              </ul>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  href="/cadastro"
                  className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-blue-700"
                >
                  Criar conta grátis
                  <IconArrow />
                </Link>
                <a
                  href="#como-funciona"
                  className="inline-flex items-center gap-2 rounded-xl border border-zinc-200 bg-white px-6 py-3 text-sm font-semibold text-zinc-700 hover:bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-200 dark:hover:bg-zinc-700"
                >
                  Ver como funciona
                </a>
              </div>
            </div>
            <div className="flex justify-center lg:justify-end">
              <WidgetMock />
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="funcionalidades" className="bg-zinc-50 py-20 dark:bg-zinc-900">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="mb-12 text-center">
            <Badge><IconAI /> Funcionalidades</Badge>
            <h2 className="mt-4 text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-4xl">
              Tudo que você precisa para<br />automatizar o atendimento
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-zinc-500 dark:text-zinc-400">
              Do widget no site ao painel de controle, cada detalhe foi pensado para facilitar sua operação.
            </p>
          </div>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            <FeatureCard
              icon={<IconBot />}
              title="Agente de Chat com IA"
              description="Responde dúvidas, consulta pedidos, verifica disponibilidade de produtos e guia o cliente — tudo de forma automática, 24 horas por dia."
            />
            <FeatureCard
              icon={<IconVtex />}
              title="Integração VTEX"
              description="Conecta direto com a sua loja VTEX. O agente acessa pedidos, status de entrega e catálogo em tempo real sem precisar de desenvolvimento extra."
            />
            <FeatureCard
              icon={<IconDashboard />}
              title="Dashboard completo"
              description="Acompanhe threads, volume de atendimentos, custo por conversa e histórico de transações em um painel limpo e intuitivo."
            />
            <FeatureCard
              icon={<IconEmbed />}
              title="Widget embedável"
              description="Adicione o chat em qualquer site com dois snippets de código. Personalize cores, nome do bot, avatar e mensagem de boas-vindas."
            />
            <FeatureCard
              icon={<IconAI />}
              title="IA generativa"
              description="Escolha o modelo de IA que melhor atende ao seu negócio. O agente aprende com o contexto do atendimento e melhora continuamente."
            />
            <FeatureCard
              icon={<IconChat />}
              title="Histórico de conversas"
              description="Consulte todas as threads com filtros por data e tipo. Analise padrões de atendimento e identifique pontos de melhoria."
            />
          </div>
        </div>
      </section>

      {/* Como funciona */}
      <section id="como-funciona" className="py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div>
              <Badge><IconEmbed /> Como funciona</Badge>
              <h2 className="mt-4 text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-4xl">
                Do cadastro ao chat<br />em menos de 10 minutos
              </h2>
              <div className="mt-8 space-y-7">
                <StepCard
                  step="1"
                  title="Crie sua conta"
                  description="Cadastro simples com e-mail e senha ou login com Google. Sem cartão de crédito para começar."
                />
                <StepCard
                  step="2"
                  title="Configure o agente"
                  description="Defina nome, cor, avatar e a conta VTEX. Em minutos o agente já conhece seu catálogo e pedidos."
                />
                <StepCard
                  step="3"
                  title="Cole o snippet no seu site"
                  description="Copie o código gerado automaticamente e cole antes do </body> do seu site. Sem mexer em nada mais."
                />
                <StepCard
                  step="4"
                  title="Acompanhe no dashboard"
                  description="Acesse threads, histórico e métricas de custo em tempo real pelo painel."
                />
              </div>
            </div>
            <div className="flex justify-center lg:justify-end">
              <DashboardMock />
            </div>
          </div>
        </div>
      </section>

      {/* Integrações */}
      <section id="integracoes" className="bg-zinc-50 py-20 dark:bg-zinc-900">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="mb-12 text-center">
            <Badge><IconVtex /> Integrações</Badge>
            <h2 className="mt-4 text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-4xl">
              Conectado ao que você já usa
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-zinc-500 dark:text-zinc-400">
              Integração nativa com as principais plataformas — sem APIs manuais, sem complicações.
            </p>
          </div>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                name: "VTEX",
                desc: "Pedidos, status de entrega, catálogo de produtos e estoque consultados em tempo real pelo agente.",
                status: "Disponível",
                color: "green",
              },
              {
                name: "OpenAI / LLMs",
                desc: "Suporte a múltiplos modelos de IA. Escolha o modelo ideal para o seu volume e orçamento.",
                status: "Disponível",
                color: "green",
              },
              {
                name: "Qualquer site",
                desc: "O widget funciona em qualquer frontend — HTML, React, Next.js, VTEX IO, Shopify e mais.",
                status: "Disponível",
                color: "green",
              },
              {
                name: "WhatsApp",
                desc: "Atenda clientes pelo WhatsApp com o mesmo agente e contexto da loja.",
                status: "Em breve",
                color: "amber",
              },
              {
                name: "Shopify",
                desc: "Integração direta com lojas Shopify para consulta de pedidos e produtos.",
                status: "Em breve",
                color: "amber",
              },
              {
                name: "Slack / Notion",
                desc: "Receba alertas e resumos de atendimento diretamente no seu workspace.",
                status: "Em breve",
                color: "amber",
              },
            ].map((int) => (
              <div
                key={int.name}
                className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-700 dark:bg-zinc-800/60"
              >
                <div className="mb-3 flex items-center justify-between">
                  <h3 className="font-semibold text-zinc-900 dark:text-zinc-50">{int.name}</h3>
                  <span
                    className={`rounded-full px-2 py-0.5 text-xs font-semibold ${
                      int.color === "green"
                        ? "bg-green-100 text-green-700 dark:bg-green-950/40 dark:text-green-400"
                        : "bg-amber-100 text-amber-700 dark:bg-amber-950/40 dark:text-amber-400"
                    }`}
                  >
                    {int.status}
                  </span>
                </div>
                <p className="text-sm leading-relaxed text-zinc-500 dark:text-zinc-400">{int.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6">
          <div className="rounded-3xl bg-blue-600 px-8 py-14 shadow-xl">
            <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
              Pronto para automatizar<br />seu atendimento?
            </h2>
            <p className="mt-4 text-lg text-blue-100">
              Crie sua conta gratuitamente e tenha o agente rodando no seu site hoje.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Link
                href="/cadastro"
                className="inline-flex items-center gap-2 rounded-xl bg-white px-7 py-3.5 text-sm font-bold text-blue-600 shadow hover:bg-blue-50"
              >
                Criar conta grátis
                <IconArrow />
              </Link>
              <Link
                href="/login"
                className="inline-flex items-center gap-2 rounded-xl border border-blue-400 px-7 py-3.5 text-sm font-semibold text-white hover:bg-blue-700"
              >
                Já tenho conta
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-zinc-100 py-10 dark:border-zinc-800">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-4 sm:flex-row sm:px-6">
          <div className="flex items-center gap-2">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-blue-600">
              <IconChat />
            </div>
            <span className="text-sm font-semibold text-zinc-700 dark:text-zinc-300">Chat Agent</span>
          </div>
          <p className="text-xs text-zinc-400">
            © {new Date().getFullYear()} Chat Agent. Todos os direitos reservados.
          </p>
          <div className="flex gap-5 text-xs text-zinc-400">
            <Link href="/login" className="hover:text-zinc-700 dark:hover:text-zinc-200">Entrar</Link>
            <Link href="/cadastro" className="hover:text-zinc-700 dark:hover:text-zinc-200">Cadastro</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
