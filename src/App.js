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

    state = {
        activeSelection: '',
        formattedSelections: {}
    };

    handleSelection = (text) => {
        const {getSynonyms} = this.props;
        getSynonyms(text);
        this.setState(() => ({
            activeSelection: text
        }));
    };

    handleSelectSynonyms = (newWord) => {
        const {activeSelection, formattedSelections} = this.state;
        const activeFormattedArr = formattedSelections[activeSelection];
        const newFormattedSelections = {...formattedSelections};
        delete newFormattedSelections[activeSelection];
        this.setState({
            activeSelection: newWord,
            formattedSelections: {
                ...newFormattedSelections,
                [newWord]: activeFormattedArr
            }
        })
    };

    handleChangeFormating = (type, isSet) => {
        const {activeSelection, formattedSelections} = this.state;
        const newActiveFormatSelection = isSet
            ? [...(formattedSelections[activeSelection] || []), type]
            : (formattedSelections[activeSelection] || []).filter((item) => item !== type);
        this.setState({
            formattedSelections: {
                ...formattedSelections,
                [activeSelection]: newActiveFormatSelection
            }
        })
    };

    getFormatActive(type) {
        const {formattedSelections, activeSelection} = this.state;
        return (formattedSelections[activeSelection] || []).indexOf(type) !== -1;
    }

    render() {
        return (
            <div className="App">
                <div className="editor-container">
                    <div className="top-panel">
                          <EditButton
                              selected={this.getFormatActive(EditButton.ALLOWED_COMMANDS.BOLD)}
                              command={EditButton.ALLOWED_COMMANDS.BOLD}
                              name="B"
                              onClick={this.handleChangeFormating}
                          />
                          <EditButton
                              selected={this.getFormatActive(EditButton.ALLOWED_COMMANDS.ITALIC)}
                              command={EditButton.ALLOWED_COMMANDS.ITALIC}
                              name="I"
                              onClick={this.handleChangeFormating}
                          />
                          <EditButton
                              selected={this.getFormatActive(EditButton.ALLOWED_COMMANDS.UNDERLINE)}
                              command={EditButton.ALLOWED_COMMANDS.UNDERLINE}
                              name="_"
                              onClick={this.handleChangeFormating}
                          />
                    </div>
                    <EditableContent
                        html="You can type here whatever you want"
                        onSelect={this.handleSelection}
                    />
                </div>
                <SynonymsList onSelectWord={this.handleSelectSynonyms} />
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
