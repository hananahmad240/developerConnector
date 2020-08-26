import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { addEducation } from '../../actions/profileAction';
import { Link } from 'react-router-dom';
import classnames from 'classnames';

class AddEducation extends Component {
	constructor() {
		super();
		this.state = {
			school: '',
			degree: '',
			fieldofstudy: '',
			from: '',
			to: '',
			current: false,
			description: '',
			disabled: false,
			errors: {},
		};
		this.onSubmit = this.onSubmit.bind(this);
		this.onChange = this.onChange.bind(this);
		this.onCheck = this.onCheck.bind(this);
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.error) {
			this.setState({ errors: nextProps.error });
		}
	}

	onChange(e) {
		this.setState({ [e.target.name]: e.target.value });
	}
	onCheck(e) {
		this.setState({
			disabled: !this.state.disabled,
			current: !this.state.current,
		});
	}

	onSubmit(e) {
		e.preventDefault();
		const educationData = {
			school: this.state.school,
			degree: this.state.degree,
			fieldofstudy: this.state.fieldofstudy,
			from: this.state.from,
			to: this.state.to,
			current: this.state.current,
			description: this.state.description,
		};
		// console.log(experienceData);

		this.props.addEducation(educationData, this.props.history);
	}

	render() {
		const { errors } = this.state;
		return (
			<div className="add-education">
				<div className="container">
					<div className="row">
						<div className="col-md-8 m-auto">
							<a href="dashboard.html" className="btn btn-light">
								Go Back
							</a>
							<h1 className="display-4 text-center">Add Your Education</h1>
							<p className="lead text-center">
								Add any school, bootcamp, etc that you have attended
							</p>
							<small className="d-block pb-3">* = required field</small>
							<form onSubmit={this.onSubmit}>
								<div className="form-group">
									<input
										type="text"
										className={classnames('form-control form-control-lg', {
											'is-invalid': errors.school,
										})}
										placeholder="* School Or Bootcamp"
										name="school"
										value={this.state.school}
										onChange={this.onChange}
									/>
									{errors.school && (
										<div className="is-invalid invalid-feedback">
											{errors.school}
										</div>
									)}
								</div>
								<div className="form-group">
									<input
										type="text"
										className={classnames('form-control form-control-lg', {
											'is-invalid': errors.degree,
										})}
										placeholder="* Degree Or Certificate"
										name="degree"
										value={this.state.degree}
										onChange={this.onChange}
									/>
									{errors.degree && (
										<div className="is-invalid invalid-feedback">
											{errors.degree}
										</div>
									)}
								</div>
								<div className="form-group">
									<input
										type="text"
										className={classnames('form-control form-control-lg', {
											'is-invalid': errors.fieldofstudy,
										})}
										placeholder="Field Of Study"
										name="fieldofstudy"
										value={this.state.fieldofstudy}
										onChange={this.onChange}
									/>
									{errors.fieldofstudy && (
										<div className="is-invalid invalid-feedback">
											{errors.fieldofstudy}
										</div>
									)}
								</div>
								<h6>From Date</h6>
								<div className="form-group">
									<input
										type="date"
										className={classnames('form-control form-control-lg', {
											'is-invalid': errors.from,
										})}
										name="from"
										value={this.state.from}
										onChange={this.onChange}
									/>
									{errors.from && (
										<div className="is-invalid invalid-feedback">
											{errors.from}
										</div>
									)}
								</div>
								<h6>To Date</h6>
								<div className="form-group">
									<input
										type="date"
										className="form-control form-control-lg"
										name="to"
										value={this.state.to}
										onChange={this.onChange}
										disabled={this.state.disabled ? 'disabled' : ''}
									/>
								</div>
								<div className="form-check mb-4">
									<input
										className="form-check-input"
										type="checkbox"
										name="current"
										id="current"
										checked={this.state.current}
										value={this.state.current}
										onChange={this.onCheck}
									/>
									<label className="form-check-label" htmlFor="current">
										Current Job
									</label>
								</div>
								<div className="form-group">
									<textarea
										className="form-control form-control-lg"
										placeholder="Program Description"
										name="description"
										value={this.state.description}
										onChange={this.onChange}
									></textarea>
									<small className="form-text text-muted">
										Tell us about your experience and what you learned
									</small>
								</div>
								<input type="submit" className="btn btn-info btn-block mt-4" />
							</form>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

AddEducation.propTypes = {
	error: PropTypes.object.isRequired,
	addEducation: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
	error: state.error,
});

export default connect(mapStateToProps, { addEducation })(AddEducation);
