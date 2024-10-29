"use client"
import React from "react";
import ContactUs from "../_components/ContactUs";
import Header from "../_featured/header";
import Footer from "../_featured/footer";
import ContactSection from "../_components/ContactSection";
import ContactForm from "../_components/ContactForm";
import Newsletter from "../_components/Newsletter";
import InstagramSlider from "../_components/InstagramSlider";

export default function ContactPage() {
  return (
    <>
   <Header />
   <ContactUs />
   <ContactSection/>
   <ContactForm/>
   <Newsletter/>
   <InstagramSlider/>
   <Footer/>
    </>
  );
}
