import kinzIcon from '../../assets/KinzIcon.png';

/* ── PAGE 1: INTRO + ACADEMIC RESEARCHER ── */
export function Tech2JointTeam() {
  return (
    <div className="w-[794px] h-[1123px] flex flex-col">
      <div className="flex h-1.5 flex-shrink-0">
        <div className="flex-1" style={{ background: 'var(--color-kinz-red)' }} />
        <div className="flex-1" style={{ background: 'var(--color-kinz-orange)' }} />
        <div className="flex-1" style={{ background: 'var(--color-kinz-yellow)' }} />
        <div className="flex-1" style={{ background: 'var(--color-kinz-green)' }} />
        <div className="flex-1" style={{ background: 'var(--color-kinz-blue)' }} />
        <div className="flex-1" style={{ background: 'var(--color-kinz-navy)' }} />
      </div>

      <div className="flex-1 px-12 pt-8 pb-5 flex flex-col overflow-hidden">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <img src={kinzIcon} alt="" className="w-7 h-7 opacity-20" />
            <h1 className="text-xl font-bold" style={{ color: 'var(--color-text)' }}>
              TECH-2: Description of Joint Team
            </h1>
          </div>
          <span className="text-[10px] px-2 py-1 rounded font-semibold tracking-wide uppercase"
            style={{ background: 'var(--color-primary)', color: 'white' }}>
            3 pages
          </span>
        </div>
        <div className="h-px mb-5" style={{ background: 'var(--color-border)' }} />

        <p className="text-[13px] mb-5 leading-[1.7]" style={{ color: 'var(--color-text)' }}>
          We, <strong>Kinz for Information Technology</strong>, will be applying the PoC program
          by a Joint Team of academia AI researcher and a private IT company described below.
        </p>

        {/* ── 1. ACADEMIC AI RESEARCHER ── */}
        <div className="flex items-center gap-2 mb-3">
          <div className="w-1 h-5 rounded-full" style={{ background: 'var(--color-kinz-green)' }} />
          <h2 className="text-base font-bold" style={{ color: 'var(--color-text)' }}>1. Academic AI Researcher</h2>
        </div>

        <div className="rounded-lg p-4" style={{ background: 'var(--color-light-bg)' }}>
          <table className="w-full text-xs" style={{ color: 'var(--color-text)' }}>
            <tbody>
              <tr>
                <td className="py-1.5 pr-4 font-medium whitespace-nowrap align-top" style={{ color: 'var(--color-text-muted)', width: '180px' }}>Name of Researcher:</td>
                <td className="py-1.5 font-semibold">Dr. Bushra Al Hijawi</td>
              </tr>
              <tr>
                <td className="py-1.5 pr-4 font-medium whitespace-nowrap align-top" style={{ color: 'var(--color-text-muted)' }}>Affiliation:</td>
                <td className="py-1.5">Princess Sumaya University for Technology</td>
              </tr>
              <tr>
                <td className="py-1.5 pr-4 font-medium whitespace-nowrap align-top" style={{ color: 'var(--color-text-muted)' }}>Address:</td>
                <td className="py-1.5">Khalil Al Saket St. 1, Al-Jubaiha, Amman, Jordan</td>
              </tr>
              <tr>
                <td className="py-1.5 pr-4 font-medium whitespace-nowrap align-top" style={{ color: 'var(--color-text-muted)' }}>Title:</td>
                <td className="py-1.5">Associate Professor, Data Science Department</td>
              </tr>
              <tr>
                <td className="py-1.5 pr-4 font-medium whitespace-nowrap align-top" style={{ color: 'var(--color-text-muted)' }}>Academic Background:</td>
                <td className="py-1.5">
                  Ph.D. in Computer Science (PSUT, 2021).
                  M.Sc. in Information Systems and Innovation (Hashemite University, 2017).
                  B.Sc. in Computer Information Systems (Al-Albayt University, 2015).
                </td>
              </tr>
            </tbody>
          </table>

          <div className="mt-3 pt-3 border-t" style={{ borderColor: 'var(--color-border)' }}>
            <p className="text-xs font-medium mb-2" style={{ color: 'var(--color-text-muted)' }}>
              Major research papers relevant to the PoC program:
            </p>
            <div className="text-xs space-y-1" style={{ color: 'var(--color-text)' }}>
              <p>&bull; B. Alhijawi, S. Fraihat, A. Awajan. &quot;Adaptive collaborative filtering for multi-objective Top-N recommendations with implicit feedback.&quot; <em>Journal of Computational Mathematics and Data Science</em> (2026): 100131.</p>
              <p>&bull; B. Alhijawi, R. Jarrar, S. Awajan, A. AbuAlRub. &quot;Dual-Branch Approach for AI-Generated Scientific Content Detection.&quot; <em>Knowledge-Based Systems</em> (2026): 115440.</p>
              <p>&bull; B. Alhijawi. &quot;Deep temporal CNN-BiLSTM method for predicting movie success from social media reviews.&quot; <em>Multimedia Tools and Applications</em> 85.2 (2026).</p>
              <p>&bull; M. Abu Maizer, B. Alhijawi. &quot;Temporal brain tumor progression tracking using deep learning and 3D MRI volume analysis.&quot; <em>Intl. Journal of Information Technology</em> 16(6), 2024.</p>
              <p>&bull; H. Hussein et al. &quot;Diagnosing Developmental Dysplasia of the Hip Using Deep Transfer Learning.&quot; <em>Intl. Journal of Imaging Systems and Technology</em> 36(2), 2026: e70332.</p>
              <p>&bull; B. Alhijawi and A. Awajan. &quot;Genetic algorithms: Theory, genetic operators, solutions, and applications.&quot; <em>Evolutionary Intelligence</em> 17(3), 2024.</p>
              <p>&bull; B. Alhijawi and A. Awajan. &quot;Prediction of Movie Success Using Twitter Temporal Mining.&quot; <em>Proc. 6th Intl. Congress on ICT</em>, Springer.</p>
            </div>
          </div>

          <div className="mt-3 pt-3 border-t" style={{ borderColor: 'var(--color-border)' }}>
            <p className="text-xs font-medium mb-2" style={{ color: 'var(--color-text-muted)' }}>
              Working experience with private companies and/or government organizations:
            </p>
            <div className="text-xs space-y-1" style={{ color: 'var(--color-text)' }}>
              <p>&bull; <strong>AI Consultant, ESCWA (United Nations)</strong> (2024): Designed a national AI classification framework for Jordan in collaboration with MoDEE. Engaged with public and private sector stakeholders through workshops and policy discussions.</p>
              <p>&bull; <strong>AI Instructor &amp; Consultant, Orange AI Incubator</strong> (2021-2024): AI and data science courses, consultant for technology startups.</p>
              <p>&bull; <strong>AI Instructor, Jordan Cybersecurity Youth Academy</strong> (2024): Teaching ML for Cybersecurity (PSUT &amp; Purdue University joint program).</p>
            </div>
          </div>
        </div>

        <div className="pt-3 mt-auto flex justify-between items-center text-xs border-t" style={{ color: 'var(--color-text-muted)', borderColor: 'var(--color-border)' }}>
          <span>Kinz for Information Technology &middot; www.kinz.jo</span>
          <span>TECH-2 &middot; Page 1</span>
        </div>
      </div>
    </div>
  );
}

