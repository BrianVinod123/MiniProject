import numpy as np
import pandas as pd
import keras
from sklearn.decomposition import PCA
from NLPProcess import NLPProcess
import sqlite3

vector_size = 572  # This should be aligned with the model's expectation
event_num = 65  # Number of possible events

def load_data():
    conn = sqlite3.connect("event.db")
    df_drug = pd.read_sql('SELECT * FROM drug;', conn)
    df_event = pd.read_sql('SELECT * FROM event_number;', conn)
    df_interaction = pd.read_sql('SELECT * FROM event;', conn)
    conn.close()
    return df_drug, df_event, df_interaction

def feature_vector(feature_name, df, vector_size):
    def Jaccard(matrix):
        matrix = np.array(matrix)
        numerator = matrix @ matrix.T
        denominator = np.ones(np.shape(matrix)) @ matrix.T + matrix @ np.ones(np.shape(matrix.T)) - matrix @ matrix.T
        return numerator / denominator

    all_feature = []
    drug_list = np.array(df[feature_name]).tolist()
    for i in drug_list:
        for each_feature in i.split('|'):
            if each_feature not in all_feature:
                all_feature.append(each_feature)
    feature_matrix = np.zeros((len(drug_list), len(all_feature)), dtype=float)
    df_feature = pd.DataFrame(feature_matrix, columns=all_feature)
    for i in range(len(drug_list)):
        for each_feature in df[feature_name].iloc[i].split('|'):
            if each_feature in df_feature.columns:
                df_feature.loc[i, each_feature] = 1
    sim_matrix = Jaccard(np.array(df_feature))
    pca = PCA(n_components=vector_size)
    pca.fit(sim_matrix)
    sim_matrix = pca.transform(sim_matrix)
    return sim_matrix

def prepare_single_prediction(df_drug, drugA, drugB, feature_list, model):
    d_feature = {}
    vector = np.zeros((len(df_drug), 0), dtype=float)
    for feature in feature_list:
        vector = np.hstack((vector, feature_vector(feature, df_drug, vector_size)))
    for i in range(len(df_drug)):
        d_feature[df_drug['name'].iloc[i]] = vector[i]

    if drugA not in d_feature or drugB not in d_feature:
        raise ValueError("One or both drugs not found in the data.")

    # Combine features of drugA and drugB
    input_vector = np.hstack((d_feature[drugA], d_feature[drugB]))

    # Ensure input_vector has the correct shape
    expected_shape = model.input_shape[1:]  # Remove batch dimension
    if input_vector.shape != expected_shape:
        # Adjust input_vector size if needed
        if input_vector.shape[0] > expected_shape[0]:
            input_vector = input_vector[:expected_shape[0]]
        else:
            # Padding or truncating might be required based on model input requirements
            input_vector = np.pad(input_vector, (0, expected_shape[0] - input_vector.shape[0]), mode='constant')

    input_vector = np.expand_dims(input_vector, axis=0)
    return input_vector

def predict_interaction(drugA, drugB, model, feature_list):
    df_drug, df_event, df_interaction = load_data()
    input_vector = prepare_single_prediction(df_drug, drugA, drugB, feature_list, model)
    prediction = model.predict(input_vector)

    # Debugging information
    probabilities = prediction[0]
    predicted_event_index = np.argmax(probabilities)

    print("Model output (probabilities):", probabilities)
    print("Predicted event index:", predicted_event_index)

    # Print columns for debugging
    print("Drug DataFrame columns:", df_drug.columns)
    print("Event DataFrame columns:", df_event.columns)
    print("Interaction DataFrame columns:", df_interaction.columns)

    # Get event description using the predicted event index (1-based index)
    event_row = df_event.iloc[predicted_event_index]
    event_description = event_row['event']

    return predicted_event_index, event_description

# Example drugs and features
def predict(drugA,drugB):
    feature_list = ["smile", "target", "enzyme"]

# Load the trained model
    model = keras.saving.load_model("model.keras")

# Print the model's input shape
    print("Model input shape:", model.input_shape)

# Predict and print the interaction
    predicted_event_index, event_description = predict_interaction(drugA, drugB, model, feature_list)
    print(event_description)
    event_description=event_description.replace('name',drugA,1).replace('name',drugB,1)
    print(f"The predicted interaction event for {drugA} and {drugB} is: {predicted_event_index}")
    print(f"Event description: {event_description}")
    return event_description
