import { useState } from 'react';
import { FC, ReactElement } from 'react';
import { toast } from 'react-toastify';

const Defaillance: FC = (): ReactElement => {
	const [values, setValues] = useState({
		dateAchat: '',
		dateDefaillance: '',
		salle: '',
		description: '',
	});

	const updateValues =
		(champs: string) => (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
			const newValues = { ...values, [champs]: event.target.value };
			setValues(newValues);
		};

	const handleSubmit = () => {
		const defaillances = JSON.parse(localStorage.getItem('defaillances') || '[]') || [];

		if (defaillances) {
			defaillances.push(values);

			localStorage.setItem('defaillances', JSON.stringify(defaillances));
		}

		toast.success('Element a été supprimé du panier');
	};

	return (
		<div className="row">
			<h1 className="fw-bold" style={{ marginTop: '80px' }}>
				Déclaration de défaillance
			</h1>
			<div className="row">
				<div className="col-5">
					<div className="form-group d-flex justify-content-end align-items-center mt-5">
						<span className="d-flex align-items-center" style={{ height: '40px' }}>
							Date d'achat :
						</span>
					</div>
					<div className="form-group d-flex justify-content-end align-items-center mt-2">
						<span className="d-flex align-items-center" style={{ height: '40px' }}>
							Date de défaillance :
						</span>
					</div>
					<div className="form-group d-flex justify-content-end align-items-center mt-2">
						<span className="d-flex align-items-center" style={{ height: '40px' }}>
							Numéro de salle :
						</span>
					</div>
					<div className="form-group d-flex justify-content-end align-items-center mt-2">
						<span className="d-flex align-items-center" style={{ height: '40px' }}>
							Description :
						</span>
					</div>
				</div>
				<div className="col-6">
					<div className="form-group d-flex justify-content-start mt-5">
						<input
							style={{ width: '380px', height: '40px', textAlign: 'start' }}
							type="date"
							className="form-control m-0 p-1"
							value={values.dateAchat}
							onChange={updateValues('dateAchat')}
						/>
					</div>
					<div className="form-group d-flex justify-content-start mt-2">
						<input
							style={{ width: '380px', height: '40px', textAlign: 'start' }}
							type="date"
							className="form-control m-0 p-1"
							value={values.dateDefaillance}
							onChange={updateValues('dateDefaillance')}
						/>
					</div>
					<div className="form-group d-flex justify-content-start mt-2">
						<input
							style={{ width: '380px', height: '40px', textAlign: 'start' }}
							type="number"
							className="form-control m-0 p-1"
							value={values.salle}
							onChange={updateValues('salle')}
						/>
					</div>
					<div className="form-group d-flex justify-content-start mt-2">
						<textarea
							className="form-control m-0 p-1"
							rows={5}
							style={{
								width: '380px',
								textAlign: 'start',
								border: '1px solid #ced4da',
								borderRadius: '0.25rem',
							}}
							value={values.description}
							onChange={updateValues('description')}
						></textarea>
					</div>
					<div className="form-group d-flex justify-content-start mt-3">
						<button onClick={handleSubmit} type="button" className="primary m-0">
							Déclarer
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Defaillance;
