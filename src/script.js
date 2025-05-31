// Elementos del DOM
const lengthSlider = document.getElementById("length")
const lengthInput = document.getElementById("lengthInput")
const lengthValue = document.getElementById("lengthValue")
const lowercaseCheck = document.getElementById("lowercase")
const uppercaseCheck = document.getElementById("uppercase")
const numbersCheck = document.getElementById("numbers")
const symbolsCheck = document.getElementById("symbols")
const generateBtn = document.getElementById("generateBtn")
const errorDiv = document.getElementById("error")
const resultDiv = document.getElementById("result")
const generatedPasswordInput = document.getElementById("generatedPassword")
const copyBtn = document.getElementById("copyBtn")
const copyMessage = document.getElementById("copyMessage")

// Conjuntos de caracteres
const characterSets = {
  lowercase: "abcdefghijklmnopqrstuvwxyz",
  uppercase: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
  numbers: "0123456789",
  symbols: "!@#$%^&*()_+-=[]{}|;:,.<>?",
}

// Sincronizar slider con input numérico
lengthSlider.addEventListener("input", function () {
  const value = this.value
  lengthInput.value = value
  lengthValue.textContent = value
})

lengthInput.addEventListener("input", function () {
  const value = Number.parseInt(this.value)
  if (value >= 4 && value <= 50) {
    lengthSlider.value = value
    lengthValue.textContent = value
  }
})

// Función para generar contraseña
function generatePassword() {
  // Limpiar errores previos
  hideError()

  // Obtener configuración
  const length = Number.parseInt(lengthSlider.value)
  const includeLowercase = lowercaseCheck.checked
  const includeUppercase = uppercaseCheck.checked
  const includeNumbers = numbersCheck.checked
  const includeSymbols = symbolsCheck.checked

  // Validar que al menos un tipo esté seleccionado
  if (!includeLowercase && !includeUppercase && !includeNumbers && !includeSymbols) {
    showError("Debes seleccionar al menos un tipo de carácter")
    return
  }

  // Construir conjunto de caracteres disponibles
  let availableChars = ""
  if (includeLowercase) availableChars += characterSets.lowercase
  if (includeUppercase) availableChars += characterSets.uppercase
  if (includeNumbers) availableChars += characterSets.numbers
  if (includeSymbols) availableChars += characterSets.symbols

  // Generar contraseña
  let password = ""
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * availableChars.length)
    password += availableChars[randomIndex]
  }

  // Mostrar resultado
  generatedPasswordInput.value = password
  resultDiv.classList.remove("hidden")
  hideCopyMessage()
}

// Función para copiar al portapapeles
async function copyToClipboard() {
  const password = generatedPasswordInput.value
  if (!password) return

  try {
    await navigator.clipboard.writeText(password)
    showCopyMessage()
  } catch (err) {
    // Fallback para navegadores que no soportan clipboard API
    generatedPasswordInput.select()
    document.execCommand("copy")
    showCopyMessage()
  }
}

// Funciones de utilidad para mostrar/ocultar mensajes
function showError(message) {
  errorDiv.textContent = message
  errorDiv.classList.remove("hidden")
}

function hideError() {
  errorDiv.classList.add("hidden")
}

function showCopyMessage() {
  copyMessage.classList.remove("hidden")
  copyBtn.textContent = "✅"
  setTimeout(() => {
    hideCopyMessage()
  }, 2000)
}

function hideCopyMessage() {
  copyMessage.classList.add("hidden")
  copyBtn.textContent = "📋"
}

// Event listeners
generateBtn.addEventListener("click", generatePassword)
copyBtn.addEventListener("click", copyToClipboard)

// Generar contraseña inicial
generatePassword()

// Mensaje de bienvenida en consola
console.log("🐳 Generador de Contraseñas ejecutándose en Docker + Nginx")
console.log("🔐 Aplicación web estática servida correctamente")
