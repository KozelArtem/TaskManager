
# Task manager
Simple task manager with tags
## Usage
	npm install
	npm start
## Migrations
**To create database**
```	npx sequelize db:create ```

**To up migrations**
```	npx sequelize db:migrate ```

**To down migrations**
``` npx sequelize db:migrate:undo:all ```
## API 
### Model tag
```
{
	id: int
	name: string,
	createdAt: Date,
	updateAt: Date
} 
```
| Method | Path | Return| Input|
|--------|------|-------------|------------|
GET | ``` /tags ``` | tag[] | -
GET | ``` /tags/:id ``` | tag | - 
PUT | ``` /tags/:id ``` |  tag | name
POST | ``` /tags/:id ``` | message | name
DELETE | ``` /tags/:id ``` | message | -

### Model task
```
{
	id: int
	name: string,
	description: string
	createdAt: Date,
	updateAt: Date
} 
```
| Method | Path | Return| Input|
|--------|------|-------------|------------|
GET | ``` /tasks ``` | task[] | -
GET | ``` /tasks/:id ``` | task | - 
PUT |``` /tasks/:id ``` |  task | name, description
POST | ``` /tasks/:id ``` | message | name and(or) description
DELETE | ``` /tasks/:id ``` | message | -

