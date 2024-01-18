#!/usr/bin/env -S npm run tsn -T
import 'edgen/shims/node';

import Edgen, { toFile } from 'edgen';
import fs from 'fs';

const client = new Edgen();

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
