import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import './SynonymsList.css';

class SynonymsList extends Component {
    static propTypes = {
        synonyms: PropTypes.array,
        isLoading: PropTypes.bool,
        onSelectWord: PropTypes.func
    };

    handleSelectWord = (e) => {
        e.preventDefault();
        document.execCommand('insertText', false, e.currentTarget.textContent);
        this.props.onSelectWord(e.currentTarget.textContent);
    };

    render() {
        const {synonyms, isLoading} = this.props;
        return (
            <div className="synonyms-list">
                <h4>Synonyms list</h4>
                {!isLoading && synonyms.length > 0 &&
                    <ul>
                        {synonyms.map(({word, score}) => (
                                <li onMouseDown={this.handleSelectWord} key={word}>{word}</li>
                            )
                        )}
                    </ul>
                }
                {
                    isLoading && <p>Loading...</p>
                }
            </div>

        );
    }
}

const mapStateToProps = ({synonyms}) => {
    return {
        synonyms: synonyms.data,
        isLoading: synonyms.loading
    };
};


export default connect(mapStateToProps)(SynonymsList);
