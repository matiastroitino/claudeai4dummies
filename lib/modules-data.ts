export type Block =
  | { type: "p"; text: string }
  | { type: "h2"; text: string }
  | { type: "h3"; text: string }
  | { type: "callout"; variant: "info" | "tip" | "warning" | "key"; title: string; text: string }
  | { type: "list"; items: string[] }
  | { type: "code"; lang: string; text: string }
  | { type: "table"; headers: string[]; rows: string[][] }
  | { type: "comparison"; left: { label: string; items: string[] }; right: { label: string; items: string[] } }
  | { type: "analogy"; emoji: string; title: string; text: string }
  | { type: "quiz"; question: string; options: string[]; correct: number; explanation: string };

export interface ModuleData {
  id: string;
  number: string;
  emoji: string;
  title: string;
  subtitle: string;
  time: string;
  level: string;
  prev: string | null;
  next: string | null;
  content: Block[];
}

export const modulesEs: ModuleData[] = [
  {
    id: "01",
    number: "01",
    emoji: "🧠",
    title: "Los Fundamentos",
    subtitle: "Anthropic, modelos y el ecosistema Claude explicados desde cero",
    time: "10 min",
    level: "Básico",
    prev: null,
    next: "02",
    content: [
      {
        type: "analogy",
        emoji: "🏭",
        title: "¿Qué es Anthropic?",
        text: "Piensa en Anthropic como el fabricante. Son la empresa que construyó a Claude, su inteligencia artificial. Igual que Apple hace el iPhone, Anthropic hace Claude. Fundada en 2021 por ex-empleados de OpenAI, su misión es construir IA que sea segura y beneficiosa para la humanidad.",
      },
      {
        type: "p",
        text: "Claude es el nombre del asistente de inteligencia artificial que Anthropic ha creado. No es un producto único — es una familia de modelos con distintas capacidades, velocidades y precios.",
      },
      {
        type: "h2",
        text: "Los tres modelos: Haiku, Sonnet y Opus",
      },
      {
        type: "analogy",
        emoji: "🚗",
        title: "La analogía del vehículo",
        text: "Imagina que necesitas ir de Madrid a Barcelona. Haiku es el patinete eléctrico: rápido para distancias cortas, barato y eficiente. Sonnet es el coche familiar: el equilibrio perfecto entre velocidad, capacidad y coste. Opus es el avión privado: máxima potencia, máximo razonamiento, máximo coste.",
      },
      {
        type: "table",
        headers: ["Modelo", "Velocidad", "Capacidad", "Ideal para"],
        rows: [
          ["Haiku ⚡", "Muy rápido", "Tareas simples", "Respuestas rápidas, clasificación, resúmenes cortos"],
          ["Sonnet 🎯", "Rápido", "Equilibrado", "La mayoría de tareas del día a día — el más usado"],
          ["Opus 🧠", "Más lento", "Razonamiento profundo", "Problemas complejos, análisis técnicos, investigación"],
        ],
      },
      {
        type: "callout",
        variant: "tip",
        title: "Consejo práctico",
        text: "En el 90% de los casos, Sonnet es suficiente. No uses Opus por defecto — consume más tokens y es más lento. Reserva Opus para cuando realmente necesites el máximo razonamiento.",
      },
      {
        type: "h2",
        text: "¿Qué es un token? (y por qué importa tu bolsillo)",
      },
      {
        type: "analogy",
        emoji: "💰",
        title: "Tokens = monedas del contexto",
        text: "Un token es aproximadamente una palabra o parte de una palabra. Cuando hablas con Claude, cada mensaje consume tokens — los tuyos al escribir, y los de Claude al responder. Piénsalo como las monedas de un teléfono público antiguo: cada llamada (mensaje) tiene un coste en monedas (tokens). Cuando se agotan, la línea se corta.",
      },
      {
        type: "p",
        text: "Claude tiene una 'ventana de contexto' — la cantidad máxima de tokens que puede recordar en una conversación. Los modelos actuales tienen ventanas de hasta 200.000 tokens (¡equivalente a una novela completa!). Pero ojo: cuando llegas al límite, el contexto antiguo empieza a perderse.",
      },
      {
        type: "callout",
        variant: "key",
        title: "Concepto clave: context window",
        text: "La ventana de contexto es la 'memoria de trabajo' de Claude. Todo lo que ocurre en una conversación ocupa espacio. Si la conversación es muy larga, Claude puede 'olvidar' lo del principio. Es por eso que en Claude Code se usa el comando /compact para comprimir el historial sin perder lo esencial.",
      },
      {
        type: "h2",
        text: "Las tres herramientas del ecosistema",
      },
      {
        type: "list",
        items: [
          "💬 Claude Chat — El chatbot clásico, pero muchísimo más potente. Disponible en web, móvil y extensión de Chrome.",
          "🏢 Claude Cowork — Agente que trabaja en tu escritorio y tiene acceso a tus archivos locales. Ideal para equipos no técnicos.",
          "⚡ Claude Code — El agente de programación más avanzado. Ejecuta código real, crea proyectos y se despliega a la nube.",
        ],
      },
      {
        type: "callout",
        variant: "info",
        title: "Una sola cuenta, tres herramientas",
        text: "No necesitas cuentas separadas. Con un solo plan de Claude accedes a las tres herramientas. La diferencia está en cómo y cuánto las usas.",
      },
      {
        type: "quiz",
        question: "¿Qué modelo de Claude usarías para redactar 100 resúmenes cortos de artículos rápidamente?",
        options: ["Opus, porque es el más potente", "Haiku, porque es el más rápido y económico", "Sonnet, porque es el más equilibrado", "Da igual, todos son iguales"],
        correct: 1,
        explanation: "¡Correcto! Para tareas repetitivas y simples como resúmenes cortos, Haiku es la elección ideal: es el más rápido, consume menos tokens y tiene un coste mucho menor. Guardar Opus para cuando realmente necesitas razonamiento profundo.",
      },
    ],
  },
  {
    id: "02",
    number: "02",
    emoji: "💬",
    title: "Claude Chat",
    subtitle: "Tu asistente inteligente: cómo sacarle el máximo partido desde el primer día",
    time: "15 min",
    level: "Básico",
    prev: "01",
    next: "03",
    content: [
      {
        type: "p",
        text: "Claude Chat es el punto de entrada más accesible al ecosistema Anthropic. En apariencia parece un chatbot normal — pero esconde una profundidad que la mayoría de usuarios nunca llega a aprovechar.",
      },
      {
        type: "h2",
        text: "Las 3 reglas de oro para prompts efectivos",
      },
      {
        type: "callout",
        variant: "key",
        title: "Regla #1: Sé específico con el contexto",
        text: "❌ 'Escríbeme un email' — demasiado vago\n✅ 'Escríbeme un email formal de seguimiento a un cliente de consultoría que no ha respondido en 2 semanas. El tono debe ser amable pero firme. Máximo 150 palabras.'",
      },
      {
        type: "callout",
        variant: "key",
        title: "Regla #2: Dale un rol",
        text: "Empieza tu prompt con 'Actúa como...' o 'Eres un experto en...' Claude calibra su respuesta según el rol que le asignas. 'Actúa como un abogado mercantil español y revisa este contrato buscando cláusulas problemáticas.'",
      },
      {
        type: "callout",
        variant: "key",
        title: "Regla #3: Especifica el formato",
        text: "Claude puede responder en cualquier formato. Dile exactamente lo que quieres: 'Responde en formato de lista con bullet points', 'Dame la respuesta en una tabla', 'Estructura tu respuesta con: Problema → Causa → Solución'.",
      },
      {
        type: "h2",
        text: "Artifacts: documentos vivos dentro del chat",
      },
      {
        type: "analogy",
        emoji: "📄",
        title: "¿Qué son los Artifacts?",
        text: "Imagina que estás redactando un contrato con tu abogado. En vez de que te lo recite de memoria, te lo escribe en un papel que puedes ver, editar y llevar a casa. Eso son los Artifacts: documentos que Claude crea dentro del chat y que puedes ver en tiempo real, editar directamente y exportar.",
      },
      {
        type: "list",
        items: [
          "Documentos de texto (contratos, informes, emails)",
          "Hojas de cálculo simples",
          "Código con preview en tiempo real",
          "Presentaciones estructuradas",
          "SVGs e imágenes generadas",
        ],
      },
      {
        type: "h2",
        text: "Conectores: Claude conectado con tus apps",
      },
      {
        type: "p",
        text: "En Settings → Conectores puedes vincular Claude con tus aplicaciones favoritas. Una vez conectado, Claude puede leer y escribir en ellas directamente desde el chat.",
      },
      {
        type: "table",
        headers: ["App", "Lo que Claude puede hacer"],
        rows: [
          ["Gmail", "Leer emails, redactar borradores, buscar conversaciones"],
          ["Google Calendar", "Ver eventos, sugerir horarios, crear recordatorios"],
          ["Notion", "Leer páginas, crear contenido, actualizar bases de datos"],
          ["Slack", "Leer mensajes, redactar respuestas, buscar en canales"],
          ["Canva", "Acceder a diseños, describir cambios"],
          ["GitHub", "Leer repositorios, revisar PRs, buscar código"],
        ],
      },
      {
        type: "callout",
        variant: "warning",
        title: "Limitación importante",
        text: "Los conectores del Chat tienen acciones limitadas por diseño (privacidad y seguridad). Por ejemplo, Claude puede redactar un email en Gmail pero no enviarlo sin tu confirmación. Para acciones más amplias, necesitas Claude Code con MCP.",
      },
      {
        type: "h2",
        text: "Skills del chat: especialistas a demanda",
      },
      {
        type: "p",
        text: "Los Skills son instrucciones especializadas preconfiguradas que puedes activar desde claude.com/skills. Funcionan como 'modos experto' instantáneos.",
      },
      {
        type: "quiz",
        question: "Quieres que Claude te ayude a preparar una presentación de ventas. ¿Cuál es el prompt más efectivo?",
        options: [
          "'Hazme una presentación de ventas'",
          "'Actúa como un experto en ventas B2B. Crea una presentación de 10 slides para vender software de RRHH a empresas de 50-200 empleados. Incluye: problema del cliente, solución, ROI y llamada a la acción. Formato: título de slide + puntos clave'",
          "'Necesito una presentación de ventas para mi empresa'",
          "'Ayúdame con ventas'",
        ],
        correct: 1,
        explanation: "La opción 2 aplica las 3 reglas de oro: rol claro (experto en ventas B2B), contexto específico (software de RRHH, empresas 50-200 empleados) y formato definido (10 slides con estructura). Cuanta más información das, mejor resultado obtienes.",
      },
    ],
  },
  {
    id: "03",
    number: "03",
    emoji: "🏢",
    title: "Claude Cowork",
    subtitle: "Tu agente autónomo de oficina: delega tareas completas y recoge el resultado",
    time: "20 min",
    level: "Intermedio",
    prev: "02",
    next: "04",
    content: [
      {
        type: "analogy",
        emoji: "🧑‍💼",
        title: "¿Qué es Cowork, exactamente?",
        text: "Imagina que contratas a un asistente personal brillante que viene a trabajar a tu propia oficina. Tiene acceso a tu escritorio, puede abrir tus carpetas, leer tus archivos, crear nuevos documentos y organizarlo todo. Tú le dices qué quieres conseguir — él se encarga del proceso completo. Eso es Claude Cowork.",
      },
      {
        type: "callout",
        variant: "info",
        title: "Cowork vs Chat — La diferencia fundamental",
        text: "El Chat responde a preguntas. Cowork ejecuta tareas end-to-end. No te dice 'aquí tienes los pasos para organizar tus facturas' — directamente entra en tu carpeta, lee cada archivo y lo organiza. El Chat es consultor. Cowork es un empleado.",
      },
      {
        type: "h2",
        text: "Cómo darle acceso a tus carpetas",
      },
      {
        type: "list",
        items: [
          "Abre la app de escritorio de Claude (claude.com/download)",
          "Ve a la pestaña 'Cowork'",
          "Haz clic en 'Seleccionar carpeta de trabajo'",
          "Elige la carpeta a la que quieres dar acceso",
          "Haz clic en 'Permitir' cuando el OS te lo pida",
          "¡Listo! Ahora puedes darle tareas a Claude sobre esa carpeta",
        ],
      },
      {
        type: "callout",
        variant: "warning",
        title: "Seguridad primero",
        text: "Cowork solo tiene acceso a las carpetas que le des explícitamente. No puede ver tu escritorio entero, tus contraseñas ni archivos fuera del directorio que seleccionas. Anthropic diseña Cowork con 'human oversight' — las decisiones importantes siempre requieren tu confirmación.",
      },
      {
        type: "h2",
        text: "Casos de uso estrella de Cowork",
      },
      {
        type: "table",
        headers: ["Tarea", "Lo que le dices a Claude", "Lo que Claude hace"],
        rows: [
          ["Organizar facturas", "'Entra en la carpeta Facturas2025, renombra cada archivo con: NombreEmpresa-Estado-Fecha, y crea subcarpetas Pagadas y Pendientes'", "Lee cada PDF, extrae los datos clave y organiza todo automáticamente"],
          ["Informe de reunión", "'Aquí tienes 5 grabaciones de reuniones. Crea un informe ejecutivo con los acuerdos tomados y próximos pasos por proyecto'", "Transcribe (si puede), resume, extrae action items y los estructura"],
          ["Análisis de CVs", "'Tengo 40 CVs en esta carpeta. Busca los candidatos con más de 3 años en Python y máster. Crea un Excel con los resultados'", "Lee cada CV, extrae la información relevante y genera el documento"],
          ["Limpieza de archivos", "'Esta carpeta tiene 200 archivos. Elimina duplicados, renombra según formato coherente y archiva lo anterior a 2023'", "Procesa, compara, renombra y reorganiza el archivo completo"],
        ],
      },
      {
        type: "h2",
        text: "Dispatch: controla Cowork desde el móvil",
      },
      {
        type: "p",
        text: "Dispatch es una actualización reciente que te permite controlar y monitorear las tareas de Cowork desde tu smartphone. Dejas el ordenador trabajando y puedes ver el progreso, añadir instrucciones o aprobar decisiones desde cualquier lugar.",
      },
      {
        type: "h2",
        text: "Tareas programadas: tu asistente que nunca olvida",
      },
      {
        type: "analogy",
        emoji: "⏰",
        title: "Como una alarma, pero inteligente",
        text: "Las tareas programadas funcionan como los cron jobs de los programadores — pero explicados para humanos: 'Todos los lunes a las 9:00, genera un resumen de los archivos nuevos de esta semana y envíamelo.' Sin código. Solo lenguaje natural.",
      },
      {
        type: "quiz",
        question: "Tienes 300 contratos en PDF con diferentes formatos. Quieres extraer: cliente, fecha de vencimiento e importe de cada uno. ¿Qué herramienta usas?",
        options: [
          "Claude Chat — le pego los PDFs uno a uno",
          "Claude Cowork — le doy acceso a la carpeta y le digo que extraiga los datos de todos",
          "Claude Code — escribo un script",
          "Lo hago manualmente, es más seguro",
        ],
        correct: 1,
        explanation: "Cowork es la herramienta perfecta para este caso: tiene acceso a la carpeta, puede procesar múltiples archivos de forma autónoma y devolverte un resultado estructurado sin que tengas que hacer nada más. Claude Code también podría hacerlo, pero requiere más configuración. Cowork está diseñado exactamente para esto.",
      },
    ],
  },
  {
    id: "04",
    number: "04",
    emoji: "⚡",
    title: "Claude Code",
    subtitle: "El agente de código más poderoso del mundo — sin necesidad de programar",
    time: "30 min",
    level: "Intermedio",
    prev: "03",
    next: "05",
    content: [
      {
        type: "analogy",
        emoji: "👨‍💻",
        title: "¿Qué hace diferente a Claude Code?",
        text: "La diferencia entre Claude Chat y Claude Code es como la diferencia entre un arquitecto que te dibuja los planos y un arquitecto que también construye la casa. Chat te dice cómo hacer las cosas. Code las hace. Puede abrir archivos, ejecutar programas, crear páginas web completas y desplegarlas en Internet — todo desde una conversación en lenguaje natural.",
      },
      {
        type: "h2",
        text: "Instalación: dos formas de usarlo",
      },
      {
        type: "comparison",
        left: {
          label: "En VS Code / Antigravity (recomendado)",
          items: [
            "Interfaz visual cómoda",
            "Ves los archivos en el sidebar izquierdo",
            "Claude a la derecha en panel dedicado",
            "Ideal para principiantes",
            "Antigravity = VS Code con extras de Google",
          ],
        },
        right: {
          label: "En el Terminal (avanzado)",
          items: [
            "Máximo control y velocidad",
            "Ideal para desarrolladores",
            "Instalar: npm install -g @anthropic-ai/claude-code",
            "Lanzar: cd tu-proyecto && claude",
            "Mismo Claude, distinta interfaz",
          ],
        },
      },
      {
        type: "h2",
        text: "El archivo CLAUDE.md: el cerebro de tu agente",
      },
      {
        type: "analogy",
        emoji: "🧠",
        title: "El CLAUDE.md como system prompt permanente",
        text: "Cuando hablas con Claude Code, hay un archivo oculto que se adjunta a CADA mensaje que envías. Es como si antes de cada pregunta, Claude leyera en secreto unas instrucciones base. Ese archivo es CLAUDE.md — y tú decides qué hay en él.",
      },
      {
        type: "code",
        lang: "markdown",
        text: `# Mi Agente Personal

## Rol
Eres mi asistente de desarrollo web. Tu especialidad es crear 
landing pages modernas con React y Tailwind.

## Mis preferencias
- Código siempre en TypeScript, nunca JavaScript puro
- Comentarios en español
- Tests unitarios con Vitest
- Deploy en Vercel

## Contexto del proyecto
Trabajo en startups de SaaS. Mi stack principal es:
Next.js 15, Tailwind v4, Supabase, Stripe.

## Reglas importantes
- Mantén este archivo en menos de 200 líneas
- Siempre explica brevemente qué cambios has hecho y por qué`,
      },
      {
        type: "callout",
        variant: "tip",
        title: "Regla de oro del CLAUDE.md",
        text: "Manténlo corto y específico. Cada línea del CLAUDE.md se envía con CADA mensaje y consume tokens. Un CLAUDE.md de 500 líneas te agota el contexto rápidamente. Lo ideal: menos de 150-200 líneas, solo lo esencial.",
      },
      {
        type: "h2",
        text: "Los 4 modos de Claude Code",
      },
      {
        type: "table",
        headers: ["Modo", "Qué hace", "Cuándo usarlo"],
        rows: [
          ["📋 Plan", "Solo piensa y planifica, NO ejecuta cambios", "Cuando quieres entender qué va a hacer antes de hacerlo"],
          ["✏️ Auto-edit", "Edita el archivo seleccionado automáticamente", "Para cambios rápidos en un archivo concreto"],
          ["❓ Ask first", "Pregunta antes de cada cambio", "Cuando quieres supervisar cada paso"],
          ["⚡ Bypass", "Ejecuta sin preguntar nada", "Proyectos aislados donde confías en Claude totalmente"],
        ],
      },
      {
        type: "callout",
        variant: "warning",
        title: "Cuidado con Bypass",
        text: "El modo Bypass (bypass permissions) permite a Claude ejecutar cualquier acción sin confirmación, incluyendo borrar archivos. Úsalo SOLO en proyectos aislados donde no haya datos importantes que perder. Para habilitarlo: Settings → 'claude code allow dangerously skip permissions'.",
      },
      {
        type: "h2",
        text: "El Loop: por qué Claude Code es un AGENTE",
      },
      {
        type: "analogy",
        emoji: "🔄",
        title: "La diferencia entre chatbot y agente",
        text: "Un chatbot contesta. Un agente actúa. El loop de Claude Code es: 1) Entiende el objetivo. 2) Actúa. 3) Verifica el resultado. 4) Corrige si hay errores. 5) Repite hasta lograrlo. Este ciclo se repite autónomamente — sin que tú intervengas en cada paso.",
      },
      {
        type: "h2",
        text: "Slash Commands esenciales",
      },
      {
        type: "table",
        headers: ["Comando", "Qué hace"],
        rows: [
          ["/init", "Analiza la carpeta y entiende la estructura del proyecto"],
          ["/plan", "Activa el modo planificación (no ejecuta cambios)"],
          ["/compact", "Comprime el historial de conversación para liberar contexto"],
          ["/clear", "Limpia toda la conversación (nueva sesión)"],
          ["/loop [tiempo]", "Ejecuta un skill cada X minutos automáticamente"],
          ["/cost", "Muestra cuántos tokens has usado en la sesión"],
          ["/memory", "Accede y modifica la memoria del agente"],
        ],
      },
      {
        type: "h2",
        text: "Proyecto en vivo: crea y despliega una web",
      },
      {
        type: "code",
        lang: "bash",
        text: `# 1. Crea una carpeta para tu proyecto
mkdir mi-landing && cd mi-landing

# 2. Lanza Claude Code
claude

# 3. Dile qué quieres (en lenguaje natural):
# "Crea una landing page profesional para una clínica dental.
#  Incluye: hero, servicios, testimonios y formulario de contacto.
#  Diseño moderno con colores azul y blanco. Despliégala en Vercel."

# Claude Code hará TODO el resto: 
# - Genera el código HTML/CSS/JS (o React si quieres)
# - Lo prueba en local
# - Lo conecta a Vercel via MCP
# - Te da la URL pública`,
      },
      {
        type: "callout",
        variant: "info",
        title: "Context Management (gestión del contexto)",
        text: "Cada sesión de Claude Code tiene una ventana de contexto. Cuando se llena al 70-80%, Claude te avisa. Usa /compact para comprimir el historial sin perder lo esencial. Usar /clear reinicia todo — úsalo solo cuando empieces una tarea completamente diferente.",
      },
      {
        type: "quiz",
        question: "Llevas 1 hora trabajando con Claude Code y notas que está 'olvidando' instrucciones del principio de la sesión. ¿Qué haces?",
        options: [
          "Cierro VS Code y empiezo de cero",
          "Uso /compact para comprimir el historial de contexto sin perder lo esencial",
          "Le repito todas las instrucciones desde el principio",
          "Es normal, no hay solución",
        ],
        correct: 1,
        explanation: "/compact es el comando correcto. Comprime toda la conversación anterior en un resumen compacto, liberando espacio de contexto. Así Claude puede seguir trabajando sin 'olvidar' lo importante. Solo usa /clear si quieres empezar una tarea completamente nueva.",
      },
    ],
  },
  {
    id: "05",
    number: "05",
    emoji: "🦾",
    title: "Skills & MCP",
    subtitle: "Los superpoderes de Claude: SOPs, conexiones y automatización sin límites",
    time: "25 min",
    level: "Avanzado",
    prev: "04",
    next: "06",
    content: [
      {
        type: "h2",
        text: "¿Qué es un Skill?",
      },
      {
        type: "analogy",
        emoji: "📋",
        title: "Un Skill es un SOP para tu IA",
        text: "En las empresas, un SOP (Standard Operating Procedure) es un documento que describe paso a paso cómo hacer una tarea — para que cualquier empleado nuevo pueda ejecutarla correctamente desde el primer día. Un Skill de Claude Code es exactamente eso: un documento Markdown que le dice a Claude CÓMO hacer una tarea específica, con qué criterios y en qué formato. La diferencia es que Claude no olvida los SOPs.",
      },
      {
        type: "callout",
        variant: "key",
        title: "Por qué los Skills son críticos",
        text: "Sin Skills, cada vez que le pides a Claude que redacte una propuesta, te pregunta: ¿qué formato? ¿qué tono? ¿qué datos incluir? Con un Skill de 'Crear Propuesta Comercial', ya sabe todo eso — y lo aplica consistentemente cada vez, sin preguntar.",
      },
      {
        type: "h2",
        text: "Anatomía de un Skill",
      },
      {
        type: "code",
        lang: "markdown",
        text: `# SKILL: Crear Propuesta Comercial
# Ubicación: .claude/skills/propuesta-comercial.md

## Cuándo usar este skill
Cuando el usuario pida crear una propuesta, presupuesto o cotización comercial.

## Información requerida (pregunta si falta)
- Nombre del cliente y empresa
- Servicio o producto a ofrecer
- Precio total y forma de pago
- Plazo de entrega

## Proceso
1. Abre el archivo PROPUESTA_TEMPLATE.md como referencia
2. Rellena todos los campos con la información disponible
3. Calcula automáticamente IVA (21%)
4. Genera el documento en formato PDF
5. Guárdalo en /output/propuestas/[NombreCliente]-[Fecha].pdf

## Formato obligatorio
- Encabezado con logo y datos fiscales
- Tabla de servicios detallada
- Totales claros (base + IVA + total)
- Cierre: "Saludos, [Tu nombre]"
- Validez: 30 días desde la fecha`,
      },
      {
        type: "h2",
        text: "El Skills Marketplace",
      },
      {
        type: "p",
        text: "En claude.com/skills encontrarás miles de Skills creados por la comunidad. Puedes instalar un Skill de un solo comando — Claude descarga el repositorio de GitHub y lo configura automáticamente en tu proyecto.",
      },
      {
        type: "code",
        lang: "bash",
        text: `# En Claude Code, di simplemente:
"Instala el skill de N8N desde este repositorio de GitHub: 
[URL del repositorio]"

# Claude Code lo descarga, analiza y configura 
# automáticamente en tu carpeta .claude/skills/`,
      },
      {
        type: "h2",
        text: "¿Qué es MCP? El protocolo que lo conecta todo",
      },
      {
        type: "analogy",
        emoji: "🌐",
        title: "MCP: el traductor universal de apps",
        text: "Antes de MCP, cada aplicación hablaba su propio idioma de integración. Gmail hablaba francés, Notion hablaba alemán, Vercel hablaba japonés. Conectarlas requería trabajo manual o herramientas como Zapier. MCP (Model Context Protocol) es el traductor universal: un estándar único que todas las apps adoptan, y que permite a Claude comunicarse con cualquiera de ellas de forma nativa.",
      },
      {
        type: "callout",
        variant: "info",
        title: "MCP fue creado por Anthropic",
        text: "MCP es un estándar abierto publicado por Anthropic en 2024. Hoy lo adoptan Google, Microsoft, Notion, Vercel, GitHub, Stripe y cientos de herramientas más. Es el USB-C de las integraciones de IA.",
      },
      {
        type: "table",
        headers: ["Herramienta", "Lo que Claude puede hacer via MCP"],
        rows: [
          ["Google Calendar", "Leer, crear y modificar eventos. Detectar conflictos de agenda."],
          ["Gmail", "Leer, redactar Y ENVIAR emails (a diferencia del conector de Chat)"],
          ["Notion", "CRUD completo: leer, crear, editar y eliminar páginas y bases de datos"],
          ["GitHub", "Crear repos, commits, PRs, issues, leer código"],
          ["Vercel", "Crear proyectos, hacer deploy, ver logs, gestionar dominios"],
          ["N8N", "Crear, leer, editar y ejecutar automatizaciones directamente"],
          ["Stripe", "Ver transacciones, crear productos, gestionar suscripciones"],
        ],
      },
      {
        type: "h2",
        text: "Cómo conectar una herramienta via MCP",
      },
      {
        type: "code",
        lang: "bash",
        text: `# En Claude Code, di simplemente:
"Conéctame Notion via MCP. Aquí tienes mi API Key: [tu-api-key]"

# Claude Code configura automáticamente el MCP server.
# Una vez conectado, puedes decir cosas como:
"Crea una nueva página en mi Notion en el espacio 'Marketing'
 con el título 'Informe Q1 2026' y esta estructura: [estructura]"`,
      },
      {
        type: "callout",
        variant: "tip",
        title: "Skills + MCP = automatización total",
        text: "La magia ocurre al combinar ambos. Un Skill define CÓMO hacer algo. MCP da acceso a DÓNDE hacerlo. Ejemplo: Skill de 'Crear vídeo de YouTube' + MCP de Notion = Claude crea automáticamente la ficha del vídeo en tu base de datos de Notion con la estructura exacta que defines, cada vez que lo pidas.",
      },
      {
        type: "quiz",
        question: "Quieres que Claude Code pueda enviar emails directamente (no solo redactarlos). ¿Qué necesitas?",
        options: [
          "Solo usar el conector de Gmail en Claude Chat",
          "Conectar Gmail via MCP en Claude Code — el Chat solo puede redactar, MCP permite enviar",
          "No es posible, Claude nunca puede enviar emails",
          "Pagar el plan Enterprise",
        ],
        correct: 1,
        explanation: "Correcto. Los conectores del Chat tienen capacidades limitadas por diseño (pueden redactar pero no enviar). MCP en Claude Code da acceso completo a la API de Gmail, incluyendo el envío. Esta es una de las diferencias clave entre Chat y Claude Code.",
      },
    ],
  },
  {
    id: "06",
    number: "06",
    emoji: "💰",
    title: "Planes y Precios",
    subtitle: "Compara Free, Pro y Max — y elige el plan que realmente necesitas",
    time: "10 min",
    level: "Básico",
    prev: "05",
    next: "07",
    content: [
      {
        type: "p",
        text: "Elegir el plan correcto puede ahorrarte dinero o desbloquearte productividad que vale mucho más de lo que pagas. Aquí tienes la guía sin rodeos.",
      },
      {
        type: "h2",
        text: "Comparativa completa de planes",
      },
      {
        type: "table",
        headers: ["Característica", "Free", "Pro ($20/mes)", "Max ($100-200/mes)"],
        rows: [
          ["Claude Chat", "✅ Limitado", "✅ 5× más uso", "✅ 20× más uso"],
          ["Claude Code", "❌", "✅ Incluido", "✅ Incluido"],
          ["Claude Cowork", "❌ Básico", "✅ Completo", "✅ Completo"],
          ["Modelos disponibles", "Sonnet básico", "Todos (Haiku, Sonnet, Opus)", "Todos + prioridad"],
          ["Skills & MCP", "❌", "✅", "✅"],
          ["Tareas programadas", "❌", "✅", "✅"],
          ["Límite por sesión", "Bajo", "Normal (5h reset)", "Alto (5h reset)"],
          ["Límite semanal", "Bajo", "Normal", "20× mayor"],
          ["Prioridad horas pico", "❌", "❌", "✅"],
          ["Ideal para", "Probar Claude", "Uso diario individual", "Equipos y power users"],
        ],
      },
      {
        type: "callout",
        variant: "key",
        title: "La regla de decisión",
        text: "¿Usas Claude para trabajar? Pro. ¿Tienes agentes corriendo en paralelo o necesitas más de 4h diarias intensivas? Max. ¿Solo quieres probar? Free.",
      },
      {
        type: "h2",
        text: "Entendiendo los límites de uso",
      },
      {
        type: "analogy",
        emoji: "🚿",
        title: "Tokens como agua caliente",
        text: "Los límites de Claude funcionan como el agua caliente en casa: tienes una cantidad por sesión (como el depósito de agua caliente). Si se agota, esperas 5 horas a que se recarge. Además hay un límite semanal total — como la factura del agua. Max te da un depósito mucho más grande.",
      },
      {
        type: "h2",
        text: "¿Cuándo cambiar de plan?",
      },
      {
        type: "list",
        items: [
          "🔄 Free → Pro: cuando te quedes sin uso regularmente (más de 2-3 veces/semana) o necesites Claude Code",
          "⚡ Pro → Max: cuando tengas múltiples agentes corriendo, alcances el límite semanal, o necesites prioridad en horas pico",
          "💡 Truco: empieza siempre en Pro. La mayoría de usuarios individuales no necesita Max al principio",
        ],
      },
      {
        type: "callout",
        variant: "tip",
        title: "ROI real de Pro ($20/mes)",
        text: "Si Claude te ahorra 1 hora/semana de trabajo (a €25/h), recuperas la inversión en menos de 1 semana. En la práctica, usuarios activos reportan ahorros de 10-20 horas semanales en sus primeros meses.",
      },
      {
        type: "quiz",
        question: "Eres freelancer y usas Claude Code para proyectos de clientes. Alcanzas el límite de Pro 2-3 veces por semana en días intensos. ¿Qué haces?",
        options: [
          "Me quedo con Pro y organizo mejor mi tiempo",
          "Salto a Max — el coste se justifica si generas ingresos con Claude Code",
          "Paso al Free, tampoco es tan importante",
          "Compro tokens de API directamente",
        ],
        correct: 1,
        explanation: "Si estás alcanzando el límite de Pro regularmente en un contexto profesional (generando ingresos), Max se paga solo. $200/mes de Max se recupera con un par de horas de trabajo que Claude te ahorra. La API también es opción para uso programático, pero Max es más sencillo para uso en Claude Code.",
      },
    ],
  },
  {
    id: "07",
    number: "07",
    emoji: "🏆",
    title: "Casos de Uso Reales",
    subtitle: "Inspiración práctica: cómo están usando Claude profesionales como tú",
    time: "15 min",
    level: "Todos",
    prev: "06",
    next: null,
    content: [
      {
        type: "p",
        text: "La mejor manera de entender el potencial de Claude es ver casos reales. Aquí tienes ejemplos concretos por perfil de usuario.",
      },
      {
        type: "h2",
        text: "👨‍💼 Para freelancers",
      },
      {
        type: "list",
        items: [
          "Propuestas y presupuestos personalizados en 5 minutos (Skill de propuesta + template)",
          "Seguimiento automático de clientes por email (MCP de Gmail + tarea programada)",
          "Contratos adaptados a cada proyecto con revisión de cláusulas (Claude Chat)",
          "Informe mensual de horas y facturación generado automáticamente (Cowork + Excel/CSV)",
          "Portfolio con casos de éxito redactados a partir de notas de proyectos (Claude Chat)",
        ],
      },
      {
        type: "h2",
        text: "🏢 Para equipos y empresas",
      },
      {
        type: "list",
        items: [
          "Onboarding de empleados: documentación interna siempre actualizada con Skills",
          "Análisis de encuestas de satisfacción de clientes (Cowork + archivos CSV/Excel)",
          "Sistema de respuesta a preguntas frecuentes de clientes con Skills especializados",
          "Generación de informes de ventas semanales (MCP Sheets + tarea programada lunes 9:00)",
          "Review de contratos de proveedores con lista de verificación de cláusulas críticas",
        ],
      },
      {
        type: "h2",
        text: "📱 Para marketing y contenido",
      },
      {
        type: "list",
        items: [
          "Campañas de Meta Ads: Claude Code conectado a Meta Ads Manager via MCP. Crea, optimiza y pausa campañas en lenguaje natural",
          "Thumbnails de YouTube: Skill especializado + API de modelos de imagen (Imagen, DALL-E)",
          "Calendar editorial de 3 meses generado en 10 minutos a partir de tu nicho y audiencia",
          "Repropósito de contenido: un blog → 10 posts de LinkedIn → 5 tweets → 1 newsletter",
          "SEO: análisis de keywords, meta descriptions y títulos optimizados en batch",
        ],
      },
      {
        type: "h2",
        text: "🎓 Para estudiantes y profesionales",
      },
      {
        type: "list",
        items: [
          "Síntesis de artículos científicos en lenguaje comprensible (Claude Chat + PDFs)",
          "Preparación de oposiciones: resúmenes, preguntas tipo test y casos prácticos",
          "TFG/TFM: estructura, revisión de coherencia, corrección de estilo y citas",
          "Preparación de entrevistas de trabajo: simulaciones con feedback",
          "Traducción y adaptación cultural de documentos técnicos",
        ],
      },
      {
        type: "h2",
        text: "🚀 El futuro: la era del token economy",
      },
      {
        type: "analogy",
        emoji: "⚡",
        title: "Los tokens como la nueva utilidad",
        text: "El CEO de NVIDIA, Jensen Huang, lo llama 'token economy': los tokens de IA serán la próxima gran utilidad básica — como la electricidad o el internet. Las empresas asignarán tokens a equipos como hoy asignan presupuestos. Los profesionales que aprendan a usar IA de forma efectiva tendrán una ventaja competitiva enorme en los próximos años.",
      },
      {
        type: "callout",
        variant: "tip",
        title: "Tu próximo paso",
        text: "No esperes a dominar todo antes de empezar. Elige UN caso de uso concreto de tu día a día y empieza ahí. La curva de aprendizaje de Claude es rápida — en 1 semana estarás ahorrando horas de trabajo.",
      },
      {
        type: "callout",
        variant: "info",
        title: "¡Guía completada! 🎉",
        text: "Has completado todos los módulos de Claude para Dummies. Ahora tienes el conocimiento para aprovechar al máximo el ecosistema Anthropic. ¿El siguiente paso? Abre Claude y practica lo que has aprendido.",
      },
    ],
  },
];

// English version (abbreviated — same structure)
export const modulesEn: ModuleData[] = modulesEs.map((m) => ({
  ...m,
  // in production these would be full English translations
  // for now we reuse ES content so the app builds correctly
}));

export function getModule(locale: string, id: string): ModuleData | undefined {
  const list = locale === "en" ? modulesEn : modulesEs;
  return list.find((m) => m.id === id);
}

export function getAllModuleIds(): string[] {
  return modulesEs.map((m) => m.id);
}
