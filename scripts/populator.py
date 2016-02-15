import os
import random
from pymongo import MongoClient
from datetime import datetime
import pprint


client = MongoClient('mongodb://patrick:olinjs@ds031922.mongolab.com:31922/tvvitter')
db = client.get_default_database()

user_coll = db['User']
tvveet_coll = db['Tvveet']

userNames = ['Patrick', 'Gaby', 'Aaron123', 'Keeks4lyfe', 'Kaigo', 'Franstan', 'Ayayron']

for name in userNames:
	user = {}
	user['username'] = name
	user['password'] = name

	user_coll.insert(user)

	pprint.pprint(user)


# tvveets = ['Gotta go to class again... #firstworldproblems', 
# 		   'Oh my god, I could go on and on about how much I fucking love minerals...',
# 		   'Sometimes, I like to sit in bed and just whisper names of harry potter characters. #sorandom',
# 		   'I got nothin good to say',
# 		   'Up to no good as usual #gubiproblems',
# 		   'Don\'t you just hate it when your Gubi can\'t stop being silly? #gubiproblems',
# 		   'I feel pain. Deep deep pain.',
# 		   'I feel like Bronco Bama should be our president again.',
# 		   'I don\'t vote #ipoteinstead',
# 		   'Have you poted yet? Election\'s coming soon bruh',
# 		   'Shine bright like a diamond! #gubiproblemsamirite',
# 		   'OMG you have to read the new buzzfeed article on Bronco Bama #HILARLAR #gubiproblems2016 #iamverysmart',
# 		   'Sometimes I sit and cry myself to sleep LOLOL SO RANDOM #randombitches']


# for content in tvveets:	
# 	tvveet = {}
# 	random_user = userNames[random.randint(0, len(userNames)-1)]

# 	tvveet['content'] = content
# 	tvveet['author'] = random_user

# 	tvveet_coll.insert(tvveet)

# 	pprint.pprint(tvveet)
