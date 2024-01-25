#!/usr/bin/env -S npm run tsn -T

import Edgen, { NotFoundError } from 'edgen';

const client = new Edgen();

async function main() {
  try {
    await client.chat.completions.create({
      messages: [{content: 'Say this is a test', role: 'user'}],
      model: 'unknown-model', // this is not an error
      stream: true,
    });
  } catch (err) {
    if (err instanceof NotFoundError) {
      console.log(`Caught NotFoundError!`);
      console.log(err);
      console.log(`message: `, err.message);
      console.log(`code: `, err.code);
      console.log(`type: `, err.type);
      console.log(`param: `, err.param);
    } else {
      console.log(`Raised unknown error`);
      throw err;
    }
  }
}

main();
