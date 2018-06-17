""""Dashboard for starbound server.  """

from .core import APP
from . import view
from . import websocket
from . import api

APP.register_blueprint(api.BLUEPRINT, url_prefix='/api')
