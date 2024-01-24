

import type { edgen2 } from './index';

export class APIResource {
  protected _client: edgen2;

  constructor(client: edgen2) {
    this._client = client;
  }
}
