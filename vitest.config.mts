import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  resolve: {
    // `@/*` → `src/*` 경로 별칭(tsconfig)을 테스트에서도 쓸 수 있게 한다.
    tsconfigPaths: true,
  },
  test: {
    // 컴포넌트 테스트를 위해 브라우저 DOM을 흉내 내는 jsdom 환경을 쓴다.
    environment: "jsdom",
    setupFiles: ["./vitest.setup.ts"],
    // 스캐폴드(main)에는 아직 테스트가 없으므로, 테스트 0개여도 실패로 보지 않는다.
    passWithNoTests: true,
  },
});
