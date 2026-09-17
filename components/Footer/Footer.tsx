"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef } from "react";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

export default function Footer() {
  const footerRef = useRef<HTMLElement>(null);
  return (
    <footer ref={footerRef} className="relative overflow-hidden  text-white">
      {/* Top line */}
      <div className="footer-line h-px w-full bg-[#d4af37]/40" />

      {/* Main footer */}
      <div className="mx-auto max-w-7xl px-6 py-20 md:px-8">
        <div className="grid grid-cols-1 gap-14 md:grid-cols-2 lg:grid-cols-4">
          {/* =================================
              BRAND
          ================================= */}
          <div className="footer-reveal lg:col-span-1">
            <Link href="/" className="group inline-block">
              <Image
                src="/logo/logo.webp"
                alt="KG Car Care Service Logo"
             priority
                width={130}
                height={55}
                className="h-auto w-[170px] object-contain "
              />
            </Link>

            <p className="mt-5 max-w-xs text-sm leading-6 text-white/40">
              Premium automotive care crafted for vehicles that deserve nothing
              less.
            </p>
            <div className="footer-reveal mt-5 flex items-center gap-5">
              <a
                href="https://www.instagram.com/kgcarcare_official/"
                aria-label="Instagram"
                target="__blank"
                className="
                  flex
                  h-9
                  w-9
                  items-center
                  justify-center
                  rounded-full
                  border
                  border-white/10
                  text-white/40
                  transition-all
                  duration-300
                  hover:border-[#d4af37]/40
                  hover:text-[#d4af37]
                "
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 102 102"
                  id="instagram"
                >
                  <defs>
                    <radialGradient
                      id="a"
                      cx="6.601"
                      cy="99.766"
                      r="129.502"
                      gradientUnits="userSpaceOnUse"
                    >
                      <stop offset=".09" stopColor="#fa8f21"></stop>
                      <stop offset=".78" stopColor="#d82d7e"></stop>
                    </radialGradient>
                    <radialGradient
                      id="b"
                      cx="70.652"
                      cy="96.49"
                      r="113.963"
                      gradientUnits="userSpaceOnUse"
                    >
                      <stop
                        offset=".64"
                        stopColor="#8c3aaa"
                        stopOpacity="0"
                      ></stop>
                      <stop offset="1" stopColor="#8c3aaa"></stop>
                    </radialGradient>
                  </defs>
                  <path
                    fill="url(#a)"
                    d="M25.865,101.639A34.341,34.341,0,0,1,14.312,99.5a19.329,19.329,0,0,1-7.154-4.653A19.181,19.181,0,0,1,2.5,87.694,34.341,34.341,0,0,1,.364,76.142C.061,69.584,0,67.617,0,51s.067-18.577.361-25.14A34.534,34.534,0,0,1,2.5,14.312,19.4,19.4,0,0,1,7.154,7.154,19.206,19.206,0,0,1,14.309,2.5,34.341,34.341,0,0,1,25.862.361C32.422.061,34.392,0,51,0s18.577.067,25.14.361A34.534,34.534,0,0,1,87.691,2.5a19.254,19.254,0,0,1,7.154,4.653A19.267,19.267,0,0,1,99.5,14.309a34.341,34.341,0,0,1,2.14,11.553c.3,6.563.361,8.528.361,25.14s-.061,18.577-.361,25.14A34.5,34.5,0,0,1,99.5,87.694,20.6,20.6,0,0,1,87.691,99.5a34.342,34.342,0,0,1-11.553,2.14c-6.557.3-8.528.361-25.14.361s-18.577-.058-25.134-.361"
                  ></path>
                  <path
                    fill="url(#b)"
                    d="M25.865,101.639A34.341,34.341,0,0,1,14.312,99.5a19.329,19.329,0,0,1-7.154-4.653A19.181,19.181,0,0,1,2.5,87.694,34.341,34.341,0,0,1,.364,76.142C.061,69.584,0,67.617,0,51s.067-18.577.361-25.14A34.534,34.534,0,0,1,2.5,14.312,19.4,19.4,0,0,1,7.154,7.154,19.206,19.206,0,0,1,14.309,2.5,34.341,34.341,0,0,1,25.862.361C32.422.061,34.392,0,51,0s18.577.067,25.14.361A34.534,34.534,0,0,1,87.691,2.5a19.254,19.254,0,0,1,7.154,4.653A19.267,19.267,0,0,1,99.5,14.309a34.341,34.341,0,0,1,2.14,11.553c.3,6.563.361,8.528.361,25.14s-.061,18.577-.361,25.14A34.5,34.5,0,0,1,99.5,87.694,20.6,20.6,0,0,1,87.691,99.5a34.342,34.342,0,0,1-11.553,2.14c-6.557.3-8.528.361-25.14.361s-18.577-.058-25.134-.361"
                  ></path>
                  <path
                    fill="#fff"
                    d="M461.114,477.413a12.631,12.631,0,1,1,12.629,12.632,12.631,12.631,0,0,1-12.629-12.632m-6.829,0a19.458,19.458,0,1,0,19.458-19.458,19.457,19.457,0,0,0-19.458,19.458m35.139-20.229a4.547,4.547,0,1,0,4.549-4.545h0a4.549,4.549,0,0,0-4.547,4.545m-30.99,51.074a20.943,20.943,0,0,1-7.037-1.3,12.547,12.547,0,0,1-7.193-7.19,20.923,20.923,0,0,1-1.3-7.037c-.184-3.994-.22-5.194-.22-15.313s.04-11.316.22-15.314a21.082,21.082,0,0,1,1.3-7.037,12.54,12.54,0,0,1,7.193-7.193,20.924,20.924,0,0,1,7.037-1.3c3.994-.184,5.194-.22,15.309-.22s11.316.039,15.314.221a21.082,21.082,0,0,1,7.037,1.3,12.541,12.541,0,0,1,7.193,7.193,20.926,20.926,0,0,1,1.3,7.037c.184,4,.22,5.194.22,15.314s-.037,11.316-.22,15.314a21.023,21.023,0,0,1-1.3,7.037,12.547,12.547,0,0,1-7.193,7.19,20.925,20.925,0,0,1-7.037,1.3c-3.994.184-5.194.22-15.314.22s-11.316-.037-15.309-.22m-.314-68.509a27.786,27.786,0,0,0-9.2,1.76,19.373,19.373,0,0,0-11.083,11.083,27.794,27.794,0,0,0-1.76,9.2c-.187,4.04-.229,5.332-.229,15.623s.043,11.582.229,15.623a27.793,27.793,0,0,0,1.76,9.2,19.374,19.374,0,0,0,11.083,11.083,27.813,27.813,0,0,0,9.2,1.76c4.042.184,5.332.229,15.623.229s11.582-.043,15.623-.229a27.8,27.8,0,0,0,9.2-1.76,19.374,19.374,0,0,0,11.083-11.083,27.716,27.716,0,0,0,1.76-9.2c.184-4.043.226-5.332.226-15.623s-.043-11.582-.226-15.623a27.786,27.786,0,0,0-1.76-9.2,19.379,19.379,0,0,0-11.08-11.083,27.748,27.748,0,0,0-9.2-1.76c-4.041-.185-5.332-.229-15.621-.229s-11.583.043-15.626.229"
                    transform="translate(-422.637 -426.196)"
                  ></path>
                </svg>
              </a>

              <a
                href="https://www.facebook.com/share/1F9o8ifhgo/"
                aria-label="Facebook"
                target="__blank"
                className="
                  flex
                  h-9
                  w-9
                  items-center
                  justify-center
                  rounded-full
                  border
                  border-white/10
                  text-white/40
                  transition-all
                  duration-300
                  hover:border-[#d4af37]/40
                  hover:text-[#d4af37]
                "
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 1024 1024"
                  id="facebook"
                >
                  <path
                    fill="#1877f2"
                    d="M1024,512C1024,229.23016,794.76978,0,512,0S0,229.23016,0,512c0,255.554,187.231,467.37012,432,505.77777V660H302V512H432V399.2C432,270.87982,508.43854,200,625.38922,200,681.40765,200,740,210,740,210V336H675.43713C611.83508,336,592,375.46667,592,415.95728V512H734L711.3,660H592v357.77777C836.769,979.37012,1024,767.554,1024,512Z"
                  ></path>
                  <path
                    fill="#fff"
                    d="M711.3,660,734,512H592V415.95728C592,375.46667,611.83508,336,675.43713,336H740V210s-58.59235-10-114.61078-10C508.43854,200,432,270.87982,432,399.2V512H302V660H432v357.77777a517.39619,517.39619,0,0,0,160,0V660Z"
                  ></path>
                </svg>
              </a>

              <a
                href="https://youtube.com/@kgcarcareservice7566?si=uIk6BWKhslL9gP2j"
                aria-label="YouTube"
                target="__blank"
                className="
                  flex
                  h-9
                  w-9
                  items-center
                  justify-center
                  rounded-full
                  border
                  border-white/10
                  text-white/40
                  transition-all
                  duration-300
                  hover:border-[#d4af37]/40
                  hover:text-[#d4af37]
                "
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 48 48"
                  id="youtube"
                >
                  <rect width="48" height="48" fill="red" rx="24"></rect>
                  <path
                    fill="#fff"
                    fillRule="evenodd"
                    d="M35.7379 14.1401C37.0229 14.486 38.0361 15.4992 38.3821 16.7842C39.0246 19.1318 38.9999 24.0247 38.9999 24.0247C38.9999 24.0247 38.9999 28.8929 38.3821 31.2405C38.0361 32.5255 37.0229 33.5387 35.7379 33.8846C33.3903 34.5024 23.9999 34.5024 23.9999 34.5024C23.9999 34.5024 14.6342 34.5024 12.2619 33.8599C10.9769 33.5139 9.96375 32.5008 9.61779 31.2158C9 28.8929 9 24 9 24C9 24 9 19.1318 9.61779 16.7842C9.96375 15.4992 11.0016 14.4613 12.2619 14.1153C14.6095 13.4976 23.9999 13.4976 23.9999 13.4976C23.9999 13.4976 33.3903 13.4976 35.7379 14.1401ZM28.8187 24L21.0098 28.4975V19.5025L28.8187 24Z"
                    clipRule="evenodd"
                  ></path>
                </svg>
              </a>
            </div>
          </div>

          {/* =================================
              NAVIGATION
          ================================= */}
          <div className="footer-reveal">
            <p className="mb-6 text-[12px] uppercase tracking-[0.25em] text-primary">
              Navigation
            </p>

            <div className="flex flex-col gap-4">
              {[
                ["Home", "/"],
                ["About", "/about"],
                ["Services", "/services"],
                ["Gallery", "/gallery"],
                ["Contact", "/contact"],
                ["Login", "/admin/login"],
              ].map(([label, href]) => (
                <Link
                  key={label}
                  href={href}
                  className="
                    footer-link
                    group
                    flex
                    w-fit
                    items-center
                    gap-2
                    text-sm
                    text-white/50
                    transition-colors
                    duration-300
                    hover:text-white
                  "
                >
                  {label}

                  <ArrowUpRight
                    className="
                      h-3.5
                      w-3.5
                      -translate-x-1
                      translate-y-1
                      opacity-0
                      transition-all
                      duration-300
                      group-hover:translate-x-0
                      group-hover:translate-y-0
                      group-hover:opacity-100
                      group-hover:text-primary
                    "
                  />
                </Link>
              ))}
            </div>
          </div>

          {/* =================================
              SERVICES
          ================================= */}
          <div className="footer-reveal">
            <p className="mb-6 text-[12px] uppercase tracking-[0.25em] text-primary">
              Address
            </p>
            <div className="flex flex-col gap-4">
              <div
                className="flex-col footer-link
                    group
                    flex
                    w-fit
                    gap-2
                    text-sm
                    text-white/50
                    transition-colors
                    duration-300
                    hover:text-white"
              >
                <label>Branch (Main Branch)</label>
                <a
                  href="https://maps.app.goo.gl/Uq7yhX77hMRrJydr5"
                  target="__blank"
                >
                  WATER TANK STOP, Thudiyalur - Saravanampatti Rd, Fathima
                  Nagar, Coimbatore, Tamil Nadu 641029
                </a>
              </div>

              <div
                className="flex-col footer-link
                    group
                    flex
                    w-fit
                    gap-2
                    text-sm
                    text-white/50
                    transition-colors
                    duration-300
                    hover:text-white"
              >
                <label>Branch 2</label>
                <a
                  href="https://maps.app.goo.gl/4pj7wh4ToTCGfvNr5"
                  target="__blank"
                >
                  1433, Sathy Rd, Ganapathy Housing Unit, Bharathi Nagar,
                  Gopalakrishnapuram, Ganapathy, Coimbatore. Tamilnadu-641006
                </a>
              </div>
            </div>
            {/* <div className="flex flex-col gap-4">
              {[
                ["Car Detailing", "/services/car-detailing"],
                ["Paint Correction", "/services/paint-correction"],
                ["Ceramic Coating", "/services/ceramic-coating"],
                ["Interior Detailing", "/services/interior-detailing"],
                ["Paint Protection", "/services/ppf"],
              ].map(([label, href]) => (
                <Link
                  key={label}
                  href={href}
                  className="
                   
                  "
                >
                  {label}

                  <ArrowUpRight
                    className="
                      h-3.5
                      w-3.5
                      -translate-x-1
                      translate-y-1
                      opacity-0
                      transition-all
                      duration-300
                      group-hover:translate-x-0
                      group-hover:translate-y-0
                      group-hover:opacity-100
                      group-hover:text-[#d4af37]
                    "
                  />
                </Link>
              ))}
            </div> */}
          </div>

          {/* =================================
              CONTACT
          ================================= */}
          <div className="footer-reveal">
            <p className="mb-6 text-[12px] uppercase tracking-[0.25em] text-primary">
              Get In Touch
            </p>

            <div className="space-y-4">
              {/* Phone */}
              <a
                href="tel:+919751003567"
                className="
                  group
                  flex
                  items-center
                  justify-between
                  border-b
                  border-white/[0.08]
                  pb-4
                "
              >
                <span className="text-sm text-white/55 transition-colors group-hover:text-white">
                  +91 9751003567
                </span>

                <ArrowUpRight
                  className="
                    h-4
                    w-4
                    text-white/25
                    transition-all
                    duration-300
                    group-hover:-translate-y-1
                    group-hover:translate-x-1
                    group-hover:text-primary
                  "
                />
              </a>

              {/* Email */}
              <a
                href="mailto:contact@kgcarcare.com"
                className="
                  group
                  flex
                  items-center
                  justify-between
                  border-b
                  border-white/[0.08]
                  pb-4
                "
              >
                <span className="text-sm text-white/55 transition-colors group-hover:text-white">
                  Kgcarcare26@gmail.com
                </span>

                <ArrowUpRight
                  className="
                    h-4
                    w-4
                    text-white/25
                    transition-all
                    duration-300
                    group-hover:-translate-y-1
                    group-hover:translate-x-1
                    group-hover:text-primary
                  "
                />
              </a>

              {/* Book CTA */}
              <Link
                href="/contact"
                className="
                  group
                  mt-6
                  flex
                  items-center
                  justify-between
                  rounded-full
                  border
                  border-primary/30
                  px-5
                  py-3.5
                  transition-all
                  duration-300
                  hover:border-primary
                  hover:bg-primary/10
                "
              >
                <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-foreground/90">
                  Book Your Car
                </span>

                <ArrowUpRight
                  className="
                    h-4
                    w-4
                    text-primary
                    transition-transform
                    duration-300
                    group-hover:-translate-y-1
                    group-hover:translate-x-1
                  "
                />
              </Link>
              {/* Social */}
            </div>
          </div>
        </div>

        {/* =================================
            BOTTOM
        ================================= */}

        <div className="mt-5 border-t border-white/[0.08] pt-7">
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            {/* Copyright */}
            <p className="footer-reveal text-xs text-white/25">
              © {new Date().getFullYear()} KG Car. All rights reserved.
            </p>

            {/* Legal */}
            <div className="footer-reveal flex gap-5">
              <Link
                href="/privacy"
                className="text-xs text-white/25 transition-colors hover:text-white/60"
              >
                Privacy
              </Link>

              <Link
                href="/terms"
                className="text-xs text-white/25 transition-colors hover:text-white/60"
              >
                Terms
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
