Deployed Link
https://chat-bot-66lx.vercel.app/

```bash
Installation
```

1. clone the repository
2. open chatbot folder in any code editor
3. cd server
4. npm install
5. npm start
6. cd client
7. npm install
8. npm start

```bash
Chat-Bot highlights
```
A chatbot is created with responsive design which is functional over various screen sizes.

Login

1. Register with any username or password
2. Login after register
3. hello1, 0987654321 are admin credentials who has extra feature of seeing all the users and their saved chats.

![alt text](<Screenshot (29).png>)

ChatBot home

1. At the bottom is textarea of dynamic height where we can ask questions
2. Below screenshot a sample conversation is given
3. At the top Navbar contains Users which is only if user is admin and history which shows the saved chats of user
4. Option of save chat which displayed status of chat being saved on click.

![alt text](<Screenshot (30)1.png>)

Users

1. List of all users with a chat button to see their saved chat history

![alt text](<Screenshot (31).png>)

Saved Chat List

1. List of saved chats of a user

![alt text](<Screenshot (32).png>)

Saved chat

1. A saved chat session

![alt text](<Screenshot (33).png>)

```bash
ChatBot api
```
 
1. falcon-7b model of huggingface chatbot is used to get responses of the questions asked by the user.
2. prompt is given to the ai such that it knows the previous asked questions as well.
3. Response is formatted in form of result_text, summary, result_table, result_viz .
4. Handled the failure of ai in user friendly manner.
