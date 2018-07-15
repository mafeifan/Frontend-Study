# our base image
FROM alpine:3.5

# Install python and pip
# apk is Alpine Linux package management tool
RUN apk add --update py2-pip

# upgrade pip
RUN pip install --upgrade pip

# install Python modules needed by the Python app
COPY requirements.txt /usr/src/app/
RUN pip install --no-cache-dir -r /usr/src/app/requirements.txt

# copy files required for the app to run
COPY app.py /usr/src/app/
COPY templates/index.html /usr/src/app/templates/

# tell the port number the container should expose
EXPOSE 5000

# run the application
CMD ["python", "/usr/src/app/app.py"]

####  how to run 
# docker build -t YOUR_USERNAME/my-first-flask-app .
# docker run -p 8888:5000 --name my-first-flask-app YOUR_USERNAME/myfirstapp
# open http://localhost:8888