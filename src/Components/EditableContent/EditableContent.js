import React from 'react';
import PropTypes from 'prop-types';

import './EditableContent.css';

//TODO: Need to add sanitize for html!

const EditableContent = ({html, onSelect}) => {
    const handleSelect = () => {
        const selection = document.getSelection();
        const selectionText = selection.toString();
        onSelect(selectionText);
    };
    return (
        <div
            className="editable-block"
            contentEditable={true}
            onSelect={handleSelect}
            dangerouslySetInnerHTML={{__html: html}}
        />
    );
};

EditableContent.propTypes = {
    html: PropTypes.string,
    onSelect: PropTypes.func
};

export default EditableContent;