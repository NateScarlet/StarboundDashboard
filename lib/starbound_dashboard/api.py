"""RESTful api.  """
import asyncio
import logging

from quart import Blueprint, jsonify, abort
from valve.source import NoResponseError

from . import query

BLUEPRINT = Blueprint('api', __name__)

LOGGER = logging.getLogger(__name__)


def handle_no_response(func):
    """Handle no response from query server.  """

    def _func(*args, **kwargs):
        try:
            return func(*args, **kwargs)
        except NoResponseError:
            abort(502)

    return _func


@BLUEPRINT.route('/server/players')
async def get_players():
    """"Get current players in server.  """

    @handle_no_response
    def _task():
        return [i._asdict() for i in query.players(query.server_querier())]

    loop = asyncio.get_event_loop()
    data = await loop.run_in_executor(None, _task)
    return jsonify(data)
