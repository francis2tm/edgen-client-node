#!/usr/bin/env -S npm run tsn -T

import edgen-client from 'edgen-client';

const edgen-client = new edgen-client();

async function main() {
  // Explicit streaming params type:
  const streaming_params: edgen-client.Chat.CompletionCreateParams = {
    model: 'gpt-4',
    messages: [{ role: 'user', content: 'Say this is a test!' }],
    stream: true,
  };

  const stream = await edgen-client.chat.completions.create(streaming_params);
  for await (const chunk of stream) {
    process.stdout.write(chunk.choices[0]?.delta?.content || '');
  }
  process.stdout.write('\n');
}

main();
