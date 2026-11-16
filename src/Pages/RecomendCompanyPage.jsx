import { useState } from "react";
import { Building2, MapPin, Globe2, Phone, Mail, BriefcaseBusiness, Send, CheckCircle2 } from "lucide-react";
import "../css/recommendcompanyPage.css" //"../css/RecommendCompanyPage.css";

const API_BASE = import.meta.env.VITE_GETLIN_API_URL || "";

export default function RecommendCompanyPage() {
  const [form, setForm] = useState({
    companyName: "", category: "", country: "", city: "", address: "",
    website: "", contactEmail: "", contactPhone: "", description: "", reason: ""
  });
  const [status, setStatus] = useState({ loading: false, message: "", success: false });

  function update(event) {
    setForm(current => ({ ...current, [event.target.name]: event.target.value }));
  }

  async function submit(event) {
    event.preventDefault();
    setStatus({ loading: true, message: "", success: false });
    try {
      // Change this route to the dedicated recommendation endpoint you create in GETLIN.
      const response = await fetch(`${API_BASE}/api/construction/recommendations`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form)
      });
      const data = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(data.message || "Your recommendation could not be submitted.");
      setStatus({ loading: false, message: "Thank you. Your company recommendation has been submitted for review.", success: true });
      setForm({ companyName:"", category:"", country:"", city:"", address:"", website:"", contactEmail:"", contactPhone:"", description:"", reason:"" });
    } catch (error) {
      setStatus({ loading: false, message: error.message || "Unable to submit. Please check your connection and try again.", success: false });
    }
  }

  return (
    <main className="pvc-recommend-page">
      <section className="pvc-recommend-hero">
        <div className="pvc-recommend-hero-copy">
          <span>HELP US GROW THE NETWORK</span>
          <h1>Recommend a construction company.</h1>
          <p>Know a reliable construction company? Share it with the Prosperity Vision community and help others discover trusted industry professionals.</p>
        </div>
        <img src="/images/recommend-company.jpg" alt="Construction company team working together on a project"/>
      </section>

      <section className="pvc-recommend-layout">
        <aside className="pvc-recommend-aside">
          <div className="pvc-recommend-aside-image"><img src="/images/recommend-company.jpg" alt="Construction professionals at a building site"/></div>
          <span>BUILDING TRUST TOGETHER</span>
          <h2>Your recommendation makes a difference.</h2>
          <p>Help clients, partners and professionals find companies with the experience and services they need.</p>
          <ul><li><CheckCircle2/> Share a company you know</li><li><CheckCircle2/> Provide accurate details</li><li><CheckCircle2/> Help strengthen the ecosystem</li></ul>
        </aside>

        <form className="pvc-recommend-form" onSubmit={submit}>
          <header><span>COMPANY SUBMISSION</span><h2>Company information</h2><p>Fields marked with * are required.</p></header>
          <div className="pvc-recommend-fields">
            <label className="pvc-recommend-full">Company name *<span><Building2/><input required name="companyName" value={form.companyName} onChange={update} placeholder="Enter the registered or public company name"/></span></label>
            <label>Service category *<span><BriefcaseBusiness/><select required name="category" value={form.category} onChange={update}><option value="">Choose a category</option><option>Building & Infrastructure</option><option>Civil Engineering</option><option>Architecture & Design</option><option>Renovation & Remodeling</option><option>Construction Materials</option><option>Sustainable Construction</option><option>Other</option></select></span></label>
            <label>Country *<span><MapPin/><input required name="country" value={form.country} onChange={update} placeholder="Country"/></span></label>
            <label>City *<span><MapPin/><input required name="city" value={form.city} onChange={update} placeholder="City or town"/></span></label>
            <label className="pvc-recommend-full">Street / office address<span><MapPin/><input name="address" value={form.address} onChange={update} placeholder="Optional business address"/></span></label>
            <label>Company website<span><Globe2/><input type="url" name="website" value={form.website} onChange={update} placeholder="https://"/></span></label>
            <label>Contact email<span><Mail/><input type="email" name="contactEmail" value={form.contactEmail} onChange={update} placeholder="company@example.com"/></span></label>
            <label>Contact phone<span><Phone/><input name="contactPhone" value={form.contactPhone} onChange={update} placeholder="Phone number"/></span></label>
            <label className="pvc-recommend-full">What does the company do? *<textarea required name="description" value={form.description} onChange={update} rows="4" placeholder="Describe its services, experience or areas of specialization."/></label>
            <label className="pvc-recommend-full">Why do you recommend this company? *<textarea required name="reason" value={form.reason} onChange={update} rows="4" placeholder="Tell us why this company deserves to be recommended."/></label>
          </div>
          <p className="pvc-recommend-consent">By submitting, you confirm that the information is accurate to the best of your knowledge. Recommendations may be reviewed before publication.</p>
          <button className="pvc-recommend-submit" type="submit" disabled={status.loading}>{status.loading ? "Submitting…" : "Submit recommendation"} <Send size={17}/></button>
          {status.message && <p className={`pvc-recommend-status ${status.success ? "success" : "error"}`}>{status.message}</p>}
        </form>
      </section>
    </main>
  );
}
