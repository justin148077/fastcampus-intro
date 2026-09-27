import type { Prisma } from "../generated/prisma/client";
import { prisma } from "../src/lib/prisma";

// PRD(docs/prd/README.md) 샘플 데이터를 그대로 사용한다.
const products: Prisma.ProductCreateInput[] = [
  {
    id: "1",
    name: "미니멀 화이트 머그컵",
    price: 12000,
    imageUrl: "/images/product-01.png",
    description:
      "군더더기 없는 디자인의 300ml 세라믹 머그컵입니다. 전자레인지와 식기세척기 모두 사용할 수 있어 매일 부담 없이 쓰기 좋습니다.",
  },
  {
    id: "2",
    name: "원목 도마 세트",
    price: 29000,
    imageUrl: "/images/product-02.png",
    description:
      "아카시아 원목으로 만든 대·소 2종 도마 세트입니다. 자연스러운 나뭇결이 살아 있어 서빙 보드로도 멋스럽게 활용할 수 있습니다.",
  },
  {
    id: "3",
    name: "코튼 캔버스 에코백",
    price: 18000,
    imageUrl: "/images/product-03.png",
    description:
      "두툼한 12온스 캔버스 원단으로 만든 데일리 에코백입니다. 안주머니가 하나 있어 작은 소지품을 따로 정리하기 편합니다.",
  },
  {
    id: "4",
    name: "아로마 소이 캔들",
    price: 22000,
    imageUrl: "/images/product-04.png",
    description:
      "100% 천연 소이왁스로 만든 향초입니다. 은은한 우디 향이 공간을 편안하게 채워 주며, 약 40시간 동안 연소됩니다.",
  },
  {
    id: "5",
    name: "스테인리스 텀블러 500ml",
    price: 25000,
    imageUrl: "/images/product-05.png",
    description:
      "이중 진공 단열 구조의 500ml 스테인리스 텀블러입니다. 6시간 보온, 12시간 보냉이 가능하고 누수 방지 뚜껑으로 가방에 넣어도 안심입니다.",
  },
  {
    id: "6",
    name: "리넨 룸슬리퍼",
    price: 15000,
    imageUrl: "/images/product-06.png",
    description:
      "통기성이 좋은 리넨 소재의 실내 슬리퍼입니다. 논슬립 밑창을 적용해 미끄러운 바닥에서도 안정적으로 신을 수 있습니다.",
  },
];

async function main() {
  // 여러 번 실행해도 중복 오류가 나지 않도록 id 기준 upsert 를 사용한다.
  for (const product of products) {
    await prisma.product.upsert({
      where: { id: product.id },
      update: product,
      create: product,
    });
  }
  console.log(`상품 ${products.length}개 시드 완료`);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e: unknown) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
