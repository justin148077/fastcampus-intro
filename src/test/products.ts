import { prisma } from "@/lib/prisma";

/** 테스트용 상품 데이터. 일부러 id 순서를 섞어 두었다. */
export const testProducts = [
  {
    id: "2",
    name: "원목 도마 세트",
    price: 29000,
    imageUrl: "/images/product-02.png",
    description: "아카시아 원목 대·소 2종 도마 세트입니다.",
  },
  {
    id: "1",
    name: "미니멀 화이트 머그컵",
    price: 12000,
    imageUrl: "/images/product-01.png",
    description: "군더더기 없는 300ml 세라믹 머그컵입니다.",
  },
];

/** products 테이블을 비우고, 주어진 상품만 넣는다. */
export async function resetProducts(data: typeof testProducts = []): Promise<void> {
  await prisma.product.deleteMany();
  if (data.length > 0) {
    await prisma.product.createMany({ data });
  }
}
