import { APIResource } from 'edgen-client/resource';
import * as VersionAPI from 'edgen-client/resources/misc/version';

export class Misc extends APIResource {
    version: VersionAPI.Version = new VersionAPI.Version(this._client);
}

export namespace Misc {
    export import Version = VersionAPI.Version;
    export import edgen-clientVersion = VersionAPI.edgen-clientVersion;
}
