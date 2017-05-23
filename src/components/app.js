import React, { Component } from 'react';

export default class App extends Component {
  render() {
    return (      
      <div>
      <div className="container body">
          <div className="row">
              <div className="col-md-5 col-xs-5 col-sm-5">                        
                  <a href="#">
                      <img alt="Carle Foundation Hospital" src="http://webdev1/HealthFairEvents/images/CarleLogo.jpg" />
                  </a>
              </div>
              <div className="col-md-7 col-xs-7 col-sm-7 text-right">
                  <h2>
                      <strong>Health Fair Events</strong>
                  </h2>
              </div>
          </div>
          <div className="panel panel-info panelTitle">
              <div className="panel-heading text-center">
                  <h2><strong>Health Fair Events</strong></h2>
                  
              </div>
          </div>
          <div>  
              {this.props.children}
          </div>          
      </div>      
      <div className="container footer">
          <div className="row">
              <p>Carle Foundation Hospital</p>
          </div>
      </div>
      </div>
    );
  }
}
