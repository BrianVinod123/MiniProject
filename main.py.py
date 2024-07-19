from flask import Flask, render_template, request, redirect, url_for

app = Flask(__name__, static_url_path='/static')

# Dummy user credentials (replace with your actual authentication logic)
valid_users = {
    "user1": "password1",
    "user2": "password2"
}

# Function to check login credentials
def authenticate(username, password):
    if username in valid_users and valid_users[username] == password:
        return True
    else:
        return False

# Function to predict drug interaction
def predict_interaction(drug1, drug2):
    # Replace with your actual prediction logic
    # Example: Check if both drugs start with the same letter (dummy logic)
    if drug1[0].lower() == drug2[0].lower():
        return "Interacts"
    else:
        return "Does not interact"

# Login route
@app.route('/', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        username = request.form['username']
        password = request.form['password']
        
        if authenticate(username, password):
            return redirect(url_for('predict_interaction_page'))
        else:
            return render_template('login.html', message='Invalid username or password')

    return render_template('login.html')

# Predict interaction route
@app.route('/predict_interaction', methods=['GET', 'POST'])
def predict_interaction_page():
    if request.method == 'POST':
        drug1 = request.form['drug1']
        drug2 = request.form['drug2']
        result = predict_interaction(drug1, drug2)
        return render_template('predict_interaction.html', result=result, drug1=drug1, drug2=drug2)

    return render_template('predict_interaction.html')

if __name__ == '__main__':
    app.run(debug=True)
