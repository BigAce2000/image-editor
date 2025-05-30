// Load the canvas and context
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

// Load the base image
const baseImage = new Image();
baseImage.src = '/image-editor/assets/permanent_resident_card.jpg';

// Add error handling for image loading
baseImage.onload = () => {
    ctx.drawImage(baseImage, 0, 0, canvas.width, canvas.height);
};
baseImage.onerror = () => {
    console.error('Failed to load image at: ' + baseImage.src);
    ctx.font = '20px Arial';
    ctx.fillStyle = 'red';
    ctx.fillText('Error: Image not found', 20, 50);
};

// Function to update the card
function updateCard() {
    // Clear the canvas and reload the base image
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(baseImage, 0, 0, canvas.width, canvas.height);

    // Set font to match the card's style (Helvetica is closer to the card's font)
    ctx.font = 'bold 18px Helvetica, Arial, sans-serif';
    ctx.fillStyle = 'black';

    // Get input values
    const surname = document.getElementById('surname').value || 'DOE';
    const givenName = document.getElementById('given_name').value || 'JOHN LEE';
    const dob = document.getElementById('date_of_birth').value || '16 OCT 1986';

    // Draw new text with better blending
    // Instead of a solid white rectangle, use a light color that matches the card's background
    ctx.fillStyle = 'rgba(255, 255, 255, 0.8)'; // Semi-transparent white to blend with the background
    ctx.fillRect(140, 40, 200, 30); // Surname area (adjusted coordinates)
    ctx.fillRect(140, 70, 200, 30); // Given Name area
    ctx.fillRect(140, 190, 200, 30); // DOB area

    // Draw the new text
    ctx.fillStyle = 'black';
    ctx.fillText(surname.toUpperCase(), 140, 60); // Surname (uppercase to match card style)
    ctx.fillText(givenName.toUpperCase(), 140, 90); // Given Name
    ctx.fillText(dob.toUpperCase(), 140, 210); // Date of Birth

    // Handle photo upload
    const photoInput = document.getElementById('photo');
    if (photoInput.files.length > 0) {
        const newPhoto = new Image();
        newPhoto.src = URL.createObjectURL(photoInput.files[0]);
        newPhoto.onload = () => {
            // Clear the photo area with a semi-transparent background to blend better
            ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
            ctx.fillRect(20, 50, 110, 140); // Adjusted photo area to match the original size/position
            // Draw the new photo
            ctx.drawImage(newPhoto, 20, 50, 110, 140); // Exact dimensions of the original photo area
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
