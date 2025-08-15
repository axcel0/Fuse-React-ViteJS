// Test script untuk API endpoints
const BASE_URL = 'https://dev-be-udms-pmcp-evsoft.polytron.local';

// Ambil token dari localStorage (paste token manual jika perlu)
const token = 'YOUR_TOKEN_HERE'; // Ganti dengan token yang aktual

async function testEndpoint(endpoint) {
    try {
        console.log(`\n🌐 Testing: ${BASE_URL}${endpoint}`);
        
        const response = await fetch(`${BASE_URL}${endpoint}`, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });
        
        console.log(`📡 Status: ${response.status} ${response.statusText}`);
        
        if (response.ok) {
            const data = await response.json();
            console.log(`✅ Success:`, JSON.stringify(data, null, 2));
        } else {
            console.log(`❌ Failed: ${response.status}`);
        }
        
    } catch (error) {
        console.error(`💥 Error:`, error.message);
    }
}

// Test endpoints yang terlihat di screenshot
async function main() {
    const endpoints = [
        '/consumer',
        '/status', 
        '/api/webhook-notification/activity',
        '/gps/api/v4/gps02/containerstatus/consumer'
    ];
    
    for (const endpoint of endpoints) {
        await testEndpoint(endpoint);
        await new Promise(resolve => setTimeout(resolve, 1000)); // delay
    }
}

main();
