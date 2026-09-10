import Banner from "@/components/Common/Banner";
import ServiceProcess from "@/components/Services/ServiceProcess";
import ServicesFAQ from "@/components/Services/ServicesFAQ";
import ServicesGrid from "@/components/Services/ServicesGrid";
import ServicesHero from "@/components/Services/ServicesHero";
import ServicesIntro from "@/components/Services/ServicesIntro";

export default function ServicesPage(){
    return(
        <>
        <ServicesHero/>
        <ServicesIntro/>
        <ServicesGrid/>
        <ServiceProcess/>
        <ServicesFAQ/>
        <Banner/>
        
        </>
    )
}