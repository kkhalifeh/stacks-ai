import kinzIcon from '../../assets/KinzIcon.png';
import sigKhaled from '../../assets/signatures/sig-khaled.png';
import sigAbuJoudeh from '../../assets/signatures/sig-abujoudeh.png';
import sigBzour from '../../assets/signatures/sig-bzour.png';

/* ── Signature lookup ── */
const signatureImages: Record<string, string> = {
  'Khaled M. Khalifeh': sigKhaled,
  'Ahmad Mahmoud Abu Joudeh': sigAbuJoudeh,
  'Ahmad Q. Al-Bzour': sigBzour,
};

const digitalSignatureNames = new Set([
  'Dr. Bushra Al Hijawi',
  'Duha Ghanayem',
  'Osama Sarwar',
]);

function SignatureBlock({ name }: { name: string }) {
  const sigImg = signatureImages[name];
  const isDigital = digitalSignatureNames.has(name);

  if (sigImg) {
    return <img src={sigImg} alt="" className="h-7 object-contain object-left" />;
  }
  if (isDigital) {
    return (
      <div className="flex items-center gap-1.5">
        <span style={{ fontFamily: 'Georgia, "Times New Roman", serif', fontStyle: 'italic', fontSize: '14px', color: 'var(--color-primary)', fontWeight: 600 }}>
          {name}
        </span>
        <span className="text-[6px] px-1 py-0.5 rounded border flex items-center gap-0.5"
          style={{ color: 'var(--color-kinz-green)', borderColor: 'var(--color-kinz-green)', lineHeight: 1 }}>
          <svg width="6" height="6" viewBox="0 0 16 16" fill="currentColor"><path d="M13.78 4.22a.75.75 0 010 1.06l-7.25 7.25a.75.75 0 01-1.06 0L2.22 9.28a.75.75 0 011.06-1.06L6 10.94l6.72-6.72a.75.75 0 011.06 0z"/></svg>
          DIGITAL
        </span>
      </div>
    );
  }
  return <div className="h-7" />;
}

/* ── Shared Components ── */
const AccentStripe = () => (
  <div className="flex h-1.5 flex-shrink-0">
    <div className="flex-1" style={{ background: 'var(--color-kinz-red)' }} />
    <div className="flex-1" style={{ background: 'var(--color-kinz-orange)' }} />
    <div className="flex-1" style={{ background: 'var(--color-kinz-yellow)' }} />
    <div className="flex-1" style={{ background: 'var(--color-kinz-green)' }} />
    <div className="flex-1" style={{ background: 'var(--color-kinz-blue)' }} />
    <div className="flex-1" style={{ background: 'var(--color-kinz-navy)' }} />
  </div>
);

function Footer({ page }: { page: number }) {
  return (
    <div className="pt-3 mt-auto flex justify-between items-center text-xs border-t"
      style={{ color: 'var(--color-text-muted)', borderColor: 'var(--color-border)' }}>
      <span>Kinz for Information Technology &middot; www.kinz.jo</span>
      <span>TECH-6 &middot; Page {page}</span>
    </div>
  );
}

interface CVHeaderProps {
  positionTitle: string;
  name: string;
  dob: string;
  citizenship: string;
  isFirstPage?: boolean;
}

