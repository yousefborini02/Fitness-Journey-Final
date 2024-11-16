import React, { useState } from 'react';
import { 
  Activity as ActivityIcon,
  Scale as ScaleIcon,
  Ruler as RulerIcon,
  Award as AwardIcon,
  Coffee as CoffeeIcon,
  Utensils as UtensilsIcon,
  Moon as MoonIcon,
  Dumbbell as DumbbellIcon,
  Heart as HeartIcon,
  Clock as ClockIcon,
  Printer as PrinterIcon,
  ChevronDown as ChevronDownIcon,
  ChevronUp as ChevronUpIcon,
  Calendar as CalendarIcon
} from 'lucide-react';
import Navbar from './Navbar';
import Footer from './Footer';

// Default structure for diet plan to prevent undefined errors
const defaultExercises = {
  recovery: []
};

const BMICalculator = () => {
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [bmi, setBmi] = useState(null);
  const [status, setStatus] = useState('');
  const [dietPlan, setDietPlan] = useState(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState(null);
  const [activeSection, setActiveSection] = useState('all');

  const calculateBMI = () => {
    if (height && weight) {
      const heightInMeters = height / 100;
      const bmiValue = (weight / (heightInMeters * heightInMeters)).toFixed(1);
      setBmi(bmiValue);
      setDietPlan(null);
      setError(null);
      
      if (bmiValue < 18.5) setStatus('Underweight');
      else if (bmiValue < 24.9) setStatus('Normal');
      else if (bmiValue < 29.9) setStatus('Overweight');
      else setStatus('Obese');
    }
  };

  const generateDietPlan = async () => {
    setIsGenerating(true);
    setError(null);

    try {
      const response = await fetch('http://localhost:4000/api/diet/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          bmi,
          status,
          weight: parseFloat(weight)
        })
      });

      if (!response.ok) {
        throw new Error('Failed to generate diet plan');
      }

      const result = await response.json();
      if (result.status === 'error') {
        throw new Error(result.message);
      }

      const sanitizedDietPlan = {
        ...result.data,
        exercises: result.data.exercises || defaultExercises,
        recommendations: result.data.recommendations || [],
        tips: result.data.tips || [],
        mealPlan: result.data.mealPlan || {},
        dailyCalories: result.data.dailyCalories || 0,
        weightCategory: result.data.weightCategory || 'Not specified',
        exerciseIntensity: result.data.exerciseIntensity || 'Moderate'
      };

      setDietPlan(sanitizedDietPlan);
      setActiveSection('all');
    } catch (err) {
      setError(err.message || 'Failed to generate diet plan. Please try again.');
      console.error('Error generating diet plan:', err);
    } finally {
      setIsGenerating(false);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const getStatusColor = () => {
    switch(status) {
      case 'Underweight': return 'text-blue-400';
      case 'Normal': return 'text-green-400';
      case 'Overweight': return 'text-orange-400';
      case 'Obese': return 'text-red-400';
      default: return 'text-[#3CB347]';
    }
  };

  return (
    <>
    <Navbar/>

    <div className="min-h-screen mt-20 bg-black flex items-center justify-center p-4">
        
      <div className="w-full max-w-4xl bg-[#333] text-white rounded-xl shadow-2xl overflow-hidden transform transition-all duration-300 hover:shadow-3xl">
        {/* Header */}
        <div className="text-center border-b border-[#444] p-8 bg-gradient-to-r from-[#2a2a2a] to-[#383838]">
          <h2 className="text-3xl font-bold text-[#3CB347] flex items-center justify-center gap-2">
            <ActivityIcon className="w-8 h-8" />
            Fitness Journey Calculator
          </h2>
        </div>
        
        {/* Main Content */}
        <div className="p-8">
          <div className="space-y-8">
            {/* Input Section */}
            <div className="grid md:grid-cols-2 gap-6">
              {/* Height Input */}
              <div className="space-y-2 transform transition-all duration-300 hover:translate-y-[-2px]">
                <label className="block text-sm font-medium flex items-center gap-2">
                  <RulerIcon className="w-4 h-4 text-[#3CB347]" />
                  Height (cm)
                </label>
                <input
                  type="number"
                  value={height}
                  onChange={(e) => setHeight(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg bg-[#444] border-2 border-transparent focus:border-[#3CB347] outline-none transition-all duration-300 hover:bg-[#494949]"
                  placeholder="Enter your height"
                />
              </div>
              
              {/* Weight Input */}
              <div className="space-y-2 transform transition-all duration-300 hover:translate-y-[-2px]">
                <label className="block text-sm font-medium flex items-center gap-2">
                  <ScaleIcon className="w-4 h-4 text-[#3CB347]" />
                  Weight (kg)
                </label>
                <input
                  type="number"
                  value={weight}
                  onChange={(e) => setWeight(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg bg-[#444] border-2 border-transparent focus:border-[#3CB347] outline-none transition-all duration-300 hover:bg-[#494949]"
                  placeholder="Enter your weight"
                />
              </div>
            </div>
            
            {/* Calculate Button */}
            <button
              onClick={calculateBMI}
              className="w-full py-4 px-6 bg-[#3CB347] hover:bg-[#45c651] rounded-lg font-medium transition-all duration-300 transform hover:scale-[1.02] hover:shadow-lg flex items-center justify-center gap-2"
            >
              <ActivityIcon className="w-5 h-5" />
              Calculate BMI
            </button>
            
            {/* Results Section */}
            {bmi && (
              <div className="mt-8 space-y-6 animate-fadeIn">
                <div className="text-center space-y-2">
                  <div className="text-5xl font-bold text-[#3CB347]">{bmi}</div>
                  <div className={`text-2xl font-medium ${getStatusColor()}`}>{status}</div>
                </div>
                
                {/* BMI Categories */}
                <div className="p-6 rounded-lg bg-[#444] text-sm transform transition-all duration-300 hover:translate-y-[-2px]">
                  <p className="font-medium mb-3 flex items-center gap-2">
                    <AwardIcon className="w-5 h-5 text-[#3CB347]" />
                    BMI Categories:
                  </p>
                  <ul className="space-y-2 text-gray-300">
                    <li className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-blue-400" />
                      Underweight: &lt; 18.5
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-green-400" />
                      Normal weight: 18.5 - 24.9
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-orange-400" />
                      Overweight: 25 - 29.9
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-red-400" />
                      Obese: ≥ 30
                    </li>
                  </ul>
                </div>

                {/* Generate Diet Plan Button */}
                {!dietPlan && (
                  <button
                    onClick={generateDietPlan}
                    disabled={isGenerating}
                    className="w-full py-4 px-6 bg-[#3CB347] hover:bg-[#45c651] rounded-lg font-medium transition-all duration-300 transform hover:scale-[1.02] hover:shadow-lg disabled:opacity-50 disabled:hover:scale-100 flex items-center justify-center gap-2"
                  >
                    {isGenerating ? (
                      <>
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white" />
                        Generating Diet Plan...
                      </>
                    ) : (
                      <>
                        <UtensilsIcon className="w-5 h-5" />
                        Generate Personalized Plan
                      </>
                    )}
                  </button>
                )}

                {/* Error Message */}
                {error && (
                  <div className="mt-4 p-4 bg-red-500 bg-opacity-20 text-red-300 rounded-lg flex items-center gap-2">
                    <ActivityIcon className="w-5 h-5" />
                    {error}
                  </div>
                )}

                {/* Diet Plan Display */}
                {dietPlan && (
                  <div className="mt-8 space-y-6 print:text-black">
                    <div className="flex justify-between items-center">
                      <h3 className="text-2xl font-bold text-[#3CB347] flex items-center gap-2">
                        <AwardIcon className="w-6 h-6" />
                        Your Personalized Plan
                      </h3>
                      <button
                        onClick={handlePrint}
                        className="p-2 text-[#3CB347] hover:bg-[#444] rounded-lg transition-all duration-300"
                      >
                        <PrinterIcon className="w-5 h-5" />
                      </button>
                    </div>

                    {/* Stats Overview */}
                    <div className="grid md:grid-cols-3 gap-4 bg-[#444] rounded-lg p-6">
                      <div className="text-center p-4 bg-[#3a3a3a] rounded-lg">
                        <div className="text-[#3CB347] font-medium">Daily Calories</div>
                        <div className="text-2xl font-bold">{dietPlan.dailyCalories}</div>
                      </div>
                      <div className="text-center p-4 bg-[#3a3a3a] rounded-lg">
                        <div className="text-[#3CB347] font-medium">Weight Category</div>
                        <div className="text-xl capitalize">{dietPlan.weightCategory}</div>
                      </div>
                      <div className="text-center p-4 bg-[#3a3a3a] rounded-lg">
                        <div className="text-[#3CB347] font-medium">Exercise Level</div>
                        <div className="text-xl capitalize">{dietPlan.exerciseIntensity}</div>
                      </div>
                    </div>

                    {/* Collapsible Sections */}
                    <div className="space-y-4">
                      {/* Meal Plan Section */}
                      <div className="bg-[#444] rounded-lg overflow-hidden">
                        <button 
                          className="w-full p-4 flex justify-between items-center text-left hover:bg-[#494949]"
                          onClick={() => setActiveSection(activeSection === 'meals' ? 'all' : 'meals')}
                        >
                          <div className="flex items-center gap-2">
                            <UtensilsIcon className="w-5 h-5 text-[#3CB347]" />
                            <span className="font-medium">Daily Meal Plan</span>
                          </div>
                          {activeSection === 'meals' ? <ChevronUpIcon /> : <ChevronDownIcon />}
                        </button>
                        
                        {(activeSection === 'meals' || activeSection === 'all') && dietPlan.mealPlan && (
                          <div className="p-4 space-y-3">
                            {Object.entries(dietPlan.mealPlan).map(([meal, food], index) => {
                              const IconComponent = index === 0 ? CoffeeIcon : 
                                                  index === 1 ? ClockIcon :
                                                  index === 2 ? UtensilsIcon :
                                                  index === 3 ? ClockIcon : MoonIcon;
                              return (
                                <div 
                                  key={meal}
                                  className="flex items-start gap-4 p-3 bg-[#3a3a3a] rounded-lg transform transition-all duration-300 hover:translate-x-2"
                                >
                                  <IconComponent className="w-5 h-5 text-[#3CB347] flex-shrink-0" />
                                  <div>
                                    <span className="font-medium capitalize">{meal.replace(/([A-Z])/g, ' $1')}:</span>
                                    <p className="text-gray-300">{food}</p>
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        )}
                      </div>

                      {/* Exercise Section */}
                      {dietPlan.exercises && (
                        <div className="bg-[#444] rounded-lg overflow-hidden">
                          <button 
                            className="w-full p-4 flex justify-between items-center text-left hover:bg-[#494949]"
                            onClick={() => setActiveSection(activeSection === 'exercise' ? 'all' : 'exercise')}
                          >
                            <div className="flex items-center gap-2">
                              <DumbbellIcon className="w-5 h-5 text-[#3CB347]" />
                              <span className="font-medium">Exercise Plan</span>
                            </div>
                            {activeSection === 'exercise' ? <ChevronUpIcon /> : <ChevronDownIcon />}
                          </button>
                          
                          {(activeSection === 'exercise' || activeSection === 'all') && (
                            <div className="p-4 space-y-4">
                                {Array.isArray(dietPlan.exercises) && dietPlan.exercises.map((exercise, index) => (
                                <div 
                                  key={index}
                                  className="p-4 bg-[#3a3a3a] rounded-lg space-y-3 transform transition-all duration-300 hover:translate-y-[-2px]"
                                >
                                  <div className="font-medium text-[#3CB347] flex items-center gap-2">
                                    <DumbbellIcon className="w-4 h-4" />
                                    {exercise.type}
                                  </div>
                                  <div className="text-sm text-gray-300">
                                    <p className="mb-2 flex items-center gap-2">
                                      <CalendarIcon className="w-4 h-4 text-[#3CB347]" />
                                      Frequency: {exercise.frequency}
                                    </p>
                                    <ul className="space-y-2 pl-4">
                                      {exercise.exercises?.map((ex, i) => (
                                        <li 
                                          key={i}
                                          className="flex items-center gap-2 transform transition-all duration-300 hover:translate-x-2"
                                        >
                                          <div className="w-2 h-2 rounded-full bg-[#3CB347]" />
                                          {ex}
                                        </li>
                                      ))}
                                    </ul>
                                  </div>
                                </div>
                              ))}

                              {/* Recovery Tips */}
                              {dietPlan.exercises.recovery && dietPlan.exercises.recovery.length > 0 && (
                                <div className="mt-4 p-4 bg-[#3a3a3a] rounded-lg">
                                  <div className="font-medium text-[#3CB347] flex items-center gap-2 mb-3">
                                    <HeartIcon className="w-4 h-4" />
                                    Recovery Guidelines
                                  </div>
                                  <ul className="space-y-2 text-gray-300">
                                    {dietPlan.exercises.recovery.map((tip, index) => (
                                      <li 
                                        key={index}
                                        className="flex items-center gap-2 transform transition-all duration-300 hover:translate-x-2"
                                      >
                                        <div className="w-2 h-2 rounded-full bg-[#3CB347]" />
                                        {tip}
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                              )}
                            </div>
                          )}
                        </div>
                      )}

                      {/* Recommendations Section */}
                      {dietPlan.recommendations && dietPlan.recommendations.length > 0 && (
                        <div className="bg-[#444] rounded-lg overflow-hidden">
                          <button 
                            className="w-full p-4 flex justify-between items-center text-left hover:bg-[#494949]"
                            onClick={() => setActiveSection(activeSection === 'recommendations' ? 'all' : 'recommendations')}
                          >
                            <div className="flex items-center gap-2">
                              <AwardIcon className="w-5 h-5 text-[#3CB347]" />
                              <span className="font-medium">Nutritional Recommendations</span>
                            </div>
                            {activeSection === 'recommendations' ? <ChevronUpIcon /> : <ChevronDownIcon />}
                          </button>
                          
                          {(activeSection === 'recommendations' || activeSection === 'all') && (
                            <div className="p-4 grid md:grid-cols-2 gap-4">
                              {dietPlan.recommendations.map((rec, index) => (
                                <div 
                                  key={index}
                                  className="p-3 bg-[#3a3a3a] rounded-lg flex items-start gap-2 transform transition-all duration-300 hover:translate-y-[-2px]"
                                >
                                  <AwardIcon className="w-4 h-4 text-[#3CB347] flex-shrink-0 mt-1" />
                                  <span className="text-gray-300">{rec}</span>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      )}

                      {/* Health Tips Section */}
                      {dietPlan.tips && dietPlan.tips.length > 0 && (
                        <div className="bg-[#444] rounded-lg overflow-hidden">
                          <button 
                            className="w-full p-4 flex justify-between items-center text-left hover:bg-[#494949]"
                            onClick={() => setActiveSection(activeSection === 'tips' ? 'all' : 'tips')}
                          >
                            <div className="flex items-center gap-2">
                              <HeartIcon className="w-5 h-5 text-[#3CB347]" />
                              <span className="font-medium">Health Tips</span>
                            </div>
                            {activeSection === 'tips' ? <ChevronUpIcon /> : <ChevronDownIcon />}
                          </button>
                          
                          {(activeSection === 'tips' || activeSection === 'all') && (
                            <div className="p-4 grid md:grid-cols-2 gap-4">
                              {dietPlan.tips.map((tip, index) => (
                                <div 
                                  key={index}
                                  className="p-3 bg-[#3a3a3a] rounded-lg flex items-start gap-2 transform transition-all duration-300 hover:translate-y-[-2px]"
                                >
                                  <HeartIcon className="w-4 h-4 text-[#3CB347] flex-shrink-0 mt-1" />
                                  <span className="text-gray-300">{tip}</span>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      )}
                    </div>

                    {/* Print Styles */}
                    <style>{`
                      @media print {
                        body { 
                          background: white;
                          color: black;
                        }
                        button {
                          display: none;
                        }
                        .hover\\:translate-y-[-2px]:hover {
                          transform: none;
                        }
                        * {
                          color-adjust: exact;
                          -webkit-print-color-adjust: exact;
                        }
                        .bg-[#444], .bg-[#3a3a3a] {
                          background-color: white !important;
                          border: 1px solid #eee;
                        }
                        .text-gray-300 {
                          color: #333 !important;
                        }
                        .text-[#3CB347] {
                          color: #3CB347 !important;
                        }
                      }
                    `}</style>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
    <Footer/>
    </>

  );
};

export default BMICalculator;
