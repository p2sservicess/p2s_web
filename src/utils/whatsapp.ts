export const P2S_WHATSAPP_NUMBER = '919274127836';
export const P2S_WHATSAPP_DISPLAY = '+91 92741 27836';

export const createWhatsAppUrl = (message: string): string => {
  return `https://wa.me/${P2S_WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
};

export const getWhatsAppPackageMsg = (
  packageName: string,
  price: number,
  billingCycle: string = 'monthly'
): string => {
  return `Hi P2S Team, I'm interested in booking the ${packageName} (₹${price.toLocaleString('en-IN')}/mo - ${billingCycle}). Please guide me with onboarding!`;
};

export const getWhatsAppServiceMsg = (serviceTitle: string): string => {
  return `Hi P2S Team, I'm interested in inquiring about your service: ${serviceTitle}. Please share more details and timeline.`;
};

export const getWhatsAppEstimatorMsg = (
  packageName: string,
  packagePrice: number,
  addons: { name: string; price: number }[],
  total: number
): string => {
  const addonList = addons.length > 0 
    ? addons.map(a => `${a.name} (+₹${a.price.toLocaleString('en-IN')})`).join(', ')
    : 'None';

  return `Hi P2S Team, I calculated a custom estimate on your website:
• Base Package: ${packageName} (₹${packagePrice.toLocaleString('en-IN')})
• Add-ons: ${addonList}
• Estimated Monthly Investment: ₹${total.toLocaleString('en-IN')}

I'd like to book a consultation for this scope!`;
};

export const getWhatsAppContactMsg = (
  name: string,
  company: string,
  service: string,
  phone: string,
  notes: string
): string => {
  return `Hi P2S Team, I am submitting a project inquiry:
• Name: ${name || 'N/A'}
• Company: ${company || 'N/A'}
• Service: ${service}
• Phone: ${phone || 'N/A'}
• Brief: ${notes || 'Interested in P2S solutions'}

Looking forward to connecting!`;
};
