

import * as Core from 'edgen/core';
import { APIResource } from 'edgen/resource';
import * as TranscriptionsAPI from 'edgen/resources/audio/transcriptions';
import { type Uploadable, multipartFormRequestOptions } from 'edgen/core';

export class Transcriptions extends APIResource {
  /**
   * Transcribes audio into the input language.
   */
  create(body: TranscriptionCreateParams, options?: Core.RequestOptions): Core.APIPromise<Transcription> {
    return this._client.post('/audio/transcriptions', multipartFormRequestOptions({ body, ...options }));
  }
}

export interface Transcription {
  text: string;
}

export interface TranscriptionCreateParams {
  /**
   * The audio file object (not file name) to transcribe, in one of these formats:
   * flac, mp3, mp4, mpeg, mpga, m4a, ogg, wav, or webm.
   */
  file: Uploadable;

  /**
   * ID of the model to use. Only `whisper-1` is currently available.
   */
  model: (string & {}) | 'whisper-1';

  /**
   * The language of the input audio. Supplying the input language in
   * [ISO-639-1](https://en.wikipedia.org/wiki/List_of_ISO_639-1_codes) format will
   * improve accuracy and latency.
   */
  language?: string;

  /**
   * An optional text to guide the model's style or continue a previous audio
   * segment.
   */
  prompt?: string;

  /**
   * The format of the transcript output, in one of these options: `json`, `text`,
   * `srt`, `verbose_json`, or `vtt`.
   */
  response_format?: 'json' | 'text' | 'srt' | 'verbose_json' | 'vtt';

  /**
   * The sampling temperature, between 0 and 1. Higher values like 0.8 will make the
   * output more random, while lower values like 0.2 will make it more focused and
   * deterministic. If set to 0, the model will use
   * [log probability](https://en.wikipedia.org/wiki/Log_probability) to
   * automatically increase the temperature until certain thresholds are hit.
   */
  temperature?: number;
}

export namespace Transcriptions {
  export import Transcription = TranscriptionsAPI.Transcription;
  export import TranscriptionCreateParams = TranscriptionsAPI.TranscriptionCreateParams;
}
