interface ILink {
	label: string;
	url: string;
}

function Footer() {
	const links: ILink[] = [
		{ url: '', label: 'Politique de confidentialité' },
		{ url: '', label: 'Copyright © 2020, tous droits réservés' },
		{ url: '', label: "Condition générale d'utilisation" },
	];

	return (
		<div className="border-top" style={{ marginTop: '100px' }}>
			<div className="d-flex justify-content-around">
				{links.map((link, index) => (
					<a key={index} className="mt-4" style={{ color: 'grey' }} href={link.url}>
						{link.label}
					</a>
				))}
			</div>
		</div>
	);
}

export default Footer;
