import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth, db } from "../firebase";
import { onAuthStateChanged, updateProfile, verifyBeforeUpdateEmail, reauthenticateWithCredential, EmailAuthProvider, updatePassword, signOut, User, ActionCodeSettings } from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { Edit } from "lucide-react";
import { toast } from "@/components/ui/use-toast";
import { PageNav } from '../components/PageNav';
import { Footer } from '../components/Footer';

const AccountSettings: React.FC = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  const [currentPasswordForReauth, setCurrentPasswordForReauth] = useState("");
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<null | "profile" | "address">(null);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [updating, setUpdating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [addressCountry, setAddressCountry] = useState("India");
  const [addressCity, setAddressCity] = useState("Mumbai");
  const [addressPostalCode, setAddressPostalCode] = useState("400001");
  const [addressStreet, setAddressStreet] = useState("Not set");

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => {
      if (!u) { navigate("/login"); return; }
      setUser(u); setUsername(u.displayName ?? ""); setEmail(u.email ?? "");
      const loadAddress = async () => {
        try {
          const docSnap = await getDoc(doc(db, 'users', u.uid));
          if (docSnap.exists()) {
            const data = docSnap.data();
            setAddressCountry(data.addressCountry ?? "India");
            setAddressCity(data.addressCity ?? "Mumbai");
            setAddressPostalCode(data.addressPostalCode ?? "400001");
            setAddressStreet(data.addressStreet ?? "Not set");
          }
        } catch (err) {}
      };
      loadAddress();
      setLoading(false);
    });
    return () => unsub();
  }, [navigate]);

  const handleProfileUpdate = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!user) return;
    setUpdating(true); setError(null);
    const emailChanged = email !== user.email;
    const displayNameChanged = username !== user.displayName;
    if (!emailChanged && !displayNameChanged) { setUpdating(false); setEditing(null); return; }

    try {
      if (displayNameChanged) await updateProfile(user, { displayName: username });
      if (emailChanged) {
        if (!currentPasswordForReauth) throw new Error("Please re-enter your current password to change your email.");
        const credential = EmailAuthProvider.credential(user.email ?? "", currentPasswordForReauth);
        await reauthenticateWithCredential(user, credential);
        const actionCodeSettings: ActionCodeSettings = { url: window.location.origin + "/account-settings", handleCodeInApp: true };
        await verifyBeforeUpdateEmail(user, email, actionCodeSettings);
        toast({ title: "Email update pending verification", description: "Verification link sent to new email." });
        setEmail(user.email ?? "");
      } else { toast({ title: "Profile updated successfully." }); }
      setEditing(null); setError(null); setCurrentPasswordForReauth("");
    } catch (err: any) { setError(err.message || "Failed to update profile."); } finally { setUpdating(false); }
  };

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !user.email) return;
    if (newPassword !== confirmPassword) { setError("Passwords do not match."); return; }
    setUpdating(true); setError(null);
    try {
      const cred = EmailAuthProvider.credential(user.email, currentPassword);
      await reauthenticateWithCredential(user, cred);
      await updatePassword(user, newPassword);
      toast({ title: "Password updated" });
      setCurrentPassword(""); setNewPassword(""); setConfirmPassword("");
    } catch (err: any) { setError(err.message || "Failed to change password."); } finally { setUpdating(false); }
  };

  const handleLogout = async () => { await signOut(auth); navigate("/login"); };

  if (loading) return <div className="min-h-screen bg-[#FFF8F5] flex items-center justify-center text-[#B76E79]">Loading account…</div>;

  return (
    <div className="min-h-screen bg-[#FFF8F5] flex flex-col">
      <PageNav subtitle="Account Settings" />

      <main className="flex-1 max-w-6xl mx-auto px-4 lg:px-8 mt-12 w-full">
        {/* Header Profile Card */}
        <div className="bg-white rounded-2xl shadow-sm border border-[#F5C6D0]/30 p-8 flex flex-col md:flex-row items-center md:items-start gap-8">
          <img src={user?.photoURL ?? "/img/user.png"} alt="avatar" className="h-28 w-28 rounded-full object-cover border-4 border-[#FFF0F3] shadow-sm" />
          <div className="flex-1 text-center md:text-left w-full">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <div>
                <h3 className="text-2xl font-serif font-bold text-[#4A2C3D]">{user?.displayName ?? user?.email?.split("@")[0]}</h3>
                <p className="text-[#8B5E6B] font-medium">{user?.email}</p>
              </div>
              <div className="flex items-center gap-3 w-full md:w-auto">
                <button onClick={() => setEditing("profile")} className="flex-1 md:flex-none px-6 py-2.5 bg-gradient-to-r from-[#B76E79] to-[#D4A574] text-white rounded-xl font-medium shadow-sm hover:shadow flex justify-center items-center gap-2">
                  <Edit size={16} /> Edit Profile
                </button>
                <button onClick={handleLogout} className="flex-1 md:flex-none px-6 py-2.5 bg-white border border-[#F5C6D0] text-[#B76E79] rounded-xl font-medium hover:bg-[#FFF0F3]">
                  Logout
                </button>
              </div>
            </div>
            <p className="mt-4 text-sm text-[#8B5E6B]">Manage your personal information, address, and security preferences.</p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mt-8">
          {/* Profile Details */}
          <section className="bg-white rounded-2xl shadow-sm border border-[#F5C6D0]/30 p-8">
            <div className="flex items-center justify-between mb-6 border-b border-[#F5C6D0]/30 pb-4">
              <h4 className="font-serif font-bold text-xl text-[#4A2C3D]">Personal Information</h4>
            </div>

            {editing === "profile" ? (
              <form onSubmit={handleProfileUpdate} className="space-y-4">
                {error && <div className="text-red-500 text-sm bg-red-50 p-3 rounded-lg">{error}</div>}
                <div><label className="block text-sm font-medium text-[#4A2C3D] mb-1">Name</label><input value={username} onChange={e => setUsername(e.target.value)} className="w-full border border-[#F5C6D0]/50 rounded-xl px-4 py-2.5 focus:ring-2 focus:ring-[#B76E79] outline-none" /></div>
                <div><label className="block text-sm font-medium text-[#4A2C3D] mb-1">Email</label><input value={email} onChange={e => setEmail(e.target.value)} type="email" className="w-full border border-[#F5C6D0]/50 rounded-xl px-4 py-2.5 focus:ring-2 focus:ring-[#B76E79] outline-none" /></div>
                {email !== user?.email && (<div><label className="block text-sm font-medium text-[#4A2C3D] mb-1">Current Password (required for email change)</label><input value={currentPasswordForReauth} onChange={e => setCurrentPasswordForReauth(e.target.value)} type="password" required className="w-full border border-[#F5C6D0]/50 rounded-xl px-4 py-2.5 focus:ring-2 focus:ring-[#B76E79] outline-none" /></div>)}
                <div className="flex gap-3 pt-2">
                  <button type="submit" disabled={updating} className="px-6 py-2 bg-[#B76E79] text-white rounded-xl font-medium">{updating ? "Saving..." : "Save Changes"}</button>
                  <button type="button" onClick={() => setEditing(null)} className="px-6 py-2 border border-[#F5C6D0] text-[#B76E79] rounded-xl font-medium">Cancel</button>
                </div>
              </form>
            ) : (
              <dl className="space-y-4">
                <div><dt className="text-xs font-semibold text-[#B76E79] uppercase tracking-wider">Full Name</dt><dd className="text-[#4A2C3D] font-medium mt-1">{user?.displayName ?? "Not provided"}</dd></div>
                <div><dt className="text-xs font-semibold text-[#B76E79] uppercase tracking-wider">Email Address</dt><dd className="text-[#4A2C3D] font-medium mt-1">{user?.email}</dd></div>
              </dl>
            )}
          </section>

          {/* Address */}
          <section className="bg-white rounded-2xl shadow-sm border border-[#F5C6D0]/30 p-8">
            <div className="flex items-center justify-between mb-6 border-b border-[#F5C6D0]/30 pb-4">
              <h4 className="font-serif font-bold text-xl text-[#4A2C3D]">Shipping Address</h4>
              <button onClick={() => setEditing(s => s === "address" ? null : "address")} className="text-sm font-medium text-[#B76E79] hover:underline">{editing === "address" ? "Cancel" : "Edit"}</button>
            </div>

            {editing === "address" ? (
              <form className="space-y-4" onSubmit={async e => {
                e.preventDefault(); if (!user) return; setUpdating(true);
                try { await setDoc(doc(db, 'users', user.uid), { addressCountry, addressCity, addressPostalCode, addressStreet }, { merge: true }); toast({ title: "Address saved." }); setEditing(null); } catch (err) {} finally { setUpdating(false); }
              }}>
                <div><label className="block text-sm font-medium text-[#4A2C3D] mb-1">Country</label><input value={addressCountry} onChange={e => setAddressCountry(e.target.value)} className="w-full border border-[#F5C6D0]/50 rounded-xl px-4 py-2.5 focus:ring-2 focus:ring-[#B76E79] outline-none" /></div>
                <div><label className="block text-sm font-medium text-[#4A2C3D] mb-1">Street</label><input value={addressStreet} onChange={e => setAddressStreet(e.target.value)} className="w-full border border-[#F5C6D0]/50 rounded-xl px-4 py-2.5 focus:ring-2 focus:ring-[#B76E79] outline-none" /></div>
                <div className="grid grid-cols-2 gap-4">
                  <div><label className="block text-sm font-medium text-[#4A2C3D] mb-1">City</label><input value={addressCity} onChange={e => setAddressCity(e.target.value)} className="w-full border border-[#F5C6D0]/50 rounded-xl px-4 py-2.5 focus:ring-2 focus:ring-[#B76E79] outline-none" /></div>
                  <div><label className="block text-sm font-medium text-[#4A2C3D] mb-1">Postal Code</label><input value={addressPostalCode} onChange={e => setAddressPostalCode(e.target.value)} className="w-full border border-[#F5C6D0]/50 rounded-xl px-4 py-2.5 focus:ring-2 focus:ring-[#B76E79] outline-none" /></div>
                </div>
                <div className="pt-2"><button type="submit" disabled={updating} className="w-full py-2.5 bg-[#B76E79] text-white rounded-xl font-medium">{updating ? "Saving..." : "Save Address"}</button></div>
              </form>
            ) : (
              <dl className="space-y-4">
                <div><dt className="text-xs font-semibold text-[#B76E79] uppercase tracking-wider">Street Address</dt><dd className="text-[#4A2C3D] font-medium mt-1">{addressStreet}</dd></div>
                <div><dt className="text-xs font-semibold text-[#B76E79] uppercase tracking-wider">City</dt><dd className="text-[#4A2C3D] font-medium mt-1">{addressCity}</dd></div>
                <div><dt className="text-xs font-semibold text-[#B76E79] uppercase tracking-wider">Postal Code</dt><dd className="text-[#4A2C3D] font-medium mt-1">{addressPostalCode}</dd></div>
                <div><dt className="text-xs font-semibold text-[#B76E79] uppercase tracking-wider">Country</dt><dd className="text-[#4A2C3D] font-medium mt-1">{addressCountry}</dd></div>
              </dl>
            )}
          </section>
        </div>

        {/* Security / Password */}
        <div className="bg-white rounded-2xl shadow-sm border border-[#F5C6D0]/30 p-8 mt-8 mb-12 max-w-3xl">
          <h4 className="font-serif font-bold text-xl text-[#4A2C3D] mb-6 border-b border-[#F5C6D0]/30 pb-4">Security Settings</h4>
          <form onSubmit={handlePasswordChange} className="space-y-4">
            {error && !editing && <div className="text-red-500 text-sm bg-red-50 p-3 rounded-lg">{error}</div>}
            <div><label className="block text-sm font-medium text-[#4A2C3D] mb-1">Current Password</label><input type="password" value={currentPassword} onChange={e => setCurrentPassword(e.target.value)} required className="w-full border border-[#F5C6D0]/50 rounded-xl px-4 py-2.5 focus:ring-2 focus:ring-[#B76E79] outline-none" /></div>
            <div><label className="block text-sm font-medium text-[#4A2C3D] mb-1">New Password</label><input type="password" value={newPassword} onChange={e => setNewPassword(e.target.value)} required className="w-full border border-[#F5C6D0]/50 rounded-xl px-4 py-2.5 focus:ring-2 focus:ring-[#B76E79] outline-none" /></div>
            <div><label className="block text-sm font-medium text-[#4A2C3D] mb-1">Confirm New Password</label><input type="password" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} required className="w-full border border-[#F5C6D0]/50 rounded-xl px-4 py-2.5 focus:ring-2 focus:ring-[#B76E79] outline-none" /></div>
            <div className="pt-2"><button type="submit" disabled={updating} className="px-6 py-2.5 bg-[#4A2C3D] text-white rounded-xl font-medium hover:bg-[#321E2A]">{updating ? "Updating..." : "Update Password"}</button></div>
          </form>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default AccountSettings;
