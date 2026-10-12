const OPTIONS = [
  {
    value: 'download',
    title: 'Try the software',
    description: 'Get a download link for our desktop tools by email.',
  },
  {
    value: 'inquiry',
    title: 'I have a question',
    description: 'Ask about a project or about working with us.',
  },
];

export default function NeedChoice({ registration, error }) {
  return (
    <fieldset aria-describedby={error ? 'need-error' : undefined}>
      <legend className="mb-4 text-lg font-bold text-ink">What do you need?</legend>

      <div className="grid gap-3 sm:grid-cols-2">
        {OPTIONS.map((option) => (
          <label
            key={option.value}
            className="group flex cursor-pointer gap-3 rounded-[2px] border border-line p-4 transition-colors hover:border-line-strong has-[:checked]:border-gold has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-gold"
          >
            <input
              type="radio"
              value={option.value}
              className="sr-only"
              {...registration}
            />
            <span
              aria-hidden="true"
              className="mt-1 flex size-4 shrink-0 items-center justify-center rounded-full border border-line-strong group-has-[:checked]:border-gold"
            >
              <span className="size-2 rounded-full bg-gold opacity-0 group-has-[:checked]:opacity-100" />
            </span>
            <span className="flex flex-col gap-1">
              <span className="font-semibold text-ink">{option.title}</span>
              <span className="text-sm text-ink-dim">{option.description}</span>
            </span>
          </label>
        ))}
      </div>

      {error && (
        <p id="need-error" className="mt-2 text-sm text-error">
          {error}
        </p>
      )}
    </fieldset>
  );
}
