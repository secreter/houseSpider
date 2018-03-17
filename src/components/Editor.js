import React from 'react'
import ReactQuill from 'react-quill';
import theme from 'react-quill/dist/quill.snow.css'; 

class MyEditor extends React.Component {
	modules={
	    toolbar: [
	      [{ 'header': [1, 2, false] }],
	      ['bold', 'italic', 'underline','strike', 'blockquote'],
	      [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
	      ['link', 'image'],
	      ['clean']
	    ],
	  }
  constructor(props) {
    super(props)
    this.state = { text: '' } // You can also pass a Quill Delta here
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(value) {
    this.setState({ text: value })
    console.log(value)
  }

  render() {
    return (
      <ReactQuill 
      	theme="snow"
      	className="my-editor"
      	modules={this.modules}
      	value={this.state.text}
        onChange={this.handleChange} />
    )
  }
}

export default MyEditor