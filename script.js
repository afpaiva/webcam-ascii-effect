import AsciiEffect from "./AsciiEffect.js";

const canvas = document.getElementById('canvas1');
const asciiEffect = new AsciiEffect(canvas);

async function startWebcam() {
  try {
    const stream = await navigator.mediaDevices.getUserMedia({
      video: {
        width: { min: 1024, ideal: 1280, max: 1920 },
        height: { min: 576, ideal: 720, max: 1080 },
      },
    });
    return stream;
  } catch (error) { console.log(error); }
}
const stream = await startWebcam();

const loop = async () => {
  requestAnimationFrame(loop);
  const track = stream.getVideoTracks()[0];
  const imageCapture = new ImageCapture(track);
  const image = await imageCapture.grabFrame();
  asciiEffect.renderImage(image);
  asciiEffect.draw(8);
}
loop();
