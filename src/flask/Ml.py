from flask import Flask, request, jsonify
from flask_cors import CORS  # Import CORS from flask_cors module
import pickle
import torchxrayvision as xrv
import skimage
import torch
import torchvision

app = Flask(__name__)
CORS(app)  # Add CORS support to your Flask app

# Load the pre-trained model
model = xrv.models.DenseNet(weights="densenet121-res224-all")

# Define image transformation
transform = torchvision.transforms.Compose([
    xrv.datasets.XRayCenterCrop(),
    xrv.datasets.XRayResizer(224),
])

def process_image(image_path):
    # Prepare the image
    img = skimage.io.imread(image_path)
    img = xrv.datasets.normalize(img, 255)  # convert 8-bit image to [-1024, 1024] range
    img = img.mean(2)[None, ...]  # Make single color channel

    # Apply transformations
    img = transform(img)
    img = torch.from_numpy(img)

    # Get model predictions
    outputs = model(img[None, ...])
    predictions = dict(zip(model.pathologies, outputs[0].detach().numpy()))
    
    return predictions

@app.route('/predict', methods=['POST'])
def predict():
    if 'image' not in request.files:
        return jsonify({'error': 'No image provided'})
    
    image = request.files['image']
    if image.filename == '':
        return jsonify({'error': 'No selected file'})
    
    # Save the image temporarily
    image_path = 'temp_image.jpg'
    image.save(image_path)

    # Process the image and get predictions
    predictions = process_image(image_path)

    # Delete the temporary image file
    import os
    os.remove(image_path)

    return jsonify(predictions)

if __name__ == '__main__':
    app.run(debug=True)
