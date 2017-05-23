import React, { Component, PropTypes } from 'react';
import { Field, reduxForm } from 'redux-form';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { fetchEvent, updateEvent } from '../actions/index';

class EventsShow extends Component {
 static contextTypes = {
        router: PropTypes.object
    };

    constructor(props) {
        super(props);
       
        this.state = { message: '', lu_ParticipantDepts: this.props.lupartdepts };
    }

    componentWillMount() {
        this.props.fetchEvent(this.props.params.id);
    }

    onSubmit(props) {      
        console.log('onSubmit');    

        let i = props.RecommendedParticipantsValues.indexOf('true');
        console.log(i);

        if (!i) {
            this.setState({ message: 'select atleast one participant' });
            return;
        }

        this.props.updateEvent(props)
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

    renderCheckboxList(event) {      
            console.log(event);
            return event.RecommendedParticipantsInvitationValues.map((item, index) => {                         
                        return (                                 
                             <div key={'chk-' + index} className="checkbox">
                                <label >
                                    <Field name={`RecommendedParticipantsValues.${index+1}`} component="input" type="checkbox" />
                                    <span className="spacefix" /> 
                                    {item.DepartmentName}
                                    <span className="spacefix" /> 
                                    <span className={item.InvitationStatusCSSClass}>{item.InvitationStatusText}</span>
                                    
                                </label>
                            </div>
                        );
                    });         

    }


    render() {
        const { event, handleSubmit } = this.props;
        
        if (!event) {
            return <div>Loading...</div>;
        }        
        
        return (
            <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>

                <div className="list-group-item">
                     <div className="panel panel-danger">                        
                            <strong>{ this.state.message }</strong>                        
                    </div> 
                    <div className="panel panel-success">
                        <div className="panel-heading">
                            <strong>View/Edit A Existing Event</strong>
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
                        {this.renderCheckboxList(event)}
                        </div>
                        <div className="col-md-3 text-help">
                            
                        </div>
                    </div>

                    <div className="row spacefix"></div>
                    <div className="row">
                        <div className="col-md-4 text-right"></div>
                        <div className="col-md-5">
                            <button type="submit" className="btn btn-primary">Update</button><span className="spacefix" /> 
                            <button type="submit" className="btn btn-primary">Cancel</button><span className="spacefix" /> 
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
        errors.StartDateTime = '9999/12/31 11:59 or 9999-12-31 11:59 PM PM date time format is allowed';
    }

    if (!re.test(values.EndDateTime)) {
        errors.EndDateTime = '9999/12/31 11:59 or 9999-12-31 11:59 PM PM date time format is allowed';
    }

    if (!values.Description) {
        errors.Description = 'Enter some description';
    }

    return errors;
}

const EventsShowForm = reduxForm({
    form: 'EventsShowForm', 
    enableReinitialize: true,    
    validate
})(EventsShow);

function mapStateToProps(state) {    
    return { 
        event: state.events.event,
        initialValues: state.events.event,        
        lupartdepts: state.events.lupartdepts
    };
}

export default connect(mapStateToProps, { fetchEvent, updateEvent })(EventsShowForm);

