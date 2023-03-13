import * as rest from './rest';

const configuration = new rest.Configuration({
    basePath: 'http://localhost:3001'
});

const restClient = {
    student: new rest.StudentApi(configuration),
    course: new rest.CourseApi(configuration),
    auth: new rest.AuthenticationApi(configuration),
    task: new rest.TaskApi(configuration),
    teacher: new rest.TeacherApi(configuration)
};

export default restClient;
