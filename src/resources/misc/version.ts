import * as VersionAPI from 'edgen2/resources/misc/version';
import * as Core from 'edgen2/core';
import { APIPromise } from 'edgen2/core';
import { APIResource } from 'edgen2/resource';

export class Version extends APIResource {
    create(): APIPromise<edgen2Version> {
        return this._client.get('/version') as APIPromise<edgen2Version>;
    }
}

export interface edgen2Version {
    major: number;
    minor: number;
    patch: number;
    build: string;
}

export namespace Version {
    export import Version = VersionAPI.Version;
    export import edgen2Version = VersionAPI.edgen2Version;
}
