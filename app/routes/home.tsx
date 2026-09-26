import { gql } from "@shopify/hydrogen";
import { Link } from "react-router";

import {
  CollectionCard,
  COLLECTION_CARD_FRAGMENT,
  type CollectionCardData,
} from "~/components/CollectionCard";
import { ProductCard, PRODUCT_CARD_FRAGMENT, type ProductCardData } from "~/components/ProductCard";
import { storefrontClientContext } from "~/lib/storefront";

import type { Route } from "./+types/home";

const HERO = {
  heading: "Discover our latest collection",
  subtitle: "Explore our curated selection of premium products",
  image: {
    url: "https://images.unsplash.com/photo-1653398597732-37fc919284dd?auto=format&fit=crop&w=2000&q=80",
    altText: "A white chair beside a white wall",
  },
  primaryCta: { label: "Shop now", to: "/collections" },
  secondaryCta: { label: "Learn more", href: "#" },
} as const;

const HOME_QUERY = gql(
  `
    query Home {
      products(first: 8, sortKey: BEST_SELLING) {
        nodes {
          ...ProductCard
        }
      }
      collections(first: 3) {
        nodes {
          ...CollectionCard
        }
      }
    }
  `,
  [PRODUCT_CARD_FRAGMENT, COLLECTION_CARD_FRAGMENT],
);

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Home · CORE" },
    {
      name: "description",
      content: "Shop best sellers and featured categories at CORE.",
    },
  ];
}

export async function loader({ context }: Route.LoaderArgs) {
  const storefrontClient = context.get(storefrontClientContext);
  const { data } = await storefrontClient.graphql(HOME_QUERY);

  const featuredProducts: ProductCardData[] = data?.products.nodes ?? [];
  const featuredCollections: CollectionCardData[] = data?.collections.nodes ?? [];

  return {
    featuredProducts,
    featuredCollections,
  };
}

function Hero() {
  return (
    <section className="mx-auto w-full max-w-page px-margin">
      <div
        className="relative bleed-full min-h-hero overflow-hidden"
        aria-labelledby="hero-heading"
      >
        <div className="absolute inset-0 bg-surface-secondary">
          <img
            src={HERO.image.url}
            alt={HERO.image.altText}
            className="h-full w-full object-cover"
            loading="eager"
            fetchPriority="high"
          />
        </div>
        <div className="overlay-dark pointer-events-none absolute inset-0" aria-hidden="true" />
        <div className="relative z-10 mx-auto flex min-h-hero max-w-page flex-col items-start justify-end p-8 px-margin pb-12 text-interactive-text">
          <h1 id="hero-heading" className="type-display mb-3 max-w-2xl">
            {HERO.heading}
          </h1>
          <p className="type-body-lg mb-6 max-w-prose opacity-90">{HERO.subtitle}</p>
          <div className="flex flex-wrap items-center gap-3">
            <Link
              to={HERO.primaryCta.to}
              className="button-primary inline-flex h-11 items-center justify-center gap-2 rounded-button px-5 text-sm font-medium no-underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent motion-safe:transition-[color,background-color,border-color,transform] motion-safe:active:scale-[0.97]"
            >
              {HERO.primaryCta.label}
            </Link>
            <a
              href={HERO.secondaryCta.href}
              className="button-secondary inline-flex h-11 items-center justify-center gap-2 rounded-button px-5 text-sm font-medium no-underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent motion-safe:transition-[color,background-color,border-color,transform] motion-safe:active:scale-[0.97]"
            >
              {HERO.secondaryCta.label}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

function BestSellers({ products }: { products: readonly ProductCardData[] }) {
  return (
    <section className="w-full bg-surface pt-20 pb-12" aria-labelledby="best-sellers-heading">
      <div className="mx-auto mb-4 flex max-w-page items-center justify-between gap-4 px-margin">
        <h2 id="best-sellers-heading" className="type-heading-xl">
          Best sellers
        </h2>
        <Link
          to="/collections"
          className="inline-flex min-h-touch-target items-center gap-1 rounded-sm text-sm font-normal text-on-surface no-underline hover:opacity-70 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent motion-safe:transition-opacity"
        >
          <span>View all</span>
          <span
            className="inline-flex size-4 shrink-0 items-center justify-center"
            aria-hidden="true"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="size-4"
            >
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </span>
        </Link>
      </div>

      {products.length > 0 ? (
        <div className="mx-auto max-w-page px-margin contain-paint">
          <ul
            role="list"
            className="grid grid-cols-1 gap-x-1 gap-y-10 md:grid-cols-2 lg:grid-cols-4"
          >
            {products.map((product) => (
              <li key={product.handle}>
                <ProductCard product={product} />
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </section>
  );
}

function ShopByCategory({ collections }: { collections: readonly CollectionCardData[] }) {
  return (
    <section className="w-full py-12" aria-labelledby="category-heading">
      <h2 id="category-heading" className="type-heading-xl mx-auto mb-4 max-w-page px-margin">
        Shop by category
      </h2>
      {collections.length > 0 ? (
        <ul role="list" className="mx-auto grid max-w-page grid-cols-1 px-margin md:grid-cols-3">
          {collections.map((collection) => (
            <li key={collection.handle}>
              <CollectionCard collection={collection} />
            </li>
          ))}
        </ul>
      ) : null}
    </section>
  );
}

export default function Home({ loaderData }: Route.ComponentProps) {
  return (
    <main className="flex-1" id="main-content" tabIndex={-1}>
      <Hero />
      <BestSellers products={loaderData.featuredProducts} />
      <ShopByCategory collections={loaderData.featuredCollections} />
    </main>
  );
}
