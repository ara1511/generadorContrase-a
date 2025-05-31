"use client"

import { useState } from "react"
import { Copy, RefreshCw, Shield, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Slider } from "@/components/ui/slider"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function PasswordGenerator() {
  // Estados para manejar la configuración de la contraseña
  const [length, setLength] = useState([12]) // Longitud por defecto: 12
  const [includeLowercase, setIncludeLowercase] = useState(true)
  const [includeUppercase, setIncludeUppercase] = useState(true)
  const [includeNumbers, setIncludeNumbers] = useState(true)
  const [includeSymbols, setIncludeSymbols] = useState(false)
  const [generatedPassword, setGeneratedPassword] = useState("")
  const [copied, setCopied] = useState(false)
  const [error, setError] = useState("")

  // Conjuntos de caracteres disponibles
  const characterSets = {
    lowercase: "abcdefghijklmnopqrstuvwxyz",
    uppercase: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
    numbers: "0123456789",
    symbols: "!@#$%^&*()_+-=[]{}|;:,.<>?",
  }

  // Función para generar la contraseña
  const generatePassword = () => {
    // Resetear errores previos
    setError("")

    // Validar que al menos un tipo de carácter esté seleccionado
    if (!includeLowercase && !includeUppercase && !includeNumbers && !includeSymbols) {
      setError("Debes seleccionar al menos un tipo de carácter")
      return
    }

    // Construir el conjunto de caracteres disponibles
    let availableChars = ""
    if (includeLowercase) availableChars += characterSets.lowercase
    if (includeUppercase) availableChars += characterSets.uppercase
    if (includeNumbers) availableChars += characterSets.numbers
    if (includeSymbols) availableChars += characterSets.symbols

    // Generar la contraseña aleatoria
    let password = ""
    for (let i = 0; i < length[0]; i++) {
      const randomIndex = Math.floor(Math.random() * availableChars.length)
      password += availableChars[randomIndex]
    }

    setGeneratedPassword(password)
    setCopied(false) // Resetear el estado de copiado
  }

  // Función para copiar la contraseña al portapapeles
  const copyToClipboard = async () => {
    if (!generatedPassword) return

    try {
      await navigator.clipboard.writeText(generatedPassword)
      setCopied(true)
      // Resetear el estado de copiado después de 2 segundos
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error("Error al copiar al portapapeles:", err)
    }
  }

  // Función para manejar el cambio de longitud desde el input
  const handleLengthInputChange = (value: string) => {
    const numValue = Number.parseInt(value)
    if (!isNaN(numValue) && numValue >= 4 && numValue <= 50) {
      setLength([numValue])
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4 flex items-center justify-center">
      <Card className="w-full max-w-md shadow-xl border-0 bg-white/80 backdrop-blur-sm">
        <CardHeader className="text-center space-y-2">
          <div className="mx-auto w-12 h-12 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full flex items-center justify-center">
            <Shield className="w-6 h-6 text-white" />
          </div>
          <CardTitle className="text-2xl font-bold text-gray-800">Generador de Contraseñas</CardTitle>
          <CardDescription className="text-gray-600">Crea contraseñas seguras y personalizadas</CardDescription>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Control de longitud */}
          <div className="space-y-3">
            <Label className="text-sm font-medium text-gray-700">Longitud: {length[0]} caracteres</Label>
            <div className="space-y-2">
              <Slider value={length} onValueChange={setLength} max={50} min={4} step={1} className="w-full" />
              <Input
                type="number"
                min={4}
                max={50}
                value={length[0]}
                onChange={(e) => handleLengthInputChange(e.target.value)}
                className="w-full text-center"
              />
            </div>
          </div>

          {/* Opciones de caracteres */}
          <div className="space-y-4">
            <Label className="text-sm font-medium text-gray-700">Tipos de caracteres:</Label>

            <div className="space-y-3">
              {/* Letras minúsculas */}
              <div className="flex items-center space-x-3">
                <Checkbox id="lowercase" checked={includeLowercase} onCheckedChange={setIncludeLowercase} />
                <Label htmlFor="lowercase" className="text-sm text-gray-600">
                  Letras minúsculas (a-z)
                </Label>
              </div>

              {/* Letras mayúsculas */}
              <div className="flex items-center space-x-3">
                <Checkbox id="uppercase" checked={includeUppercase} onCheckedChange={setIncludeUppercase} />
                <Label htmlFor="uppercase" className="text-sm text-gray-600">
                  Letras mayúsculas (A-Z)
                </Label>
              </div>

              {/* Números */}
              <div className="flex items-center space-x-3">
                <Checkbox id="numbers" checked={includeNumbers} onCheckedChange={setIncludeNumbers} />
                <Label htmlFor="numbers" className="text-sm text-gray-600">
                  Números (0-9)
                </Label>
              </div>

              {/* Símbolos especiales */}
              <div className="flex items-center space-x-3">
                <Checkbox id="symbols" checked={includeSymbols} onCheckedChange={setIncludeSymbols} />
                <Label htmlFor="symbols" className="text-sm text-gray-600">
                  Símbolos especiales (!@#$%...)
                </Label>
              </div>
            </div>
          </div>

          {/* Mensaje de error */}
          {error && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-sm text-red-600">{error}</p>
            </div>
          )}

          {/* Botón para generar contraseña */}
          <Button
            onClick={generatePassword}
            className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white font-medium py-2.5"
          >
            <RefreshCw className="w-4 h-4 mr-2" />
            Generar Contraseña
          </Button>

          {/* Mostrar contraseña generada */}
          {generatedPassword && (
            <div className="space-y-3">
              <Label className="text-sm font-medium text-gray-700">Contraseña generada:</Label>
              <div className="relative">
                <Input
                  value={generatedPassword}
                  readOnly
                  className="pr-12 font-mono text-sm bg-gray-50 border-gray-200"
                />
                <Button
                  onClick={copyToClipboard}
                  variant="ghost"
                  size="sm"
                  className="absolute right-1 top-1 h-8 w-8 p-0 hover:bg-gray-200"
                >
                  {copied ? <Check className="w-4 h-4 text-green-600" /> : <Copy className="w-4 h-4 text-gray-500" />}
                </Button>
              </div>
              {copied && <p className="text-sm text-green-600 text-center">¡Contraseña copiada al portapapeles!</p>}
            </div>
          )}

          {/* Consejos de seguridad */}
          <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <h4 className="text-sm font-medium text-blue-800 mb-2">💡 Consejos de seguridad:</h4>
            <ul className="text-xs text-blue-700 space-y-1">
              <li>• Usa al menos 12 caracteres</li>
              <li>• Incluye diferentes tipos de caracteres</li>
              <li>• No reutilices contraseñas importantes</li>
              <li>• Considera usar un gestor de contraseñas</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
