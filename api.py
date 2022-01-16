from flask import Flask
from flask import jsonify
import requests
from flask_cors import CORS
from gevent.pywsgi import WSGIServer


app = Flask(__name__)

CORS(app)

api_key = ''

@app.route('/<query>', methods=['GET'])
def newscatcher(query):
    """
    Newscatcher API
    https://docs.newscatcherapi.com/api-docs/endpoints/search-news
    :param query: user submitted a-z string
    :return: list of found news articles
    """
    headers = {'x-api-key': api_key}
    params = {
        'q': query,
        'sort_by': 'rank',
        'page_size': 10,
        'lang': 'en',
        'search_in': 'title'
    }
    result = requests.get('https://api.newscatcherapi.com/v2/search', headers=headers, params=params).json()

    return jsonify(result.get('articles', []))

if __name__ == '__main__':
    app.debug = True
    http_server = WSGIServer(('', 8000), app)
    http_server.serve_forever()
