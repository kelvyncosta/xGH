import React, { Component } from "react";
import { database } from '../../Firebase/Firebase';
import _ from 'lodash';

import coca from '../../Content/img/coca.png';
import box from '../../Content/img/coca-box.png';

export default class Home extends Component {

  constructor() {
    super();

    this.state = { users: [] };
  }

  componentDidMount() {

    const ref = database.ref("/users");
    let users = [];

    ref.on("value", (snapshot) => {
      users = snapshot.val();
      
      users.sort((a, b) => {
        return a.cokes.npagas + a.cokes.pagas < b.cokes.npagas + b.cokes.pagas ? 1 : a.cokes.npagas + a.cokes.pagas > b.cokes.npagas + b.cokes.pagas ? -1 : 0;
      });

      this.setState({ users });
    },
    (error) => {
      console.log("Error: " + error.code);
    });
  }

  render() {
    return (
      <div className="home">
        <div className="ranking">

          {
            this.state.users.map((user, index) => {

              const boxes = Math.floor( user.cokes.pagas / 6 );
              const cokes = user.cokes.pagas % 6;

              return(
                <div className="ranking__position" key={ index }>

                  <div className="ranking__position__rank">
                    { ++index }º
                  </div>

                  <div className="ranking__position__foto">
                    <div className="fotoContainer">
                      <img src={ user.foto } alt="Foto" title={ user.nome } />
                    </div>
                  </div>

                  <div className="ranking__position__coca">
                    {
                      _.times(boxes, (index) => {
                        return (
                          <img src={ box } title="coke" key={ index } />
                        )
                      })
                    }
                    {
                      _.times(cokes, (index) => {
                        return (
                          <img src={ coca } title="coke" key={ index }/>
                        )
                      })
                    }
                    {
                      _.times(user.cokes.npagas, (index) => {
                        return (
                          <img src={ coca } title="coke" className="unpaid" key={ index }/>
                        )
                      })
                    }
                  </div>
                  
                </div>
              )
            })
          }

        </div>
      </div>
    )
  }
}
