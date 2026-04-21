import kinzIcon from '../../assets/KinzIcon.png';

/* ── PAGE 1: AGREEMENT TERMS ── */
export function DocAcademicAgreementP1() {
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
        <div className="flex items-center gap-3 mb-4">
          <img src={kinzIcon} alt="" className="w-7 h-7" />
          <div>
            <h1 className="text-xl font-bold" style={{ color: 'var(--color-text)' }}>
              Academic Partnership Agreement
            </h1>
            <p className="text-xs" style={{ color: 'var(--color-text-muted)' }}>
              AI-GIS PoC Program 5 &middot; Joint Team Engagement Terms
            </p>
          </div>
        </div>
        <div className="h-px mb-5" style={{ background: 'var(--color-border)' }} />

        <div className="text-[13px] leading-[1.7] space-y-4" style={{ color: 'var(--color-text)' }}>
          <p>
            This Academic Partnership Agreement (&quot;Agreement&quot;) is entered into as of
            _________________ 2026 (&quot;Effective Date&quot;) by and between:
          </p>

          <div className="rounded-lg p-4" style={{ background: 'var(--color-light-bg)' }}>
            <p className="mb-3">
              <strong>Party A (Private IT Company):</strong><br />
              Kinz for Information Technology, a Jordanian private limited shareholding company,
              CCD Registration No. 637, represented by Khaled M. Khalifeh, Chief Executive Officer,
              with registered address at Arabia Group Complex, 260 Arrar Street, Amman, 11194, Jordan.
            </p>
            <p>
              <strong>Party B (Academic AI Researcher):</strong><br />
              Dr. Bushra Al Hijawi, Associate Professor, Data Science Department, King Hussein School
              of Computing Sciences, Princess Sumaya University for Technology (PSUT),
              Khalil Al Saket St. 1, Al-Jubaiha, Amman, Jordan.
            </p>
          </div>

          <h3 className="text-sm font-bold pt-2" style={{ color: 'var(--color-text)' }}>1. Purpose</h3>
          <p>
            This Agreement governs the collaboration between Party A and Party B as a Joint Team
            for the purpose of submitting a proposal and, if awarded, implementing Proof of Concept
            (PoC) Program 5: &quot;AI-Enabled Geo-Analytics (AI-GIS) Baseline for Tourism Demand,
            Infrastructure Optimization, and Investment Prioritization in Jordan,&quot; funded by JICA
            and contracted through Japan Development Service Co., Ltd. (JDS).
          </p>

          <h3 className="text-sm font-bold pt-2" style={{ color: 'var(--color-text)' }}>2. Scope of Engagement</h3>
          <p>Party B shall serve as the Academic AI Researcher within the Joint Team, performing the following responsibilities:</p>
          <div className="pl-4 space-y-1">
            <p>a) Validate the AI/analytics methodology proposed for the PoC, including the forecasting approach, indicator formulas, and evaluation protocols.</p>
            <p>b) Advise on the Prophet model configuration, data preparation strategy, and back-testing methodology.</p>
            <p>c) Verify and validate forecast evaluation results and provide technical guidance on model improvement.</p>
            <p>d) Participate in consortium meetings and bi-weekly progress reporting to the AI Steering Committee as required.</p>
            <p>e) Provide a signed CV and list of relevant publications for inclusion in the tender submission (TECH-2 and TECH-6).</p>
            <p>f) Support User Acceptance Testing (UAT) from a methodology perspective.</p>
            <p>g) Contribute to the final completion report, specifically the sections on forecasting methodology, limitations, and recommendations.</p>
          </div>

          <h3 className="text-sm font-bold pt-2" style={{ color: 'var(--color-text)' }}>3. Duration</h3>
          <p>
            This Agreement commences on the Effective Date and remains in effect for the full
            duration of the PoC program (six months from contract award), unless terminated earlier
            in accordance with Section 8. If the tender is not awarded to the Joint Team, this
            Agreement shall automatically terminate with no further obligations on either party.
          </p>
        </div>

        <div className="pt-3 mt-auto flex justify-between items-center text-xs border-t" style={{ color: 'var(--color-text-muted)', borderColor: 'var(--color-border)' }}>
          <span>Kinz for Information Technology &middot; Confidential</span>
          <span>Academic Partnership Agreement &middot; Page 1</span>
        </div>
      </div>
    </div>
  );
}

