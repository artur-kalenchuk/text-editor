import React, { Component } from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import './App.css';
import EditableContent from './Components/EditableContent/EditableContent';
import EditButton from './Components/EditButton/EditButton';
import SynonymsList from './Components/SynonymsList/SynonymsList';
import {default as synonyms} from './Store/synonyms/action';

export class App extends Component {
    static propTypes = {
        getSynonyms: PropTypes.func
    };
    handleSelection = (text) => {
        const {getSynonyms} = this.props;
        getSynonyms(text);
    };
    render() {
        return (
            <div className="App">
                <div className="editor-container">
                    <div className="top-panel">
                          <EditButton command={EditButton.ALLOWED_COMMANDS.BOLD} name="B" />
                          <EditButton command={EditButton.ALLOWED_COMMANDS.ITALIC} name="I" />
                          <EditButton command={EditButton.ALLOWED_COMMANDS.UNDERLINE} name="_" />
                    </div>
                    <EditableContent
                        html="You can type here whatever you want"
                        onSelect={this.handleSelection}
                    />
                </div>
                <SynonymsList />
            </div>
        );
    }
}

const mapDispatchToProps = dispatch => ({
    getSynonyms: (word) => {
        return dispatch(synonyms.get(word));
    }
});

export default connect(null, mapDispatchToProps)(App);
