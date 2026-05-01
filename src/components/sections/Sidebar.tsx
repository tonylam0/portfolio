"use client"

const linkedinUrl = process.env.NEXT_PUBLIC_LINKEDIN_URL || ""
const githubUrl = process.env.NEXT_PUBLIC_GITHUB_URL || ""
const resumeUrl = process.env.NEXT_PUBLIC_RESUME_URL || ""

type Props = {
  onEmailClick: () => void
}

export function Sidebar({ onEmailClick }: Props) {
  return (
    <aside className="sticky top-16 flex flex-col gap-8 pr-12">
      <div className="flex flex-col gap-3">
        <h1 className="text-[18px] font-semibold lowercase tracking-[-0.022em] text-[#1e1a16]">
          tony lam
        </h1>
        <p className="text-[12px] leading-relaxed tracking-[-0.011em] text-[#6a6050]">
          charlottesville, virginia
        </p>
      </div>

      <nav className="flex flex-col gap-1.5">
        {linkedinUrl ? (
          <a className="nav-link" href={linkedinUrl} target="_blank" rel="noreferrer">
            linkedin
          </a>
        ) : null}
        {githubUrl ? (
          <a className="nav-link" href={githubUrl} target="_blank" rel="noreferrer">
            github
          </a>
        ) : null}
        {resumeUrl ? (
          <a className="nav-link" href={resumeUrl} target="_blank" rel="noreferrer">
            resume
          </a>
        ) : null}
        <button type="button" className="nav-link" onClick={onEmailClick}>
          email
        </button>
      </nav>
    </aside>
  )
}
