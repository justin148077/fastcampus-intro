import { prisma } from "@/lib/prisma";
import type { ProductListItem } from "@/types/product";

/**
 * 상품 목록 카드용 데이터를 조회한다.
 * 목록 화면에 필요 없는 description 은 가져오지 않는다.
 */
export async function listProducts(): Promise<ProductListItem[]> {
  return prisma.product.findMany({
    select: { id: true, name: true, price: true, imageUrl: true },
    orderBy: { id: "asc" },
  });
}
