<script src=
"https://www.gstatic.com/firebasejs/3.7.4/firebase.js">
    </script>
document.getElementById('urlForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const urlInput = document.getElementById('websiteUrl');
    const url = urlInput.value;
    
    if (url) {
        console.log('Submitted URL:', url);
        // Here you can add your logic to handle the URL
        // For example, sending it to your backend or processing it
        
        urlInput.value = ''; // Clear the input after submission
    }
});