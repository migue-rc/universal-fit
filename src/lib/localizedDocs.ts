import type { Locale } from './i18n';

type LocalizedDocLocale = Exclude<Locale, 'en'>;

const llmBriefBase = {
  rules: '```json\n{\n  "schema_version": "1.0",\n  "plan": {\n    "id": "my-first-plan",\n    "name": "My First Plan",\n    "goal": "general_fitness",\n    "level": "beginner",\n    "duration_weeks": 1,\n    "days_per_week": 1\n  },\n  "weeks": [\n    {\n      "week": 1,\n      "days": [\n        {\n          "day": 1,\n          "name": "Full Body",\n          "blocks": [\n            {\n              "type": "main",\n              "items": [\n                {\n                  "kind": "exercise",\n                  "exercise_ref": "barbell_back_squat",\n                  "sets_template": {\n                    "count": 3,\n                    "set": { "reps": 5, "load": { "rpe": 7 }, "rest_seconds": 180 }\n                  }\n                }\n              ]\n            }\n          ]\n        }\n      ]\n    }\n  ]\n}\n```',
};

export const localizedDocs: Record<LocalizedDocLocale, Record<'llm-brief.md' | 'schema.md', string>> = {
  es: {
    'llm-brief.md': `# Universal Fit — Guía de autoría de planes para LLMs

Estás generando un plan de entrenamiento para la app **Universal Fit**. Este documento resume el formato público del plan. El resultado debe ser un único objeto JSON válido.

> **Reglas críticas**
> 1. Devuelve **solo un objeto JSON**. Sin bloques Markdown ni explicación.
> 2. **No agregues campos desconocidos.** La app rechaza claves inesperadas.
> 3. La versión del esquema debe ser \`"1.0"\`.

## Plan mínimo válido

${llmBriefBase.rules}

Si produces este objeto, tienes un plan válido. Todo lo demás es opcional o aditivo.

## Claves principales

| Clave | Requerida | Propósito |
|---|---|---|
| \`schema_version\` | sí | Debe ser \`"1.0"\`. |
| \`plan\` | sí | Metadatos: nombre, objetivo y duración. |
| \`settings\` | no | Unidades y valores por defecto. |
| \`exercises\` | no | Definiciones de ejercicios personalizados. |
| \`mesocycles\` | no | Agrupación de fases para planes periodizados. |
| \`weeks\` | sí | El programa real. \`weeks.length\` debe coincidir con \`plan.duration_weeks\`. |

## Bloque \`plan\`

\`goal\` debe usar valores canónicos como \`strength\`, \`hypertrophy\`, \`endurance\`, \`fat_loss\`, \`general_fitness\`, \`mobility\` o \`mixed\`.

\`level\` debe ser \`beginner\`, \`intermediate\` o \`advanced\`.

## Estructura

\`weeks -> days -> blocks -> items -> sets\` es la ruta principal. Los códigos de campos se mantienen en inglés porque son parte del contrato JSON.

Los ejercicios de fuerza usan \`sets\` o \`sets_template\`. Los ejercicios de cardio usan \`cardio\` y no deben incluir \`sets\` ni \`sets_template\`.

## Consejos para LLMs

- Mantén \`plan.duration_weeks\` igual a \`weeks.length\`.
- No inventes IDs de ejercicios si puedes usar la biblioteca incluida.
- Si necesitas un ejercicio nuevo, defínelo dentro de \`exercises\`.
- Devuelve JSON completo, no parches parciales.`,
    'schema.md': `# Esquema JSON de planes Universal Fit (v1.0)

Esta referencia describe la forma pública del plan. Los nombres de campos y valores enum se conservan en inglés porque forman parte del contrato de importación.

## Principios

1. **Amigable para LLMs.** Los campos son explícitos y fáciles de leer.
2. **Estricto.** Las claves desconocidas se rechazan y los errores apuntan a la ruta JSON exacta.
3. **Concreto antes que ingenioso.** La progresión semanal se escribe con números reales, no fórmulas mágicas.
4. **Multimodal desde el inicio.** Fuerza, cardio, peso corporal y movilidad son de primera clase.
5. **Capas claras.** \`weeks -> days -> blocks -> items -> sets\`.

## Forma principal

\`\`\`jsonc
{
  "$schema": "https://universalfit.app/schema/v1.0.json",
  "schema_version": "1.0",
  "plan": { /* metadata */ },
  "settings": { /* units, defaults */ },
  "exercises": { /* OPTIONAL inline custom exercises */ },
  "mesocycles": [ /* OPTIONAL phase grouping */ ],
  "weeks": [ /* the program */ ]
}
\`\`\`

## Reglas clave

- \`plan.id\`, \`plan.name\`, \`plan.goal\`, \`plan.level\`, \`plan.duration_weeks\`, \`plan.days_per_week\` y \`weeks\` son obligatorios.
- \`weeks.length\` debe coincidir con \`plan.duration_weeks\`.
- \`day\` es 1-based dentro de la semana y puede no ser consecutivo.
- \`rest_day: true\` marca descanso y puede omitir bloques.
- Un item de fuerza tiene exactamente uno de \`sets\` o \`sets_template\`.
- Un item de cardio usa \`cardio\` y no usa \`sets\`.

## Valores canónicos

\`goal\`: \`strength\`, \`hypertrophy\`, \`endurance\`, \`power\`, \`fat_loss\`, \`general_fitness\`, \`sport_specific\`, \`mobility\`, \`mixed\`.

\`level\`: \`beginner\`, \`intermediate\`, \`advanced\`.

\`block.type\`: \`warmup\`, \`main\`, \`accessory\`, \`finisher\`, \`cooldown\`, \`mobility\`.

## Importación

El validador del sitio y la app usan el mismo contrato. Corrige cualquier error de ruta JSON antes de importar el archivo.`,
  },
  pt: {
    'llm-brief.md': `# Universal Fit — Guia de autoria de planos para LLMs

Você está gerando um plano de treino para o app **Universal Fit**. Retorne um único objeto JSON que siga exatamente o formato.

> **Regras críticas**
> 1. Retorne **apenas um objeto JSON**.
> 2. **Não use campos desconhecidos.**
> 3. A versão do esquema deve ser \`"1.0"\`.

## Plano mínimo válido

${llmBriefBase.rules}

Se você produzir isso, o plano é válido. O restante é opcional.

## Chaves principais

\`schema_version\`, \`plan\` e \`weeks\` são obrigatórios. \`settings\`, \`exercises\` e \`mesocycles\` são opcionais.

\`weeks.length\` deve ser igual a \`plan.duration_weeks\`. Os nomes dos campos ficam em inglês porque são o contrato JSON.

## Estrutura

\`weeks -> days -> blocks -> items -> sets\`.

Exercícios de força usam \`sets\` ou \`sets_template\`. Cardio usa \`cardio\` e não usa \`sets\`.

## Dicas

- Mantenha \`plan.days_per_week\` coerente com os dias planejados.
- Use IDs da biblioteca quando possível.
- Para exercícios novos, defina \`exercises\`.
- Retorne JSON completo, não fragmentos.`,
    'schema.md': `# Esquema JSON de planos Universal Fit (v1.0)

Referência pública do formato de plano. Campos e enums permanecem em inglês para compatibilidade.

## Princípios

1. **Bom para LLMs.**
2. **Estrito.** Campos desconhecidos são rejeitados.
3. **Concreto.** A progressão aparece nos números escritos.
4. **Multimodal.** Força, cardio, peso corporal e mobilidade.
5. **Camadas claras.** \`weeks -> days -> blocks -> items -> sets\`.

## Forma principal

\`\`\`jsonc
{
  "schema_version": "1.0",
  "plan": { /* metadata */ },
  "settings": { /* units, defaults */ },
  "exercises": { /* OPTIONAL inline custom exercises */ },
  "mesocycles": [ /* OPTIONAL phase grouping */ ],
  "weeks": [ /* the program */ ]
}
\`\`\`

## Regras

- \`plan.duration_weeks\` deve bater com \`weeks.length\`.
- \`day\` é 1-based dentro da semana.
- \`rest_day: true\` marca descanso.
- \`exercise\` de força tem \`sets\` ou \`sets_template\`.
- \`cardio\` não combina com \`sets\`.

Enums canônicos: \`goal\`, \`level\`, \`block.type\` e \`kind\` devem usar os valores documentados em inglês.`,
  },
  fr: {
    'llm-brief.md': `# Universal Fit — Guide de création de plans pour LLM

Vous générez un plan d’entraînement pour **Universal Fit**. Retournez un seul objet JSON conforme.

> **Règles critiques**
> 1. Retourner **uniquement un objet JSON**.
> 2. **Aucun champ inconnu.**
> 3. \`schema_version\` doit être \`"1.0"\`.

## Plan minimal valide

${llmBriefBase.rules}

Les champs restent en anglais car ils constituent le contrat d’import.

## Structure

\`weeks -> days -> blocks -> items -> sets\`.

\`plan.duration_weeks\` doit être égal à \`weeks.length\`. Un exercice de force utilise \`sets\` ou \`sets_template\`; un exercice cardio utilise \`cardio\`.

## Conseils

- Garder \`plan.days_per_week\` cohérent.
- Utiliser les IDs d’exercices inclus.
- Définir les exercices personnalisés dans \`exercises\`.
- Retourner le JSON complet.`,
    'schema.md': `# Schéma JSON Universal Fit (v1.0)

Référence publique du format de plan. Les champs et enums restent en anglais pour compatibilité.

## Principes

1. **Lisible par les LLMs.**
2. **Strict.** Les clés inconnues sont rejetées.
3. **Concret.** La progression est écrite explicitement.
4. **Multi-modalité.** Force, cardio, poids du corps et mobilité.
5. **Structure claire.** \`weeks -> days -> blocks -> items -> sets\`.

## Forme principale

\`\`\`jsonc
{
  "schema_version": "1.0",
  "plan": { /* metadata */ },
  "settings": { /* units, defaults */ },
  "exercises": { /* OPTIONAL inline custom exercises */ },
  "mesocycles": [ /* OPTIONAL phase grouping */ ],
  "weeks": [ /* the program */ ]
}
\`\`\`

\`weeks.length\` doit correspondre à \`plan.duration_weeks\`. \`rest_day: true\` marque un jour de repos. Les items de force et cardio ne mélangent pas \`sets\` et \`cardio\`.`,
  },
  de: {
    'llm-brief.md': `# Universal Fit — Plan-Brief für LLMs

Du erzeugst einen Trainingsplan für **Universal Fit**. Gib genau ein gültiges JSON-Objekt zurück.

> **Kritische Regeln**
> 1. **Nur ein JSON-Objekt** zurückgeben.
> 2. **Keine unbekannten Felder.**
> 3. \`schema_version\` muss \`"1.0"\` sein.

## Minimal gültiger Plan

${llmBriefBase.rules}

Feldnamen bleiben Englisch, weil sie der Importvertrag sind.

## Struktur

\`weeks -> days -> blocks -> items -> sets\`.

\`plan.duration_weeks\` muss \`weeks.length\` entsprechen. Kraftübungen nutzen \`sets\` oder \`sets_template\`; Cardio nutzt \`cardio\`.

## Hinweise

- \`plan.days_per_week\` konsistent halten.
- Wenn möglich Übungs-IDs aus der Bibliothek verwenden.
- Eigene Übungen in \`exercises\` definieren.
- Vollständiges JSON zurückgeben.`,
    'schema.md': `# Universal Fit JSON-Schema (v1.0)

Öffentliche Referenz für das Planformat. Felder und Enums bleiben zur Kompatibilität Englisch.

## Prinzipien

1. **LLM-freundlich.**
2. **Streng.** Unbekannte Schlüssel werden abgelehnt.
3. **Konkret.** Progression steht als echte Zahlen im Plan.
4. **Multimodal.** Kraft, Cardio, Körpergewicht und Mobility.
5. **Klare Ebenen.** \`weeks -> days -> blocks -> items -> sets\`.

## Hauptform

\`\`\`jsonc
{
  "schema_version": "1.0",
  "plan": { /* metadata */ },
  "settings": { /* units, defaults */ },
  "exercises": { /* OPTIONAL inline custom exercises */ },
  "mesocycles": [ /* OPTIONAL phase grouping */ ],
  "weeks": [ /* the program */ ]
}
\`\`\`

\`weeks.length\` muss \`plan.duration_weeks\` entsprechen. \`rest_day: true\` markiert Ruhetage. Kraft- und Cardio-Items mischen \`sets\` und \`cardio\` nicht.`,
  },
  it: {
    'llm-brief.md': `# Universal Fit — Guida per piani creati da LLM

Stai generando un piano per **Universal Fit**. Restituisci un solo oggetto JSON valido.

> **Regole critiche**
> 1. Restituisci **solo un oggetto JSON**.
> 2. **Nessun campo sconosciuto.**
> 3. \`schema_version\` deve essere \`"1.0"\`.

## Piano minimo valido

${llmBriefBase.rules}

I nomi dei campi restano in inglese perché sono il contratto di importazione.

## Struttura

\`weeks -> days -> blocks -> items -> sets\`.

\`plan.duration_weeks\` deve corrispondere a \`weeks.length\`. Gli esercizi di forza usano \`sets\` o \`sets_template\`; il cardio usa \`cardio\`.

## Suggerimenti

- Mantieni coerente \`plan.days_per_week\`.
- Usa gli ID esercizio inclusi quando possibile.
- Definisci esercizi personalizzati in \`exercises\`.
- Restituisci JSON completo.`,
    'schema.md': `# Schema JSON Universal Fit (v1.0)

Riferimento pubblico del formato piano. Campi ed enum restano in inglese per compatibilità.

## Principi

1. **Adatto agli LLM.**
2. **Rigoroso.** Chiavi sconosciute rifiutate.
3. **Concreto.** La progressione è scritta con numeri reali.
4. **Multimodale.** Forza, cardio, corpo libero e mobilità.
5. **Livelli chiari.** \`weeks -> days -> blocks -> items -> sets\`.

## Forma principale

\`\`\`jsonc
{
  "schema_version": "1.0",
  "plan": { /* metadata */ },
  "settings": { /* units, defaults */ },
  "exercises": { /* OPTIONAL inline custom exercises */ },
  "mesocycles": [ /* OPTIONAL phase grouping */ ],
  "weeks": [ /* the program */ ]
}
\`\`\`

\`weeks.length\` deve corrispondere a \`plan.duration_weeks\`. \`rest_day: true\` indica riposo. Gli item forza e cardio non mescolano \`sets\` e \`cardio\`.`,
  },
};
