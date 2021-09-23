import React from 'react';
import { Field, reduxForm } from 'redux-form';


class StreamForm extends React.Component {
  constructor() {
    super();
    this.renderError = this.renderError.bind(this);
    this.renderInput = this.renderInput.bind(this);
  }

  renderError({ error, touched }) {
    if (touched && error) {
      return <div className='ui error message'>
        <div className="header">{error}</div>
      </div>;
    }
  }
  renderInput({ input, label, meta }) {
    const className = `field ${meta.error && meta.touched ? 'error' : ''}`;
    return (
      <div className={className}>
        <label>{label}</label>
        <input {...input} autoComplete="off" />
        {this.renderError(meta)}
      </div>
    )
  }

  onSubmit = (formValue) => {
    this.props.onSubmit(formValue);
  }
  render() {
    return (
      <form onSubmit={this.props.handleSubmit(this.onSubmit)} className="ui form error">
        <Field name="title" component={this.renderInput} label="title" />
        <Field name="description" component={this.renderInput} label="desciption" />
        <button className="ui button primary submit">Submit</button>
      </form>
    )
  }
}

const validate = formValue => {
  const errors = {};
  if (!formValue.title) {
    errors.title = 'You must enter title'
  }
  if (!formValue.description) {
    errors.description = 'You must enter description'
  }
  return errors;
}

export default reduxForm({
  form: 'streamForm',
  validate: validate
})(StreamForm);