/* ── PAGE 2: COMPENSATION + IP + CONFIDENTIALITY ── */
export function DocAcademicAgreementP2() {
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
        <div className="text-[13px] leading-[1.7] space-y-4" style={{ color: 'var(--color-text)' }}>
          <h3 className="text-sm font-bold" style={{ color: 'var(--color-text)' }}>4. Compensation</h3>

          <p>
            4.1. The total agreed compensation for Party B&apos;s engagement under this Agreement is
            <strong> JOD 12,000 (Twelve Thousand Jordanian Dinars)</strong>, allocated as follows:
          </p>

          <div className="rounded-lg overflow-hidden border" style={{ borderColor: 'var(--color-border)' }}>
            <table className="w-full text-xs">
              <thead>
                <tr style={{ background: 'var(--color-light-bg)' }}>
                  <th className="text-left py-2 px-4 font-semibold" style={{ color: 'var(--color-text)' }}>Recipient</th>
                  <th className="text-right py-2 px-4 font-semibold" style={{ color: 'var(--color-text)' }}>Amount (JOD)</th>
                  <th className="text-left py-2 px-4 font-semibold" style={{ color: 'var(--color-text)' }}>Description</th>
                </tr>
              </thead>
              <tbody style={{ color: 'var(--color-text)' }}>
                <tr className="border-t" style={{ borderColor: 'var(--color-border)' }}>
                  <td className="py-2 px-4">Dr. Bushra Al Hijawi</td>
                  <td className="text-right py-2 px-4 font-semibold">10,000</td>
                  <td className="py-2 px-4" style={{ color: 'var(--color-text-muted)' }}>Professional fees for research advisory, methodology validation, and PoC support</td>
                </tr>
                <tr className="border-t" style={{ borderColor: 'var(--color-border)' }}>
                  <td className="py-2 px-4">Princess Sumaya University for Technology (PSUT)</td>
                  <td className="text-right py-2 px-4 font-semibold">2,000</td>
                  <td className="py-2 px-4" style={{ color: 'var(--color-text-muted)' }}>Institutional contribution for academic affiliation and research support</td>
                </tr>
                <tr className="border-t font-bold" style={{ borderColor: 'var(--color-border)', background: 'var(--color-light-bg)' }}>
                  <td className="py-2 px-4">Total</td>
                  <td className="text-right py-2 px-4">12,000</td>
                  <td className="py-2 px-4"></td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="rounded-lg p-4 border-l-4" style={{ borderColor: 'var(--color-kinz-red)', background: 'var(--color-light-bg)' }}>
            <p>
              4.2. <strong>Payment is contingent on receipt of funds by Party A.</strong> Party A shall
              make payment to Party B within thirty (30) calendar days of Party A receiving the
              corresponding payment from Japan Development Service Co., Ltd. (JDS), the Ministry of
              Digital Economy and Entrepreneurship (MoDEE), or any other disbursing entity under the
              JICA-funded contract. Party B acknowledges that Party A cannot make payment prior to
              receiving funds from the contracting authority, and that the timing of such receipt is
              outside Party A&apos;s control.
            </p>
          </div>

          <p>
            4.3. If partial payments are received by Party A from JDS based on milestone deliverables,
            Party B&apos;s compensation shall be disbursed proportionally in alignment with the milestones
            to which Party B contributed. The parties shall agree on the milestone allocation in writing
            within 14 days of contract award.
          </p>

          <p>
            4.4. All amounts are inclusive of any applicable taxes. Each party is responsible for their
            own tax obligations arising from payments received under this Agreement.
          </p>

          <p>
            4.5. If the tender is not awarded or the PoC contract is not signed for any reason, no
            compensation shall be due to either party for work performed during the proposal
            preparation phase.
          </p>

          <h3 className="text-sm font-bold pt-2" style={{ color: 'var(--color-text)' }}>5. Intellectual Property</h3>
          <p>
            5.1. In accordance with the PoC Terms of Reference, all intellectual property developed
            during the PoC (including datasets, scripts, source code, and deliverables) shall belong
            to the Ministry of Tourism and Antiquities (MoTA).
          </p>
          <p>
            5.2. Party B retains ownership of their pre-existing academic publications, research
            methodologies, and teaching materials. Nothing in this Agreement transfers ownership of
            Party B&apos;s pre-existing intellectual property to Party A or MoTA.
          </p>
          <p>
            5.3. Party B grants Party A the right to reference Party B&apos;s name, title, affiliation,
            and selected publications in the tender submission and any related project documentation.
          </p>
        </div>

        <div className="pt-3 mt-auto flex justify-between items-center text-xs border-t" style={{ color: 'var(--color-text-muted)', borderColor: 'var(--color-border)' }}>
          <span>Kinz for Information Technology &middot; Confidential</span>
          <span>Academic Partnership Agreement &middot; Page 2</span>
        </div>
      </div>
    </div>
  );
}

