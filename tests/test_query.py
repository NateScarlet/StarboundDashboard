"""Test module `query`. """
import pytest
from starbound_dashboard import query


@pytest.mark.skip(reason="Need server")
def test_info():
    with query.server_querier() as server:
        info = server.info()
        print(info['max_players'])


@pytest.mark.skip(reason="Need server")
def test_players():
    with query.server_querier() as server:
        raise RuntimeError(list(query.players(server)))
