import { useState } from 'react';
import { clientVoices } from '../../content/home.js';
import { monoLabel, serifHeading } from '../../lib/homeType.js';
import PlaceholderTag from '../PlaceholderTag.jsx';
import Reveal from '../Reveal.jsx';

function QuoteCard({ quote, hidden }) {
  return (
    <figure
      aria-hidden={hidden || undefined}
      className="mr-4 flex w-[300px] shrink-0 flex-col rounded-card border border-line bg-ground-raised p-6 sm:w-[340px]"
    >
      <div className="flex items-center justify-between gap-3">
        <span aria-hidden="true" className="font-serif text-[2.5rem] leading-none text-gold">
          “
        </span>
        {quote.placeholder && <PlaceholderTag />}
      </div>
      <blockquote className="mt-4 flex-1 text-ink-dim">{quote.text}</blockquote>
      <figcaption className="mt-6 border-t border-line pt-4">
        <span className="block text-sm font-semibold text-ink">{quote.name}</span>
        <span className="block text-sm text-ink-dim">{quote.role}</span>
      </figcaption>
    </figure>
  );
}

// Each row holds the cards twice so the loop is seamless; the copy is hidden from assistive tech.
function MarqueeRow({ quotes, reverse, paused }) {
  return (
    <div className="marquee-mask overflow-hidden">
      <div
        className={`marquee-track flex w-max ${reverse ? 'marquee-reverse' : ''}`}
        data-paused={paused || undefined}
      >
        {quotes.map((quote) => (
          <QuoteCard key={quote.id} quote={quote} />
        ))}
        {quotes.map((quote) => (
          <QuoteCard key={`${quote.id}-copy`} quote={quote} hidden />
        ))}
      </div>
    </div>
  );
}

export default function ClientVoicesSection() {
  const [paused, setPaused] = useState(false);
  if (!clientVoices.visible) return null;

  const half = Math.ceil(clientVoices.quotes.length / 2);
  const rows = [clientVoices.quotes.slice(0, half), clientVoices.quotes.slice(half)];

  return (
    <section aria-labelledby="voices-title" className="border-t border-line py-24 lg:py-40">
      <div className="mx-auto max-w-[1280px] px-4 text-center sm:px-6">
        <Reveal as="h2" id="voices-title" className={`mx-auto max-w-[20ch] ${serifHeading}`}>
          {clientVoices.heading}
        </Reveal>
        <p className="mx-auto mt-6 max-w-[52ch] text-ink-dim">{clientVoices.intro}</p>
        <button
          type="button"
          onClick={() => setPaused((value) => !value)}
          aria-pressed={paused}
          className={`${monoLabel} mt-8 rounded-full border border-line-strong px-4 py-2 text-ink-dim transition-colors hover:border-gold hover:text-gold motion-reduce:hidden`}
        >
          {paused ? 'Play quotes' : 'Pause quotes'}
        </button>
      </div>

      <div className="mt-12 flex flex-col gap-4">
        <MarqueeRow quotes={rows[0]} paused={paused} />
        <MarqueeRow quotes={rows[1]} paused={paused} reverse />
      </div>
    </section>
  );
}
