import { useNavigate } from "react-router-dom";

import {
  Search,
  MapPin,
  BriefcaseBusiness,
  Building2,
  Users,
  ShieldCheck,
  HardHat,
  Wrench,
  Home,
  Leaf,
  ArrowRight,
  ClipboardList,
  Star
} from "lucide-react";

import "./HomePage.css";

const services = [
  {
    icon: HardHat,
    title: "Construction Management",
    description: "Professional management for successful construction projects."
  },
  {
    icon: Building2,
    title: "Building & Infrastructure",
    description: "Quality structures designed for a better tomorrow."
  },
  {
    icon: Wrench,
    title: "Renovation & Remodeling",
    description: "Transform existing spaces with professional solutions."
  },
  {
    icon: ClipboardList,
    title: "Project Consulting",
    description: "Expert guidance for smarter construction decisions."
  },
  {
    icon: Home,
    title: "Architectural Design",
    description: "Creative designs for functional and beautiful spaces."
  },
  {
    icon: Leaf,
    title: "Sustainable Construction",
    description: "Environmentally responsible building practices."
  }
];

export default function HomePage() {
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();

    const form = new FormData(e.currentTarget);

    const search = form.get("search");
    const location = form.get("location");
    const type = form.get("type");

    const params = new URLSearchParams();

    if (search) params.set("search", search);
    if (location) params.set("location", location);
    if (type) params.set("type", type);

    navigate(`/jobs?${params.toString()}`);
  };

  return (
    <main className="pvc-home">

      {/* HERO SECTION */}

      <section className="pvc-hero">

        <div className="pvc-hero-content">

          <span className="pvc-hero-label">
            Welcome to Prosperity Vision Construction
          </span>

          <h1>
            Building the Future
            <span> Sustainably.</span>
          </h1>

          <p>
            Discover construction jobs, find trusted companies,
            and get expert construction services — all in one place.
          </p>

          <div className="pvc-hero-buttons">
            <button
              onClick={() => navigate("/jobs")}
              className="pvc-btn-primary"
            >
              Explore Jobs <ArrowRight size={18} />
            </button>

            <button
              onClick={() => navigate("/services")}
              className="pvc-btn-outline"
            >
              Our Services
            </button>
          </div>

        </div>

        <div className="pvc-hero-image">
          <img
            src='images/hero.png'
            alt="Construction project"
          />
        </div>

      </section>


      {/* JOB SEARCH */}

      <section className="pvc-search-section">

        <form
          className="pvc-job-search"
          onSubmit={handleSearch}
        >

          <div className="pvc-search-field">
            <Search size={20} />

            <input
              name="search"
              type="text"
              placeholder="Search construction jobs..."
            />
          </div>

          <div className="pvc-search-field">
            <MapPin size={20} />

            <input
              name="location"
              type="text"
              placeholder="Any location"
            />
          </div>

          <div className="pvc-search-field">
            <BriefcaseBusiness size={20} />

            <select name="type" defaultValue="">
              <option value="">Any job type</option>
              <option value="Full-time">Full-time</option>
              <option value="Part-time">Part-time</option>
              <option value="Contract">Contract</option>
              <option value="Internship">Internship</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <button type="submit" className="pvc-search-submit">
            <Search size={18} />
            Search Jobs
          </button>

        </form>

      </section>


      {/* STATISTICS */}

      <section className="pvc-stats">

        <div className="pvc-stat">
          <BriefcaseBusiness />
          <div>
            <strong>1,200+</strong>
            <span>Construction Jobs</span>
          </div>
        </div>

        <div className="pvc-stat">
          <Building2 />
          <div>
            <strong>350+</strong>
            <span>Companies</span>
          </div>
        </div>

        <div className="pvc-stat">
          <Users />
          <div>
            <strong>100K+</strong>
            <span>Community Members</span>
          </div>
        </div>

        <div className="pvc-stat">
          <ShieldCheck />
          <div>
            <strong>Trusted</strong>
            <span>Community Network</span>
          </div>
        </div>

      </section>


      {/* SERVICES */}

      <section className="pvc-services">

        <div className="pvc-section-heading">
          <span>WHAT WE OFFER</span>
          <h2>Comprehensive Construction Solutions</h2>
          <p>
            From planning to completion, discover services
            that help build a better future.
          </p>
        </div>

        <div className="pvc-services-grid">

          {services.map((service, index) => {
            const Icon = service.icon;

            return (
              <article className="pvc-service-card" key={index}>
                <div className="pvc-service-icon">
                  <Icon size={32} />
                </div>

                <h3>{service.title}</h3>

                <p>{service.description}</p>

                <button
                  onClick={() => navigate("/services")}
                >
                  Explore Service <ArrowRight size={15} />
                </button>
              </article>
            );
          })}

        </div>

      </section>


      {/* RECOMMENDATION SECTION */}

      <section className="pvc-recommendation">

        <div className="pvc-recommendation-icon">
          <Star size={38} />
        </div>

        <div className="pvc-recommendation-content">
          <span>BUILD A TRUSTED COMMUNITY</span>

          <h2>Know a Great Construction Company?</h2>

          <p>
            Help others discover reliable construction companies.
            Recommend a company and share your experience
            with our growing community.
          </p>
        </div>

        <button
          onClick={() => navigate("/recommendations")}
          className="pvc-btn-primary"
        >
          Recommend a Company <ArrowRight size={18} />
        </button>

      </section>


      {/* ABOUT SECTION */}

      <section className="pvc-about">

        <div>
          <span>OUR COMMITMENT</span>
          <h2>Building the future sustainably.</h2>

          <p>
            Prosperity Vision Construction connects construction
            professionals, companies, service providers and
            opportunities through one growing ecosystem.
          </p>

          <button
            className="pvc-about-button"
            onClick={() => navigate("/about")}
          >
            Discover Our Vision <ArrowRight size={17} />
          </button>
        </div>

        <div className="pvc-about-image">
          <img
            src="/images/construction-about.jpg"
            alt="Modern sustainable construction"
          />
        </div>

      </section>


      {/* FINAL CALL TO ACTION */}

      <section className="pvc-final-cta">
        <div>
          <h2>Let's Build a Better Future Together.</h2>
          <p>
            Connect, discover opportunities and grow with us.
          </p>
        </div>

        <button
          onClick={() => navigate("/register")}
          className="pvc-btn-primary"
        >
          Join Our Community <ArrowRight size={18} />
        </button>
      </section>

    </main>
  );
}