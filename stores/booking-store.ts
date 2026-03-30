import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export type BookingStep = 1 | 2 | 3 | 4 | 5 | 6

export interface Addon {
  id: string
  name: string
  price: number
}

interface BookingState {
  currentStep: BookingStep
  serviceId: string | null
  addons: Addon[]
  carSize: 'SEDAN' | 'SUV' | 'TRUCK' | null
  carDetails: { make: string; model: string; year: string; plate: string } | null
  date: Date | null
  timeSlot: string | null
  address: string | null
  coordinates: { lat: number; lng: number } | null
  instructions: string
  promoCode: string | null
  promoDiscount: number
  totalPrice: number
  
  // Actions
  setStep: (step: BookingStep) => void
  nextStep: () => void
  prevStep: () => void
  setService: (id: string, basePrice: number) => void
  toggleAddon: (addon: Addon) => void
  setVehicle: (size: 'SEDAN' | 'SUV' | 'TRUCK', details?: { make: string; model: string; year: string; plate: string }) => void
  setSchedule: (date: Date, timeSlot: string) => void
  setLocation: (address: string, lat?: number, lng?: number) => void
  setInstructions: (text: string) => void
  applyPromo: (code: string, discountAmount: number) => void
  reset: () => void
}

const initialState = {
  currentStep: 1 as BookingStep,
  serviceId: null,
  addons: [],
  carSize: null,
  carDetails: null,
  date: null,
  timeSlot: null,
  address: null,
  coordinates: null,
  instructions: '',
  promoCode: null,
  promoDiscount: 0,
  totalPrice: 0,
}

export const useBookingStore = create<BookingState>()(
  persist(
    (set, get) => ({
      ...initialState,

      setStep: (step) => set({ currentStep: step }),
      nextStep: () => {
        const { currentStep } = get()
        if (currentStep < 6) set({ currentStep: (currentStep + 1) as BookingStep })
      },
      prevStep: () => {
        const { currentStep } = get()
        if (currentStep > 1) set({ currentStep: (currentStep - 1) as BookingStep })
      },

      setService: (id, basePrice) => set((state) => {
        // Recalculate total price
        const addonsTotal = state.addons.reduce((sum, a) => sum + a.price, 0)
        // Multiplier for size
        const sizeMultiplier = state.carSize === 'SUV' ? 1.2 : state.carSize === 'TRUCK' ? 1.3 : 1.0
        
        return { 
          serviceId: id,
          totalPrice: ((basePrice + addonsTotal) * sizeMultiplier) - state.promoDiscount
        }
      }),

      toggleAddon: (addon) => set((state) => {
        const exists = state.addons.find(a => a.id === addon.id)
        const newAddons = exists 
          ? state.addons.filter(a => a.id !== addon.id)
          : [...state.addons, addon]
          
        return { addons: newAddons }
      }),

      setVehicle: (size, details) => set({ carSize: size, ...(details && { carDetails: details }) }),

      setSchedule: (date, timeSlot) => set({ date, timeSlot }),

      setLocation: (address, lat, lng) => set({ 
        address, 
        ...(lat && lng && { coordinates: { lat, lng }}) 
      }),

      setInstructions: (text) => set({ instructions: text }),

      applyPromo: (code, discount) => set((state) => ({ 
        promoCode: code, 
        promoDiscount: discount,
        totalPrice: Math.max(0, state.totalPrice - discount) 
      })),

      reset: () => set(initialState),
    }),
    {
      name: 'luxewash-booking-storage',
      partialize: (state) => ({ 
        // Persist everything except the exact step so they can resume
        serviceId: state.serviceId,
        addons: state.addons,
        carSize: state.carSize,
        carDetails: state.carDetails,
        address: state.address,
      }),
    }
  )
)
