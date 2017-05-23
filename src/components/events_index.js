import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { fetchHealthFairEvents, fetchLookupParticipatingDepartments } from '../actions/index';


class EventsIndex extends Component {
    constructor(props) {
        super(props);

        this.state = { 
            Title: '',
            EventDateFrom: '', 
            EventDateTo: '', 
            Location: '', 
            SubmittingDepartment: '',
            SortField: 'Title',
            SortDirection: 'ASC',
            PageSize: 10,
            CurrentPageIndex: 1   
         };

        this.onTitleChange = this.onTitleChange.bind(this);
        this.onEventDateFromChange = this.onEventDateFromChange.bind(this);
        this.onEventDateToChange = this.onEventDateToChange.bind(this);
        this.onLocationChange = this.onLocationChange.bind(this);
        this.onSubmitingDepartmentChange = this.onSubmitingDepartmentChange.bind(this);
        this.onPageNumberChange = this.onPageNumberChange.bind(this);        
    }

    componentWillMount() {

        const SearchParameters = {
            Title: this.state.EventDateFrom,
            EventDateFrom: this.state.EventDateFrom,
            EventDateTo: this.state.EventDateTo,
            Location: this.state.Location,
            SubmittingDepartmentm: this.state.SubmittingDepartment,
            SortField: 'Title',
            SortDirection: 'ASC',
            PageSize: 10,
            CurrentPageIndex: 1
        };

        this.props.fetchHealthFairEvents(SearchParameters);        
        
        if (this.props.lupartdepts == null) {
            this.props.fetchLookupParticipatingDepartments();
        }
    }   

    onFormSubmit(op, event) {
        event.preventDefault();        

        var currentIndex = this.state.CurrentPageIndex;                
        if (op === 'next'){
            currentIndex = currentIndex + 1;            
        }

        if(op === 'prev'){            
            currentIndex = currentIndex - 1;            
        }

        if(op === 'go'){            
            currentIndex = parseInt(currentIndex);
        }
        
        const SearchParameters = {
            Title: this.state.Title,
            EventDateFrom: this.state.EventDateFrom,
            EventDateTo: this.state.EventDateTo,
            Location: this.state.Location,
            SubmittingDepartmentm: this.state.SubmittingDepartment,
            SortField: 'Title',
            SortDirection: 'ASC',
            PageSize: 10,
            CurrentPageIndex: currentIndex
        };

        this.props.fetchHealthFairEvents(SearchParameters);        
        this.setState({ CurrentPageIndex: currentIndex }); 

    }   

    onTitleChange(event) {
        this.setState({ Title: event.target.value });
    }

    onEventDateFromChange(event) {
        this.setState({ EventDateFrom: event.target.value });
    }

    onEventDateToChange(event) {
        this.setState({ EventDateTo: event.target.value });
    }

    onLocationChange(event) {
        this.setState({ Location: event.target.value });
    }

    onSubmitingDepartmentChange(event) {
        this.setState({ SubmittingDepartmentm: event.target.value });
    }

    onPageNumberChange(event) {
        this.setState({ CurrentPageIndex: event.target.value });
    }

    renderEventsRow() {
        if(!this.props.events.Results) {
            return <tr><td colSpan='6'>Loading...</td></tr>;
        }
        else if (this.props.events.Results.length === 0)
            return <tr><td colSpan='4'>No Data Found...</td></tr>;
        else
        {
        return this.props.events.Results.map((event) => {
            return (
                <tr key={event.HealthFairEventId}>
                    <td>{event.Title}</td>
                    <td>{event.SubmittingDepartment}</td>
                    <td>{event.StartDateTime}</td>
                    <td>{event.EndDateTime}</td>
                    <td>
                        <Link to={"/HealthFairEvents/events/" + event.HealthFairEventId}>View/Edit/Cancel</Link>
                    </td>
                </tr>
            );
        });
        }
    }
    
