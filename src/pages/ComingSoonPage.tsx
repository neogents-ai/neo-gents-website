interface Props {
  title: string
}

export default function ComingSoonPage({ title }: Props) {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center px-6 text-center">
      <p className="font-mono text-[9px] tracking-[0.3em] uppercase mb-4" style={{ color: 'rgba(0,179,89,0.4)' }}>
        {title}
      </p>
      <h1 className="font-display font-800 text-4xl md:text-5xl text-light mb-4">Coming Soon</h1>
      <p className="font-body text-sm text-muted max-w-sm">
        This page is being built. Check back soon.
      </p>
    </div>
  )
}
