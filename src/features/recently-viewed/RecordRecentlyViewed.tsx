"use client";

import { useEffect } from "react";
import { addRecentlyViewed } from "./recently-viewed.store";

export interface RecordRecentlyViewedProps {
  pokemon: {
    id: number;
    name: string;
    image: string | null;
  };
}

/**
 * Renders nothing. Records the current pokemon as "recently viewed"
 * once, on mount. Lives as a client-component leaf inside the
 * server-rendered pokemon detail page, since the recently-viewed
 * store is client-only (backed by localStorage).
 */
export function RecordRecentlyViewed({
  pokemon,
}: RecordRecentlyViewedProps) {
  useEffect(() => {
    addRecentlyViewed(pokemon);
    // Only re-record if the viewed pokemon's identity actually
    // changes (e.g. navigating from one detail page to another
    // without a full remount).
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pokemon.id]);

  return null;
}
