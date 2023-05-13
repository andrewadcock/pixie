# syntax=docker/dockerfile:1
FROM python:3.9

ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

WORKDIR /code

COPY requirements.txt .

RUN pip install -r requirements.txt --upgrade pip pipenv flake8

COPY . /code/

#lint
RUN flake8 --ignore=E501,F401 .
