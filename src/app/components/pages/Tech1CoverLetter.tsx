import kinzIcon from '@assets/KinzIcon.png';
import sigKhaled from '@assets/signatures/sig-khaled.png';

export function Tech1CoverLetter() {
  return (
    <div className="w-[794px] h-[1123px] flex flex-col">
      {/* Kinz accent stripe */}
      <div className="flex h-1.5 flex-shrink-0">
        <div className="flex-1" style={{ background: 'var(--color-kinz-red)' }} />
        <div className="flex-1" style={{ background: 'var(--color-kinz-orange)' }} />
        <div className="flex-1" style={{ background: 'var(--color-kinz-yellow)' }} />
        <div className="flex-1" style={{ background: 'var(--color-kinz-green)' }} />
        <div className="flex-1" style={{ background: 'var(--color-kinz-blue)' }} />
        <div className="flex-1" style={{ background: 'var(--color-kinz-navy)' }} />
      </div>

      <div className="flex-1 px-12 pt-10 pb-6 flex flex-col">
        {/* Header with logo and date */}
        <div className="flex items-start justify-between mb-8">
          <img src={kinzIcon} alt="Kinz" className="w-10 h-10" />
          <p className="text-[13px]" style={{ color: 'var(--color-text-muted)' }}>Amman, Jordan — April 19, 2026</p>
        </div>

        {/* Addressee */}
        <div className="mb-6 text-[13px]" style={{ color: 'var(--color-text)' }}>
          <p className="font-semibold">To:</p>
          <p>Japan Development Service Co., Ltd. (JDS)</p>
        </div>

        {/* Salutation */}
        <p className="text-[13px] mb-4" style={{ color: 'var(--color-text)' }}>Dear Sirs:</p>

        {/* Body — follows RFP template verbatim */}
        <div className="text-[13px] leading-relaxed space-y-3 flex-1" style={{ color: 'var(--color-text)' }}>
          <p>
            We, the undersigned, offer to provide the services for Proof of Concept (PoC) Program 5:
            AI-Enabled Geo-Analytics (AI-GIS) Baseline for Tourism Demand, Infrastructure Optimization,
            and Investment Prioritization in Jordan in accordance with your Request for Proposal dated
            March 25, 2026 and our Proposal. We are hereby submitting our Technical Proposal.
          </p>

          <p>
            Our Joint Team consists of <strong>Kinz for Information Technology</strong> (Private IT Company)
            and <strong>Dr. Bushra Al Hijawi, Princess Sumaya University for Technology</strong> (Academic AI Researcher).
          </p>

          <p>We hereby declare that:</p>

          <div className="pl-6 space-y-2">
            <p>
              (a) All the information and statements made in this Proposal are true and we accept
              that any misinterpretation or misrepresentation contained in this Proposal may lead
              to our disqualification by JDS.
            </p>
            <p>
              (b) Our Proposal shall be valid and remain binding upon us for the period of time
              specified in the Instructions to Applicants (ITC).
            </p>
            <p>
              (c) Our Proposal is binding upon us and subject to any modifications resulting from
              the Contract negotiations.
            </p>
          </div>

          <p>
            We undertake, if our Proposal is accepted and the Contract is signed, to initiate the
            Services related to the assignment no later than the expected date for the commencement
            of the Services indicated in the Summary Sheet of the Instruction to Applicants.
          </p>

          <p>We understand that you are not bound to accept any Proposal that you receive.</p>

          <p>We remain,<br />Yours sincerely,</p>
        </div>

        {/* Signature block */}
        <div className="mt-6 space-y-4 text-[13px]" style={{ color: 'var(--color-text)' }}>
          <div className="grid grid-cols-2 gap-x-8 gap-y-3">
            <div>
              <p className="text-xs font-medium mb-1" style={{ color: 'var(--color-text-muted)' }}>Authorized Signature:</p>
              <img src={sigKhaled} alt="" className="h-10 object-contain object-left" />
              <div className="border-b" style={{ borderColor: 'var(--color-border)' }} />
            </div>
            <div>
              <p className="text-xs font-medium mb-1" style={{ color: 'var(--color-text-muted)' }}>Name and Title:</p>
              <p className="font-semibold">Khaled M. Khalifeh, CEO</p>
            </div>
            <div>
              <p className="text-xs font-medium mb-1" style={{ color: 'var(--color-text-muted)' }}>Name of Firm:</p>
              <p>Kinz for Information Technology</p>
            </div>
            <div>
              <p className="text-xs font-medium mb-1" style={{ color: 'var(--color-text-muted)' }}>Contact:</p>
              <p>+962795200001 | kkhalifeh@kinz.jo</p>
            </div>
            <div className="col-span-2">
              <p className="text-xs font-medium mb-1" style={{ color: 'var(--color-text-muted)' }}>Address:</p>
              <p>Arabia Group Complex, 260 Arrar Street, Amman, 11194, Jordan</p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="pt-4 mt-4 flex justify-between items-center text-xs border-t" style={{ color: 'var(--color-text-muted)', borderColor: 'var(--color-border)' }}>
          <span>Kinz for Information Technology &middot; www.kinz.jo</span>
          <span>TECH-1 &middot; Page 1</span>
        </div>
      </div>
    </div>
  );
}
