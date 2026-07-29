import { config } from "dotenv";
import { eq } from "drizzle-orm";
import { hashPassword } from "../lib/password";
import db from "./drizzle";
import { users } from "./schema";

config({ path: ".env" });

async function seedAdmin() {
  const username = process.env.ADMIN_USERNAME?.trim();
  const password = process.env.ADMIN_PASSWORD;

  if (!username || !password) {
    throw new Error("Cần đặt ADMIN_USERNAME và ADMIN_PASSWORD trước khi chạy db:seed-admin.");
  }

  if (password.length < 10) {
    throw new Error("ADMIN_PASSWORD phải có ít nhất 10 ký tự.");
  }

  const passwordHash = await hashPassword(password);
  const [existingUser] = await db
    .select({ id: users.id })
    .from(users)
    .where(eq(users.username, username))
    .limit(1);

  if (existingUser) {
    await db.update(users).set({ password: passwordHash }).where(eq(users.id, existingUser.id));
    console.log(`Đã cập nhật mật khẩu tài khoản quản trị "${username}".`);
    return;
  }

  await db.insert(users).values({ username, password: passwordHash });
  console.log(`Đã tạo tài khoản quản trị "${username}".`);
}

seedAdmin().catch((error) => {
  console.error(error instanceof Error ? error.message : error);
  process.exitCode = 1;
});
