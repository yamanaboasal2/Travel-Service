import React, { useState } from "react";
import { createPortal } from "react-dom";
import { Link } from "react-router-dom";
import { LogIn, X } from "lucide-react";
import { isAuthenticated } from "../services/apiService";

type ProtectedBookingLinkProps = {
  to?: string;
  className?: string;
  children: React.ReactNode;
};

export function ProtectedBookingLink({
  to = "/booking",
  className,
  children,
}: ProtectedBookingLinkProps) {
  const [showNotice, setShowNotice] = useState(false);

  if (isAuthenticated()) {
    return (
      <Link to={to} className={className}>
        {children}
      </Link>
    );
  }

  return (
    <>
      <div
        className={className}
        role="button"
        tabIndex={0}
        onClick={() => setShowNotice(true)}
        onKeyDown={(event) => {
          if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            setShowNotice(true);
          }
        }}
      >
        {children}
      </div>

      {showNotice &&
        createPortal(
          <div className="fixed right-4 top-[5.75rem] z-[99999] w-[calc(100vw-2rem)] max-w-md rounded-2xl border border-[#F59E0B]/35 bg-white p-5 text-[#021427] shadow-[0_24px_70px_rgba(2,20,39,0.22)] sm:right-6">
            <button
              type="button"
              onClick={(event) => {
                event.stopPropagation();
                setShowNotice(false);
              }}
              className="absolute right-3 top-3 rounded-full p-1 text-[#021427]/60 transition hover:bg-[#021427]/8 hover:text-[#021427]"
              aria-label="Close login notice"
            >
              <X className="h-4 w-4" />
            </button>
            <div className="flex gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#021427] text-white shadow-lg shadow-[#021427]/15">
                <LogIn className="h-6 w-6" />
              </div>
              <div>
                <p className="text-lg font-black">Login required</p>
                <p className="mt-1 text-sm font-semibold leading-6 text-[#1a3a52]">
                  Please login or create an account before booking. This keeps your trip details and payment options secure.
                </p>
                <Link
                  to="/auth"
                  onClick={(event) => event.stopPropagation()}
                  className="mt-4 inline-flex items-center justify-center overflow-hidden rounded-full bg-gradient-to-r from-[#9a4b08] via-[#c46312] to-[#F59E0B] px-5 py-2.5 text-sm font-black text-white shadow-[0_14px_34px_rgba(154,75,8,0.28)] transition hover:scale-[1.03] hover:shadow-[0_18px_42px_rgba(2,20,39,0.32)]"
                >
                  Login / Sign Up
                </Link>
              </div>
            </div>
          </div>,
          document.body
        )}
    </>
  );
}
