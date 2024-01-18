

import type { Edgen } from './index';

export class APIResource {
  protected _client: Edgen;

  constructor(client: Edgen) {
    this._client = client;
  }
}
