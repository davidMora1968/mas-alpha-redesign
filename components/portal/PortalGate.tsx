/**
 * The portal door. The firm's working investor portal lives at PFS
 * (connect.pfs-cloud.com), so this door routes partners straight there —
 * never a credential form of our own, which would invite partners to type
 * real passwords into a page that cannot authenticate them.
 */
export function PortalGate() {
  return (
    <div className="flex w-full flex-col items-center gap-10">
      <a
        href="https://connect.pfs-cloud.com/login"
        target="_blank"
        rel="noopener noreferrer"
        className="type-button inline-flex w-full items-center justify-center gap-2.5 rounded-none border border-transparent bg-gold-400 px-9 py-[18px] text-navy-950 no-underline transition-[background-color] duration-[350ms] ease-reveal hover:bg-gold-300"
      >
        Continue to the Investor Portal
      </a>
      <p className="type-caption max-w-[34em] text-balance text-navy-300">
        Access is provisioned personally for partners. For assistance, write to{' '}
        <a
          href="mailto:ir@masalphasecurities.com"
          className="text-gold-300 transition-colors duration-[350ms] ease-reveal hover:text-gold-400"
        >
          ir@masalphasecurities.com
        </a>
        .
      </p>
    </div>
  );
}
