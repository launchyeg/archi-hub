import { FaFacebook, FaInstagram, FaLinkedinIn, FaXTwitter } from "react-icons/fa6";

// One list of Archi Hub's social accounts, used by Contact and the footer.
// PLACEHOLDER: the accounts aren't known yet. Put each profile URL in `href`;
// an icon without a URL is shown but isn't a link.
const SOCIALS = [
  { name: "Facebook", href: null, Icon: FaFacebook },
  { name: "Instagram", href: null, Icon: FaInstagram },
  { name: "X", href: null, Icon: FaXTwitter },
  { name: "LinkedIn", href: null, Icon: FaLinkedinIn },
];

// className: the list; iconClassName: the icon size; itemClassName: each icon's box and colour.
export default function SocialLinks({
  className = "flex items-center gap-1",
  iconClassName = "size-5",
  itemClassName = "size-11 text-ink/85",
}) {
  return (
    <ul className={className} aria-label="Social media">
      {SOCIALS.map((s) => {
        const icon = <s.Icon className={iconClassName} aria-hidden="true" />;
        return (
          <li key={s.name}>
            {s.href ? (
              <a
                href={s.href}
                target="_blank"
                rel="noreferrer"
                aria-label={s.name}
                className={`grid place-items-center rounded-full transition-colors hover:text-gold-bright ${itemClassName}`}
              >
                {icon}
              </a>
            ) : (
              <span title={`${s.name}: link pending`} className={`grid place-items-center ${itemClassName}`}>
                {icon}
                <span className="sr-only">{s.name} (link pending)</span>
              </span>
            )}
          </li>
        );
      })}
    </ul>
  );
}
