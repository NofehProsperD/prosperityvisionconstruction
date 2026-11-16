import { useEffect, useMemo, useState } from "react";
import { Search, MapPin, BriefcaseBusiness, Clock3, ArrowUpRight, RefreshCw } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import "../css/jobsPage.css";
import { API_URL } from "../Utils/api";

let Jobs;



const API_BASE =  API_URL;
const asText = (value, fallback = "Not specified") => value == null || value === "" ? fallback : String(value);

export default function JobsPage() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [location, setLocation] = useState("");
  const [type, setType] = useState("All types");
  const navigate = useNavigate();

  async function loadJobs() {
    setLoading(true); setError("");
    try {
 
      const response = await fetch(`${API_BASE}/construction/jobs`);
      if (!response.ok) throw new Error(`GETLIN returned ${response.status}`);
      const payload = await response.json();
      const list = Array.isArray(payload) ? payload : payload.jobs || payload.data || payload.results || [];
      setJobs(Array.isArray(list) ? list : []);

      
      Jobs=list
   
      
    } catch (err) {
      console.log(err);
      
      setError(err.message || "We couldn't load jobs from GETLIN. Check the API URL and server CORS settings, then try again.");
    } finally { setLoading(false); }
  }
  useEffect(() => { loadJobs(); }, []);

  const filteredJobs = useMemo(() => jobs.filter(job => {
    const title = `${job.title || ""} ${job.company || ""} ${job.description || ""}`.toLowerCase();
    const place = `${job.location || ""} ${job.country || ""} ${job.city || ""}`.toLowerCase();
    const matchesSearch = !search || title.includes(search.toLowerCase());
    const matchesLocation = !location || place.includes(location.toLowerCase());
    const matchesType = type === "All types" || String(job.type || "").toLowerCase() === type.toLowerCase();
    return matchesSearch && matchesLocation && matchesType;
  }), [jobs, search, location, type]);

  return <main className="pvc-jobs-page">
    <section className="pvc-jobs-hero">
      <div className="pvc-jobs-hero-copy">
        <span className="pvc-jobs-eyebrow">CAREER OPPORTUNITIES</span>
        <h1>Build your career.<br/><em>Build the future.</em></h1>
        <p>Find construction opportunities from companies in the GETLIN ecosystem.</p>
      </div>
      <img src="/images/jobs-hero.jpg" alt="Construction professionals working on a building project" />
    </section>

    <section className="pvc-jobs-content">
      <div className="pvc-jobs-heading"><div><span>FIND YOUR NEXT OPPORTUNITY</span><h2>Construction jobs</h2><p>Search roles, explore employers and take your next career step.</p></div><button className="pvc-jobs-refresh" onClick={loadJobs}><RefreshCw size={16}/> Refresh jobs</button></div>
      <div className="pvc-jobs-filter">
        <label><Search/><input value={search} onChange={e => setSearch(e.target.value)} placeholder="Job title, skill or company" /></label>
        <label><MapPin/><input value={location} onChange={e => setLocation(e.target.value)} placeholder="City or location" /></label>
        <label><BriefcaseBusiness/><select value={type} onChange={e => setType(e.target.value)}><option>All types</option><option>Full-time</option><option>Part-time</option><option>Contract</option><option>Internship</option><option>Other</option></select></label>
      </div>
      <div className="pvc-jobs-results-line"><strong>{filteredJobs.length} opportunities</strong><span>Provided by GETLIN</span></div>
      {loading ? <div className="pvc-jobs-state">Loading construction jobs…</div> : error ? <div className="pvc-jobs-state pvc-jobs-error"><strong>Unable to load jobs</strong><p>{error}</p><button onClick={loadJobs}>Try again</button></div> : filteredJobs.length === 0 ? <div className="pvc-jobs-state"><strong>No matching jobs found</strong><p>Try a different keyword or location.</p></div> :
        <div className="pvc-job-list">{filteredJobs.map((job, index) => <article className="pvc-job-card" key={job._id || job.id || index}>
          <div className="pvc-job-company-mark">{asText(job.company, "P").charAt(0).toUpperCase()}</div>
          <div className="pvc-job-main"><span className="pvc-job-company">{asText(job.company, "Construction company")}</span><h3>{asText(job.title, "Construction opportunity")}</h3><div className="pvc-job-meta"><span><MapPin size={14}/>{asText(job.location, "Location not listed")}</span><span><BriefcaseBusiness size={14}/>{asText(job.type, "Flexible")}</span><span><Clock3 size={14}/>{asText(job.createdAt ? new Date(job.createdAt).toLocaleDateString() : job.date, "Recently posted")}</span></div></div>
          <div className="pvc-job-side"><span className="pvc-job-salary">{asText(job.salary, "Salary undisclosed")}</span><button onClick={() => navigate(`/jobs/${job._id || job.id}`, { state: { job } })}>View details <ArrowUpRight size={16}/></button></div>
        </article>)}</div>}
      <div className="pvc-jobs-note">Job opportunites available in Getlin</div>
    </section>
  </main>;
}

export function JobDetailsPage() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const job = state?.job;
  if (!job) return <main className="pvc-jobs-content"><div className="pvc-jobs-state"><strong>Job details unavailable</strong><p>Return to the jobs list and select a listing to view its details.</p><button onClick={() => navigate("/jobs")}>Browse jobs</button></div></main>;
  return <main className="pvc-jobs-content"><button className="pvc-jobs-refresh" onClick={() => navigate("/jobs")}>← Back to jobs</button><article className="pvc-job-detail-card"><span className="pvc-job-company">{asText(job.company, "Construction company")}</span><h1>{asText(job.title, "Construction opportunity")}</h1><p>{asText(job.location, "Location not listed")} · {asText(job.type, "Job type not listed")} · {asText(job.salary, "Salary undisclosed")}</p><div className="pvc-job-detail-description">{asText(job.description, "No job description was provided.")}</div>{job.dateline && <p><strong>Application deadline:</strong> {String(job.dateline)}</p>}{job.website && <a href={job.website} target="_blank" rel="noreferrer">Visit company website</a>}</article></main>;
}
export {Jobs}