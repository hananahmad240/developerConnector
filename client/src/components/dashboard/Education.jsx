import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Moment from 'react-moment';
import { connect } from 'react-redux';
import { deleteEducation } from '../../actions/profileAction';

export class Education extends Component {
	constructor() {
		super();
	}
	onDelete(id) {
		console.log(id);

		this.props.deleteEducation(id);
	}
	render() {
		const education = this.props.education.map((exp) => (
			<tr key={exp._id}>
				<td> {exp.school} </td>
				<td> {exp.degree} </td>
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
				<h4 className="mb-2">Education Credentials</h4>
				<table className="table">
					<thead>
						<tr>
							<th>School</th>
							<th>Degree</th>
							<th>Years</th>
							<th />
						</tr>
					</thead>
					<tbody>{education}</tbody>
				</table>
			</div>
		);
	}
}

Education.propTypes = {
	education: PropTypes.array.isRequired,
	deleteEducation: PropTypes.func.isRequired,
};

export default connect(null, { deleteEducation })(Education);
