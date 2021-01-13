import React, { Component } from 'react'
import Input from './Input'

class InputResult extends Component {
    constructor() {
        super();
        this.state = {
            loading: false,
            error: false,
            place: [],
            zipCode: ""
        }
    } 
   
    fetchZip = async (zip) => {
        try {
        const url = 'http://ctp-zip-api.herokuapp.com/zip/' + zip;
        const response = await fetch(url);
        console.log(response);
        if(response.status !== 200) {
            throw new Error("Error");
        }
        const data = await response.json();
        this.setState({place: data, loading: false});
        console.log(data);
        } catch(error) {
            console.log(error);
            this.setState({
                error: true
            })
        }
        
    }
    handleChange = (event) => {
        let name = event.target.name;
        let value = event.target.value;
        this.setState({
            [name]: value
        })
        //fetch data 
        this.fetchZip(value)
    }

    render() {
        return (
            <div>
            <Input handleChange={this.handleChange} />
            {this.state.loading ? (
              <div>loading...</div>
            ) : (
              <div>
                {this.state.place.map((item, index) => (
                  <div className="card">
                    <div className="card-body" key={index}>
                      <div className="card-title fw-bold">
                        {item.City}, {item.State}
                      </div>
                      <div>
                        Estimated Population: {item.EstimatedPopulation}
                        <br />
                        Coordinates: <b>X</b>: {item.Xaxis}, <b>Y</b>: {item.Yaxis},{" "}
                        <b>Z</b>: {item.Zaxis}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        );
    }
}


export default InputResult;