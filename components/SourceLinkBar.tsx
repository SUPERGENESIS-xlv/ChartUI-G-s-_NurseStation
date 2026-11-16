'use client';

import { FormEvent, useState } from 'react';
import { ArrowUpRight, Link2 } from 'lucide-react';

export default function SourceLinkBar() {
  const [source, setSource] = useState('');
  const [error, setError] = useState('');

  function openSource(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError('');

    try {
      const url = new URL(source.trim());
      if (url.protocol !== 'http:' && url.protocol !== 'https:') {
        throw new Error('Unsupported protocol');
      }
      window.open(url.toString(), '_blank', 'noopener,noreferrer');
    } catch {
      setError('有効な http:// または https:// のURLを入力してください。');
    }
  }

  return (
    <header className="relative z-40 border-b-4 border-orange-400 bg-[#071d5c] px-4 py-3 text-white sm:px-8">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center gap-4">
        <a href="/" aria-label="ChartUI ホーム" className="shrink-0 text-3xl font-black tracking-[-0.07em] sm:text-4xl">
          ChartUI
        </a>
        <form onSubmit={openSource} className="flex min-w-[min(100%,18rem)] flex-1 items-center gap-2 sm:ml-4">
          <label htmlFor="source-link" className="sr-only">論文・プレスリリースのURL</label>
          <div className="flex min-w-0 flex-1 items-center gap-2 rounded-md border border-white/30 bg-white px-3 text-slate-900 focus-within:ring-2 focus-within:ring-orange-300">
            <Link2 aria-hidden="true" className="h-4 w-4 shrink-0 text-slate-500" />
            <input
              id="source-link"
              type="url"
              inputMode="url"
              value={source}
              onChange={(event) => { setSource(event.target.value); setError(''); }}
              placeholder="論文・プレスリリースのURLを入力"
              className="min-w-0 flex-1 bg-transparent py-2 text-sm outline-none placeholder:text-slate-500"
              aria-describedby={error ? 'source-link-error' : undefined}
            />
          </div>
          <button type="submit" className="inline-flex shrink-0 items-center gap-1 rounded-md bg-orange-400 px-3 py-2 text-sm font-semibold text-slate-950 transition hover:bg-orange-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white">
            開く <ArrowUpRight aria-hidden="true" className="h-4 w-4" />
          </button>
        </form>
      </div>
      {error && <p id="source-link-error" role="alert" className="mx-auto mt-2 max-w-7xl font-mono text-xs text-orange-100">{error}</p>}
    </header>
  );
}
