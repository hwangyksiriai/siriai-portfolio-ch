import Link from 'next/link';

export default function Nav({ back }) {
  return (
    <nav className="nav">
      <div className="nav-inner">
        <Link href="/" className="wordmark">
          <img className="word-logo" src="/media/brand/logo-white.png" alt="SIRIAI" />
          <span className="x">×</span>
          <span className="cn">小红书</span>
        </Link>
        <div className="nav-links">
          {back ? (
            <Link href="/" className="nav-back">
              ← 전체 캠페인
            </Link>
          ) : (
            <>
              <a
                className="nav-back"
                href="https://siriai-portfolio.vercel.app"
                target="_blank"
                rel="noopener noreferrer"
              >
                국내 포트폴리오 ↗
              </a>
              <a
                className="nav-back"
                href="https://siriai-portfolio-na.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
              >
                해외 포트폴리오 ↗
              </a>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
