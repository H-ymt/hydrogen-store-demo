import { ShopPayButton } from "@shopify/hydrogen/react";
import { useEffect } from "react";

import { publishCartViewed } from "~/components/AnalyticsTrackers";
import { CartLineItem } from "~/components/CartDrawer";
import { useCart } from "~/lib/cart";
import { formatPrice } from "~/lib/money";

import type { Route } from "./+types/cart";

export function meta({}: Route.MetaArgs) {
  return [{ title: "Cart · CORE" }];
}

export default function CartRoute() {
  const cart = useCart((state) => state.data);
  const loading = useCart((state) => state.loading);
  const lines = cart.lines.nodes;

  useEffect(() => {
    publishCartViewed(cart);
  }, [cart]);

  return (
    <main
      id="main-content"
      tabIndex={-1}
      className="mx-auto w-full max-w-page flex-1 px-margin py-12"
    >
      <h1 className="type-display mb-8 text-on-surface">Cart</h1>
      {loading ? <p className="text-on-surface-secondary">Loading cart…</p> : null}
      {!loading && lines.length === 0 ? (
        <div>
          <p className="font-medium text-on-surface">Your cart is empty.</p>
          <p className="mt-2 text-sm text-on-surface-secondary">
            Looks like you haven&apos;t added anything to your cart yet.
          </p>
        </div>
      ) : null}
      {lines.length > 0 ? (
        <div className="grid gap-8 lg:grid-cols-[2fr_1fr]">
          <ul role="list" className="divide-y divide-border">
            {lines.map((line) => (
              <CartLineItem key={line.id} line={line} />
            ))}
          </ul>
          <aside className="h-fit rounded border border-border p-4" aria-label="Cart summary">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-on-surface">Estimated total</span>
              <span className="text-base font-medium text-on-surface">
                {formatPrice(cart.cost.totalAmount)}
              </span>
            </div>
            <p className="mt-3 text-xs text-on-surface-secondary">
              Taxes and shipping calculated at checkout
            </p>
            {cart.checkoutUrl ? (
              <div className="mt-4 grid gap-3">
                <ShopPayButton width="100%" borderRadius="8px" />
                <a
                  href={cart.checkoutUrl}
                  className="button-primary inline-flex h-11 w-full items-center justify-center gap-2 rounded-button px-4 text-sm font-medium no-underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent motion-safe:transition-[color,background-color,border-color,transform] motion-safe:active:scale-[0.97]"
                >
                  Checkout
                </a>
              </div>
            ) : null}
          </aside>
        </div>
      ) : null}
    </main>
  );
}
