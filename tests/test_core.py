"""Test module `watcher`. """
import pytest

from starbound_dashboard import watcher
import filetools


@pytest.mark.asyncio
async def test_chat_watch():
    lines = watcher.chat_iterator(
        filetools.path('sample/starbound_server.log'))
    async for i in lines:
        print(i)
