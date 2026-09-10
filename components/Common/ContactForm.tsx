"use client";

import { sendWhatsAppEnquiry } from "@/lib/Whatsapp";
import axios from "axios";
import {
  AlertCircle,
  ArrowUpRight,
  CheckCircle2,
  MessageCircle,
} from "lucide-react";
import { useState } from "react";

export default function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<"success" | "error" | null>(null);

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    setStatus(null);

    const form = e.currentTarget;
    const formData = new FormData(form);

    const name = String(formData.get("name") || "").trim();
    const phone = String(formData.get("phone") || "").trim();
    const email = String(formData.get("email") || "").trim();
 
    const service = String(formData.get("service") || "").trim();
    const message = String(formData.get("message") || "").trim();

    /* --------------------------------
           VALIDATION
        -------------------------------- */

    if (name.length < 2) {
      setStatus("error");
      return;
    }

    const phoneRegex = /^(?:\+91[\s-]?)?[6-9]\d{9}$/;
    const cleanPhone = phone.replace(/[\s-]/g, "");

    if (!phoneRegex.test(phone) && !phoneRegex.test(cleanPhone)) {
      setStatus("error");
      return;
    }

    if (email) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if (!emailRegex.test(email)) {
        setStatus("error");
        return;
      }
    }

    if (!service) {
      setStatus("error");
      return;
    }

    if (message.length < 10) {
      setStatus("error");
      return;
    }

    try {
      setIsSubmitting(true);
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/enquiries/`,
        {
          name: name,
          phone: phone,
          email: email,
          message: message,
        },
      );

      sendWhatsAppEnquiry({
        name,
        phone,
        email,
        service,
        message,
      });

      // 3️⃣ Reset Form
      form.reset();

      // 4️⃣ Success Message
      setTimeout(() => {
        
        setStatus("success");
      }, 500);
    } catch (err: any) {
      console.log(err.response);
      setStatus(err.response.message);
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <div
      className="
              enquiry-panel
              relative
              rounded-[32px]
              border
              border-white/10
              bg-white-background
              p-6
              sm:p-8
              lg:p-10
            "
    >
      {/* FORM HEADER */}

      <div
        className="
                mb-9
                flex
                items-start
                justify-between
                gap-6
              "
      >
        <div>
          <p
            className="
                    text-[10px]
                    font-semibold
                    uppercase
                    tracking-[0.3em]
                    text-primary
                  "
          >
            Vehicle Enquiry
          </p>

          <h3
            className="
                    mt-3
                    text-2xl
                    font-medium
                    tracking-[-0.04em]
                    text-muted/80
                    sm:text-3xl
                  "
          >
            Let&apos;s talk about your car.
          </h3>
        </div>

        <div
          className="
                  hidden
                  h-12
                  w-12
                  shrink-0
                  items-center
                  justify-center
                  rounded-full
                  bg-primary
                  text-black
                  sm:flex
                "
        >
          <MessageCircle className="h-5 w-5" />
        </div>
      </div>

      <form onSubmit={handleSubmit} noValidate className="space-y-6">
        {/* NAME */}

        <div>
          <label
            htmlFor="name"
            className="
                    mb-2
                    block
                    text-[9px]
                    font-semibold
                    uppercase
                    tracking-[0.25em]
                    text-muted/60
                  "
          >
            Full Name <span className="text-red-500">*</span>
          </label>

          <input
            id="name"
            name="name"
            type="text"
            required
            minLength={2}
            placeholder="Your name"
            className="
                    h-13
                    w-full
                    rounded-xl
                    border
                    border-white/10
                    bg-muted
                    px-4
                    text-sm
                    text-foreground
                    outline-none
                    placeholder:text-white/40
                    focus:border-primary/50
                    
                  "
          />
        </div>

        {/* PHONE + EMAIL */}

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <div>
            <label
              htmlFor="phone"
              className="
                      mb-2
                      block
                      text-[9px]
                      font-semibold
                      uppercase
                      tracking-[0.25em]
                      text-muted/60
                    "
            >
              Phone Number <span className="text-red-500">*</span>
            </label>

            <input
              id="phone"
              name="phone"
              type="tel"
              required
              placeholder="+91 98765 43210"
              className="
                      h-13
                      w-full
                      rounded-xl
                      border
                      border-white/10
                      bg-muted
                      px-4
                      text-sm
                      text-foreground
                      outline-none
                      placeholder:text-white/40
                      focus:border-primary/50
                     
                    "
            />
          </div>

          <div>
            <label
              htmlFor="email"
              className="
                      mb-2
                      block
                      text-[9px]
                      font-semibold
                      uppercase
                      tracking-[0.25em]
                      text-muted/60
                    "
            >
              Email <span className="text-red-500">*</span>
            </label>

            <input
              id="email"
              name="email"
              type="email"
              placeholder="you@email.com"
              className="
                      h-13
                      w-full
                      rounded-xl
                      border
                      border-white/10
                      bg-muted
                      px-4
                      text-sm
                      text-foreground
                      outline-none
                      placeholder:text-white/40
                       focus:border-primary/50
                      
                    "
            />
          </div>
        </div>

        {/* SERVICE */}

        <div>
          <label
            htmlFor="service"
            className="
                    mb-2
                    block
                    text-[9px]
                    font-semibold
                    uppercase
                    tracking-[0.25em]
                    text-muted/60
                  "
          >
            What Does Your Car Need? <span className="text-red-500">*</span>
          </label>

          <select
            id="service"
            name="service"
            required
            defaultValue=""
            className="
                    h-13
                    w-full
                    rounded-xl
                    border
                    border-white/10
                    bg-muted
                    px-4
                    text-sm
                    text-foreground/80
                    outline-none
                     focus:border-primary/50
                  "
          >
            <option value="" disabled>
              Choose a service
            </option>

            <option value="Mechanical Work">Mechanical Work</option>

            <option value="Tinkering & Painting">Tinkering & Painting</option>

            <option value="Rust Work">Rust Work</option>

            <option value="Electrical Work">Electrical Work</option>

            <option value="AC Work">AC Work</option>

            <option value="Tyres">Tyres</option>

            <option value="Battery Services">Battery Services</option>

            <option value="Insurance Claim">Insurance Claim</option>

            <option value="Other">Other</option>
          </select>
        </div>

        {/* MESSAGE */}

        <div>
          <label
            htmlFor="message"
            className="
                    mb-2
                    block
                    text-[9px]
                    font-semibold
                    uppercase
                    tracking-[0.25em]
                    text-muted/60
                  "
          >
            Tell Us More <span className="text-red-500">*</span>
          </label>

          <textarea
            id="message"
            name="message"
            required
            minLength={10}
            rows={4}
            placeholder="Tell us what you would like to do with your car..."
            className="
                    w-full
                    resize-none
                    rounded-xl
                    border
                    border-white/10
                    bg-muted
                    px-4
                    py-4
                    text-sm
                    leading-6
                    text-white
                    outline-none
                    placeholder:text-white/40
                    focus:border-primary/50
                    
                  "
          />
        </div>

        {/* SUCCESS */}

        {status === "success" && (
          <div
            className="
                    flex
                    items-center
                    gap-3
                    rounded-xl
                    border
                    border-green-500/20
                    bg-green-500/10
                    px-4
                    py-3
                    text-sm
                    text-green-400
                  "
          >
            <CheckCircle2 className="h-5 w-5 shrink-0" />

            <span>Your enquiry has been submitted successfully.</span>
          </div>
        )}

        {/* ERROR */}

        {status === "error" && (
          <div
            className="
                    flex
                    items-center
                    gap-3
                    rounded-xl
                    border
                    border-red-500/20
                    bg-red-500/10
                    px-4
                    py-3
                    text-sm
                    text-red-400
                  "
          >
            <AlertCircle className="h-5 w-5 shrink-0" />

            <span>Please fill in all required details correctly.</span>
          </div>
        )}

        {/* BUTTON */}

        <button
          type="submit"
          disabled={isSubmitting}
          className="
                  group
                  flex
                  h-14
                  w-full
                  items-center
                  justify-center
                  gap-3
                  rounded-xl
                  bg-primary/90
                  text-sm
                  font-semibold
                  text-black
                  transition-all
                  duration-300
                  hover:bg-primary
                  cursor-pointer
                  disabled:cursor-not-allowed
                  disabled:opacity-60
                "
        >
          {isSubmitting ? (
            <>
              <span
                className="
                        h-4
                        w-4
                        animate-spin
                        rounded-full
                        border-2
                        border-black/20
                        border-t-black
                      "
              />
              Preparing Enquiry...
            </>
          ) : (
            <>
              <MessageCircle className="h-4 w-4" />
              Send Enquiry via WhatsApp
              <ArrowUpRight
                className="
                        h-4
                        w-4
                        transition
                        group-hover:-translate-y-1
                        group-hover:translate-x-1
                      "
              />
            </>
          )}
        </button>

        <p
          className="
                  text-center
                  text-[9px]
                  leading-5
                  text-muted/80
                "
        >
          By submitting this form, you agree to be contacted regarding your
          vehicle enquiry.
        </p>
      </form>
    </div>
  );
}
