export default function FormField({
  id,
  label,
  optional = false,
  hint,
  error,
  multiline = false,
  registration,
  ...inputProps
}) {
  const hintId = hint ? `${id}-hint` : undefined;
  const errorId = error ? `${id}-error` : undefined;
  const describedBy = [hintId, errorId].filter(Boolean).join(' ') || undefined;
  const Control = multiline ? 'textarea' : 'input';

  return (
    <div className="flex flex-col gap-2">
      <label
        htmlFor={id}
        className="font-mono text-xs uppercase tracking-[0.12em] text-ink-dim"
      >
        {label}
        {optional && <span className="normal-case tracking-normal"> (optional)</span>}
      </label>

      <Control
        id={id}
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy}
        className={`w-full rounded-[2px] border bg-ground-raised px-4 py-3 text-base text-ink transition-colors hover:border-line-strong focus:border-gold ${
          multiline ? 'min-h-36 resize-y' : ''
        } ${error ? 'border-error' : 'border-line'}`}
        {...(multiline ? { rows: 5 } : {})}
        {...registration}
        {...inputProps}
      />

      {hint && (
        <p id={hintId} className="text-sm text-ink-dim">
          {hint}
        </p>
      )}
      {error && (
        <p id={errorId} className="text-sm text-error">
          {error}
        </p>
      )}
    </div>
  );
}
