#!/usr/bin/env -S npm run tsn -T

import 'edgen/shims/node';

import Edgen from 'edgen';

const client = new Edgen();

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
