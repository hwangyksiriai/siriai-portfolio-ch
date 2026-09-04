import { notFound } from 'next/navigation';
import Nav from '../../Nav';
import Foot from '../../Foot';
import Carousel from './Carousel';
import { getAllCases, getCase } from '@/lib/cases';

// Only cases that actually have content get a route; skeleton slugs 404
// rather than rendering an empty page.
export const dynamicParams = false;

export function generateStaticParams() {
  return getAllCases().map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const c = getCase(slug);
  if (!c) return {};
  return {
    title: `${c.brand} × 小红书 — SIRIAI`,
    description: c.summary,
  };
}

function Item({ item, brand }) {
  return (
    <article className="item">
      <div className="media">
        {item.format === 'video' ? (
          <video
            src={item.media[0]}
            playsInline
            muted
            loop
            autoPlay
            preload="metadata"
            controls
            // Stops mobile Safari/Chrome painting their own play-button overlay
            // on top of the autoplaying clip.
            poster="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7"
          />
        ) : (
          <Carousel images={item.media} alt={`${brand} 샤오홍슈 콘텐츠`} />
        )}
      </div>
      <div className="body">
        <div className="creator">
          <span className="name">{item.creator}</span>
          {item.followers ? <span className="followers">{item.followers} 팔로워</span> : null}
          <span className="date">{item.date}</span>
        </div>
        <p className="concept">{item.concept}</p>
        <p className="hook-cn">{item.hookCn}</p>
        <p className="note-ko">{item.noteKo}</p>
        {item.xhsUrl ? (
          <a className="xhs-link" href={item.xhsUrl} target="_blank" rel="noopener noreferrer">
            <span className="cn">小红书</span>에서 보기 ↗
          </a>
        ) : null}
      </div>
    </article>
  );
}

export default async function CasePage({ params }) {
  const { slug } = await params;
  const c = getCase(slug);
  if (!c) notFound();

  const videos = c.items.filter((i) => i.format === 'video');
  const carousels = c.items.filter((i) => i.format === 'carousel');

  return (
    <>
      <Nav back />

      <header className="case-hero shell">
        <p className="eyebrow">{c.category}</p>
        <h1 className="disp">
          {c.brand}
          <span className="x">×</span>
          <span className="cn">小红书</span>
        </h1>
        <p className="lead">{c.summary}</p>
        <div className="facts">
          {/* Period is optional — some campaigns are presented without dates. */}
          {c.period ? <span>{c.period}</span> : null}
          {c.type ? <span>{c.type}</span> : null}
          <span>실제 발행 콘텐츠 {c.items.length}건</span>
        </div>
      </header>

      {videos.length > 0 ? (
        <section className="section shell">
          <div className="sec-head">
            <h2>숏폼</h2>
            <span className="count">{videos.length}건</span>
          </div>
          <div className="item-grid video">
            {videos.map((item) => (
              <Item key={item.id} item={item} brand={c.brand} />
            ))}
          </div>
        </section>
      ) : null}

      {carousels.length > 0 ? (
        <section className="section shell">
          <div className="sec-head">
            <h2>피드</h2>
            <span className="count">{carousels.length}건</span>
          </div>
          <div className="item-grid carousel">
            {carousels.map((item) => (
              <Item key={item.id} item={item} brand={c.brand} />
            ))}
          </div>
        </section>
      ) : null}

      <Foot />
    </>
  );
}
