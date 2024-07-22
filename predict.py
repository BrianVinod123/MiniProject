import numpy as np
import pandas as pd
import keras
from sklearn.decomposition import PCA
from sklearn.preprocessing import StandardScaler

# Load the saved model
model = keras.saving.load_model('model.keras', compile=True)

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
                df_feature.at[i, each_feature] = 1

    sim_matrix = Jaccard(np.array(df_feature))
    
    pca = PCA(n_components=vector_size)
    pca.fit(sim_matrix)
    feature_vecs = pca.transform(sim_matrix)
    
    return feature_vecs

def prepare_input_data(drugA, drugB, df_drug, feature_list, vector_size):
    # Collect feature vectors for each feature in feature_list
    feature_vectors = []

    for feature in feature_list:
        feature_vecs = feature_vector(feature, df_drug, vector_size)
        feature_vectors.append(feature_vecs)
    
    # Concatenate feature vectors from all features
    combined_feature_vectors = np.hstack(feature_vectors)
    
    # Create a mapping of drug names to their feature vectors
    drug_to_vector = dict(zip(df_drug['name'], combined_feature_vectors))
    
    if drugA not in drug_to_vector or drugB not in drug_to_vector:
        raise ValueError(f"One or both drugs not found in the dataset: {drugA}, {drugB}")

    # Prepare feature vector for the drug pair
    feature_vector_A = drug_to_vector[drugA]
    feature_vector_B = drug_to_vector[drugB]
    combined_feature = np.hstack((feature_vector_A, feature_vector_B))
    
    return np.array([combined_feature])

def predict_interaction(drugA, drugB, df_drug, feature_list, vector_size):
    input_data = prepare_input_data(drugA, drugB, df_drug, feature_list, vector_size)
    prediction = model.predict(input_data)
    predicted_class = np.argmax(prediction, axis=1)
    return predicted_class[0]


