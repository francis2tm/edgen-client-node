

import * as Core from './core';
import * as Pagination from './pagination';
import * as Errors from './error';
import { type Agent } from './_shims/index';
import * as Uploads from './uploads';
import * as API from 'edgen/resources/index';

export interface ClientOptions {
  /**
   * Defaults to process.env['EDGEN_API_KEY'].
   */
  apiKey?: string;

  /**
   * Defaults to process.env['EDGEN_ORG_ID'].
   */
  organization?: string | null;

  /**
   * Override the default base URL for the API, e.g., "https://api.example.com/v2/"
   *
   * Defaults to process.env['EDGEN_BASE_URL'].
   */
  baseURL?: string | null | undefined;

  /**
   * The maximum amount of time (in milliseconds) that the client should wait for a response
   * from the server before timing out a single request.
   *
   * Note that request timeouts are retried by default, so in a worst-case scenario you may wait
   * much longer than this timeout before the promise succeeds or fails.
   */
  timeout?: number;

  /**
   * An HTTP agent used to manage HTTP(S) connections.
   *
   * If not provided, an agent will be constructed by default in the Node.js environment,
   * otherwise no agent is used.
   */
  httpAgent?: Agent;

  /**
   * Specify a custom `fetch` function implementation.
   *
   * If not provided, we use `node-fetch` on Node.js and otherwise expect that `fetch` is
   * defined globally.
   */
  fetch?: Core.Fetch | undefined;

  /**
   * The maximum number of times that the client will retry a request in case of a
   * temporary failure, like a network error or a 5XX error from the server.
   *
   * @default 2
   */
  maxRetries?: number;

  /**
   * Default headers to include with every request to the API.
   *
   * These can be removed in individual requests by explicitly setting the
   * header to `undefined` or `null` in request options.
   */
  defaultHeaders?: Core.Headers;

  /**
   * Default query parameters to include with every request to the API.
   *
   * These can be removed in individual requests by explicitly setting the
   * param to `undefined` in request options.
   */
  defaultQuery?: Core.DefaultQuery;

  /**
   * By default, client-side use of this library is not allowed, as it risks exposing your secret API credentials to attackers.
   * Only set this option to `true` if you understand the risks and have appropriate mitigations in place.
   */
  dangerouslyAllowBrowser?: boolean;
}

/** API Client for interfacing with the Edgen API. */
export class Edgen extends Core.APIClient {
  apiKey: string;
  organization: string | null;

  private _options: ClientOptions;

  /**
   * API Client for interfacing with the Edgen API.
   *
   * @param {string} [opts.apiKey=process.env['EDGEN_API_KEY'] ?? undefined]
   * @param {string | null} [opts.organization=process.env['EDGEN_ORG_ID'] ?? null]
   * @param {string} [opts.baseURL=process.env['EDGEN_BASE_URL'] ?? http://127.0.0.1:3000/v1] - Override the default base URL for the API.
   * @param {number} [opts.timeout=10 minutes] - The maximum amount of time (in milliseconds) the client will wait for a response before timing out.
   * @param {number} [opts.httpAgent] - An HTTP agent used to manage HTTP(s) connections.
   * @param {Core.Fetch} [opts.fetch] - Specify a custom `fetch` function implementation.
   * @param {number} [opts.maxRetries=2] - The maximum number of times the client will retry a request.
   * @param {Core.Headers} opts.defaultHeaders - Default headers to include with every request to the API.
   * @param {Core.DefaultQuery} opts.defaultQuery - Default query parameters to include with every request to the API.
   * @param {boolean} [opts.dangerouslyAllowBrowser=false] - By default, client-side use of this library is not allowed, as it risks exposing your secret API credentials to attackers.
   */
  constructor({
    baseURL = Core.readEnv('EDGEN_BASE_URL'),
    apiKey = Core.readEnv('EDGEN_API_KEY'),
    organization = Core.readEnv('EDGEN_ORG_ID') ?? null,
    ...opts
  }: ClientOptions = {}) {
    if (apiKey === undefined) {
      apiKey = '';
    }

    const options: ClientOptions = {
      apiKey,
      organization,
      ...opts,
      baseURL: baseURL || `http://127.0.0.1:3000/v1`,
    };

    if (!options.dangerouslyAllowBrowser && Core.isRunningInBrowser()) {
      throw new Errors.EdgenError(
        "It looks like you're running in a browser-like environment.\n\nThis is disabled by default, as it risks exposing your secret API credentials to attackers.\nIf you understand the risks and have appropriate mitigations in place,\nyou can set the `dangerouslyAllowBrowser` option to `true`, e.g.,\n\nnew Edgen({ apiKey, dangerouslyAllowBrowser: true });",
      );
    }

    super({
      baseURL: options.baseURL!,
      timeout: options.timeout ?? 600000 /* 10 minutes */,
      httpAgent: options.httpAgent,
      maxRetries: options.maxRetries,
      fetch: options.fetch,
    });
    this._options = options;

    this.apiKey = apiKey;
    this.organization = organization;
  }

