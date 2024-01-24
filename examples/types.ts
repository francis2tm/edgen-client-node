#!/usr/bin/env -S npm run tsn -T

import edgen2 from 'edgen2';

const edgen2 = new edgen2();

async function main() {
  // Explicit streaming params type:
  const streaming_params: edgen2.Chat.CompletionCreateParams = {
    model: 'gpt-4',
    messages: [{ role: 'user', content: 'Say this is a test!' }],
    stream: true,
  };

  const stream = await edgen2.chat.completions.create(streaming_params);
  for await (const chunk of stream) {
    process.stdout.write(chunk.choices[0]?.delta?.content || '');
  }
  process.stdout.write('\n');
}

main();
