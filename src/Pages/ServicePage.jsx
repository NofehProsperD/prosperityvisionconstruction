import { useNavigate } from "react-router-dom";
import { ArrowRight, Building2, HardHat, Leaf, Wrench, Ruler, ClipboardCheck, Layers3, Phone } from "lucide-react";
import "../css/ServicePage.css";

const offerings = [
  { icon: Building2, title: "Building Construction", text: "Residential, commercial and institutional building projects delivered with care, quality and attention to detail." },
  { icon: HardHat, title: "Construction Management", text: "Planning, coordination, site supervision and project oversight from the first brief through handover." },
  { icon: Ruler, title: "Architectural & Design Support", text: "Practical design coordination and planning support to help turn project ideas into buildable solutions." },
  { icon: Wrench, title: "Renovation & Maintenance", text: "Repairs, upgrades, remodelling and maintenance that extend the life and usefulness of existing spaces." },
  { icon: Leaf, title: "Sustainable Building Solutions", text: "Smarter material choices, resource-conscious methods and solutions that consider long-term environmental impact." },
  { icon: ClipboardCheck, title: "Consultancy & Project Support", text: "Guidance on project preparation, construction processes, quality checks and delivery coordination." }
];

export default function ServicesPage() {
  const navigate = useNavigate();
  return <main className="pvc-services-page">
    <section className="pvc-services-hero"><div className="pvc-services-hero-copy"><span>OUR SERVICES</span><h1>Solutions that shape<br/><em>what comes next.</em></h1><p>From the first idea to the finished structure, discover construction services designed around quality, responsibility and lasting value.</p><button onClick={() => navigate("/contact")}>Talk about your project <ArrowRight size={17}/></button></div><img src="/images/services-hero.jpg" alt="Modern construction project and building team"/></section>
    <section className="pvc-services-intro"><span>WHAT WE DO</span><h2>Construction expertise for every stage.</h2><p>Explore our service areas and connect with the right support for your next project.</p></section>
    <section className="pvc-offerings-grid">{offerings.map(({icon:Icon,title,text},i)=><article className="pvc-offering-card" key={title}><div className="pvc-offering-top"><span>0{i+1}</span><div><Icon size={27}/></div></div><h3>{title}</h3><p>{text}</p><button onClick={()=>navigate("/contact")}>Make an enquiry <ArrowRight size={15}/></button></article>)}</section>
    <section className="pvc-service-process"><div className="pvc-process-image"><img src="/images/construction-about.jpg" alt="Sustainable construction site"/></div><div className="pvc-process-copy"><span>OUR APPROACH</span><h2>Built on planning. Driven by purpose.</h2><p>Every successful project starts with understanding its people, place and purpose. Our approach puts thoughtful planning, dependable workmanship and sustainable choices at the centre.</p><ul><li><Layers3/> Understand the project and its needs</li><li><ClipboardCheck/> Plan responsibly and communicate clearly</li><li><Leaf/> Consider long-term value and sustainability</li></ul></div></section>
    <section className="pvc-services-cta"><div><span>HAVE A PROJECT IN MIND?</span><h2>Let's make your vision a reality.</h2><p>Get in touch to discuss your construction needs and the right next step.</p></div><button onClick={()=>navigate("/recommendations")}>Start an enquiry <ArrowRight size={17}/></button></section>
  </main>;
}
