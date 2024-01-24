import { APIResource } from 'edgen/resource';
import * as VersionAPI from 'edgen/resources/misc/version';

export class Misc extends APIResource {
  version: VersionAPI.Version = new VersionAPI.Version(this._client);
}

export namespace Misc {
  export import Version = VersionAPI.Version;
  export import edgenVersion = VersionAPI.edgenVersion;
}
