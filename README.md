# expat journal documentation

## Base Url:
https://bw-expatjournal.herokuapp.com/

## POST to /api/auth/register expects:
```
{
  "username": "username",
  "password": "password"
}
```


## POST to /api/auth/login expects:
```
{
  "username": "username",
  "password": "password"
}
```


## GET to /api/stories
##### Returns all stories


## GET to /api/stories/:id
##### id of the story you want
##### Returns story linked to that story id


## POST to /api/stories
expects:

```
{
  "title": "title",
  "location": "location",
  "date": "date",
  "description": "description",
  "storyImage": "storyImage"
}
```
## title, location, description is REQUIRED


## PUT to /api/stories/:id
##### id must be the story id
expects:
```
{
  "title": "title",
  "location": "location",
  "date": "date",
  "description": "description",
  "storyImage": "storyImage"
}
```
## title, location, description is REQUIRED


## DELETE to /api/stories/id
##### id must be the story id