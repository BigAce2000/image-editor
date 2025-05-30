// Load the canvas and context
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

// Load the base image
const baseImage = new Image();
baseImage.src = 'assets/permanent_resident_card.jpg';
baseImage.onload = () => {
    ctx.drawImage(baseImage, 0, 0, canvas.width, canvas.height);
};

// Function to update the card
function updateCard() {
    // Clear the canvas and reload the base image
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(baseImage, 0, 0, canvas.width, canvas.height);

    // Set font for text
    ctx.font = '20px Arial';
    ctx.fillStyle = 'black';

    // Get input values
    const surname = document.getElementById('surname').value || 'DOE';
    const givenName = document.getElementById('given_name').value || 'JOHN LEE';
    const dob = document.getElementById('date_of_birth').value || '16 OCT 1986';

    // Draw new text (adjust coordinates based on your image)
    ctx.fillStyle = 'white'; // Background to "erase" old text
    ctx.fillRect(150, 50, 200, 30); // Surname area
    ctx.fillRect(150, 80, 200, 30); // Given Name area
    ctx.fillRect(150, 200, 200, 30); // DOB area
    ctx.fillStyle = 'black';
    ctx.fillText(surname, 150, 70);
    ctx.fillText(givenName, 150, 100);
    ctx.fillText(dob, 150, 220);

    // Handle photo upload
    const photoInput = document.getElementById('photo');
    if (photoInput.files.length > 0) {
        const newPhoto = new Image();
        newPhoto.src = URL.createObjectURL(photoInput.files[0]);
        newPhoto.onload = () => {
            ctx.fillStyle = 'white'; // Clear photo area
            ctx.fillRect(20, 50, 120, 150); // Adjust based on photo position
            ctx.drawImage(newPhoto, 20, 50, 120, 150); // Draw new photo
        };
    }
}

// Function to download the edited card
function downloadCard() {
    const link = document.createElement('a');
    link.download = 'edited_card.png';
    link.href = canvas.toDataURL();
    link.click();
}
