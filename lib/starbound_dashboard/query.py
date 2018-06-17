"""Work with source query server.  """

import logging
from collections import namedtuple
from typing import Tuple

from valve.source.a2s import ServerQuerier

from .core import APP

LOGGER = logging.getLogger(__name__)


def server_querier():
    """Server querier for app."""

    return ServerQuerier(
        (APP.config['SERVER_ADDRESS'], APP.config['QUERY_SERVER_PORT']),
        timeout=APP.config['QUERY_SERVER_TIMEOUT'])


PlayerInfo = namedtuple('PlayerInfo', ('index', 'name', 'score', 'duration'))


def players(server: ServerQuerier) -> Tuple[PlayerInfo]:
    """Player infos.  """

    return (PlayerInfo(**i) for i in server.players()['players'])
