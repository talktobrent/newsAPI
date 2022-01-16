# newsAPI
- Utilzies [Newscatcher API](https://docs.newscatcherapi.com/api-docs/endpoints/search-news) to deliver search results
- Basic API running on Ubuntu/Python/Flask
- Basic front end using HTML and Javascript
    
## Goto: [http://144.217.13.121](http://144.217.13.121)

## features
- enter keywords to return up to 10 news articles
- search history and results stack down the page
- duplicate searches are caught, and position the viewport to the existing results
- loading ticker appears while api fetches
- search keywords are validated on the front end
- displays error message if news not found

## requirements
- host server (VPS)
- ubuntu
- nginx server
- python3
- python packages: flask, requests, flask-cors, gevent
