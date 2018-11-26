import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import './EditButton.css';

class EditButton extends Component {
    state = {
        enabledFormatting: false
    };

    handleTogleFormating = (evt) => {
        const {command, argument, onClick} = this.props;
        const {enabledFormatting} = this.state;
        evt.preventDefault();
        document.execCommand(command, false, argument);
        this.setState({enabledFormatting: !enabledFormatting});
        onClick(command, !enabledFormatting);
    };

    render() {
        const {command, name, selected} = this.props;
        return (
            <button
                className={cn({'selected': selected})}
                key={command}
                onMouseDown={this.handleTogleFormating}
            >
                {name}
            </button>
        )
    }
}

EditButton.ALLOWED_COMMANDS = {
    BOLD: 'bold',
    ITALIC: 'italic',
    UNDERLINE: 'underline'
};

EditButton.propTypes = {
    command: PropTypes.oneOf(Object.keys(EditButton.ALLOWED_COMMANDS).map(key => EditButton.ALLOWED_COMMANDS[key])),
    name: PropTypes.string,
    argument: PropTypes.string,
    selected: PropTypes.bool
};

export default EditButton;