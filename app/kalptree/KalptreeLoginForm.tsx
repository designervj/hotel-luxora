"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function KalptreeLoginForm() {
  const router = useRouter();
  const [email, setEmail] = useState("business@grandeagle.com");
  const [password, setPassword] = useState("1234567899");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/kalptree-login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ emailOrPhone: email.trim(), password }),
      });

      const responseText = await res.text();
      let data: any = {};

      try {
        data = responseText ? JSON.parse(responseText) : {};
      } catch {
        data = { error: responseText || "Login request failed." };
      }

      if (!res.ok) {
        setError(data.error || "Invalid email or password.");
        return;
      }

      if (data.user?.role !== "admin") {
        setError("This account does not have admin access.");
        return;
      }

      window.location.href = "https://zerolive.kalptree.xyz/hotel-luxora/dashboard";
      return;
    } catch (err) {
      console.error("Kalptree login failed", err);
      setError("Login service is not reachable. Please refresh and try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="login-form" onSubmit={handleSubmit}>
      {error && <div className="login-error" role="alert">{error}</div>}

      <label htmlFor="email">Email Address</label>
      <div className="input-shell">
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M4 6h16v12H4z" />
          <path d="m4 7 8 6 8-6" />
        </svg>
        <input
          id="email"
          name="email"
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          autoComplete="email"
          required
        />
      </div>

      <label htmlFor="password">Password</label>
      <div className="input-shell">
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <rect x="5" y="10" width="14" height="10" rx="2" />
          <path d="M8 10V7a4 4 0 0 1 8 0v3" />
        </svg>
        <input
          id="password"
          name="password"
          type={showPassword ? "text" : "password"}
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          autoComplete="current-password"
          required
        />
        <button
          className="password-toggle"
          type="button"
          onClick={() => setShowPassword((current) => !current)}
          aria-label={showPassword ? "Hide password" : "Show password"}
        >
          <svg className="eye-icon" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M2 12s3.5-6 10-6 10 6 10 6-3.5 6-10 6S2 12 2 12Z" />
            <circle cx="12" cy="12" r="3" />
          </svg>
        </button>
      </div>

      <button type="submit" disabled={loading}>
        {loading ? "Signing In..." : "Sign In"}
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M5 12h14" />
          <path d="m13 6 6 6-6 6" />
        </svg>
      </button>
    </form>
  );
}
