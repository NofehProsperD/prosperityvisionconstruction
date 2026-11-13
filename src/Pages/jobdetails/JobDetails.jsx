import React, { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./JobDetails.css";
import { API_URL } from "../../Utils/api";
import { Jobs } from "../JobsPage";

// Set VITE_GETLIN_API_URL in the Prosperity Vision Construction client's .env file.
 

const FALLBACK_IMAGE = "/construction-job-fallback.svg";

function getJobFromResponse(payload) {
  if (payload?.job) return payload.job;
  if (payload?.data?.job) return payload.data.job;
  if (payload?.data && !Array.isArray(payload.data)) return payload.data;
  return payload;
}

function getCompanyName(job) {
  if (typeof job?.company === "string") return job.company;
  if (job?.company && typeof job.company === "object") {
    return job.company.name || job.company.companyName || job.company.title || "Company";
  }
  if (typeof job?.employer === "string") return job.employer;
  if (job?.employer && typeof job.employer === "object") {
    return job.employer.companyName || job.employer.name || job.employer.username || "Company";
  }
  return "Company";
}

function getImageUrls(images) {
  if (!Array.isArray(images)) return [];
  return images
    .map((image) => (typeof image === "string" ? image : image?.url))
    .filter((url) => typeof url === "string" && url.trim());
}

function formatDate(value) {
  if (!value) return "Not specified";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return String(value);
  return new Intl.DateTimeFormat(undefined, {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(date);
}

function isPastDate(value) {
  if (!value) return false;
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return false;
  date.setHours(23, 59, 59, 999);
  return date.getTime() < Date.now();
}

function DetailItem({ icon, label, value }) {
  if (value === undefined || value === null || value === "") return null;
  return (
    <div className="pvc-detail-item">
      <span className="pvc-detail-icon" aria-hidden="true">{icon}</span>
      <div>
        <span className="pvc-detail-label">{label}</span>
        <strong className="pvc-detail-value">{value}</strong>
      </div>
    </div>
  );
}

export default function JobDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [activeImage, setActiveImage] = useState(0);
  const [imageFailed, setImageFailed] = useState(false);

  useEffect(() => {
    if (!id) {
      setError("The job link is missing its job ID.");
      setLoading(false);
      return;
    }

    const controller = new AbortController();

    async function loadJob() {
      setLoading(true);
      setError("");
      try {
 
        const foundJob= Jobs.find(job=>job._id===id)
 
        

        setJob(foundJob);
      } catch (err) {
        if (err.name !== "AbortError") setError(err.message || "Something went wrong while loading this job.");
      } finally {
        if (!controller.signal.aborted) setLoading(false);
      }
    }

    loadJob();
    return () => controller.abort();
  }, [id]);

  const imageUrls = useMemo(() => getImageUrls(job?.images), [job]);
  const companyName = useMemo(() => getCompanyName(job), [job]);
  const jobDateline = job?.dateline || job?.deadline;  const deadlinePassed = isPastDate(jobDateline);
  const expired = deadlinePassed || String(job?.status || "").toLowerCase() === "expired";
  const statusLabel = expired ? "Closed" : (job?.status || "Available");

  useEffect(() => {
    setActiveImage(0);
    setImageFailed(false);
  }, [job?._id]);

  const displayedImage = !imageFailed && imageUrls[activeImage] ? imageUrls[activeImage] : FALLBACK_IMAGE;

  if (loading) {
    return (
      <main className="pvc-job-page">
        <div className="pvc-state-card">
          <span className="pvc-loader" />
          <h1>Loading job details</h1>
          <p>Please wait while we retrieve this opportunity.</p>
        </div>
      </main>
    );
  }

  if (error || !job) {
    return (
      <main className="pvc-job-page">
        <div className="pvc-state-card pvc-error-state">
          <div className="pvc-state-symbol" aria-hidden="true">!</div>
          <p className="pvc-kicker">JOB DETAILS</p>
          <h1>Job not found</h1>
          <p>{error || "We couldn't find the job you're looking for."}</p>
          <button className="pvc-primary-button" onClick={() => navigate("/jobs")}>Back to jobs</button>
        </div>
      </main>
    );
  }

  return (
    <main className="pvc-job-page">
      <div className="pvc-page-banner">
        <div className="pvc-banner-inner">
          <p className="pvc-kicker">PROSPERITY VISION CONSTRUCTION</p>
          <h1>Job <span>Details</span></h1>
          <p>Explore this opportunity and learn more about the role.</p>
        </div>
      </div>

      <div className="pvc-content-wrap">
        <button className="pvc-back-button" onClick={() => navigate("/jobs")}>
          <span aria-hidden="true">←</span> Back to jobs
        </button>

        <div className="pvc-job-layout">
          <div className="pvc-main-column">
            <section className="pvc-overview-card">
              <div className="pvc-gallery">
                <img
                  className="pvc-main-image"
                  src={displayedImage}
                  alt={`${job.title || "Job"} at ${companyName}`}
                  onError={() => setImageFailed(true)}
                />
                {imageUrls.length > 1 && !imageFailed && (
                  <div className="pvc-image-thumbnails" aria-label="Job images">
                    {imageUrls.map((url, index) => (
                      <button
                        type="button"
                        key={`${url}-${index}`}
                        className={`pvc-thumbnail ${activeImage === index ? "is-active" : ""}`}
                        onClick={() => { setActiveImage(index); setImageFailed(false); }}
                        aria-label={`Show job image ${index + 1}`}
                      >
                        <img src={url} alt="" onError={(event) => { event.currentTarget.style.opacity = "0.25"; }} />
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <div className="pvc-overview-info">
                <div className="pvc-top-meta">
                  {job.type && <span className="pvc-pill"><span aria-hidden="true">▣</span>{job.type}</span>}
                  <span className={`pvc-status ${expired ? "is-closed" : "is-open"}`}><i />{statusLabel}</span>
                </div>
                <h2>{job.title || "Untitled position"}</h2>
                <div className="pvc-company-name"><span aria-hidden="true">▦</span>{companyName}</div>
                <div className="pvc-meta-grid">
                  <DetailItem icon="⌖" label="Location" value={job.location} />
                  <DetailItem icon="▤" label="Category" value={job.category} />
                  <DetailItem icon="₵" label="Salary" value={job.salary} />
                  <DetailItem icon="▦" label="Dateline" value={formatDate(jobDateline)} />
                </div>
              </div>
            </section>

            <section className="pvc-description-card">
              <div className="pvc-section-heading"><span aria-hidden="true">▤</span><h2>Job Description</h2></div>
              {job.description ? (
                <div className="pvc-description-text">{job.description.split(/\r?\n/).map((line, index) => (
                  <p key={index}>{line || "\u00a0"}</p>
                ))}</div>
              ) : (
                <p className="pvc-muted">No job description has been provided.</p>
              )}
            </section>
          </div>

          <aside className="pvc-side-column">
            <section className="pvc-summary-card">
              <div className="pvc-card-heading"><span aria-hidden="true">▤</span><h2>Job Summary</h2></div>
              <div className="pvc-summary-list">
                <DetailItem icon="▣" label="Job type" value={job.type} />
                <DetailItem icon="▦" label="Category" value={job.category} />
                <DetailItem icon="⌖" label="Location" value={job.location} />
                <DetailItem icon="₵" label="Salary" value={job.salary} />
                <DetailItem icon="▣" label="Dateline" value={formatDate(jobDateline)} />
                <DetailItem icon="●" label="Status" value={statusLabel} />
              </div>
            </section>

            <section className="pvc-company-card">
              <div className="pvc-card-heading"><span aria-hidden="true">▦</span><h2>About the Company</h2></div>
              <div className="pvc-company-emblem" aria-hidden="true">
                <span className="pvc-emblem-roof">⌂</span>
                <span className="pvc-emblem-buildings">▥ ▥ ▥</span>
              </div>
              <h3>{companyName}</h3>
              <p>Building dreams, creating value.</p>
              <span className="pvc-company-caption">Prosperity Vision Construction</span>
            </section>

            <div className="pvc-promo-card">
              <span className="pvc-promo-mark" aria-hidden="true">⌂</span>
              <p>Building a better tomorrow, one opportunity at a time.</p>
              <span className="pvc-promo-skyline" aria-hidden="true">▥ ▥ ▥ ▥ ▥</span>
            </div>
          </aside>
        </div>
      </div>

      <footer className="pvc-job-footer">
        <span className="pvc-footer-skyline" aria-hidden="true">▥　▥　▥　▥</span>
        <p>Building a Better Tomorrow Together</p>
        <small>Prosperity Vision Construction</small>
      </footer>
    </main>
  );
}