/* ── PAGE 2: PRIVATE IT COMPANY + BOARD ── */
export function Tech2JointTeamP2() {
  return (
    <div className="w-[794px] h-[1123px] flex flex-col">
      <div className="flex h-1.5 flex-shrink-0">
        <div className="flex-1" style={{ background: 'var(--color-kinz-red)' }} />
        <div className="flex-1" style={{ background: 'var(--color-kinz-orange)' }} />
        <div className="flex-1" style={{ background: 'var(--color-kinz-yellow)' }} />
        <div className="flex-1" style={{ background: 'var(--color-kinz-green)' }} />
        <div className="flex-1" style={{ background: 'var(--color-kinz-blue)' }} />
        <div className="flex-1" style={{ background: 'var(--color-kinz-navy)' }} />
      </div>

      <div className="flex-1 px-12 pt-8 pb-5 flex flex-col overflow-hidden">
        {/* ── 2. PRIVATE IT COMPANY ── */}
        <div className="flex items-center gap-2 mb-3">
          <div className="w-1 h-5 rounded-full" style={{ background: 'var(--color-kinz-blue)' }} />
          <h2 className="text-base font-bold" style={{ color: 'var(--color-text)' }}>2. Private IT Company</h2>
        </div>

        <div className="rounded-lg p-4 mb-5" style={{ background: 'var(--color-light-bg)' }}>
          <table className="w-full text-xs" style={{ color: 'var(--color-text)' }}>
            <tbody>
              <tr>
                <td className="py-1.5 pr-4 font-medium whitespace-nowrap align-top" style={{ color: 'var(--color-text-muted)', width: '210px' }}>Company Name:</td>
                <td className="py-1.5 font-semibold">Kinz for Information Technology</td>
              </tr>
              <tr>
                <td className="py-1.5 pr-4 font-medium whitespace-nowrap" style={{ color: 'var(--color-text-muted)' }}>Previous Company Names:</td>
                <td className="py-1.5">None</td>
              </tr>
              <tr>
                <td className="py-1.5 pr-4 font-medium whitespace-nowrap" style={{ color: 'var(--color-text-muted)' }}>CCD Registration Number:</td>
                <td className="py-1.5">637</td>
              </tr>
              <tr>
                <td className="py-1.5 pr-4 font-medium whitespace-nowrap" style={{ color: 'var(--color-text-muted)' }}>National Entity Number:</td>
                <td className="py-1.5">200103407</td>
              </tr>
              <tr>
                <td className="py-1.5 pr-4 font-medium whitespace-nowrap" style={{ color: 'var(--color-text-muted)' }}>Date of Registration:</td>
                <td className="py-1.5">21 May 2009</td>
              </tr>
              <tr>
                <td className="py-1.5 pr-4 font-medium whitespace-nowrap align-top" style={{ color: 'var(--color-text-muted)' }}>Registered Address:</td>
                <td className="py-1.5">Arabia Group Complex, 260 Arrar Street, Amman, 11194, Jordan</td>
              </tr>
              <tr>
                <td className="py-1.5 pr-4 font-medium whitespace-nowrap" style={{ color: 'var(--color-text-muted)' }}>Website:</td>
                <td className="py-1.5">www.kinz.jo</td>
              </tr>
              <tr>
                <td className="py-1.5 pr-4 font-medium whitespace-nowrap" style={{ color: 'var(--color-text-muted)' }}>Representative Phone:</td>
                <td className="py-1.5">+962 79 520 0001</td>
              </tr>
              <tr>
                <td className="py-1.5 pr-4 font-medium whitespace-nowrap" style={{ color: 'var(--color-text-muted)' }}>Representative Email:</td>
                <td className="py-1.5">kkhalifeh@kinz.jo</td>
              </tr>
              <tr>
                <td className="py-1.5 pr-4 font-medium whitespace-nowrap" style={{ color: 'var(--color-text-muted)' }}>Type of Business:</td>
                <td className="py-1.5">Private Limited Shareholding Company</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Management / Board */}
        <h3 className="text-sm font-bold mb-3" style={{ color: 'var(--color-text)' }}>Management / Board of Directors</h3>
        <div className="rounded-lg overflow-hidden border" style={{ borderColor: 'var(--color-border)' }}>
          <table className="w-full text-xs">
            <thead>
              <tr style={{ background: 'var(--color-light-bg)' }}>
                <th className="text-left py-2 px-4 font-semibold" style={{ color: 'var(--color-text)' }}>Name</th>
                <th className="text-left py-2 px-4 font-semibold" style={{ color: 'var(--color-text)' }}>Role</th>
              </tr>
            </thead>
            <tbody style={{ color: 'var(--color-text)' }}>
              <tr className="border-t" style={{ borderColor: 'var(--color-border)' }}>
                <td className="py-2 px-4">Muhannad Mohammad Khalifeh</td>
                <td className="py-2 px-4">Chairman of the Board</td>
              </tr>
              <tr className="border-t" style={{ borderColor: 'var(--color-border)' }}>
                <td className="py-2 px-4">Zaid Saadeddine Jum&apos;a</td>
                <td className="py-2 px-4">Vice Chairman</td>
              </tr>
              <tr className="border-t" style={{ borderColor: 'var(--color-border)' }}>
                <td className="py-2 px-4">Tariq Muhannad Mohammad Khalifeh</td>
                <td className="py-2 px-4">Board Member</td>
              </tr>
              <tr className="border-t" style={{ borderColor: 'var(--color-border)', background: 'var(--color-light-bg)' }}>
                <td className="py-2 px-4 font-semibold">Khaled M. Khalifeh</td>
                <td className="py-2 px-4 font-semibold" style={{ color: 'var(--color-primary)' }}>Chief Executive Officer</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="pt-3 mt-auto flex justify-between items-center text-xs border-t" style={{ color: 'var(--color-text-muted)', borderColor: 'var(--color-border)' }}>
          <span>Kinz for Information Technology &middot; www.kinz.jo</span>
          <span>TECH-2 &middot; Page 2</span>
        </div>
      </div>
    </div>
  );
}

