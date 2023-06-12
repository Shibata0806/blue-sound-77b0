import Link from 'next/link';

export default function MyPage() {
	return (
		<div>
			this is myPage running on nextjs
			<li>
				<p>NextApp</p>
				<Link href="/my">link: /my</Link>
				<br />
				<a href="/my">a: /my</a>
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
