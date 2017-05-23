import axios from 'axios';

export const FETCH_EVENTS = 'FETCH_HEALTHFAIREVENTS';
export const CREATE_EVENT = 'CREATE_EVENT';
export const FETCH_EVENT = 'FETCH_EVENT'; 
export const UPDATE_EVENT = 'UPDATE_EVENT';

export const FETCH_LOOKUP_PARTICIPATING_DEPARTMENTS = 'FETCH_LOOKUP_PARTICIPATING_DEPARTMENTS';

const HEALTHFAIREVENTS_URL = 'http://webdev1/HealthFairEventsMVC/api/HealthFairEvents';
const LU_PARTICIPATING_DEPARTMENTS_URL = 'http://webdev1/HealthFairEventsMVC/api/LU_RecommendedParticipants';

export function fetchHealthFairEvents(searchParameters) {
    //console.log(searchParameters);
    const request = axios({
                            method: 'post',
                            url: `${HEALTHFAIREVENTS_URL}/HealthFairEventSL`,
                            data: {
                                    "Title": searchParameters.Title,                                
                                    "EventDateFrom": searchParameters.EventDateFrom,
                                    "EventDateTo": searchParameters.EventDateTo,
                                    "Location": searchParameters.Location,
                                    "SubmittingDepartment": searchParameters.SubmittingDepartment,
                                    "SortField": searchParameters.SortField,
                                    "SortDirection": searchParameters.SortDirection,
                                    "PageSize": searchParameters.PageSize,
                                    "CurrentPageIndex": searchParameters.CurrentPageIndex
                                },                            
                            headers: {
                                'Access-Control-Allow-Origin': '*'
                                } 
                            });
   
    return {
        type: FETCH_EVENTS,
        payload: request
    };
}

export function createEvent(props, selectedParticipantDepts) {    
    console.log(props);
    console.log(selectedParticipantDepts);

    const recms = [];   

    selectedParticipantDepts.map((item) => {
                                            recms.push({
                                                ParticipantId: 1,
                                                HealthFairEventId: 1,
                                                RecomendedParticipantId: item });
                                        });
    
    const request = axios({
                            method: 'post',
                            url: `${HEALTHFAIREVENTS_URL}/PostHealthFairEvent`,
                            data: {                                
                                    "HealthFairEventId": 1,
                                    "Title": props.Title,
                                    "SubmittingDepartment": props.SubmittingDepartment,
                                    "Location": props.Location,
                                    "StartDateTime": props.StartDateTime,
                                    "EndDateTime": props.EndDateTime,
                                    "Description": props.Description,
                                    "RecommendedParticipants": recms
                                },                            
                            headers: {
                                'Access-Control-Allow-Origin': '*'
                                } 
                            });

    return {
        type: CREATE_EVENT,
        payload: request
    };
}

export function fetchEvent(id) {
    const request = axios.get(`${HEALTHFAIREVENTS_URL}/GetHealthFairEvent/${id}`);
    
    return {
        type: FETCH_EVENT,
        payload: request
    };
}

export function fetchLookupParticipatingDepartments() {
    const request = axios.get(`${LU_PARTICIPATING_DEPARTMENTS_URL}/GetLU_RecommendedParticipants`);

    return {
        type: FETCH_LOOKUP_PARTICIPATING_DEPARTMENTS,
        payload: request
    };
}


export function updateEvent(props) {    
    console.log(props);    
    
    const request = axios({
                            method: 'put',
                            url: `${HEALTHFAIREVENTS_URL}/PutHealthFairEvent/${props.HealthFairEventId}`,
                            data: {                                
                                    "HealthFairEventId": props.HealthFairEventId,
                                    "Title": props.Title,
                                    "SubmittingDepartment": props.SubmittingDepartment,
                                    "Location": props.Location,
                                    "StartDateTime": props.StartDateTime,
                                    "EndDateTime": props.EndDateTime,
                                    "Description": props.Description,
                                    "RecommendedParticipantsValues": props.RecommendedParticipantsValues
                                },                            
                            headers: {
                                'Access-Control-Allow-Origin': '*'
                                } 
                            });

    return {
        type: UPDATE_EVENT,
        payload: request
    };
}
