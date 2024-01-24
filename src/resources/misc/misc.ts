import { APIResource } from 'edgen2/resource';
import * as VersionAPI from 'edgen2/resources/misc/version';

export class Misc extends APIResource {
    version: VersionAPI.Version = new VersionAPI.Version(this._client);
}

export namespace Misc {
    export import Version = VersionAPI.Version;
    export import edgen2Version = VersionAPI.edgen2Version;
}
