function Row({ label, value }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', gap: 8, padding: '6px 0', borderBottom: '1px solid var(--border)' }}>
      <span style={{ color: 'var(--text-muted)', fontSize: 13 }}>{label}</span>
      <span style={{ fontWeight: 500, fontSize: 13, textAlign: 'right' }}>{value}</span>
    </div>
  )
}

export default function HouseInfo({ house }) {
  return (
    <section style={{ background: 'var(--color-gray)', borderRadius: 'var(--radius-lg)', padding: 16, marginBottom: 12 }}>
      <h2 style={{ fontSize: 13, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--text-muted)', marginBottom: 10 }}>
        Fastighet
      </h2>
      <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 10 }}>{house.address}</div>
      <Row label="Ort" value={`${house.postalCode} ${house.city}`} />
      <Row label="Byggnadstyp" value={house.buildingType} />
      <Row label="Byggår" value={house.year} />
      <Row label="Boarea" value={`${house.area} m²`} />
      <Row label="Besiktningsdatum" value={house.inspectionDate} />
      <Row label="Besiktningsman" value={house.inspector} />
    </section>
  )
}
