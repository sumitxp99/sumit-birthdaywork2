function calculateAge() {
    const name = document.getElementById('name').value;
    const dob = new Date(document.getElementById('dob').value);
    
    const now = new Date();
    const diff = now.getTime() - dob.getTime();
    const ageDate = new Date(diff); 
    const calculatedAge = Math.abs(ageDate.getUTCFullYear() - 1970);
    
    const result = `Your age is: ${calculatedAge} years. Your name is ${name}.`;
  
    // Send data to server
    fetch('send_email.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: name,
        dob: dob,
        age: calculatedAge
      })
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      console.log('Email sent successfully:', data);
      document.getElementById('result').textContent = result; // Display result after successful email send
    })
    .catch(error => {
      console.error('Error sending email:', error);
      document.getElementById('result').textContent = result; // Display result even if there was an error
    });
    document.getElementById('result').textContent = result;
  
    // Prevent form submission
    return false;
  }
  