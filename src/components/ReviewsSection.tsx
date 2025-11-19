import React, { useMemo, useState } from 'react';

type Review = {
  id: string;
  name: string;
  verified?: boolean;
  title: string;
  body: string;
  rating: number;
  createdAt: string;
  helpful?: number;
};

const initialReviews: Review[] = [
  {
    id: 'r1',
    name: 'Staci W.',
    verified: true,
    title: 'Love The Taste',
    body: 'Berry Gummies — Really enjoyed these. Taste is pleasant and easy to take daily.',
    rating: 5,
    createdAt: new Date(Date.now() - 7 * 24 * 3600 * 1000).toISOString(),
    helpful: 2,
  },
  {
    id: 'r2',
    name: 'Randi',
    verified: false,
    title: '5 Stars',
    body: 'I loved the product!',
    rating: 5,
    createdAt: new Date(Date.now() - 9 * 24 * 3600 * 1000).toISOString(),
    helpful: 0,
  },
];

const Stars: React.FC<{ value: number }> = ({ value }) => (
  <div className="flex items-center gap-1">
    {[1, 2, 3, 4, 5].map((s) => (
      <svg key={s} className={`h-4 w-4 ${s <= value ? 'text-yellow-400' : 'text-gray-200'}`} viewBox="0 0 20 20" fill="currentColor" aria-hidden>
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.957a1 1 0 00.95.69h4.162c.969 0 1.371 1.24.588 1.81l-3.37 2.448a1 1 0 00-.364 1.118l1.287 3.957c.3.921-.755 1.688-1.54 1.118L10 15.347l-3.947 2.676c-.784.57-1.84-.197-1.54-1.118l1.287-3.957a1 1 0 00-.364-1.118L2.067 9.384c-.783-.57-.38-1.81.588-1.81h4.162a1 1 0 00.95-.69L9.05 2.927z" />
      </svg>
    ))}
  </div>
);

const ReviewsSection: React.FC<{ productTitle?: string }> = ({ productTitle }) => {
  const [reviews, setReviews] = useState<Review[]>(initialReviews);
  const [showWrite, setShowWrite] = useState(false);
  const [name, setName] = useState('');
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [rating, setRating] = useState(5);

  const stats = useMemo(() => {
    const total = reviews.length;
    const avg = total ? Math.round((reviews.reduce((s, r) => s + r.rating, 0) / total) * 10) / 10 : 0;
    const distribution = [5, 4, 3, 2, 1].map((n) => reviews.filter((r) => r.rating === n).length);
    return { total, avg, distribution };
  }, [reviews]);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const newR: Review = {
      id: String(Date.now()),
      name: name || 'Anonymous',
      verified: false,
      title: title || 'Review',
      body: body || '',
      rating,
      createdAt: new Date().toISOString(),
      helpful: 0,
    };
    setReviews((s) => [newR, ...s]);
    setShowWrite(false);
    setName(''); setTitle(''); setBody(''); setRating(5);
  };

  return (
    <section className="max-w-7xl mx-auto px-4 py-12">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold">Reviews</h2>
          <p className="text-sm text-gray-600">{stats.avg} average — {stats.total} reviews</p>
        </div>
        <div>
          <button onClick={() => setShowWrite((s) => !s)} className="bg-green-600 text-white px-4 py-2 rounded">Write a review</button>
        </div>
      </div>

      {showWrite && (
        <form onSubmit={submit} className="mb-6 p-4 border rounded bg-white">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-3">
            <input placeholder="Your name" value={name} onChange={(e) => setName(e.target.value)} className="p-2 border rounded" aria-label="Your name" />
            <input placeholder="Review title" value={title} onChange={(e) => setTitle(e.target.value)} className="p-2 border rounded" aria-label="Review title" />
            <label className="sr-only" htmlFor="review-rating">Rating</label>
            <select id="review-rating" value={rating} onChange={(e) => setRating(Number(e.target.value))} className="p-2 border rounded" aria-label="Rating">
              {[5,4,3,2,1].map((n) => <option key={n} value={n}>{n} stars</option>)}
            </select>
          </div>
          <textarea placeholder="Write your review" value={body} onChange={(e) => setBody(e.target.value)} className="w-full p-2 border rounded mb-3" rows={4} />
          <div className="flex gap-2">
            <button type="submit" className="px-4 py-2 bg-green-600 text-white rounded">Submit</button>
            <button type="button" onClick={() => setShowWrite(false)} className="px-4 py-2 border rounded">Cancel</button>
          </div>
        </form>
      )}

      <div className="space-y-6">
        {reviews.map((r) => (
          <article key={r.id} className="p-4 bg-white border rounded">
            <div className="flex items-start gap-4">
              <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center font-semibold text-gray-700">{r.name.charAt(0)}</div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="flex items-center gap-3">
                      <div className="font-semibold">{r.name}</div>
                      {r.verified && <span className="text-xs text-green-600 border rounded px-2 py-1">Verified</span>}
                    </div>
                    <div className="text-sm text-gray-600">{new Date(r.createdAt).toLocaleDateString()}</div>
                  </div>
                  <div><Stars value={r.rating} /></div>
                </div>
                <h3 className="mt-2 font-medium">{r.title}</h3>
                <p className="mt-1 text-gray-700">{r.body}</p>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};

export default ReviewsSection;
