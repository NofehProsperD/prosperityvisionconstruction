import { useMemo, useState } from "react";
import { Search, MapPin, Building2, ArrowUpRight, Globe2, BriefcaseBusiness } from "lucide-react";
import { useNavigate } from "react-router-dom";
import "../css/CompaniesPage.css";

const sampleCompanies = [
  { name: "BuildRight Construction", category: "Building & Infrastructure", location: "Douala, Cameroon", description: "Residential, commercial and infrastructure construction.", website: "https://example.com" },
  { name: "GreenSpace Developers", category: "Sustainable Construction", location: "Yaoundé, Cameroon", description: "Environmentally responsible building and development.", website: "https://example.com" },
  { name: "Pioneer Civil Works", category: "Civil Engineering", location: "Buea, Cameroon", description: "Civil engineering, roads and structural projects.", website: "https://example.com" },
  { name: "Visionary Architects", category: "Architecture & Design", location: "Limbe, Cameroon", description: "Architectural planning, design and project consulting.", website: "https://example.com" }
];

export default function CompaniesPage() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All categories");
  const navigate = useNavigate();

  // Replace sampleCompanies with data from your GETLIN companies endpoint when it is ready.
  const companies = useMemo(() => sampleCompanies.filter(company => {
    const text = `${company.name} ${company.category} ${company.location} ${company.description}`.toLowerCase();
    return (!search || text.includes(search.toLowerCase())) &&
      (category === "All categories" || company.category === category);
  }), [search, category]);

  return (
    <main className="pvc-companies-page">
      <section className="pvc-companies-hero">
        <div className="pvc-companies-hero-copy">
          <span className="pvc-companies-kicker">THE CONSTRUCTION NETWORK</span>
          <h1>Discover trusted <em>construction companies.</em></h1>
          <p>Explore construction businesses, discover their expertise and connect with companies shaping the built environment.</p>
          <button onClick={() => navigate("/recommendations")}>Recommend a company <ArrowUpRight size={17}/></button>
        </div>
        <div className="pvc-companies-hero-photo">
          <img src="/images/companies-hero.jpg" alt="Modern construction project and building professionals"/>
        </div>
      </section>

      <section className="pvc-companies-content">
        <header className="pvc-companies-heading">
          <span>COMPANY DIRECTORY</span>
          <h2>Find construction partners</h2>
          <p>Search by company name, location or area of expertise.</p>
        </header>

        <div className="pvc-companies-filters">
          <label><Search size={19}/><input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search companies or expertise"/></label>
          <label><Building2 size={19}/><select value={category} onChange={e => setCategory(e.target.value)}>
            <option>All categories</option>
            <option>Building & Infrastructure</option>
            <option>Sustainable Construction</option>
            <option>Civil Engineering</option>
            <option>Architecture & Design</option>
          </select></label>
        </div>

        <div className="pvc-companies-result-count">{companies.length} companies <span>Directory preview</span></div>
        <div className="pvc-companies-grid">
          {companies.map(company => (
            <article className="pvc-company-card" key={company.name}>
              <div className="pvc-company-card-top">
                <div className="pvc-company-avatar">{company.name.slice(0, 1)}</div>
                <span className="pvc-company-category">{company.category}</span>
              </div>
              <h3>{company.name}</h3>
              <p className="pvc-company-location"><MapPin size={15}/>{company.location}</p>
              <p className="pvc-company-description">{company.description}</p>
              <div className="pvc-company-card-actions">
                <a href={company.website} target="_blank" rel="noreferrer"><Globe2 size={15}/> Website</a>
                <button onClick={() => navigate("/recommendations")}>Company details <ArrowUpRight size={15}/></button>
              </div>
            </article>
          ))}
          {companies.length === 0 && <div className="pvc-companies-empty">No companies match your search. Try another keyword or category.</div>}
        </div>

        <section className="pvc-companies-submit">
          <div className="pvc-companies-submit-icon"><BriefcaseBusiness size={30}/></div>
          <div><span>GROW THE DIRECTORY</span><h2>Know a construction company we should feature?</h2><p>Help expand the network by recommending a company you know.</p></div>
          <button onClick={() => navigate("/recommendations")}>Recommend a company <ArrowUpRight size={17}/></button>
        </section>
      </section>
    </main>
  );
}
