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

import { exists, mapValues } from '../runtime';
/**
 *
 * @export
 * @interface CreateCourseDTO
 */
export interface CreateCourseDTO {
    /**
     * Course id
     * @type {string}
     * @memberof CreateCourseDTO
     */
    courseId: string;
    /**
     * Course name
     * @type {string}
     * @memberof CreateCourseDTO
     */
    name: string;
    /**
     * Course instructor id
     * @type {string}
     * @memberof CreateCourseDTO
     */
    teacherId: string;
    /**
     * Group id
     * @type {string}
     * @memberof CreateCourseDTO
     */
    groupId: string;
}

/**
 * Check if a given object implements the CreateCourseDTO interface.
 */
export function instanceOfCreateCourseDTO(value: object): boolean {
    let isInstance = true;
    isInstance = isInstance && 'courseId' in value;
    isInstance = isInstance && 'name' in value;
    isInstance = isInstance && 'teacherId' in value;
    isInstance = isInstance && 'groupId' in value;

    return isInstance;
}

export function CreateCourseDTOFromJSON(json: any): CreateCourseDTO {
    return CreateCourseDTOFromJSONTyped(json, false);
}

export function CreateCourseDTOFromJSONTyped(
    json: any,
    ignoreDiscriminator: boolean
): CreateCourseDTO {
    if (json === undefined || json === null) {
        return json;
    }
    return {
        courseId: json['courseId'],
        name: json['name'],
        teacherId: json['teacherId'],
        groupId: json['groupId']
    };
}

export function CreateCourseDTOToJSON(value?: CreateCourseDTO | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        courseId: value.courseId,
        name: value.name,
        teacherId: value.teacherId,
        groupId: value.groupId
    };
}
