import { useMemo, useState } from 'react';
import { formatPlanIssues, planJsonSchema } from '../lib/planSchema';

type Props = {
  initialJson: string;
  labels?: {
    pasteJson: string;
    valid: string;
    needsFixes: string;
    titleInvalid: string;
    messageInvalid: string;
    titleParse: string;
    messageParse: string;
    downloadValid: string;
  };
};

const defaultLabels = {
  pasteJson: 'Paste plan JSON',
  valid: 'Valid',
  needsFixes: 'Needs fixes',
  titleInvalid: 'Plan did not validate',
  messageInvalid: 'Fix these schema issues and try again.',
  titleParse: 'JSON parse error',
  messageParse: 'The pasted value is not valid JSON.',
  downloadValid: 'Download valid plan',
};

export default function PlanValidator({ initialJson, labels = defaultLabels }: Props) {
  const [value, setValue] = useState(initialJson);

  const result = useMemo(() => {
    try {
      const parsed = JSON.parse(value);
      const checked = planJsonSchema.safeParse(parsed);
      if (checked.success) {
        return {
          ok: true,
          title: checked.data.plan.name,
          message: `${checked.data.plan.duration_weeks} weeks · ${checked.data.plan.days_per_week} days/week · ${checked.data.plan.level}`,
          issues: [],
        };
      }
      return {
        ok: false,
        title: labels.titleInvalid,
        message: labels.messageInvalid,
        issues: formatPlanIssues(checked.error),
      };
    } catch (error) {
      return {
        ok: false,
        title: labels.titleParse,
        message: error instanceof Error ? error.message : labels.messageParse,
        issues: [],
      };
    }
  }, [labels, value]);

  function downloadJson() {
    if (!result.ok) return;
    const blob = new Blob([value], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'universal-fit-plan.json';
    link.click();
    URL.revokeObjectURL(url);
  }

  return (
    <div className="grid gap-5 lg:grid-cols-[1fr_24rem]">
      <label className="grid gap-3 text-sm font-semibold text-white">
        {labels.pasteJson}
        <textarea
          value={value}
          onChange={(event) => setValue(event.target.value)}
          spellCheck={false}
          className="min-h-[28rem] resize-y rounded-[var(--radius-card)] border border-subtle bg-app p-4 font-mono text-sm leading-6 text-white outline-none focus:border-accent"
        />
      </label>
      <aside className="surface-card h-fit p-5">
        <div className={`mb-4 inline-flex rounded-[6px] px-2.5 py-1 text-xs font-bold uppercase ${result.ok ? 'bg-success-soft text-success' : 'bg-[rgba(255,69,69,0.12)] text-danger'}`}>
          {result.ok ? labels.valid : labels.needsFixes}
        </div>
        <h2 className="text-2xl font-black text-white">{result.title}</h2>
        <p className="mt-3 leading-7 text-muted">{result.message}</p>
        {result.issues.length > 0 && (
          <ul className="mt-5 grid gap-3">
            {result.issues.map((issue) => (
              <li key={issue} className="rounded-[var(--radius-card)] border border-subtle bg-app p-3 text-sm leading-6 text-muted">
                {issue}
              </li>
            ))}
          </ul>
        )}
        <button
          onClick={downloadJson}
          disabled={!result.ok}
          className="mt-6 inline-flex min-h-[var(--button-height)] w-full items-center justify-center rounded-[var(--radius-control)] bg-accent px-4 text-sm font-bold text-on-accent disabled:cursor-not-allowed disabled:bg-surface-raised disabled:text-faint"
        >
          {labels.downloadValid}
        </button>
      </aside>
    </div>
  );
}
