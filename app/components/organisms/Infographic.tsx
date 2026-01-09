"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

type DeviceId = "phone" | "laptop" | "watch";

const green = "#22c55e";

const DEVICES: Record<
  DeviceId,
  {
    imageNormal: string;
    imageBroken: string;
    title: string;
    text: string;
  }
> = {
  phone: {
    imageNormal: "/infographic/phone1.png",
    imageBroken: "/infographic/phone2.png",
    title: "Most common issue: display damage.",
    text: "This problem appears for many phones after 2–3 years of use. But it’s fixable!",
  },
  laptop: {
    imageNormal: "/infographic/laptop1.png",
    imageBroken: "/infographic/laptop2.png",
    title: "Most common issue: battery wear.",
    text: "This is very common in laptops after a few years of heavy use. But it’s fixable!",
  },
  watch: {
    imageNormal: "/infographic/watch1.png",
    imageBroken: "/infographic/watch2.png",
    title: "Most common issue: water exposure.",
    text: "This issue can happen when a smartwatch is exposed to water in everyday life. But it’s fixable!",
  },
};

/* --------------------------------------------------
   Reusable action button (local, intentional reuse)
-------------------------------------------------- */

const buttonStyle: React.CSSProperties = {
  backgroundColor: green,
  borderRadius: 16,
  fontFamily: "Inter, sans-serif",
  fontSize: 18,
  width: 190,
  height: 52,
  lineHeight: "22px",
};

type ActionButtonProps = {
  href?: string;
  onClick?: () => void;
  children: React.ReactNode;
};

function ActionButton({ href, onClick, children }: ActionButtonProps) {
  const className =
    "flex items-center justify-center text-center text-white font-bold w-full sm:w-auto";

  if (href) {
    return (
      <Link href={href} className={className} style={buttonStyle}>
        {children}
      </Link>
    );
  }

  return (
    <button type="button" onClick={onClick} className={className} style={buttonStyle}>
      {children}
    </button>
  );
}

/* --------------------------------------------------
   Infographic component
-------------------------------------------------- */