/* ── PAGE 3: TEAM OFFICE + ENGINEERS + FOCAL POINT ── */
export function Tech2JointTeamP3() {
  return (
    <div className="w-[794px] h-[1123px] flex flex-col">
      <div className="flex h-1.5 flex-shrink-0">
        <div className="flex-1" style={{ background: 'var(--color-kinz-red)' }} />
        <div className="flex-1" style={{ background: 'var(--color-kinz-orange)' }} />
        <div className="flex-1" style={{ background: 'var(--color-kinz-yellow)' }} />
        <div className="flex-1" style={{ background: 'var(--color-kinz-green)' }} />
        <div className="flex-1" style={{ background: 'var(--color-kinz-blue)' }} />
        <div className="flex-1" style={{ background: 'var(--color-kinz-navy)' }} />
      </div>

      <div className="flex-1 px-12 pt-8 pb-5 flex flex-col overflow-hidden">
        <h3 className="text-sm font-bold mb-3" style={{ color: 'var(--color-text)' }}>Address of AI/IT Data Cleansing Team Office</h3>
        <p className="text-[13px] mb-5" style={{ color: 'var(--color-text)' }}>
          Arabia Group Complex, 260 Arrar Street, Amman, 11194, Jordan
        </p>

        <h3 className="text-sm font-bold mb-3" style={{ color: 'var(--color-text)' }}>Number of Engineers in the Team (by Role)</h3>
        <div className="rounded-lg overflow-hidden mb-5 border" style={{ borderColor: 'var(--color-border)' }}>
          <table className="w-full text-xs">
            <thead>
              <tr style={{ background: 'var(--color-light-bg)' }}>
                <th className="text-left py-2 px-4 font-semibold" style={{ color: 'var(--color-text)' }}>Role</th>
                <th className="text-center py-2 px-4 font-semibold" style={{ color: 'var(--color-text)' }}>Count</th>
                <th className="text-left py-2 px-4 font-semibold" style={{ color: 'var(--color-text)' }}>Nationality</th>
              </tr>
            </thead>
            <tbody style={{ color: 'var(--color-text)' }}>
              <tr className="border-t" style={{ borderColor: 'var(--color-border)' }}>
                <td className="py-2 px-4">Team Lead / CEO</td>
                <td className="text-center py-2 px-4">1</td>
                <td className="py-2 px-4">Jordanian</td>
              </tr>
              <tr className="border-t" style={{ borderColor: 'var(--color-border)' }}>
                <td className="py-2 px-4">Senior Backend Engineer</td>
                <td className="text-center py-2 px-4">2</td>
                <td className="py-2 px-4">Jordanian</td>
              </tr>
              <tr className="border-t" style={{ borderColor: 'var(--color-border)' }}>
                <td className="py-2 px-4">Frontend Engineer</td>
                <td className="text-center py-2 px-4">1</td>
                <td className="py-2 px-4">Non-Jordanian</td>
              </tr>
              <tr className="border-t" style={{ borderColor: 'var(--color-border)' }}>
                <td className="py-2 px-4">QA Officer</td>
                <td className="text-center py-2 px-4">1</td>
                <td className="py-2 px-4">Jordanian</td>
              </tr>
              <tr className="border-t" style={{ borderColor: 'var(--color-border)', background: 'var(--color-light-bg)' }}>
                <td className="py-2 px-4 font-semibold" colSpan={3} style={{ color: 'var(--color-primary)' }}>Data Cleansing Team</td>
              </tr>
              <tr className="border-t" style={{ borderColor: 'var(--color-border)' }}>
                <td className="py-2 px-4">Data Operations Manager</td>
                <td className="text-center py-2 px-4">1</td>
                <td className="py-2 px-4">Jordanian</td>
              </tr>
              <tr className="border-t" style={{ borderColor: 'var(--color-border)' }}>
                <td className="py-2 px-4">Data Officer</td>
                <td className="text-center py-2 px-4">4</td>
                <td className="py-2 px-4">Jordanian</td>
              </tr>
              <tr className="border-t font-bold" style={{ borderColor: 'var(--color-border)', background: 'var(--color-light-bg)' }}>
                <td className="py-2 px-4" style={{ color: 'var(--color-text)' }}>Total</td>
                <td className="text-center py-2 px-4" style={{ color: 'var(--color-text)' }}>10</td>
                <td className="py-2 px-4" style={{ color: 'var(--color-kinz-green)' }}>90% Jordanian</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h3 className="text-sm font-bold mb-3" style={{ color: 'var(--color-text)' }}>Number of Permanent / Temporary Engineers</h3>
        <p className="text-[13px] mb-5" style={{ color: 'var(--color-text)' }}>
          All 10 team members are <strong>permanent employees</strong>. The company employs no temporary or contract-based engineers.
        </p>

        {/* ── 3. UNIFIED CONTACT POINT ── */}
        <div className="flex items-center gap-2 mb-3">
          <div className="w-1 h-5 rounded-full" style={{ background: 'var(--color-kinz-orange)' }} />
          <h2 className="text-base font-bold" style={{ color: 'var(--color-text)' }}>3. Unified Contact Point (Focal Point) of the Joint Team</h2>
        </div>

        <div className="rounded-lg p-4" style={{ background: 'var(--color-light-bg)' }}>
          <table className="w-full text-xs" style={{ color: 'var(--color-text)' }}>
            <tbody>
              <tr>
                <td className="py-1.5 pr-4 font-medium" style={{ color: 'var(--color-text-muted)', width: '180px' }}>Name:</td>
                <td className="py-1.5 font-semibold">Khaled M. Khalifeh</td>
              </tr>
              <tr>
                <td className="py-1.5 pr-4 font-medium" style={{ color: 'var(--color-text-muted)' }}>Affiliation:</td>
                <td className="py-1.5">Kinz for Information Technology</td>
              </tr>
              <tr>
                <td className="py-1.5 pr-4 font-medium" style={{ color: 'var(--color-text-muted)' }}>Title:</td>
                <td className="py-1.5">Chief Executive Officer</td>
              </tr>
              <tr>
                <td className="py-1.5 pr-4 font-medium" style={{ color: 'var(--color-text-muted)' }}>Email:</td>
                <td className="py-1.5">kkhalifeh@kinz.jo</td>
              </tr>
              <tr>
                <td className="py-1.5 pr-4 font-medium" style={{ color: 'var(--color-text-muted)' }}>Telephone:</td>
                <td className="py-1.5">+962 79 520 0001</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="pt-3 mt-auto flex justify-between items-center text-xs border-t" style={{ color: 'var(--color-text-muted)', borderColor: 'var(--color-border)' }}>
          <span>Kinz for Information Technology &middot; www.kinz.jo</span>
          <span>TECH-2 &middot; Page 3</span>
        </div>
      </div>
    </div>
  );
}
