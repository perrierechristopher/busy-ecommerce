import { Carousel } from 'components/carousel';
import CategoriesGrid from 'components/grid/categories';
import { ThreeItemGrid } from 'components/grid/three-items';
import Footer from 'components/layout/footer';

export const metadata = {
  description: 'High-performance ecommerce store built with Next.js, Vercel, and Shopify.',
  openGraph: {
    type: 'website'
  }
};

export default function HomePage() {
  return (
    <>
      {/* <ThreeItemGrid /> */}
      <CategoriesGrid />
      <Carousel />
      <Footer />
    </>
  );
}
