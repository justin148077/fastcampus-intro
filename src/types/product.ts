// 상품 API 응답 계약. 서버(route handler)와 프론트엔드가 함께 import 한다.
// 이 파일은 타입만 두어 클라이언트 번들에 서버 코드(Prisma)가 섞이지 않게 한다.

/** 상품 목록 카드 1개를 그리는 데 필요한 필드 (PRD feature-01 §4). */
export interface ProductListItem {
  id: string; // 상세 링크 /products/[id] 에 사용
  name: string;
  price: number; // 정수(원). 화면에서는 formatPrice 로 "12,000원" 형식 표시
  imageUrl: string; // "/images/..." 로컬 경로. next/image src 로 사용
}

/** GET /api/products 성공 응답 */
export interface ProductListResponse {
  products: ProductListItem[];
}

/** API 오류 응답 */
export interface ApiErrorResponse {
  error: {
    message: string;
  };
}
