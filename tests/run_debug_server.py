# -*- coding=UTF-8 -*-
"""Starbound dashboard test.  """

import asyncio
import logging

import generate_test_pages
from starbound_dashboard import APP

PORT = 5001


def main():
    logging.basicConfig(level=logging.DEBUG)
    logging.info('Generate test pages')
    loop = asyncio.get_event_loop()
    loop.run_until_complete(generate_test_pages.generate())
    logging.info('Start debug server')
    APP.run('localhost', PORT, debug=True, loop=loop)


if __name__ == '__main__':
    main()
