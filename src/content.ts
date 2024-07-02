let videoElement: HTMLVideoElement | null = null;

function createAndShowSubwaySurfersVideo(): void {
  if (videoElement) return;

  const originalWidth = 1920;
  const originalHeight = 1080;
  const leftCrop = 442;
  const rightCrop = 800;
  const newWidth = originalWidth - leftCrop - rightCrop;
  const aspectRatio = newWidth / originalHeight;

  // Adjust this value to change the size of the video
  const containerWidth = 250;

  // Create and append style
  const style = document.createElement('style');
  style.textContent = `
    .subway-surfers-video-container {
      position: fixed;
      top: 20px;
      right: 20px;
      width: ${containerWidth}px;
      height: ${containerWidth / aspectRatio}px;
      z-index: 9999;
      border-radius: 10px;
      overflow: hidden;
    }
    .subway-surfers-video {
      position: absolute;
      top: 0;
      left: 50%;
      transform: translateX(-50%);
      height: 100%;
      width: ${(originalWidth / newWidth) * 100}%;
      object-fit: cover;
      object-position: center;
    }
  `;
  document.head.appendChild(style);

  // Create container div
  const container = document.createElement('div');
  container.classList.add('subway-surfers-video-container');

  // Create and append video
  videoElement = document.createElement('video');
  videoElement.src = chrome.runtime.getURL('subway_websurfers.mp4');
  videoElement.loop = true;
  videoElement.muted = true;
  videoElement.autoplay = true;
  videoElement.classList.add('subway-surfers-video');
  
  container.appendChild(videoElement);
  document.body.appendChild(container);
  videoElement.play();
}

createAndShowSubwaySurfersVideo();