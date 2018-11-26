import React, { Component } from 'react';
import PropTypes from 'prop-types';

const EditButton = ({command, name, argument}) => {
    return (
        <button
            key={command}
            onMouseDown={evt => {
                evt.preventDefault();
                document.execCommand(command, false, argument); // Send the command to the browser
            }}
        >
            {name}
        </button>
    )
};

EditButton.ALLOWED_COMMANDS = {
    BOLD: 'bold',
    ITALIC: 'italic',
    UNDERLINE: 'underline'
};

EditButton.propTypes = {
    command: PropTypes.oneOf(Object.keys(EditButton.ALLOWED_COMMANDS).map(key => EditButton.ALLOWED_COMMANDS[key]))
};

export default EditButton;