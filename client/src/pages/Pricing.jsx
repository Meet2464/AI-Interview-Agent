import React, { useState } from 'react'
import { FaArrowLeft, FaCheckCircle, FaCoins, FaRobot, FaMicrophone,
  FaChartBar, FaHistory, FaEnvelope, FaCommentDots, FaChartLine,
  FaFileAlt, FaCode, FaUserTie, FaComments, FaBolt, FaFileExport,
  FaHeadset, FaClipboardCheck, FaLightbulb, FaBrain, FaRoad, FaRocket
} from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'
import { motion } from "motion/react"
import { ServerUrl } from '../App'
import axios from "axios";
import { useDispatch } from 'react-redux'
import { setUserData } from '../redux/userSlice'

// Maps each feature string to a representative icon, based on keywords.
const getFeatureIcon = (feature) => {
  const f = feature.toLowerCase();
  if (f.includes("everything in")) return FaCheckCircle;
  if (f.includes("credit")) return FaCoins;
  if (f.includes("voice")) return FaMicrophone;
  if (f.includes("report")) return FaChartBar;
  if (f.includes("history")) return FaHistory;
  if (f.includes("email support") || f.includes("priority email")) return FaEnvelope;
  if (f.includes("feedback")) return FaCommentDots;
  if (f.includes("analytics") || f.includes("trend")) return FaChartLine;
  if (f.includes("resume") && f.includes("ats")) return FaClipboardCheck;
  if (f.includes("resume") && f.includes("suggestion")) return FaLightbulb;
  if (f.includes("resume")) return FaFileAlt;
  if (f.includes("technical") || f.includes("coding")) return FaCode;
  if (f.includes("hr interview")) return FaUserTie;
  if (f.includes("behavior")) return FaBrain;
  if (f.includes("behavioral")) return FaComments;
  if (f.includes("roadmap")) return FaRoad;
  if (f.includes("fastest") || f.includes("priority ai") || f.includes("response")) return FaBolt;
  if (f.includes("export")) return FaFileExport;
  if (f.includes("support")) return FaHeadset;
  if (f.includes("early access")) return FaRocket;
  if (f.includes("basic ai interview")) return FaRobot;
  return FaCheckCircle;
};

