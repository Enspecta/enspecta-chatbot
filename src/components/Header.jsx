export default function Header() {
  return (
    <header style={{
      background: 'var(--color-gray)',
      borderBottom: '1px solid var(--border)',
      padding: '0 24px',
      height: 56,
      display: 'flex',
      alignItems: 'center',
      gap: 12,
      flexShrink: 0,
    }}>
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true">
        <rect width="28" height="28" rx="6" fill="var(--color-primary)" />
        <path d="M14 6L22 13H19V22H15V17H13V22H9V13H6L14 6Z" fill="white" />
      </svg>
      <span style={{ fontWeight: 700, fontSize: 15, color: 'var(--color-primary)', letterSpacing: '-0.01em' }}>
        Underhållsplan
      </span>
    </header>
  )
}
