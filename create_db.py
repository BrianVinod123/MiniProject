import pymongo

#Create client for database
client=pymongo.MongoClient()

db=client.Project

db.Users.create_index([("username",pymongo.ASCENDING)],unique=True)

print("Database Successfully Created")

client.close()


