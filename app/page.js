import Link from 'next/link';
import Nav from './Nav';
import Foot from './Foot';
import { getAllCases } from '@/lib/cases';

export default function Home() {
  const cases = getAllCases();

  return (
    <>
      <Nav />

      <header className="hero shell">
        <p className="eyebrow">Xiaohongshu Seeding Portfolio</p>
        <h1 className="disp">
          SIRIAI<span className="x">×</span>
          <span className="cn">小红书</span>
        </h1>
        <p className="lead">
          중국 진출을 준비하는 한국 브랜드를 위해, 샤오홍수 현지 크리에이터 시딩을 설계하고
          운영합니다. 아래는 SIRIAI가 실제로 발행한 캠페인 콘텐츠입니다.
        </p>
        <div className="meta">
          <span className="chip">숏폼 · 피드</span>
          <span className="chip">오프라인 매장 방문</span>
          <span className="chip">현지 크리에이터 섭외</span>
          <span className="chip">중문 카피 기획</span>
        </div>
      </header>

      <section className="shell">
        <div className="sec-head">
          <h2>캠페인</h2>
          <span className="count">{cases.length}개 브랜드</span>
        </div>
        <div className="case-grid">
          {cases.map((c) => (
            <Link key={c.slug} href={`/case/${c.slug}`} className="case-card">
              <div className="thumb">
                {c.cover ? <img src={c.cover} alt="" /> : null}
              </div>
              <div className="body">
                <p className="brand">{c.brand}</p>
                <p className="sub">
                  {[c.category, c.period, `콘텐츠 ${c.items.length}건`]
                    .filter(Boolean)
                    .join(' · ')}
                </p>
                <p className="desc">{c.summary}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <Foot />
    </>
  );
}
