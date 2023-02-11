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
 * @interface UpdateGroupDTO
 */
export interface UpdateGroupDTO {
    /**
     * Group name
     * @type {string}
     * @memberof UpdateGroupDTO
     */
    id?: string;
    /**
     * Group name
     * @type {string}
     * @memberof UpdateGroupDTO
     */
    name?: string;
    /**
     * Career id
     * @type {number}
     * @memberof UpdateGroupDTO
     */
    careerId?: number;
}

/**
 * Check if a given object implements the UpdateGroupDTO interface.
 */
export function instanceOfUpdateGroupDTO(value: object): boolean {
    let isInstance = true;

    return isInstance;
}

export function UpdateGroupDTOFromJSON(json: any): UpdateGroupDTO {
    return UpdateGroupDTOFromJSONTyped(json, false);
}

export function UpdateGroupDTOFromJSONTyped(
    json: any,
    ignoreDiscriminator: boolean
): UpdateGroupDTO {
    if (json === undefined || json === null) {
        return json;
    }
    return {
        id: !exists(json, 'id') ? undefined : json['id'],
        name: !exists(json, 'name') ? undefined : json['name'],
        careerId: !exists(json, 'careerId') ? undefined : json['careerId']
    };
}

export function UpdateGroupDTOToJSON(value?: UpdateGroupDTO | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        id: value.id,
        name: value.name,
        careerId: value.careerId
    };
}
