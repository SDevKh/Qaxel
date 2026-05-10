import React, { useState, FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../firebase";
import { signInWithEmailAndPassword, sendPasswordResetEmail } from "firebase/auth";

const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    setSubmitting(true);
    try {
      await signInWithEmailAndPassword(auth, email.trim(), password);
      navigate("/");
    } catch (err: any) {
      const code = err?.code ?? "";
      if (code.includes("invalid-credential") || code.includes("wrong-password")) setError("Invalid email or password.");
      else if (code.includes("user-not-found")) setError("No account found with that email.");
      else if (code.includes("too-many-requests")) setError("Too many attempts. Try again later.");
      else setError("Login failed. Try again.");
    } finally { setSubmitting(false); }
  };

  const handleForgotPassword = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setError(null);
    if (!email) { setError("Enter your email first to reset password."); return; }
    try { await sendPasswordResetEmail(auth, email.trim()); setError("Password reset link sent to your email."); }
    catch { setError("Could not send reset link. Check the email."); }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FFF0F3] via-[#FFF8F5] to-[#FFF0E8] flex flex-col">
      <nav className="bg-white/80 backdrop-blur-md border-b border-[#F5C6D0]/40 w-full">
        <div className="px-6 py-3 flex items-center justify-between max-w-7xl mx-auto">
          <Link to="/" className="flex flex-col">
            <span className="text-2xl font-serif font-bold bg-gradient-to-r from-[#B76E79] to-[#D4A574] bg-clip-text text-transparent">Pardesi Naari</span>
            <span className="text-[9px] uppercase tracking-[0.25em] text-[#B76E79] -mt-0.5 font-medium italic">For Her · By Her · With Her</span>
          </Link>
          <Link to="/" className="text-[#4A2C3D] hover:text-[#B76E79] font-medium text-sm">Home</Link>
        </div>
      </nav>

      <div className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md">
          <div className="bg-white rounded-3xl shadow-xl p-8 border border-[#F5C6D0]/30">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-serif font-bold text-[#4A2C3D]">Welcome Back</h2>
              <p className="text-[#8B5E6B] mt-2 text-sm">Sign in to your account</p>
            </div>

            {error && <div className="bg-[#FFF0F3] text-[#B76E79] text-sm p-3 rounded-xl mb-6 text-center">{error}</div>}

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-[#4A2C3D] mb-1">Email</label>
                <input id="email" required type="email" value={email} onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 border border-[#F5C6D0]/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#B76E79] text-sm" />
              </div>
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-[#4A2C3D] mb-1">Password</label>
                <input id="password" required type="password" value={password} onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 border border-[#F5C6D0]/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#B76E79] text-sm" />
              </div>

              <div className="text-center">
                <button type="button" onClick={handleForgotPassword} className="text-sm text-[#B76E79] hover:underline">Forgot your password?</button>
              </div>

              <button type="submit" disabled={submitting}
                className="w-full bg-gradient-to-r from-[#B76E79] to-[#D4A574] text-white py-3.5 rounded-xl font-semibold hover:shadow-lg transition-all disabled:opacity-50">
                {submitting ? "Logging in…" : "Login"}
              </button>

              <p className="text-center text-sm text-[#8B5E6B]">
                Don't have an account? <Link to="/signup" className="text-[#B76E79] font-semibold hover:underline">Sign Up</Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;