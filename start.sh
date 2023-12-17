#!/bin/bash
docker build -t transport-security-web:v2.0 .
docker run -p 6300:6300 --name transport-security-web-container -d transport-security-web:v2.0
