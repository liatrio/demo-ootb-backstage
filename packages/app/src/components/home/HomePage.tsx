import React from 'react';

export const HomePage = () => (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', height: '100vh' }}>
        <img src="/banner.png" alt="Banner" style={{ width: '100%', maxHeight: '300px', objectFit: 'cover' }} />
        <div style={{ flexGrow: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
            <h1>🚀 Welcome to Backstage! 🚀</h1>
            <div style={{ maxWidth: '600px', textAlign: 'center' }}>
                <p>
                    This instance is powered by a streamlined configuration, designed to let you experience the capabilities of Backstage, including <a href="https://github.com/liatrio/backstage-github-autogov-plugin" style={{ color: '#89df00' }}>Liatrio's Backstage GutHub Autogov plugin</a>. If you’re considering implementing Backstage at your organization or need expert guidance on customizing it further, we’re here to help!
                </p>
                <p>
                    👉<a href="https://www.liatrio.com/" style={{ color: '#89df00' }}>Visit Our Contact Page</a> for more information on how Liatrio can support your Backstage journey.
                </p>
            </div>
        </div>
        <img src="/banner.png" alt="Banner" style={{ width: '100%', maxHeight: '300px', objectFit: 'cover' }} />
    </div>
);
