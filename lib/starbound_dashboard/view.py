"""Web view.  """

import json

from jinja2 import Undefined
from quart import render_template

from .core import APP
from .query import players, server_querier
from .watcher import log_iterator


@APP.route('/')
async def index():
    """Main page.  """

    context = {
        'dumps': dumps,
        'logs': [],
    }
    async for i in log_iterator(APP.config['STARBOUND_LOGFILE']):
        context['logs'].append(i)

    context['logs'] = context['logs'][-100:]

    with server_querier() as server:
        context['players'] = players(server)
    return await render_template('index.html', **context)


def dumps(obj):
    """`json.dumps` for jinja template data.  """

    if isinstance(obj, Undefined):
        return ''
    return json.dumps(obj)
