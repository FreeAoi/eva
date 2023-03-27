import Link from 'next/link';

interface CourseCardProps {
    career: string;
    name: string;
    id: string;
}

export default function CourseCard(props: CourseCardProps) {
    return (
        <div className='w-full my-2 h-48 sm:w-3/6 md:w-2/6 hover:shadow-2xl hover:border-slate-300 transition duration-300 inline-block border-t-slate-400 border-y border-x'>
            <Link
                href={{
                    pathname: 'course/view',
                    query: {
                        id: props.id,
                    },
                }}
            >
                <div className='relative w-full h-4/6 bgtest'></div>
                <div className='p-1 px-2 py-3'>
                    <p className='text-slate-500 text-xs'>{props.career}</p>
                    <h1 className='text-sm text-black font-regular'>
                        {props.name}
                    </h1>
                </div>
            </Link>
        </div>
    );
}
