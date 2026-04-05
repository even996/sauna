"use client";

import { useState } from "react";
import Navbar from "./components/Navbar/Navbar";
import Hero from "./components/Hero/Hero";
import Saunas from "./components/Sauna/Sauna";
import CtaBanner from "./components/CtaBanner/CtaBanner";
import Features from "./components/Feature/Feature";
import Footer from "./components/Footer/Footer";
import BookingDialog from "./components/BookingDialog/BookingDialog";


export default function HomePage() {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedSauna, setSelectedSauna] = useState<string | null>(null);

  const openBooking = (saunaName?: string) => {
    setSelectedSauna(saunaName ?? null);
    setDialogOpen(true);
  };

  return (
    <>
      
      <Navbar onBookClick={() => openBooking()} />
      <Hero onBookClick={() => openBooking()} />
      <Features />
      <Saunas onBookClick={(name) => openBooking(name)} />
      <CtaBanner onBookClick={() => openBooking()} />
      <Footer />
      <BookingDialog
        isOpen={dialogOpen}
        selectedSauna={selectedSauna}
        onClose={() => setDialogOpen(false)}
      />
    </>
  );
}
