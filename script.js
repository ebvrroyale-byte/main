/**
 * script.js
 * Lógica para la calculadora de servicios y validación de citas.
 */

// Función para calcular el total basado en los checkboxes seleccionados
function calculateTotal() {
    let subtotal = 0;
    const services = document.querySelectorAll('input[name="service"]:checked');
    
    services.forEach(service => {
        subtotal += parseFloat(service.value);
    });
    
    const iva = subtotal * 0.12;
    const total = subtotal + iva;
    
    document.getElementById('subtotal').textContent = '$' + subtotal.toFixed(2);
    document.getElementById('iva').textContent = '$' + iva.toFixed(2);
    document.getElementById('total').textContent = '$' + total.toFixed(2);
}

// Función para verificar disponibilidad (simulada)
function checkAvailability() {
    const dateInput = document.getElementById('appointment-date').value;
    const resultElement = document.getElementById('availability-result');
    
    if (!dateInput) {
        resultElement.textContent = 'Por favor, seleccione una fecha.';
        resultElement.className = 'status-msg not-available';
        return;
    }
    
    const selectedDate = new Date(dateInput);
    const today = new Date();
    // Ajuste para comparar solo fechas sin hora
    today.setHours(0,0,0,0); 
    
    // Validación de fechas pasadas
    // Nota: Usamos selectedDate.getTime() para evitar problemas de zona horaria simples
    if (selectedDate < today) {
        resultElement.textContent = 'No se pueden agendar citas en fechas pasadas.';
        resultElement.className = 'status-msg not-available';
        return;
    }
    
    // Simulación aleatoria (Lógica original mantenida)
    const isAvailable = Math.random() > 0.5;
    
    if (isAvailable) {
        resultElement.textContent = '¡Fecha disponible! Puede proceder.';
        resultElement.className = 'status-msg available';
    } else {
        resultElement.textContent = 'Sin disponibilidad. Seleccione otra fecha.';
        resultElement.className = 'status-msg not-available';
    }
}

// Función para enviar el formulario y mostrar alerta
function submitForm() {
    const name = document.getElementById('name').value;
    const appointmentDate = document.getElementById('appointment-date').value;
    const total = document.getElementById('total').textContent;
    
    // Validaciones básicas
    if (!name || !appointmentDate) {
        alert('Por favor, complete todos los campos obligatorios (Nombre y Fecha).');
        return;
    }
    
    if (total === '$0.00') {
        alert('Por favor, seleccione al menos un servicio.');
        return;
    }
    
    // Mensaje de éxito
    alert(`¡Cita confirmada!\n\nPaciente: ${name}\nFecha: ${appointmentDate}\nTotal a pagar: ${total}\n\nNos comunicaremos pronto para confirmar los detalles.`);
    
    // Aquí se enviaría el formulario:
    // document.getElementById('patient-form').submit();
}

// Inicialización: Agregar listeners cuando el DOM esté cargado
document.addEventListener('DOMContentLoaded', () => {
    // Actualizar cálculo automáticamente cuando se seleccionen servicios
    document.querySelectorAll('input[name="service"]').forEach(checkbox => {
        checkbox.addEventListener('change', calculateTotal);
    });
});