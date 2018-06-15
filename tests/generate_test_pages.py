
# -*- coding=UTF-8 -*-
"""Generate templates for webpack dev server.  """

from __future__ import (absolute_import, division, print_function,
                        unicode_literals)

import asyncio

import config
import filetools
from starbound_dashboard import APP


def _inject_text(js_file):
    return '<script type="text/javascript" src="{}"></script>'.format(js_file)


async def generate():
    """Generate test pages.  """
    tasks = [
        ('/', 'index.html', _inject_text('/app.js')),
    ]
    APP.config.from_object(config)
    original_root_path = APP.root_path
    APP.root_path = filetools.path('../public')
    client = APP.test_client()

    for page, filename, inject_text in tasks:
        resp = await client.get(page)
        with open(filetools.path('pages', filename), 'w', encoding='utf-8') as f:
            f.write(str(await resp.get_data(), 'utf-8'))
            f.write(inject_text)

    APP.root_path = original_root_path


def main():
    loop = asyncio.get_event_loop()
    loop.run_until_complete(generate())


if __name__ == '__main__':
    main()
