import React, { Component } from 'react';
//import logo from './logo.svg';
//import './App.css';

import Navbar from "./components/Navbar";
import Pie from "./components/Pie";

import DniForm from "./components/DniForm";
import RegistroForm from "./components/RegistroForm";

class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			encontrado: false,
			registrarse: false,
			dni: "",
			integrante: {}
		}
		this.handleRegistro = this.handleRegistro.bind(this);
		this.handleCancelForm = this.handleCancelForm.bind(this);
		this.handleOkForm = this.handleOkForm.bind(this);
		this.handleOkDni = this.handleOkDni.bind(this);
	}

	handleOkDni(data) {
		console.log(data);
		this.setState({
			integrante: data
		});
	}

	handleRegistro() {
		this.setState({
			registrarse: true
		});
	}

	handleCancelForm() {
		this.setState({
			registrarse: false
		});
	}

	handleOkForm(id) {
		console.log("Nuevo Id: " + id);
		this.setState({
			registrarse: false
		});
		alert("Miembro agregado!");
	}

	render() {
		const { encontrado, registrarse } = this.state;
		return(
			<React.Fragment>
				<Navbar />
				{
					encontrado ?
					<div>Bienvenido {this.state.integrante.apellido} {this.state.integrante.apellido}</div>
					:
					<React.Fragment>
						registrarse ?
						<RegistroForm onCancel={this.handleCancelForm} onOk={this.handleOkForm} />
						:
						<React.Fragment>
							<DniForm onOkDni={this.handleOkDni} />
							<div className="container mt-3">
								<div className="row justify-content-center">
									<div className="col-sm-12 col-md-4 d-flex justify-content-center">
										<button className="btn btn-dark" onClick={this.handleRegistro}>Quiero sumarme al equipo!</button>
									</div>
								</div>
							</div>
						</React.Fragment>
					</React.Fragment>
				}
				<Pie />
			</React.Fragment>
		);
	}
}

/*
class App extends Component {
	render() {
		return (
			<Provider>
				<Router>
					<React.Fragment>
						<Navbar />
						<Menu />
						<div className="container">
							<Switch>
								<Route exact path="/" component={Zonas} />
								<Route exact path="/localidades" component={Localidades} />
								<Route exact path="/atractivos" component={Atractivos} />
								<Route exact path="/fest" component={Fest} />
							</Switch>
						</div>
					</React.Fragment>
				</Router>
			</Provider>
		);
	}
}
*/

export default App;
