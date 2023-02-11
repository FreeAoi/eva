import { getServerSession, Session } from 'next-auth';
import { AuthOptions } from '../api/auth/[...nextauth]';
import restClient from '../../src';
import type { GetServerSidePropsContext } from 'next';
import type { CourseDTO } from '../../src/rest';
export default function ViewCourse(props: { session: Session; course: CourseDTO }) {
    console.log(props);
    return <h1>HOLA</h1>;
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
    const query = context.query;
    const session = await getServerSession(context.req, context.res, AuthOptions);
    const course = await restClient.course.courseControllerGetCourse({
        courseId: query.id,
        authorization: `Bearer ${session?.user.acess_token}`
    });

    console.log(course);

    return {
        props: {
            session,
            course
        }
    };
}
