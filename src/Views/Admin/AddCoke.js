import React, { Component } from 'react';
import Select from 'react-select';

import { database } from '../../Firebase/Firebase';

import './index.css';
import { toast } from 'react-toastify';

export default class AddCoke extends Component {

  constructor() {
    super();

    this.state = { meliantes: [], melianteSelected: null }
  }

  async componentDidMount() {
    const ref = database.ref("/users");

    await ref.on("value", (snapshot) => {
      const ret = snapshot.val();
      
      let meliantes = [];
      for (let i = 0; i < ret.length; i++) {
        let u = { 
          value: i,
          label: ret[i].nome,  
        }

        meliantes.push(u);
      }

      this.setState({ meliantes });
    },
    (error) => {
      console.log("Error: " + error.code);
    });
  }

  handleChangeMeliante = melianteSelected => {
    this.setState({ melianteSelected });
  }

  handleSubmitCoke = e => {
    e.preventDefault();
    const meliante = this.state.melianteSelected;

    let ref = database.ref(`users/${meliante.value}/cokes/npagas`);

    ref.transaction(npagas => {
      return (npagas || 0) + 1;
    });

    toast.success(`Coca lançada para ${meliante.label}`);
  }

  render() {
    return(
      <div className="add-coke">

        <h2>Lançar Coke</h2>

        <form onSubmit={ this.handleSubmitCoke }>
          <Select
            value={ this.state.melianteSelected } onChange={ this.handleChangeMeliante }
            options={ this.state.meliantes } placeholder="Meliante"
          />

          {/* <div className="inputField">
            <input type="text" placeholder="Motivo da Coke" ref="motivo" />
          </div> */}

          <button className="_btn _btn--success" type="submit">Lançar</button>

        </form>

      </div>
    );
  }
}