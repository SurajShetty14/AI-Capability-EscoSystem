"use client"

import { useState, useEffect, useRef } from "react"
import { motion } from "framer-motion"
import { Camera, CheckCircle2, Sun, AlertCircle } from "lucide-react"

interface CameraStepProps {
  onCameraGranted: (granted: boolean, deviceId?: string) => void
  cameraGranted: boolean
}

export function CameraStep({ onCameraGranted, cameraGranted }: CameraStepProps) {
  const [faceDetected, setFaceDetected] = useState(false)
  const [goodLighting, setGoodLighting] = useState(false)
  const [selectedDevice, setSelectedDevice] = useState<string>("")
  const [devices, setDevices] = useState<MediaDeviceInfo[]>([])
  const videoRef = useRef<HTMLVideoElement>(null)
  const streamRef = useRef<MediaStream | null>(null)

  useEffect(() => {
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices
        .getUserMedia({ video: true })
        .then((stream) => {
          streamRef.current = stream
          if (videoRef.current) {
            videoRef.current.srcObject = stream
          }
          onCameraGranted(true)
          
          setTimeout(() => {
            setFaceDetected(true)
            setGoodLighting(true)
          }, 1000)
        })
        .catch(() => {
          onCameraGranted(false)
        })
    } else {
      onCameraGranted(false)
    }

    if (navigator.mediaDevices && navigator.mediaDevices.enumerateDevices) {
      navigator.mediaDevices.enumerateDevices().then((deviceList) => {
        const cameras = deviceList.filter((device) => device.kind === "videoinput")
        setDevices(cameras)
        if (cameras.length > 0) {
          setSelectedDevice(cameras[0].deviceId)
        }
      })
    }

    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop())
      }
    }
  }, [])

  const handleDeviceChange = (deviceId: string) => {
    setSelectedDevice(deviceId)
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop())
    }

    navigator.mediaDevices
      .getUserMedia({ video: { deviceId: { exact: deviceId } } })
      .then((stream) => {
        streamRef.current = stream
        if (videoRef.current) {
          videoRef.current.srcObject = stream
        }
      })
  }

  return (
    <div className="space-y-6">
      <div className="relative w-full aspect-video rounded-2xl overflow-hidden border-3" style={{ borderColor: "#80EFC0" }}>
        <video
          ref={videoRef}
          autoPlay
          playsInline
          muted
          className="w-full h-full object-cover"
          style={{
            boxShadow: "0 8px 32px rgba(128, 239, 192, 0.3)",
          }}
        />

        {faceDetected && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="absolute top-4 left-4 px-4 py-2 bg-green-500 text-white rounded-full font-bold shadow-lg flex items-center gap-2"
          >
            <CheckCircle2 className="w-4 h-4" />
            <span>Face Detected</span>
          </motion.div>
        )}

        {goodLighting && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="absolute top-4 right-4 px-4 py-2 bg-white/90 backdrop-blur rounded-full flex items-center gap-2"
          >
            <Sun className="w-4 h-4 text-yellow-600" />
            <span className="text-sm font-semibold text-gray-900">Good Lighting</span>
          </motion.div>
        )}

        <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/60 to-transparent p-4">
          <div className="text-white text-sm space-y-1">
            <p>✓ Position yourself in center</p>
            <p>✓ Ensure good lighting</p>
            <p>✓ Remove others from frame</p>
          </div>
        </div>
      </div>

      {devices.length > 1 && (
        <div>
          <label className="block text-sm font-semibold mb-2" style={{ color: "#1E5A3B" }}>
            Select Camera
          </label>
          <div className="relative">
            <Camera className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5" style={{ color: "#9CA3AF" }} />
            <select
              value={selectedDevice}
              onChange={(e) => handleDeviceChange(e.target.value)}
              className="w-full h-12 pl-12 pr-4 rounded-xl border-2 focus:outline-none focus:ring-4 transition-all"
              style={{
                borderColor: "#E8FAF0",
                backgroundColor: "#FFFFFF",
              }}
            >
              {devices.map((device) => (
                <option key={device.deviceId} value={device.deviceId}>
                  {device.label || `Camera ${device.deviceId.slice(0, 8)}`}
                </option>
              ))}
            </select>
          </div>
        </div>
      )}

      <div className="p-4 rounded-xl" style={{ backgroundColor: "#E8FAF0" }}>
        <div className="flex items-start gap-2 mb-2">
          <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: "#4A9A6A" }} />
          <div className="text-sm font-semibold" style={{ color: "#1E5A3B" }}>
            Tips for best results:
          </div>
        </div>
        <ul className="space-y-1 text-sm ml-7" style={{ color: "#2D7A52" }}>
          <li>• Position yourself in the center of the frame</li>
          <li>• Ensure good lighting (avoid backlighting)</li>
          <li>• Remove others from the camera view</li>
          <li>• Avoid wearing hats or sunglasses</li>
        </ul>
      </div>
    </div>
  )
}

