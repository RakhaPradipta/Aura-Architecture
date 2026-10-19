export default function TeamMemberLoading() {
  return (
    <>
      {/* Hero skeleton */}
      <section className="relative h-[85vh] min-h-[600px] overflow-hidden bg-ink-100 animate-pulse" />

      {/* Content skeleton */}
      <section className="section-padding-y">
        <div className="section-padding">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
            <div className="lg:col-span-4 space-y-4">
              <div className="h-3 w-32 bg-ink-950/10 rounded" />
              <div className="h-6 w-48 bg-ink-100 rounded" />
            </div>
            <div className="lg:col-span-8 space-y-3">
              <div className="h-4 w-full bg-ink-100 rounded" />
              <div className="h-4 w-full bg-ink-100 rounded" />
              <div className="h-4 w-2/3 bg-ink-100 rounded" />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
