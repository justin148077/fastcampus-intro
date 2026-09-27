// @vitest-environment node
import { afterAll, afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { prisma } from "@/lib/prisma";
import { resetProducts, testProducts } from "@/test/products";
import type { ApiErrorResponse, ProductListResponse } from "@/types/product";
import { GET } from "./route";

describe("GET /api/products", () => {
  beforeEach(async () => {
    await resetProducts(testProducts);
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  afterAll(async () => {
    await resetProducts();
    await prisma.$disconnect();
  });

  it("200 상태로 응답한다", async () => {
    // When
    const response = await GET();

    // Then
    expect(response.status).toBe(200);
  });

  it("DB에 저장된 상품 목록을 products 키로 내려준다", async () => {
    // When
    const body = (await (await GET()).json()) as ProductListResponse;

    // Then
    expect(body).toEqual({
      products: [
        { id: "1", name: "미니멀 화이트 머그컵", price: 12000, imageUrl: "/images/product-01.png" },
        { id: "2", name: "원목 도마 세트", price: 29000, imageUrl: "/images/product-02.png" },
      ],
    });
  });

  it("조회에 실패하면 500 상태로 응답한다", async () => {
    // Given
    vi.spyOn(console, "error").mockImplementation(() => {});
    vi.spyOn(prisma.product, "findMany").mockRejectedValueOnce(new Error("DB 연결 실패"));

    // When
    const response = await GET();

    // Then
    expect(response.status).toBe(500);
  });

  it("조회에 실패하면 한글 오류 메시지를 내려준다", async () => {
    // Given
    vi.spyOn(console, "error").mockImplementation(() => {});
    vi.spyOn(prisma.product, "findMany").mockRejectedValueOnce(new Error("DB 연결 실패"));

    // When
    const body = (await (await GET()).json()) as ApiErrorResponse;

    // Then
    expect(body).toEqual({ error: { message: "상품 목록을 불러오지 못했습니다." } });
  });
});
