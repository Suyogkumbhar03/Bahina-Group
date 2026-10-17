import React, { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, Heart, ShieldCheck, CheckCircle2, ArrowRight } from "lucide-react"

export function DonationModal({ isOpen, onClose, initialCause = null }) {
  const [amount, setAmount] = useState("1000")
  const [customAmount, setCustomAmount] = useState("")
  const [frequency, setFrequency] = useState("one-time")
  const [cause, setCause] = useState(initialCause || "all")
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [pan, setPan] = useState("")
  const [step, setStep] = useState("form") // 'form' | 'success'

  const presetAmounts = ["500", "1000", "2500", "5000", "10000"]

  const handlePresetClick = (val) => {
    setAmount(val)
    setCustomAmount("")
  }

  const handleCustomChange = (e) => {
    setCustomAmount(e.target.value)
    setAmount(e.target.value)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setStep("success")
  }

  const handleReset = () => {
    setStep("form")
    onClose()
  }

  const finalAmount = customAmount || amount || "1000"

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-md"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", stiffness: 300, damping: 28 }}
            className="relative w-full max-w-lg rounded-3xl bg-[#091810] border border-[#3E9B63]/30 p-6 sm:p-8 text-[#F3EFEA] shadow-2xl z-10 max-h-[90vh] overflow-y-auto"
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-5 right-5 p-2 rounded-full bg-white/5 hover:bg-white/10 text-neutral-300 hover:text-white transition-colors"
              aria-label="Close donation modal"
            >
              <X className="w-5 h-5" />
            </button>

            {step === "form" ? (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-[#3E9B63]/20 border border-[#3E9B63]/40 text-[#3E9B63] text-xs font-semibold uppercase tracking-wider mb-3">
                    <Heart className="w-3.5 h-3.5 fill-current" />
                    <span>80G Tax Exemption Eligible</span>
                  </div>
                  <h3 className="font-display text-2xl sm:text-3xl font-medium text-white">
                    Make a Direct Impact
                  </h3>
                  <p className="text-sm text-neutral-300 mt-1">
                    Your contribution directly supports native afforestation, tribal girls' education, and clean water wells in rural Maharashtra.
                  </p>
                </div>

                {/* Frequency Toggle */}
                <div className="grid grid-cols-2 p-1 rounded-xl bg-white/5 border border-white/10 text-xs font-semibold">
                  <button
                    type="button"
                    onClick={() => setFrequency("one-time")}
                    className={`py-2 rounded-lg transition-all ${
                      frequency === "one-time"
                        ? "bg-[#3E9B63] text-white shadow"
                        : "text-neutral-400 hover:text-white"
                    }`}
                  >
                    Give Once
                  </button>
                  <button
                    type="button"
                    onClick={() => setFrequency("monthly")}
                    className={`py-2 rounded-lg transition-all ${
                      frequency === "monthly"
                        ? "bg-[#3E9B63] text-white shadow"
                        : "text-neutral-400 hover:text-white"
                    }`}
                  >
                    Give Monthly (Recurring)
                  </button>
                </div>

                {/* Preset Amounts */}
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-300 mb-2.5">
                    Select Donation Amount (₹ INR)
                  </label>
                  <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
                    {presetAmounts.map((val) => {
                      const isSelected = amount === val && !customAmount
                      return (
                        <button
                          key={val}
                          type="button"
                          onClick={() => handlePresetClick(val)}
                          className={`py-2.5 px-2 rounded-xl text-sm font-semibold border transition-all ${
                            isSelected
                              ? "border-[#D9A441] bg-[#D9A441]/20 text-[#D9A441] shadow-md"
                              : "border-white/10 bg-white/5 text-neutral-200 hover:bg-white/10"
                          }`}
                        >
                          ₹{val}
                        </button>
                      )
                    })}
                  </div>

                  <div className="mt-3 relative">
                    <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-400 text-sm font-semibold">
                      ₹
                    </span>
                    <input
                      type="number"
                      placeholder="Or enter custom amount in Rupees"
                      value={customAmount}
                      onChange={handleCustomChange}
                      min="100"
                      className="w-full pl-8 pr-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-[#3E9B63] focus:ring-1 focus:ring-[#3E9B63]"
                    />
                  </div>
                </div>

                {/* Donor Details */}
                <div className="space-y-3">
                  <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-300">
                    Donor Information (for 80G Tax Receipt)
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <input
                      type="text"
                      required
                      placeholder="Full Name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-[#3E9B63]"
                    />
                    <input
                      type="email"
                      required
                      placeholder="Email Address"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-[#3E9B63]"
                    />
                  </div>
                  <input
                    type="text"
                    placeholder="PAN Number (Optional, for instant 80G certificate)"
                    value={pan}
                    onChange={(e) => setPan(e.target.value.toUpperCase())}
                    maxLength={10}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-sm text-white uppercase placeholder-neutral-500 focus:outline-none focus:border-[#3E9B63]"
                  />
                </div>

                {/* Trust Badge */}
                <div className="flex items-center space-x-2 text-xs text-neutral-400 bg-white/[0.02] p-3 rounded-xl border border-white/5">
                  <ShieldCheck className="w-4 h-4 text-[#3E9B63] shrink-0" />
                  <span>
                    Secured 256-bit payment gateway. 100% tax exemption under Section 80G.
                  </span>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="w-full py-3.5 px-6 rounded-full bg-[#E5B842] hover:bg-[#d8a832] text-black font-semibold text-sm uppercase tracking-wider transition-all duration-200 shadow-lg hover:shadow-xl flex items-center justify-center space-x-2 font-sans"
                >
                  <span>Donate ₹{Number(finalAmount).toLocaleString("en-IN")} Now</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>
            ) : (
              /* Success View */
              <div className="text-center py-6 space-y-5">
                <div className="w-16 h-16 rounded-full bg-[#3E9B63]/20 border border-[#3E9B63] flex items-center justify-center mx-auto text-[#3E9B63]">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <div>
                  <h3 className="font-display text-3xl font-medium text-white">
                    Thank You, {name || "Supporter"}!
                  </h3>
                  <p className="text-sm text-neutral-300 mt-2 max-w-sm mx-auto">
                    Your generous contribution of <strong className="text-[#D9A441]">₹{Number(finalAmount).toLocaleString("en-IN")}</strong> has been received by Bahina Foundation.
                  </p>
                </div>
                <div className="bg-white/5 p-4 rounded-2xl border border-white/10 text-left text-xs space-y-1.5 text-neutral-300">
                  <p><strong>Receipt ID:</strong> BF-{Math.floor(100000 + Math.random() * 900000)}</p>
                  <p><strong>80G Certificate:</strong> A digital tax exemption certificate will be sent to <strong>{email || "your email"}</strong>.</p>
                  <p><strong>Impact Allocation:</strong> 100% routed to field initiatives in rural Maharashtra.</p>
                </div>
                <button
                  onClick={handleReset}
                  className="w-full py-3 rounded-full bg-[#3E9B63] hover:bg-[#348554] text-white font-semibold text-sm uppercase tracking-wider transition-colors"
                >
                  Back to Foundation Page
                </button>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}

export default DonationModal
