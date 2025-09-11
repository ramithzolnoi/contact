import React, { useState, useEffect } from 'react';
import QRCode from 'qrcode';

export default function QRCodeGenerator() {
  const [qrCodeUrl, setQrCodeUrl] = useState('');
  const [isVisible, setIsVisible] = useState(false);
  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
    // Generate QR code for the current page URL
    const currentUrl = window.location.href;
    QRCode.toDataURL(currentUrl, {
      width: 200,
      margin: 2,
      color: {
        dark: '#2d8fe9', // brand-500
        light: '#ffffff'
      }
    }).then(url => {
      setQrCodeUrl(url);
    }).catch(err => {
      console.error('Error generating QR code:', err);
    });
  }, []);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
    } catch (err) {
      console.error('Failed to copy: ', err);
    }
  };

  const downloadQRCode = async () => {
    if (qrCodeUrl) {
      // Create a canvas with more content
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      
      // Set canvas size for a more detailed QR code
      canvas.width = 400;
      canvas.height = 500;
      
      // Fill background
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // Add header with company info
      ctx.fillStyle = '#0F172A';
      ctx.fillRect(0, 0, canvas.width, 80);
      
      // Company name
      ctx.fillStyle = '#00D4AA';
      ctx.font = 'bold 24px Arial';
      ctx.textAlign = 'center';
      ctx.fillText('ZOLNOI', canvas.width / 2, 30);
      
      // Tagline
      ctx.fillStyle = '#64748B';
      ctx.font = '12px Arial';
      ctx.fillText('AI for energy efficiency and sustainability in Manufacturing', canvas.width / 2, 50);
      
      // Add QR code (larger)
      const qrImage = new Image();
      qrImage.onload = () => {
        // Draw QR code centered and larger
        const qrSize = 280;
        const qrX = (canvas.width - qrSize) / 2;
        const qrY = 100;
        ctx.drawImage(qrImage, qrX, qrY, qrSize, qrSize);
        
        // Add border around QR code
        ctx.strokeStyle = '#E2E8F0';
        ctx.lineWidth = 2;
        ctx.strokeRect(qrX - 5, qrY - 5, qrSize + 10, qrSize + 10);
        
        // Add instructions
        ctx.fillStyle = '#0F172A';
        ctx.font = 'bold 16px Arial';
        ctx.fillText('Scan to access our contact form', canvas.width / 2, qrY + qrSize + 30);
        
        // Add URL
        ctx.fillStyle = '#64748B';
        ctx.font = '12px Arial';
        ctx.fillText(window.location.href, canvas.width / 2, qrY + qrSize + 50);
        
        // Add footer
        ctx.fillStyle = '#94A3B8';
        ctx.font = '10px Arial';
        ctx.fillText('© 2024 Zolnoi • NASSCOM Showcase', canvas.width / 2, qrY + qrSize + 80);
        
        // Download the enhanced image
        canvas.toBlob((blob) => {
          const url = URL.createObjectURL(blob);
          const link = document.createElement('a');
          link.download = 'zolnoi-contact-form-qr.png';
          link.href = url;
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
          URL.revokeObjectURL(url);
        });
      };
      qrImage.src = qrCodeUrl;
    }
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsVisible(!isVisible)}
        className="inline-flex items-center gap-2 rounded-full border border-brand-400/30 bg-slate-800/60 hover:bg-brand-500/15 px-4 py-2 text-sm font-medium text-brand-100 transition focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-400/60 whitespace-nowrap shadow-inner shadow-slate-900/40"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z" />
        </svg>
        Scan Me
      </button>

      {/* Toast Notification */}
      {showToast && (
        <div className="fixed top-4 right-4 z-[100] animate-fade-in">
          <div className="flex items-center gap-2 rounded-lg bg-slate-900/95 backdrop-blur-xl border border-brand-400/30 px-4 py-3 shadow-2xl">
            <svg className="w-4 h-4 text-brand-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <span className="text-sm font-medium text-white">Link copied to clipboard!</span>
          </div>
        </div>
      )}

      {isVisible && (
        <div className="absolute top-full right-0 mt-2 p-4 bg-slate-900/95 backdrop-blur-xl border border-slate-700/60 rounded-xl shadow-2xl z-50">
          <div className="text-center">
            <h3 className="text-sm font-medium text-white mb-3">Scan to open this form</h3>
            {qrCodeUrl && (
              <div className="mb-3">
                <img 
                  src={qrCodeUrl} 
                  alt="QR Code for contact form" 
                  className="mx-auto rounded-lg border border-slate-600/40"
                />
              </div>
            )}
            <div className="flex gap-2">
              <button
                onClick={copyToClipboard}
                className="flex-1 inline-flex items-center justify-center gap-1 rounded-md bg-brand-500/20 hover:bg-brand-500/30 border border-brand-400/30 px-3 py-2 text-xs font-medium text-brand-100 transition whitespace-nowrap"
              >
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
                Copy
              </button>
              <button
                onClick={downloadQRCode}
                className="flex-1 inline-flex items-center justify-center gap-1 rounded-md bg-slate-700/50 hover:bg-slate-600/50 border border-slate-600/30 px-3 py-2 text-xs font-medium text-slate-200 transition whitespace-nowrap"
              >
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                Download
              </button>
              <button
                onClick={() => setIsVisible(false)}
                className="px-3 py-2 text-xs text-slate-400 hover:text-white transition"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
