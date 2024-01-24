import * as VersionAPI from 'edgen/resources/misc/version';
import * as Core from 'edgen/core';
import { APIPromise } from 'edgen/core';
import { APIResource } from 'edgen/resource';

export class Version extends APIResource {
    create(): APIPromise<edgenVersion> {
        return this._client.get('/version') as APIPromise<edgenVersion>;
    }
}

export interface edgenVersion {
    major: number;
    minor: number;
    patch: number;
    build: string;
}

export namespace Version {
    export import Version = VersionAPI.Version;
    export import edgenVersion = VersionAPI.edgenVersion;
}
