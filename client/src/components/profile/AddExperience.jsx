import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { addExperience } from '../../actions/profileAction';
import { Link } from 'react-router-dom';
import classnames from 'classnames';

class AddExperience extends Component {
	constructor() {
		super();
		this.state = {
			title: '',
			company: '',
			location: '',
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

	componentDidMount() {}

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
		const experienceData = {
			title: this.state.title,
			company: this.state.company,
			location: this.state.location,
			from: this.state.from,
			to: this.state.to,
			current: this.state.current,
			description: this.state.description,
		};
		// console.log(experienceData);

		this.props.addExperience(experienceData, this.props.history);
	}

	render() {
		const { errors } = this.state;
		return (
			<div className="section add-experience">
				<div className="container">
					<div className="row">
						<div className="col-md-8 m-auto">
							<a href="dashboard.html" className="btn btn-light">
								Go Back
							</a>
							<h1 className="display-4 text-center">Add Your Experience</h1>
							<p className="lead text-center">
								Add any developer/programming positions that you have had in the
								past
							</p>
							<small className="d-block pb-3">* = required field</small>

							<form onSubmit={this.onSubmit}>
								<div className="form-group">
									<input
										type="text"
										className={classnames('form-control form-control-lg', {
											'is-invalid': errors.title,
										})}
										placeholder="* Job Title"
										name="title"
										value={this.state.title}
										onChange={this.onChange}
									/>
									{errors.title && (
										<div className="is-invalid invalid-feedback">
											{errors.title}
										</div>
									)}
								</div>

								<div className="form-group">
									<input
										type="text"
										className={classnames('form-control form-control-lg', {
											'is-invalid': errors.company,
										})}
										placeholder="* Company"
										name="company"
										value={this.state.company}
										onChange={this.onChange}
									/>
									{errors.company && (
										<div className="is-invalid invalid-feedback">
											{errors.company}
										</div>
									)}
								</div>

								<div className="form-group">
									<input
										type="text"
										className="form-control form-control-lg"
										placeholder="Location"
										name="location"
										value={this.state.location}
										onChange={this.onChange}
									/>
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
										value={this.state.current}
										checked={this.state.current}
										onChange={this.onCheck}
									/>
									<label className="form-check-label" htmlFor="current">
										Current Job
									</label>
								</div>
								<div className="form-group">
									<textarea
										className="form-control form-control-lg"
										placeholder="Job Description"
										name="description"
										value={this.state.description}
										onChange={this.onChange}
									></textarea>
									<small className="form-text text-muted">
										Some of your responsabilities, etc
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

AddExperience.propTypes = {
	error: PropTypes.object.isRequired,
	addExperience: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
	error: state.error,
});

export default connect(mapStateToProps, { addExperience })(AddExperience);