function CVHeader({ positionTitle, name, dob, citizenship, isFirstPage }: CVHeaderProps) {
  const borderColor = 'var(--color-border)';
  return (
    <>
      {isFirstPage && (
        <>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <img src={kinzIcon} alt="" className="w-7 h-7 opacity-20" />
              <h1 className="text-xl font-bold" style={{ color: 'var(--color-text)' }}>
                TECH-6: Curriculum Vitae
              </h1>
            </div>
            <span className="text-[10px] px-2 py-1 rounded font-semibold tracking-wide uppercase"
              style={{ background: 'var(--color-primary)', color: 'white' }}>
              8 pages
            </span>
          </div>
          <div className="h-px mb-5" style={{ background: borderColor }} />
        </>
      )}
      <div className="rounded-lg overflow-hidden border mb-4" style={{ borderColor }}>
        <table className="w-full text-xs" style={{ color: 'var(--color-text)' }}>
          <tbody>
            <tr style={{ background: 'var(--color-light-bg)' }}>
              <td className="py-2 px-4 font-semibold w-[200px]">Position Title</td>
              <td className="py-2 px-4 font-bold" style={{ color: 'var(--color-primary)' }}>{positionTitle}</td>
            </tr>
            <tr className="border-t" style={{ borderColor }}>
              <td className="py-2 px-4 font-semibold">Name of Person</td>
              <td className="py-2 px-4">{name}</td>
            </tr>
            <tr className="border-t" style={{ borderColor }}>
              <td className="py-2 px-4 font-semibold">Date of Birth</td>
              <td className="py-2 px-4">{dob}</td>
            </tr>
            <tr className="border-t" style={{ borderColor }}>
              <td className="py-2 px-4 font-semibold">Country of Citizenship / Residence</td>
              <td className="py-2 px-4">{citizenship}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
}

function CVCertification({ name }: { name: string }) {
  const borderColor = 'var(--color-border)';
  const sigDate = '19/04/2026';
  return (
    <div className="mt-auto pt-3 border-t h-[130px] flex-shrink-0 flex flex-col justify-between" style={{ borderColor }}>
      <p className="text-[8.5px] leading-[1.5]" style={{ color: 'var(--color-text-muted)' }}>
        <strong style={{ color: 'var(--color-text)' }}>Certification:</strong> I, the undersigned, certify that to the best of my knowledge and belief,
        this CV correctly describes myself, my qualifications, and my experience, and I am available to
        undertake the assignment in case of an award. I understand that any misstatement or misrepresentation
        described herein may lead to my disqualification or dismissal by JICA.
      </p>
      <div className="flex gap-6 text-[8.5px]" style={{ color: 'var(--color-text)' }}>
        <div className="flex-1">
          <SignatureBlock name={name} />
          <div className="border-b mb-1" style={{ borderColor }} />
          <p className="font-medium">{name}</p>
          <p style={{ color: 'var(--color-text-muted)' }}>Signature <span className="ml-12">Date: {sigDate}</span></p>
        </div>
        <div className="flex-1">
          <img src={sigKhaled} alt="" className="h-7 object-contain object-left" />
          <div className="border-b mb-1" style={{ borderColor }} />
          <p className="font-medium">Khaled M. Khalifeh</p>
          <p style={{ color: 'var(--color-text-muted)' }}>Authorized Representative <span className="ml-3">Date: {sigDate}</span></p>
        </div>
      </div>
    </div>
  );
}

interface EmploymentEntry {
  period: string;
  org: string;
  reference?: string;
  country: string;
  activities: string;
}

function EmploymentTable({ entries, borderColor }: { entries: EmploymentEntry[]; borderColor: string }) {
  return (
    <div className="rounded-lg overflow-hidden border" style={{ borderColor }}>
      <table className="w-full text-[10px]" style={{ color: 'var(--color-text)' }}>
        <thead>
          <tr style={{ background: 'var(--color-light-bg)' }}>
            <th className="py-1.5 px-2 font-semibold text-left w-[80px]">Period</th>
            <th className="py-1.5 px-2 font-semibold text-left w-[180px]">Organization &amp; Title</th>
            <th className="py-1.5 px-2 font-semibold text-left w-[50px]">Country</th>
            <th className="py-1.5 px-2 font-semibold text-left">Activities Relevant to the Assignment</th>
          </tr>
        </thead>
        <tbody>
          {entries.map((e, i) => (
            <tr key={i} className="border-t align-top" style={{ borderColor }}>
              <td className="py-1.5 px-2 whitespace-nowrap">{e.period}</td>
              <td className="py-1.5 px-2">
                <span className="font-semibold">{e.org}</span>
                {e.reference && (
                  <span className="block text-[9px] mt-0.5" style={{ color: 'var(--color-text-muted)' }}>
                    Ref: {e.reference}
                  </span>
                )}
              </td>
              <td className="py-1.5 px-2">{e.country}</td>
              <td className="py-1.5 px-2 leading-[1.5]">{e.activities}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   CV 1: DR. BUSHRA AL HIJAWI — AI RESEARCHER (Pages 1-2)
   ═══════════════════════════════════════════════════════════════ */

export function Tech6CV_Bushra_P1() {
  const borderColor = 'var(--color-border)';
  return (
    <div className="w-[794px] h-[1123px] flex flex-col">
      <AccentStripe />
      <div className="flex-1 px-12 pt-8 pb-5 flex flex-col overflow-hidden">
        <CVHeader
          positionTitle="AI Researcher / Methodology Advisor"
          name="Dr. Bushra Al Hijawi"
          dob="11/06/1993"
          citizenship="Jordan"
          isFirstPage
        />

        <h3 className="text-sm font-bold mb-2" style={{ color: 'var(--color-text)' }}>Education</h3>
        <div className="rounded-lg p-3 mb-4" style={{ background: 'var(--color-light-bg)' }}>
          <div className="text-[11px] space-y-1.5" style={{ color: 'var(--color-text)' }}>
            <p>&bull; <strong>Ph.D. in Computer Science</strong>, Princess Sumaya University for Technology, 2021</p>
            <p>&bull; <strong>M.Sc. in Information Systems and Innovation</strong>, The Hashemite University, 2017</p>
            <p>&bull; <strong>B.Sc. in Computer Information Systems</strong>, Al-Albayt University, 2015</p>
          </div>
        </div>

        <h3 className="text-sm font-bold mb-2" style={{ color: 'var(--color-text)' }}>Employment Record Relevant to the Assignment</h3>
        <EmploymentTable borderColor={borderColor} entries={[
          {
            period: 'Oct 2021 \u2013 Present',
            org: 'Associate Professor, Dept. of Data Science, Princess Sumaya University for Technology',
            reference: 'Dr. Anas Abu Taleb, a.abutaleb@psut.edu.jo',
            country: 'Jordan',
            activities: 'Teaching AI and data science courses (Data Engineering, Big Data, AI, Information Retrieval). Supervising graduate and undergraduate research. Leading the AI-Ability initiative. Member of Data Science and Big Data Research Group.',
          },
          {
            period: 'Apr 2024 \u2013 Nov 2024',
            org: 'AI Consultant, ESCWA (United Nations)',
            reference: 'Dr. Mohamad, alawa@un.org',
            country: 'Jordan',
            activities: 'Designed a national AI classification framework for Jordan in collaboration with MoDEE. Reviewed national digital policies against international best practices (CMMI, EU AI law). Engaged with public and private sector stakeholders through workshops. Prepared reports incorporating feedback from MoDEE.',
          },
          {
            period: 'May 2024 \u2013 Oct 2024',
            org: 'AI Instructor, Jordan Cybersecurity Youth Academy (PSUT + Purdue University)',
            reference: 'Dr. Qutaiba Albluwi, q.albluwi@psut.edu.jo',
            country: 'Jordan',
            activities: 'Teaching Machine Learning for Cybersecurity. Developing practical AI curriculum bridging academic theory and applied security use cases.',
          },
          {
            period: '2021 \u2013 2024',
            org: 'AI Instructor & Consultant, Orange AI Incubator',
            reference: 'Dr. Ahmad Alzghoul, a.alzghoul@psut.edu.jo',
            country: 'Jordan',
            activities: 'Teaching Data Engineering and Machine Learning courses. AI consultant for technology startups on data-driven product development.',
          },
        ]} />

        <Footer page={1} />
      </div>
    </div>
  );
}

export function Tech6CV_Bushra_P2() {
  return (
    <div className="w-[794px] h-[1123px] flex flex-col">
      <AccentStripe />
      <div className="flex-1 px-12 pt-8 pb-5 flex flex-col overflow-hidden">
        <h3 className="text-sm font-bold mb-2" style={{ color: 'var(--color-text)' }}>
          Selected Publications Relevant to the PoC Program
        </h3>
        <p className="text-[10px] mb-3" style={{ color: 'var(--color-text-muted)' }}>
          Dr. Al Hijawi has authored 30+ peer-reviewed publications. Below is a selection most relevant to this assignment
          (AI/ML, predictive modeling, data engineering, and recommendation/scoring systems).
        </p>

        <div className="rounded-lg p-3 overflow-hidden" style={{ background: 'var(--color-light-bg)' }}>
          <div className="text-[9.5px] leading-[1.6] space-y-1.5" style={{ color: 'var(--color-text)' }}>
            <p>&bull; B. Alhijawi, S. Fraihat, A. Awajan. &ldquo;Adaptive collaborative filtering for multi-objective Top-N recommendations with implicit feedback.&rdquo; <em>Journal of Computational Mathematics and Data Science</em> (2026): 100131.</p>
            <p>&bull; B. Alhijawi, R. Jarrar, S. Awajan, A. AbuAlRub. &ldquo;Dual-Branch Approach for AI-Generated Scientific Content Detection.&rdquo; <em>Knowledge-Based Systems</em> (2026): 115440.</p>
            <p>&bull; B. Alhijawi. &ldquo;Deep temporal CNN-BiLSTM method for predicting movie success from social media reviews.&rdquo; <em>Multimedia Tools and Applications</em> 85.2 (2026).</p>
            <p>&bull; H. Hussein, S. Bshoukhoj, R. Banihani, T. N. Alhosanie, B. Alhijawi et al. &ldquo;Diagnosing Developmental Dysplasia of the Hip Using Deep Transfer Learning.&rdquo; <em>Intl. Journal of Imaging Systems and Technology</em> 36(2), 2026: e70332.</p>
            <p>&bull; B. Alhijawi and A. Awajan. &ldquo;Genetic algorithms: Theory, genetic operators, solutions, and applications.&rdquo; <em>Evolutionary Intelligence</em> 17(3), 2024.</p>
            <p>&bull; B. Alhijawi, R. Jarrar, A. AbuAlRub, A. Bader. &ldquo;Deep learning detection method for large language models-generated scientific content.&rdquo; <em>Neural Computing and Applications</em> 37, 2025.</p>
            <p>&bull; B. Alhijawi, S. Fraihat, A. Awajan. &ldquo;Adaptable inheritance-based prediction model for multi-criteria recommender system.&rdquo; <em>Multimedia Tools and Applications</em>, 2023.</p>
            <p>&bull; B. Alhijawi, S. Fraihat, A. Awajan. &ldquo;Multi-factor ranking method for trading-off accuracy, diversity, novelty, and coverage.&rdquo; <em>Intl. Journal of Information Technology</em> 15(3), 2023.</p>
            <p>&bull; B. Alhijawi, A. Awajan, S. Fraihat. &ldquo;Survey on the Objectives of Recommender System: Measures, Solutions, Evaluation Methodology.&rdquo; <em>ACM Computing Surveys</em>, 2022.</p>
            <p>&bull; B. Alhijawi and G. Al-Naymat. &ldquo;Novel Positive Multi-Layer Graph-based Method for Collaborative Filtering.&rdquo; <em>Journal of Computer Science and Technology</em> 37, 2022.</p>
            <p>&bull; B. Alhijawi et al. &ldquo;Novel predictive model to improve the accuracy of collaborative filtering recommender systems.&rdquo; <em>Information Systems</em> 96, 2021.</p>
            <p>&bull; B. Alhijawi and Y. Kilani. &ldquo;A Collaborative Filtering Recommender System Using Genetic Algorithm.&rdquo; <em>Information Processing &amp; Management</em> 57(6), 2020.</p>
            <p>&bull; B. Alhijawi and A. Awajan. &ldquo;Prediction of Movie Success Using Twitter Temporal Mining.&rdquo; <em>Proc. 6th Intl. Congress on ICT</em>, Springer.</p>
            <p>&bull; B. Alhijawi and A. Awajan. &ldquo;Novel Textual Entailment Technique for the Arabic Language Using Genetic Algorithm.&rdquo; <em>Computer Speech &amp; Language</em> 68, 2021.</p>
            <p>&bull; M. Abu Maizer and B. Alhijawi. &ldquo;Temporal brain tumor progression tracking using deep learning and 3D MRI volume analysis.&rdquo; <em>Intl. Journal of Information Technology</em>, 2024.</p>
            <p>&bull; S. Fraihat, B. Abu Tahon, B. Alhijawi, A. Awajan. &ldquo;Deep encoder-decoder-based shared learning for multi-criteria recommendation systems.&rdquo; <em>Neural Computing and Applications</em> 35(34), 2023.</p>
          </div>
        </div>

        <div className="mt-3 text-[10px]" style={{ color: 'var(--color-text-muted)' }}>
          <p><strong>Reviewer for:</strong> Knowledge-Based Systems, IEEE Access, ACM Computing Surveys, User Modeling and User-Adapted Interaction, SAGE Open.</p>
          <p className="mt-1"><strong>Languages:</strong> Arabic (native), English (fluent)</p>
          <p className="mt-1"><strong>Contact:</strong> b.alhijawi@psut.edu.jo &middot; +962 77 249 7915</p>
        </div>

        <CVCertification name="Dr. Bushra Al Hijawi" />
        <Footer page={2} />
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   CV 2: KHALED M. KHALIFEH — PROJECT MANAGER / TEAM LEAD (Page 3)
   ═══════════════════════════════════════════════════════════════ */

export function Tech6CV_Khaled() {
  const borderColor = 'var(--color-border)';
  return (
    <div className="w-[794px] h-[1123px] flex flex-col">
      <AccentStripe />
      <div className="flex-1 px-12 pt-8 pb-5 flex flex-col overflow-hidden">
        <CVHeader
          positionTitle="Project Manager / Team Lead"
          name="Khaled M. Khalifeh"
          dob="02/12/1988"
          citizenship="Jordan"
        />

        <h3 className="text-sm font-bold mb-2" style={{ color: 'var(--color-text)' }}>Education</h3>
        <div className="rounded-lg p-3 mb-4" style={{ background: 'var(--color-light-bg)' }}>
          <div className="text-[11px] space-y-1.5" style={{ color: 'var(--color-text)' }}>
            <p>&bull; <strong>Software Engineering</strong>, Flatiron Academy, New York City, USA, 2019</p>
            <p>&bull; <strong>B.A. in Business Administration</strong>, Global Business Management, Regents University London, 2011</p>
            <p>&bull; <strong>B.Sc. in Computer Science</strong>, University of Edinburgh, Scotland, 2008</p>
          </div>
        </div>

        <h3 className="text-sm font-bold mb-2" style={{ color: 'var(--color-text)' }}>Employment Record Relevant to the Assignment</h3>
        <EmploymentTable borderColor={borderColor} entries={[
          {
            period: 'Jan 2021 \u2013 Present',
            org: 'CEO, Kinz for Information Technology, Amman',
            country: 'Jordan',
            activities: 'Leads Jordan\u2019s first corporate data platform covering all economic sectors. Directed the company\u2019s pivot to AI-driven data products, deploying custom ML models for client analytics. Managed delivery of data projects for Google, GIZ, MASE (solar energy forecasting), and the National Center for Security and Crises Management. Oversaw development of the Kinz CRM platform.',
          },
          {
            period: 'Mar 2024 \u2013 Present',
            org: 'Founder & CEO, Atmata AI, Dubai',
            country: 'UAE',
            activities: 'Founded an AI-driven automation and digital transformation consultancy. Developed ML models and automation systems for clients across banking, healthcare, and logistics. Established partnerships with META, InfoBip, Salesforce.',
          },
          {
            period: 'Nov 2019 \u2013 Present',
            org: 'Group Technology Manager, Arabia Group of Companies, Amman',
            country: 'Jordan',
            activities: 'Spearheaded digital transformation across a multi-sector holding company (media, IT, construction, tourism investments). Implemented OTT solutions and managed IT infrastructure and cybersecurity.',
          },
          {
            period: 'Jun 2013 \u2013 Dec 2020',
            org: 'Business Development Manager, Kinz for Information Technology, Amman',
            country: 'Jordan',
            activities: 'Managed client relationships and new product launches for the data platform. Led the company\u2019s web platform overhaul. Grew client base through strategic partnerships with government and private sector organizations.',
          },
        ]} />

        <div className="mt-3 text-[10px]" style={{ color: 'var(--color-text-muted)' }}>
          <p><strong>Languages:</strong> Arabic (native), English (fluent)</p>
          <p className="mt-1"><strong>Contact:</strong> kkhalifeh@kinz.jo &middot; +962 79 520 0001</p>
        </div>

        <CVCertification name="Khaled M. Khalifeh" />
        <Footer page={3} />
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   CV 3: AHMAD ABU JOUDEH — DATABASE ENGINEER (Pages 4-5)
   ═══════════════════════════════════════════════════════════════ */

export function Tech6CV_AbuJoudeh_P1() {
  const borderColor = 'var(--color-border)';
  return (
    <div className="w-[794px] h-[1123px] flex flex-col">
      <AccentStripe />
      <div className="flex-1 px-12 pt-8 pb-5 flex flex-col overflow-hidden">
        <CVHeader
          positionTitle="Database Engineer"
          name="Ahmad Mahmoud Abu Joudeh"
          dob="25/05/1986"
          citizenship="Jordan"
        />

        <h3 className="text-sm font-bold mb-2" style={{ color: 'var(--color-text)' }}>Education</h3>
        <div className="rounded-lg p-3 mb-4" style={{ background: 'var(--color-light-bg)' }}>
          <div className="text-[11px] space-y-1.5" style={{ color: 'var(--color-text)' }}>
            <p>&bull; <strong>B.Sc. in Computer Science</strong>, Al al-Bayt University, Jordan, 2007 (GPA: 92.49)</p>
          </div>
        </div>

        <h3 className="text-sm font-bold mb-2" style={{ color: 'var(--color-text)' }}>Employment Record Relevant to the Assignment</h3>
        <EmploymentTable borderColor={borderColor} entries={[
          {
            period: '2023 \u2013 Present',
            org: 'Chief Technology Officer, Kinz for Information Technology, Amman',
            country: 'Jordan',
            activities: 'Defines company-wide technology strategy and architecture. Oversees development lifecycle for scalable, high-performance data systems. Led modernization of core systems and architecture for scalability and performance. Strengthened system integrations with banking and enterprise partners.',
          },
          {
            period: '2015 \u2013 2023',
            org: 'Development Manager, Kinz for Information Technology, Amman',
            country: 'Jordan',
            activities: 'Built and optimized data architecture, warehouse schemas, and ETL pipelines for the Kinz corporate data platform. Implemented data mining, cleansing, and GIS data processing systems. GPS data processing, routing, and POI data handling. Revamped the Kinz CRM system with improved performance. Developed mobile services and APIs. Deployed and customized SugarCRM CE with full data integration.',
          },
          {
            period: '2009 \u2013 2015',
            org: 'Senior PHP Developer, Dot.jo (Arabia Group), Amman',
            country: 'Jordan',
            activities: 'Delivered enterprise solutions for Bank of Jordan, King Hussein Cancer Center, Mouwasat Hospital, Solidarity First Insurance, and Jordan Pharmaceutical Association. Built web applications using Symfony framework. Developed STS Payment Gateway API for e-commerce.',
          },
          {
            period: '2007 \u2013 2008',
            org: 'Java Developer, Kindisoft, Amman',
            country: 'Jordan',
            activities: 'Contributed to SecureSWF Java Application. Implemented encryption algorithms and compression techniques.',
          },
        ]} />

        <div className="mt-3 text-[10px]" style={{ color: 'var(--color-text-muted)' }}>
          <p><strong>Key skills:</strong> Data architecture, ETL pipelines, GIS data processing, PostgreSQL, warehouse schemas, API design, system integration</p>
          <p className="mt-1"><strong>Languages:</strong> Arabic (native), English (proficient) &middot; <strong>Contact:</strong> ajoudeh@kinz.jo &middot; +962 7 9798 6466</p>
        </div>

        <Footer page={4} />
      </div>
    </div>
  );
}

export function Tech6CV_AbuJoudeh_P2() {
  const borderColor = 'var(--color-border)';
  return (
    <div className="w-[794px] h-[1123px] flex flex-col">
      <AccentStripe />
      <div className="flex-1 px-12 pt-8 pb-5 flex flex-col overflow-hidden">
        <h3 className="text-sm font-bold mb-3" style={{ color: 'var(--color-text)' }}>Key Projects</h3>

        <div className="space-y-3">
          {[
            {
              title: 'Kinz Corporate Data Platform',
              color: 'var(--color-kinz-blue)',
              items: [
                'Designed and built the complete data architecture and warehouse schema for Jordan\u2019s first corporate data platform',
                'Developed ETL pipelines for ingesting, cleansing, and harmonizing data from hundreds of sources across all economic sectors',
                'Implemented GIS data processing, GPS routing, and point-of-interest (POI) handling for geographic data layers',
                'Built data mining and cleansing systems handling naming inconsistencies, duplicate detection, and cross-source validation',
              ],
            },
            {
              title: 'Bank of Jordan CRM System',
              color: 'var(--color-kinz-green)',
              items: [
                'Designed and implemented a full-scale CRM solution serving 750+ users',
                'Built system integrations with banking services ensuring secure, scalable API communication',
                'Conducted training sessions for key stakeholders',
              ],
            },
            {
              title: 'Kawar Shipping CRM & Enterprise Integrations',
              color: 'var(--color-kinz-orange)',
              items: [
                'Designed and delivered complete CRM system for logistics operations',
                'Led full system integration with Ahli Bank banking services',
                'Advanced reporting using DevExpress tools for enterprise data visualization',
                'Full backend architecture design for multiple enterprise systems across healthcare, insurance, and banking',
              ],
            },
          ].map(project => (
            <div key={project.title} className="rounded-lg p-3 border-l-4" style={{ borderColor: project.color, background: 'var(--color-light-bg)' }}>
              <h4 className="text-xs font-bold mb-1.5" style={{ color: project.color }}>{project.title}</h4>
              <ul className="text-[10px] leading-[1.5] space-y-0.5" style={{ color: 'var(--color-text)' }}>
                {project.items.map((item, i) => (
                  <li key={i} className="flex gap-1.5">
                    <span className="flex-shrink-0" style={{ color: project.color }}>&bull;</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="rounded-lg p-3 mt-4 border" style={{ borderColor, background: 'var(--color-light-bg)' }}>
          <p className="text-[10px] leading-[1.6]" style={{ color: 'var(--color-text)' }}>
            <strong>Relevance to this PoC:</strong> Ahmad\u2019s 18+ years of experience directly align with
            Subsystem A requirements. He has built the exact type of system this PoC demands: ETL pipelines
            that ingest messy multi-source data, cleanse and harmonize it, and load it into a structured
            database with geographic capabilities. His GIS data processing experience (GPS routing, POI handling)
            maps directly to the PostGIS spatial requirements. His work at Kinz involved handling the same types
            of data quality challenges (naming inconsistencies, duplicate records, cross-source validation) that
            the MoTA tourism datasets will present.
          </p>
        </div>

        <CVCertification name="Ahmad Mahmoud Abu Joudeh" />
        <Footer page={5} />
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   CV 4: AHMAD AL-BZOUR — BACKEND / ANALYTICS DEVELOPER (Page 6)
   ═══════════════════════════════════════════════════════════════ */

export function Tech6CV_AlBzour() {
  const borderColor = 'var(--color-border)';
  return (
    <div className="w-[794px] h-[1123px] flex flex-col">
      <AccentStripe />
      <div className="flex-1 px-12 pt-8 pb-5 flex flex-col overflow-hidden">
        <CVHeader
          positionTitle="Backend / Analytics Developer"
          name="Ahmad Q. Al-Bzour"
          dob="10/03/1992"
          citizenship="Jordan"
        />

        <h3 className="text-sm font-bold mb-2" style={{ color: 'var(--color-text)' }}>Education</h3>
        <div className="rounded-lg p-3 mb-4" style={{ background: 'var(--color-light-bg)' }}>
          <div className="text-[11px] space-y-1.5" style={{ color: 'var(--color-text)' }}>
            <p>&bull; <strong>B.S. in Computer Science</strong>, Al-Balqa Applied University (BAU), Jordan, 2016</p>
          </div>
        </div>

        <h3 className="text-sm font-bold mb-2" style={{ color: 'var(--color-text)' }}>Employment Record Relevant to the Assignment</h3>
        <EmploymentTable borderColor={borderColor} entries={[
          {
            period: 'May 2019 \u2013 Present',
            org: 'Senior Backend Engineer, Kinz for Information Technology, Amman',
            country: 'Jordan',
            activities: 'Led backend architecture and design for enterprise CRM with scalability goals. Developed RESTful APIs in Yii2 and Laravel. Optimized MySQL schemas and queries; used MongoDB and Solr for search and analytics. Integrated Microsoft Graph, Google, Facebook, and OpenAI APIs. Implemented RBAC, token auth, and OWASP-aligned security. Boosted performance with Redis caching, queues, and query tuning. Created API and deployment documentation.',
          },
          {
            period: 'Feb 2017 \u2013 May 2019',
            org: 'PHP Backend Developer, iHR (International Human Resources), Amman',
            country: 'Jordan',
            activities: 'Built Laravel-based modules and APIs with OAuth/JWT and RBAC. Worked with Vue.js and AngularJS teams for API integration. Used Docker and queues for performance. Agile workflows and feature documentation.',
          },
          {
            period: 'Jan 2016 \u2013 Feb 2017',
            org: 'Web Developer, dot.jo (Arabia Group), Amman',
            country: 'Jordan',
            activities: 'Developed Drupal modules and themes. Optimized site performance. Collaborated with designers for responsive UI.',
          },
        ]} />

        <h3 className="text-sm font-bold mt-4 mb-2" style={{ color: 'var(--color-text)' }}>Core Technical Skills</h3>
        <div className="rounded-lg p-3" style={{ background: 'var(--color-light-bg)' }}>
          <div className="text-[10px] leading-[1.6] space-y-1" style={{ color: 'var(--color-text)' }}>
            <p><strong>Languages/Frameworks:</strong> PHP, Laravel, Yii2, JavaScript, Vue.js, AngularJS, jQuery</p>
            <p><strong>Databases:</strong> MySQL (indexes, query plans), MongoDB (aggregation), Redis (caching/queues)</p>
            <p><strong>Architecture:</strong> Domain-driven design, SOLID, service layers, REST API design</p>
            <p><strong>DevOps:</strong> Docker, Git (Gitflow), CI/CD, Linux, LAMP</p>
            <p><strong>Security:</strong> OWASP practices, CSRF/XSS, RBAC, JWT/OAuth</p>
          </div>
        </div>

        <div className="mt-3 text-[10px]" style={{ color: 'var(--color-text-muted)' }}>
          <p><strong>Languages:</strong> Arabic (native), English (proficient)</p>
          <p className="mt-1"><strong>Contact:</strong> abzour@kinz.jo &middot; +962 78 879 1992</p>
        </div>

        <CVCertification name="Ahmad Q. Al-Bzour" />
        <Footer page={6} />
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   CV 5: DUHA GHANAYEM — DATA OPERATIONS MANAGER (Page 7)
   ═══════════════════════════════════════════════════════════════ */

export function Tech6CV_Duha() {
  const borderColor = 'var(--color-border)';
  return (
    <div className="w-[794px] h-[1123px] flex flex-col">
      <AccentStripe />
      <div className="flex-1 px-12 pt-8 pb-5 flex flex-col overflow-hidden">
        <CVHeader
          positionTitle="Data Operations Manager"
          name="Duha Ghanayem"
          dob="20/12/1987"
          citizenship="Jordan"
        />

        <h3 className="text-sm font-bold mb-2" style={{ color: 'var(--color-text)' }}>Education</h3>
        <div className="rounded-lg p-3 mb-4" style={{ background: 'var(--color-light-bg)' }}>
          <div className="text-[11px] space-y-1.5" style={{ color: 'var(--color-text)' }}>
            <p>&bull; <strong>Bachelor&apos;s Degree in Business Administration</strong>, Hashemite University, Jordan, 2009</p>
          </div>
        </div>

        <h3 className="text-sm font-bold mb-2" style={{ color: 'var(--color-text)' }}>Employment Record Relevant to the Assignment</h3>
        <EmploymentTable borderColor={borderColor} entries={[
          {
            period: 'Jan 2026 \u2013 Present',
            org: 'Data Operations Manager, Kinz for Information Technology, Amman',
            country: 'Jordan',
            activities: 'Manages all data operations across the Kinz corporate data platform. Oversees the data cleansing team , coordinating data entry, verification, and database maintenance workflows. Drives process improvement initiatives and ensures compliance with data quality standards.',
          },
          {
            period: 'May 2012 \u2013 Dec 2025',
            org: 'Data Operations & QA Supervisor, Kinz for Information Technology, Amman',
            country: 'Jordan',
            activities: 'Led data operations and quality assurance. Supervised the data cleansing team. Managed data entry, verification, and database maintenance workflows. Monitored performance metrics and implemented process improvements. Led AI-driven initiatives to automate data validation workflows. Coached team members on QA processes and data handling.',
          },
          {
            period: 'Mar 2011 \u2013 May 2012',
            org: 'Quality Assurance Officer, Kinz for Information Technology, Amman',
            country: 'Jordan',
            activities: 'Conducted quality assessments for data accuracy and service standards. Assisted in performance evaluation and quality improvement measures. Developed QA checklists and validation procedures.',
          },
          {
            period: 'Jan 2010 \u2013 Mar 2011',
            org: 'Data Entry & Verification Agent, Kinz for Information Technology, Amman',
            country: 'Jordan',
            activities: 'Collected, verified, and updated client information in company databases. Performed accurate data entry and maintained records for reporting and analysis.',
          },
        ]} />

        <h3 className="text-sm font-bold mt-4 mb-2" style={{ color: 'var(--color-text)' }}>Key Skills</h3>
        <div className="rounded-lg p-3" style={{ background: 'var(--color-light-bg)' }}>
          <div className="text-[10px] leading-[1.6] space-y-1" style={{ color: 'var(--color-text)' }}>
            <p><strong>Data Operations:</strong> Data entry management, database maintenance, data cleansing workflows, duplicate detection, cross-source validation</p>
            <p><strong>Quality Assurance:</strong> QA methodology, performance monitoring, process optimization, compliance auditing</p>
            <p><strong>Team Management:</strong> Supervising data cleansing teams (4+ officers), coaching, workflow coordination</p>
          </div>
        </div>

        <div className="mt-3 text-[10px]" style={{ color: 'var(--color-text-muted)' }}>
          <p><strong>Certifications:</strong> Management Skills for New Managers, Lead Academy (2014)</p>
          <p className="mt-1"><strong>Languages:</strong> Arabic (native), English (very good)</p>
          <p className="mt-1"><strong>Contact:</strong> dghnayem@kinz.jo &middot; +962 799 887 563</p>
        </div>

        <CVCertification name="Duha Ghanayem" />
        <Footer page={7} />
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   CV 6: OSAMA SARWAR — FRONTEND / GIS DEVELOPER (Page 8)
   ═══════════════════════════════════════════════════════════════ */

export function Tech6CV_Osama() {
  const borderColor = 'var(--color-border)';
  return (
    <div className="w-[794px] h-[1123px] flex flex-col">
      <AccentStripe />
      <div className="flex-1 px-12 pt-8 pb-5 flex flex-col overflow-hidden">
        <CVHeader
          positionTitle="Frontend / GIS Developer"
          name="Osama Sarwar"
          dob="15/06/1991"
          citizenship="Pakistan"
        />

        <h3 className="text-sm font-bold mb-2" style={{ color: 'var(--color-text)' }}>Education</h3>
        <div className="rounded-lg p-3 mb-4" style={{ background: 'var(--color-light-bg)' }}>
          <div className="text-[11px] space-y-1.5" style={{ color: 'var(--color-text)' }}>
            <p>&bull; <strong>Software Engineering</strong>, self-directed specialization in frontend development and UI engineering</p>
          </div>
        </div>

        <h3 className="text-sm font-bold mb-2" style={{ color: 'var(--color-text)' }}>Employment Record Relevant to the Assignment</h3>
        <EmploymentTable borderColor={borderColor} entries={[
          {
            period: 'Mar 2022 \u2013 Present',
            org: 'Senior Front-End Engineer, Kinz for Information Technology, Amman (remote)',
            country: 'Jordan',
            activities: 'Leads frontend development for the Kinz platform, building cross-platform applications using React Native and TypeScript. Develops interactive data-driven interfaces with real-time API integration. Built scalable, high-performance UI components for the Kinz CRM and data products. Integrated RESTful APIs connecting frontend interfaces to backend data services. Mentors junior developers on code quality and UI/UX best practices.',
          },
          {
            period: '2019 \u2013 Present',
            org: 'Frontend Developer (Freelance)',
            country: 'Remote',
            activities: 'Delivered 300+ frontend projects spanning full-cycle application development. Implemented authentication flows, payment integrations, real-time chat, and data visualization interfaces. Built interactive dashboards and data display components consuming REST APIs. Strong focus on performance optimization and responsive design across web and mobile platforms.',
          },
        ]} />

        <h3 className="text-sm font-bold mt-4 mb-2" style={{ color: 'var(--color-text)' }}>Core Technical Skills</h3>
        <div className="rounded-lg p-3" style={{ background: 'var(--color-light-bg)' }}>
          <div className="text-[10px] leading-[1.6] space-y-1" style={{ color: 'var(--color-text)' }}>
            <p><strong>Languages:</strong> JavaScript, TypeScript</p>
            <p><strong>Frameworks:</strong> React Native, React, Expo, Redux</p>
            <p><strong>Data Visualization:</strong> Chart libraries, interactive UI components, dashboard development</p>
            <p><strong>Integration:</strong> REST APIs, Firebase, real-time data, authentication/payment systems</p>
            <p><strong>Tools:</strong> Git, responsive design, cross-platform development, performance optimization</p>
          </div>
        </div>

        <div className="rounded-lg p-3 mt-3 border" style={{ borderColor, background: 'var(--color-light-bg)' }}>
          <p className="text-[10px] leading-[1.6]" style={{ color: 'var(--color-text)' }}>
            <strong>Relevance to this PoC:</strong> Osama will build Subsystem C (GIS Dashboard) using
            Leaflet/MapLibre for geospatial map visualization and Plotly.js for analytical charts.
            His 5+ years of JavaScript/TypeScript expertise and experience building interactive,
            data-driven interfaces at Kinz directly apply to the three dashboard views (national overview,
            regional drill-down, investment explorer). His proven ability to integrate REST APIs will
            connect the frontend to the FastAPI backend serving analytics and forecast data.
          </p>
        </div>

        <div className="mt-3 text-[10px]" style={{ color: 'var(--color-text-muted)' }}>
          <p><strong>Languages:</strong> English (professional), Urdu (native)</p>
          <p className="mt-1"><strong>Contact:</strong> usarwar@kinz.jo &middot; +92 307 501 8584</p>
        </div>

        <CVCertification name="Osama Sarwar" />
        <Footer page={8} />
      </div>
    </div>
  );
}
