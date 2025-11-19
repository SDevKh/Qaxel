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
  background: linear-gradient(135deg, #1f293a 0%, #2c4766 100%);
  min-height: 100vh;
  display: flex;
  flex-direction: column;

  .login-section {
    flex: 1;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 20px;
  }

  .container {
    position: relative;
    width: 400px;
    height: 400px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 50%;
  }

  @media (max-width: 450px) {
    .container {
      width: 350px;
      height: 350px;
    }
  }

  .container span {
    position: absolute;
    left: 0;
    width: 32px;
    height: 6px;
    background: #2c4766;
    border-radius: 8px;
    transform-origin: 200px;
    animation: blink 3s linear infinite;
  }

  @media (max-width: 450px) {
    .container span {
      transform-origin: 175px;
    }
  }

  .container span:nth-child(1) { transform: rotate(0deg); animation-delay: 0s; }
  .container span:nth-child(2) { transform: rotate(7.2deg); animation-delay: 0.06s; }
  .container span:nth-child(3) { transform: rotate(14.4deg); animation-delay: 0.12s; }
  .container span:nth-child(4) { transform: rotate(21.6deg); animation-delay: 0.18s; }
  .container span:nth-child(5) { transform: rotate(28.8deg); animation-delay: 0.24s; }
  .container span:nth-child(6) { transform: rotate(36deg); animation-delay: 0.3s; }
  .container span:nth-child(7) { transform: rotate(43.2deg); animation-delay: 0.36s; }
  .container span:nth-child(8) { transform: rotate(50.4deg); animation-delay: 0.42s; }
  .container span:nth-child(9) { transform: rotate(57.6deg); animation-delay: 0.48s; }
  .container span:nth-child(10) { transform: rotate(64.8deg); animation-delay: 0.54s; }
  .container span:nth-child(11) { transform: rotate(72deg); animation-delay: 0.6s; }
  .container span:nth-child(12) { transform: rotate(79.2deg); animation-delay: 0.66s; }
  .container span:nth-child(13) { transform: rotate(86.4deg); animation-delay: 0.72s; }
  .container span:nth-child(14) { transform: rotate(93.6deg); animation-delay: 0.78s; }
  .container span:nth-child(15) { transform: rotate(100.8deg); animation-delay: 0.84s; }
  .container span:nth-child(16) { transform: rotate(108deg); animation-delay: 0.9s; }
  .container span:nth-child(17) { transform: rotate(115.2deg); animation-delay: 0.96s; }
  .container span:nth-child(18) { transform: rotate(122.4deg); animation-delay: 1.02s; }
  .container span:nth-child(19) { transform: rotate(129.6deg); animation-delay: 1.08s; }
  .container span:nth-child(20) { transform: rotate(136.8deg); animation-delay: 1.14s; }
  .container span:nth-child(21) { transform: rotate(144deg); animation-delay: 1.2s; }
  .container span:nth-child(22) { transform: rotate(151.2deg); animation-delay: 1.26s; }
  .container span:nth-child(23) { transform: rotate(158.4deg); animation-delay: 1.32s; }
  .container span:nth-child(24) { transform: rotate(165.6deg); animation-delay: 1.38s; }
  .container span:nth-child(25) { transform: rotate(172.8deg); animation-delay: 1.44s; }
  .container span:nth-child(26) { transform: rotate(180deg); animation-delay: 1.5s; }
  .container span:nth-child(27) { transform: rotate(187.2deg); animation-delay: 1.56s; }
  .container span:nth-child(28) { transform: rotate(194.4deg); animation-delay: 1.62s; }
  .container span:nth-child(29) { transform: rotate(201.6deg); animation-delay: 1.68s; }
  .container span:nth-child(30) { transform: rotate(208.8deg); animation-delay: 1.74s; }
  .container span:nth-child(31) { transform: rotate(216deg); animation-delay: 1.8s; }
  .container span:nth-child(32) { transform: rotate(223.2deg); animation-delay: 1.86s; }
  .container span:nth-child(33) { transform: rotate(230.4deg); animation-delay: 1.92s; }
  .container span:nth-child(34) { transform: rotate(237.6deg); animation-delay: 1.98s; }
  .container span:nth-child(35) { transform: rotate(244.8deg); animation-delay: 2.04s; }
  .container span:nth-child(36) { transform: rotate(252deg); animation-delay: 2.1s; }
  .container span:nth-child(37) { transform: rotate(259.2deg); animation-delay: 2.16s; }
  .container span:nth-child(38) { transform: rotate(266.4deg); animation-delay: 2.22s; }
  .container span:nth-child(39) { transform: rotate(273.6deg); animation-delay: 2.28s; }
  .container span:nth-child(40) { transform: rotate(280.8deg); animation-delay: 2.34s; }
  .container span:nth-child(41) { transform: rotate(288deg); animation-delay: 2.4s; }
  .container span:nth-child(42) { transform: rotate(295.2deg); animation-delay: 2.46s; }
  .container span:nth-child(43) { transform: rotate(302.4deg); animation-delay: 2.52s; }
  .container span:nth-child(44) { transform: rotate(309.6deg); animation-delay: 2.58s; }
  .container span:nth-child(45) { transform: rotate(316.8deg); animation-delay: 2.64s; }
  .container span:nth-child(46) { transform: rotate(324deg); animation-delay: 2.7s; }
  .container span:nth-child(47) { transform: rotate(331.2deg); animation-delay: 2.76s; }
  .container span:nth-child(48) { transform: rotate(338.4deg); animation-delay: 2.82s; }
  .container span:nth-child(49) { transform: rotate(345.6deg); animation-delay: 2.88s; }
  .container span:nth-child(50) { transform: rotate(352.8deg); animation-delay: 2.94s; }

  @keyframes blink {
    0% { background: #0ef; }
    25% { background: #2c4766; }
  }

  .login-box {
    position: absolute;
    width: 80%;
    max-width: 300px;
    z-index: 10;
    padding: 30px;
    border-radius: 20px;
    background: rgba(31, 41, 58, 0.9);
    backdrop-filter: blur(10px);
    border: 1px solid rgba(0, 238, 255, 0.3);
    display: flex;
    flex-direction: column;
  }

  form {
    width: 100%;
  }

  h2 {
    font-size: 1.8em;
    color: #0ef;
    text-align: center;
    margin-bottom: 20px;
  }

  .input-box {
    position: relative;
    margin: 20px 0;
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
    padding: 0 20px;
    transition: 0.3s ease;
  }

  input:focus {
    border-color: #0ef;
  }

  input:focus ~ label,
  input:valid ~ label {
    top: -10px;
    font-size: 0.8em;
    background: #1f293a;
    padding: 0 6px;
    color: #0ef;
  }

  label {
    position: absolute;
    top: 50%;
    left: 20px;
    transform: translateY(-50%);
    font-size: 1em;
    pointer-events: none;
    transition: 0.3s ease;
    color: #fff;
  }

  .forgot-pass {
    margin: 10px 0;
    text-align: center;
  }

  .forgot-pass button {
    background: none;
    border: none;
    font-size: 0.85em;
    color: #0ef;
    cursor: pointer;
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
    margin: 20px 0;
    transition: 0.3s ease;
  }

  .btn:hover:not(:disabled) {
    background: #00d4ff;
  }

  .btn:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }

  .signup-link {
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
    margin-bottom: 15px;
    font-size: 0.9em;
  }
`;

export default Login;
