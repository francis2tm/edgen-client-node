#!/usr/bin/env -S npm run tsn -T

import Edgen from 'edgen';
import { Stream } from 'edgen/streaming';

const edgen = new Edgen();

async function main() {
  // ---------------- Explicit non-streaming params ------------

  const params: Edgen.Chat.ChatCompletionCreateParams = {
    model: 'gpt-4',
    messages: [{ role: 'user', content: 'Say this is a test!' }],
  };
  const completion = await edgen.chat.completions.create(params);
  console.log(completion);

  // ---------------- Explicit streaming params ----------------

  const streamingParams: Edgen.Chat.ChatCompletionCreateParams = {
    model: 'gpt-4',
    messages: [{ role: 'user', content: 'Say this is a test!' }],
    stream: true,
  };

  const stream = await edgen.chat.completions.create(streamingParams);
  for await (const chunk of stream) {
    process.stdout.write(chunk.choices[0]?.delta?.content || '');
  }
  process.stdout.write('\n');

  // ---------------- Explicit (non)streaming types ----------------

  const params1: Edgen.Chat.ChatCompletionCreateParamsNonStreaming = {
    model: 'gpt-4',
    messages: [{ role: 'user', content: 'Say this is a test!' }],
  };

  const params2: Edgen.Chat.ChatCompletionCreateParamsStreaming = {
    model: 'gpt-4',
    messages: [{ role: 'user', content: 'Say this is a test!' }],
    stream: true,
  };

  // ---------------- Implicit params type -------------------

  // Note: the `as const` is required here so that TS can properly infer
  // the right params type.
  //
  // If you didn't include it then you'd also get an error saying that
  // `role: string` is not assignable.
  const streamingParams2 = {
    model: 'gpt-4',
    messages: [{ role: 'user' as const, content: 'Say this is a test!' }],
    stream: true as const,
  };

  // TS knows this is a Stream instance.
  const stream2 = await edgen.chat.completions.create(streamingParams2);
  for await (const chunk of stream2) {
    process.stdout.write(chunk.choices[0]?.delta?.content || '');
  }
  process.stdout.write('\n');

  // Without the `as const` for `stream`.
  const streamingParams3 = {
    model: 'gpt-4',
    messages: [{ role: 'user' as const, content: 'Say this is a test!' }],
    stream: true,
  };

  // TS doesn't know if this is a `Stream` or a direct response
  const response = await edgen.chat.completions.create(streamingParams3);
  if (response instanceof Stream) {
    // here TS knows the response type is a `Stream`
  } else {
    // here TS knows the response type is a `ChatCompletion`
  }

  // ---------------- Dynamic params type -------------------

  // TS knows this is a `Stream`
  const streamParamsFromFn = await createCompletionParams(true);
  const streamFromFn = await edgen.chat.completions.create(streamParamsFromFn);
  console.log(streamFromFn);

  // TS knows this is a `ChatCompletion`
  const paramsFromFn = await createCompletionParams(false);
  const completionFromFn = await edgen.chat.completions.create(paramsFromFn);
  console.log(completionFromFn);
}

// Dynamically construct the params object while retaining whether or
// not the response will be streamed.
export async function createCompletionParams(
  stream: true,
): Promise<Edgen.Chat.ChatCompletionCreateParamsStreaming>;
export async function createCompletionParams(
  stream: false,
): Promise<Edgen.Chat.ChatCompletionCreateParamsNonStreaming>;
export async function createCompletionParams(
  stream: boolean,
): Promise<Edgen.Chat.ChatCompletionCreateParams> {
  const params = {
    model: 'gpt-3.5-turbo',
    messages: [{ role: 'user' as const, content: 'Hello!' }],
    stream: stream,
  };

  // <your logic here>

  return params;
}

main();
