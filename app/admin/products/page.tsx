import { redirect } from 'next/navigation';
import ProductsNavigation from '@/components/products/ProductsNavigation';
import ProductTable from '@/components/products/ProductTable';
import Heading from '@/components/ui/Heading';
import { prisma } from '@/src/lib/prisma';

async function productCount() {
  return await prisma.product.count();
}

async function getProducts(pageSize: number, skip: number) {
  const products = await prisma.product.findMany({
    take: pageSize,
    skip,
    include: {
      category: true,
    },
  });
  return products;
}

export type ProductsWithCategory = Awaited<ReturnType<typeof getProducts>>;

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: { page: string };
}) {
  const page = +searchParams.page || 1;
  const pageSize = 10;
  const skip = (page - 1) * pageSize;

  if (page < 0) redirect('/admin/products');

  const productsData = getProducts(pageSize, skip);
  const totalProductsData = productCount();
  const [products, totalProducts] = await Promise.all([
    productsData,
    totalProductsData,
  ]);

  const totalPages = Math.ceil(totalProducts / pageSize);

  if (page > totalPages) redirect('/admin/products');

  return (
    <>
      <Heading>Administrar Productos</Heading>

      <ProductTable products={products} />

      <ProductsNavigation
        page={page}
        totalPages={totalPages}
      />
    </>
  );
}
