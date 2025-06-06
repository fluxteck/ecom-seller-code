
import Logo from "@/app/(DashboardLayout)/layout/shared/logo/Logo";
import React from "react";
import LeftSidebarPart from "../LeftSidebarPart";
import AuthTwoSteps from "../../authforms/AuthTwoSteps";
import Link from "next/link";
import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "Side Two Steps Authentication",
  description: "Generated by create next app",
};
const twoSteps = () => {
  return (
    <>
      <div className="relative overflow-hidden h-screen">
        <div className="grid grid-cols-12 gap-3 h-screen bg-white dark:bg-darkgray">
          <div className="xl:col-span-4 lg:col-span-4 col-span-12 bg-dark lg:block hidden relative overflow-hidden">
            <LeftSidebarPart />
          </div>
          <div className="xl:col-span-8 lg:col-span-8 col-span-12 sm:px-12 px-4">
            <div className="flex h-screen items-center px-3 max-w-[460px] mx-auto">
              <div className="w-full">
                <Logo />
                <h3 className="text-2xl font-bold my-3">
                  Two Steps Verification
                </h3>
                <p className="text-darklink text-sm font-medium">
                  We sent a verification code to your mobile. Enter the code
                  from the mobile in the field below.
                </p>
                <h6 className="text-sm font-bold my-4">******1234</h6>
                <AuthTwoSteps />
                <div className="flex gap-2 text-base text-ld font-medium mt-6 items-center justify-left">
                  <p>Didn't get the code?</p>
                  <Link href={"/"} className="text-primary text-sm font-medium">
                    Resend
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default twoSteps;
