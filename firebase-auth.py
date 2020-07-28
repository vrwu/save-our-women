import pyrebase
from flask import *

app = Flask(__name__)

firebaseConfig = {
    'apiKey': "AIzaSyA1UYeJTygTIPNIBTLd_upZ8EsCjL5iUNs",
    'authDomain': "save-our-women-b9aef.firebaseapp.com",
    'databaseURL': "https://save-our-women-b9aef.firebaseio.com",
    'projectId': "save-our-women-b9aef",
    'storageBucket': "save-our-women-b9aef.appspot.com",
    'messagingSenderId': "53046274329",
    'appId': "1:53046274329:web:92782bf1780b708be63d88",
    'measurementId': "G-62FZQ6M0FF"
    }

firebase = pyrebase.initialize_app(firebaseConfig)
auth = firebase.auth()

@app.route('/', methods=['GET', 'POST'])

def signup():

    if request.method == 'POST':
        # retrieves email and pass from user
        email = request.form['name']
        password = request.form['pass']

        try: 
             # creates an account on database and requests for verification
            user=auth.create_user_with_email_and_password(email, password)
            auth.send_email_verification(user['idToken'])
            return 'Account Created'
            
        except:
            return 'Weak password: Password should be at least 6 characters'
    return render_template('sign-login.html')
'''
def login():
    email = request.form['name']
    password = request.form['name']

    user=auth.sign_in_with_email_and_password(email, password)
'''
if __name__ == '__main__':
    app.run()
