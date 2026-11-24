/**
 * Práctica UT4 - Taller BiciRuta
 * Validación a medida con JavaScript, setCustomValidity() y ampliación (letra del DNI)
 */

document.addEventListener("DOMContentLoaded", () => {
  const formCita = document.getElementById("form-cita");
  const inputFecha = document.getElementById("fecha");
  const checkCuenta = document.getElementById("crear-cuenta");
  const fieldsetCuenta = document.getElementById("fieldset-cuenta");
  const inputClave = document.getElementById("clave");
  const inputClave2 = document.getElementById("clave2");
  const textareaAveria = document.getElementById("averia");
  const contadorAveria = document.getElementById("contador-averia");
  const inputDni = document.getElementById("dni");
  const inputHoneypot = document.getElementById("sitio-web");

  // REGLA 1: Fecha mínima = mañana en formato aaaa-mm-dd
  const hoy = new Date();
  const manana = new Date(hoy.getFullYear(), hoy.getMonth(), hoy.getDate() + 1);

  const yyyy = manana.getFullYear();
  const mm = String(manana.getMonth() + 1).padStart(2, "0");
  const dd = String(manana.getDate()).padStart(2, "0");
  inputFecha.min = `${yyyy}-${mm}-${dd}`;

  // REGLA 2: Domingos cerrados
  function validarFecha() {
    if (!inputFecha.value) {
      inputFecha.setCustomValidity("");
      return;
    }

    const [anio, mes, dia] = inputFecha.value.split("-").map(Number);
    const fechaElegida = new Date(anio, mes - 1, dia);

    if (fechaElegida.getDay() === 0) {
      inputFecha.setCustomValidity("El taller cierra los domingos.");
    } else {
      inputFecha.setCustomValidity("");
    }
  }

  inputFecha.addEventListener("input", validarFecha);
  inputFecha.addEventListener("change", validarFecha);

  // REGLA 3: Cuenta opcional (habilitar fieldset y enfocar contraseña)
  checkCuenta.addEventListener("change", () => {
    if (checkCuenta.checked) {
      fieldsetCuenta.disabled = false;
      inputClave.focus();
    } else {
      fieldsetCuenta.disabled = true;
      inputClave.value = "";
      inputClave2.value = "";
      inputClave2.setCustomValidity("");
    }
  });

  // REGLA 4: Contraseñas coincidentes
  function comprobarClaves() {
    if (inputClave2.value && inputClave2.value !== inputClave.value) {
      inputClave2.setCustomValidity("Las contraseñas no coinciden.");
    } else {
      inputClave2.setCustomValidity("");
    }
  }

  inputClave.addEventListener("input", comprobarClaves);
  inputClave2.addEventListener("input", comprobarClaves);

  // REGLA 5: Contador de caracteres en tiempo real (N / 500 caracteres)
  function actualizarContador() {
    const longitudActual = textareaAveria.value.length;
    contadorAveria.textContent = `${longitudActual} / 500 caracteres`;
  }

  textareaAveria.addEventListener("input", actualizarContador);
  actualizarContador();

  // AMPLIACIÓN: Validación real de la letra del DNI español
  function validarLetraDni() {
    const valor = inputDni.value.trim().toUpperCase();

    if (!/^[0-9]{8}[A-Z]$/.test(valor)) {
      inputDni.setCustomValidity("");
      return;
    }

    const numero = parseInt(valor.slice(0, 8), 10);
    const letraIntroducida = valor.charAt(8);
    const tablaLetras = "TRWAGMYFPDXBNJZSQVHLCKE";
    const letraCorrecta = tablaLetras.charAt(numero % 23);

    if (letraIntroducida !== letraCorrecta) {
      inputDni.setCustomValidity(
        `La letra del DNI no es correcta. Para ${numero} corresponde la letra ${letraCorrecta}.`,
      );
    } else {
      inputDni.setCustomValidity("");
    }
  }

  inputDni.addEventListener("input", validarLetraDni);

  // AMPLIACIÓN: Protección anti-spam (Honeypot)
  formCita.addEventListener("submit", (evento) => {
    if (inputHoneypot && inputHoneypot.value.trim() !== "") {
      evento.preventDefault();
    }
  });
});
