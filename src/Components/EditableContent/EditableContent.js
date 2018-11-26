import React, { Component } from 'react';
import Highlightable from 'highlightable';

class EditableContent extends Component {

    handleSelect = (e) => {
        const selection = document.getSelection();
        this.props.onSelect(selection.toString());
    };

    render() {
        const {html} = this.props;
        return (
            <div
                className="editable-block"
                contentEditable={true}
                onSelect={this.handleSelect}
                dangerouslySetInnerHTML={{__html: html}}
            >
                {/*<Highlightable*/}
                    {/*ranges={this.state.ranges}*/}
                    {/*text={html}*/}
                    {/*onTextHighlighted={this.handleSelect}*/}
                {/*/>*/}
            </div>
        );
    }
}

export default EditableContent;