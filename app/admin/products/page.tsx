import ProductTable from '@/components/products/ProductTable';
import Heading from '@/components/ui/Heading';
import { prisma } from '@/src/lib/prisma';

async function getProducts(page: number, pageSize: number, skip: number) {
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

  const products = await getProducts(page, pageSize, skip);

  return (
    <>
      <Heading>Administrar Productos</Heading>

      <ProductTable products={products} />
    </>
  );
}
