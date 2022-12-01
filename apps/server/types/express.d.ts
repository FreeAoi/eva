/* eslint-disable @typescript-eslint/no-unused-vars */
import express from 'express';

declare global {
    namespace Express {
        export interface User {
            id: string;
        }
    }
}