    render() {
        return (
            <form onSubmit={this.onFormSubmit.bind(this, 'filter')}>
            <div>
                <div className="spacefix"> </div>
                <div>                    
                    <div className="row">
                        <div className="col-md-1"></div>
                        <div className="col-md-2">Event Date </div>
                        <div className="col-md-3">
                            <input placeholder="9999-12-31 11:59 PM" type="datetime-local" className="form-control" value={this.state.EventDateFrom} onChange={this.onEventDateFromChange} />
                        </div>
                        <div className="col-md-2">To</div>
                        <div className="col-md-3">
                            <input placeholder="9999-12-31 11:59 PM" type="datetime-local" className="form-control" value={this.state.EventDateTo} onChange={this.onEventDateToChange} />
                        </div>
                    </div>                    
                    <div className="row">
                        <div className="col-md-1"></div>
                        <div className="col-md-2">Location</div>
                        <div className="col-md-3">
                            <input placeholder="Location" className="form-control" value={this.state.Location} onChange={this.onLocationChange} />
                        </div>                        
                        <div className="col-md-2">Submitting Department</div>
                        <div className="col-md-3">
                            <input placeholder="Submitting Department" className="form-control" value={this.state.SubmittingDepartment} onChange={this.onSubmitingDepartmentChange} />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-1"></div>
                        <div className="col-md-2">Title</div>
                        <div className="col-md-3">
                            <input placeholder="Title" className="form-control" value={this.state.Title} onChange={this.onTitleChange} />
                        </div>                        
                        <div className="col-md-2"></div>
                        <div className="col-md-3">  
                            
                        </div>
                    </div>
                     <div className="row spacefix">
                        
                    </div>
                    <div className="row">
                        <div className="col-md-3"></div>
                        <div className="col-md-3">
                            <button type="submit" name="filterbutton" value="Filter" className="btn btn-primary"><span className="glyphicon glyphicon-search spacefix"></span>Filter List</button>
                        </div>
                    </div>
                    <div className="text-right">
                        <div className="text-right col-md-10"></div>
                        <div className="col-md-2">
                            <Link to="/HealthFairEvents/events/new" className="btn btn-primary">
                                Add a Event  
                            </Link>
                        </div>
                    </div>
                </div>
                <div className="spacefix"></div>
                <div>
                    <table className="table table-striped table-hover col-md-12 col-sm-12">
                        <thead>
                            <tr>
                                <th>
                                    Title
                                </th>
                                <th>
                                    Submitting Department
                                </th>
                                <th>
                                    Start Date
                                </th>
                                    <th>
                                    End Date
                                </th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>                            
                                {this.renderEventsRow()}
                        </tbody>
                    </table>
                </div>                
                <div className="text-right">
                    <button type="submit" name="previousbutton" value="previous" className="page-link" disabled={this.state.CurrentPageIndex === 1} onClick={this.onFormSubmit.bind(this, 'prev')}>Previous</button>
                    <span className="spacefix" />Page<span className="spacefix" />
                    <input value={this.state.CurrentPageIndex} onChange={this.onPageNumberChange} />
                    <span className="spacefix" />
                    <button type="submit" name="gobutton" value="go" className="page-link" onClick={this.onFormSubmit.bind(this, 'go')}>Go</button>
                    <span className="spacefix" />of<span className="spacefix" />
                    <label>{this.props.events.TotalNumberOfPages}</label>
                    <span className="spacefix" /><button type="submit" name="nextbutton" value="next" disabled={this.state.CurrentPageIndex === this.props.events.TotalNumberOfPages} onClick={this.onFormSubmit.bind(this, 'next')}>Next</button>
                    <span className="spacefix" />Total Records: <label>{this.props.events.TotalNumberOfRecords}</label>
                </div>
               <div className="spacefix"></div>
            </div>
            </form>
        );
    }
}

function mapStateToProps(state) {
    //console.log('mapStateToProps');
    //console.log(state);
    return { 
        events: state.events.all, 
        lupartdepts: state.events.lupartdepts
    };
}

export default connect(mapStateToProps, { fetchHealthFairEvents, fetchLookupParticipatingDepartments })(EventsIndex);
