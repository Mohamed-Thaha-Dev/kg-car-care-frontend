"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { User } from "lucide-react";

const menuItems = [
  { title: "Home", href: "/", shape: 1 },
  { title: "About Us", href: "/about", shape: 2 },
  { title: "Services", href: "/services", shape: 3 },
  { title: "Gallery", href: "/gallery", shape: 4 },
  { title: "Contact Us", href: "/contact", shape: 5 },
  // { title: "Login", href: "/admin/login", shape: 5 },
];

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const router = useRouter();
  const menuRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const menuLinksRef = useRef<HTMLButtonElement[]>([]);
  const iconRef = useRef<HTMLDivElement>(null);
  const menuTextRef = useRef<HTMLDivElement>(null);

  const shapesRef = useRef<HTMLDivElement[]>([]);

  /* --------------------------------------------------
     Initial setup
  -------------------------------------------------- */

  useEffect(() => {
    gsap.set(panelRef.current, {
      xPercent: 100,
    });

    gsap.set(overlayRef.current, {
      autoAlpha: 0,
    });

    gsap.set(menuLinksRef.current, {
      y: 80,
      opacity: 0,
      rotate: 5,
    });

    gsap.set(shapesRef.current, {
      scale: 0,
      opacity: 0,
    });
  }, []);

  /* --------------------------------------------------
     Menu animation
  -------------------------------------------------- */

  useEffect(() => {
    if (!menuRef.current || !panelRef.current || !overlayRef.current) {
      return;
    }

    const tl = gsap.timeline({
      defaults: {
        ease: "power3.out",
      },
    });

    if (isMenuOpen) {
      // Show menu
      tl.set(menuRef.current, {
        display: "block",
      });

      // Panel
      tl.to(
        panelRef.current,
        {
          xPercent: 0,
          duration: 0.8,
        },
        0,
      );

      // Dark overlay
      tl.to(
        overlayRef.current,
        {
          autoAlpha: 1,
          duration: 0.6,
        },
        0,
      );

      // Menu text
      if (menuTextRef.current) {
        tl.to(
          menuTextRef.current,
          {
            yPercent: -50,
            duration: 0.5,
          },
          0.15,
        );
      }

      // Icon rotate
      if (iconRef.current) {
        tl.to(
          iconRef.current,
          {
            rotate: 45,
            duration: 0.5,
          },
          0,
        );
      }

      // Menu links
      tl.to(
        menuLinksRef.current,
        {
          y: 0,
          opacity: 1,
          rotate: 0,
          stagger: 0.08,
          duration: 0.7,
        },
        0.35,
      );
    } else {
      // Close menu links
      tl.to(
        menuLinksRef.current,
        {
          y: 40,
          opacity: 0,
          duration: 0.3,
          stagger: 0.03,
        },
        0,
      );

      // Panel close
      tl.to(
        panelRef.current,
        {
          xPercent: 100,
          duration: 0.65,
        },
        0.1,
      );

      // Overlay close
      tl.to(
        overlayRef.current,
        {
          autoAlpha: 0,
          duration: 0.5,
        },
        0.1,
      );

      // Icon reset
      if (iconRef.current) {
        tl.to(
          iconRef.current,
          {
            rotate: 0,
            duration: 0.4,
          },
          0,
        );
      }

      // Menu text reset
      if (menuTextRef.current) {
        tl.to(
          menuTextRef.current,
          {
            yPercent: 0,
            duration: 0.4,
          },
          0,
        );
      }

      // Hide after animation
      tl.set(menuRef.current, {
        display: "none",
      });
    }

    return () => {
      tl.kill();
    };
  }, [isMenuOpen]);

  /* --------------------------------------------------
     Escape key
  -------------------------------------------------- */

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsMenuOpen(false);
      }
    };

    window.addEventListener("keydown", handleEscape);

    return () => {
      window.removeEventListener("keydown", handleEscape);
    };
  }, []);

  /* --------------------------------------------------
     Body scroll lock
  -------------------------------------------------- */

