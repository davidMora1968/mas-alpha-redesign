import { Button } from '@/components/ui/Button';
import { Eyebrow } from '@/components/ui/Eyebrow';

export default function NotFound() {
  return (
    <main className="gutter flex min-h-screen flex-col items-center justify-center gap-10 bg-navy-950 text-center">
      <Eyebrow rule={false}>Page not found</Eyebrow>
      <h1 className="type-display-lg max-w-[14em] text-balance text-stone-50">
        There is nothing at this address.
      </h1>
      <p className="type-lede max-w-[28em] text-navy-100">
        What we own endures. This page does not.
      </p>
      <Button size="lg" href="/">
        Return to the Firm
      </Button>
    </main>
  );
}
