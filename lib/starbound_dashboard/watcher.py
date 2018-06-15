"""Log file readers.  """
import asyncio
import re
from collections import namedtuple
import logging
LOGGER = logging.getLogger(__name__)


async def chat_iterator(logfile, is_forever=False):
    """Iterator for chats in log.

    Args:
        logfile (str): Log file path.
        is_forever (bool, optional): Defaults to False. If `is_forever` is `True`,
            iteration will never finish(wait for new logs).
    """

    async for line in log_iterator(logfile, is_forever):
        chat = parse_chat(line)
        if chat:
            yield chat


async def log_iterator(logfile, is_forever=False, is_from_end=False):
    """Iterate through log.

    Args:
        logfile (str): Log file path.
        is_forever (bool, optional): Defaults to False. If `is_forever` is `True`,
            iteration will never finish(wait for new logs).
    """

    with open(logfile, encoding='utf-8') as f:
        if is_from_end:
            f.seek(0, 2)
        while True:
            pos = f.tell()
            LOGGER.debug('File position: %s', pos)
            line = f.readline()
            if line:
                data = line.strip()
                if data:
                    yield data
            elif is_forever:
                # File may become smaller
                f.seek(0, 2)
                f.seek(min(pos, f.tell()))
                await asyncio.sleep(1)
            else:
                return

ChatData = namedtuple('ChatData', ('timestamp', 'user', 'message'))


def parse_chat(text: str):
    """Match chat data in text.

    Args:
        text (str): Starbound log.

    Returns:
        None or ChatData
    """

    match = re.match(r'\[(.+)\] \[Info\] Chat: <(.*)> (.+)', text)
    if match:
        return ChatData(*match.groups())
    return None
