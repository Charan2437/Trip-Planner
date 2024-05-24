
import Footer from "@/components/Footer";
import { GlobeDemo } from "@/components/Globe";
import Instructors from "@/components/Instructors";
import MusicSchoolTestimonials from "@/components/TestimonialCards";
import WhyChooseUs from "@/components/WhyChooseUs";
import { TypewriterEffectDemo } from "@/components/type-writter";


export default function Home() {
  return (
    <main className="min-h-screen bg-black/[0.96] antialiased bg-grid-white/[0.02] scrollbar-hide">
    
      <TypewriterEffectDemo/>
      <GlobeDemo/>
     
      <WhyChooseUs />
      <MusicSchoolTestimonials />
      
      <Instructors />
      <Footer />
    </main>
  );
}
