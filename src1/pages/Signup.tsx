import React, { useState, FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { auth } from "../firebase";
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';

const Form = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    setSubmitting(true);
    try {
      const cred = await createUserWithEmailAndPassword(auth, email.trim(), password);
      if (cred.user) {
        try { await updateProfile(cred.user, { displayName: name }); } catch (e) { console.warn('Failed to set displayName', e); }
      }
      navigate('/');
    } catch (err: any) {
      setError(err?.message || 'Signup failed');
    } finally { setSubmitting(false); }
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
              <h2 className="text-3xl font-serif font-bold text-[#4A2C3D]">Create Account</h2>
              <p className="text-[#8B5E6B] mt-2 text-sm">Join the Pardesi Naari family</p>
            </div>

            {error && <div className="bg-[#FFF0F3] text-[#B76E79] text-sm p-3 rounded-xl mb-6 text-center">{error}</div>}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-[#4A2C3D] mb-1">Full Name</label>
                <input placeholder="Enter your full name" type="text" value={name} onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-3 border border-[#F5C6D0]/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#B76E79] text-sm" />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#4A2C3D] mb-1">Email</label>
                <input placeholder="Enter your email" type="email" value={email} onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 border border-[#F5C6D0]/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#B76E79] text-sm" />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#4A2C3D] mb-1">Phone Number</label>
                <input placeholder="Enter your phone number" type="tel" value={phone} onChange={(e) => setPhone(e.target.value)}
                  className="w-full px-4 py-3 border border-[#F5C6D0]/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#B76E79] text-sm" />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#4A2C3D] mb-1">Password</label>
                <input placeholder="Create a password" type="password" value={password} onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 border border-[#F5C6D0]/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#B76E79] text-sm" />
              </div>

              <button type="submit" disabled={submitting}
                className="w-full bg-gradient-to-r from-[#B76E79] to-[#D4A574] text-white py-3.5 rounded-xl font-semibold hover:shadow-lg transition-all disabled:opacity-50 mt-2">
                {submitting ? 'Creating Account…' : 'Sign Up'}
              </button>

              <p className="text-center text-sm text-[#8B5E6B]">
                Already have an account? <Link to="/login" className="text-[#B76E79] font-semibold hover:underline">Login Here</Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Form;
