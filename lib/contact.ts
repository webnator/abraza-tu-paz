// Williams explicitly supplied this temporary number for the local review.
// Replace with Gabriela's confirmed contact before publishing.
export const whatsappContact = {
  phone: '34654325653',
  status: 'temporary-review-contact',
  suppliedAt: '2026-11-06',
} as const;

// Do not include guided answers or mental-health information in the URL.
export const whatsappUrl = `https://wa.me/${whatsappContact.phone}?text=${encodeURIComponent('Hola, me gustaría recibir información sobre las sesiones de Abraza tu Paz.')}`;
