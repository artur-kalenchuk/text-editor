import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

class SynonymsList extends Component {
    static propTypes = {
        synonyms: PropTypes.object
    };

    handleSelectWord = (e, word) => {
        e.preventDefault();
        document.execCommand('insertText', false, word); // Send the command to the browser
    };

    render() {
        const {synonyms} = this.props;
        return (
            <ul>
                {synonyms.data.map(({word, score}) => (
                        <li onMouseDown={(e) => this.handleSelectWord(e, word)} key={word}>{word}</li>
                    )
                )}
            </ul>
        );
    }
}

const mapStateToProps = ({synonyms}) => {
    return {
        synonyms
    };
};


export default connect(mapStateToProps)(SynonymsList);
