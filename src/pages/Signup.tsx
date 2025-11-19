import React, { useState, FormEvent } from 'react';
import styled from 'styled-components';
import { ShoppingCart, X, Menu } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { auth } from "../firebase";
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';

const Form = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [cartCount, setCartCount] = useState(2);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();

  const scrollToSection = (id) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    setSubmitting(true);
    try {
      const cred = await createUserWithEmailAndPassword(auth, email.trim(), password);
      if (cred.user) {
        try {
          await updateProfile(cred.user, { displayName: name });
        } catch (e) {
          // non-fatal: profile update failed
          console.warn('Failed to set displayName', e);
        }
      }
      navigate('/');
    } catch (err: any) {
      setError(err?.message || 'Signup failed');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <StyledWrapper>
        <nav className="bg-[#FFD167] border-b-2 border-black sticky top-0 z-40 w-full">
          <div className="px-3 py-4 flex items-center justify-between">
          <div className="flex items-center gap-8">
           <Link to="/" className="hover:underline font-semibold">
           <img
              src="img/logo.png"
              alt="Logo"
              className="h-12"
            />
            </Link>
            <h1 className="text-xl font-bold md:block hidden">Missing Piece of your closet</h1>
          </div>
          <div className="flex items-center gap-4">
            <div className=" md:flex gap-6">
              <Link to="/" className="hover:underline font-semibold">Home</Link>
            </div>

          </div>
        </div>
        {mobileMenuOpen && (
          <div className="md:hidden border-t-2 border-black p-4">
            <a href="#home" className="block py-2 hover:underline font-semibold">
              Home
            </a>
            
            <button
              onClick={() => {
                scrollToSection('new-arrivals');
                setMobileMenuOpen(false);
              }}
              className="block py-2 hover:underline font-semibold w-full text-left"
            >
              Categories
            </button>
          </div>
        )}
      </nav>

      <div className="container flex flex-col justify-center items-center min-h-screen bg-[#fef5c9]">
        <div className="form_area p-8">
          <p className="title">SIGN UP</p>
          <form onSubmit={handleSubmit}>
            <div className="form_group">
              <label className="sub_title" htmlFor="name">Name</label>
              <input placeholder="Enter your full name" className="form_style" type="text" value={name} onChange={(e) => setName(e.target.value)} />
            </div>
            <div className="form_group">
              <label className="sub_title" htmlFor="email">Email</label>
              <input placeholder="Enter your email" id="email" className="form_style" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div className="form_group">
              <label className="sub_title" htmlFor="email">Phone No.</label>
              <input placeholder="Enter your phone number" id="number" className="form_style" type="tel" />
            </div>
            <div className="form_group">
              <label className="sub_title" htmlFor="password">Password</label>
              <input placeholder="Enter your password" id="password" className="form_style" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            </div>
            <div>
              <button className="btn" type="submit" disabled={submitting}>{submitting ? 'Signing up…' : 'SIGN UP'}</button>
              {error && <p style={{ color: 'red' }}>{error}</p>}
              <p>Have an Account? <Link className="link" to="/login">Login Here!</Link></p>
            </div>
          </form>
        </div>
      </div>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  .form_area {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    background-color: #EDDCD9;
    height: auto;
    width: auto;
    border: 2px solid #264143;
    border-radius: 20px;
    box-shadow: 3px 4px 0px 1px #E99F4C;
  }

  .title {
    color: #264143;
    font-weight: 900;
    font-size: 1.5em;
    margin-top: 20px;
  }

  .sub_title {
    font-weight: 600;
    margin: 5px 0;
  }

  .form_group {
    display: flex;
    flex-direction: column;
    align-items: baseline;
    margin: 10px;
  }

  .form_style {
    outline: none;
    border: 2px solid #264143;
    box-shadow: 3px 4px 0px 1px #E99F4C;
    width: 290px;
    padding: 12px 10px;
    border-radius: 4px;
    font-size: 15px;
  }

  .form_style:focus, .btn:focus {
    transform: translateY(4px);
    box-shadow: 1px 2px 0px 0px #E99F4C;
  }

  .btn {
    padding: 15px;
    margin: 25px 0px;
    width: 290px;
    font-size: 15px;
    background: #DE5499;
    border-radius: 10px;
    font-weight: 800;
    box-shadow: 3px 3px 0px 0px #E99F4C;
  }

  .btn:hover {
    opacity: .9;
  }

  .link {
    font-weight: 800;
    color: #264143;
    padding: 5px;
  }`;

export default Form;
