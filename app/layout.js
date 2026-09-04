import './globals.css';

export const metadata = {
  title: 'SIRIAI × 小红书 — 샤오홍슈 시딩 포트폴리오',
  description:
    '한국 브랜드의 중국 시장 진출을 위한 샤오홍슈(小红书) 인플루언서 시딩. SIRIAI가 실제로 발행한 콘텐츠를 확인하세요.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="ko">
      <head>
        {/*
          Noto Sans SC carries the simplified-Chinese coverage the creator names and
          hook copy need; Inter Tight / Noto Sans KR match the main SIRIAI portfolio.
        */}
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Inter+Tight:wght@400;500;600;700&family=Noto+Sans+KR:wght@400;500;600;700&family=Noto+Sans+SC:wght@400;500;700&display=swap"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
