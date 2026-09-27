import { execSync } from "node:child_process";
import { rmSync } from "node:fs";
import type { TestProject } from "vitest/node";

// 테스트 실행 전에 test.db 를 새로 만들고 마이그레이션을 적용한다.
export default function setup(project: TestProject): void {
  const databaseUrl = project.config.env.DATABASE_URL;
  if (!databaseUrl?.startsWith("file:./test")) {
    throw new Error(`테스트 DB 주소가 아닙니다: ${databaseUrl}`);
  }
  rmSync(databaseUrl.replace("file:./", ""), { force: true });
  execSync("pnpm exec prisma migrate deploy", {
    env: { ...process.env, DATABASE_URL: databaseUrl },
    stdio: "ignore",
  });
}
