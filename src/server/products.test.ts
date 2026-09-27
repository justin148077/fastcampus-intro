// @vitest-environment node
import { afterAll, beforeEach, describe, expect, it } from "vitest";
import { prisma } from "@/lib/prisma";
import { resetProducts, testProducts } from "@/test/products";
import { listProducts } from "./products";

describe("listProducts", () => {
  beforeEach(async () => {
    await resetProducts(testProducts);
  });

  afterAll(async () => {
    await resetProducts();
    await prisma.$disconnect();
  });

  it("DB에 저장된 상품을 모두 반환한다", async () => {
    // When
    const products = await listProducts();

    // Then
    expect(products).toHaveLength(2);
  });

  it("id 오름차순으로 정렬해 반환한다", async () => {
    // When
    const products = await listProducts();

    // Then
    expect(products.map((p) => p.id)).toEqual(["1", "2"]);
  });

  it("목록 카드에 필요한 필드만 반환한다 (description 제외)", async () => {
    // When
    const [first] = await listProducts();

    // Then
    expect(first).toEqual({
      id: "1",
      name: "미니멀 화이트 머그컵",
      price: 12000,
      imageUrl: "/images/product-01.png",
    });
  });

  it("상품이 없으면 빈 배열을 반환한다", async () => {
    // Given
    await resetProducts();

    // When
    const products = await listProducts();

    // Then
    expect(products).toEqual([]);
  });
});
