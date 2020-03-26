import React, {Component} from 'react';
// import { render } from '@testing-library/react';

export default class Button extends Component{
    render(){

        return(
            <div className={`column-${this.props.cols}`}>
                <button className="calc-button"
                onClick={()=>this.props.action(this.props.symbol)}
                >{this.props.symbol}</button>
            </div>
        )
    }
}