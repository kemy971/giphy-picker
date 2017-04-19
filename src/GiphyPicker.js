import React, {Component, PropTypes} from 'react';
import {fetchTrending, search} from './Api';
import Masonry from 'masonry-layout';
import imagesLoaded from 'imagesloaded';
import {Overlay} from 'react-overlays';
import Popover from './Popover';
import _ from 'underscore';
import Radium from 'radium';

const gridStyle = {
    padding: "10px 5px",
    maxHeight: "400px",
    overflow: "auto",
    width: "400px",
    ":after": {
        content: '',
        display: 'block',
        clear: 'both',
    }
};

const gridItemStyle = {
    width: '33.333%',
        float: 'left',
        padding: '5px 10px',
        margin: '0 -5px',
        cursor: 'pointer',
        boxSizing: 'border-box'
};

const imgStyle = {
    display: 'block',
        maxWidth: '100%',
        borderRadius: '5px'
};

const searchInputStyle = {
    display: 'block',
        width: '100%',
        lineHeight: '30px',
        fontSize: '18px',
        backgroundColor: '#000',
        border: '0',
        color: '#fff',
        ':focus': {
        outline: 'none'
    },
    ':active': {
        outline: 'none'
    }
};



class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            show: false,
            searchResult: [],
            totalSearchResult: 0,
        };
    }

    componentWillMount() {
        this.fetchTrendingGIF();
    };

    fetchTrendingGIF() {
        fetchTrending(({data}) => {
            this.setState({data});
        })
    }

    componentDidMount() {
        let target = this.props.target();
        target.addEventListener('click', (e) => {
            e.stopPropagation();
            this.togglePicker();
        });
    }

    componentDidUpdate() {
        if (this.state.show) {
            let {grid} = this.refs;
            imagesLoaded(grid, () => {
                new Masonry(grid, {
                    itemSelector: '.grid-item',
                    columnWidth: '.grid-sizer',
                    percentPosition: true,
                });
            });
        }
    }

    _onClick(item) {
        this.props.onClick(item.images.downsized.url);
        this.togglePicker();
    }

    togglePicker() {
        this.setState({show: !this.state.show})
    }

    searchGIF() {
        search(this._searchInput.value, (resp) => {
                this.setState({searchResult: resp.data, totalSearchResult: resp.pagination.total_count});
            }
        )
    }

    getTrendingGrid() {
        return this.state.data.map((item, index) => {
                        return (
                            <div key={index} className="grid-item clickable" style={gridItemStyle} onClick={() => this._onClick(item)}>
                                <img src={item.images.fixed_width.url} style={imgStyle}/>
                            </div>
                        )
                    })
    }


    getSearchGrid() {
        return this.state.searchResult.map((item, index) => {
                            return (
                                <div key={index} className="grid-item clickable" style={gridItemStyle} onClick={() => this._onClick(item)}>
                                    <img src={item.images.fixed_width.url} style={imgStyle}/>
                                </div>
                            )
                        });

    }

    render() {
        return (
            <Overlay
                show={this.state.show}
                onHide={() => this.setState({show: false})}
                placement={"bottom"}
                target={this.props.target}
                container={document.body}
                onEnter={() => this.fetchTrendingGIF()}
                rootClose={true}
            >
                <Popover>
                    <div>
                        <input style={searchInputStyle} type="text" placeholder="Type your search..."
                               ref={(searchInput) => this._searchInput = searchInput}
                               onChange={_.debounce(() => this.searchGIF(), 1000)}/>
                    </div>
                    {this._searchInput && this._searchInput.value.length > 0 ?
                    <div>
                        <b>Results : {this.state.totalSearchResult}</b>
                    </div>
                        : null }
                    <div ref="grid" style={gridStyle}>
                        <div className="grid-sizer" style={{width: '33.333%'}}></div>
                    {this._searchInput && this._searchInput.value.length > 0 ?
                        this.getSearchGrid()
                        :
                        this.getTrendingGrid()
                    }
                    </div>
                </Popover>
            </Overlay>
        );
    }
}

App.propTypes = {
    target: PropTypes.func.isRequired,
    onClick: PropTypes.func.isRequired
};
App.defaultProps = {};

export default Radium(App);
