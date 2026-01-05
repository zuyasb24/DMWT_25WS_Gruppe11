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

const buttonStyle: React.CSSProperties = {
  backgroundColor: green,
  borderRadius: 16,
  fontFamily: "Inter, sans-serif",
  fontSize: 18,
  width: 190,
  height: 52,
  lineHeight: "22px",
};

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

  const closeOverlay = () => setShowOverlay(false);

  const current = DEVICES[active];

  // Single-click: break + shake + open modal (no confusing “click twice”)
  const handleDeviceClick = (id: DeviceId) => {
    if (id !== active) return;

    setBroken(id);
    setShakeDevice(id);
    setTimeout(() => setShakeDevice(null), 400);

    openOverlay();
  };

  return (
    <section
      id="infographic"
      className="relative min-h-screen bg-black overflow-hidden"
    >
      {/* Clicking the “empty” background resets the infographic */}
      <div className="absolute inset-0 z-0" onClick={resetAll} />

      {/* Dark overlay behind modal */}
      {showOverlay && (
        <div
          className="absolute inset-0 z-30 overlay-dark"
          onClick={resetAll}
        />
      )}

      {/* Headline + helper text */}
      <div
        className="absolute inset-x-0 top-14 z-40 flex justify-center text-center px-4"
        onClick={(e) => e.stopPropagation()}
      >
        <div>
          <p
            className="text-white font-bold leading-snug"
            style={{ fontFamily: "Inter, sans-serif", fontSize: 46 }}
          >
            Your <span style={{ color: green }}>device</span> isn&apos;t trash —
            <br />
            it&apos;s misunderstood.
            <br />
            Look closer.
          </p>

          <p className="mt-4 text-white/70 text-base">
            Hover to focus. Click a device to see what usually breaks and what
            you can do about it.
          </p>
        </div>
      </div>

      {/* Devices row */}
      <div
        className="relative z-40 flex items-center justify-center min-h-screen"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="w-full flex items-center justify-center">
          <div className="flex items-center justify-center gap-10 md:gap-16 lg:gap-24 mt-64 translate-x-[-80px]">
            {(["laptop", "phone", "watch"] as DeviceId[]).map((id) => {
              const device = DEVICES[id];
              const isActive = id === active;
              const isBroken = broken === id;
              const isShaking = shakeDevice === id;

              const sizeFactor = id === "laptop" ? 1.8 : 1;
              const baseWidth = (isActive ? 260 : 200) * sizeFactor;
              const baseHeight = (isActive ? 180 : 140) * sizeFactor;

              return (
                <div
                  key={id}
                  className={[
                    "relative flex flex-col items-center transition-transform duration-300 ease-out",
                    isActive ? "device-active" : "opacity-80 hover:opacity-100",
                    isShaking ? "shake-once" : "",
                  ].join(" ")}
                  onMouseEnter={() => {
                    if (!isActive) setActive(id);
                  }}
                >
                  <button
                    type="button"
                    onClick={() => handleDeviceClick(id)}
                    aria-label={`Open info for ${id}`}
                  >
                    <Image
                      src={isBroken ? device.imageBroken : device.imageNormal}
                      alt={`${id} device`}
                      width={baseWidth}
                      height={baseHeight}
                      className={`object-contain transition-all duration-300 ${
                        isActive ? "scale-90" : "scale-70"
                      }`}
                      priority={false}
                    />
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Modal */}
      {showOverlay && (
        <div
          className="absolute inset-0 z-50 flex items-center justify-center px-4"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="max-w-xl w-full rounded-2xl bg-black border border-neutral-800 px-8 py-10 shadow-2xl text-center">
            {!showSustainableMessage ? (
              <>
                <h2
                  className="text-white font-bold mb-4"
                  style={{ fontFamily: "Inter, sans-serif", fontSize: 26 }}
                >
                  {current.title}
                </h2>

                <p
                  className="text-slate-200 mb-8 leading-relaxed"
                  style={{ fontFamily: "Inter, sans-serif", fontSize: 18 }}
                >
                  {current.text.split("fixable!")[0]}
                  <span style={{ color: green, fontWeight: 700 }}>fixable</span>
                  !
                </p>

                <div className="flex flex-wrap justify-center gap-4 mb-6">
                  <Link
                    href="#tutorials"
                    className="flex items-center justify-center text-center text-white font-bold"
                    style={buttonStyle}
                  >
                    Learn to repair
                  </Link>

                  <button
                    type="button"
                    className="flex items-center justify-center text-center text-white font-bold"
                    style={buttonStyle}
                    onClick={() => setShowSustainableMessage(true)}
                  >
                    Throw it away
                  </button>
                </div>
              </>
            ) : (
              <>
                <h2
                  className="text-white font-bold mb-4"
                  style={{ fontFamily: "Inter, sans-serif", fontSize: 26 }}
                >
                  You can still make a sustainable choice 🌱
                </h2>

                <p
                  className="text-slate-200 mb-6 leading-relaxed"
                  style={{ fontFamily: "Inter, sans-serif", fontSize: 18 }}
                >
                  By sending your device to us, you help reduce electronic waste.
                  We repair, reuse or recycle devices responsibly, giving technology a second life.
                </p>

                <div className="flex flex-wrap justify-center gap-4 mb-6">
                  <Link
                    href="/legal-notice"
                    className="flex items-center justify-center text-center text-white font-bold"
                    style={buttonStyle}
                  >
                    Contact us
                  </Link>
                </div>
              </>
            )}

            <button
              type="button"
              className="mt-2 text-sm text-white/80 hover:text-white"
              style={{ fontFamily: "Inter, sans-serif" }}
              onClick={closeOverlay}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </section>
  );
}