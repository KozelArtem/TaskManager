
# Task manager
Simple task manager with tags
## Usage
**Configure email account** 
```config/nodemailer.json```
**Instal all dependencies**
	npm install
**Start app**
	npm start
## Database
**To create database**
```npx sequelize db:create```

**To up migrations**
```npx sequelize db:migrate```

**To down migrations**
```npx sequelize db:migrate:undo:all```

**To create example database**
```npx sequelize db:seed:all```

**To clear database**
```npx sequelize db:seed:all:undo```
## API 
[Postman docs](https://documenter.getpostman.com/view/7637760/S1TR4zLm?version=latest)