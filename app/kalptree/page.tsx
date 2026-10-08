import Link from "next/link";
import type { Metadata } from "next";
import KalptreeLoginForm from "./KalptreeLoginForm";

export const metadata: Metadata = {
  title: "Admin Login | Hotel Luxora",
  description: "Secure Hotel Luxora administration portal login.",
};

const features = [
  {
    title: "Catalog & Inventory Management",
    description:
      "Organize products, manage stock counts, update pricing, and configure variants effortlessly.",
    icon: "box",
  },
  {
    title: "Order Tracking & Processing",
    description:
      "Review customer purchases, fulfill shipments, and handle returns with real-time updates.",
    icon: "cart",
  },
  {
    title: "Secure Access & Control",
    description: "Protected administrator console with encrypted sessions and safety controls.",
    icon: "shield",
  },
];

function Icon({ name }: { name: string }) {
  if (name === "cart") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <circle cx="9" cy="20" r="1.5" />
        <circle cx="17" cy="20" r="1.5" />
        <path d="M3 4h2l2.2 10.4a2 2 0 0 0 2 1.6h7.9a2 2 0 0 0 1.9-1.4L21 8H7" />
      </svg>
    );
  }

  if (name === "box") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="m12 3 8 4.5v9L12 21l-8-4.5v-9L12 3Z" />
        <path d="m4 7.5 8 4.5 8-4.5" />
        <path d="M12 12v9" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 3 5 6v5c0 4.6 2.9 8.8 7 10 4.1-1.2 7-5.4 7-10V6l-7-3Z" />
      <path d="M12 8v5" />
      <path d="M12 16h.01" />
    </svg>
  );
}

