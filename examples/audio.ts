#!/usr/bin/env -S npm run tsn -T
import 'edgen-client/shims/node';

import edgen-client, { toFile } from 'edgen-client';
import fs from 'fs';

const client = new edgen-client();

async function main() {
  await demo();
}
main();

async function demo() {
  const transcription = await client.audio.transcriptions.create({
    file: fs.createReadStream("examples/audio/frost.wav"),
    model: 'whisper-1',
  });
  console.log(transcription);
}
