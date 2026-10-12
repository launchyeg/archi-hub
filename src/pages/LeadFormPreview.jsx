import LeadForm from '../components/LeadForm.jsx';

export default function LeadFormPreview() {
  return (
    <main className="mx-auto max-w-[1280px] px-4 py-24 sm:px-6">
      <p className="mb-8 font-mono text-xs uppercase tracking-[0.12em] text-ink-dim">
        Dev preview, not a public page
      </p>
      <div className="max-w-[720px]">
        <LeadForm />
      </div>
    </main>
  );
}
