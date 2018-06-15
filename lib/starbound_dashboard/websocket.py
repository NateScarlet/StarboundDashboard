import asyncio
import logging
from collections import namedtuple
from functools import wraps

from quart import g, websocket

from .core import APP
from .watcher import log_iterator

LOGGER = logging.getLogger(__name__)

QUEUE_HUB = {}

CONNECTED_WEBSOCKET = set()


@APP.before_first_request
def start_watcher():
    """Start log watcher"""
    asyncio.ensure_future(watch_log())


def collect_websocket(func):
    """Collect connected websockets"""
    @wraps(func)
    async def _func(*args, **kwargs):
        # pylint: disable=protected-access
        CONNECTED_WEBSOCKET.add(websocket._get_current_object())
        try:
            return await func(*args, **kwargs)
        finally:
            LOGGER.debug('A client disconected')
            CONNECTED_WEBSOCKET.remove(websocket._get_current_object())
    return _func


async def broadcast(message):
    """Broadcast to all connected client.  """
    for websock in list(CONNECTED_WEBSOCKET):
        await websock.send(message)


@APP.websocket('/ws')
@collect_websocket
async def ws_connection():
    """Connection with client.  """

    LOGGER.debug('A client connected')
    await websocket.accept()
    while True:
        data = await websocket.receive()
        LOGGER.debug('Recive data from client: %s', data)


async def watch_log():
    """Log watcher.  """
    LOGGER.debug('Start watch log: %s', APP.config['STARBOUND_LOGFILE'])
    async for i in log_iterator(APP.config['STARBOUND_LOGFILE'], is_forever=True, is_from_end=True):
        LOGGER.debug('New log: %s', i)
        await broadcast(i)
