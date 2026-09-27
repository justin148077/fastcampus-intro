import "@testing-library/jest-dom/vitest";
import { cleanup } from "@testing-library/react";
import { afterEach } from "vitest";

// 테스트끼리 화면(DOM) 상태를 공유하지 않도록 매 테스트 후 정리한다.
afterEach(() => {
  cleanup();
});