  completions: API.Completions = new API.Completions(this);
  chat: API.Chat = new API.Chat(this);
  audio: API.Audio = new API.Audio(this);
  misc: API.Misc = new API.Misc(this);

  protected override defaultQuery(): Core.DefaultQuery | undefined {
    return this._options.defaultQuery;
  }

  protected override defaultHeaders(opts: Core.FinalRequestOptions): Core.Headers {
    return {
      ...super.defaultHeaders(opts),
      'Edgen-Organization': this.organization,
      ...this._options.defaultHeaders,
    };
  }

  protected override authHeaders(opts: Core.FinalRequestOptions): Core.Headers {
    return { Authorization: `Bearer ${this.apiKey}` };
  }

  static Edgen = this;

  static EdgenError = Errors.EdgenError;
  static APIError = Errors.APIError;
  static APIConnectionError = Errors.APIConnectionError;
  static APIConnectionTimeoutError = Errors.APIConnectionTimeoutError;
  static APIUserAbortError = Errors.APIUserAbortError;
  static NotFoundError = Errors.NotFoundError;
  static ConflictError = Errors.ConflictError;
  static RateLimitError = Errors.RateLimitError;
  static BadRequestError = Errors.BadRequestError;
  static AuthenticationError = Errors.AuthenticationError;
  static InternalServerError = Errors.InternalServerError;
  static PermissionDeniedError = Errors.PermissionDeniedError;
  static UnprocessableEntityError = Errors.UnprocessableEntityError;
}

export const {
  EdgenError,
  APIError,
  APIConnectionError,
  APIConnectionTimeoutError,
  APIUserAbortError,
  NotFoundError,
  ConflictError,
  RateLimitError,
  BadRequestError,
  AuthenticationError,
  InternalServerError,
  PermissionDeniedError,
  UnprocessableEntityError,
} = Errors;

export import toFile = Uploads.toFile;
export import fileFromPath = Uploads.fileFromPath;

export namespace Edgen {
  // Helper functions
  export import toFile = Uploads.toFile;
  export import fileFromPath = Uploads.fileFromPath;

  export import RequestOptions = Core.RequestOptions;

  export import Page = Pagination.Page;
  export import PageResponse = Pagination.PageResponse;

  export import CursorPage = Pagination.CursorPage;
  export import CursorPageParams = Pagination.CursorPageParams;
  export import CursorPageResponse = Pagination.CursorPageResponse;

  export import Completions = API.Completions;
  export import Completion = API.Completion;
  export import CompletionChoice = API.CompletionChoice;
  export import CompletionUsage = API.CompletionUsage;
  export import CompletionCreateParams = API.CompletionCreateParams;
  export import CompletionCreateParamsNonStreaming = API.CompletionCreateParamsNonStreaming;
  export import CompletionCreateParamsStreaming = API.CompletionCreateParamsStreaming;

  export import Chat = API.Chat;
  export import ChatCompletion = API.ChatCompletion;
  export import ChatCompletionAssistantMessageParam = API.ChatCompletionAssistantMessageParam;
  export import ChatCompletionChunk = API.ChatCompletionChunk;
  export import ChatCompletionContentPart = API.ChatCompletionContentPart;
  export import ChatCompletionContentPartImage = API.ChatCompletionContentPartImage;
  export import ChatCompletionContentPartText = API.ChatCompletionContentPartText;
  export import ChatCompletionFunctionCallOption = API.ChatCompletionFunctionCallOption;
  export import ChatCompletionFunctionMessageParam = API.ChatCompletionFunctionMessageParam;
  export import ChatCompletionMessage = API.ChatCompletionMessage;
  export import ChatCompletionMessageParam = API.ChatCompletionMessageParam;
  export import ChatCompletionMessageToolCall = API.ChatCompletionMessageToolCall;
  export import ChatCompletionNamedToolChoice = API.ChatCompletionNamedToolChoice;
  export import ChatCompletionRole = API.ChatCompletionRole;
  export import ChatCompletionSystemMessageParam = API.ChatCompletionSystemMessageParam;
  export import ChatCompletionTokenLogprob = API.ChatCompletionTokenLogprob;
  export import ChatCompletionTool = API.ChatCompletionTool;
  export import ChatCompletionToolChoiceOption = API.ChatCompletionToolChoiceOption;
  export import ChatCompletionToolMessageParam = API.ChatCompletionToolMessageParam;
  export import ChatCompletionUserMessageParam = API.ChatCompletionUserMessageParam;
  export import ChatCompletionCreateParams = API.ChatCompletionCreateParams;
  export import ChatCompletionCreateParamsNonStreaming = API.ChatCompletionCreateParamsNonStreaming;
  export import ChatCompletionCreateParamsStreaming = API.ChatCompletionCreateParamsStreaming;

  export import Audio = API.Audio;
}

export default Edgen;
