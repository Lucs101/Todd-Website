import { useEffect } from "react";
import { useRoute } from "@/router";
import { StoreProvider } from "@/store";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { AccountModal, CartDrawer, QuickView, SearchOverlay, Toast } from "@/components/Overlays";
import Home from "@/pages/Home";
import Shop from "@/pages/Shop";
import Category from "@/pages/Category";
import Product from "@/pages/Product";
import About from "@/pages/About";
import Contact from "@/pages/Contact";
import NotFound from "@/pages/NotFound";

function Routes() {
  const { path } = useRoute();

  // jump to top on navigation
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
  }, [path]);

  const seg = path.split("/").filter(Boolean);
  let page;
  if (seg.length === 0) page = <Home />;
  else if (seg[0] === "shop") page = <Shop />;
  else if (seg[0] === "category" && seg[1]) page = <Category slug={seg[1]} />;
  else if (seg[0] === "product" && seg[1]) page = <Product slug={seg[1]} />;
  else if (seg[0] === "about") page = <About />;
  else if (seg[0] === "contact") page = <Contact />;
  else page = <NotFound />;

  return (
    <>
      <Header />
      {page}
      <Footer />
      <CartDrawer />
      <SearchOverlay />
      <AccountModal />
      <QuickView />
      <Toast />
    </>
  );
}

export default function App() {
  return (
    <StoreProvider>
      <Routes />
    </StoreProvider>
  );
}
