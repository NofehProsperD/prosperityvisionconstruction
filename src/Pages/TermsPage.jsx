import { FileText, ShieldCheck, Scale, Mail } from "lucide-react";
import "../css/TermsPage.css";

const sections = [
  ["1. About these terms", "These Terms of Service govern your access to and use of the Prosperity Vision Construction website and related online services. By using the website, you agree to these terms. If you do not agree, please do not use the website."],
  ["2. About our platform", "Prosperity Vision Construction provides information about construction services, industry participants, company recommendations and construction-related opportunities. Some listings or opportunities may be supplied by third parties or retrieved from the GETLIN platform. A listing does not, by itself, mean that Prosperity Vision Construction employs, certifies or guarantees the listed party."],
  ["3. User accounts and information", "Where an account or sign-in feature is provided, you must provide accurate information, keep your access credentials secure and notify us if you believe your account has been used without permission. You are responsible for activity carried out through your account, subject to applicable law."],
  ["4. Company recommendations and submissions", "When you recommend a company or submit information, you confirm that the information is accurate to the best of your knowledge and that you are permitted to share it. Do not submit confidential information, misleading claims, unlawful content or another person's personal information without a lawful basis."],
  ["5. Jobs and third-party listings", "Job details, company profiles, service descriptions and external links may be provided by employers, companies or other third parties. You should verify important details directly with the relevant provider. We do not guarantee that a listing is current, complete, available or suitable for you."],
  ["6. Acceptable use", "You must not use the website to break the law, impersonate another person, distribute malware, interfere with the website, scrape or harvest information without permission, submit fraudulent recommendations, or harass, threaten or mislead other users."],
  ["7. Intellectual property", "Unless otherwise stated, the website's original text, branding, layout and design elements belong to Prosperity Vision Construction or are used with permission. You may not copy, republish or commercially exploit them without prior permission. Content you submit remains yours, but you give us permission to host, display and process it as needed to operate and improve the service."],
  ["8. External services and links", "The website may link to or integrate with third-party services, including GETLIN. Those services may have their own terms, privacy notices and availability. We are not responsible for third-party services that we do not control."],
  ["9. Availability and disclaimers", "We aim to keep the website useful and available, but we do not promise uninterrupted or error-free operation. Website information is general information and is not a substitute for professional, legal, engineering, financial or safety advice. To the extent permitted by law, the website is provided without warranties that cannot legally be excluded."],
  ["10. Limitation of liability", "To the extent permitted by applicable law, Prosperity Vision Construction is not liable for indirect or consequential loss, or for loss arising from reliance on third-party listings, user submissions or temporary website unavailability. Nothing in these terms excludes liability that cannot lawfully be excluded."],
  ["11. Suspension or changes", "We may update, suspend or remove website features or content where reasonably necessary, including to protect users, maintain security or comply with law. We may revise these terms by publishing an updated version on this page."],
  ["12. Governing law and contact", "These terms are intended to be interpreted under the laws applicable to the operation of Prosperity Vision Construction, subject to mandatory consumer protections. Before publication, insert the correct legal entity name, registered address and governing-law jurisdiction. For questions about these terms, contact us using the official contact details published on this website."]
];

export default function TermsPage() {
  return (
    <main className="pvc-terms-page">
      <header className="pvc-terms-hero">
        <div className="pvc-terms-hero-inner">
          <span className="pvc-terms-eyebrow">PROSPERITY VISION CONSTRUCTION</span>
          <div className="pvc-terms-icon"><Scale size={27}/></div>
          <h1>Terms of Service</h1>
          <p>The guidelines that help keep our construction network useful, responsible and respectful.</p>
          <div className="pvc-terms-updated"><FileText size={15}/> Last updated: November 2026</div>
        </div>
      </header>
      <div className="pvc-terms-layout">
        <aside className="pvc-terms-aside">
          <div className="pvc-terms-aside-icon"><ShieldCheck size={23}/></div>
          <h2>Using our website</h2>
          <p>Please read these terms carefully. They explain the rules for using our pages, listings and submission features.</p>
          <a href="/privacy">Read our Privacy Policy</a>
        </aside>
        <article className="pvc-terms-content">
          <div className="pvc-terms-intro"><h2>Welcome to Prosperity Vision Construction</h2><p>These terms explain your rights and responsibilities when accessing our website and using its features.</p></div>
          {sections.map(([title, body]) => <section className="pvc-terms-section" key={title}><h3>{title}</h3><p>{body}</p></section>)}
          <div className="pvc-terms-contact"><Mail size={19}/><div><strong>Questions about these terms?</strong><p>Contact us through the official contact page on this website.</p></div></div>
        </article>
      </div>
    </main>
  );
}
