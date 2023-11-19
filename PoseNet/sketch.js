// Declare variables to store webcam capture, PoseNet, and keypoints
let capture;
let posenet;
let noseX, noseY; // Variables to store nose position
let reyeX, reyeY; // Variables to store right eye position
let leyeX, leyeY; // Variables to store left eye position
let singlePose; // Stores data for a single detected pose
let skeleton; // Stores the skeleton data
let actor_img; // Image of an actor
let specs, smoke; // Images of glasses and smoke

function setup() {
    // Create a canvas for rendering
    createCanvas(630, 480);

    // Initialize the webcam capture
    capture = createCapture(VIDEO);
    capture.hide();

    // Initialize PoseNet with the webcam feed
    posenet = ml5.poseNet(capture, modelLoaded);

    // Set up a callback for when poses are detected
    posenet.on('pose', receivedPoses);

    // Load images for overlay
    actor_img = loadImage('images/shahrukh.png'); // Load an actor's image
    specs = loadImage('images/spects.png'); // Load an image of glasses
    smoke = loadImage('images/cigar.png'); // Load an image of smoke
}

// Callback function when PoseNet detects poses
function receivedPoses(poses) {
    console.log(poses);

    if (poses.length > 0) {
        // Store data for the first detected pose
        singlePose = poses[0].pose;
        skeleton = poses[0].skeleton;
    }
}

function modelLoaded() {
    console.log('Model has loaded');
}

function draw() {
    // Display the webcam feed and draw over it
    image(capture, 0, 0);
    fill(44, 62, 80); // Set fill color

    if (singlePose) {
        // Loop through keypoints and draw ellipses at their positions
        for (let i = 0; i < singlePose.keypoints.length; i++) {
            ellipse(singlePose.keypoints[i].position.x, singlePose.keypoints[i].position.y, 20);
        }

        stroke(255, 255, 255); // Set stroke color
        strokeWeight(3); // Set stroke weight

        // Draw lines to connect keypoints and form the skeleton
        for (let j = 0; j < skeleton.length; j++) {
            line(skeleton[j][0].position.x, skeleton[j][0].position.y, skeleton[j][1].position.x, skeleton[j][1].position.y);
        }

        // You can uncomment these lines to overlay images on specific keypoints (e.g., nose, etc.)
        // image(specs, singlePose.nose.x - 35, singlePose.nose
    }
}
