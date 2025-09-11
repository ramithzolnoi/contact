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
      canvas.width = 500;
      canvas.height = 700;
      
      // Create gradient background
      const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
      gradient.addColorStop(0, '#0F172A');
      gradient.addColorStop(1, '#1E293B');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // Add subtle pattern overlay
      ctx.fillStyle = 'rgba(0, 212, 170, 0.05)';
      for (let i = 0; i < canvas.width; i += 40) {
        for (let j = 0; j < canvas.height; j += 40) {
          ctx.fillRect(i, j, 1, 1);
        }
      }
      
      // Load and draw the actual logo
      const logoImage = new Image();
      logoImage.crossOrigin = 'anonymous'; // Enable CORS
      logoImage.onload = () => {
        // Draw logo at the top
        const logoWidth = 300;
        const logoHeight = 80;
        const logoX = (canvas.width - logoWidth) / 2;
        const logoY = 30;
        ctx.drawImage(logoImage, logoX, logoY, logoWidth, logoHeight);
        
        // Continue with QR code generation after logo loads
        generateQRCode();
      };
      
      logoImage.onerror = () => {
        // Fallback: draw text logo if image fails to load
        ctx.fillStyle = '#00D4AA';
        ctx.font = 'bold 32px Arial, sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText('ZOLNOI', canvas.width / 2, 60);
        
        ctx.fillStyle = '#94A3B8';
        ctx.font = '14px Arial, sans-serif';
        ctx.fillText('AI for energy efficiency and sustainability in Manufacturing', canvas.width / 2, 85);
        
        // Continue with QR code generation
        generateQRCode();
      };
      
      const generateQRCode = () => {
        const qrImage = new Image();
        qrImage.onload = () => {
          // Draw QR code centered and larger
          const qrSize = 320;
          const qrY = 150;
          const qrX = (canvas.width - qrSize) / 2;
          
          // Add subtle shadow for QR code
          ctx.shadowColor = 'rgba(0, 0, 0, 0.3)';
          ctx.shadowBlur = 10;
          ctx.shadowOffsetX = 0;
          ctx.shadowOffsetY = 4;
          
          // Draw white background for QR code
          ctx.fillStyle = '#ffffff';
          ctx.fillRect(qrX - 10, qrY - 10, qrSize + 20, qrSize + 20);
          
          // Reset shadow
          ctx.shadowColor = 'transparent';
          ctx.shadowBlur = 0;
          ctx.shadowOffsetX = 0;
          ctx.shadowOffsetY = 0;
          
          // Draw QR code
          ctx.drawImage(qrImage, qrX, qrY, qrSize, qrSize);
          
          // Add elegant border around QR code
          ctx.strokeStyle = '#00D4AA';
          ctx.lineWidth = 3;
          ctx.strokeRect(qrX - 8, qrY - 8, qrSize + 16, qrSize + 16);
          
          // Add inner border
          ctx.strokeStyle = '#E2E8F0';
          ctx.lineWidth = 1;
          ctx.strokeRect(qrX - 5, qrY - 5, qrSize + 10, qrSize + 10);
          
          // Add instructions with better styling
          ctx.fillStyle = '#00D4AA';
          ctx.font = 'bold 20px Arial, sans-serif';
          ctx.textAlign = 'center';
          ctx.fillText('Scan to access our contact form', canvas.width / 2, qrY + qrSize + 40);
          
          // Add subtitle
          ctx.fillStyle = '#94A3B8';
          ctx.font = '14px Arial, sans-serif';
          ctx.fillText('Connect with Zolnoi', canvas.width / 2, qrY + qrSize + 65);
          
          // Add URL with better formatting
          ctx.fillStyle = '#64748B';
          ctx.font = '12px Arial, sans-serif';
          const url = window.location.href;
          const maxWidth = canvas.width - 40;
          if (ctx.measureText(url).width > maxWidth) {
            // Split URL if too long
            const parts = url.split('/');
            const domain = parts[0] + '//' + parts[2];
            const path = parts.slice(3).join('/');
            ctx.fillText(domain, canvas.width / 2, qrY + qrSize + 90);
            ctx.fillText(path, canvas.width / 2, qrY + qrSize + 110);
          } else {
            ctx.fillText(url, canvas.width / 2, qrY + qrSize + 90);
          }
          
          // Add decorative line
          ctx.strokeStyle = '#00D4AA';
          ctx.lineWidth = 2;
          ctx.beginPath();
          ctx.moveTo(canvas.width / 2 - 50, qrY + qrSize + 130);
          ctx.lineTo(canvas.width / 2 + 50, qrY + qrSize + 130);
          ctx.stroke();
          
          // Add footer with better styling
          ctx.fillStyle = '#64748B';
          ctx.font = '11px Arial, sans-serif';
          ctx.fillText('© 2024 Zolnoi • NASSCOM Showcase', canvas.width / 2, qrY + qrSize + 160);
          
          // Add tagline at bottom
          ctx.fillStyle = '#94A3B8';
          ctx.font = '10px Arial, sans-serif';
          ctx.fillText('AI for energy efficiency and sustainability in Manufacturing', canvas.width / 2, qrY + qrSize + 180);
          
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
      };
      
      logoImage.src = '/logo_with_text_and_tagline.svg';
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
