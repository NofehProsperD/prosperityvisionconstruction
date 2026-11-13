import { LockKeyhole, ShieldCheck, Database, Cookie, Mail } from "lucide-react";
import "../css/PrivacyPage.css";

const sections = [
  ["1. Who we are", "This Privacy Policy explains how Prosperity Vision Construction collects, uses, stores and shares personal information when you visit this website or use its features. Before publication, add the full legal name and contact address of the entity responsible for the website."],
  ["2. Information we may collect", "Depending on the features you use, we may collect information you provide, such as your name, email address, phone number, company details, location, recommendation text and messages. We may also receive job or profile information from GETLIN when you use connected features. Basic technical information such as browser type, device information, approximate usage data and security logs may also be collected."],
  ["3. How we use information", "We use information to operate and maintain the website, display company recommendations and construction opportunities, respond to enquiries, review submissions, improve our services, protect the website against abuse and meet legal obligations. We will not use personal information for unrelated purposes without an appropriate legal basis."],
  ["4. GETLIN and other service providers", "Some construction job or platform information may be retrieved from or sent to GETLIN through an API. Information may also be processed by hosting, security, analytics, email or other technology providers that support the website. Configure these integrations deliberately and share only the information necessary for each function."],
  ["5. When information may be shared", "We may share information with service providers working on our behalf, where you ask us to publish or transmit information, where necessary to protect rights and safety, or where required by law. Company recommendations intended for public display may be visible to website visitors after review. Do not submit information that should remain confidential."],
  ["6. Cookies and similar technologies", "The website may use essential cookies or similar technologies to support core functions, security and user preferences. If analytics, advertising or non-essential tracking tools are added, update this policy and provide any notices or consent controls required by applicable law."],
  ["7. Retention and security", "We keep personal information only for as long as reasonably necessary for the purposes described in this policy, unless a longer period is required by law. We use appropriate safeguards designed to protect information, but no online service or method of storage can be guaranteed to be completely secure."],
  ["8. Your privacy choices and rights", "Depending on the laws that apply to you, you may have rights to request access, correction, deletion, restriction or a copy of personal information, or to object to certain processing. You may also withdraw consent where processing is based on consent. Contact us to make a request; we may need to verify your identity."],
  ["9. Children's privacy", "This website is not intended to knowingly collect personal information from children in circumstances where parental or guardian authorization is required. If you believe a child has provided personal information improperly, contact us so we can review the matter."],
  ["10. International processing", "Our hosting or service providers may process information in countries other than the country where you live. Where required, we will use appropriate safeguards for cross-border transfers."],
  ["11. Changes to this policy", "We may update this Privacy Policy as our services, integrations or legal obligations change. The latest version will be published on this page with its updated date."],
  ["12. Contact us", "For privacy questions or requests, use the official contact details published on this website. Before launch, provide a monitored privacy contact email and the legal entity's address."]
];

export default function PrivacyPage() {
  return (
    <main className="pvc-privacy-page">
      <header className="pvc-privacy-hero">
        <div className="pvc-privacy-hero-inner">
          <span className="pvc-privacy-eyebrow">YOUR INFORMATION. YOUR TRUST.</span>
          <div className="pvc-privacy-icon"><LockKeyhole size={27}/></div>
          <h1>Privacy Policy</h1>
          <p>How we handle information when you explore our services and connect with the construction ecosystem.</p>
          <div className="pvc-privacy-updated"><ShieldCheck size={15}/> Last updated: November 2026</div>
        </div>
      </header>
      <section className="pvc-privacy-highlights">
        <article><Database/><strong>Responsible use</strong><span>Information is used to operate and improve the website.</span></article>
        <article><ShieldCheck/><strong>Careful handling</strong><span>We use safeguards designed to protect submitted information.</span></article>
        <article><Cookie/><strong>Clear choices</strong><span>Cookie and tracking practices should be disclosed transparently.</span></article>
      </section>
      <div className="pvc-privacy-layout">
        <aside className="pvc-privacy-aside"><div><LockKeyhole size={22}/></div><h2>Privacy matters</h2><p>We aim to be clear about what information is used and why. Please review this policy before submitting personal or company information.</p><a href="/terms">Read Terms of Service</a></aside>
        <article className="pvc-privacy-content">
          <div className="pvc-privacy-intro"><h2>Our commitment to privacy</h2><p>This policy applies to the Prosperity Vision Construction website and the information processed through its features.</p></div>
          {sections.map(([title, body]) => <section className="pvc-privacy-section" key={title}><h3>{title}</h3><p>{body}</p></section>)}
          <div className="pvc-privacy-contact"><Mail size={19}/><div><strong>Privacy questions or requests?</strong><p>Contact us using the official contact details published on this website.</p></div></div>
        </article>
      </div>
    </main>
  );
}
