
export default function Page() {
  return (
    <main className="bg-background min-h-screen">
      <div className="mx-auto px-4 sm:px-6 lg:px-8 py-10 max-w-7xl">
        <h1 className="font-bold text-2xl">Page content</h1>
        <p className="mt-2 text-muted-foreground">
          The navbar above is sticky, responsive, and includes a logo, menu
          items, a search bar, and an avatar with a hover dropdown that
          links to /profile on click.
        </p>
      </div>
    </main>
  );
}