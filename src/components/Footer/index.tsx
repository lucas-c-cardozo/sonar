import Image from "next/image";

const teamMembers = ['Isadora Porto', 'Lucas Cardozo', 'Luiz Edson', 'Gabriel Sandes'];
const professor = 'Prof. Italo Carlo';

export function Footer() {
  return (
    <footer className="mt-16 py-10 border-t border-border bg-bg-surface">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center md:items-start justify-between gap-8">
          {/* Brand */}
          <div className="flex flex-col items-center md:items-start gap-2">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-bg-surface-alt">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="white">
                <path d="M8 5v14l11-7z" />
              </svg>
              <span className="text-lg font-extrabold text-white tracking-wider">
                SONAR
              </span>
            </div>
            <p className="text-xs text-text-secondary">
              Seu catálogo musical colaborativo
            </p>
          </div>

          {/* Team */}
          <div className="text-center md:text-left">
            <p className="text-xs text-text-muted font-semibold uppercase tracking-widest mb-2">
              Equipe
            </p>
            <ul className="flex flex-col gap-1">
              {teamMembers.map((name) => (
                <li key={name} className="text-sm text-text-secondary">
                  {name}
                </li>
              ))}
            </ul>
          </div>

          {/* Professor + IFAL */}
          <div className="flex flex-col items-center md:items-end gap-3">
            <div className="text-center md:text-right">
              <p className="text-xs text-text-muted font-semibold uppercase tracking-widest mb-1">
                Orientação
              </p>
              <p className="text-sm text-text-secondary">{professor}</p>
            </div>
            {/* IFAL Logo placeholder */}
            <div className="flex items-center rounded-lg bg-bg-primary border border-solid border-border-color">
              <Image
                src="https://www2.ifal.edu.br/o-ifal/comunicacao/arquivos/logos/logos-arapiraca/novo-logo_arapiraca_hor-color.png"
                width={400}
                height={400}
                alt="logo ifal"
                className="size-auto max-w-50"
              />
            </div>
          </div>
        </div>

        <div className="mt-8 pt-4 text-center text-xs text-text-muted border-t border-solid border-border-color">
          © {new Date().getFullYear()} Sonar · IFAL — Instituto Federal de Alagoas
        </div>
      </div>
    </footer>
  );
}
