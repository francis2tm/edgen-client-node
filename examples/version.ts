#!/usr/bin/env -S npm run tsn -T

import 'edgen2/shims/node';

import edgen2 from 'edgen2';

const client = new edgen2();

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
