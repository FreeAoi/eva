import { getServerSession, Session } from 'next-auth';
import CourseSVG from './courseSVG';
import { AuthOptions } from '../../../src/pages/api/auth/[...nextauth]';
import rest from '../../../src/rest';
import CourseTab from './courseTab';

export default async function ViewCourse({
    searchParams
}: {
    searchParams: { [key: string]: string | string[] | undefined };
}) {
    const session = await getServerSession(AuthOptions);
    const tabIndex = parseInt(searchParams.tabIndex as string) || 0;
    const { data: course } = await rest
        .path('/api/course/{courseId}')
        .method('get')
        .create()(
            {
                courseId: searchParams.id as string
            },
            {
                headers: {
                    Authorization: `Bearer ${session?.user.acess_token}`
                }
            }
        );

    return (
        <div>
            <div className="m-5 min-h-screen">
                <div className="p-3 flex justify-center bg-gray-100 border border-gray-300">
                    <CourseSVG name={course.name} career="Ing. en computación" />
                </div>
                <div className="my-2">
                    <CourseTab
                        course={course}
                        session={session as Session}
                        index={tabIndex}
                    />
                </div>
            </div>
        </div>
    );
}
