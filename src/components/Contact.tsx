"use client";

import { useState, useRef, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import { Send, Loader2, CheckCircle, AlertCircle } from "lucide-react";
import ContactModel from "./ContactModel";
import emailjs from "@emailjs/browser";

import Starfield from "./Starfield";

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;
    
    setStatus("loading");
    setErrorMessage("");

    try {
      // Call EmailJS
      // TODO: Replace with your actual EmailJS Service ID, Template ID, and Public Key
      await emailjs.send(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || "YOUR_SERVICE_ID",
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || "YOUR_TEMPLATE_ID",
        {
          from_name: formData.name,
          to_name: "Ramuthu Theniya", // Your name
          from_email: formData.email,
          message: formData.message,
        },
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || "YOUR_PUBLIC_KEY"
      );

      setStatus("success");
      setFormData({ name: "", email: "", message: "" }); // Reset form
      
      // Reset success state after 5 seconds
      setTimeout(() => {
        setStatus("idle");
      }, 5000);
    } catch (error: any) {
      console.error("Submission error:", error);
      setStatus("error");
      setErrorMessage(error?.text || "Something went wrong. Please try again.");
    }
  };

  return (
    <section 
      id="contact" 
      ref={sectionRef}
      className="relative py-24 md:py-32 w-full bg-[#0a0710] border-t border-white/5 overflow-hidden"
    >
      <Starfield />

      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          
          {/* Left Column: Form */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <p className="text-brand-400 font-mono text-xs md:text-sm tracking-[0.2em] uppercase mb-4">
              Get In Touch
            </p>
            <h2 className="text-5xl md:text-6xl lg:text-7xl font-display font-medium text-slate-100 mb-10 tracking-tight">
              Contact.
            </h2>

            <form onSubmit={handleSubmit} className="flex flex-col gap-6 max-w-md">
              <div className="flex flex-col gap-2">
                <label htmlFor="name" className="text-slate-400 font-mono text-xs tracking-wide">
                  Your Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="John Doe"
                  required
                  disabled={status === "loading" || status === "success"}
                  className="bg-[#1a1429]/50 border border-white/10 rounded-xl p-4 text-slate-200 placeholder:text-slate-600 focus:outline-none focus:border-brand-400 focus:ring-1 focus:ring-brand-400/50 transition-all disabled:opacity-50"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="email" className="text-slate-400 font-mono text-xs tracking-wide">
                  Your email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="john@example.com"
                  required
                  disabled={status === "loading" || status === "success"}
                  className="bg-[#1a1429]/50 border border-white/10 rounded-xl p-4 text-slate-200 placeholder:text-slate-600 focus:outline-none focus:border-brand-400 focus:ring-1 focus:ring-brand-400/50 transition-all disabled:opacity-50"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="message" className="text-slate-400 font-mono text-xs tracking-wide">
                  Your Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Tell me about your project..."
                  rows={5}
                  required
                  disabled={status === "loading" || status === "success"}
                  className="bg-[#1a1429]/50 border border-white/10 rounded-xl p-4 text-slate-200 placeholder:text-slate-600 focus:outline-none focus:border-brand-400 focus:ring-1 focus:ring-brand-400/50 transition-all resize-none disabled:opacity-50"
                />
              </div>

              {/* Status Messages */}
              {status === "success" && (
                <motion.div 
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center gap-2 text-emerald-400 bg-emerald-400/10 border border-emerald-400/20 rounded-lg p-4"
                >
                  <CheckCircle size={18} />
                  <span className="text-sm font-medium">Your message has been sent successfully!</span>
                </motion.div>
              )}
              {status === "error" && (
                <motion.div 
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center gap-2 text-red-400 bg-red-400/10 border border-red-400/20 rounded-lg p-4"
                >
                  <AlertCircle size={18} />
                  <span className="text-sm font-medium">{errorMessage}</span>
                </motion.div>
              )}

              <button
                type="submit"
                disabled={status === "loading" || status === "success"}
                className="mt-4 w-full sm:w-auto bg-slate-100 hover:bg-white text-[#120E1F] font-bold text-sm tracking-wide rounded-xl px-8 py-4 flex items-center justify-center gap-3 transition-colors disabled:opacity-70 disabled:cursor-not-allowed shadow-[0_0_20px_rgba(255,255,255,0.1)] hover:shadow-[0_0_30px_rgba(255,255,255,0.2)]"
              >
                {status === "loading" ? (
                  <>
                    <Loader2 size={18} className="animate-spin" />
                    SENDING...
                  </>
                ) : status === "success" ? (
                  <>
                    <CheckCircle size={18} />
                    SENT
                  </>
                ) : (
                  <>
                    <Send size={18} />
                    SEND MESSAGE
                  </>
                )}
              </button>
            </form>
          </motion.div>

          {/* Right Column: 3D Model */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
            className="h-full w-full"
          >
            <ContactModel />
          </motion.div>

        </div>
      </div>
    </section>
  );
}
