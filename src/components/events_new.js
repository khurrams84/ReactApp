import React, { Component, PropTypes } from 'react';
import { Field, reduxForm } from 'redux-form';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { createEvent } from '../actions/index';

class EventsNew extends Component {
    static contextTypes = {
        router: PropTypes.object
    };

    constructor(props) {
        super(props);

        this.onInputChange = this.onInputChange.bind(this);
        this.state = { message: '', lu_ParticipantDepts: this.props.lupartdepts, selectedParticipantDepts: [] };
    }

    onSubmit(props) {        
        console.log(props);
        console.log(this.state.selectedParticipantDepts);
        if (this.state.selectedParticipantDepts.length <= 0) {
            this.setState({ message: 'select atleast one participant' });
            return;
        }
        this.props.createEvent(props, this.state.selectedParticipantDepts)
            .then(() => {                
                this.context.router.push('/HealthFairEvents/');
            });   
    }

    renderField = ({ input, label, labelhint, type, meta: { touched, error } }) => (
                    <div className="row">
                        <div className="col-md-2"></div>
                        <div className="col-md-2">
                            <label>{label}</label>
                            <label>{labelhint}</label>
                        </div>                        
                        <div className="col-md-5">
                            <input {...input} placeholder={label} type={type} className="form-control" />
                        </div>
                        <div className="col-md-3 text-help">
                            {touched && error && <span>{error}</span>}
                        </div>
                    </div>
                    )

    onInputChange(e) {
        const clickedValue = e.target.value;

        //console.log(a);
        //console.log(b);
        console.log(e.target.checked);
        //console.log(this.props.lupartdepts);
        const selectedValues = this.state.selectedParticipantDepts;
        if (e.target.checked) {
            selectedValues.push(e.target.value);
        }

        if (!e.target.checked) {
            const index = selectedValues.indexOf(e.target.value);
            selectedValues.splice(index, 1);
        }
		//console.log(selectedValues);
        this.setState({ selectedParticipantDepts: selectedValues });

        console.log(this.state.selectedParticipantDepts);
    }
   

    render() {
        console.log(this.props.lupartdepts);
        const { handleSubmit, reset } = this.props;
        let options;
        options = this.props.lupartdepts.map((item, index) => {
                                    return (                               
                                        <div key={'chk-' + index} className="checkbox">
                                            <label>
                                                <input 
                                                    type="checkbox"
                                                    name={item.RecommendedParticipantId}
                                                    value={item.RecommendedParticipantId}
                                                    onChange={this.onInputChange}
                                                    checked={item.checked} 
                                                /> 
                                                {item.DepartmentName}
                                            </label>
                                        </div>
                                    );
                                });

        return (                         
            <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>                
                <div className="list-group-item">
                    <div className="panel panel-danger">  
                         <div className="panel-heading">                      
                            <strong>{ this.state.message }</strong>                        
                        </div>
                    </div>                 
                    <div className="panel panel-success">
                        <div className="panel-heading">
                            <strong>Create A New Event</strong>
                        </div>
                    </div>
                    <Field name="Title" type="text" component={this.renderField} label="Title" labelhint="" />
                    <Field name="SubmittingDepartment" type="text" component={this.renderField} label="Submitting Department" labelhint="" />
                    <Field name="Location" type="text" component={this.renderField} label="Location" labelhint="" />
                    <Field name="StartDateTime" type="datetime-local" component={this.renderField} label="Start Date and Time" labelhint="(9999-12-31 11:59 PM)" />
                    <Field name="EndDateTime" type="datetime-local" component={this.renderField} label="End Date and Time" labelhint="(9999-12-31 11:59 PM)" />
                    <Field name="Description" type="textarea" component={this.renderField} label="Description" labelhint="" />
                    
                    <div className="row">
                        <div className="col-md-2"></div>
                        <div className="col-md-2">
                            <label>Participating Departments</label>
                        </div>                        
                        <div className="col-md-5">
                            {options}
                        </div>
                        <div className="col-md-3 text-help">
                            
                        </div>
                    </div>

                    <div className="row spacefix"></div>
                    <div className="row">
                        <div className="col-md-4 text-right"></div>
                        <div className="col-md-5">
                            <button type="submit" className="btn btn-primary">Submit</button><span className="spacefix" />
                            <button type="button" onClick={reset} className="btn btn-primary">Clear Values</button><span className="spacefix" />
                            <Link to="/HealthFairEvents/" className="btn btn-danger">Back to List</Link>
                        </div>
                    </div>
                </div>

            </form>
        );
    }
}

function validate(values) {
    const errors = {};
    const re = /^(?=\d)(?:(?!(?:1582(?:\.|-|\/)10(?:\.|-|\/)(?:0?[5-9]|1[0-4]))|(?:1752(?:\.|-|\/)0?9(?:\.|-|\/)(?:0?[3-9]|1[0-3])))(?=(?:(?!000[04]|(?:(?:1[^0-6]|[2468][^048]|[3579][^26])00))(?:(?:\d\d)(?:[02468][048]|[13579][26]))\D0?2\D29)|(?:\d{4}\D(?!(?:0?[2469]|11)\D31)(?!0?2(?:\.|-|\/)(?:29|30))))(\d{4})([-\/.])(0?\d|1[012])\2((?!00)[012]?\d|3[01])(?:$|(?=\x20\d)\x20))?((?:(?:0?[1-9]|1[012])(?::[0-5]\d){0,2}(?:\x20[aApP][mM]))|(?:[01]\d|2[0-3])(?::[0-5]\d){1,2})?$/;    

    if (!values.Title) {
        errors.Title = 'Enter a title';
    }

    if (!values.SubmittingDepartment) {
        errors.SubmittingDepartment = 'Enter submitting department name';
    }

    if (!values.Location) {
        errors.Location = 'Enter a location';
    }

    if (!values.StartDateTime) {
        errors.StartDateTime = 'Enter Start Date and Time';
    }

    if (!values.EndDateTime) {
        errors.EndDateTime = 'Enter End Date and Time';
    }
    
    if (!re.test(values.StartDateTime)) {
        errors.StartDateTime = '9999/12/31 11:59 AM or 9999-12-31 11:59 PM date time format is allowed';
    }

    if (!re.test(values.EndDateTime)) {
        errors.EndDateTime = '9999/12/31 11:59 AM or 9999-12-31 11:59 PM date time format is allowed';
    }

    if (!values.Description) {
        errors.Description = 'Enter some description';
    }

    return errors;
}

function mapStateToProps(state) {
    //console.log('mapStateToProps');
    //console.log(state);
    return {         
        lupartdepts: state.events.lupartdepts
    };
}

const EventsNewForm = reduxForm({
    form: 'EventsNewForm',     
    validate
})(EventsNew);


export default connect(mapStateToProps, { createEvent })(EventsNewForm);


