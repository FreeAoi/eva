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
import type { CourseEntity } from './CourseEntity';
import {
    CourseEntityFromJSON,
    CourseEntityFromJSONTyped,
    CourseEntityToJSON
} from './CourseEntity';
import type { StudentInGroup } from './StudentInGroup';
import {
    StudentInGroupFromJSON,
    StudentInGroupFromJSONTyped,
    StudentInGroupToJSON
} from './StudentInGroup';

/**
 *
 * @export
 * @interface GroupEntity
 */
export interface GroupEntity {
    /**
     * Group id
     * @type {string}
     * @memberof GroupEntity
     */
    id: string;
    /**
     * Group name
     * @type {string}
     * @memberof GroupEntity
     */
    name: string;
    /**
     * Career id
     * @type {number}
     * @memberof GroupEntity
     */
    careerId: number;
    /**
     * Date when group was created
     * @type {Date}
     * @memberof GroupEntity
     */
    createdAt: Date;
    /**
     * Date when group was updated
     * @type {Date}
     * @memberof GroupEntity
     */
    updatedAt: Date;
    /**
     * Students in group
     * @type {Array<StudentInGroup>}
     * @memberof GroupEntity
     */
    students: Array<StudentInGroup>;
    /**
     * Courses assigned to the group
     * @type {Array<CourseEntity>}
     * @memberof GroupEntity
     */
    courses: Array<CourseEntity>;
}

/**
 * Check if a given object implements the GroupEntity interface.
 */
export function instanceOfGroupEntity(value: object): boolean {
    let isInstance = true;
    isInstance = isInstance && 'id' in value;
    isInstance = isInstance && 'name' in value;
    isInstance = isInstance && 'careerId' in value;
    isInstance = isInstance && 'createdAt' in value;
    isInstance = isInstance && 'updatedAt' in value;
    isInstance = isInstance && 'students' in value;
    isInstance = isInstance && 'courses' in value;

    return isInstance;
}

export function GroupEntityFromJSON(json: any): GroupEntity {
    return GroupEntityFromJSONTyped(json, false);
}

export function GroupEntityFromJSONTyped(
    json: any,
    ignoreDiscriminator: boolean
): GroupEntity {
    if (json === undefined || json === null) {
        return json;
    }
    return {
        id: json['id'],
        name: json['name'],
        careerId: json['careerId'],
        createdAt: new Date(json['createdAt']),
        updatedAt: new Date(json['updatedAt']),
        students: (json['students'] as Array<any>).map(StudentInGroupFromJSON),
        courses: (json['courses'] as Array<any>).map(CourseEntityFromJSON)
    };
}

export function GroupEntityToJSON(value?: GroupEntity | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        id: value.id,
        name: value.name,
        careerId: value.careerId,
        createdAt: value.createdAt.toISOString(),
        updatedAt: value.updatedAt.toISOString(),
        students: (value.students as Array<any>).map(StudentInGroupToJSON),
        courses: (value.courses as Array<any>).map(CourseEntityToJSON)
    };
}
