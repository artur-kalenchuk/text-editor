import React, { Component } from 'react';
import {connect} from 'react-redux';
import './App.css';
import EditableContent from './Components/EditableContent/EditableContent';
import EditButton from './Components/EditButton/EditButton';
import SynonymsList from './Components/SynonymsList/SynonymsList';
import {default as synonyms} from './Store/synonyms/action';

class App extends Component {
    handleSelection = (text) => {
        const {getSynonyms} = this.props;
        getSynonyms(text);
    };
    render() {
        const {synonyms} = this.props;
        console.log(synonyms);
        return (
          <div className="App">
            <EditButton command={EditButton.ALLOWED_COMMANDS.BOLD} name="B" />
            <EditableContent
                html="test text"
                onSelect={this.handleSelection}
            />
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
