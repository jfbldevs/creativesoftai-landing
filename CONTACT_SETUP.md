# 📧 Configuración del Formulario de Contacto

Tu landing page ya tiene un formulario de contacto funcional implementado. Aquí te explico cómo configurarlo para recibir emails reales.

## 🚀 Opción 1: Formspree (Recomendado - Gratis y Fácil)

### Paso 1: Crear cuenta en Formspree
1. Ve a [https://formspree.io](https://formspree.io)
2. Crea una cuenta gratuita
3. Crea un nuevo formulario
4. Copia tu Form ID (algo como `xpzgkqyw`)

### Paso 2: Configurar el código
1. Abre el archivo `script.js`
2. Busca las dos líneas que dicen:
   ```javascript
   fetch('https://formspree.io/f/YOUR_FORM_ID', {
   ```
3. Reemplaza `YOUR_FORM_ID` con tu ID real de Formspree:
   ```javascript
   fetch('https://formspree.io/f/xpzgkqyw', {
   ```

### Paso 3: ¡Listo!
- Los emails llegarán automáticamente a tu correo
- Plan gratuito: 50 submissions/mes
- No necesitas servidor ni backend

---

## 🔧 Opción 2: EmailJS (Alternativa)

### Paso 1: Crear cuenta en EmailJS
1. Ve a [https://www.emailjs.com](https://www.emailjs.com)
2. Crea una cuenta gratuita
3. Configura un servicio de email (Gmail, Outlook, etc.)
4. Crea una plantilla de email

### Paso 2: Instalar EmailJS
Agrega este script antes del cierre de `</body>` en `index.html`:
```html
<script src="https://cdn.jsdelivr.net/npm/@emailjs/browser@3/dist/email.min.js"></script>
<script>
   emailjs.init("TU_PUBLIC_KEY");
</script>
```

### Paso 3: Modificar el código
Reemplaza la función `fetch` en `script.js` con:
```javascript
emailjs.sendForm('TU_SERVICE_ID', 'TU_TEMPLATE_ID', form)
  .then(() => {
      closeContactModal();
      showSuccessMessage();
  })
  .catch((error) => {
      console.error('Error:', error);
      showErrorMessage();
      button.textContent = originalText;
      button.disabled = false;
  });
```

---

## 📋 Campos del Formulario

El formulario actual incluye:
- **Name**: Nombre del contacto
- **Email**: Email del contacto
- **Company**: Empresa (opcional)
- **Message**: Mensaje del proyecto

### Personalizar campos
Para agregar o modificar campos, edita las secciones del formulario en `script.js`:

```javascript
// Ejemplo: Agregar campo de teléfono
<div>
    <label class="block text-sm font-medium text-gray-700 mb-1">Phone</label>
    <input type="tel" name="phone" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
</div>
```

---

## 🎨 Personalización Avanzada

### Cambiar mensajes de éxito/error
Modifica las funciones `showSuccessMessage()` y `showErrorMessage()` en `script.js`:

```javascript
function showSuccessMessage() {
    // Personaliza el mensaje aquí
    toast.textContent = '¡Mensaje enviado! Te contactaremos pronto.';
}
```

### Validaciones personalizadas
Agrega validaciones antes del envío:

```javascript
// Ejemplo: Validar teléfono
const phone = form.querySelector('[name="phone"]').value;
if (phone && !/^\+?[\d\s-()]+$/.test(phone)) {
    alert('Por favor ingresa un teléfono válido');
    return;
}
```

---

## 🔒 Seguridad y Spam

### Formspree
- Incluye protección anti-spam automática
- Puedes habilitar reCAPTCHA en el dashboard
- Bloqueo automático de IPs sospechosas

### Medidas adicionales
```javascript
// Honeypot field (campo oculto para detectar bots)
<input type="text" name="_gotcha" style="display:none">
```

---

## 📊 Analytics y Seguimiento

### Tracking de envíos
Agrega en la función de éxito:

```javascript
// Google Analytics
gtag('event', 'form_submit', {
    'event_category': 'Contact',
    'event_label': 'Landing Page'
});

// Facebook Pixel
fbq('track', 'Contact');
```

---

## 🚨 Solución de Problemas

### El formulario no envía
1. Verifica que `YOUR_FORM_ID` esté reemplazado
2. Revisa la consola del navegador (F12)
3. Confirma que todos los campos `name` estén presentes

### No llegan los emails
1. Revisa la carpeta de spam
2. Verifica la configuración en Formspree
3. Confirma que el email de destino sea correcto

### Errores de CORS
- Formspree maneja CORS automáticamente
- Si usas otro servicio, verifica sus políticas CORS

---

## 📞 Soporte

Si necesitas ayuda adicional:
- **Formspree**: [https://help.formspree.io](https://help.formspree.io)
- **EmailJS**: [https://www.emailjs.com/docs](https://www.emailjs.com/docs)

¡Tu formulario está listo para recibir contactos! 🎉 