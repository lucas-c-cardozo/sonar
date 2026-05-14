const teamMembers = ['Isadora Porto', 'Lucas Cardozo', 'Luiz Edson', 'Gabriel Sandes'];
const professor = 'Prof. Italo Carlo';

export function Footer() {
  return (
    <footer
      className="mt-16 py-10 border-t"
      style={{ borderColor: 'var(--border-color)', background: 'var(--bg-surface)' }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center md:items-start justify-between gap-8">
          {/* Brand */}
          <div className="flex flex-col items-center md:items-start gap-2">
            <div
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl"
              style={{ background: '#917AC7' }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="white">
                <path d="M8 5v14l11-7z" />
              </svg>
              <span className="text-lg font-extrabold text-white tracking-wider">
                SONAR
              </span>
            </div>
            <p className="text-xs" style={{ color: 'var(--text-muted)' }}>
              Seu catálogo musical colaborativo
            </p>
          </div>

          {/* Team */}
          <div className="text-center md:text-left">
            <p className="text-xs font-semibold uppercase tracking-widest mb-2" style={{ color: 'var(--text-muted)' }}>
              Equipe
            </p>
            <ul className="flex flex-col gap-1">
              {teamMembers.map((name) => (
                <li key={name} className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                  {name}
                </li>
              ))}
            </ul>
          </div>

          {/* Professor + IFAL */}
          <div className="flex flex-col items-center md:items-end gap-3">
            <div className="text-center md:text-right">
              <p className="text-xs font-semibold uppercase tracking-widest mb-1" style={{ color: 'var(--text-muted)' }}>
                Orientação
              </p>
              <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>{professor}</p>
            </div>
            {/* IFAL Logo placeholder */}
            <div
              className="flex items-center gap-2 px-3 py-1.5 rounded-lg"
              style={{ background: 'var(--bg-primary)', border: '1px solid var(--border-color)' }}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <rect width="24" height="24" rx="4" fill="#1a6b3c" />
                <text x="3" y="17" fontSize="10" fill="white" fontWeight="bold">IF</text>
              </svg>
              <span className="text-xs font-semibold" style={{ color: 'var(--text-secondary)' }}>IFAL</span>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-4 text-center text-xs" style={{ borderTop: '1px solid var(--border-color)', color: 'var(--text-muted)' }}>
          © {new Date().getFullYear()} Sonar · IFAL — Instituto Federal de Alagoas
        </div>
      </div>
    </footer>
  );
}
