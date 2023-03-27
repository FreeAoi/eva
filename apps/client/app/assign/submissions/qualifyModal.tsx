'use client';

import { Fragment, useRef, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { PaperAirplaneIcon } from '@heroicons/react/24/outline';
import rest from '../../../src/rest';
import { useRouter } from 'next/navigation';

interface QualifyModalProps {
    taskId: number;
    submissionId: number;
    accessToken: string;
}

export default function QualifyModal(props: QualifyModalProps) {
    const [open, setOpen] = useState(false);
    const [qualification, setQualification] = useState(0);
    const [comment, setComment] = useState('');
    const cancelButtonRef = useRef(null);
    const router = useRouter();
    const submit = async () => {
        await rest
            .path('/api/task/{taskId}/submissions/{submissionId}')
            .method('post')
            .create()(
            {
                taskId: props.taskId as unknown as string,
                submissionId: props.submissionId as unknown as string,
                comment,
                score: qualification,
            },
            {
                headers: {
                    Authorization: `Bearer ${props.accessToken}`,
                },
            }
        );

        setOpen(false);
        router.refresh();
    };

    return (
        <div>
            <button
                type='button'
                className='text-sm font-medium text-indigo-700'
                onClick={() => setOpen(true)}
            >
                Editar
            </button>
            <Transition.Root show={open} as={Fragment}>
                <Dialog
                    as='div'
                    className='relative z-10'
                    initialFocus={cancelButtonRef}
                    onClose={setOpen}
                >
                    <Transition.Child
                        as={Fragment}
                        enter='ease-out duration-300'
                        enterFrom='opacity-0'
                        enterTo='opacity-100'
                        leave='ease-in duration-200'
                        leaveFrom='opacity-100'
                        leaveTo='opacity-0'
                    >
                        <div className='fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity' />
                    </Transition.Child>

                    <div className='fixed inset-0 z-10 overflow-y-auto'>
                        <div className='flex min-h-full items-center justify-center p-4 text-center sm:p-0'>
                            <Transition.Child
                                as={Fragment}
                                enter='ease-out duration-300'
                                enterFrom='opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95'
                                enterTo='opacity-100 translate-y-0 sm:scale-100'
                                leave='ease-in duration-200'
                                leaveFrom='opacity-100 translate-y-0 sm:scale-100'
                                leaveTo='opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95'
                            >
                                <Dialog.Panel className='relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-xl'>
                                    <div className='bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4'>
                                        <div className='sm:flex sm:items-start'>
                                            <div className='mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-gray-100 sm:mx-0 sm:h-10 sm:w-10'>
                                                <PaperAirplaneIcon
                                                    className='h-6 w-6 text-indigo-600'
                                                    aria-hidden='true'
                                                />
                                            </div>
                                            <div className='mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full'>
                                                <Dialog.Title
                                                    as='h3'
                                                    className='text-lg font-medium leading-6 text-gray-900'
                                                >
                                                    Subir entrega
                                                </Dialog.Title>
                                                <div className='mt-2'>
                                                    <p className='text-sm text-gray-500'>
                                                        Una vez subido el
                                                        archivo, no podrá ser
                                                        modificado.
                                                    </p>
                                                </div>
                                                <div className='mt-2'>
                                                    <input
                                                        type='number'
                                                        className='shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md'
                                                        placeholder='Calificación'
                                                        value={qualification}
                                                        onChange={(e) =>
                                                            setQualification(
                                                                +e.target.value
                                                            )
                                                        }
                                                    />
                                                </div>
                                                <div className='mt-2'>
                                                    <input
                                                        type='text'
                                                        className='shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md'
                                                        placeholder='Comentario'
                                                        value={comment}
                                                        onChange={(e) =>
                                                            setComment(
                                                                e.target.value
                                                            )
                                                        }
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6'>
                                        <button
                                            type='button'
                                            className='inline-flex w-full justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm'
                                            onClick={submit}
                                        >
                                            Subir
                                        </button>
                                        <button
                                            type='button'
                                            className='mt-3 inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm'
                                            onClick={() => setOpen(false)}
                                            ref={cancelButtonRef}
                                        >
                                            Cancelar
                                        </button>
                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition.Root>
        </div>
    );
}
