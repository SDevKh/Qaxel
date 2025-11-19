import React, { useState, FormEvent } from "react";
import styled from "styled-components";
import { X, Menu } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../firebase";
import { signInWithEmailAndPassword, sendPasswordResetEmail } from "firebase/auth";

const Login: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
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
      if (code.includes("invalid-credential") || code.includes("wrong-password"))
        setError("Invalid email or password.");
      else if (code.includes("user-not-found"))
        setError("No account found with that email.");
      else if (code.includes("too-many-requests"))
        setError("Too many attempts. Try again later.");
      else setError("Login failed. Try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleForgotPassword = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setError(null);
    if (!email) {
      setError("Enter your email first to reset password.");
      return;
    }
    try {
      await sendPasswordResetEmail(auth, email.trim());
      setError("Password reset link sent to your email.");
    } catch {
      setError("Could not send reset link. Check the email.");
    }
  };

  return (
    <StyledWrapper>
      {/* NAVBAR */}
      <nav className="bg-[#FFD167] border-b-2 border-black sticky top-0 z-40 w-full">
        <div className="px-3 py-4 flex items-center justify-between">
          <div className="flex items-center gap-8">
            <Link to="/" className="hover:underline font-semibold">
              <img src="img/logo.png" alt="Logo" className="h-12" />
            </Link>
            <h1 className="text-xl font-bold md:block hidden">
              Missing Piece of your closet
            </h1>
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden md:flex gap-6">
              <Link to="/" className="hover:underline font-semibold">Home</Link>
              <Link to="/" className="hover:underline font-semibold">Categories</Link>
            </div>
            <button
              className="md:hidden border-2 border-black px-2 py-1 rounded"
              onClick={() => setMobileMenuOpen((s) => !s)}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden border-t-2 border-black p-4">
            <Link to="/" className="block py-2 hover:underline font-semibold">Home</Link>
            <Link to="/" onClick={() => setMobileMenuOpen(false)} className="block py-2 hover:underline font-semibold w-full text-left">Categories</Link>
          </div>
        )}
      </nav>

      {/* LOGIN SECTION */}
      <div className="login-section">
        <div className="container">
          <div className="login-box">
            <h2>Login</h2>
            {error && <p className="msg">{error}</p>}
            <form onSubmit={handleSubmit}>
              <div className="input-box">
                <input
                  id="email"
                  required
                  type="email"
                  placeholder="Email"
                  title="Email"
                  aria-label="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <label htmlFor="email">Email</label>
              </div>

              <div className="input-box">
                <input
                  id="password"
                  required
                  type="password"
                  placeholder="Password"
                  title="Password"
                  aria-label="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <label htmlFor="password">Password</label>
              </div>

              <div className="forgot-pass">
                <button type="button" onClick={handleForgotPassword} className="text-sm text-white underline">Forgot your password?</button>
              </div>

              <button className="btn" type="submit" disabled={submitting}>
                {submitting ? "Logging in…" : "Login"}
              </button>

              <div className="signup-link">
                <Link to="/signup">Sign Up</Link>
              </div>
            </form>
          </div>
          {Array.from({ length: 50 }).map((_, i) => (
            <span key={i} />
          ))}
        </div>
      </div>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  background-color: #00001f;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;

  .login-section {
    flex: 1;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .container {
    position: relative;
    width: 400px;
    height: 400px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 50%;
    overflow: hidden;
  }

  @media (max-width: 450px) {
    .container {
      width: 360px;
      height: 360px;
    }
  }

  .container span {
    position: absolute;
    left: 0;
    width: 32px;
    height: 6px;
    background: #2c4766;
    border-radius: 80px;
    transform-origin: 200px;
    animation: blink 3s linear infinite;
  }

  /* Per-index transforms and delays moved to CSS nth-child rules to avoid inline styles */
  .container span:nth-child(1)  { transform: rotate(calc(0 * 7.2deg));  animation-delay: calc(0 * 0.06s); }
  .container span:nth-child(2)  { transform: rotate(calc(1 * 7.2deg));  animation-delay: calc(1 * 0.06s); }
  .container span:nth-child(3)  { transform: rotate(calc(2 * 7.2deg));  animation-delay: calc(2 * 0.06s); }
  .container span:nth-child(4)  { transform: rotate(calc(3 * 7.2deg));  animation-delay: calc(3 * 0.06s); }
  .container span:nth-child(5)  { transform: rotate(calc(4 * 7.2deg));  animation-delay: calc(4 * 0.06s); }
  .container span:nth-child(6)  { transform: rotate(calc(5 * 7.2deg));  animation-delay: calc(5 * 0.06s); }
  .container span:nth-child(7)  { transform: rotate(calc(6 * 7.2deg));  animation-delay: calc(6 * 0.06s); }
  .container span:nth-child(8)  { transform: rotate(calc(7 * 7.2deg));  animation-delay: calc(7 * 0.06s); }
  .container span:nth-child(9)  { transform: rotate(calc(8 * 7.2deg));  animation-delay: calc(8 * 0.06s); }
  .container span:nth-child(10) { transform: rotate(calc(9 * 7.2deg));  animation-delay: calc(9 * 0.06s); }
  .container span:nth-child(11) { transform: rotate(calc(10 * 7.2deg)); animation-delay: calc(10 * 0.06s); }
  .container span:nth-child(12) { transform: rotate(calc(11 * 7.2deg)); animation-delay: calc(11 * 0.06s); }
  .container span:nth-child(13) { transform: rotate(calc(12 * 7.2deg)); animation-delay: calc(12 * 0.06s); }
  .container span:nth-child(14) { transform: rotate(calc(13 * 7.2deg)); animation-delay: calc(13 * 0.06s); }
  .container span:nth-child(15) { transform: rotate(calc(14 * 7.2deg)); animation-delay: calc(14 * 0.06s); }
  .container span:nth-child(16) { transform: rotate(calc(15 * 7.2deg)); animation-delay: calc(15 * 0.06s); }
  .container span:nth-child(17) { transform: rotate(calc(16 * 7.2deg)); animation-delay: calc(16 * 0.06s); }
  .container span:nth-child(18) { transform: rotate(calc(17 * 7.2deg)); animation-delay: calc(17 * 0.06s); }
  .container span:nth-child(19) { transform: rotate(calc(18 * 7.2deg)); animation-delay: calc(18 * 0.06s); }
  .container span:nth-child(20) { transform: rotate(calc(19 * 7.2deg)); animation-delay: calc(19 * 0.06s); }
  .container span:nth-child(21) { transform: rotate(calc(20 * 7.2deg)); animation-delay: calc(20 * 0.06s); }
  .container span:nth-child(22) { transform: rotate(calc(21
  @keyframes blink {
    0% {
      background: #0ef;
    }
    25% {
      background: #2c4766;
    }
  }

  .login-box {
    position: absolute;
    width: 80%;
    max-width: 300px;
    z-index: 1;
    padding: 20px;
    border-radius: 20px;
  }

  form {
    width: 100%;
    padding: 0 10px;
  }

  h2 {
    font-size: 1.8em;
    color: #0ef;
    text-align: center;
    margin-bottom: 10px;
  }

  .input-box {
    position: relative;
    margin: 15px 0;
  }

  input {
    width: 100%;
    height: 45px;
    background: transparent;
    border: 2px solid #2c4766;
    outline: none;
    border-radius: 40px;
    font-size: 1em;
    color: #fff;
    padding: 0 15px;
    transition: 0.5s ease;
  }

  input:focus {
    border-color: #0ef;
  }

  input[value]:not([value=""]) ~ label,
  input:focus ~ label {
    top: -10px;
    font-size: 0.8em;
    background: #1f293a;
    padding: 0 6px;
    color: #0ef;
  }

  label {
    position: absolute;
    top: 50%;
    left: 15px;
    transform: translateY(-50%);
    font-size: 1em;
    pointer-events: none;
    transition: 0.5s ease;
    color: #fff;
  }

  .forgot-pass {
    margin: -10px 0 10px;
    text-align: center;
  }

  .forgot-pass a {
    font-size: 0.85em;
    color: #fff;
    text-decoration: none;
  }

  .btn {
    width: 100%;
    height: 45px;
    background: #0ef;
    border: none;
    outline: none;
    border-radius: 40px;
    cursor: pointer;
    font-size: 1em;
    color: #1f293a;
    font-weight: 600;
  }

  .btn[disabled] {
    opacity: 0.7;
    cursor: not-allowed;
  }

  .signup-link {
    margin: 10px 0;
    text-align: center;
  }

  .signup-link a {
    font-size: 1em;
    color: #0ef;
    text-decoration: none;
    font-weight: 600;
  }

  .msg {
    text-align: center;
    color: #cdeaff;
    margin-bottom: 8px;
    font-size: 0.9em;
  }
`;

export default Login;