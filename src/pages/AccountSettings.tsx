import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth, db } from "../firebase";
import {
  onAuthStateChanged,
  updateProfile,
  verifyBeforeUpdateEmail,
  reauthenticateWithCredential,
  EmailAuthProvider,
  updatePassword,
  signOut,
  User,
  ActionCodeSettings,
} from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { ChevronLeft, ChevronRight, Edit, ShoppingCart, Menu, X } from "lucide-react";
import { toast } from "@/components/ui/use-toast";

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
  const [promoIndex, setPromoIndex] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);
  // Address state (so edits reflect immediately in the UI)
  const [addressCountry, setAddressCountry] = useState("United Kingdom");
  const [addressCity, setAddressCity] = useState("Leeds, East London");
  const [addressPostalCode, setAddressPostalCode] = useState("ERT 1254");
  const [addressStreet, setAddressStreet] = useState("Not set");

  const promos = [
    "Flat 50% off on every product. Save upto 500 on your first order",
    "Free shipping on orders above Rs. 999",
    "New arrivals every week - Shop the latest trends",
  ];

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => {
      if (!u) {
        navigate("/login");
        return;
      }
      setUser(u);
      setUsername(u.displayName ?? "");
      setEmail(u.email ?? "");
      // Load address from Firestore
      const loadAddress = async () => {
        try {
          const docRef = doc(db, 'users', u.uid);
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            const data = docSnap.data();
            setAddressCountry(data.addressCountry ?? "United Kingdom");
            setAddressCity(data.addressCity ?? "Leeds, East London");
            setAddressPostalCode(data.addressPostalCode ?? "ERT 1254");
            setAddressStreet(data.addressStreet ?? "Not set");
          }
        } catch (err) {
          console.error("Error loading address:", err);
        }
      };
      loadAddress();
      setLoading(false);
    });
    return () => unsub();
  }, [navigate]);

  useEffect(() => {
    function onDocClick(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMobileMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", onDocClick);
    return () => document.removeEventListener("mousedown", onDocClick);
  }, []);

  const handleProfileUpdate = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!user) return;
    setUpdating(true);
    setError(null);

    const emailChanged = email !== user.email;
    const displayNameChanged = username !== user.displayName;

    if (!emailChanged && !displayNameChanged) {
      setUpdating(false);
      toast({ title: "No changes detected." });
      setEditing(null);
      return;
    }

    try {
      if (displayNameChanged) {
        await updateProfile(user, { displayName: username });
      }

      if (emailChanged) {
        if (!currentPasswordForReauth) {
          throw new Error("Please re-enter your current password to change your email.");
        }
        const credential = EmailAuthProvider.credential(user.email ?? "", currentPasswordForReauth);
        await reauthenticateWithCredential(user, credential);

        const actionCodeSettings: ActionCodeSettings = {
          url: window.location.origin + "/account-settings",
          handleCodeInApp: true,
        };

        await verifyBeforeUpdateEmail(user, email, actionCodeSettings);

        toast({
          title: "Email update pending verification",
          description: "A verification link was sent to your NEW email. Complete verification to finalize the change.",
        });

        setEmail(user.email ?? "");
      } else {
        toast({ title: "Profile updated successfully." });
      }

      setEditing(null);
      setError(null);
      setCurrentPasswordForReauth("");
    } catch (err: any) {
      console.error("Error updating profile:", err);
      if (err.code === "auth/requires-recent-login") {
        setError("This is a sensitive operation. Please re-enter your current password to proceed.");
      } else if (err.code === "auth/invalid-credential") {
        setError("Invalid current password provided for reauthentication.");
      } else if (err.code === "auth/email-already-in-use") {
        setError("This new email is already in use by another Firebase account.");
      } else {
        setError(err.message || "Failed to update profile. Please try again.");
      }
    } finally {
      setUpdating(false);
    }
  };

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !user.email) return;
    if (newPassword !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    setUpdating(true);
    setError(null);
    try {
      const cred = EmailAuthProvider.credential(user.email, currentPassword);
      await reauthenticateWithCredential(user, cred);
      await updatePassword(user, newPassword);
      toast({ title: "Password updated" });
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (err: any) {
      setError(err.message || "Failed to change password.");
    } finally {
      setUpdating(false);
    }
  };

  const handleLogout = async () => {
    await signOut(auth);
    navigate("/login");
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F9FBC3]">
        <div className="bg-[#F5E6B3] border-b-2 border-black py-2 px-4 flex items-center justify-between">
          <button aria-label="previous promo" onClick={() => setPromoIndex((promoIndex - 1 + promos.length) % promos.length)}>
            <ChevronLeft size={20} />
          </button>
          <p className="text-sm text-center flex-1">{promos[promoIndex]}</p>
          <button aria-label="next promo" onClick={() => setPromoIndex((promoIndex + 1) % promos.length)}>
            <ChevronRight size={20} />
          </button>
        </div>
        <div className="container mx-auto py-12">Loading account…</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F9FBC3] pb-12">
      {/* promo */}
      <div className="bg-[#F5E6B3] border-b-2 border-black py-2 px-4 flex items-center justify-between">
        <button aria-label="previous promo" onClick={() => setPromoIndex((promoIndex - 1 + promos.length) % promos.length)}>
          <ChevronLeft size={20} />
        </button>
        <p className="text-sm text-center flex-1">{promos[promoIndex]}</p>
        <button aria-label="next promo" onClick={() => setPromoIndex((promoIndex + 1) % promos.length)}>
          <ChevronRight size={20} />
        </button>
      </div>

      {/* nav (compact) */}
      <nav className="bg-[#FFD167] border-b-2 border-black sticky top-0 z-40">
        <div className="px-4 py-3 flex items-center justify-between max-w-6xl mx-auto">
          <div className="flex items-center gap-6">
            <Link to="/">
              <img src="img/logo.png" alt="Logo" className="h-10" />
            </Link>
            <h2 className="hidden md:block font-semibold">Missing Piece of your closet</h2>
          </div>
          <div className="flex items-center gap-4">
            <button className="relative hover:opacity-80" aria-label="Open shopping cart" title="Open shopping cart">
              <ShoppingCart size={20} />
            </button>
            <button onClick={() => setMobileMenuOpen((s) => !s)} className="md:hidden" aria-label="Toggle menu">
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
        {mobileMenuOpen && (
          <div className="md:hidden border-t-2 border-black p-4">
            <Link to="/" className="block py-2">Home</Link>
            <Link to="/" className="block py-2">Categories</Link>
          </div>
        )}
      </nav>

      <main className="max-w-6xl mx-auto px-4 mt-8">
        {/* header card */}
        <div className="bg-white rounded-xl shadow p-6 flex items-center gap-6">
          <div>
            <img
              src={user?.photoURL ?? "/img/user.png"}
              alt="avatar"
              className="h-24 w-24 rounded-full object-cover border"
            />
          </div>
          <div className="flex-1">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-xl font-bold">{user?.displayName ?? user?.email?.split("@")[0]}</h3>
                <p className="text-sm text-gray-600">Admin</p>
                <p className="text-sm text-gray-500">{/* location placeholder */}</p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setEditing("profile")}
                  className="px-4 py-2 bg-[#FF8C2B] text-white rounded-md flex items-center gap-2"
                >
                  <Edit size={16} /> Edit
                </button>
                <button onClick={handleLogout} className="px-4 py-2 border rounded-md">
                  Logout
                </button>
              </div>
            </div>
            <p className="mt-4 text-sm text-gray-600">Manage your personal information, security & account preferences.</p>
          </div>
        </div>

        {/* grid: Personal info + Address */}
        <div className="grid md:grid-cols-2 gap-6 mt-6">
          {/* Personal Information */}
          <section className="bg-white rounded-xl shadow p-6">
            <div className="flex items-center justify-between mb-4">
              <h4 className="font-semibold text-lg">Personal Information</h4>
              <button onClick={() => setEditing((s) => (s === "profile" ? null : "profile"))} className="text-sm px-3 py-1 border rounded">
                {editing === "profile" ? "Close" : "Edit"}
              </button>
            </div>

            {!editing || editing !== "profile" ? (
              <dl className="grid grid-cols-1 gap-3 text-sm">
                <div className="flex justify-between">
                  <dt className="text-gray-500">Name</dt>
                  <dd>{user?.displayName ?? "—"}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-gray-500">Email</dt>
                  <dd>{user?.email ?? "—"}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-gray-500">Phone</dt>
                  <dd>Not set</dd>
                </div>
              </dl>
            ) : (
              <form onSubmit={handleProfileUpdate} className="space-y-3">
                {error && <div className="text-red-600 text-sm">{error}</div>}
                <div>
                  <label htmlFor="account-name" className="block text-sm text-gray-600">Name</label>
                  <input
                    id="account-name"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="mt-1 w-full border rounded px-3 py-2"
                    placeholder="Your name"
                    title="Full name"
                  />
                </div>
                <div>
                  <label htmlFor="account-email" className="block text-sm text-gray-600">Email</label>
                  <input
                    id="account-email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    type="email"
                    title="Your email address"
                    placeholder="you@example.com"
                    className="mt-1 w-full border rounded px-3 py-2"
                  />
                </div>
                {email !== user?.email && (
                  <div>
                    <label htmlFor="current-password-reauth-input" className="block text-sm text-gray-600">Current Password (for email change)</label>
                    <input
                      id="current-password-reauth-input"
                      value={currentPasswordForReauth}
                      onChange={(e) => setCurrentPasswordForReauth(e.target.value)}
                      type="password"
                      className="mt-1 w-full border rounded px-3 py-2"
                      placeholder="Required to change email"
                      required={email !== user?.email}
                    />
                  </div>
                )}
                <div className="flex gap-2">
                  <button type="submit" disabled={updating} className="px-4 py-2 bg-green-700 text-white rounded">
                    {updating ? "Saving..." : "Save"}
                  </button>
                  <button type="button" onClick={() => { setEditing(null); setError(null); }} className="px-4 py-2 border rounded">
                    Cancel
                  </button>
                </div>
              </form>
            )}
          </section>

          {/* Address (placeholder) */}
          <section className="bg-white rounded-xl shadow p-6">
            <div className="flex items-center justify-between mb-4">
              <h4 className="font-semibold text-lg">Address</h4>
              <button onClick={() => setEditing((s) => (s === "address" ? null : "address"))} className="text-sm px-3 py-1 border rounded">
                {editing === "address" ? "Close" : "Edit"}
              </button>
            </div>

            {!editing || editing !== "address" ? (
              <dl className="grid grid-cols-1 gap-3 text-sm">
                <div className="flex justify-between">
                  <dt className="text-gray-500">Country</dt>
                  <dd>{addressCountry}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-gray-500">City</dt>
                  <dd>{addressCity}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-gray-500">Postal Code</dt>
                  <dd>{addressPostalCode}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-gray-500">Street</dt>
                  <dd>{addressStreet}</dd>
                </div>
              </dl>
            ) : (
              <form
                className="space-y-3"
                onSubmit={async (e) => {
                  e.preventDefault();
                  if (!user) return;
                  setUpdating(true);
                  try {
                    // Save address to Firestore
                    await setDoc(doc(db, 'users', user.uid), {
                      addressCountry,
                      addressCity,
                      addressPostalCode,
                      addressStreet,
                    }, { merge: true });
                    toast({ title: "Address saved successfully." });
                    setEditing(null);
                  } catch (err: any) {
                    console.error("Error saving address:", err);
                    setError(err.message || "Failed to save address.");
                  } finally {
                    setUpdating(false);
                  }
                }}
              >
                <div>
                  <label className="block text-sm text-gray-600">Country</label>
                  <input
                    className="mt-1 w-full border rounded px-3 py-2"
                    value={addressCountry}
                    onChange={(e) => setAddressCountry(e.target.value)}
                    placeholder="Country"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-600">City</label>
                  <input
                    className="mt-1 w-full border rounded px-3 py-2"
                    value={addressCity}
                    onChange={(e) => setAddressCity(e.target.value)}
                    placeholder="City, area"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-600">Postal Code</label>
                  <input
                    className="mt-1 w-full border rounded px-3 py-2"
                    value={addressPostalCode}
                    onChange={(e) => setAddressPostalCode(e.target.value)}
                    placeholder="Postal code"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-600">Street</label>
                  <input
                    className="mt-1 w-full border rounded px-3 py-2"
                    value={addressStreet}
                    onChange={(e) => setAddressStreet(e.target.value)}
                    placeholder="Street / line 1"
                  />
                </div>
                <div className="flex gap-2">
                  <button type="submit" disabled={updating} className="px-4 py-2 bg-green-700 text-white rounded">
                    {updating ? "Saving..." : "Save"}
                  </button>
                  <button type="button" onClick={() => setEditing(null)} className="px-4 py-2 border rounded">Cancel</button>
                </div>
              </form>
            )}
          </section>
        </div>

        {/* Security: change password */}
        <div className="bg-white rounded-xl shadow p-6 mt-6 max-w-2xl">
          <div className="flex items-center justify-between mb-4">
            <h4 className="font-semibold text-lg">Security</h4>
          </div>

          {error && <div className="mb-3 text-red-600">{error}</div>}

          <form onSubmit={handlePasswordChange} className="grid grid-cols-1 gap-3">
            <div>
              <label className="block text-sm text-gray-600">Current password</label>
              <input value={currentPassword} onChange={(e) => setCurrentPassword(e.target.value)} type="password" title="Current password" placeholder="Enter your current password" className="mt-1 w-full border rounded px-3 py-2" required />
            </div>
            <div>
              <label className="block text-sm text-gray-600">New password</label>
              <input value={newPassword} onChange={(e) => setNewPassword(e.target.value)} type="password" title="New password" placeholder="Enter a new password" className="mt-1 w-full border rounded px-3 py-2" required />
            </div>
            <div>
              <label className="block text-sm text-gray-600">Confirm new password</label>
              <input value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} type="password" title="Confirm new password" placeholder="Re-enter the new password" className="mt-1 w-full border rounded px-3 py-2" required />
            </div>
            <div className="flex gap-2">
              <button type="submit" disabled={updating} className="px-4 py-2 bg-blue-600 text-white rounded">
                {updating ? "Updating…" : "Change password"}
              </button>
              <button type="button" onClick={() => { setCurrentPassword(""); setNewPassword(""); setConfirmPassword(""); }} className="px-4 py-2 border rounded">
                Reset
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
};

export default AccountSettings;
