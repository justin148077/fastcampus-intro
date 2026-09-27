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
    // 서버(DB) 테스트는 파일 맨 위에 `// @vitest-environment node` 를 적는다.
    environment: "jsdom",
    setupFiles: ["./vitest.setup.ts"],
    // 테스트 전용 SQLite 파일. 개발 DB(dev.db)와 분리한다.
    env: { DATABASE_URL: "file:./test.db" },
    // test.db 생성 + 마이그레이션 적용
    globalSetup: ["./vitest.global-setup.mts"],
    // 테스트 파일들이 같은 test.db 를 쓰므로 파일을 순서대로 실행한다.
    fileParallelism: false,
    passWithNoTests: true,
  },
});
