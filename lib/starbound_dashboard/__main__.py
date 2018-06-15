""""Command line interface.  """

import argparse
import logging
from socket import gethostbyname, gethostname

from .__about__ import __version__
from .core import APP

LOGGER = logging.getLogger(__name__)


def run_server(port=5000):
    """Run csheet server at @port.  """

    host_ip = gethostbyname(gethostname())
    address = 'https://{}:{}'.format(host_ip, port)
    print(address)
    LOGGER.info('服务器运行于: %s', address)
    APP.run('0.0.0.0', port)

    return (host_ip, port)


def main():

    desc = '星界边境服务状态揭示板 {}'.format(__version__)
    parser = argparse.ArgumentParser(description=desc)
    parser.add_argument('-p', '--port', metavar='端口', type=int,
                        required=False, default=5000,
                        help='服务器运行端口')
    args = parser.parse_args()

    run_server(args.port)


if __name__ == '__main__':
    main()
