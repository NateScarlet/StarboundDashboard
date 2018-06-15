FROM python:3 AS base
ENV PIP_INDEX_URL https://mirrors.aliyun.com/pypi/simple
RUN pip install pipenv && pipenv --version

FROM base AS build
WORKDIR /app
COPY . .
RUN pipenv install --system --deploy
ENV PYTHONPATH=lib

FROM build AS test

RUN pip install pytest
RUN set -ex && python -m pytest ./tests

FROM build AS release

LABEL author="NateScarlet@Gmail.com"
CMD ["python", "-m", "starbound_dashboard", "-p", "80"]