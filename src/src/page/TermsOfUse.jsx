import React from 'react';
import './TermsOfUse.css';

const TermsOfUse = ({ onAccept }) => {
    return (
      <div className="legal-document-container">
        <div className="legal-content">
          <h1>Term of Use</h1>
          <p className="last-updated">Last updated on 23/9/2024</p>
        
        <h2>1. ACCEPTANCE OF TERMS</h2>
        <p>By accessing and using the AI Chatterbox platform, you agree to comply with these Terms of Use. If you do not agree with any of these terms, please do not use our platform.</p>
        
        <h2>2. USE OF THE PLATFORM</h2>
        <p>The AI Chatterbox is a speculative thinking tool designed for creative exploration and learning activities. Users are invited to input topics to receive AI-generated speculative questions. The platform is designed for users aged 14 to 28, but it is open to all.</p>
        
        <h2>3. USER CONDUCT</h2>
        <p>Users are expected to behave respectfully and responsibly when using the platform. You agree to:</p>
        <ul>
          <li>Provide appropriate input: Refrain from using offensive, discriminatory, or inappropriate language in your interactions.</li>
          <li>Use the platform for personal, non-commercial purposes.</li>
          <li>Comply with all applicable laws when using the platform.</li>
        </ul>
        <p>We reserve the right to terminate or restrict access to users who violate these terms.</p>
        
        <h2>4. DISCLAIMER</h2>
        <p>The AI Chatterbox provides speculative, creative questions based on user input. These questions are designed to stimulate thinking and discussion but are not to be taken as factual or professional advice. The platform is for educational and entertainment purposes only.</p>
        
        <h2>5. CONTENT OWNERSHIP</h2>
        <ul>
          <li>User Input: While the platform collects and stores user input for research and analysis purposes, users retain the rights to their input. By using the platform, you grant us a license to use your input for the purposes outlined in our Privacy Policy.</li>
          <li>AI-Generated Content: The AI-generated questions and responses remain the intellectual property of SWISP Lab. Users may use the content for personal purposes but not for commercial gain.</li>
        </ul>
        
        <h2>6. DATA COLLECTION AND PRIVACY</h2>
        <p>We collect and store user input and interaction data as outlined in our Privacy Policy. By using the platform, you consent to the collection and use of your data as described.</p>
        
        <h2>7. LIMITATION OF LIABILITY</h2>
        <p>We strive to ensure that the platform is reliable and secure; however, we make no warranties regarding:</p>
        <ul>
          <li>The accuracy or reliability of the generated questions.</li>
          <li>The availability of the platform without interruptions or errors.</li>
        </ul>
        <p>In no event shall SWISP Lab be liable for any damages resulting from the use or inability to use the platform.</p>
        
        <h2>8. TERMINATION</h2>
        <p>We reserve the right to terminate or restrict your access to the platform if you violate these Terms of Use. In case of termination, your data will be handled as outlined in the Privacy Policy.</p>
        
        <h2>9. CHANGES TO THE TERMS</h2>
        <p>We may modify these Terms of Use at any time. Changes will be posted on this page with the updated effective date. Your continued use of the platform constitutes acceptance of any changes.</p>
        
        <h2>10. GOVERNING LAW</h2>
        <p>These Terms of Use shall be governed by the laws of [Insert Jurisdiction]. Any disputes arising under these terms shall be subject to the jurisdiction of the courts in [Insert Jurisdiction].</p>
        
        <h2>11. CONTACT US</h2>
        <p>If you have any questions about these Terms of Use, please contact us at sarah.healy@unimelb.edu.au.</p>
      </div>
      
      <button className="accept-button" onClick={onAccept}>
      Back
      </button>
    </div>
  );
};

export default TermsOfUse;