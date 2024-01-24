#!/usr/bin/env -S npm run tsn -T
import 'edgen2/shims/node';

import edgen2, { toFile } from 'edgen2';
import fs from 'fs';

const client = new edgen2();

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
