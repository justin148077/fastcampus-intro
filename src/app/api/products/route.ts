import { NextResponse } from "next/server";
import { listProducts } from "@/server/products";
import type { ApiErrorResponse, ProductListResponse } from "@/types/product";

// 요청마다 DB 를 조회한다 (빌드 시점에 정적 응답으로 굳지 않도록).
export const dynamic = "force-dynamic";

/** GET /api/products — 상품 목록 (PRD feature-01) */
export async function GET(): Promise<NextResponse<ProductListResponse | ApiErrorResponse>> {
  try {
    const products = await listProducts();
    return NextResponse.json({ products });
  } catch (error: unknown) {
    console.error("[GET /api/products] 상품 목록 조회 실패", error);
    return NextResponse.json(
      { error: { message: "상품 목록을 불러오지 못했습니다." } },
      { status: 500 },
    );
  }
}
