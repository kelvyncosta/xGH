import React, { Component } from "react";
import { database } from '../../Firebase/Firebase';
import _ from 'lodash';

import coca from '../../Content/img/coca.png';

export default class Home extends Component {

  tmpUser = [];

  constructor() {
    super();

    this.state = {users : []};
  }

  componentDidMount() {
    const ref = database.ref("/users").orderByChild("cokes/pagas");

    ref.on("child_added", (snapshot) => {
      this.tmpUser.push(snapshot.val());
      this.setState({users: this.tmpUser});
    },
    (error) => {
      console.log("Error: " + error.code);
    })
  }

  render() {
    return (
      <div className="ranking">

        {
          this.state.users.slice(0).reverse().map((user, index) => {
            return(
              <div className="ranking__position" key="index">

                <div className="ranking__position__rank">
                  {++index}º
                </div>

                <div className="ranking__position__foto">
                  <div className="fotoContainer">
                    <img src={user.foto} alt="Foto" title={user.nome} />
                  </div>
                </div>

                <div className="ranking__position__coca">
                  {
                    _.times(user.cokes.pagas, () => {
                      return (
                        <img src={coca} title="coke"/>
                      )
                    })
                  }
                </div>
                
              </div>
            )
          })
        }

      </div>
    )
  }
}