const Pricing = () => {
    const navigate = useNavigate()
    const [selectedPlan , setSelectedPlan] = useState("free");
    const [loadingPlan, setLoadingPlan] = useState(null);
    const dispatch = useDispatch()

  const plans = [
  {
    id: "free",
    name: "Free",
    price: "₹0",
    credits: 100,
    usage: "Perfect for getting started",
    description:
      "Practice interviews with AI and improve your confidence at no cost.",
    features: [
      "100 AI Interview Credits",
      "Basic AI Interview",
      "Voice Interview Access",
      "Basic Performance Report",
      "Limited Interview History",
      "Email Support",
    ],
    button: "Get Started",
    default: true,
  },

  {
    id: "basic",
    name: "Starter",
    price: "₹100",
    credits: 150,
    usage: "2× more practice than Free",
    description:
      "Everything in Free, plus additional credits and detailed interview insights.",
    features: [
      "Everything in Free",
      "150 AI Interview Credits",
      "Detailed AI Feedback",
      "Performance Analytics",
      "Complete Interview History",
      "Resume-based Interview",
      "Priority Email Support",
    ],
    button: "Choose Starter",
  },

  {
    id: "pro",
    name: "Pro",
    price: "₹500",
    credits: 650,
    usage: "Best value for serious preparation",
    description:
      "Everything in Starter, with advanced AI features for job-ready candidates.",
    features: [
      "Everything in Starter",
      "650 AI Interview Credits",
      "Advanced AI Feedback",
      "Technical Interview Mode",
      "HR Interview Mode",
      "Behavioral Interview Mode",
      "Skill Trend Analysis",
      "Priority AI Processing",
      "Export Interview Reports",
      "Priority Support",
    ],
    badge: "Best Value",
    button: "Go Pro",
  },

  {
    id: "premium",
    name: "Premium",
    price: "₹1000",
    credits: 1500,
    usage: "Unlimited career preparation",
    description:
      "Everything in Pro with premium AI tools for complete interview success.",
    features: [
      "Everything in Pro",
      "1500 AI Interview Credits",
      "Unlimited Performance Reports",
      "Unlimited Interview History",
      "AI Resume Review",
      "Resume ATS Score",
      "Resume Improvement Suggestions",
      "Mock HR Interviews",
      "Mock Technical Interviews",
      "Coding Interview Mode",
      "Behavior Analysis",
      "Personalized Learning Roadmap",
      "Fastest AI Response",
      "24×7 Premium Support",
      "Early Access to New Features",
    ],
    badge: "Most Popular",
    button: "Upgrade Now",
  },
];

    const handlePayment = async (plan) => {
        try {
            setLoadingPlan(plan.id)

            const amount =
                plan.id === "basic" ? 100 :
                plan.id === "pro" ? 500 :
                plan.id === "premium" ? 1000 :
                0;

            const result = await axios.post(ServerUrl + "/api/payment/order" , {
                planId: plan.id,
                amount: amount,
                credits: plan.credits,
            },{ withCredentials: true })
            console.log(result.data)

            const options = {
                key: import.meta.env.VITE_RAZORPAY_KEY_ID,
                amount: result.data.amount,
                currency: "INR",
                name: "InterviewIQ.AI",
                description: `${plan.name} - ${plan.credits} Credits`,
                order_id: result.data.id,

                handler: async function (response) {
                    const verifypay = await axios.post(ServerUrl + "/api/payment/verify" , 
                response,{ withCredentials: true })
                dispatch(setUserData(verifypay.data.user))

                        alert("Payment Successfully 🎉 Credits Added!...");
                        navigate("/")
                },
                theme:{
                    color: "#10b981"
                },

                }

                const rzp = new window.Razorpay(options)
                rzp.open()

                setLoadingPlan(null);

            } catch (error) {
                console.log(error)
                setLoadingPlan(null);
        }
    }

  return (
    <div className='min-h-screen bg-gradient-to-br from-gray-50 to-emerald-50 py-16 px-6'>
        <div className='max-w-6xl mx-auto mb-14 flex items-start gap-4'>
                <button
                onClick={()=>navigate("/")}
                className='mt-2 p-3 rounded-full bg-white shadow hover:shadow-md transition'>
                    <FaArrowLeft className='text-gray-600'/>
                </button>

                <div className='text-center w-full'>
                    <h1 className='text-4xl font-bold text-gray-800'>
                        Choose Your Plan
                    </h1>

                    <p className='text-gray-500 mt-3 text-lg'>
                        Flexible pricing to match your interview preparation goals.
                    </p>
                </div>
        </div>

        <div className='grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto items-start'>
            {
                plans.map((plan)=>{
                    const isSelected = selectedPlan === plan.id

                    return(
                        <motion.div key={plan.id}
                        whileHover={!plan.default ? {y:-4} : {}}
                        onClick={() => !plan.default && setSelectedPlan(plan.id)}

                        className={`rounded-2xl p-6 transition-all duration-300 border bg-white text-left flex flex-col h-full
                        ${
                            isSelected
                            ? "border-emerald-600 shadow-lg"
                            : "border-gray-200 shadow-sm"
                        }
                        ${plan.default ? "cursor-default" : "cursor-pointer"}
                        `}>

                        {/* Top pill */}
                        <div className="h-6">
                        {plan.badge && (
                            <span className="inline-block bg-emerald-50 text-emerald-700 text-[11px] font-medium px-3 py-1 rounded-full">
                                {plan.badge}
                            </span>
                        )}
                        {plan.default && (
                            <span className="inline-block bg-gray-100 text-gray-600 text-[11px] font-medium px-3 py-1 rounded-full">
                                Default
                            </span>
                        )}
                        </div>

                        {/* Plan Name */}
                        <h3 className="text-lg font-semibold text-gray-800 mt-3">
                        {plan.name}
                        </h3>

                        {/* Description */}
                        <p className="text-gray-500 mt-2 text-sm leading-relaxed min-h-[40px]">
                        {plan.description}
                        </p>

                        {/* Price */}
                        <div className="mt-4">
                        <span className="text-2xl font-bold text-gray-900">
                            {plan.price}
                        </span>
                        <span className="text-gray-400 text-sm"> /one-time</span>
                        <p className="text-gray-500 mt-1 text-xs">
                            {plan.credits} Credits · {plan.usage}
                        </p>
                        </div>

                        {/* CTA */}
                        {!plan.default ? (
                        <button 
                        disabled={loadingPlan === plan.id}
                        onClick={(e)=>{e.stopPropagation();
                            if(!isSelected){
                                setSelectedPlan(plan.id)
                            }else{
                                handlePayment(plan)
                            }
                        }}
                        className={`w-full mt-5 py-2.5 rounded-full text-sm font-semibold transition 
                            ${isSelected ? "bg-emerald-600 text-white hover:bg-emerald-700"
                            : "bg-gray-100 text-gray-700 hover:bg-emerald-50"
                            }`}>
                                {loadingPlan === plan.id 
                                ? "Processing..."
                                :isSelected
                                ? "Proceed To Pay" : "Select Plan"}
                            </button>
                        ) : (
                        <button className="w-full mt-5 py-2.5 rounded-full text-sm font-semibold border border-gray-300 text-gray-700 hover:bg-gray-50 transition">
                            {plan.button}
                        </button>
                        )}

                        <div className="border-t border-gray-100 mt-6 pt-5 flex-1">
                        {/* Features */}
                        <div className="space-y-4">
                        {plan.features.map((feature, i) => {
                            const Icon = getFeatureIcon(feature);
                            const isHeader = feature.toLowerCase().includes("everything in");
                            return (
                                <div key={i} className="flex items-start gap-3">
                                <Icon className={`mt-0.5 shrink-0 text-sm ${isHeader ? "text-emerald-600" : "text-gray-400"}`} />
                                <span className={`text-sm leading-snug ${isHeader ? "font-semibold text-gray-800" : "text-gray-600"}`}>
                                    {isHeader ? `${feature} and:` : feature}
                                </span>
                                </div>
                            )
                        })}
                        </div>
                        </div>
                        </motion.div>
                    )
                })
            }
        </div>
    </div>
  )
}

export default Pricing