#for using mongodb in python
import pymongo
#for api on POST method
from flask import Flask, request
#for Cross Origin Resouce Sharing
from flask_cors import CORS
#for chatbot language processing, responses
from chatterbot import ChatBot
#for training chatbot from given list
from chatterbot.trainers import ListTrainer

#api for routes
app = Flask('__name__')

# expose all resources matching /api/* to
# CORS and allows the Content-Type header, which is necessary to POST JSON
# cross origin.
CORS(app)

my_bot = ChatBot(name='Bot', read_only=True,
        logic_adapters = [
                            {
                                'import_path': 'chatterbot.logic.BestMatch',
                                'default_response': 'I am sorry, I do not understand. I am still learning. For further assistance Click https://www.db.com/contact',
                                'maximum_similarity_threshold': 0.90
                            }
                         ],
        preprocessors=['chatterbot.preprocessors.clean_whitespace',
                       'chatterbot.preprocessors.unescape_html',
                       'chatterbot.preprocessors.convert_to_ascii'])
#logic adapters and preprocessors for accurate response


#create mongodb database and collection variable
client = pymongo.MongoClient("mongodb+srv://chatbot:chatbot@cluster0.w1sug.mongodb.net/FAQ?retryWrites=true&w=majority")
db = client.FAQ
coll = db.intents

#take all collection contents in a variable
findQuery = coll.find()

queries = []

#insert all contents in collection in list
for intent in findQuery:
    for pattern in intent['patterns']:
        queries.extend([pattern, intent['responses']])

#train bot with list of content in collection
trainer = ListTrainer(my_bot)
trainer.train(queries)

@app.route('/', methods=['GET'])
def hello():
    return 'hello'

#route for bot responses according to query
@app.route('/user', methods=['POST'])
def user():
    jsonObj = request.json
    data = jsonObj['msg']
    return str(my_bot.get_response(data))

#route for updating database and train bot accordingly
@app.route('/admin', methods=['POST'])
def admin():
    obj = request.json
    patterns = obj['patterns']
    patterns = str(patterns).split(',')
    response = obj['responses']
    coll.insert_one({'patterns': patterns,'responses': response})
    new = []
    for pattern in patterns:
        new.extend([pattern,str(response)])
    trainer.train(new)
    return 'done'

#run flask for api to run on pc ip address (host='0.0.0.0')
if __name__ == '__main__':
    app.run(host="0.0.0.0", threaded=True, port=5000)
    
