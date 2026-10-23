import { LuFacebook, LuInstagram, LuLinkedin, LuTwitter } from "react-icons/lu";
import { socials } from "../../content/company.js";

const ICONS = {
  Facebook: LuFacebook,
  Instagram: LuInstagram,
  X: LuTwitter,
  LinkedIn: LuLinkedin,
};

export default function SocialLinks({
  className = "flex items-center gap-1",
  iconClassName = "size-5",
  itemClassName = "size-11 text-ink/85",
}) {
  return (
    <ul className={className} aria-label="Social media">
      {socials.map((s) => {
        const Icon = ICONS[s.name];
        const icon = <Icon className={iconClassName} aria-hidden="true" />;
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
              <span
                title={`${s.name}: link pending`}
                className={`grid place-items-center ${itemClassName}`}
              >
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
