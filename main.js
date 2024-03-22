function changeText(){
  var button = document.getElementById("submitBtn");
  button.textContent = "submitting"
  button.disabled = true;
}
function revertText(){
  var button = document.getElementById("submitBtn");
  button.textContent = "Submit";
  button.disabled = false;
}
document.getElementById("submitBtn").addEventListener('click', function() {
  changeText()
  let userInput = document.getElementById("userInput").value;
  let videoId = extractYouTubeId(userInput);

  const url = `https://youtube-mp3-download1.p.rapidapi.com/dl?id=${videoId}`;
  const options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': 'f55bc051f2msh236fb47b098e612p16087cjsn5d197e666ca0',
      'X-RapidAPI-Host': 'youtube-mp3-download1.p.rapidapi.com'
    }
  };

  fetch(url, options)
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      let container = document.getElementById("result");
      container.innerHTML = '';
      
      let thumbnail = document.createElement("img");
      thumbnail.src = data.thumb;
      thumbnail.style.border = "1px solid gray";
      let title = document.createElement("p");
      title.textContent = data.title;
      let artist = document.createElement("p");
      artist.textContent = data.author;
      let stats = document.createElement('p');
      stats.textContent = data.status;
      stats.style.color = data.status === 'OK' ? 'red' : 'green';
      revertText()
      let downloadBtn = document.createElement('button');
      downloadBtn.style.padding = "5px 5px";
      downloadBtn.style.marginTop = "20px";
      downloadBtn.textContent = "REDIRECT"
      downloadBtn.addEventListener('click', function() {
        let url = document.createElement('a');
        url.href = data.link;
        url.click()
      });

      container.appendChild(thumbnail);
      container.appendChild(title);
      container.appendChild(artist);
      container.appendChild(stats);
      container.appendChild(downloadBtn);
    })
    .catch(error => console.error('Error:', error));
});

function extractYouTubeId(url) {
  let regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
  let match = url.match(regExp);

  if (match && match[2].length === 11) {
    return match[2];
  } else {
    console.error("Invalid YouTube URL");
    return null;
  }
}
