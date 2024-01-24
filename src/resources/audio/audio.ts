

import { APIResource } from 'edgen/resource';
import * as TranscriptionsAPI from 'edgen/resources/audio/transcriptions';

export class Audio extends APIResource {
  transcriptions: TranscriptionsAPI.Transcriptions = new TranscriptionsAPI.Transcriptions(this._client);
}

export namespace Audio {
  export import Transcriptions = TranscriptionsAPI.Transcriptions;
  export import Transcription = TranscriptionsAPI.Transcription;
  export import TranscriptionCreateParams = TranscriptionsAPI.TranscriptionCreateParams;
}
