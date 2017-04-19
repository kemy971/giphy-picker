import React, {
    Component,
    PropTypes,
} from 'react';
import ReactDOM from 'react-dom'
import GiphyPicker from '../dist/GiphyPicker'

class Sample extends Component {
    constructor()
    {
        super();
        this.state = {
            currentGif: null
        };
    }

    _onClick(url)
    {
        this.setState({currentGif: url})
    }


    render() {
        return (
            <div>
                <div>
                    <img src={this.state.currentGif} alt="" height={"200"}/>
                </div>
                <div>
                    <button ref="btn">GIF</button>
                </div>
                <GiphyPicker onClick={(url) => this._onClick(url)} target={() => ReactDOM.findDOMNode(this.refs.btn)} />
            </div>
        );
    }
}

ReactDOM.render(<Sample/>,
    document.getElementById('root'));


