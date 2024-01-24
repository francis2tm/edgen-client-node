import type { edgen } from './index';

export class APIResource {
  protected _client: edgen;

  constructor(client: edgen) {
    this._client = client;
  }
}
