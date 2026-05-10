"use client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import emailjs from "@emailjs/browser";
import { MapPin, Phone, Mail, Clock, Globe, Link2, Loader, ArrowRight, CheckCircle } from "lucide-react";
import { Link } from "@/components/common/Link";
import { Button } from "@/components/ui/button";
import {
  EMAILJS_SERVICE_ID,
  EMAILJS_TEMPLATE_ID,
  EMAILJS_PUBLIC_KEY,
  COMPANY_EMAIL,
} from "@/integrations/forms/emailConfig";

// ─── Types ────────────────────────────────────────────────────────────────────

interface ContactFormData {
  name: string;
  email: string;
  phone?: string;
  message: string;
  newsletter_opt_in?: boolean;
}

// ─── Contact Form ─────────────────────────────────────────────────────────────

function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormData>({
    defaultValues: { name: "", email: "", phone: "", message: "", newsletter_opt_in: false },
  });

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    setSubmitError(null);

    try {
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        {
          from_name:       data.name,
          from_email:      data.email,
          phone:           data.phone || "Not provided",
          message:         data.message,
          newsletter:      data.newsletter_opt_in ? "Yes — joined Inner Circle" : "No",
          to_email:        COMPANY_EMAIL,
          submission_time: new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" }),
        },
        EMAILJS_PUBLIC_KEY,
      );

      setIsSubmitted(true);
    } catch (err) {
      console.error("EmailJS error:", err);
      setSubmitError("An error occurred. Please contact our concierge directly.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // ── Success State ───────────────────────────────────────────────────────────
  if (isSubmitted) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center space-y-6 animate-in fade-in duration-500">
        <div className="size-20 rounded-full bg-primary/10 flex items-center justify-center mb-2 border border-primary/20">
          <CheckCircle className="size-10 text-primary" />
        </div>
        <h3 className="font-default text-2xl font-semibold text-foreground">Inquiry Received</h3>
        <p className="text-muted-foreground max-w-sm font-light leading-relaxed">
          Your inquiry has been received. A senior consultant will contact you within 24 hours.
        </p>
        <Button
          onClick={() => { reset(); setIsSubmitted(false); }}
          variant="outline"
          className="mt-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground rounded-none"
        >
          Send Another Inquiry
        </Button>
      </div>
    );
  }

  const inputStyles =
    "w-full border-x-0 border-t-0 border-b border-primary/20 rounded-none px-0 bg-transparent shadow-none focus:outline-none focus:border-primary text-base md:text-lg h-12 transition-colors placeholder:text-muted-foreground/30 text-foreground";

  // ── Form ────────────────────────────────────────────────────────────────────
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8" noValidate>
      <div className="space-y-6">
        {/* Full Name */}
        <div>
          <label className="block text-muted-foreground uppercase tracking-widest text-[10px] font-default mb-2">
            Full Name <span className="text-primary">*</span>
          </label>
          <input
            type="text"
            placeholder="Alexander Sterling"
            className={inputStyles}
            {...register("name", {
              required: "Name is required",
              minLength: { value: 2, message: "Name must be at least 2 characters" },
            })}
          />
          {errors.name && (
            <p className="text-destructive text-xs mt-1">{errors.name.message}</p>
          )}
        </div>

        {/* Email */}
        <div>
          <label className="block text-muted-foreground uppercase tracking-widest text-[10px] font-default mb-2">
            Email Address <span className="text-primary">*</span>
          </label>
          <input
            type="email"
            placeholder="alex@prestige.com"
            className={inputStyles}
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "Invalid email address",
              },
            })}
          />
          {errors.email && (
            <p className="text-destructive text-xs mt-1">{errors.email.message}</p>
          )}
        </div>

        {/* Phone */}
        <div>
          <label className="block text-muted-foreground uppercase tracking-widest text-[10px] font-default mb-2">
            Phone (Optional)
          </label>
          <input
            type="tel"
            placeholder="+1 (555) 000-0000"
            className={inputStyles}
            {...register("phone")}
          />
        </div>

        {/* Message */}
        <div>
          <label className="block text-muted-foreground uppercase tracking-widest text-[10px] font-default mb-2">
            Event Details <span className="text-primary">*</span>
          </label>
          <textarea
            placeholder="Describe your vision for the occasion..."
            className={`min-h-[120px] resize-none ${inputStyles}`}
            {...register("message", {
              required: "Event details are required",
              minLength: { value: 10, message: "Please describe your event in at least 10 characters" },
            })}
          />
          {errors.message && (
            <p className="text-destructive text-xs mt-1">{errors.message.message}</p>
          )}
        </div>

        {/* Newsletter */}
        <div className="flex flex-row items-start space-x-3 pt-2">
          <input
            type="checkbox"
            id="newsletter_opt_in"
            className="mt-1 size-4 shrink-0 accent-primary bg-transparent focus:outline-none"
            {...register("newsletter_opt_in")}
          />
          <div className="space-y-1 leading-none">
            <label htmlFor="newsletter_opt_in" className="text-xs font-medium text-foreground cursor-pointer font-default">
              Join the EVENT ZONE Inner Circle
            </label>
            <p className="text-[10px] text-muted-foreground uppercase tracking-tight mt-1">
              Receive exclusive invitations to private galas and industry insights.
            </p>
          </div>
        </div>
      </div>

      {/* Error */}
      {submitError && (
        <div className="p-4 bg-destructive/5 border border-destructive/20 rounded-none">
          <p className="text-destructive text-xs font-default">{submitError}</p>
        </div>
      )}

      {/* Submit */}
      <Button
        type="submit"
        disabled={isSubmitting}
        className="w-full h-14 text-sm tracking-[0.2em] uppercase font-semibold bg-primary text-primary-foreground hover:bg-primary/90 rounded-none transition-all duration-500 group border border-primary"
      >
        {isSubmitting ? (
          <>
            <Loader className="animate-spin mr-2 size-4" />
            Sending your inquiry...
          </>
        ) : (
          <>
            Secure Your Date
            <ArrowRight className="ml-2 size-4 transition-transform group-hover:translate-x-1" />
          </>
        )}
      </Button>
    </form>
  );
}

