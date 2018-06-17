"""App config.  """

import os

SERVER_ADDRESS = 'localhost'
QUERY_SERVER_PORT = 21025
QUERY_SERVER_TIMEOUT = 1.0
STARBOUND_LOGFILE = '/srv/starbound/storage/starbound_server.log'
CONFIG_FILE = os.getenv('STARBOUND_DASHBOARD_CONFIG',
                        '/etc/starbound-dashboard/config.py')

del os
