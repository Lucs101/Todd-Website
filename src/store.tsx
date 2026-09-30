import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from "react";
import { products, type Product } from "./data/products";

/**
 * DEMO STATE ONLY.
 * Cart lives in memory (nothing is stored, sent or processed).
 * There is no checkout, payment, account or order system in this project.
 */

export type CartLine = { productId: string; qty: number };

type Panel = "none" | "cart" | "search" | "account" | "menu";

type Ctx = {
  cart: CartLine[];
  cartCount: number;
  cartTotal: number;
  addToCart: (p: Product, qty?: number) => void;
  setQty: (id: string, qty: number) => void;
  removeFromCart: (id: string) => void;
  panel: Panel;
  openPanel: (p: Panel) => void;
  closePanel: () => void;
  quickView: Product | null;
  openQuickView: (p: Product) => void;
  closeQuickView: () => void;
  toast: string | null;
};

const StoreContext = createContext<Ctx | null>(null);

export function StoreProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartLine[]>([]);
  const [panel, setPanel] = useState<Panel>("none");
  const [quickView, setQuickView] = useState<Product | null>(null);
  const [toast, setToast] = useState<string | null>(null);

  const flash = useCallback((msg: string) => {
    setToast(msg);
    window.clearTimeout((flash as unknown as { t?: number }).t);
    (flash as unknown as { t?: number }).t = window.setTimeout(() => setToast(null), 2600);
  }, []);

  const addToCart = useCallback(
    (p: Product, qty = 1) => {
      setCart((c) => {
        const found = c.find((l) => l.productId === p.id);
        if (found) return c.map((l) => (l.productId === p.id ? { ...l, qty: l.qty + qty } : l));
        return [...c, { productId: p.id, qty }];
      });
      flash(`${p.name} added to your bag`);
    },
    [flash]
  );

  const setQty = useCallback((id: string, qty: number) => {
    setCart((c) => (qty <= 0 ? c.filter((l) => l.productId !== id) : c.map((l) => (l.productId === id ? { ...l, qty } : l))));
  }, []);

  const removeFromCart = useCallback((id: string) => setCart((c) => c.filter((l) => l.productId !== id)), []);

  const value = useMemo<Ctx>(() => {
    const cartCount = cart.reduce((n, l) => n + l.qty, 0);
    const cartTotal = cart.reduce((n, l) => n + l.qty * (products.find((p) => p.id === l.productId)?.price ?? 0), 0);
    return {
      cart,
      cartCount,
      cartTotal,
      addToCart,
      setQty,
      removeFromCart,
      panel,
      openPanel: setPanel,
      closePanel: () => setPanel("none"),
      quickView,
      openQuickView: setQuickView,
      closeQuickView: () => setQuickView(null),
      toast,
    };
  }, [cart, panel, quickView, toast, addToCart, setQty, removeFromCart]);

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
}

export function useStore() {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error("useStore must be used inside StoreProvider");
  return ctx;
}
