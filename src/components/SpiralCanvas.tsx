"use client"

import { renderCanvas } from "@/lib/renderCanvas"
import { memo, useEffect, useState } from "react"

import React from 'react'

function SpiralCanvas() {

  useEffect(() => {
    renderCanvas()
  }, [])

  return (
    <canvas
      className="bg-skin-base pointer-events-none absolute inset-0" 
      id="canvas">
    </canvas>
  )
}

export default memo(SpiralCanvas)
