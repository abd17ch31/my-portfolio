import { useRef, useState } from "react";
import { AnimatePresence, motion, type Variants } from "framer-motion";
import {
  ArrowRight,
  Building,
  CheckCircle,
  Clock,
  Globe,
  Mail,
  MapPin,
  MessageSquare,
  Phone,
  Send,
  Shield,
  Sparkles,
  User,
  Zap,
} from "lucide-react";

const WEB3FORMS_ACCESS_KEY = "7a21e1cb-cdf5-4a0a-96a0-9ad944f887ca";

const contactMethods = [
  {
    icon: Mail,
    title: "Email Us",
    description: "Reach us directly in your inbox",
    value: "findmydevice1731@gmail.com",
    link: "mailto:findmydevice1731@gmail.com",
    gradient: "from-blue-500/20 to-cyan-500/20",
  },
  {
    icon: Phone,
    title: "Call Us",
    description: "Speak with us anytime",
    value: "+91 9027344392",
    link: "tel:+919027344392",
    gradient: "from-green-500/20 to-emerald-500/20",
  },
  {
    icon: MapPin,
    title: "Visit Us",
    description: "Find us at our location",
    value: "Zeta 1, Greater Noida, Uttar Pradesh, India",
    link: "https://www.google.com/maps/search/?api=1&query=Zeta+1+Greater+Noida+Uttar+Pradesh+India",
    gradient: "from-purple-500/20 to-pink-500/20",
  },
];

const companyStats = [
  { label: "Response Time", value: "< 24 hours", icon: Clock },
  { label: "Support Window", value: "7 days", icon: Globe },
  { label: "Trusted Help", value: "Secure", icon: Shield },
  { label: "Fast Follow-up", value: "Priority", icon: Zap },
];

