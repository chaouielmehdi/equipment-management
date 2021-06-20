import { FC, ReactElement, useState } from 'react';

export interface DefaillanceType {
	client: string,
	salle: number,
	equipement: string,
	tache: string,
	technicien: string,
	dateAchat: string,
	dateDefaillance: string,
	dateMaintenance: string,
	isValidated: boolean,
}

const Maintenance: FC = (): ReactElement => {
	const [values, setValues] = useState<DefaillanceType[]>([{
		client: 'client',
		salle: 4,
		equipement: 'REF-95',
		tache: '',
		technicien: '',
		dateAchat: '',
		dateDefaillance: '',
		dateMaintenance: '',
		isValidated: false,
	}]);

	return (
		<div className="row">
			<h1 className="fw-bold" style={{ marginTop: '80px', fontSize: '28px' }}>
				Maintenance
			</h1>

			{values.length === 0 ?
				<span>Maintenance vide</span>
			:
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
							{values.map((value) =>
								<tr>
									<td>{value.client}</td>
									<td>{value.salle}</td>
									<td>{value.equipement}</td>
									<td>{value.tache}</td>
									<td>{value.technicien}</td>
									<td>{value.dateAchat}</td>
									<td>{value.dateDefaillance}</td>
									<td>{value.dateMaintenance}</td>
									<td>
										{value.isValidated ?
											<i className="fas fa-check text-success"></i>
										:
											<button type="button" className="btn btn-primary m-0">
												Valider
											</button>
										}
									</td>
								</tr>
							)}
						</tbody>
					</table>

				</div> 
			}
		</div>
	);
};

export default Maintenance;
