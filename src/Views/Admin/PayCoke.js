import React, { Component } from 'react';
import Select from 'react-select';

import { database } from '../../Firebase/Firebase';

import './index.css';
import { toast } from 'react-toastify';

export default class PayCoke extends Component {

  constructor() {
    super();

    this.state = { meliantes: [], melianteSelected: null }
  }

  componentDidMount() {
    this.getMeliantes();
  }

  getMeliantes = async () => {
    const ref = database.ref("/users");

    await ref.on("value", (snapshot) => {
      const ret = snapshot.val();
      
      let meliantes = [];
      for (let i = 0; i < ret.length; i++) {
        if (ret[i].cokes.npagas > 0) {
          let u = { 
            value: i,
            label: ret[i].nome,  
          }

          meliantes.push(u);
        }
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

  handleSubmitPay = e => {
    e.preventDefault();

    const meliante = this.state.melianteSelected;

    let ref = database.ref(`users/${meliante.value}/cokes`);

    ref.transaction(cokes => {
      return {
        npagas: (cokes.npagas || 0) - 1,
        pagas: (cokes.pagas || 0) + 1
      }
    });

    toast.success(`${meliante.label} finalmente pagou uma coca!`);
    this.setState({ melianteSelected: null });

    this.getMeliantes();
  }

  render() {
    return(
      <div className="pay-coke">

        <h2>Alguém pagou</h2>

        <form onSubmit={ this.handleSubmitPay }>
          <Select
            value={ this.state.melianteSelected } onChange={ this.handleChangeMeliante }
            options={ this.state.meliantes } placeholder="Quem pagou?"
          />

          {/* <div className="inputField">
            <input type="text" placeholder="Motivo da Coke" ref="motivo" />
          </div> */}

          <button className="_btn _btn--success" type="submit">Debitar Coke</button>

        </form>

      </div>
    );
  }
}