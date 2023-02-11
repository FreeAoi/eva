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
 * @interface CreateGroupDTO
 */
export interface CreateGroupDTO {
    /**
     * Group name
     * @type {string}
     * @memberof CreateGroupDTO
     */
    id: string;
    /**
     * Group name
     * @type {string}
     * @memberof CreateGroupDTO
     */
    name: string;
    /**
     * Career id
     * @type {number}
     * @memberof CreateGroupDTO
     */
    careerId: number;
    /**
     * Students ids
     * @type {Array<string>}
     * @memberof CreateGroupDTO
     */
    students: Array<string>;
}

/**
 * Check if a given object implements the CreateGroupDTO interface.
 */
export function instanceOfCreateGroupDTO(value: object): boolean {
    let isInstance = true;
    isInstance = isInstance && 'id' in value;
    isInstance = isInstance && 'name' in value;
    isInstance = isInstance && 'careerId' in value;
    isInstance = isInstance && 'students' in value;

    return isInstance;
}

export function CreateGroupDTOFromJSON(json: any): CreateGroupDTO {
    return CreateGroupDTOFromJSONTyped(json, false);
}

export function CreateGroupDTOFromJSONTyped(
    json: any,
    ignoreDiscriminator: boolean
): CreateGroupDTO {
    if (json === undefined || json === null) {
        return json;
    }
    return {
        id: json['id'],
        name: json['name'],
        careerId: json['careerId'],
        students: json['students']
    };
}

export function CreateGroupDTOToJSON(value?: CreateGroupDTO | null): any {
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
        students: value.students
    };
}
