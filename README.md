Local authentication using PassportJS and Mongoose

1. Run npm install
2. mognod (to start MongoDB)
3. node app

User accounts are saved into a 'users' collection in plain text. To view these records run: 
1. mongo users (this will connect to your mongod server and select the db users)
2. db.users.find()