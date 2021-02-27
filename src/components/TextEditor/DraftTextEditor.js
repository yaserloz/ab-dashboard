import React, {Component} from 'react';
import RichTextEditor from 'react-rte';

class DraftTextEditor extends Component {
  state = {
    value: RichTextEditor.createValueFromString(this.props.value, 'html')
  }
  onChange = (value) => {
    this.setState({value});
    if (this.props.onChange) {
      this.props.onChange(value.toString('html'));
    }
  };

  render () {
    return (
      <RichTextEditor
        value={this.state.value}
        onChange={this.onChange}
      />
    );
  }
}

export default DraftTextEditor;
