#!/usr/bin/env -S npm run tsn -T

import Edgen from 'edgen';

const client = new Edgen();

async function main() {
  // Non-streaming:
  /*
  const completion = await client.chat.completions.create({
    model: 'gpt-4',
    messages: [{ role: 'user', content: 'Say this is a test' }],
  });
  console.log(completion.choices[0]?.message?.content);
  */

  // Streaming:
  const stream = await client.chat.completions.create({
    model: 'gpt-4',
    messages: [{ role: 'user', content: 'Say this is a test' }],
    stream: true,
  });
  for await (const part of stream) {
    process.stdout.write(part.choices[0]?.delta?.content || '');
  }
  process.stdout.write('\n');
}

main();
