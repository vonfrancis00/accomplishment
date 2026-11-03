import {
  ArrowRight,
  BarChart3,
  CheckCircle2,
  ClipboardCheck,
  FileText,
  ShieldCheck,
  Sparkles,
  Star,
  Users,
  Zap,
} from 'lucide-react'

const logo = `${import.meta.env.BASE_URL}ocdra.png`

function scrollToSection(event) {
  event.preventDefault()
  const target = document.getElementById(event.currentTarget.hash.slice(1))
  target?.scrollIntoView({
    behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches
      ? 'instant'
      : 'smooth',
  })
}

function Brand() {
  return (
    <a
      className="landing-brand flex items-center [gap:15px] [font-size:27px] [font-weight:750] [--tw-tracking:-1.2px] [letter-spacing:-1.2px] whitespace-nowrap [color:var(--color-white,_#fff)] [&_small]:[margin-top:2px] [&_small]:block [&_small]:[font-size:10px] [&_small]:[font-weight:500] [&_small]:[--tw-tracking:3px] [&_small]:[letter-spacing:3px] [&_small]:[color:#a1dcff] [&_small]:text-center max-[1200.02px]:[font-size:22px] max-[540.02px]:[gap:9px] max-[540.02px]:[font-size:19px] max-[540.02px]:[&_small]:[font-size:7px] max-[540.02px]:[&_small]:[--tw-tracking:2px] max-[540.02px]:[&_small]:[letter-spacing:2px]"
      href="#home"
      onClick={scrollToSection}
    >
      <span className="landing-brand-icon grid [height:55px] [width:54px] [place-items:center] [border-radius:15px] [color:#cce9ff] [box-shadow:none] [background:transparent] [border-top:0] [border-right:0] [border-bottom:0] [border-left:0] shrink-0 max-[540.02px]:[height:44px] max-[540.02px]:[width:41px] max-[540.02px]:[border-radius:12px] [&_img]:h-full [&_img]:w-full [&_img]:[object-fit:contain] [&_img]:[filter:none]">
        <img src={`${import.meta.env.BASE_URL}ched.png`} alt="CHED logo" />
      </span>
      <span>
        OCDRA{' '}
        <span className="landing-brand-light [font-weight:300] [color:#91d5ff]">
          OFFICE
        </span>
        <small>WORKSPACE</small>
      </span>
    </a>
  )
}

