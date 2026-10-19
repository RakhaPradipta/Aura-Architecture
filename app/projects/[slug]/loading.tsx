export default function ProjectLoading() {
  return (
    <>
      {/* Hero skeleton */}
      <section className="relative h-[80vh] min-h-[500px] overflow-hidden bg-ink-100 animate-pulse" />

      {/* Info bar skeleton */}
      <section className="border-b border-ink-950/10">
        <div className="section-padding py-6">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i}>
                <div className="h-3 w-16 bg-ink-950/10 rounded" />
                <div className="h-4 w-24 bg-ink-100 rounded mt-2" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Content skeleton */}
      <section className="section-padding-y">
        <div className="section-padding">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
            <div className="lg:col-span-5 space-y-4">
              <div className="h-3 w-20 bg-ink-950/10 rounded" />
              <div className="h-8 w-64 bg-ink-100 rounded" />
              <div className="space-y-3 mt-6">
                <div className="h-4 w-full bg-ink-100 rounded" />
                <div className="h-4 w-full bg-ink-100 rounded" />
                <div className="h-4 w-3/4 bg-ink-100 rounded" />
              </div>
            </div>
            <div className="lg:col-span-7">
              <div className="aspect-[16/9] w-full bg-ink-100 rounded animate-pulse" />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
