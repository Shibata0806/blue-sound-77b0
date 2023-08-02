'use client';
import Link from 'next/link';

export default function RankingPage() {
	return (
		<div>
			this is rankingPage running on nextjs
			<li>
				<p>NextApp</p>
				<Link href="/my">link: /my</Link>
				<br />
				<a href="/my">a: /my</a>
				<br />
				<Link href="/ranking">link: /ranking</Link>
				<br />
				<a href="/ranking">a: /ranking</a>
			</li>
			<li>
				<p>StaticPage</p>
				<Link href="/a">Link: /a</Link>
				<br />
				<a href="/a">a: /a</a>
			</li>
			<li>
				<p>StaticPage</p>
				<Link href="/c">Link: /c</Link>
				<br />
				<a href="/c">a: /c</a>
			</li>
		</div>
	);
}
