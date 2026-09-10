import AboutFounder from "@/components/About/AboutFounder";
import AboutHero from "@/components/About/AboutHero";
import AboutWhyChooseUUs from "@/components/About/AboutWhyChooseUs";
import AboutWhyWeBuilt from "@/components/About/AboutWhyWeBuilt";
import Banner from "@/components/Common/Banner";
import StatsCounter from "@/components/ui/StatsCounter";

export default function AboutPage(){
    return(
        <>
        <AboutHero/>
        <AboutWhyWeBuilt/>
        <AboutWhyChooseUUs/>
        <StatsCounter/>
        <AboutFounder/>
        <Banner/>
        
        </>
    )
}