// ─── Main Section ─────────────────────────────────────────────────────────────

export default function ElateSeEpafi() {
  return (
    <section
      data-section-id="233883"
      id="secure-your-date"
      className="bg-background text-foreground py-20 md:py-32 relative overflow-hidden"
    >
      {/* Background glow */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-primary/5 blur-[160px] rounded-none pointer-events-none -z-10" />

      <div className="container mx-auto px-4 md:px-6 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24">

          {/* ── Left: Contact Info ─────────────────────────────────────────── */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <div>
              <h2 className="font-default text-4xl md:text-5xl lg:text-7xl font-bold tracking-tighter mb-6">
                Secure Your{" "}
                <span className="text-primary italic font-serif font-light">Legacy</span>
              </h2>
              <p className="text-muted-foreground text-lg mb-12 max-w-md leading-relaxed font-default font-light">
                Begin the orchestration of your next landmark event. Our consultants are ready to
                transform your vision into an architectural masterpiece.
              </p>

              <div className="space-y-8">
                {[
                  {
                    icon: <MapPin className="size-5" />,
                    title: "Address",
                    content: "1, Opp. Keshopura Govt. School, Ajmer Road, Keshopura, Jaipur",
                  },
                  {
                    icon: <Phone className="size-5" />,
                    title: "Concierge Line",
                    content: (
                      <Link
                        to="tel:+917426809415"
                        className="text-muted-foreground hover:text-primary transition-colors font-light"
                      >
                        +91 7426 809 415
                      </Link>
                    ),
                  },
                  {
                    icon: <Mail className="size-5" />,
                    title: "Inquiries",
                    content: (
                      <Link
                        to={`mailto:${COMPANY_EMAIL}`}
                        className="text-muted-foreground hover:text-primary transition-colors font-light"
                      >
                        {COMPANY_EMAIL}
                      </Link>
                    ),
                  },
                  {
                    icon: <Clock className="size-5" />,
                    title: "Availability",
                    content: "Mon-Fri: 08:00-21:00 GMT",
                  },
                ].map(({ icon, title, content }) => (
                  <div key={title} className="flex items-start space-x-4 group">
                    <div className="p-3 bg-primary/5 rounded-none text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-500 border border-primary/10">
                      {icon}
                    </div>
                    <div>
                      <h4 className="font-default font-semibold text-sm uppercase tracking-widest mb-1">
                        {title}
                      </h4>
                      <p className="text-muted-foreground font-light">{content}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-16 pt-12 border-t border-border/30">
              <h4 className="font-default font-semibold text-[10px] uppercase tracking-[0.3em] mb-6 text-muted-foreground">
                Digital Presence
              </h4>
              <div className="flex space-x-6">
                <Link to="https://www.instagram.com/eventzone_dme" className="text-muted-foreground hover:text-primary transition-all duration-500" aria-label="Instagram">
                  <svg xmlns="http://www.w3.org/2000/svg" className="size-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
                </Link>
                <Link to="#" className="text-muted-foreground hover:text-primary transition-all duration-500" aria-label="Website">
                  <Globe className="size-5" />
                </Link>
              </div>
            </div>
          </div>

          {/* ── Right: Form ────────────────────────────────────────────────── */}
          <div className="lg:col-span-7">
            <div className="bg-card/30 backdrop-blur-md border border-border/40 p-8 md:p-12 rounded-none shadow-4xl">
              <div className="mb-10">
                <h3 className="font-default text-3xl font-bold mb-3 tracking-tight">
                  Consultation Request
                </h3>
                <p className="text-muted-foreground font-light">
                  Provide your details below to initiate the exclusive planning process.
                </p>
              </div>

              <ContactForm />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}