/* tslint:disable */
/* eslint-disable */
/**
 * EVA API
 * The EVA API documentation
 *
 * The version of the OpenAPI document: 1.0.0
 *
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */

import * as runtime from '../runtime';
import type { UpdateSubmissionDTO } from '../models';
import { UpdateSubmissionDTOFromJSON, UpdateSubmissionDTOToJSON } from '../models';

export interface TaskControllerCreateTaskRequest {
    body: object;
}

export interface TaskControllerEvaluateSubmissionRequest {
    updateSubmissionDTO: UpdateSubmissionDTO;
}

/**
 * DefaultApi - interface
 *
 * @export
 * @interface DefaultApiInterface
 */
export interface DefaultApiInterface {
    /**
     *
     * @param {object} body
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof DefaultApiInterface
     */
    taskControllerCreateTaskRaw(
        requestParameters: TaskControllerCreateTaskRequest,
        initOverrides?: RequestInit | runtime.InitOverrideFunction
    ): Promise<runtime.ApiResponse<void>>;

    /**
     */
    taskControllerCreateTask(
        requestParameters: TaskControllerCreateTaskRequest,
        initOverrides?: RequestInit | runtime.InitOverrideFunction
    ): Promise<void>;

    /**
     *
     * @param {UpdateSubmissionDTO} updateSubmissionDTO
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof DefaultApiInterface
     */
    taskControllerEvaluateSubmissionRaw(
        requestParameters: TaskControllerEvaluateSubmissionRequest,
        initOverrides?: RequestInit | runtime.InitOverrideFunction
    ): Promise<runtime.ApiResponse<void>>;

    /**
     */
    taskControllerEvaluateSubmission(
        requestParameters: TaskControllerEvaluateSubmissionRequest,
        initOverrides?: RequestInit | runtime.InitOverrideFunction
    ): Promise<void>;

    /**
     *
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof DefaultApiInterface
     */
    taskControllerGetTaskRaw(
        initOverrides?: RequestInit | runtime.InitOverrideFunction
    ): Promise<runtime.ApiResponse<void>>;

    /**
     */
    taskControllerGetTask(
        initOverrides?: RequestInit | runtime.InitOverrideFunction
    ): Promise<void>;

    /**
     *
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof DefaultApiInterface
     */
    taskControllerSubmitTaskRaw(
        initOverrides?: RequestInit | runtime.InitOverrideFunction
    ): Promise<runtime.ApiResponse<void>>;

    /**
     */
    taskControllerSubmitTask(
        initOverrides?: RequestInit | runtime.InitOverrideFunction
    ): Promise<void>;
}

/**
 *
 */
export class DefaultApi extends runtime.BaseAPI implements DefaultApiInterface {
    /**
     */
    async taskControllerCreateTaskRaw(
        requestParameters: TaskControllerCreateTaskRequest,
        initOverrides?: RequestInit | runtime.InitOverrideFunction
    ): Promise<runtime.ApiResponse<void>> {
        if (requestParameters.body === null || requestParameters.body === undefined) {
            throw new runtime.RequiredError(
                'body',
                'Required parameter requestParameters.body was null or undefined when calling taskControllerCreateTask.'
            );
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';

        const response = await this.request(
            {
                path: `/api/course/{courseId}/task`,
                method: 'POST',
                headers: headerParameters,
                query: queryParameters,
                body: requestParameters.body as any
            },
            initOverrides
        );

        return new runtime.VoidApiResponse(response);
    }

    /**
     */
    async taskControllerCreateTask(
        requestParameters: TaskControllerCreateTaskRequest,
        initOverrides?: RequestInit | runtime.InitOverrideFunction
    ): Promise<void> {
        await this.taskControllerCreateTaskRaw(requestParameters, initOverrides);
    }

    /**
     */
    async taskControllerEvaluateSubmissionRaw(
        requestParameters: TaskControllerEvaluateSubmissionRequest,
        initOverrides?: RequestInit | runtime.InitOverrideFunction
    ): Promise<runtime.ApiResponse<void>> {
        if (
            requestParameters.updateSubmissionDTO === null ||
            requestParameters.updateSubmissionDTO === undefined
        ) {
            throw new runtime.RequiredError(
                'updateSubmissionDTO',
                'Required parameter requestParameters.updateSubmissionDTO was null or undefined when calling taskControllerEvaluateSubmission.'
            );
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';

        const response = await this.request(
            {
                path: `/api/course/{courseId}/task/{taskId}/submit/{submitId}`,
                method: 'PATCH',
                headers: headerParameters,
                query: queryParameters,
                body: UpdateSubmissionDTOToJSON(requestParameters.updateSubmissionDTO)
            },
            initOverrides
        );

        return new runtime.VoidApiResponse(response);
    }

    /**
     */
    async taskControllerEvaluateSubmission(
        requestParameters: TaskControllerEvaluateSubmissionRequest,
        initOverrides?: RequestInit | runtime.InitOverrideFunction
    ): Promise<void> {
        await this.taskControllerEvaluateSubmissionRaw(requestParameters, initOverrides);
    }

    /**
     */
    async taskControllerGetTaskRaw(
        initOverrides?: RequestInit | runtime.InitOverrideFunction
    ): Promise<runtime.ApiResponse<void>> {
        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request(
            {
                path: `/api/course/{courseId}/task/{taskId}`,
                method: 'GET',
                headers: headerParameters,
                query: queryParameters
            },
            initOverrides
        );

        return new runtime.VoidApiResponse(response);
    }

    /**
     */
    async taskControllerGetTask(
        initOverrides?: RequestInit | runtime.InitOverrideFunction
    ): Promise<void> {
        await this.taskControllerGetTaskRaw(initOverrides);
    }

    /**
     */
    async taskControllerSubmitTaskRaw(
        initOverrides?: RequestInit | runtime.InitOverrideFunction
    ): Promise<runtime.ApiResponse<void>> {
        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request(
            {
                path: `/api/course/{courseId}/task/{taskId}/submit`,
                method: 'POST',
                headers: headerParameters,
                query: queryParameters
            },
            initOverrides
        );

        return new runtime.VoidApiResponse(response);
    }

    /**
     */
    async taskControllerSubmitTask(
        initOverrides?: RequestInit | runtime.InitOverrideFunction
    ): Promise<void> {
        await this.taskControllerSubmitTaskRaw(initOverrides);
    }
}