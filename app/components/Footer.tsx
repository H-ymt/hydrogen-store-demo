import { Link } from "react-router";

const linkClass =
  "min-h-touch-target text-on-surface-secondary hover:text-on-surface focus-visible:outline-accent inline-flex items-center font-normal no-underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 motion-safe:transition-colors";

export function Footer() {
  return (
    <footer className="mx-auto w-full max-w-page px-margin">
      <div className="grid grid-cols-1 gap-8 border-t border-border py-12 text-sm md:grid-cols-2 lg:grid-cols-4">
        <div>
          <h2 className="type-body-sm mb-4 font-medium text-on-surface">CORE</h2>
          <p className="text-on-surface-secondary">&copy; 2026 CORE</p>
        </div>
        <nav aria-labelledby="footer-quick-links-heading">
          <h2
            className="type-body-sm mb-4 font-medium text-on-surface"
            id="footer-quick-links-heading"
          >
            Quick links
          </h2>
          <ul role="list" className="flex flex-col gap-2">
            <li>
              <a href="#" className={linkClass}>
                New arrivals
              </a>
            </li>
            <li>
              <a href="#" className={linkClass}>
                Essentials
              </a>
            </li>
            <li>
              <a href="#" className={linkClass}>
                Objects
              </a>
            </li>
          </ul>
        </nav>
        <nav aria-labelledby="footer-customer-care-heading">
          <h2
            className="type-body-sm mb-4 font-medium text-on-surface"
            id="footer-customer-care-heading"
          >
            Customer care
          </h2>
          <ul role="list" className="flex flex-col gap-2">
            <li>
              <Link to="/search" className={linkClass}>
                Search
              </Link>
            </li>
            <li>
              <a href="#" className={linkClass}>
                Account
              </a>
            </li>
          </ul>
        </nav>
        <div>
          <h2 className="type-body-sm mb-4 font-medium text-on-surface">Payment methods</h2>
          <div className="flex flex-wrap items-center gap-2">
            <span className="rounded-sm border border-border px-2 py-1 text-xs text-on-surface-secondary">
              Visa
            </span>
            <span className="rounded-sm border border-border px-2 py-1 text-xs text-on-surface-secondary">
              Mastercard
            </span>
            <span className="rounded-sm border border-border px-2 py-1 text-xs text-on-surface-secondary">
              Shop Pay
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