/* ── PAGE 3: REMAINING CLAUSES + SIGNATURES ── */
export function DocAcademicAgreementP3() {
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
        <div className="text-[13px] leading-[1.7] space-y-4" style={{ color: 'var(--color-text)' }}>
          <h3 className="text-sm font-bold" style={{ color: 'var(--color-text)' }}>6. Confidentiality</h3>
          <p>
            6.1. Both parties agree to maintain the confidentiality of all information shared during
            the proposal preparation and PoC implementation, including but not limited to: tender
            strategy, financial terms, methodology details, client data, and any proprietary
            information belonging to either party.
          </p>
          <p>
            6.2. This obligation of confidentiality shall survive the termination of this Agreement
            for a period of two (2) years.
          </p>

          <h3 className="text-sm font-bold pt-2" style={{ color: 'var(--color-text)' }}>7. Communication and Coordination</h3>
          <p>
            7.1. Party A (represented by Khaled M. Khalifeh) serves as the Unified Contact Point
            (Focal Point) for all external stakeholder communication, as required by the PoC
            Terms of Reference. Party B shall not communicate directly with MoTA, MoDEE, JICA,
            JDS, or the AI Steering Committee except through or with the prior approval of Party A.
          </p>
          <p>
            7.2. Internal coordination between the parties shall be conducted through regular
            communication channels agreed upon at project start.
          </p>

          <h3 className="text-sm font-bold pt-2" style={{ color: 'var(--color-text)' }}>8. Termination</h3>
          <p>
            8.1. Either party may terminate this Agreement with thirty (30) days written notice
            if the other party materially breaches any obligation and fails to remedy such breach
            within fifteen (15) days of receiving written notice of the breach.
          </p>
          <p>
            8.2. This Agreement shall automatically terminate if: (a) the tender is not awarded to
            the Joint Team; (b) the PoC contract is not signed; or (c) the PoC is formally
            terminated by JDS or JICA.
          </p>
          <p>
            8.3. Upon termination, Party B shall be compensated for work completed up to the date
            of termination, subject to the payment conditions in Section 4.2.
          </p>

          <h3 className="text-sm font-bold pt-2" style={{ color: 'var(--color-text)' }}>9. General Provisions</h3>
          <p>
            9.1. This Agreement constitutes the entire understanding between the parties regarding
            the subject matter herein and supersedes all prior discussions and agreements.
          </p>
          <p>
            9.2. Any amendments to this Agreement must be in writing and signed by both parties.
          </p>
          <p>
            9.3. This Agreement shall be governed by the laws of the Hashemite Kingdom of Jordan.
            Any disputes arising from this Agreement shall be resolved through good-faith negotiation.
            If unresolved within thirty (30) days, the dispute shall be referred to the competent
            courts of Amman, Jordan.
          </p>
        </div>

        {/* Signature block */}
        <div className="mt-auto pt-5 border-t" style={{ borderColor: 'var(--color-border)' }}>
          <div className="grid grid-cols-2 gap-8">
            <div>
              <p className="text-xs font-medium mb-1" style={{ color: 'var(--color-text-muted)' }}>Party A: Kinz for Information Technology</p>
              <div className="h-12 border-b mb-2" style={{ borderColor: 'var(--color-border)' }} />
              <p className="text-xs" style={{ color: 'var(--color-text)' }}>Khaled M. Khalifeh, CEO</p>
              <p className="text-xs mt-1" style={{ color: 'var(--color-text-muted)' }}>Date: _________________</p>
            </div>
            <div>
              <p className="text-xs font-medium mb-1" style={{ color: 'var(--color-text-muted)' }}>Party B: Academic AI Researcher</p>
              <div className="h-12 border-b mb-2" style={{ borderColor: 'var(--color-border)' }} />
              <p className="text-xs" style={{ color: 'var(--color-text)' }}>Dr. Bushra Al Hijawi</p>
              <p className="text-xs mt-1" style={{ color: 'var(--color-text-muted)' }}>Date: _________________</p>
            </div>
          </div>
        </div>

        <div className="pt-3 mt-4 flex justify-between items-center text-xs border-t" style={{ color: 'var(--color-text-muted)', borderColor: 'var(--color-border)' }}>
          <span>Kinz for Information Technology &middot; Confidential</span>
          <span>Academic Partnership Agreement &middot; Page 3</span>
        </div>
      </div>
    </div>
  );
}
