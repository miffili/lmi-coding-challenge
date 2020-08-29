# Coding Challenge: To-Do List

## Get going

To run the server:

```bash
npm start
```

To run the client:

```bash
cd client
npm start
```

### Objective
Create a single page web application to manage a task list using React.

### Requirements
The application provides the functionality to view the list of to-do items, create them, and mark them as done. The front-end technology is based on JavaScript / HTML / CSS. Tasks are stored using a Rest service. Please realize data transfer between web client and back-end
service.

### Additional Information
The server-side implementation is provided and implemented based on Node.js. The API is documented below. Please deliver an appealing, well-crafted and creative solution. You are free to extend the feature set.

**Don't forget to polish your user interface with your flavor of CSS.**

--------------------------------------------------------

# Back-end Service

## Overview

The back-end is based on [Express](http://http://expressjs.com/), a Node.js web application framework.


## Setup

To setup the server install Node.js in Version 12.18.3 or newer from the [Node.Js Website](http://nodejs.org/).
Then run the following command in the project root.
This downloads all required dependencies to run the Server.

```bash
npm install
```

## Run the Server

Run the following command in the project root:

```bash
npm start
```

## Server Interface Description

### Get index.html

This is the main entry point, the server delivers the index.html file which is located in the project's public folder.
Static files in public are served as well.

    GET /

#### Curl example

```bash
curl http://localhost:3000/
```

#### Response

    HTTP/1.1 200 OK
    X-Powered-By: Express
    Access-Control-Allow-Origin: *
    Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept
    Content-Type: application/json; charset=utf-8
    Content-Length: 43
    Date: Tue, 11 Oct 2016 09:52:06 GMT
    Connection: keep-alive

    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <title>Todo App</title>
    </head>
    <body>
      <h1>Todo App</h1>

      TODO: build app
    </body>
    </html>

- - -


### Get a list of Tasks

This Method retrieves the list of tasks that the server currently knows about.
Restarting the server will reset the tasks since it is using an in memory storage solution.

    GET /api/tasks

#### Response

    HTTP/1.1 200 OK
    X-Powered-By: Express
    Access-Control-Allow-Origin: *
    Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept
    Content-Type: application/json; charset=utf-8
    Content-Length: 43
    Date: Tue, 11 Oct 2016 09:52:06 GMT
    Connection: keep-alive

    {
      "1": { "id": '1', "text": "Read description of programming challenge" },
      "2": { "id": "2", "text": "Implement an awesome web app" },
      "3": { "id": "3", "text": "Polish project" },
      "9": { "id": "9", "text": "Send solution to LogMeIn" }
    }

#### Curl example

```bash
curl http://localhost:3000/api/tasks
```


- - -


### Create a new Task

This will save the new task in the in memory storage.

    POST /api/tasks

#### Parameters

| Name | Type   | Description                         |
|------|--------|-------------------------------------|
| id   | string | the id of the tasks, must be unique |
| text | string | the text of the tasks               |

#### Response

    HTTP/1.1 204 No Content
    X-Powered-By: Express
    Access-Control-Allow-Origin: *
    Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept
    Date: Tue, 11 Oct 2016 09:47:41 GMT
    Connection: keep-alive

#### Curl example

```bash
curl -i \
    -H "Content-Type: application/json" \
    -X POST \
     -d '{"id":"001","text":"my great task"}' \
    http://localhost:3000/api/tasks
```


- - -


### Update a Task

This will update the task in the in memory storage.

    PUT /api/tasks/:id

#### Parameters

| Name | Type   | Description               |
|------|--------|---------------------------|
| text | string | the new text of the tasks |

#### Response

    HTTP/1.1 204 No Content
    X-Powered-By: Express
    Access-Control-Allow-Origin: *
    Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept
    Date: Tue, 11 Oct 2016 09:52:06 GMT
    Connection: keep-alive

#### Curl example

```bash
curl -i \
    -H "Content-Type: application/json" \
    -X PUT \
     -d '{"id":"001","text":"my great new task"}' \
    http://localhost:3000/api/tasks/001
```


- - -


### Delete a Task

This method will delete the task in the in memory storage.

    DELETE /api/tasks/:id

#### Response

    HTTP/1.1 204 No Content
    X-Powered-By: Express
    Access-Control-Allow-Origin: *
    Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept
    Date: Tue, 11 Oct 2016 09:52:49 GMT
    Connection: keep-alive

#### Curl example

```bash
curl -i -X DELETE http://localhost:3000/api/tasks/001
```
