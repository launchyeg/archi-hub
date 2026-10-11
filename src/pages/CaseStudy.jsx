import { useParams } from 'react-router-dom';

export default function CaseStudy() {
  const { slug } = useParams();

  return (
    <main className="mx-auto max-w-[1280px] px-4 py-24 sm:px-6">
      <h1 className="text-[length:var(--text-xl)] font-extrabold text-ink">Case Study: {slug}</h1>
    </main>
  );
}