export default function Infographic() {
  const [active, setActive] = useState<DeviceId>("phone");
  const [broken, setBroken] = useState<DeviceId | null>(null);
  const [shakeDevice, setShakeDevice] = useState<DeviceId | null>(null);

  const [showOverlay, setShowOverlay] = useState(false);
  const [showSustainableMessage, setShowSustainableMessage] = useState(false);

  const resetAll = () => {
    setActive("phone");
    setBroken(null);
    setShakeDevice(null);
    setShowOverlay(false);
    setShowSustainableMessage(false);
  };

  const openOverlay = () => {
    setShowSustainableMessage(false);
    setShowOverlay(true);
  };

  const current = DEVICES[active];

  const handleDeviceClick = (id: DeviceId) => {
    if (id !== active) return;

    setBroken(id);
    setShakeDevice(id);
    setTimeout(() => setShakeDevice(null), 400);

    openOverlay();
  };

  return (
    <section id="infographic" className="relative min-h-screen bg-black overflow-hidden">
      {/* Reset area */}
      <div className="absolute inset-0 z-0" onClick={resetAll} />

      {/* Dark overlay (tint color comes from globals.css .overlay-dark) */}
      {showOverlay && (
        <div className="absolute inset-0 z-30 overlay-dark" onClick={resetAll} />
      )}

      {/* Headline */}
      <div
        className="absolute inset-x-0 top-14 z-40 flex justify-center text-center px-4"
        onClick={(e) => e.stopPropagation()}
      >
        <div>
          <p
            className="text-white font-bold leading-snug text-3xl sm:text-4xl lg:text-[46px]"
            style={{ fontFamily: "Inter, sans-serif" }}
          >
            Your <span style={{ color: green }}>device</span> isn&apos;t trash —
            <br />
            it&apos;s misunderstood.
            <br />
            Look closer.
          </p>

          <p className="mt-4 text-white/70 text-base">
            Hover to focus. Click a device to learn more.
          </p>
        </div>
      </div>

      {/* Devices wrapper:
          - mobile: use padding-top so devices don't collide with the absolute headline
          - desktop: go back to vertical centering
      */}
      <div
        className="relative z-40 flex justify-center min-h-screen pt-56 sm:pt-64 md:pt-20 md:items-center"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Device row:
            - mobile: wrap
            - desktop: single row + your original shift
            - items-end aligns devices on baseline
        */}
        <div className="flex flex-wrap md:flex-nowrap items-end justify-between gap-8 md:gap-20 lg:gap-28 mt-32 md:mt-64 md:translate-x-[-80px]">
          {(["laptop", "phone", "watch"] as DeviceId[]).map((id) => {
            const device = DEVICES[id];
            const isActive = id === active;
            const isBroken = broken === id;
            const isShaking = shakeDevice === id;

            const sizeFactor = id === "laptop" ? 1.8 : id === "phone" ? 0.75 : 1;
            const baseWidth = (isActive ? 260 : 200) * sizeFactor;
            const baseHeight = (isActive ? 180 : 140) * sizeFactor;

            return (
              <div
                key={id}
                className={[
                  "relative flex flex-col items-center transition-transform duration-300 ease-out",
                  isActive ? "device-active" : "opacity-80 hover:opacity-100",
                  isShaking ? "shake-once" : "",
                  id === "watch" ? "-translate-y-7" : "",
                ].join(" ")}
                onMouseEnter={() => !isActive && setActive(id)}
              >
                <button
                  type="button"
                  onClick={() => handleDeviceClick(id)}
                  aria-label={`View information about ${id}`}
                >
                  <Image
                    src={isBroken ? device.imageBroken : device.imageNormal}
                    alt={`${id} device`}
                    width={baseWidth}
                    height={baseHeight}
                    className={`object-contain transition-all duration-300 ${
                      isActive ? "scale-90" : "scale-70"
                    }`}
                  />
                </button>
              </div>
            );
          })}
        </div>
      </div>

      {/* Modal */}
      {showOverlay && (
        <div
          className="absolute inset-0 z-50 flex items-center justify-center px-4"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="relative max-w-xl w-full rounded-2xl border border-white/10 bg-slate-900/90 px-8 py-10 shadow-xl text-center">
            <button
              type="button"
              onClick={() => setShowOverlay(false)}
              aria-label="Close modal"
              className="absolute top-4 right-4 w-10 h-10 flex items-center justify-center rounded-full text-white text-2xl font-bild hover:text-[#22c55e] hover:bg-white/10 transition"
            >
              ×
            </button>
            {!showSustainableMessage ? (
              <>
                <h2 className="text-white font-bold mb-4 text-2xl">
                  {current.title}
                </h2>

                <p className="text-white/80 mb-8 leading-relaxed text-lg">
                  {current.text.split("fixable!")[0]}
                  <span style={{ color: green, fontWeight: 700 }}>fixable</span>!
                </p>

                <div className="flex flex-col sm:flex-row flex-wrap justify-center gap-4 mb-6">
                  <ActionButton href="#tutorials">Learn to repair</ActionButton>
                  <ActionButton onClick={() => setShowSustainableMessage(true)}>
                    Throw it away
                  </ActionButton>
                </div>
              </>
            ) : (
              <>
                <h2 className="text-white font-bold mb-4 text-2xl">
                  You can still make a{" "}
                  <span style={{ color: green, fontWeight: 700 }}>sustainable choice</span>
                </h2>

                <p className="text-white/80 mb-8 leading-relaxed text-lg">
                  Send your device to us to help reduce electronic waste! We
                  repair, reuse or recycle devices responsibly, giving
                  technology a second life.
                </p>

                <div className="flex justify-center mb-6">
                  <ActionButton href="/legal-notice">Contact us</ActionButton>
                </div>
              </>
            )}

          </div>
        </div>
      )}
    </section>
  );
}