import Banner from "@/components/Common/Banner";
import About from "@/components/home/About";
import { ContactSection } from "@/components/Contact/Contact";
import { Hero } from "@/components/home/Hero";
import Process from "@/components/home/HowWeWork";
import Service from "@/components/home/Services";
import KGCarTestimonials from "@/components/home/Testimonial";
import TransformationSection from "@/components/home/Transformation";
import VideoShowcase from "@/components/home/VideoShowcase";


import WhyChooseUs from "@/components/home/WhyChooseUs";


export default function HomePage(){
    return(
        <>
        <Hero/>
        <About/>
        <Service/>
        <Process/>
        <WhyChooseUs/>
        <TransformationSection/>
        <VideoShowcase/>
        <KGCarTestimonials/>
    <Banner/>
        
        
        </>
    )
}