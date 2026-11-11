// Globo terráqueo en SVG (se usa como logo y como el "0" del 404)
export default function Globe({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 100" className={className} aria-hidden="true">
      <circle cx="50" cy="50" r="46" className="fill-emerald-500" />
      {/* continentes simplificados */}
      <path
        d="M30 22c8-4 16-2 18 4s-6 8-4 14-8 10-14 6-10-10-6-16 2-6 6-8zM58 44c6-2 14 0 16 6s-2 14-8 18-12 2-12-6 0-16 4-18zM62 18c6 0 12 4 10 8s-10 2-12-2 0-6 2-6z"
        className="fill-emerald-800"
      />
      <g fill="none" stroke="white" strokeWidth="2.5" strokeOpacity="0.8">
        <circle cx="50" cy="50" r="46" />
        <ellipse cx="50" cy="50" rx="20" ry="46" />
        <path d="M50 4v92M4 50h92M10 28h80M10 72h80" />
      </g>
    </svg>
  )
}
