import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAdminLogin } from "@/hooks/useBackend";
import { setAdminToken } from "@/utils/admin";
import { useNavigate } from "@tanstack/react-router";
import { Eye, EyeOff, Lock, ShoppingCart } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export default function AdminLoginPage() {
  const navigate = useNavigate();
  const adminLogin = useAdminLogin();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!username.trim() || !password.trim()) {
      setError("Please enter your credentials.");
      return;
    }
    try {
      const result = await adminLogin.mutateAsync({ username, password });
      if (result.success) {
        setAdminToken(result.token);
        toast.success("Welcome back, Admin!");
        void navigate({ to: "/admin" });
      } else {
        setError(result.message || "Invalid credentials. Please try again.");
      }
    } catch {
      setError("Login failed. Please try again.");
    }
  };

  return (
    <div
      className="min-h-screen bg-muted/30 flex items-center justify-center px-4"
      data-ocid="admin_login.page"
    >
      <div className="w-full max-w-sm">
        {/* Branding */}
        <div className="text-center mb-6">
          <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
            <ShoppingCart className="w-8 h-8 text-primary-foreground" />
          </div>
          <h1 className="font-display font-bold text-2xl text-foreground">
            Value Kart
          </h1>
          <p className="text-muted-foreground text-sm mt-1 flex items-center justify-center gap-1">
            <Lock className="w-3 h-3" />
            Secure Admin Panel
          </p>
        </div>

        <Card className="shadow-md">
          <CardHeader className="pb-4">
            <CardTitle className="text-base">Administrator Sign In</CardTitle>
            <CardDescription className="text-xs">
              Enter your admin credentials to access the dashboard. Credentials
              are never stored in the browser.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4" noValidate>
              <div>
                <Label htmlFor="username" className="text-sm font-medium">
                  Username
                </Label>
                <Input
                  id="username"
                  type="text"
                  placeholder="Enter admin username"
                  value={username}
                  onChange={(e) => {
                    setUsername(e.target.value);
                    setError("");
                  }}
                  className="mt-1.5"
                  autoComplete="username"
                  autoFocus
                  data-ocid="admin_login.username_input"
                />
              </div>

              <div>
                <Label htmlFor="password" className="text-sm font-medium">
                  Password
                </Label>
                <div className="relative mt-1.5">
                  <Input
                    id="password"
                    type={showPw ? "text" : "password"}
                    placeholder="Enter admin password"
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      setError("");
                    }}
                    className="pr-10"
                    autoComplete="current-password"
                    data-ocid="admin_login.password_input"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPw((v) => !v)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                    aria-label={showPw ? "Hide password" : "Show password"}
                  >
                    {showPw ? (
                      <EyeOff className="w-4 h-4" />
                    ) : (
                      <Eye className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </div>

              {error && (
                <div
                  className="flex items-start gap-2 bg-destructive/10 border border-destructive/20 rounded-md px-3 py-2"
                  data-ocid="admin_login.error_state"
                >
                  <span className="text-destructive text-xs mt-0.5">⚠</span>
                  <p className="text-xs text-destructive">{error}</p>
                </div>
              )}

              <Button
                type="submit"
                className="w-full bg-primary text-primary-foreground hover:bg-primary/90 h-10 font-semibold mt-2"
                disabled={adminLogin.isPending}
                data-ocid="admin_login.submit_button"
              >
                {adminLogin.isPending ? (
                  <span className="flex items-center gap-2">
                    <span className="w-4 h-4 border-2 border-primary-foreground/40 border-t-primary-foreground rounded-full animate-spin" />
                    Verifying...
                  </span>
                ) : (
                  "Sign In to Admin Panel"
                )}
              </Button>
            </form>
          </CardContent>
        </Card>

        <p className="text-center text-xs text-muted-foreground mt-4">
          Authorized personnel only. All access is logged.
        </p>
      </div>
    </div>
  );
}
