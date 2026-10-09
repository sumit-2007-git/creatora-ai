export function CreatorStats({ followers, views, engagement, rate }: { followers: string; views: string; engagement: string; rate?: string }) {
  return <div className="profile-stat-row"><div className="surface profile-stat"><strong>{followers}</strong><span>Followers</span></div><div className="surface profile-stat"><strong>{views}</strong><span>Monthly views</span></div><div className="surface profile-stat"><strong>{engagement}</strong><span>Engagement</span></div>{rate && <div className="surface profile-stat"><strong>{rate}</strong><span>Starting rate</span></div>}</div>;
}
