song_1 = "";
song_2 = "";

song_1_status ="";
song_2_status ="";

leftWrist_x = 0;
leftWrist_y = 0;

rightWrist_x = 0;
rightWrist_y = 0;

scoreLeftWrist = 0;
scoreRightWrist = 0;

function setup(){
    canvas = createCanvas(600,500)
    canvas.center()
    video = createCapture(VIDEO)
    video.hide()

    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);
}
function draw(){
    image(video, 0,0,600,500);
    fill("red");
    stroke("red");
    song_1_status = song_1.isPlaying()
    song_2_status = song_2.isPlaying()

    if(scoreRightWrist > 0.2)
    {
        circle(rightWrist_x,rightWrist_y,20);
        song_2.stop()

    if(song_1_status == false)
    {
        song_1.play()
        document.getElementById("song_name").innerHTML = "Song Name is Jarico - Landscape"
    }
    }

    if(scoreLeftWrist > 0.2)
    {
        circle(leftWrist_x,leftWrist_y,20);
        song_1.stop()
    if(song_2_status == false)
    {
        song_2.play()
        document.getElementById("song_name").innerHTML = "Song Name is Electro-Light - Symbolism";
    }
    }
}
function preload(){
    song_1 = loadSound("Jarico.mp3");
    song_2 = loadSound("Electro.mp3");
}
function play(){
    song.play();
    song.setVolume(1)
    song.rate(1)
}
function modelLoaded()
{
    console.log("PoseNet is Initialized");
}
function gotPoses(results)
{
    if(results.length > 0)
    {
        console.log(results);
        scoreLeftWrist = results[0].pose.keypoints[9].score
        scoreRightWrist = results[0].pose.keypoints[10].score
        console.log("ScoreRightWrist =" + scoreRightWrist + "ScoreLeftWrist =" + scoreLeftWrist);

        leftWrist_x = results[0].pose.leftWrist.x;
        leftWrist_y = results[0].pose.leftWrist.y;
        console.log("LeftWrist x =" + leftWrist_x +"LeftWrist y =" +leftWrist_y);

        rightWrist_x = results[0].pose.rightWrist.x;
        rightWrist_y = results[0].pose.rightWrist.y;
        console.log("RightWrist x =" + rightWrist_x +"RightWrist y =" +rightWrist_y);
    }
}