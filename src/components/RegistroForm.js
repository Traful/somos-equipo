import React, { Component } from 'react';

class RegistroForm extends Component {
	constructor(props) {
		super(props);
		this.state = {
			formulario: {
				apellido: "",
				nombre: "",
				dni: "",
				domicilio: "",
				caracteristica: "2657",
				telefono: "",
				mail: "",
				notas: "",
				idcomision: 1,
				idreferente: 1,
				idtipo: 3, //Miembro
				activo: 1
			},
			referentes: [],
			comisiones: []
		}
		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleFormCancel = this.handleFormCancel.bind(this);
	}

	handleChange(event) {
		const target = event.target;
		const value = target.type === "checkbox" ? target.checked : target.value;
		const name = target.name;
		this.setState({
			formulario: {
				...this.state.formulario,
				[name]: value
			}
		});
	}

	handleSubmit(event) {
		event.preventDefault();
		fetch(`${process.env.REACT_APP_API_HOST}/integrante/nuevo`, {
			method: "POST",
			headers: {
				"Authorization": "asdssffsdff",
				"Content-Type": "application/json"
			},
			body: JSON.stringify(this.state.formulario)
		})
		.then(res => res.json())
		.then((result) => {
			if(!result.err) {
				if(parseInt(result.insertId) > 0) {
					this.props.onOk(result.insertId);
				} else {
					console.log("No id: " + result.insertId);
				}
			} else {
				console.log(result.errMsg);
			}
		}, (error) => { //???
			console.log(error);
		});
	}

	handleFormCancel(event) {
		event.preventDefault();
		this.props.onCancel();
	}

	componentWillMount() {
		//Comisiones
		fetch(`${process.env.REACT_APP_API_HOST}/comisiones`, {
			method: "GET",
			headers: {
				"Authorization": "asdssffsdff",
				"Content-Type": "application/json"
			}
		})
		.then(res => res.json())
		.then((result) => {
			if(!result.err) {
				this.setState({ comisiones: result.data.registros });
			} else {
				console.log(result.errMsg);
			}
		}, (error) => { //???
			console.log(error);
		});
		//Referentes
		fetch(`${process.env.REACT_APP_API_HOST}/referentes`, {
			method: "GET",
			headers: {
				"Authorization": "asdssffsdff",
				"Content-Type": "application/json"
			}
		})
		.then(res => res.json())
		.then((result) => {
			if(!result.err) {
				this.setState({ referentes: result.data.registros });
			} else {
				console.log(result.errMsg);
			}
		}, (error) => { //???
			console.log(error);
		});
	}

	render() {
		const comisiones = this.state.comisiones.map((comision) => {
			return(<option key={`com-${comision.id}`} value={comision.id}>{comision.nombre}</option>);
		});
		const referentes = this.state.referentes.map((referente) => {
			return(<option key={`ref-${referente.id}`} value={referente.id}>{referente.apellido + " " + referente.nombre}</option>);
		});
		const form = this.state.formulario;
		return (
			<div className="container mb-5">
				<div className="row justify-content-center">
					<div className="col-sm-12 col-md-4">
						<form onSubmit={this.handleSubmit} autoComplete="off">
							<div className="form-group">
								<label htmlFor="apellido">Apellido</label>
								<input type="text" className="form-control" id="apellido" name="apellido" placeholder="Apellido/s" value={form.apellido} onChange={this.handleChange} maxLength="50" autoComplete="off" />
							</div>
							<div className="form-group">
								<label htmlFor="nombre">Nombre</label>
								<input type="text" className="form-control" id="nombre" name="nombre" placeholder="Nombre/s" value={form.nombre} onChange={this.handleChange} maxLength="50" />
							</div>
							<div className="form-group">
								<label htmlFor="dni">DNI</label>
								<input type="number" className="form-control" id="dni" name="dni" placeholder="Número de documento" value={form.dni} onChange={this.handleChange} maxLength="8" />
							</div>
							<div className="form-group">
								<label htmlFor="domicilio">Domicilio</label>
								<input type="text" className="form-control" id="domicilio" name="domicilio" placeholder="Domicilio" value={form.domicilio} onChange={this.handleChange} maxLength="100" />
							</div>

							<div className="form-row">
								<div className="col">
									<div className="form-group">
										<label htmlFor="caracteristica">Caract.</label>
										<div className="input-group">
											<div className="input-group-prepend">
												<div className="input-group-text">0-</div>
											</div>
											<input type="number" className="form-control" id="caracteristica" name="caracteristica" placeholder="2657" value={form.caracteristica} onChange={this.handleChange} maxLength="5" />
										</div>
									</div>
								</div>
								<div className="col">
									<div className="form-group">
										<label htmlFor="telefono">Cel.</label>
										<div className="input-group">
											<div className="input-group-prepend">
												<div className="input-group-text">15-</div>
											</div>
											<input type="number" className="form-control" id="telefono" name="telefono" placeholder="" value={form.telefono} onChange={this.handleChange} maxLength="6" />
										</div>
									</div>
								</div>
							</div>

							<div className="form-group">
								<label htmlFor="mail">Email</label>
								<input type="email" className="form-control" id="mail" name="mail" placeholder="mimail@miserver.com" value={form.mail} onChange={this.handleChange} maxLength="50" />
							</div>

							<div className="form-group">
								<label htmlFor="idcomision">Comisión</label>
								<select className="form-control" id="idcomision" name="idcomision" value={form.idcomision} onChange={this.handleChange}>
									{ comisiones }
								</select>
							</div>

							<div className="form-group">
								<label htmlFor="idreferente">Referente</label>
								<select className="form-control" id="idreferente" name="idreferente" value={form.idreferente} onChange={this.handleChange}>
									{ referentes }
								</select>
							</div>
							<div className="d-flex justify-content-between">
								<button className="btn btn-dark" onClick={this.handleFormCancel}>Cancelar</button>
								<button type="submit" className="btn btn-primary">Aceptar</button>
							</div>
							
						</form>
					</div>
				</div>
            </div>
		);
	}
}

export default RegistroForm;