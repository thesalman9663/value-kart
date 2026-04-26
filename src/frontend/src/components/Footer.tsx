import { buildWhatsAppUrl } from "@/utils/whatsapp";
import { Link } from "@tanstack/react-router";
import { MessageCircle } from "lucide-react";

const WHATSAPP_DISPLAY = "+91 9645559663";

function TrustBadge({
  icon,
  label,
  sub,
}: { icon: React.ReactNode; label: string; sub?: string }) {
  return (
    <div className="flex items-center gap-3">
      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
        {icon}
      </div>
      <div>
        <p className="text-sm font-semibold text-foreground leading-tight">
          {label}
        </p>
        {sub && <p className="text-xs text-muted-foreground">{sub}</p>}
      </div>
    </div>
  );
}

export function Footer() {
  const year = new Date().getFullYear();
  const whatsappUrl = buildWhatsAppUrl("Hi Value Kart! I need help.");

  return (
    <footer className="bg-card border-t border-border" data-ocid="footer">
      {/* Trust Badges Strip */}
      <div className="bg-primary/5 border-b border-border">
        <div className="max-w-6xl mx-auto px-4 py-5">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <TrustBadge
              icon={
                <svg
                  viewBox="0 0 24 24"
                  className="w-5 h-5 text-primary fill-current"
                  aria-label="UPI Payments"
                >
                  <title>UPI Payments</title>
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                </svg>
              }
              label="UPI Payments"
              sub="Google Pay, PhonePe, Paytm"
            />
            <TrustBadge
              icon={
                <svg
                  viewBox="0 0 24 24"
                  className="w-5 h-5 text-primary fill-current"
                  aria-label="Cash on Delivery"
                >
                  <title>Cash on Delivery</title>
                  <path d="M20 4H4c-1.11 0-2 .89-2 2v12c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V6c0-1.11-.89-2-2-2zm0 14H4v-6h16v6zm0-10H4V6h16v2z" />
                </svg>
              }
              label="Cash on Delivery"
              sub="Pay when you receive"
            />
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 hover:opacity-80 transition-smooth"
              data-ocid="footer.whatsapp_link"
            >
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                <MessageCircle className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="text-sm font-semibold text-foreground leading-tight">
                  WhatsApp Support
                </p>
                <p className="text-xs text-primary font-medium">
                  {WHATSAPP_DISPLAY}
                </p>
              </div>
            </a>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="max-w-6xl mx-auto px-4 py-5">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-primary font-display">
              Value Kart
            </span>
            <span>·</span>
            <span>Shop Smart. Save More.</span>
          </div>
          <div className="flex items-center gap-4">
            <Link
              to="/admin/login"
              className="hover:text-foreground transition-colors text-xs"
              data-ocid="footer.admin_link"
            >
              Admin
            </Link>
            <span>
              © {year}. Built with love using{" "}
              <a
                href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(window.location.hostname)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-primary transition-colors"
              >
                caffeine.ai
              </a>
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
