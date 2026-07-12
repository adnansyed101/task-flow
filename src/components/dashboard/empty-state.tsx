function EmptyState({ title, hint }: { title: string; hint?: string }) {
  return (
    <div className="rounded-2xl border border-dashed border-border p-12 text-center">
      <div className="font-medium">{title}</div>
      {hint && <div className="mt-1 text-sm text-muted-foreground">{hint}</div>}
    </div>
  )
}

export default EmptyState
