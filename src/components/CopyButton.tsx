import { useState } from 'react';

type Props = {
  text: string;
  label?: string;
  copiedLabel?: string;
  className?: string;
};

export default function CopyButton({ text, label = 'Copy', copiedLabel = 'Copied', className = '' }: Props) {
  const [copied, setCopied] = useState(false);

  async function copy() {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1600);
  }

  return (
    <button
      type="button"
      onClick={copy}
      className={`inline-flex min-h-[var(--button-height)] items-center justify-center rounded-[var(--radius-control)] bg-accent px-5 text-sm font-bold text-on-accent ${className}`}
    >
      {copied ? copiedLabel : label}
    </button>
  );
}
