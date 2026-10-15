import { Link } from "react-router";

import { useCart } from "~/lib/cart";
import { CART_DRAWER_ID, openDialogFallback } from "~/lib/cart-drawer";

import { MobileNav, MobileNavTrigger, type NavCollection } from "./MobileNav";

function cartCountLabel(count: number) {
  return count === 1 ? "Cart (1 item)" : `Cart (${count} items)`;
}

function liveCartCountLabel(count: number) {
  return count === 1 ? "1 item in cart" : `${count} items in cart`;
}

function displayCount(count: number) {
  return count > 99 ? "99+" : String(count);
}

export function Header({ navCollections }: { navCollections: NavCollection[] }) {
  const totalQuantity = useCart((state) => state.data.totalQuantity);

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-surface">
      <div
        className="mx-auto flex h-16 w-full max-w-page items-center justify-between px-margin"
        data-header-nav-group
      >
        <div className="flex items-center gap-2">
          <div className="-ms-2 hidden max-md:block" data-hamburger-wrapper>
            <MobileNavTrigger />
          </div>
          <Link
            to="/"
            className="inline-flex items-center rounded-sm text-lg font-medium text-on-surface no-underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
          >
            CORE
          </Link>
        </div>

        <nav
          aria-label="Main navigation"
          className="mx-8 hidden min-w-0 flex-1 items-center gap-8 md:flex"
          data-desktop-nav
        >
          {navCollections.map((collection) => (
            <Link
              key={collection.handle}
              to={`/collections/${collection.handle}`}
              className="shrink-0 rounded-sm text-sm font-normal whitespace-nowrap text-on-surface no-underline hover:opacity-70 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent motion-safe:transition-opacity"
            >
              {collection.title}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-0">
          <Link
            to="/search"
            className="button-icon inline-flex h-11 w-11 cursor-pointer items-center justify-center gap-2 rounded font-medium focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent motion-safe:transition-[color,background-color,border-color,transform] motion-safe:active:scale-[0.97]"
            aria-label="Search"
          >
            <img src="/icons/icon-search.svg" alt="" className="size-5" aria-hidden="true" />
          </Link>
          <a
            href="#"
            className="inline-flex h-11 w-11 items-center justify-center rounded text-on-surface hover:opacity-70 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent motion-safe:transition-opacity"
            aria-label="Account"
          >
            <img src="/icons/icon-user.svg" alt="" className="size-5" aria-hidden="true" />
          </a>
          <button
            type="button"
            commandfor={CART_DRAWER_ID}
            command="show-modal"
            className="relative inline-flex h-11 w-11 cursor-pointer items-center justify-center rounded bg-transparent p-0 text-on-surface hover:opacity-70 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent motion-safe:transition motion-safe:active:scale-[0.97]"
            aria-label={cartCountLabel(totalQuantity)}
            aria-controls={CART_DRAWER_ID}
            aria-haspopup="dialog"
            data-testid="cart-trigger"
            onClick={() => openDialogFallback(CART_DRAWER_ID)}
          >
            <span
              className="relative inline-flex size-5 shrink-0 items-center justify-center"
              aria-hidden="true"
            >
              <img src="/icons/icon-cart.svg" alt="" className="size-5" />
              {totalQuantity > 0 ? (
                <span className="absolute end-0 top-0 flex h-5 min-w-5 translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-interactive px-1 text-xs font-medium text-interactive-text">
                  {displayCount(totalQuantity)}
                </span>
              ) : null}
            </span>
          </button>
          <span aria-live="polite" aria-atomic="true" className="sr-only">
            {liveCartCountLabel(totalQuantity)}
          </span>
        </div>
      </div>
      <MobileNav collections={navCollections} />
    </header>
  );
}