export function PremiumContact() {
  const [result, setResult] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    message: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email";
    }

    if (!formData.message.trim()) {
      newErrors.message = "Message is required";
    } else if (formData.message.trim().length < 10) {
      newErrors.message = "Message must be at least 10 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setResult("Sending....");

    try {
      const payload = new FormData();
      payload.append("access_key", WEB3FORMS_ACCESS_KEY);
      payload.append("name", formData.name.trim());
      payload.append("email", formData.email.trim());
      payload.append("company", formData.company.trim());
      payload.append("message", formData.message.trim());

      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: payload,
      });

      const data = await response.json();

      if (!response.ok || !data?.success) {
        throw new Error(
          data?.message || "Web3Forms could not process your message.",
        );
      }

      setResult("Form Submitted Successfully");
      setIsSubmitted(true);
      setFormData({ name: "", email: "", company: "", message: "" });
      setErrors({});
    } catch (error) {
      setResult(
        error instanceof Error
          ? error.message
          : "Error sending your message. Please try again.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };



  const fadeInUp: Variants = {
    hidden: { opacity: 0, y: 60 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.23, 0.86, 0.39, 0.96],
      },
    },
  };

  const staggerContainer: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  return (
    <section
      id="contact"
      className="relative overflow-hidden border-t border-white/10 bg-gradient-to-b from-[#050814] via-[#08101d] to-[#050814] py-32 text-white"
    >
      <div className="absolute inset-0">
        <motion.div
          className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(199,168,114,0.12),transparent_28%),radial-gradient(circle_at_bottom_right,rgba(14,165,233,0.12),transparent_32%)]"
          animate={{
            backgroundPosition: ["0% 0%", "100% 100%", "0% 0%"],
          }}
          transition={{
            duration: 35,
            repeat: Infinity,
            ease: "linear",
          }}
          style={{
            backgroundSize: "400% 400%",
          }}
        />

        <motion.div
          className="absolute left-1/5 top-1/3 h-96 w-96 rounded-full bg-[#C7A872]/10 blur-3xl"
          animate={{
            x: [0, 200, 0],
            y: [0, 100, 0],
            scale: [1, 1.3, 1],
          }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/5 h-80 w-80 rounded-full bg-cyan-300/10 blur-3xl"
          animate={{
            x: [0, -150, 0],
            y: [0, -80, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        <div className="absolute inset-0">
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute h-40 w-px bg-gradient-to-b from-transparent via-[#C7A872]/25 to-transparent"
              style={{
                left: `${20 + i * 15}%`,
                top: `${25 + i * 8}%`,
                transform: `rotate(${30 + i * 20}deg)`,
              }}
              animate={{
                opacity: [0.2, 0.8, 0.2],
                scaleY: [1, 1.5, 1],
              }}
              transition={{
                duration: 3 + i * 0.5,
                repeat: Infinity,
                ease: "easeInOut",
                delay: i * 0.5,
              }}
            />
          ))}
        </div>
      </div>

      <motion.div
        ref={containerRef}
        className="relative z-10 mx-auto max-w-7xl px-6"
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
      >
        <motion.div className="mb-20 text-center" variants={fadeInUp}>
          <motion.div
            className="mb-6 inline-flex items-center gap-3 rounded-full border border-[#C7A872]/30 bg-[#0f172a]/70 px-4 py-2 backdrop-blur-sm"
            whileHover={{ scale: 1.05, borderColor: "rgba(199, 168, 114, 0.45)" }}
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            >
              <Sparkles className="h-4 w-4 text-[#C7A872]" />
            </motion.div>
            <span className="text-sm font-medium tracking-[0.2em] text-slate-200 uppercase">Let&apos;s Connect</span>
            <div className="h-2 w-2 animate-pulse rounded-full bg-[#C3E41D]" />
          </motion.div>

          <motion.h2
            className="mb-8 text-4xl font-bold tracking-tight sm:text-6xl md:text-7xl"
            variants={fadeInUp}
          >
            <span className="bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent">
              Get in
            </span>
            <br />
            <motion.span
              className="bg-gradient-to-r from-[#C3E41D] via-[#C7A872] to-cyan-300 bg-clip-text text-transparent"
              animate={{
                backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              style={{
                backgroundSize: "200% 200%",
              }}
            >
              Touch
            </motion.span>
          </motion.h2>

          <motion.p
            className="mx-auto max-w-4xl text-xl leading-relaxed text-white/60 sm:text-2xl"
            variants={fadeInUp}
          >
            Have a question, need support, or want to share details about your
            request? Send us a message and we&apos;ll get back to you as soon as
            possible.
          </motion.p>
        </motion.div>

        <motion.div
          className="mb-20 grid grid-cols-2 gap-6 md:grid-cols-4"
          variants={fadeInUp}
        >
          {companyStats.map((stat, index) => (
            <motion.div
              key={index}
              className="group rounded-2xl border border-white/10 bg-[#0b1220]/85 p-6 text-center backdrop-blur-xl transition-all hover:border-[#C7A872]/30 hover:bg-[#0f172a]"
              whileHover={{ scale: 1.05, y: -5 }}
              variants={fadeInUp}
            >
              <motion.div
                className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-xl border border-[#C7A872]/20 bg-gradient-to-br from-[#C7A872]/15 to-cyan-300/10"
                whileHover={{ rotateY: 180 }}
                transition={{ duration: 0.6 }}
              >
                <stat.icon className="h-6 w-6 text-[#C7A872]" />
              </motion.div>
              <div className="mb-1 text-2xl font-bold text-white">{stat.value}</div>
              <div className="text-sm text-slate-400">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>

        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
          <motion.div className="space-y-8" variants={fadeInUp}>
            <div>
              <h3 className="mb-4 text-3xl font-bold text-white">Send us a message</h3>
              <p className="text-lg text-white/60">
                Tell us what you need and we&apos;ll get back to you within 24 hours.
              </p>
            </div>

            <AnimatePresence mode="wait">
              {!isSubmitted ? (
                <motion.form
                  key="form"
                  onSubmit={handleSubmit}
                  className="space-y-6"
                  initial={{ opacity: 1 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  {result && (
                    <motion.p
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`rounded-xl border px-4 py-3 text-sm ${
                        result === "Form Submitted Successfully" || result.startsWith("Success!")
                          ? "border-green-400/30 bg-green-500/10 text-green-300"
                          : "border-red-400/30 bg-red-500/10 text-red-300"
                      }`}
                    >
                      {result}
                    </motion.p>
                  )}

                  <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 transform text-white/40" />
                      <input
                        name="name"
                        type="text"
                        placeholder="Your Name"
                        value={formData.name}
                        onChange={(e) => handleInputChange("name", e.target.value)}
                        className={`w-full rounded-xl border bg-[#0b1220]/90 py-4 pl-10 pr-4 text-white placeholder-slate-500 transition-all focus:border-[#C7A872] focus:outline-none ${
                          errors.name ? "border-red-400" : "border-white/10"
                        }`}
                      />
                      {errors.name && (
                        <motion.p
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="mt-2 text-sm text-red-400"
                        >
                          {errors.name}
                        </motion.p>
                      )}
                    </div>

                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 transform text-white/40" />
                      <input
                        name="email"
                        type="email"
                        placeholder="Email Address"
                        value={formData.email}
                        onChange={(e) => handleInputChange("email", e.target.value)}
                        className={`w-full rounded-xl border bg-[#0b1220]/90 py-4 pl-10 pr-4 text-white placeholder-slate-500 transition-all focus:border-[#C7A872] focus:outline-none ${
                          errors.email ? "border-red-400" : "border-white/10"
                        }`}
                      />
                      {errors.email && (
                        <motion.p
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="mt-2 text-sm text-red-400"
                        >
                          {errors.email}
                        </motion.p>
                      )}
                    </div>
                  </div>

                  <div className="relative">
                    <Building className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 transform text-white/40" />
                    <input
                      name="company"
                      type="text"
                      placeholder="Company (Optional)"
                      value={formData.company}
                      onChange={(e) => handleInputChange("company", e.target.value)}
                      className="w-full rounded-xl border border-white/10 bg-[#0b1220]/90 py-4 pl-10 pr-4 text-white placeholder-slate-500 transition-all focus:border-[#C7A872] focus:outline-none"
                    />
                  </div>

                  <div className="relative">
                    <MessageSquare className="absolute left-3 top-4 h-5 w-5 text-white/40" />
                    <textarea
                      name="message"
                      placeholder="Tell us about your project..."
                      rows={6}
                      value={formData.message}
                      onChange={(e) => handleInputChange("message", e.target.value)}
                      className={`w-full resize-none rounded-xl border bg-[#0b1220]/90 py-4 pl-10 pr-4 text-white placeholder-slate-500 transition-all focus:border-[#C7A872] focus:outline-none ${
                        errors.message ? "border-red-400" : "border-white/10"
                      }`}
                    />
                    {errors.message && (
                      <motion.p
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mt-2 text-sm text-red-400"
                      >
                        {errors.message}
                      </motion.p>
                      )}
                  </div>

                  <motion.button
                    type="submit"
                    disabled={isSubmitting}
                    className="group relative w-full overflow-hidden rounded-xl bg-[#C7A872] px-6 py-4 font-medium text-[#08101d] transition-all hover:bg-[#d4b988] disabled:opacity-50"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent"
                      initial={{ x: "-100%" }}
                      whileHover={{ x: "100%" }}
                      transition={{ duration: 0.5 }}
                    />
                    <span className="relative flex items-center justify-center gap-2">
                      {isSubmitting ? (
                        <motion.div
                          className="h-5 w-5 rounded-full border-2 border-white/30 border-t-white"
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        />
                      ) : (
                        <>
                          <Send className="h-5 w-5" />
                          Send Message
                          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                        </>
                      )}
                    </span>
                  </motion.button>
                </motion.form>
              ) : (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="py-12 text-center"
                >
                  <motion.div
                    className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full border border-green-400/30 bg-green-500/20"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                  >
                    <CheckCircle className="h-10 w-10 text-green-400" />
                  </motion.div>
                  <h3 className="mb-4 text-2xl font-bold text-white">Message Sent!</h3>
                  <p className="mb-6 text-lg text-white/60">
                    Thank you for reaching out. We&apos;ll get back to you within 24
                    hours.
                  </p>
                  <motion.button
                    onClick={() => {
                      setIsSubmitted(false);
                      setFormData({ name: "", email: "", company: "", message: "" });
                      setResult("");
                    }}
                    className="rounded-xl border border-white/10 bg-[#0b1220] px-6 py-3 text-white transition-all hover:border-[#C7A872]/40 hover:bg-[#111827]"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Send Another Message
                  </motion.button>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          <motion.div className="space-y-8" variants={fadeInUp}>
            <div>
              <h3 className="mb-4 text-3xl font-bold text-white">Other ways to reach us</h3>
              <p className="text-lg text-white/60">
                Choose the contact option that works best for you.
              </p>
            </div>

            <div className="space-y-6">
              {contactMethods.map((method, index) => (
                <motion.a
                  key={index}
                  href={method.link}
                  target={method.title === "Visit Us" ? "_blank" : undefined}
                  rel={method.title === "Visit Us" ? "noreferrer" : undefined}
                  className="group block rounded-2xl border border-white/10 bg-[#0b1220]/85 p-6 backdrop-blur-xl transition-all hover:border-[#C7A872]/30 hover:bg-[#0f172a]"
                  variants={fadeInUp}
                  whileHover={{ scale: 1.02, y: -2 }}
                >
                  <div className="flex items-center gap-4">
                    <motion.div
                      className={`flex h-14 w-14 items-center justify-center rounded-xl border border-white/10 bg-gradient-to-br ${method.gradient}`}
                      whileHover={{ scale: 1.1, rotateY: 180 }}
                      transition={{ duration: 0.6 }}
                    >
                      <method.icon className="h-7 w-7 text-white" />
                    </motion.div>
                    <div className="flex-1">
                      <h4 className="mb-1 text-xl font-semibold text-white">{method.title}</h4>
                      <p className="mb-2 text-sm text-slate-400">{method.description}</p>
                      <p className="font-medium text-white">{method.value}</p>
                    </div>
                    <ArrowRight className="h-5 w-5 text-slate-500 transition-all group-hover:translate-x-1 group-hover:text-[#C7A872]" />
                  </div>
                </motion.a>
              ))}
            </div>

            <motion.div
              className="rounded-2xl border border-[#C7A872]/20 bg-[#111827]/90 p-6 backdrop-blur-xl"
              variants={fadeInUp}
            >
              <h4 className="mb-3 text-lg font-semibold text-white">Quick Response Guarantee</h4>
              <p className="text-sm leading-relaxed text-slate-300">
                Every inquiry is reviewed carefully, and we aim to reply as fast as
                possible during business hours. Share the details of your request and
                we&apos;ll follow up with the next steps.
              </p>
            </motion.div>
          </motion.div>
        </div>

        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute h-2 w-2 rounded-full bg-[#C7A872]/30"
            style={{
              left: `${10 + i * 12}%`,
              top: `${20 + i * 10}%`,
            }}
            animate={{
              y: [0, -40, 0],
              opacity: [0.2, 0.8, 0.2],
              scale: [1, 2, 1],
            }}
            transition={{
              duration: 4 + i * 0.5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.6,
            }}
          />
        ))}
      </motion.div>
    </section>
  );
}
