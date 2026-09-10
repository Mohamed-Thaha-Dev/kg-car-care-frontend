import LoadingScreen from "@/components/Common/LoadingScreen";
import Footer from "@/components/Footer/Footer";
import Navbar from "@/components/navbar/Navbar";
import LenisProvider from "@/lib/LenisProvider";
import React from "react";


export default function UserLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
    <LenisProvider>
   
        <Navbar/>
      {children}
      <Footer/>
   </LenisProvider>
    </>
  );
}