import * as VersionAPI from 'edgen-client/resources/misc/version';
import * as Core from 'edgen-client/core';
import { APIPromise } from 'edgen-client/core';
import { APIResource } from 'edgen-client/resource';

export class Version extends APIResource {
    create(): APIPromise<edgen-clientVersion> {
        return this._client.get('/version') as APIPromise<edgen-clientVersion>;
    }
}

export interface edgen-clientVersion {
    major: number;
    minor: number;
    patch: number;
    build: string;
}

export namespace Version {
    export import Version = VersionAPI.Version;
    export import edgen-clientVersion = VersionAPI.edgen-clientVersion;
}
