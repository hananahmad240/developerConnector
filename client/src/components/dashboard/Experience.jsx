import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Moment from 'react-moment';
import { connect } from 'react-redux';
import { deleteExperience } from '../../actions/profileAction';

export class Experience extends Component {
	constructor() {
		super();
	}
	onDelete(id) {
		this.props.deleteExperience(id);
	}
	render() {
		const experience = this.props.experience.map((exp) => (
			<tr key={exp._id}>
				<td> {exp.company} </td>
				<td> {exp.title} </td>
				<td>
					<Moment date={exp.from} format="YYYY/MM/DD">
						{' '}
					</Moment>
					-
					{exp.to === null ? (
						'NOW'
					) : (
						<Moment format="YYYY/MM/DD" date={exp.to}>
							{' '}
						</Moment>
					)}
				</td>
				<td>
					{' '}
					<button
						className="btn btn-danger"
						onClick={this.onDelete.bind(this, exp._id)}
					>
						Delete
					</button>{' '}
				</td>
			</tr>
		));
		return (
			<div>
				<h4 className="mb-2">Experience Credentials</h4>
				<table className="table">
					<thead>
						<tr>
							<th>Company</th>
							<th>Title</th>
							<th>Years</th>
							<th />
						</tr>
					</thead>
					<tbody>{experience}</tbody>
				</table>
			</div>
		);
	}
}

Experience.propTypes = {
	experience: PropTypes.array.isRequired,
	deleteExperience: PropTypes.func.isRequired,
};
export default connect(null, { deleteExperience })(Experience);