export default function KalptreeAdminLoginPage() {
  return (
    <main className="kalptree-admin">
      <section className="login-side" aria-labelledby="admin-login-heading">
        <div className="login-card">
          <div className="brand-row">
            <img className="brand-logo" src="/luxora-white-logo.svg" alt="Hotel Luxora" />
            {/* <div className="brand-subtitle">ADMIN PORTAL</div> */}
          </div>

          <div className="portal-pill">
            <span />
            Admin Portal
          </div>

          <h1 id="admin-login-heading">Admin Login</h1>
          <p className="login-copy">Enter your credentials to access the store administration dashboard.</p>

          <KalptreeLoginForm />

          <div className="login-links">
            <Link href="/">← Back to Storefront</Link>
            <Link href="/sign-in">Customer Login</Link>
          </div>
        </div>
      </section>

      <section className="info-side" aria-label="Store administration details">
        <div className="info-inner">
          <div className="section-pill">
            <Icon name="shield" />
            Store Administration
          </div>

          <h2>Manage Your Store with Complete Control</h2>
          <p className="info-copy">
            Access your centralized operations dashboard to manage products, monitor orders, and track store performance.
          </p>

          <div className="feature-list">
            {features.map((feature) => (
              <article className="feature-card" key={feature.title}>
                <div className="feature-icon">
                  <Icon name={feature.icon} />
                </div>
                <div>
                  <h3>{feature.title}</h3>
                  <p>{feature.description}</p>
                </div>
              </article>
            ))}
          </div>

          <div className="portal-meta">
            <p>
              Portal: <strong>Hotel Luxora</strong>
            </p>
            <p>
              Access: <strong>Authorized Personnel</strong>
            </p>
          </div>
        </div>
      </section>

      <style>{`
        .kalptree-admin {
          --midnight: #01141a;
          --charcoal: #051e26;
          --deep: #031920;
          --ivory: #ffffff;
          --ivory-dim: #c8c4b8;
          --gold: #d5a857;
          --gold-light: #e0ba6a;
          --muted: #0d2a34;
          --line: rgba(213, 168, 87, 0.18);
          position: fixed;
          inset: 0;
          min-height: 0;
          height: auto;
          width: 100%;
          display: grid;
          grid-template-columns: 1.08fr 0.92fr;
          background: var(--midnight);
          color: var(--ivory);
          font-family: Arial, Helvetica, sans-serif;
          overflow: hidden;
        }

        .kalptree-admin,
        .kalptree-admin * {
          box-sizing: border-box;
        }

        .kalptree-admin svg {
          fill: none;
          stroke: currentColor;
          stroke-linecap: round;
          stroke-linejoin: round;
          stroke-width: 1.8;
        }

        .login-side,
        .info-side {
          min-height: 100dvh;
          position: relative;
        }

        .login-side {
          align-items: center;
          background:
            radial-gradient(circle at 28% 12%, rgba(213, 168, 87, 0.12), transparent 28%),
            radial-gradient(circle at 72% 44%, rgba(213, 168, 87, 0.08), transparent 32%),
            linear-gradient(135deg, var(--midnight), #06242d 58%, #021015);
          border-right: 1px solid var(--line);
          display: flex;
          justify-content: center;
          padding: clamp(24px, 4vw, 56px);
        }

        .login-side::before,
        .info-side::before {
          content: "";
          position: absolute;
          inset: 0;
          background-image: radial-gradient(circle, rgba(213, 168, 87, 0.09) 1px, transparent 1px);
          background-size: 28px 28px;
          opacity: 0.28;
          pointer-events: none;
        }

        .login-card {
          max-width: 560px;
          position: relative;
          width: 100%;
          z-index: 1;
        }

        .brand-row {
          align-items: flex-start;
          display: inline-flex;
          flex-direction: column;
          gap: 8px;
          margin-bottom: 24px;
        }

        .brand-logo {
          display: block;
          height: 54px;
          width: auto;
        }

        .brand-mark,
        .feature-icon {
          align-items: center;
          background: rgba(213, 168, 87, 0.12);
          border: 1px solid rgba(213, 168, 87, 0.35);
          color: var(--gold);
          display: flex;
          justify-content: center;
        }

        .brand-subtitle {
          color: var(--gold);
          font-size: 11px;
          font-weight: 900;
          letter-spacing: 0.08em;
          margin-left: 72px;
          margin-top: -14px;
        }

        .portal-pill,
        .section-pill {
          align-items: center;
          background: rgba(213, 168, 87, 0.08);
          border: 1px solid rgba(213, 168, 87, 0.28);
          border-radius: 999px;
          color: var(--gold-light);
          display: inline-flex;
          font-size: 12px;
          font-weight: 800;
          gap: 9px;
          padding: 8px 14px;
        }

        .portal-pill {
          position: absolute;
          right: 0;
          top: 8px;
        }

        .portal-pill span {
          background: var(--gold);
          border-radius: 50%;
          box-shadow: 0 0 16px rgba(213, 168, 87, 0.8);
          height: 8px;
          width: 8px;
        }

        .login-card h1,
        .info-inner h2 {
          color: var(--ivory);
          font-family: Georgia, 'Times New Roman', serif;
          font-weight: 800;
          letter-spacing: -0.055em;
          line-height: 0.98;
          margin: 0;
        }

        .login-card h1 {
          font-size: clamp(38px, 4vw, 50px);
          margin-top: 18px;
        }

        .login-copy,
        .info-copy,
        .feature-card p,
        .login-links a,
        .portal-meta p {
          color: #aebdcc;
        }

        .login-copy {
          font-size: 15px;
          line-height: 1.65;
          margin: 14px 0 28px;
          max-width: 480px;
        }

        .login-form { display: grid; gap: 12px; }

        .login-error {
          background: rgba(255, 80, 80, 0.1);
          border: 1px solid rgba(255, 80, 80, 0.32);
          border-radius: 12px;
          color: #ffb4a8;
          font-size: 13px;
          line-height: 1.45;
          padding: 11px 14px;
        }

        .login-form label {
          color: #d9e1e8;
          font-size: 13px;
          font-weight: 900;
          letter-spacing: 0.08em;
          margin-top: 6px;
          text-transform: uppercase;
        }

        .input-shell {
          align-items: center;
          background: #eef4ff;
          border: 1px solid rgba(213, 168, 87, 0.2);
          border-radius: 14px;
          color: #86a0b8;
          display: flex;
          gap: 14px;
          min-height: 50px;
          padding: 0 18px;
          transition: border-color 0.2s ease, box-shadow 0.2s ease;
        }

        .input-shell:focus-within {
          border-color: rgba(213, 168, 87, 0.65);
          box-shadow: 0 0 0 4px rgba(213, 168, 87, 0.12);
        }

        .input-shell svg {
          flex: 0 0 auto;
          height: 20px;
          width: 20px;
        }

        .input-shell input {
          background: transparent;
          border: 0;
          color: #071117;
          flex: 1;
          font-size: 14px;
          min-width: 0;
          outline: 0;
        }

        .eye-icon { margin-left: auto; }

        .password-toggle {
          align-items: center;
          background: transparent;
          border: 0;
          color: #86a0b8;
          cursor: pointer;
          display: flex;
          flex: 0 0 auto;
          justify-content: center;
          margin: 0;
          padding: 0;
        }

        .login-form > button[type="submit"] {
          align-items: center;
          background: linear-gradient(135deg, var(--gold), #b98132);
          border: 0;
          border-radius: 14px;
          box-shadow: 0 20px 44px rgba(213, 168, 87, 0.2);
          color: var(--midnight);
          cursor: pointer;
          display: flex;
          font-size: 15px;
          font-weight: 900;
          gap: 12px;
          justify-content: center;
          margin-top: 12px;
          min-height: 54px;
          transition: transform 0.2s ease, box-shadow 0.2s ease;
        }

        .login-form > button[type="submit"]:hover {
          box-shadow: 0 24px 54px rgba(213, 168, 87, 0.28);
          transform: translateY(-1px);
        }

        .login-form > button[type="submit"]:disabled {
          cursor: not-allowed;
          opacity: 0.72;
          transform: none;
        }

        .login-form > button[type="submit"] svg { height: 21px; width: 21px; }

        .login-form .password-toggle svg { height: 20px; width: 20px; }

        .login-form .password-toggle:hover {
          box-shadow: none;
          color: var(--gold);
          transform: none;
        }

        .login-links {
          border-top: 1px solid var(--line);
          display: flex;
          justify-content: space-between;
          margin-top: 28px;
          padding-top: 22px;
        }

        .login-links a {
          font-size: 13px;
          text-decoration: none;
          transition: color 0.2s ease;
        }

        .login-links a:hover { color: var(--gold); }

        .info-side {
          align-items: center;
          background:
            linear-gradient(rgba(1, 20, 26, 0.92), rgba(1, 20, 26, 0.92)),
            url('/default-hotel.png');
          background-position: center;
          background-size: cover;
          display: flex;
          padding: clamp(24px, 4vw, 56px);
        }

        .info-inner {
          max-width: 680px;
          position: relative;
          width: 100%;
          z-index: 1;
        }

        .section-pill {
          color: var(--gold);
          font-size: 13px;
          letter-spacing: 0.04em;
          margin-bottom: 24px;
          text-transform: uppercase;
        }

        .section-pill svg { height: 18px; width: 18px; }

        .info-inner h2 {
          font-size: clamp(34px, 3.4vw, 48px);
          max-width: 640px;
        }

        .info-copy {
          font-size: 15px;
          line-height: 1.6;
          margin: 18px 0 24px;
          max-width: 650px;
        }

        .feature-list {
          display: grid;
          gap: 12px;
        }

        .feature-card {
          align-items: center;
          background: rgba(5, 30, 38, 0.72);
          border: 1px solid var(--line);
          border-radius: 16px;
          display: flex;
          gap: 18px;
          padding: 15px;
          transition: border-color 0.2s ease, transform 0.2s ease;
        }

        .feature-card:hover {
          border-color: rgba(213, 168, 87, 0.4);
          transform: translateY(-1px);
        }

        .feature-icon {
          border-radius: 12px;
          flex: 0 0 auto;
          height: 40px;
          width: 40px;
        }

        .feature-icon svg { height: 20px; width: 20px; }

        .feature-card h3 {
          color: var(--ivory);
          font-family: Georgia, 'Times New Roman', serif;
          font-size: 16px;
          margin: 0 0 4px;
        }

        .feature-card p {
          font-size: 13px;
          line-height: 1.45;
          margin: 0;
        }

        .portal-meta {
          border-top: 1px solid var(--line);
          display: flex;
          justify-content: space-between;
          gap: 24px;
          margin-top: 44px;
          padding-top: 22px;
        }

        .portal-meta p {
          font-size: 14px;
          margin: 0;
        }

        .portal-meta strong {
          color: var(--gold);
        }

        @media (max-width: 980px) {
          .kalptree-admin {
            position: static;
            grid-template-columns: 1fr;
            overflow: visible;
            height: auto;
            min-height: 100dvh;
          }

          .login-side,
          .info-side {
            min-height: auto;
          }

          .login-side {
            border-bottom: 1px solid var(--line);
            border-right: 0;
          }

          .portal-pill {
            margin-bottom: 22px;
            position: static;
          }

          .login-card h1 { margin-top: 0; }
        }

        @media (max-width: 620px) {
          .login-side,
          .info-side {
            padding: 28px 18px;
          }

          .brand-logo { height: 46px; }
          .brand-subtitle { margin-left: 62px; }
          .login-links,
          .portal-meta {
            align-items: flex-start;
            flex-direction: column;
            gap: 14px;
          }

          .feature-card {
            align-items: flex-start;
          }
        }
      `}</style>
    </main>
  );
}