function WorkspacePreview() {
  return (
    <div
      className="landing-previews [pointer-events:none] absolute [top:40px] [right:-30px] [bottom:-40px] [left:43%] [perspective:1200px] min-[1500px]:[right:-10px] min-[1500px]:[left:43%] max-[1200.02px]:[right:-120px] max-[1200.02px]:[left:48%] max-[1200.02px]:[transform-origin:left_center] max-[1200.02px]:[transform:scale(.9)] max-[900.02px]:[top:370px] max-[900.02px]:[right:0] max-[900.02px]:[bottom:auto] max-[900.02px]:[left:16%] max-[900.02px]:[height:350px] max-[900.02px]:[transform-origin:left_top] max-[900.02px]:[transform:scale(.8)] max-[540.02px]:[top:403px] max-[540.02px]:[left:2%] max-[540.02px]:[width:660px] max-[540.02px]:[transform:scale(.55)] [@media_screen_and_(prefers-reduced-motion:no-preference)]:[animation:landing-reveal_900ms_180ms_cubic-bezier(.22,1,.36,1)_backwards]"
      aria-hidden="true"
    >
      <div className="preview-window absolute [height:375px] [width:440px] overflow-hidden [border-radius:19px] [color:#0b2b50] [box-shadow:0_0_0_1px_#6da4c6,0_22px_40px_#0006] [background:#f0f6fd] [border-top:6px_solid_#062b4d] [border-right:6px_solid_#062b4d] [border-bottom:6px_solid_#062b4d] [border-left:6px_solid_#062b4d] min-[1500px]:[height:390px] min-[1500px]:[width:470px] report-window [top:0] [left:0] [transform-origin:right_center] [transform:rotate(4deg)_rotateY(13deg)] [@media_screen_and_(prefers-reduced-motion:no-preference)]:[animation:landing-float_7s_1s_ease-in-out_infinite]">
        <div className="preview-top flex [height:43px] items-center [gap:6px] [padding-top:12px] [padding-right:12px] [padding-bottom:12px] [padding-left:12px] [font-size:10px] [color:var(--color-white,_#fff)] [background:#03213f] [&_>_b_>_span]:[font-weight:300] [&_>_small]:[margin-left:auto] [&_>_small]:[font-size:6px] [&_>_img]:[height:20px] [&_>_img]:[width:20px] [&_>_img]:shrink-0 [&_>_img]:[object-fit:contain]">
          <img src={`${import.meta.env.BASE_URL}ched.png`} alt="" />
          <b>
            OCDRA <span>Office</span>
          </b>
          <small>WORKSPACE</small>
        </div>
        <div className="preview-body [padding-top:13px] [padding-right:13px] [padding-bottom:13px] [padding-left:13px]">
          <div className="preview-caption [margin-bottom:10px] [font-size:6px] [--tw-tracking:1px] [letter-spacing:1px] [color:#5382b2]">
            CREATE YOUR REPORT
          </div>
          <div className="preview-steps flex items-center [gap:22px] [padding-top:12px] [padding-right:8px] [padding-bottom:12px] [padding-left:8px] [font-size:7px] [color:#6185aa] [border-bottom:2px_solid_#338ff1] [&_>_span:first-child]:flex [&_>_span:first-child]:items-center [&_>_span:first-child]:[gap:5px] [&_>_span:first-child]:[color:#093a76]">
            <span>
              <FileText size={15} /> Report Details
            </span>
            <span>Accomplishments</span>
            <span>Signatures</span>
          </div>
          <div className="preview-section [padding-top:17px] [padding-right:0] [padding-bottom:17px] [padding-left:0] [font-size:9px]">
            01 &nbsp; Report Builder
          </div>
          <div className="preview-form relative [border-radius:9px] [padding-top:17px] [padding-right:17px] [padding-bottom:17px] [padding-left:17px] [background:white] [border-top:1px_solid_#e1eaf5] [border-right:1px_solid_#e1eaf5] [border-bottom:1px_solid_#e1eaf5] [border-left:1px_solid_#e1eaf5] [&_>_svg]:[float:left] [&_>_svg]:[margin-right:12px] [&_>_svg]:[padding-top:4px] [&_>_svg]:[padding-right:4px] [&_>_svg]:[padding-bottom:4px] [&_>_svg]:[padding-left:4px] [&_>_svg]:[color:#1761a6] [&_>_svg]:[background:#ebf5ff] [&_h3]:[margin-top:0px] [&_h3]:[margin-right:0px] [&_h3]:[margin-bottom:0px] [&_h3]:[margin-left:0px] [&_h3]:[font-size:13px] [&_h3]:[font-weight:700] [&_p]:[margin-top:5px] [&_p]:[margin-right:0] [&_p]:[margin-bottom:16px] [&_p]:[margin-left:0] [&_p]:[font-size:8px] [&_p]:[color:#6686ae]">
            <FileText size={24} />
            <h3>Make it yours.</h3>
            <p>Add your employee details and choose the reporting period.</p>
            <div className="preview-fields grid [grid-template-columns:1fr_1fr] [gap:12px] [&_label]:[margin-bottom:5px] [&_label]:block [&_label]:[font-size:7px] [&_span]:block [&_span]:[border-radius:4px] [&_span]:[padding-top:8px] [&_span]:[padding-right:5px] [&_span]:[padding-bottom:8px] [&_span]:[padding-left:5px] [&_span]:[font-size:7px] [&_span]:whitespace-nowrap [&_span]:[background:#f8fbff] [&_span]:[border-top:1px_solid_#dbe7f4] [&_span]:[border-right:1px_solid_#dbe7f4] [&_span]:[border-bottom:1px_solid_#dbe7f4] [&_span]:[border-left:1px_solid_#dbe7f4]">
              {[
                ['Name', 'La Victoria, Von Francis A.'],
                ['Position', 'Project Technical Staff II'],
                ['Office / Division', 'Office of the Commissioner Apag III'],
                ['Reporting Period', '10/16/2026 — 10/31/2026'],
              ].map(([label, value]) => (
                <div key={label}>
                  <label>{label}</label>
                  <span>{value}</span>
                </div>
              ))}
            </div>
            <div className="preview-checkbox [margin-top:16px] [font-size:7px]">
              ☑ &nbsp; Include weekends in the final report
            </div>
          </div>
        </div>
      </div>
      <div className="preview-window absolute [height:375px] [width:440px] overflow-hidden [border-radius:19px] [color:#0b2b50] [box-shadow:0_0_0_1px_#6da4c6,0_22px_40px_#0006] [background:#f0f6fd] [border-top:6px_solid_#062b4d] [border-right:6px_solid_#062b4d] [border-bottom:6px_solid_#062b4d] [border-left:6px_solid_#062b4d] min-[1500px]:[height:390px] min-[1500px]:[width:470px] ipcr-window [top:36px] [right:0] [height:370px] [width:390px] [transform:rotate(-4deg)_rotateY(-12deg)] min-[1500px]:[width:395px] [@media_screen_and_(prefers-reduced-motion:no-preference)]:[animation:landing-float_8s_600ms_ease-in-out_infinite_reverse]">
        <div className="preview-top flex [height:43px] items-center [gap:6px] [padding-top:12px] [padding-right:12px] [padding-bottom:12px] [padding-left:12px] [font-size:10px] [color:var(--color-white,_#fff)] [background:#03213f] [&_>_b_>_span]:[font-weight:300] [&_>_small]:[margin-left:auto] [&_>_small]:[font-size:6px] [&_>_img]:[height:20px] [&_>_img]:[width:20px] [&_>_img]:shrink-0 [&_>_img]:[object-fit:contain]">
          <img src={`${import.meta.env.BASE_URL}ched.png`} alt="" />
          <b>
            OCDRA <span>Office</span>
          </b>
          <small>IPCR</small>
        </div>
        <div className="preview-body [padding-top:13px] [padding-right:13px] [padding-bottom:13px] [padding-left:13px]">
          <div className="preview-banner relative [border-radius:9px] [padding-top:17px] [padding-right:17px] [padding-bottom:17px] [padding-left:17px] [color:var(--color-white,_#fff)] [background:linear-gradient(130deg,#063658,#031b3c)] [&_small]:[font-size:6px] [&_small]:[color:#30dbff] [&_h3]:[margin-top:7px] [&_h3]:[margin-right:0] [&_h3]:[margin-bottom:7px] [&_h3]:[margin-left:0] [&_h3]:[font-size:17px] [&_h3]:[--tw-leading:1.15] [&_h3]:[line-height:1.15] [&_h3]:[font-weight:700] [&_p]:[font-size:7px] [&_p]:[color:#a6c5df] [&_>_span]:absolute [&_>_span]:[top:39px] [&_>_span]:[right:12px] [&_>_span]:[border-radius:5px] [&_>_span]:[padding-top:10px] [&_>_span]:[padding-right:10px] [&_>_span]:[padding-bottom:10px] [&_>_span]:[padding-left:10px] [&_>_span]:[font-size:7px] [&_>_span]:[color:#034365] [&_>_span]:[background:#2bdcf4]">
            <small>↗ PERFORMANCE WORKSPACE</small>
            <h3>
              Your performance.
              <br />A clearer perspective.
            </h3>
            <p>Set targets, track achievements, and grow.</p>
            <span>◎ Preview IPCR</span>
          </div>
          <div className="preview-metrics [margin-top:11px] flex [gap:8px] [&_>_div]:[flex:1] [&_>_div]:[border-radius:8px] [&_>_div]:[padding-top:12px] [&_>_div]:[padding-right:9px] [&_>_div]:[padding-bottom:12px] [&_>_div]:[padding-left:9px] [&_>_div]:[background:white] [&_>_div]:[border-top:1px_solid_#deebf6] [&_>_div]:[border-right:1px_solid_#deebf6] [&_>_div]:[border-bottom:1px_solid_#deebf6] [&_>_div]:[border-left:1px_solid_#deebf6] [&_small]:block [&_small]:[font-size:6px] [&_strong]:[margin-top:9px] [&_strong]:[margin-right:0] [&_strong]:[margin-bottom:5px] [&_strong]:[margin-left:0] [&_strong]:block [&_strong]:[font-size:23px] [&_em]:[font-size:8px] [&_em]:[font-weight:400] [&_em]:[color:#6886a7] [&_em]:[font-style:normal] [&_i]:[margin-bottom:8px] [&_i]:block [&_i]:[height:3px] [&_i]:[border-radius:3px] [&_i]:[background:#12b6de]">
            {[
              ['Form Completion', '81', '%'],
              ['Weight Allocation', '100', '/100%'],
              ['Weighted Rating', '4.33', '/5.00'],
            ].map(([label, value, unit]) => (
              <div key={label}>
                <small>{label}</small>
                <strong>
                  {value}
                  <em>{unit}</em>
                </strong>
                <i />
                <small>Very Satisfactory</small>
              </div>
            ))}
          </div>
          <div className="preview-bottom [margin-top:14px] flex [gap:8px] [&_span]:[flex:1] [&_span]:[border-radius:8px] [&_span]:[padding-top:15px] [&_span]:[padding-right:6px] [&_span]:[padding-bottom:15px] [&_span]:[padding-left:6px] [&_span]:[font-size:8px] [&_span]:[background:#fff9]">
            <span>♙ Employee Details</span>
            <span>✓ Outputs & Targets</span>
            <span>♧ Review & Approval</span>
          </div>
        </div>
      </div>
      <div className="preview-window absolute [height:375px] [width:440px] overflow-hidden [border-radius:19px] [color:#0b2b50] [box-shadow:0_0_0_1px_#6da4c6,0_22px_40px_#0006] [background:#f0f6fd] [border-top:6px_solid_#062b4d] [border-right:6px_solid_#062b4d] [border-bottom:6px_solid_#062b4d] [border-left:6px_solid_#062b4d] min-[1500px]:[height:390px] min-[1500px]:[width:470px] disbursement-window [top:265px] [left:100px] [z-index:2] [height:225px] [width:380px] [transform:rotate(-2deg)] [&_.preview-body]:[padding-top:12px] [&_.preview-body]:[padding-right:16px] [&_.preview-body]:[padding-bottom:12px] [&_.preview-body]:[padding-left:16px] [&_.preview-caption]:[margin-bottom:8px] [&_.preview-fields]:[gap:8px_12px] [&_.preview-fields_span]:[padding-top:6px] [&_.preview-fields_span]:[padding-right:6px] [&_.preview-fields_span]:[padding-bottom:6px] [&_.preview-fields_span]:[padding-left:6px] [&_.preview-fields_span]:[background:white]">
        <div className="preview-top flex [height:43px] items-center [gap:6px] [padding-top:12px] [padding-right:12px] [padding-bottom:12px] [padding-left:12px] [font-size:10px] [color:var(--color-white,_#fff)] [background:#03213f] [&_>_b_>_span]:[font-weight:300] [&_>_small]:[margin-left:auto] [&_>_small]:[font-size:6px] [&_>_img]:[height:20px] [&_>_img]:[width:20px] [&_>_img]:shrink-0 [&_>_img]:[object-fit:contain]">
          <img src={`${import.meta.env.BASE_URL}ched.png`} alt="" />
          <b>
            OCDRA <span>Office</span>
          </b>
          <small>DISBURSEMENT</small>
        </div>
        <div className="preview-body [padding-top:13px] [padding-right:13px] [padding-bottom:13px] [padding-left:13px]">
          <div className="preview-caption [margin-bottom:10px] [font-size:6px] [--tw-tracking:1px] [letter-spacing:1px] [color:#5382b2]">
            PREPARE YOUR PAYMENT
          </div>
          <div className="voucher-preview-heading [margin-bottom:12px] flex items-center [gap:9px] [color:#116798] [&_h3]:[margin-top:0px] [&_h3]:[margin-right:0px] [&_h3]:[margin-bottom:0px] [&_h3]:[margin-left:0px] [&_h3]:[font-size:13px] [&_p]:[margin-top:3px] [&_p]:[margin-right:0] [&_p]:[margin-bottom:0] [&_p]:[margin-left:0] [&_p]:[font-size:7px] [&_p]:[color:#6686ae] [&_>_span]:[margin-left:auto] [&_>_span]:[border-radius:6px] [&_>_span]:[padding-top:6px] [&_>_span]:[padding-right:9px] [&_>_span]:[padding-bottom:6px] [&_>_span]:[padding-left:9px] [&_>_span]:[font-size:10px] [&_>_span]:[font-weight:700] [&_>_span]:[color:#17705b] [&_>_span]:[background:#d8f3ed]">
            <FileText size={19} />
            <div>
              <h3>Disbursement Voucher</h3>
              <p>Appendix 32 ? Payment documentation</p>
            </div>
            <span>DV</span>
          </div>
          <div className="preview-fields grid [grid-template-columns:1fr_1fr] [gap:12px] [&_label]:[margin-bottom:5px] [&_label]:block [&_label]:[font-size:7px] [&_span]:block [&_span]:[border-radius:4px] [&_span]:[padding-top:8px] [&_span]:[padding-right:5px] [&_span]:[padding-bottom:8px] [&_span]:[padding-left:5px] [&_span]:[font-size:7px] [&_span]:whitespace-nowrap [&_span]:[background:#f8fbff] [&_span]:[border-top:1px_solid_#dbe7f4] [&_span]:[border-right:1px_solid_#dbe7f4] [&_span]:[border-bottom:1px_solid_#dbe7f4] [&_span]:[border-left:1px_solid_#dbe7f4]">
            {[
              ['Payee', 'Employee / Supplier'],
              ['Payment Method', 'Bank transfer'],
              ['Particulars', 'Payment details'],
              ['Amount', '? 12,500.00'],
            ].map(([label, value]) => (
              <div key={label}>
                <label>{label}</label>
                <span>{value}</span>
              </div>
            ))}
          </div>
          <div className="voucher-preview-footer [margin-top:12px] flex justify-between [gap:8px] [font-size:7px] [color:#17705b]">
            <span>? Accounting entries</span>
            <span>? Approval details</span>
            <span>PDF preview ?</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function LandingPage({ onNavigate }) {
  const open = page => {
    onNavigate(page)
    window.scrollTo({ top: 0, behavior: 'instant' })
  }
  return (
    <div
      className="landing [--ink:#062449] [--cyan:#29d5f3] [min-height:100vh] [font-family:'Segoe_UI',Arial,sans-serif] [color:var(--ink)] [background:radial-gradient(ellipse_at_50%_70%,#fff,#f0f6ff)] [&_a]:[text-decoration-line:none] [&_h1]:[margin-top:13px] [&_h1]:[margin-right:0] [&_h1]:[margin-bottom:14px] [&_h1]:[margin-left:0] [&_h1]:[font-size:54px] [&_h1]:[--tw-leading:.98] [&_h1]:[line-height:.98] [&_h1]:[font-weight:750] [&_h1]:[--tw-tracking:-1.6px] [&_h1]:[letter-spacing:-1.6px] [&_h1_span]:[color:var(--cyan)] [&_a:hover]:[filter:brightness(1.12)] max-[1200.02px]:[&_h1]:[font-size:49px] max-[900.02px]:[&_h1]:[font-size:50px] max-[540.02px]:[&_h1]:[margin-top:18px] max-[540.02px]:[&_h1]:[font-size:47px] print:hidden"
      id="home"
    >
      <header className="landing-header [color:var(--color-white,_#fff)] [background:linear-gradient(110deg,#031b35,#05294e)] [border-bottom:1px_solid_#17496c] [&_nav]:flex [&_nav]:overflow-hidden [&_nav]:[border-radius:18px] [&_nav]:[padding-top:0px] [&_nav]:[padding-right:0px] [&_nav]:[padding-bottom:0px] [&_nav]:[padding-left:0px] [&_nav]:[border-top:1px_solid_#0b3c65] [&_nav]:[border-right:1px_solid_#0b3c65] [&_nav]:[border-bottom:1px_solid_#0b3c65] [&_nav]:[border-left:1px_solid_#0b3c65] [&_nav_a]:[padding-top:10px] [&_nav_a]:[padding-right:24px] [&_nav_a]:[padding-bottom:10px] [&_nav_a]:[padding-left:24px] [&_nav_a]:[font-size:14px] [&_nav_a]:[color:#e1edfa] [&_nav_a.selected]:[border-radius:16px] [&_nav_a.selected]:[font-weight:600] [&_nav_a.selected]:[color:var(--color-white,_#fff)] [&_nav_a.selected]:[background:linear-gradient(135deg,#0875c4,#125991)] [&_img]:[width:175px] [&_img]:[filter:brightness(0)_invert(1)] max-[1200.02px]:[&_nav_a]:[padding-top:10px] max-[1200.02px]:[&_nav_a]:[padding-right:15px] max-[1200.02px]:[&_nav_a]:[padding-bottom:10px] max-[1200.02px]:[&_nav_a]:[padding-left:15px] max-[1200.02px]:[&_img]:[width:140px] max-[900.02px]:[&_nav]:[order:3] max-[900.02px]:[&_nav]:w-full max-[900.02px]:[&_nav]:justify-center max-[900.02px]:[&_nav_a]:[flex:1] max-[900.02px]:[&_nav_a]:text-center max-[540.02px]:[&_img]:[width:85px] max-[540.02px]:[&_nav_a]:[padding-top:8px] max-[540.02px]:[&_nav_a]:[padding-right:10px] max-[540.02px]:[&_nav_a]:[padding-bottom:8px] max-[540.02px]:[&_nav_a]:[padding-left:10px] max-[540.02px]:[&_nav_a]:[font-size:12px]">
        <div className="landing-container [margin-top:auto] [margin-right:auto] [margin-bottom:auto] [margin-left:auto] [width:min(1330px,_calc(100%_-_96px))] max-[1200.02px]:[width:calc(100%_-_56px)] max-[540.02px]:[width:calc(100%_-_36px)] landing-header-inner flex [height:81px] items-center justify-between [gap:30px] max-[900.02px]:[height:auto] max-[900.02px]:flex-wrap max-[900.02px]:[gap:16px] max-[900.02px]:[padding-top:15px] max-[900.02px]:[padding-right:0] max-[900.02px]:[padding-bottom:15px] max-[900.02px]:[padding-left:0]">
          <Brand />
          <img src={logo} alt="Office of Commissioner Desiderio R. Apag III" />
        </div>
      </header>
      <main>
        <section className="landing-hero relative overflow-hidden [color:var(--color-white,_#fff)] [background:radial-gradient(ellipse_at_77%_10%,#1d6399_0,transparent_53%),linear-gradient(110deg,#031b36_20%,#07315a_70%,#08436a)] [&:before]:absolute [&:before]:[top:100px] [&:before]:[left:-640px] [&:before]:[height:730px] [&:before]:[width:730px] [&:before]:[border-radius:46%] [&:before]:[box-shadow:0_0_0_75px_#12659312,0_0_0_160px_#1265930a] [&:before]:[content:''] [&:before]:[border-top:1px_solid_#277aac44] [&:before]:[border-right:1px_solid_#277aac44] [&:before]:[border-bottom:1px_solid_#277aac44] [&:before]:[border-left:1px_solid_#277aac44]">
          <div className="landing-container [margin-top:auto] [margin-right:auto] [margin-bottom:auto] [margin-left:auto] [width:min(1330px,_calc(100%_-_96px))] max-[1200.02px]:[width:calc(100%_-_56px)] max-[540.02px]:[width:calc(100%_-_36px)] landing-hero-inner relative flex [min-height:550px] items-center min-[1500px]:[min-height:463px] max-[900.02px]:[min-height:850px] max-[900.02px]:items-start max-[540.02px]:[min-height:720px]">
            <div className="landing-hero-copy relative [z-index:2] [width:48%] [padding-top:31px] [padding-right:0] [padding-bottom:45px] [padding-left:0] [&_>_p]:[margin-top:0px] [&_>_p]:[margin-right:0px] [&_>_p]:[margin-bottom:0px] [&_>_p]:[margin-left:0px] [&_>_p]:[max-width:540px] [&_>_p]:[font-size:18px] [&_>_p]:[--tw-leading:1.5] [&_>_p]:[line-height:1.5] [&_>_p]:[color:#d1e3f6] min-[1500px]:[padding-top:31px] max-[1200.02px]:[width:53%] max-[1200.02px]:[&_>_p]:[font-size:16px] max-[900.02px]:w-full max-[900.02px]:[padding-top:30px] max-[900.02px]:[padding-right:0] max-[900.02px]:[padding-bottom:30px] max-[900.02px]:[padding-left:0] max-[540.02px]:[&_>_p]:[font-size:15px] [@media_screen_and_(prefers-reduced-motion:no-preference)]:[&_>_*]:[animation:landing-reveal_650ms_cubic-bezier(.22,1,.36,1)_backwards] [@media_screen_and_(prefers-reduced-motion:no-preference)]:[&_h1]:[animation-delay:80ms] [@media_screen_and_(prefers-reduced-motion:no-preference)]:[&_>_p]:[animation-delay:160ms]">
              <div className="landing-eyebrow inline-flex items-center [gap:10px] [border-radius:25px] [padding-top:9px] [padding-right:14px] [padding-bottom:9px] [padding-left:14px] [font-size:11px] [font-weight:700] [--tw-tracking:1.5px] [letter-spacing:1.5px] [color:#2ee9ff] [background:#08476c99] [&_svg]:[color:#ffd143] max-[540.02px]:[font-size:9px] max-[540.02px]:[--tw-tracking:1px] max-[540.02px]:[letter-spacing:1px]">
                <Sparkles size={17} /> YOUR OFFICE PRODUCTIVITY SUITE
              </div>
              <h1>
                Your work.
                <br />
                Your progress.
                <br />
                <span>Your impact.</span>
              </h1>
              <p>
                A centralized workspace for accomplishment reports,
                <br className="desktop-break max-[540.02px]:hidden" />{' '}
                performance commitments, and disbursement vouchers.
              </p>
              <div className="landing-actions [margin-top:22px] flex [gap:14px] max-[540.02px]:[gap:10px] [@media_screen_and_(prefers-reduced-motion:no-preference)]:[animation-delay:240ms]">
                <a
                  className="landing-primary flex [min-height:56px] items-center justify-center [gap:16px] [border-radius:32px] [padding-top:16px] [padding-right:31px] [padding-bottom:16px] [padding-left:31px] [font-size:14px] [font-weight:650] [color:#002141] [box-shadow:0_6px_22px_#00b6f012] [background:linear-gradient(130deg,#3de0f6,#25cdeb)] max-[540.02px]:[min-height:49px] max-[540.02px]:[gap:10px] max-[540.02px]:[padding-top:13px] max-[540.02px]:[padding-right:23px] max-[540.02px]:[padding-bottom:13px] max-[540.02px]:[padding-left:23px] max-[540.02px]:[font-size:13px] [@media_screen_and_(prefers-reduced-motion:no-preference)]:[transition:transform_220ms_ease,_box-shadow_220ms_ease] [@media_screen_and_(hover:hover)_and_(prefers-reduced-motion:no-preference)]:[&:hover]:[transform:translateY(-3px)] [@media_screen_and_(hover:hover)_and_(prefers-reduced-motion:no-preference)]:[&:hover]:[box-shadow:0_10px_28px_#00b6f035]"
                  href="#workspaces"
                  onClick={scrollToSection}
                >
                  Get Started <ArrowRight size={22} />
                </a>
              </div>
              <div className="landing-benefits [margin-top:27px] flex [gap:30px] [font-size:12px] whitespace-nowrap [color:#dfecf8] [&_>_span]:flex [&_>_span]:items-center [&_>_span]:[gap:9px] [&_svg]:[color:#2ce7ff] max-[1200.02px]:[gap:14px] max-[1200.02px]:[font-size:10px] max-[900.02px]:[font-size:12px] max-[540.02px]:[margin-top:20px] max-[540.02px]:flex-wrap max-[540.02px]:[gap:11px] max-[540.02px]:[font-size:10px] max-[540.02px]:[&_svg]:[width:16px] max-[540.02px]:[&_>_span]:[gap:5px] [@media_screen_and_(prefers-reduced-motion:no-preference)]:[animation-delay:320ms]">
                {[
                  'Organized Workflows',
                  'Professional Documents',
                  'Built for Productivity',
                ].map(text => (
                  <span key={text}>
                    <CheckCircle2 size={21} />
                    {text}
                  </span>
                ))}
              </div>
            </div>
            <WorkspacePreview />
          </div>
        </section>
        <section
          className="landing-workspaces [scroll-margin-top:20px] [padding-top:24px] landing-container [margin-top:auto] [margin-right:auto] [margin-bottom:auto] [margin-left:auto] [width:min(1330px,_calc(100%_-_96px))] max-[1200.02px]:[width:calc(100%_-_56px)] max-[540.02px]:[width:calc(100%_-_36px)]"
          id="workspaces"
        >
          <div className="landing-section-label [margin-bottom:17px] flex items-center justify-between [font-size:13px] [color:#6688ae] [&_h2]:flex [&_h2]:items-center [&_h2]:[gap:26px] [&_h2]:[font-size:13px] [&_h2]:[font-weight:600] [&_h2]:[--tw-tracking:1.2px] [&_h2]:[letter-spacing:1.2px] [&_h2:after]:[height:1px] [&_h2:after]:[width:21px] [&_h2:after]:[content:''] [&_h2:after]:[background:#a9c5e1] [&_>_span:before]:[margin-right:12px] [&_>_span:before]:[color:#95b6d6] [&_>_span:before]:[content:'—'] max-[540.02px]:[&_>_span]:hidden max-[540.02px]:[&_h2]:[font-size:11px]">
            <h2>CHOOSE YOUR WORKSPACE</h2>
            <span>Select a workspace to get started.</span>
          </div>
          <div className="landing-workspace-grid grid [grid-template-columns:1fr_1fr] [gap:28px] max-[900.02px]:[grid-template-columns:1fr] max-[900.02px]:[gap:18px] min-[901px]:[grid-template-columns:repeat(3,minmax(0,1fr))] min-[901px]:[gap:20px]">
            {[
              {
                number: '01',
                title: (
                  <>
                    Accomplishment
                    <br />
                    Report Maker
                  </>
                ),
                description:
                  'Create, format, preview, and export accomplishment reports as PDFs.',
                Icon: FileText,
                page: 'accomplishment',
                items: [
                  [FileText, 'Report Builder'],
                  [FileText, 'PDF Preview'],
                  [ClipboardCheck, 'Export-ready layouts'],
                ],
              },
              {
                number: '02',
                title: (
                  <>
                    IPCR Performance
                    <br />
                    Workspace
                  </>
                ),
                description:
                  'Set targets, monitor accomplishments, and review performance ratings.',
                Icon: BarChart3,
                page: 'ipcr',
                items: [
                  [BarChart3, 'Targets and Outputs'],
                  [Star, 'Performance Ratings'],
                  [ClipboardCheck, 'Review and Approval'],
                ],
              },
              {
                number: '03',
                title: (
                  <>
                    Disbursement
                    <br />
                    Voucher
                  </>
                ),
                description:
                  'Prepare Payment Details, accounting entries, and an Appendix 32 disbursement voucher.',
                Icon: FileText,
                page: 'disbursement',
                items: [
                  [FileText, 'Voucher Builder'],
                  [FileText, 'PDF Preview'],
                  [ClipboardCheck, 'Payment Approval'],
                ],
              },
            ].map(({ number, title, description, Icon, page, items }) => (
              <button
                className={`landing-workspace-card [&:where(.ipcr)_.landing-card-number]:[color:#00a5bd] [&:where(.ipcr)_.landing-card-icon]:[background:#66e9f43b] [&:where(.ipcr)_.landing-card-icon]:[color:#009fb8] [&:where(.ipcr)_.landing-card-arrow]:[color:#009fb8] [&:where(.ipcr)_.landing-card-arrow]:[background:#8deef76b] [&:where(.ipcr)_.landing-card-details_i]:[background:#b1f1f899] [&:where(.ipcr)_.landing-card-details_i]:[color:#00a2bb] relative [border-radius:15px] [padding-top:28px] [padding-right:26px] [padding-bottom:13px] [padding-left:26px] [text-align:left] [color:#062449] [box-shadow:0_7px_12px_#2374bd0b] [background:linear-gradient(155deg,#c3ddff,#f8fbff_85%)] [border-top:1px_solid_#dceaff] [border-right:1px_solid_#dceaff] [border-bottom:4px_solid_#2e8aff] [border-left:1px_solid_#dceaff] [transition:transform_.2s,box-shadow_.2s] [&:hover]:[transform:translateY(-4px)] [&:hover]:[box-shadow:0_12px_25px_#2374bd22] [&.ipcr]:[border-color:#d5f2f7] [&.ipcr]:[border-bottom-color:#65dce9] [&.ipcr]:[background:linear-gradient(150deg,#c9f8fc,#f8fdff_85%)] min-[1500px]:[min-height:204px] max-[900.02px]:[padding-bottom:17px] max-[540.02px]:[padding-top:29px] max-[540.02px]:[padding-right:15px] max-[540.02px]:[padding-bottom:13px] max-[540.02px]:[padding-left:15px] [@media((prefers-reduced-motion:_reduce))]:[transition:none] [@media((prefers-reduced-motion:_reduce))]:[&:hover]:[transform:none] min-[901px]:flex min-[901px]:[min-width:0px] min-[901px]:flex-col min-[901px]:[padding-top:36px] min-[901px]:[padding-right:20px] min-[901px]:[padding-bottom:18px] min-[901px]:[padding-left:20px] [@media_screen_and_(prefers-reduced-motion:no-preference)]:[animation:landing-reveal_650ms_350ms_cubic-bezier(.22,1,.36,1)_backwards] [@media_screen_and_(prefers-reduced-motion:no-preference)]:[&:nth-child(2)]:[animation-delay:450ms] [@media_screen_and_(prefers-reduced-motion:no-preference)]:[&:active]:[transform:translateY(-1px)_scale(.99)] [@media_screen_and_(hover:hover)_and_(prefers-reduced-motion:no-preference)]:[&:hover_.landing-card-arrow]:[transform:translateX(5px)] [@media_screen_and_(hover:hover)_and_(prefers-reduced-motion:no-preference)]:[&:hover_.landing-card-icon]:[transform:rotate(-5deg)_scale(1.04)] ${page}`}
                key={page}
                onClick={() => open(page)}
              >
                <span className="landing-card-number absolute [top:14px] [left:17px] [font-size:14px] [color:#087bff]">
                  {number}
                </span>
                <div className="landing-card-main flex items-center [gap:34px] [padding-top:0] [padding-right:8px] [padding-bottom:20px] [padding-left:13px] [&_h3]:[margin-top:1px] [&_h3]:[margin-right:0] [&_h3]:[margin-bottom:5px] [&_h3]:[margin-left:0] [&_h3]:[font-size:25px] [&_h3]:[--tw-leading:1.12] [&_h3]:[line-height:1.12] [&_h3]:[font-weight:750] [&_h3]:[--tw-tracking:-1px] [&_h3]:[letter-spacing:-1px] [&_p]:[margin-top:0px] [&_p]:[margin-right:0px] [&_p]:[margin-bottom:0px] [&_p]:[margin-left:0px] [&_p]:[max-width:320px] [&_p]:[font-size:16px] [&_p]:[--tw-leading:1.35] [&_p]:[line-height:1.35] [&_p]:[color:#315d92] min-[1500px]:[padding-bottom:22px] max-[1200.02px]:[gap:17px] max-[1200.02px]:[padding-left:0] max-[1200.02px]:[&_h3]:[font-size:22px] max-[1200.02px]:[&_p]:[font-size:14px] max-[900.02px]:[&_p]:[max-width:420px] max-[900.02px]:[gap:28px] max-[540.02px]:[gap:15px] max-[540.02px]:[padding-right:0] max-[540.02px]:[&_h3]:[font-size:20px] max-[540.02px]:[&_p]:[font-size:12px] min-[901px]:grid min-[901px]:[flex:1] min-[901px]:[grid-template-columns:60px_minmax(0,1fr)_34px] min-[901px]:[gap:14px] min-[901px]:[padding-top:0] min-[901px]:[padding-right:0] min-[901px]:[padding-bottom:22px] min-[901px]:[padding-left:0] min-[901px]:[&_h3]:[font-size:22px] min-[901px]:[&_p]:[font-size:14px]">
                  <span className="landing-card-icon grid [height:92px] [width:90px] shrink-0 [place-items:center] [border-radius:30px] [color:#07529b] [background:#8dbfff44] max-[1200.02px]:[height:77px] max-[1200.02px]:[width:70px] max-[1200.02px]:[border-radius:24px] max-[540.02px]:[height:65px] max-[540.02px]:[width:57px] max-[540.02px]:[border-radius:20px] max-[540.02px]:[&_svg]:[width:35px] min-[901px]:[height:68px] min-[901px]:[width:60px] min-[901px]:[border-radius:22px] min-[901px]:[&_svg]:[height:36px] min-[901px]:[&_svg]:[width:36px] [@media_screen_and_(prefers-reduced-motion:no-preference)]:[transition:transform_220ms_ease,_box-shadow_220ms_ease]">
                    <Icon size={47} strokeWidth={2.6} />
                  </span>
                  <div>
                    <h3>{title}</h3>
                    <p>{description}</p>
                  </div>
                  <span className="landing-card-arrow [margin-left:auto] grid [height:50px] [width:50px] shrink-0 [place-items:center] [border-radius:13px] [color:#0065cf] [background:#9fc8ff6b] max-[540.02px]:[height:37px] max-[540.02px]:[width:33px] max-[540.02px]:[border-radius:9px] max-[540.02px]:[&_svg]:[width:22px] min-[901px]:[height:38px] min-[901px]:[width:34px] min-[901px]:[border-radius:10px] min-[901px]:[&_svg]:[width:23px] [@media_screen_and_(prefers-reduced-motion:no-preference)]:[transition:transform_220ms_ease,_box-shadow_220ms_ease]">
                    <ArrowRight size={27} />
                  </span>
                </div>
                <div className="landing-card-details flex justify-between [gap:10px] [font-size:13px] [color:#396396] [&_>_span]:flex [&_>_span]:items-center [&_>_span]:[gap:8px] [&_i]:grid [&_i]:[height:32px] [&_i]:[width:32px] [&_i]:[place-items:center] [&_i]:[border-radius:50%] [&_i]:[color:#007aff] [&_i]:[background:#bbdcff99] max-[1200.02px]:[gap:5px] max-[1200.02px]:[font-size:11px] max-[1200.02px]:[&_>_span]:[gap:5px] max-[900.02px]:[font-size:13px] max-[540.02px]:[gap:4px] max-[540.02px]:[font-size:9px] max-[540.02px]:[&_i]:[height:24px] max-[540.02px]:[&_i]:[width:24px] max-[540.02px]:[&_i]:shrink-0 max-[540.02px]:[&_svg]:[width:13px] min-[901px]:flex-wrap min-[901px]:[justify-content:flex-start] min-[901px]:[gap:10px_14px] min-[901px]:[font-size:12px] min-[901px]:[&_i]:[height:26px] min-[901px]:[&_i]:[width:26px] min-[901px]:[&_i]:shrink-0">
                  {items.map(([ItemIcon, text]) => (
                    <span key={text}>
                      <i>
                        <ItemIcon size={17} />
                      </i>
                      {text}
                    </span>
                  ))}
                </div>
              </button>
            ))}
          </div>
        </section>
        <section
          className="landing-features [scroll-margin-top:20px] [padding-top:27px] [padding-bottom:25px] min-[1500px]:[padding-top:28px] min-[1500px]:[padding-bottom:25px] landing-container [margin-top:auto] [margin-right:auto] [margin-bottom:auto] [margin-left:auto] [width:min(1330px,_calc(100%_-_96px))] max-[1200.02px]:[width:calc(100%_-_56px)] max-[540.02px]:[width:calc(100%_-_36px)]"
          id="features"
        >
          <div className="landing-section-label [margin-bottom:17px] flex items-center justify-between [font-size:13px] [color:#6688ae] [&_h2]:flex [&_h2]:items-center [&_h2]:[gap:26px] [&_h2]:[font-size:13px] [&_h2]:[font-weight:600] [&_h2]:[--tw-tracking:1.2px] [&_h2]:[letter-spacing:1.2px] [&_h2:after]:[height:1px] [&_h2:after]:[width:21px] [&_h2:after]:[content:''] [&_h2:after]:[background:#a9c5e1] [&_>_span:before]:[margin-right:12px] [&_>_span:before]:[color:#95b6d6] [&_>_span:before]:[content:'—'] max-[540.02px]:[&_>_span]:hidden max-[540.02px]:[&_h2]:[font-size:11px]">
            <h2>KEY FEATURES</h2>
            <span>Designed to support your productivity.</span>
          </div>
          <div className="landing-feature-grid grid [grid-template-columns:repeat(4,1fr)] [gap:30px] max-[1200.02px]:[gap:22px] max-[900.02px]:[grid-template-columns:1fr_1fr] max-[900.02px]:[gap:24px] max-[540.02px]:[gap:24px_16px]">
            {[
              [
                Zap,
                'A Simpler Workflow',
                'Keep your reporting tasks organized in one workspace.',
              ],
              [
                FileText,
                'Professional Documents',
                'Create consistent and well-formatted reports.',
              ],
              [
                ShieldCheck,
                'Performance Tracking',
                'Monitor commitments and measure progress.',
              ],
              [
                Users,
                'Built for the office',
                'Designed for the needs of OCDRA III personnel.',
              ],
            ].map(([Icon, title, description]) => (
              <div
                className="landing-feature relative flex items-center [gap:21px] [&_+_.landing-feature:before]:absolute [&_+_.landing-feature:before]:[top:8px] [&_+_.landing-feature:before]:[bottom:5px] [&_+_.landing-feature:before]:[left:-16px] [&_+_.landing-feature:before]:[width:1px] [&_+_.landing-feature:before]:[content:''] [&_+_.landing-feature:before]:[background:#d9e6f5] [&_>_span]:grid [&_>_span]:[height:63px] [&_>_span]:[width:63px] [&_>_span]:shrink-0 [&_>_span]:[place-items:center] [&_>_span]:[border-radius:50%] [&_>_span]:[color:#0785f8] [&_>_span]:[background:#dcefff] [&_h3]:[margin-top:0] [&_h3]:[margin-right:0] [&_h3]:[margin-bottom:5px] [&_h3]:[margin-left:0] [&_h3]:[font-size:16px] [&_h3]:[font-weight:650] [&_h3]:[--tw-tracking:-.4px] [&_h3]:[letter-spacing:-.4px] [&_p]:[margin-top:0px] [&_p]:[margin-right:0px] [&_p]:[margin-bottom:0px] [&_p]:[margin-left:0px] [&_p]:[max-width:195px] [&_p]:[font-size:13px] [&_p]:[--tw-leading:1.45] [&_p]:[line-height:1.45] [&_p]:[color:#52749c] max-[1200.02px]:[gap:12px] max-[1200.02px]:[&_h3]:[font-size:14px] max-[1200.02px]:[&_p]:[font-size:12px] max-[1200.02px]:[&_>_span]:[height:50px] max-[1200.02px]:[&_>_span]:[width:50px] max-[900.02px]:[&:nth-child(3):before]:hidden max-[900.02px]:[&_p]:[max-width:230px] max-[540.02px]:items-start max-[540.02px]:[gap:9px] max-[540.02px]:[&_>_span]:[height:35px] max-[540.02px]:[&_>_span]:[width:35px] max-[540.02px]:[&_svg]:[width:22px] max-[540.02px]:[&_h3]:[font-size:12px] max-[540.02px]:[&_p]:[font-size:11px] max-[540.02px]:[&_+_.landing-feature:before]:hidden [@media_screen_and_(prefers-reduced-motion:no-preference)]:[animation:landing-reveal_650ms_500ms_cubic-bezier(.22,1,.36,1)_backwards] [@media_screen_and_(prefers-reduced-motion:no-preference)]:[&:nth-child(2)]:[animation-delay:570ms] [@media_screen_and_(prefers-reduced-motion:no-preference)]:[&:nth-child(3)]:[animation-delay:640ms] [@media_screen_and_(prefers-reduced-motion:no-preference)]:[&:nth-child(4)]:[animation-delay:710ms] [@media_screen_and_(prefers-reduced-motion:no-preference)]:[&_>_span]:[transition:transform_220ms_ease,_box-shadow_220ms_ease] [@media_screen_and_(hover:hover)_and_(prefers-reduced-motion:no-preference)]:[&:hover_>_span]:[transform:translateY(-4px)_rotate(-5deg)]"
                key={title}
              >
                <span>
                  <Icon size={31} />
                </span>
                <div>
                  <h3>{title}</h3>
                  <p>{description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
      <footer
        className="landing-footer [color:#bcd0e5] [background:linear-gradient(110deg,#041f3a,#052a4c)] [&_nav]:flex [&_nav]:[gap:0] [&_nav]:[font-size:10px] [&_nav_a]:[padding-top:0] [&_nav_a]:[padding-right:12px] [&_nav_a]:[padding-bottom:0] [&_nav_a]:[padding-left:12px] [&_nav_a]:[color:inherit] [&_nav_a_+_a]:[border-left:1px_solid_#607992] [&_p]:[margin-top:0px] [&_p]:[margin-right:0px] [&_p]:[margin-bottom:0px] [&_p]:[margin-left:0px] [&_p]:[text-align:right] [&_p]:[font-size:10px] [&_p]:[--tw-leading:1.6] [&_p]:[line-height:1.6] max-[900.02px]:[&_p]:[margin-left:auto] max-[540.02px]:[&_nav]:[order:3] max-[540.02px]:[&_nav]:w-full max-[540.02px]:[&_nav]:justify-center max-[540.02px]:[&_p]:[font-size:8px]"
        id="about"
      >
        <div className="landing-container [margin-top:auto] [margin-right:auto] [margin-bottom:auto] [margin-left:auto] [width:min(1330px,_calc(100%_-_96px))] max-[1200.02px]:[width:calc(100%_-_56px)] max-[540.02px]:[width:calc(100%_-_36px)] landing-footer-inner flex [min-height:61px] items-center justify-between [gap:30px] max-[900.02px]:flex-wrap max-[900.02px]:[gap:15px] max-[900.02px]:[padding-top:18px] max-[900.02px]:[padding-right:0] max-[900.02px]:[padding-bottom:18px] max-[900.02px]:[padding-left:0] max-[540.02px]:[gap:15px]">
          <div className="landing-office flex items-center [gap:10px] [&_img]:[width:115px] [&_img]:[filter:brightness(0)_invert(1)] [&_>_span]:[font-size:7px] max-[900.02px]:[&_>_span]:[max-width:130px] max-[900.02px]:[&_>_span]:[--tw-leading:1.5] max-[900.02px]:[&_>_span]:[line-height:1.5] max-[540.02px]:[&_img]:[width:88px] max-[540.02px]:[&_>_span]:[max-width:100px] max-[540.02px]:[&_>_span]:[font-size:6px]">
            <img src={logo} alt="OCDRA" />
            <span>OFFICE OF COMMISSIONER DESIDERIO R. APAG III</span>
          </div>
          <nav aria-label="Footer navigation">
            <a href="#home" onClick={scrollToSection}>
              Home
            </a>
            <a href="#workspaces" onClick={scrollToSection}>
              Workspaces
            </a>
            <a href="#features" onClick={scrollToSection}>
              Features
            </a>
            <a href="#about" onClick={scrollToSection}>
              About
            </a>
          </nav>
          <p>
            {' '}
            OCDRA OFFICE SYSTEM &nbsp; v1.0
            <br />
            All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  )
}
