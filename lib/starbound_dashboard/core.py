"""App core."""
from quart import Quart, websocket

from . import config, filetools

APP = Quart(__name__, root_path=filetools.dist_path())
APP.config.from_object(config)
APP.config.from_pyfile(config.CONFIG_FILE, silent=True)
