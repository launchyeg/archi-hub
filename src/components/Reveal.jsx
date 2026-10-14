import { useRevealOnce } from '../lib/useRevealOnce.js';

export default function Reveal({ as: Tag = 'div', className = '', children, ...props }) {
  const ref = useRevealOnce('reveal-pending');

  return (
    <Tag ref={ref} className={`reveal ${className}`} {...props}>
      {children}
    </Tag>
  );
}
