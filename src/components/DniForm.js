import React, { Component } from 'react';


const Leyenda = (props) => {
	return(
		<div className="alert alert-danger mt-3 animated flipInY delay-2s" role="alert">
			<p>Lo sentimos mucho, no encotramos tu DNI ({props.dni}) en nuestros registros.</p>
			<p>Fijate si está escrito correctamente.</p>
			<p>Si es la primera vez que ingresas te invitamos a ser parte del equipo dando click en el botón:</p>
			<p><strong><i>Quiero sumarme al equipo!</i></strong> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <i className="fas fa-arrow-down"></i></p>
		</div>
	);
}

class DniForm extends Component {
	constructor(props) {
		super(props);
		this.state = {
			buscando: false,
			leyenda: false,
			dni: ""
		}
		this.handleChange = this.handleChange.bind(this);
    	this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleChange(event) {
		if(this.state.leyenda) {
			this.setState({
				leyenda: false,
				buscando: false
			});
		}
		this.setState({dni: event.target.value});
	}

	handleSubmit(event) {
		event.preventDefault();
		this.setState({
			buscando: true
		}, () => {
			fetch(`${process.env.REACT_APP_API_HOST}/integrantes/dni/${this.state.dni}`, {
				method: 'GET',
				headers: {
					"Authorization": "asdssffsdff",
					"Content-Type": "application/json"
				},
			})
			.then(res => res.json())
			.then((result) => {
				if(!result.err) {
					if(parseInt(result.data.count) > 0) {
						this.props.onOkDni(result.data.registros);
					} else {
						this.setState({
							leyenda: true
						});
					}
				} else {
					console.log("Error!");
				}
			}, (error) => { //???
			});
		});
	}

	render() {
		const {buscando, leyenda, dni} = this.state;
		return (
			<div className="container">
				<div className="row justify-content-center">
					<div className="col-sm-12 col-md-6 col-lg-4 col-xl-3">
						<form onSubmit={this.handleSubmit}>
							<div className="d-flex">
								<label htmlFor="dni" className="mr-4 pt-2">DNI:</label>
								<input type="number" className="form-control mr-4" name="dni" id="dni" value={dni} onChange={this.handleChange} />
								{
									buscando ?
									<div className="spinner"></div>
									:
									<button type="submit" className="btn btn-dark mb-2">Confirmar</button>
								}
							</div>
						</form>
					</div>
				</div>
				<div className="row justify-content-center">
					<div className="col-sm-12 col-md-4">
						{
							leyenda ?
							<Leyenda dni={dni} />
							:
							""
						}
					</div>
				</div>
            </div>
		);
	}
}

export default DniForm;