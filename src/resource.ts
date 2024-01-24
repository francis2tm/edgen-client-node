

import type { edgen-client } from './index';

export class APIResource {
  protected _client: edgen-client;

  constructor(client: edgen-client) {
    this._client = client;
  }
}
