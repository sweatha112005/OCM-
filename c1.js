// Handle login functionality
document.getElementById('loginForm').addEventListener('submit', handleLogin);

function handleLogin(event) {
    event.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    // Simple authentication check (for demo purposes only)
    if (username === 'user' && password === '1234') {
        // Hide login page and show the main page
        document.getElementById('loginPage').style.display = 'none';
        document.getElementById('mainPage').style.display = 'block';
    } else {
        alert('Invalid username or password');
    }
}

// Handle image upload and processing (from previous code)
document.getElementById('shirtImage').addEventListener('change', handleImageUpload);

function handleImageUpload(event) {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = function(e) {
        const img = new Image();
        img.onload = function() {
            processImage(img);
        };
        img.src = e.target.result;
    };
    reader.readAsDataURL(file);
}

function processImage(img) {
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');
    
    canvas.width = img.width;
    canvas.height = img.height;
    ctx.drawImage(img, 0, 0, img.width, img.height);

    // Get image data
    const imageData = ctx.getImageData(0, 0, img.width, img.height);
    const data = imageData.data;

    // Find dominant color
    const dominantColor = getDominantColor(data);
    
    // Display the dominant color on the screen
    displayDominantColor(dominantColor);

    // Recommend pants based on dominant color
    const pantRecommendations = recommendPants(dominantColor);
    displayRecommendations(pantRecommendations);
}

function getDominantColor(data) {
    let r = 0, g = 0, b = 0;
    const length = data.length;
    
    for (let i = 0; i < length; i += 4) {
        r += data[i];     // Red
        g += data[i + 1]; // Green
        b += data[i + 2]; // Blue
    }
    
    // Average color
    r = Math.floor(r / (length / 4));
    g = Math.floor(g / (length / 4));
    b = Math.floor(b / (length / 4));
    
    return { r, g, b };
}

function recommendPants(color) {
    const { r, g, b } = color;

    // Simple matching logic based on dominant color
    if (r > g && r > b) {
        return [
            { color: 'Black', rgb: 'rgb(0, 0, 0)' },
            { color: 'Grey', rgb: 'rgb(169, 169, 169)' },
            { color: 'White', rgb: 'rgb(255, 255, 255)' }
        ];
    } else if (g > r && g > b) {
        return [
            { color: 'Khaki', rgb: 'rgb(195, 176, 145)' },
            { color: 'Beige', rgb: 'rgb(245, 245, 220)' },
            { color: 'Navy Blue', rgb: 'rgb(0, 0, 128)' }
        ];
    } else {
        return [
            { color: 'Dark Blue', rgb: 'rgb(0, 0, 139)' },
            { color: 'Charcoal', rgb: 'rgb(54, 69, 79)' },
            { color: 'Black', rgb: 'rgb(0, 0, 0)' }
        ];
    }
}

function displayDominantColor(color) {
    const colorBox = document.getElementById('shirtColorDisplay');
    const rgbColor = `rgb(${color.r}, ${color.g}, ${color.b})`;
    colorBox.style.backgroundColor = rgbColor;
}

function displayRecommendations(pants) {
    const recommendationsList = document.getElementById('pantsRecommendations');
    recommendationsList.innerHTML = '';

    pants.forEach(function(pant) {
        const listItem = document.createElement('li');
        listItem.textContent = pant.color;

        const colorCircle = document.createElement('span');
        colorCircle.style.backgroundColor = pant.rgb;

        listItem.appendChild(colorCircle);
        recommendationsList.appendChild(listItem);
    });
}
