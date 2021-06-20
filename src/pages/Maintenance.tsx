import { FC, ReactElement, useEffect, useState } from 'react';
import { toast } from 'react-toastify';

export interface DefaillanceType {
	client: string;
	salle: number;
	equipement: string;
	description: string;
	tache: string;
	technicien: string;
	dateAchat: string;
	dateDefaillance: string;
	dateMaintenance: string;
	isValidated: boolean;
}

const Maintenance: FC = (): ReactElement => {
	const listDefaillances = JSON.parse(localStorage.getItem('Defaillances') || '') as DefaillanceType[];
	const [values, setValues] = useState<DefaillanceType[]>(listDefaillances);

	const setInputValue = (index: number, field: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
		const value = event.target.value;
		const newInputValue = [...values];
		if (field === 'dateMaintenance') {
			newInputValue[index].dateMaintenance = value;
		}
		if (field === 'technicien') {
			newInputValue[index].technicien = value;
		}
		setValues(newInputValue);
	};
	const setSelectValue = (index: number) => (event: React.ChangeEvent<HTMLSelectElement>) => {
		const value = event.target.value;
		const newInputValue = [...values];
		newInputValue[index].tache = value;
		setValues(newInputValue);
	};

	const getDate = () => {
		let today = new Date();
		let dd = today.getDate();
		let mm = today.getMonth() + 1;
		let yyyy = today.getFullYear();
		return yyyy + '-' + (mm < 10 ? '0' + mm : mm) + '-' + (dd < 10 ? '0' + dd : dd);
	};

	const handleSubmit = (index: number) => () => {
		const newInputValue = [...values];
		newInputValue[index].isValidated = true;
		setValues(newInputValue);
		localStorage.setItem('Defaillances', JSON.stringify(newInputValue));
		toast.success('Tache soumis avec succés!');
	};

	return (
		<div className="row">
			<h1 className="fw-bold" style={{ marginTop: '80px', fontSize: '28px' }}>
				Maintenance
			</h1>

			{values.length === 0 ? (
				<span>Maintenance vide</span>
			) : (
				<div className="col-12 mt-3">
					<table className="table">
						<thead>
							<tr>
								<th scope="col">Client</th>
								<th scope="col">Salle</th>
								<th scope="col">Equipement</th>
								<th scope="col">Tâche</th>
								<th scope="col">Technicien</th>
								<th scope="col">Date d'achat</th>
								<th scope="col">Date de défaillance</th>
								<th scope="col">Date de maintenance</th>
								<th scope="col">Action</th>
							</tr>
						</thead>
						<tbody>
							{values.map((value, index) => (
								<tr>
									<td>{value.client}</td>
									<td>{value.salle}</td>
									<td>{value.equipement}</td>
									<td>
										{value.isValidated === true ? (
											value.tache
										) : (
											<select
												className="form-select"
												style={{ width: '140px' }}
												value={value.tache}
												onChange={setSelectValue(index)}
											>
												<option selected></option>
												<option value="Element 1">Element 1</option>
												<option value="Element 2">Element 2</option>
											</select>
										)}
									</td>
									<td>
										{value.isValidated === true ? (
											value.technicien
										) : (
											<input
												style={{ width: '160px', height: '40px', textAlign: 'start' }}
												type="text"
												className="form-control m-0 p-1"
												value={value.technicien}
												onChange={setInputValue(index, 'technicien')}
											/>
										)}
									</td>
									<td>{value.dateAchat}</td>
									<td>{value.dateDefaillance}</td>
									<td>
										{value.isValidated === true ? (
											value.dateMaintenance
										) : (
											<input
												style={{ width: '160px', textAlign: 'start' }}
												type="date"
												min={getDate()}
												className="form-control m-0 p-1"
												value={value.dateMaintenance}
												onChange={setInputValue(index, 'dateMaintenance')}
											/>
										)}
									</td>
									<td>
										{value.isValidated ? (
											<i className="fas fa-check text-success"></i>
										) : (
											<button
												type="button"
												className="btn btn-primary m-0"
												onClick={handleSubmit(index)}
											>
												Valider
											</button>
										)}
									</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			)}
		</div>
	);
};

export default Maintenance;
