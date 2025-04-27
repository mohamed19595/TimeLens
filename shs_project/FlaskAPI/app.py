from flask import Flask, Response
import cv2
import json

app = Flask(__name__)

@app.route('/')
def hello_world():
    response = {
        "message": "Hello World!"
    }
    return json.dumps(response)

camera = cv2.VideoCapture(0)

def generate_frames():
    while True:
        # Read the frame from the webcam
        success, frame = camera.read()
        if not success:
            break
        else:
            # Encode the frame in JPEG format
            _, buffer = cv2.imencode('.jpg', frame)
            frame = buffer.tobytes()
            
            # Yield the frame in HTTP multipart format
            yield (b'--frame\r\n'
                   b'Content-Type: image/jpeg\r\n\r\n' + frame + b'\r\n')

@app.route('/video_feed')
def video_feed():
    # Return the streaming response
    return Response(generate_frames(), mimetype='multipart/x-mixed-replace; boundary=frame')

if __name__ == '__main__':
    app.run(debug=True)
    