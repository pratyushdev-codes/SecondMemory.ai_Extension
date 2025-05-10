<script src="https://www.gstatic.com/firebasejs/3.7.4/firebase.js"></script>


document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('urlForm').addEventListener('submit', function(e) {
        e.preventDefault();
        
        const urlInput = document.getElementById('websiteUrl');
        const url = urlInput.value.trim();
        
        if (url) {
            console.log('Submitted URL:', url);
            

            const submitButton = document.querySelector('#urlForm button[type="submit"]');
            const originalButtonText = submitButton.textContent;
            submitButton.disabled = true;
            submitButton.textContent = 'Processing...';
            

            fetch('https://secondmemory-ai-multisourcerag.onrender.com/process-websites/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ url: url }),
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok: ' + response.statusText);
                }
                return response.json();
            })
            .then(data => {
                console.log('Success:', data);
            
                showMessage('URL processed successfully!', 'success');
                
  
                urlInput.value = '';
            })
            .catch(error => {
                console.error('Error:', error);
         
                showMessage('Error processing URL: ' + error.message, 'error');
            })
            .finally(() => {
 
                submitButton.disabled = false;
                submitButton.textContent = originalButtonText;
            });
        } else {
            showMessage('Please enter a valid URL', 'warning');
        }
    });
    

    function showMessage(message, type) {

        let messageContainer = document.getElementById('message-container');
        

        if (!messageContainer) {
            messageContainer = document.createElement('div');
            messageContainer.id = 'message-container';
            document.getElementById('urlForm').appendChild(messageContainer);
        }
        

        const messageElement = document.createElement('div');
        messageElement.textContent = message;
        messageElement.className = `message ${type}`;
        

        switch (type) {
            case 'success':
                messageElement.style.color = 'green';
                break;
            case 'error':
                messageElement.style.color = 'red';
                break;
            case 'warning':
                messageElement.style.color = 'orange';
                break;
        }
        
      
        messageContainer.innerHTML = ''; // Clear previous messages
        messageContainer.appendChild(messageElement);
        

        setTimeout(() => {
            messageElement.remove();
            
            if (messageContainer.children.length === 0) {
                messageContainer.remove();
            }
        }, 5000);
    }
});
