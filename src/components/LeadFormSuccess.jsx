import { useEffect, useRef } from 'react';

export default function LeadFormSuccess({ lead, onReset }) {
  const headingRef = useRef(null);

  useEffect(() => {
    headingRef.current?.focus();
  }, []);

  const isDownload = lead.type === 'download';

  return (
    <div role="status" className="flex flex-col items-start gap-4 border-t border-ok pt-6">
      <h3 ref={headingRef} tabIndex={-1} className="text-xl font-bold text-ink">
        {isDownload ? 'Check your inbox' : 'Thanks, your question is in'}
      </h3>
      <p className="max-w-[65ch] text-ink-dim">
        {isDownload ? (
          <>
            A download link is on its way to <span className="text-ink">{lead.email}</span>.
            If it doesn't arrive, check your spam folder.
          </>
        ) : (
          <>
            We've received your question and will reply to{' '}
            <span className="text-ink">{lead.email}</span>.
          </>
        )}
      </p>
      <button
        type="button"
        onClick={onReset}
        className="text-sm text-gold underline underline-offset-4 transition-colors hover:text-gold-bright"
      >
        Send another request
      </button>
    </div>
  );
}