useEffect(() => {
  if (!isMenuOpen) return;

  const scrollY = window.scrollY;
  const body = document.body;

  // Save current scroll position
  body.dataset.scrollY = String(scrollY);

  // Lock background page
  body.style.position = "fixed";
  body.style.top = `-${scrollY}px`;
  body.style.left = "0";
  body.style.right = "0";
  body.style.width = "100%";
  body.style.overflow = "hidden";

  return () => {
    const savedScrollY = Number(body.dataset.scrollY || 0);

    // Unlock background page
    body.style.position = "";
    body.style.top = "";
    body.style.left = "";
    body.style.right = "";
    body.style.width = "";
    body.style.overflow = "";

    delete body.dataset.scrollY;

    // Restore scroll position
    window.scrollTo(0, savedScrollY);
  };
}, [isMenuOpen]);
  /* --------------------------------------------------
     Shape hover
  -------------------------------------------------- */

  const handleMouseEnter = (index: number) => {
    const shape = shapesRef.current[index];

    if (!shape) return;

    // Hide all shapes
    shapesRef.current.forEach((item) => {
      if (item) {
        gsap.to(item, {
          scale: 0,
          opacity: 0,
          duration: 0.25,
        });
      }
    });

    // Show current shape
    gsap.to(shape, {
      scale: 1,
      opacity: 1,
      duration: 0.5,
      ease: "back.out(1.7)",
    });
  };

  const handleMouseLeave = (index: number) => {
    const shape = shapesRef.current[index];

    if (!shape) return;

    gsap.to(shape, {
      scale: 0,
      opacity: 0,
      duration: 0.3,
      ease: "power2.in",
    });
  };

  /* --------------------------------------------------
     Helpers
  -------------------------------------------------- */

  const addMenuLinkRef = (el: HTMLButtonElement | null) => {
    if (el && !menuLinksRef.current.includes(el)) {
      menuLinksRef.current.push(el);
    }
  };

  const addShapeRef = (el: HTMLDivElement | null) => {
    if (el && !shapesRef.current.includes(el)) {
      shapesRef.current.push(el);
    }
  };

  const handleNavigation = (href: string) => {
    setIsMenuOpen(false);

    document.body.style.overflow = "";

    router.push(href);
  };

  return (
    <>
      {/* ============================================
          HEADER
      ============================================ */}

      <header className="fixed left-0 top-0 z-[100] w-full bg-black/10 backdrop-blur-xl">
        <div className="flex h-24 items-center justify-between px-6 md:px-10 lg:px-20">
          {/* LOGO */}
          <Link href="/" className="relative z-[110] flex items-center">
            <div className="relative md:bg-sub-background rounded-3xl md:w-35 md:h-20 w-30 h-20">
              <Image
                src="/logo/logo.webp"
                alt="Company Logo"
                fill
                sizes="(max-width: 768px) 140px, 200px"
                priority
                className="object-contain"
              />
            </div>
          </Link>

          {/* RIGHT SIDE */}

          <div className="relative z-[110] flex items-center gap-6">
            <span className="hidden text-xs uppercase font-bold tracking-[0.2em] text-primary md:block">
              Click Menu Explore More
            </span>

            <button
              type="button"
              onClick={() => setIsMenuOpen((prev) => !prev)}
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={isMenuOpen}
              className="group cursor-pointer flex h-12 items-center gap-4 overflow-hidden rounded-full border border-white/20 bg-black/30 px-5 text-white backdrop-blur-md transition-all duration-300 hover:bg-white hover:text-black"
            >
              {/* TEXT */}

              <div className="relative h-5 overflow-hidden">
                <div
                  ref={menuTextRef}
                  className="flex flex-col text-sm font-medium uppercase tracking-wider "
                >
                  <span>Menu</span>
                  <span>Close</span>
                </div>
              </div>

              {/* ICON */}

              <div
                ref={iconRef}
                className="relative flex h-5 w-5 items-center justify-center"
              >
                <span className="absolute h-[1px] w-5 bg-current" />
                <span className="absolute h-5 w-[1px] bg-current" />
              </div>
            </button>
      
            
          </div>
        </div>
      </header>

      {/* ============================================
          FULLSCREEN MENU
      ============================================ */}

      <div ref={menuRef} className="fixed inset-0 z-[90] hidden">
        {/* OVERLAY */}

        <div
          ref={overlayRef}
          onClick={() => setIsMenuOpen(false)}
          className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        />

        {/* MENU PANEL */}

        <div
          ref={panelRef}
          className="absolute right-0 top-0 h-full w-full overflow-hidden bg-sub-background text-white lg:w-[35%]"
        >
          {/* BACKGROUND SHAPES */}

          <div className="pointer-events-none absolute inset-0 overflow-hidden">
            {/* Shape 1 */}

            <div
              ref={addShapeRef}
              className="absolute left-[5%] top-[15%] h-40 w-40 rounded-full bg-[#C9A227]/20 blur-[2px]"
            />

            {/* Shape 2 */}

            <div
              ref={addShapeRef}
              className="absolute right-[10%] top-[20%] h-64 w-64 rounded-full border-[50px] border-[#C9A227]/10"
            />

            {/* Shape 3 */}

            <div
              ref={addShapeRef}
              className="absolute bottom-[15%] left-[15%] h-72 w-72 rounded-full border border-muted/40"
            />

            {/* Shape 4 */}

            <div
              ref={addShapeRef}
              className="absolute bottom-[5%] right-[5%] h-80 w-80 rounded-[40%] bg-primary/10 blur-3xl"
            />

            {/* Shape 5 */}

            <div
              ref={addShapeRef}
              className="absolute left-[40%] top-[45%] h-[500px] w-[2px] rotate-45 bg-primary/20"
            />
          </div>

          {/* MENU CONTENT */}

          <div className="relative flex h-full flex-col gap-8 lg:gap-0 px-8 pb-10 pt-32 md:px-14 lg:px-20">
            {/* TOP */}
        
            <div className="flex items-center justify-between">
              <span className="text-xs uppercase tracking-[0.3em] text-muted/60">
                Navigation
              </span>

              <span className="text-xs uppercase tracking-[0.3em] text-primary">
                KG / 01
              </span>
            </div>

            {/* LINKS */}

            <nav className="relative">
              <ul className="space-y-2">
                {menuItems.map((item, index) => (
                  <li
                    key={item.title}
                    onMouseEnter={() => handleMouseEnter(index)}
                    onMouseLeave={() => handleMouseLeave(index)}
                  >
                    <button
                      type="button"
                      ref={addMenuLinkRef}
                      onClick={() => handleNavigation(item.href)}
                      className="group flex w-full cursor-pointer text-muted items-center justify-between border-b border-primary/50 py-4 text-left text-4xl font-medium tracking-tight transition-colors duration-300 hover:text-primary lg:py-5 font-heading   lg:text-5xl"
                    >
                      <span>{item.title}</span>

                      <span className="text-sm text-muted/30 transition-all duration-300 group-hover:translate-x-2 group-hover:text-primary">
                        0{index + 1}
                      </span>
                    </button>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </>
  );
}
