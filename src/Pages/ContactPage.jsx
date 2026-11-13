import {useState} from "react";
import {Mail,Phone,MapPin,Clock3,Send, Import} from "lucide-react";
import "../css/ContactPage.css";
import {API_URL} from '../Utils/api';
 
const empty={name:"",email:"",phone:"",subject:"General enquiry",message:""};
export default function ContactPage(){
 const [form,setForm]=useState(empty),[state,setState]=useState("");
 const change=e=>setForm({...form,[e.target.name]:e.target.value});
 async function submit(e){e.preventDefault();setState("Sending...");try{const r=await fetch(`${API_URL}/construction/contact`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(form)});const d=await r.json();if(!r.ok)throw Error(d.message||"Unable to send message");setForm(empty);setState(d.message||"Message sent successfully.");}catch(err){setState(err.message);}}
 return <main className="pvc-contact-page">
 <header className="pvc-contact-hero"><div><span>WE'RE READY TO LISTEN</span><h1>Let's build something <b>meaningful.</b></h1><p>Contact the Prosperity Vision Construction team about projects, partnerships, services or any question you may have.</p></div><div className="pvc-contact-hero-art"><i/><i/><i/></div></header>
 <section className="pvc-contact-layout"><div className="pvc-contact-info"><small>CONTACT OUR TEAM</small><h2>We're here to help.</h2><p>Send us a message and the right member of our team will get back to you.</p>
 {[["Email","Contact us through our email at ","prosperityvisionconstruction01@gmail.com",Mail],["Phone","Speak with our team","+237 678067717",Phone],["Office","@Cameroon","Buea,Cameroon",MapPin],["Working hours","Tuesdays-Sartudays","8:00am-5:00pm",Clock3]].map(([a,b,c,I])=><div className="pvc-contact-detail" key={a}><I/><div><b>{a}</b><small>{b}</small><p>{c}</p></div></div>)}</div>
 <form className="pvc-contact-form" onSubmit={submit}><span>WRITE TO US</span><h2>Send an enquiry</h2><p>Fields marked * are required.</p><div className="pvc-contact-fields">
 <label>Your name *<input name="name" value={form.name} onChange={change} required maxLength="100"/></label><label>Email address *<input type="email" name="email" value={form.email} onChange={change} required/></label><label>Phone<input name="phone" value={form.phone} onChange={change}/></label><label>Enquiry type<select name="subject" value={form.subject} onChange={change}>{["General enquiry","Construction project","Partnership","Careers and jobs","Company recommendation","Support"].map(x=><option key={x}>{x}</option>)}</select></label><label className="pvc-contact-message">Your message *<textarea name="message" value={form.message} onChange={change} required minLength="10" rows="6" maxLength="5000"/></label></div><button disabled={state==="Sending..."}> {state==="Sending..."?"Sending...":"Send message"} <Send size={16}/></button>{state&&<p role="status">{state}</p>}<small className="pvc-contact-privacy">Your details will be used to respond to your enquiry. Read our <a href="/privacy">Privacy Policy</a>.</small></form></section></main>;
}
