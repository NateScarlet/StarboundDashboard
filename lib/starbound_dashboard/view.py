"""Web view.  """

import json

from jinja2 import Undefined
from quart import render_template, make_response

from .core import APP
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

    resp = await make_response(await render_template('index.html', **context))
    resp.cache_control.no_cache = True
    resp.cache_control.no_store = True
    resp.cache_control.must_revalidate = True
    return resp


def dumps(obj):
    """`json.dumps` for jinja template data.  """

    if isinstance(obj, Undefined):
        return ''
    return json.dumps(obj)
