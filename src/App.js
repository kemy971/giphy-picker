import React, {
    Component,
    PropTypes,
} from 'react';
import GiphyPicker from './GiphyPicker'
import {findDOMNode} from 'react-dom'

class App extends Component {
    constructor()
    {
        super();
        this.state = {
            url: null
        };
    }

    _handlerClick(url)
    {
        this.setState({url: url});
    }

    render() {
        return (
            <div>
                <div style={{height:"200px"}}>
                    <img src={this.state.url} height={200} />
                </div>
                <div>
                    <button ref="btn">GIFs</button>
                </div>
                <GiphyPicker target={() => findDOMNode(this.refs.btn)} onClick={(url) => this._handlerClick(url) } />
            </div>
        );
    }
}

App.propTypes = {};
App.defaultProps = {};

export default App;

