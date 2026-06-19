'use client'

import { useEffect } from 'react'

const TOUR_COMPLETED_KEY = 'tiendri_tour_completed'
const TOUR_TRIGGER_KEY = 'tiendri_tour_trigger'

export function useDashboardTour() {
  useEffect(() => {
    if (sessionStorage.getItem(TOUR_TRIGGER_KEY) !== 'true') return
    if (localStorage.getItem(TOUR_COMPLETED_KEY) === 'true') return

    sessionStorage.removeItem(TOUR_TRIGGER_KEY)

    void Promise.all([
      import('driver.js'),
      import('driver.js/dist/driver.css'),
      import('@/onboarding/tour-steps'),
    ]).then(([{ driver }, , { DASHBOARD_TOUR_STEPS }]) => {
      const driverObj = driver({
        showProgress: true,
        animate: true,
        overlayColor: 'rgba(0,0,0,0.5)',
        stagePadding: 8,
        stageRadius: 8,
        popoverClass: 'tiendri-tour-popover',
        nextBtnText: 'Siguiente',
        prevBtnText: 'Anterior',
        doneBtnText: '¡Listo!',
        onDestroyed: () => {
          localStorage.setItem(TOUR_COMPLETED_KEY, 'true')
        },
        steps: DASHBOARD_TOUR_STEPS.map(step => ({
          element: step.element,
          popover: {
            title: step.title,
            description: step.description,
          },
        })),
      })

      // Delay to ensure DOM is ready after navigation
      setTimeout(() => { driverObj.drive() }, 800)
    })
  }, [])
}
