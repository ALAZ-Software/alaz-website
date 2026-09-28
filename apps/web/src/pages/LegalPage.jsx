import React from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';

export default function LegalPage({ type }) {
  const privacy = type === 'privacy';
  const missing = type === 'not-found';
  const title = missing ? 'PAGE NOT FOUND' : privacy ? 'PRIVACY' : 'LEGAL';
  return <>
    <Helmet><title>{missing ? 'Page Not Found' : privacy ? 'Privacy' : 'Legal'} — ALAZ</title><meta name="description" content={missing ? 'The requested ALAZ page could not be found.' : privacy ? 'Learn how ALAZ handles information submitted through the project inquiry form.' : 'Legal information about the ALAZ engineering website.'} /></Helmet>
    <main className="subpage legal-page frame"><div className="section-top mono"><span>ALAZ / INFORMATION</span><span>{missing ? '404' : 'DOCUMENT / 2025'}</span></div><h1>{title}<span>.</span></h1>
      {missing ? <p>This route does not exist. Return to the beginning.</p> : privacy ? <div className="legal-copy"><h2>YOUR INFORMATION</h2><p>When you submit a project inquiry, we collect the contact details and project information you choose to provide. We use it to review your inquiry and respond to you. We do not sell this information.</p><h2>RETENTION & REQUESTS</h2><p>Inquiries are retained for as long as needed to respond and manage our correspondence. To ask about your information or request its removal, email <a href="mailto:hello@alaz.pro">hello@alaz.pro</a>.</p><h2>THIRD-PARTY CONTENT</h2><p>This website may use externally hosted fonts and imagery. These providers may receive standard browser request information when their resources load.</p></div> : <div className="legal-copy"><h2>WEBSITE INFORMATION</h2><p>This website presents ALAZ's engineering practice and provides a way to initiate a project inquiry. Submitting an inquiry does not create a service agreement or guarantee project acceptance.</p><h2>CONTENT & AVAILABILITY</h2><p>Information is provided for general purposes and may change. Project scope, deliverables, and terms are established only through a separate written agreement.</p></div>}
      <Link to="/" className="outline-action">← BACK TO HOME</Link>
    </main>
  </>;
}
