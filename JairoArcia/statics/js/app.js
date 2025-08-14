// Yo: JavaScript para mi portafolio de desarrollador backend
console.log('🚀 Portafolio de Jairo Arcia (Curcolor) cargado correctamente');

// Yo: Actualizar el año automáticamente en el footer
document.addEventListener('DOMContentLoaded', () => {
  const yearElement = document.getElementById('year');
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }

  // Yo: Manejo del formulario de contacto
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', handleContactForm);
  }

  // Yo: Efectos adicionales para mejor UX
  initScrollEffects();
  initProjectCards();
});

// Yo: Función para manejar el envío del formulario de contacto
function handleContactForm(e) {
  e.preventDefault();
  
  // Yo: Cambiar este email por mi email real si es necesario
  const myEmail = 'jairo.arcia@contacto.com';
  
  const name = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim();
  const subject = document.getElementById('subject').value;
  const message = document.getElementById('message').value.trim();

  // Yo: Validación básica
  if (!name || !email || !subject || !message) {
    alert('Por favor, completa todos los campos.');
    return;
  }

  // Yo: Crear el mailto con la información del formulario
  const emailSubject = encodeURIComponent(`[Portafolio] ${subject} - ${name}`);
  const emailBody = encodeURIComponent(
    `Hola Jairo,\n\n` +
    `Mi nombre es ${name} y me gustaría contactarte.\n\n` +
    `Mensaje:\n${message}\n\n` +
    `Mis datos de contacto:\n` +
    `Email: ${email}\n\n` +
    `Enviado desde tu portafolio web.`
  );

  // Yo: Abrir cliente de correo del usuario
  window.location.href = `mailto:${myEmail}?subject=${emailSubject}&body=${emailBody}`;
  
  // Yo: Mostrar confirmación al usuario
  setTimeout(() => {
    alert('¡Formulario procesado! Se ha abierto tu cliente de correo.');
    contactForm.reset();
  }, 500);
}

// Yo: Efectos de scroll suaves para las secciones
function initScrollEffects() {
  // Yo: Observer para animaciones al hacer scroll
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, observerOptions);

  // Yo: Observar las tarjetas de proyectos para animarlas
  document.querySelectorAll('.project-card').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(card);
  });
}

// Yo: Efectos adicionales para las tarjetas de proyectos
function initProjectCards() {
  const projectCards = document.querySelectorAll('.project-card');
  
  projectCards.forEach(card => {
    // Yo: Efecto de hover más suave
    card.addEventListener('mouseenter', () => {
      card.style.transform = 'translateY(-8px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', () => {
      card.style.transform = 'translateY(0) scale(1)';
    });
  });
}

// Yo: Función para mostrar un toast de notificación (opcional)
function showToast(message, type = 'info') {
  // Yo: Crear un toast simple con Bootstrap si necesito notificaciones
  const toast = document.createElement('div');
  toast.className = `alert alert-${type} alert-dismissible fade show position-fixed`;
  toast.style.cssText = 'top: 90px; right: 20px; z-index: 1055; min-width: 300px;';
  toast.innerHTML = `
    ${message}
    <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
  `;
  
  document.body.appendChild(toast);
  
  // Yo: Auto-eliminar el toast después de 5 segundos
  setTimeout(() => {
    toast.remove();
  }, 5000);
}

// Yo: Easter egg - mensaje en consola para otros developers
console.log(`
🎯 ¡Hola fellow developer! 
👨‍💻 Soy Jairo Arcia (Curcolor)
🚀 Especializado en desarrollo Backend
🐍 Python | ☕ Java | 💙 C#
📧 Contacto: GitHub.com/Curcolor
⭐ ¡Gracias por revisar el código!
`);

// Yo: Detectar si el usuario es un developer (busca devtools abierto)
let devtools = {open: false};
const threshold = 160;

// Yo: Simple detección de DevTools
setInterval(() => {
  if (window.outerHeight - window.innerHeight > threshold || 
      window.outerWidth - window.innerWidth > threshold) {
    if (!devtools.open) {
      devtools.open = true;
      console.log('🔍 ¡Veo que eres un developer curioso! Me gusta eso 😄');
    }
  } else {
    devtools.open = false;
  }
}, 500);