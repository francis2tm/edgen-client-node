#!/usr/bin/env -S npm run tsn -T

import 'edgen-client/shims/node';

import edgen-client from 'edgen-client';

const client = new edgen-client();

async function main() {
    const ver = await client.misc.version.create();
    let build = ''
    if (ver.build.length > 0) {
       build = '-' + ver.build
    }
    console.log(ver.major + "." +
                ver.minor + "." +
                ver.patch +
                ver.build
    );
}
main();
