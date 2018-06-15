"""Work with source query server.  """

from collections import namedtuple

from valve.source.a2s import ServerQuerier

from .core import APP


def server_querier():
    """Server querier for app."""

    return ServerQuerier((APP.config['SERVER_ADDRESS'], APP.config['QUERY_SERVER_PORT']))


PlayerInfo = namedtuple('PlayerInfo', ('index', 'name', 'score', 'duration'))


def players(server: ServerQuerier):
    """Player infos.  """

    return (PlayerInfo(**i) for i in server.players()['players'])
