export default function Foot() {
  return (
    <footer className="foot">
      <div className="shell">
        <h2>중국 시장, 샤오홍슈부터 시작하세요.</h2>
        <p>
          브랜드 소구 포인트에 맞는 중국 크리에이터 섭외부터 콘텐츠 가이드, 발행, 성과 리포트까지
          한 번에 진행합니다. 진행 희망 브랜드는 아래로 문의 주세요.
        </p>
        <div className="actions">
          <a
            className="btn btn-primary"
            href="https://siriai-business.vercel.app/#contact"
            target="_blank"
            rel="noopener noreferrer"
          >
            캠페인 문의하기 ↗
          </a>
          <a className="btn btn-ghost" href="mailto:hwangyk@siriai.co.kr">
            이메일 보내기
          </a>
        </div>
        <p className="colophon">SIRIAI · 샤오홍슈(小红书) 인플루언서 시딩</p>
      </div>
    </footer>
  );
}
