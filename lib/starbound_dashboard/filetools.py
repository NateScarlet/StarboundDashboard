"""Tools for file operations.   """
import os

ROOT = os.path.abspath(os.path.dirname(__file__))


def path(*other):
    """Get path relative to this file.
    Returns:
        str -- Absolute path under root.
    """

    return os.path.abspath(os.path.join(ROOT, *other))


def dist_path(*other):
    """Get path relative to dist folder.
    Returns:
        str -- Absolute path under root.
    """

    return path('../../dist', *other)
