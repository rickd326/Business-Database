const initiateOAuth = () => {
    const clientId = 'YOUR_ZOHO_CLIENT_ID';
    const redirectUri = encodeURIComponent('http://localhost:3000/auth/callback');
    const scope = encodeURIComponent('ZohoBooks.fullaccess.all');
    const responseType = 'code';
  
    window.location.href = `https://accounts.zoho.com/oauth/v2/auth?response_type=${responseType}&client_id=${clientId}&scope=${scope}&redirect_uri=${redirectUri}&access_type=offline&prompt=consent`;
  };

export {};