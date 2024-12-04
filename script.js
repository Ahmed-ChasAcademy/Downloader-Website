function downloadVideo() {
    const url = document.getElementById("video-url").value;
    
    if (url) {
        // Send URL to the backend to get download options
        fetch(`https://your-backend.com/download?url=${url}`)
            .then(response => response.json())
            .then(data => {
                const downloadOptions = document.getElementById("download-options");
                downloadOptions.innerHTML = "";
                
                if (data.status === "success") {
                    data.formats.forEach(format => {
                        const button = document.createElement("button");
                        button.innerText = `Download ${format.resolution}`;
                        button.onclick = () => window.location.href = format.url;
                        downloadOptions.appendChild(button);
                    });
                } else {
                    downloadOptions.innerHTML = "Error fetching video data.";
                }
            })
            .catch(error => {
                console.error('Error:', error);
            });
    } else {
        alert("Please enter a valid YouTube URL.");
    }
}
