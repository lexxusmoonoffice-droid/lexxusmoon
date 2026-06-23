"use client";

import { useState, useRef } from "react";
import api from "@/lib/api";
import CountryCodeDropdown from "./CountryCodeDropdown";

export default function ContactSection() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    countryCode: "+91",
    phone: "",
    message: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitMsg, setSubmitMsg] = useState("");

  const [success, setSuccess] = useState(false);

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!formData.firstName.trim()) errs.firstName = "Enter a first name.";
    if (!formData.email.trim()) errs.email = "Enter an email address like example@mysite.com.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) errs.email = "Enter an email address like example@mysite.com.";
    if (!formData.phone.trim()) errs.phone = "Enter a phone number.";
    else if (!/^\d{7,15}$/.test(formData.phone.replace(/\s/g, ""))) errs.phone = "Enter a phone number.";
    if (!formData.message.trim()) errs.message = "Enter an answer.";
    return errs;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate();
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;
    setSubmitting(true);
    setSubmitMsg("");
    setSuccess(false);
    try {
      await api.post("/contacts", { ...formData, phone: `${formData.countryCode} ${formData.phone}` });
      setSuccess(true);
      setFormData({ firstName: "", lastName: "", email: "", countryCode: "+91", phone: "", message: "" });
    } catch {
      setSubmitMsg("Something went wrong. Please try again.");
    }
    setSubmitting(false);
  };

  const toggleVideo = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <section
      id="contact"
      className="bg-white relative"
      style={{ paddingTop: "160px" }}
    >
      {/* Grid on right side only - desktop */}
      <div
        className="hidden md:block absolute top-0 bottom-0 right-0"
        style={{
          width: "25%",
          backgroundImage:
            "linear-gradient(rgba(0,0,0,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.08) 1px, transparent 1px)",
          backgroundSize: "50px 50px",
          maskImage: "linear-gradient(to bottom, transparent 5%, black 25%, black 75%, transparent 95%)",
          WebkitMaskImage: "linear-gradient(to bottom, transparent 5%, black 25%, black 75%, transparent 95%)",
        }}
      />
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row">
        {/* Left - Video */}
        <div
          className="w-full md:w-[45%] relative cursor-pointer flex items-center justify-center min-h-[280px] md:min-h-[560px] overflow-hidden"
          onClick={toggleVideo}
        >
          <video
            ref={videoRef}
            autoPlay
            muted
            loop
            playsInline
            className="w-[100%] h-[100%] object-contain"
            style={{ mixBlendMode: 'darken', transform: 'scale(1.08) translateX(20px)' }}
          >
            <source src="/mr.mp4" type="video/mp4" />
          </video>
          {/* Pause/Play indicator */}
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-black/30 text-4xl font-light pointer-events-none"
            style={{
              opacity: isPlaying ? 0 : 1,
              transition: "opacity 0.3s",
            }}
          >
            ▶
          </div>
        </div>

        {/* Right - Contact Form */}
        <div
          className="w-full md:w-[55%] py-10 md:py-16 relative"
          style={{ paddingLeft: "24px", paddingRight: "24px" }}
        >
          {success ? (
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center", minHeight: 400 }}>
              <div style={{
                width: 80,
                height: 80,
                borderRadius: "50%",
                backgroundColor: "rgba(76,175,80,0.1)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginBottom: 28,
              }}>
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#4CAF50" strokeWidth="2.5"><path d="M20 6L9 17l-5-5"/></svg>
              </div>
              <h2 style={{ fontSize: 32, fontWeight: 800, color: "#171200", marginBottom: 12 }}>Thank You!</h2>
              <p style={{ fontSize: 16, color: "#666", maxWidth: 400, lineHeight: 1.7, marginBottom: 32 }}>
                Your message has been sent successfully. We&apos;ll get back to you as soon as possible.
              </p>
              <button
                onClick={() => setSuccess(false)}
                style={{
                  backgroundColor: "#E02222",
                  color: "#fff",
                  padding: "14px 40px",
                  fontSize: 14,
                  fontWeight: 600,
                  border: "none",
                  borderRadius: 8,
                  cursor: "pointer",
                  letterSpacing: "0.05em",
                }}
              >
                Send Another Message
              </button>
            </div>
          ) : (
          <>
          <h2 className="relative" style={{ fontSize: 28, fontWeight: 700, color: '#171200', marginBottom: 32, maxWidth: 500, marginLeft: "auto", marginRight: 0, paddingLeft: 10 }}>
            Contact us
          </h2>

          {submitMsg && (
            <div style={{
              backgroundColor: "#fef2f2",
              color: "#dc2626",
              padding: "14px 20px",
              borderRadius: 10,
              fontSize: 14,
              marginBottom: 24,
              border: "1px solid #fecaca",
            }}>
              {submitMsg}
            </div>
          )}

          <form noValidate onSubmit={handleSubmit} className="relative bg-white" style={{ maxWidth: 500, marginLeft: "auto", marginRight: 0, zIndex: 1, padding: "10px", display: "flex", flexDirection: "column", gap: "22px" }}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label style={{ fontSize: 14, fontWeight: 500, color: '#999', display: 'block', marginBottom: 6 }}>
                  First name <span>*</span>
                </label>
                <input
                  type="text"
                  placeholder="First name"
                  value={formData.firstName}
                  onChange={(e) => { setFormData({ ...formData, firstName: e.target.value }); setErrors({ ...errors, firstName: "" }); }}
                  style={{
                    width: '100%',
                    border: `1px solid ${errors.firstName ? '#dc2626' : '#999'}`,
                    padding: '14px 14px',
                    fontSize: 15,
                    color: '#171200',
                    outline: 'none',
                    background: 'transparent',
                  }}
                />
                {errors.firstName && <span style={{ fontSize: 12, color: '#dc2626', marginTop: 4, display: 'flex', alignItems: 'center', gap: 4 }}>ⓘ {errors.firstName}</span>}
              </div>
              <div>
                <label style={{ fontSize: 14, fontWeight: 500, color: '#999', display: 'block', marginBottom: 6 }}>
                  Last name
                </label>
                <input
                  type="text"
                  placeholder="Last name"
                  value={formData.lastName}
                  onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                  style={{
                    width: '100%',
                    border: '1px solid #ccc',
                    padding: '14px 14px',
                    fontSize: 15,
                    color: '#171200',
                    outline: 'none',
                    background: 'transparent',
                  }}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label style={{ fontSize: 14, fontWeight: 500, color: '#999', display: 'block', marginBottom: 6 }}>
                  Email <span>*</span>
                </label>
                <input
                  type="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={(e) => { setFormData({ ...formData, email: e.target.value }); setErrors({ ...errors, email: "" }); }}
                  style={{
                    width: '100%',
                    border: `1px solid ${errors.email ? '#dc2626' : '#999'}`,
                    padding: '14px 14px',
                    fontSize: 15,
                    color: '#171200',
                    outline: 'none',
                    background: 'transparent',
                  }}
                />
                {errors.email && <span style={{ fontSize: 12, color: '#dc2626', marginTop: 4, display: 'flex', alignItems: 'center', gap: 4 }}>ⓘ {errors.email}</span>}
              </div>
              <div>
                <label style={{ fontSize: 14, fontWeight: 500, color: '#999', display: 'block', marginBottom: 6 }}>
                  Phone <span>*</span>
                </label>
                <div style={{ display: 'flex', alignItems: 'center', border: `1px solid ${errors.phone ? '#dc2626' : '#999'}` }}>
                  <CountryCodeDropdown
                    value={formData.countryCode}
                    onChange={(code) => setFormData({ ...formData, countryCode: code })}
                  />
                  <div style={{ width: 1, height: 22, background: '#999' }} />
                  <input
                    type="tel"
                    placeholder="Phone"
                    value={formData.phone}
                    onChange={(e) => { setFormData({ ...formData, phone: e.target.value }); setErrors({ ...errors, phone: "" }); }}
                    style={{
                      flex: 1,
                      padding: '14px 14px',
                      fontSize: 15,
                      color: '#171200',
                      outline: 'none',
                      background: 'transparent',
                      border: 'none',
                    }}
                  />
                </div>
                {errors.phone && <span style={{ fontSize: 12, color: '#dc2626', marginTop: 4, display: 'flex', alignItems: 'center', gap: 4 }}>ⓘ {errors.phone}</span>}
              </div>
            </div>

            <div>
              <label style={{ fontSize: 14, fontWeight: 500, color: '#999', display: 'block', marginBottom: 6 }}>
                Message <span>*</span>
              </label>
              <textarea
                placeholder="Message"
                rows={4}
                value={formData.message}
                onChange={(e) => { setFormData({ ...formData, message: e.target.value }); setErrors({ ...errors, message: "" }); }}
                style={{
                  width: '100%',
                  border: `1px solid ${errors.message ? '#dc2626' : '#999'}`,
                  padding: '14px 14px',
                  fontSize: 15,
                  color: '#171200',
                  outline: 'none',
                  resize: 'none',
                  background: 'transparent',
                }}
              />
              {errors.message && <span style={{ fontSize: 12, color: '#dc2626', marginTop: 4, display: 'flex', alignItems: 'center', gap: 4 }}>ⓘ {errors.message}</span>}
            </div>

            <div>
              <button
                type="submit"
                disabled={submitting}
                style={{
                  backgroundColor: '#E02222',
                  color: '#fff',
                  padding: '13px 60px',
                  fontSize: 13,
                  fontWeight: 600,
                  border: 'none',
                  cursor: submitting ? 'not-allowed' : 'pointer',
                  letterSpacing: '0.05em',
                  opacity: submitting ? 0.7 : 1,
                }}
              >
                {submitting ? 'Submitting...' : 'Submit'}
              </button>
            </div>
          </form>
          </>
          )}
        </div>
      </div>
    </section>
  );
}
