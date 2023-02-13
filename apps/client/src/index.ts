import * as rest from './rest';

const configuration = new rest.Configuration({
    basePath: 'http://localhost:3001'
});

const restClient = {
    student: new rest.StudentApi(configuration),
    course: new rest.CourseApi(configuration),
    group: new rest.GroupApi(configuration),
    auth: new rest.AuthenticationApi(configuration),
    default: new rest.DefaultApi(configuration)
};

export default restClient;