FROM python:3.11


ENV PYTHONDONTWRITEBYTECODE 1

ENV PYTHONUNBUFFERED 1
WORKDIR /code

# RUN pip install --upgrade pip
COPY requirements.txt /code/
RUN pip install -r requirements.txt

COPY django.sh /code/django.sh
COPY . /code/


RUN chmod +x /code/django.sh

ENTRYPOINT [ "/code/django.sh" ]
