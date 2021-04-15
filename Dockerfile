# Container image that runs your code
FROM python:3.7.10-alpine3.13

ENV PYTHONUNBUFFERED=1

COPY . .

RUN pip install -r requirements.txt

# Code file to execute when the docker container starts up (`entrypoint.sh`)
ENTRYPOINT ["/bin/python", "apploader.py"]