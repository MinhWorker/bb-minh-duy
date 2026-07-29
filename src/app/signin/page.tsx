"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, LockKeyhole } from "lucide-react";
import { useState } from "react";

export default function SignInPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isPasswordShown, setIsPasswordShown] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const response = await fetch("/api/signin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      const data = await response.json();

      if (response.ok) {
        router.replace("/admin");
        router.refresh();
        return;
      }

      setError(data.message || "Không thể đăng nhập. Vui lòng thử lại.");
    } catch {
      setError("Không thể kết nối tới hệ thống. Vui lòng thử lại sau.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="signin-page">
      <section className="signin-card" aria-labelledby="signin-title">
        <Link className="signin-brand" href="/" aria-label="Về trang chủ HTX Bồn Bồn Minh Duy">
          <span className="signin-brand-mark">
            <Image src="/media/logo-minh-duy.png" alt="" fill sizes="58px" priority />
          </span>
          <span>
            <strong>HTX Bồn Bồn Minh Duy</strong>
            <small>Hưng Mỹ · Cà Mau</small>
          </span>
        </Link>

        <div className="signin-heading">
          <span className="signin-icon" aria-hidden="true"><LockKeyhole /></span>
          <div>
            <h1 id="signin-title">Đăng nhập quản trị</h1>
            <p>Quản lý sản phẩm và nội dung website Minh Duy.</p>
          </div>
        </div>

        <form className="signin-form" onSubmit={handleSubmit}>
          <label htmlFor="username">
            Tên đăng nhập
            <input
              type="text"
              id="username"
              value={username}
              onChange={(event) => setUsername(event.target.value)}
              placeholder="Nhập tên đăng nhập"
              autoComplete="username"
              required
            />
          </label>

          <label htmlFor="password">
            Mật khẩu
            <span className="signin-password">
              <input
                type={isPasswordShown ? "text" : "password"}
                id="password"
                value={password}
                placeholder="Nhập mật khẩu"
                onChange={(event) => setPassword(event.target.value)}
                autoComplete="current-password"
                required
              />
              <button
                type="button"
                aria-label={isPasswordShown ? "Ẩn mật khẩu" : "Hiện mật khẩu"}
                aria-pressed={isPasswordShown}
                onClick={() => setIsPasswordShown((shown) => !shown)}
              >
                {isPasswordShown ? <EyeOff /> : <Eye />}
              </button>
            </span>
          </label>

          {error ? <p className="signin-error" role="alert">{error}</p> : null}

          <button className="signin-submit" type="submit" disabled={loading}>
            {loading ? "Đang đăng nhập…" : "Đăng nhập"}
          </button>
        </form>

        <Link className="signin-back" href="/">← Quay về trang chủ</Link>
      </section>
    </main>
  );
}
