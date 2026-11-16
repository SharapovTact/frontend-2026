import { useCallback, useEffect, useRef } from 'react'
import { flushSync } from 'react-dom'
import { createRoot } from 'react-dom/client'
import html2canvas from 'html2canvas'
import { jsPDF } from 'jspdf'
import { Presentation } from '../../types/presentation'
import { SlidePreview } from '../SlidePreview/SlidePreview'

function usePdfExport() {
    const containerRef = useRef<HTMLDivElement | null>(null)

    useEffect(() => {
        const container = document.createElement('div')
        container.style.position = 'fixed'
        container.style.left = '-10000px'
        container.style.top = '0'
        document.body.appendChild(container)
        containerRef.current = container

        return () => {
            container.remove()
            containerRef.current = null
        }
    }, [])

    const exportToPdf = useCallback(async (presentation: Presentation) => {
        const container = containerRef.current
        if (!container) return

        const pdf = new jsPDF({ orientation: 'landscape', unit: 'px', format: [800, 450] })
        const root = createRoot(container)

        for (let i = 0; i < presentation.slides.length; i++) {
            if (i > 0) {
                pdf.addPage([800, 450], 'landscape')
            }
            const slide = presentation.slides[i]

            flushSync(() => {
                root.render(<SlidePreview slide={slide} />)
            })
            const canvas = await html2canvas(container, { scale: 2, useCORS: true })
            pdf.addImage(canvas.toDataURL('image/png'), 'PNG', 0, 0, 800, 450)
        }

        root.unmount()
        pdf.save(`${presentation.name}.pdf`)
    }, [])

    return { exportToPdf }
}

export { usePdfExport }