



const generateDietPlan = async (req, res) => {
    try {
      const { bmi, status, weight } = req.body;
  
      // Validate input
      if (!bmi || !status || !weight) {
        return res.status(400).json({
          status: 'error',
          message: 'Please provide all required fields: bmi, status, and weight'
        });
      }
  
      // Weight category determination (for more specific customization)
      const getWeightCategory = (weight) => {
        if (weight < 50) return 'light';
        if (weight < 70) return 'medium';
        return 'heavy';
      };
  
      // Exercise intensity based on BMI status
      const exerciseIntensityMap = {
        Underweight: 'light',
        Normal: 'moderate',
        Overweight: 'moderate',
        Obese: 'light'
      };
  
      // Calorie adjustment based on weight category
      const getCalorieAdjustment = (baseCalories, weightCategory) => {
        const adjustments = {
          light: -200,
          medium: 0,
          heavy: +200
        };
        return baseCalories + adjustments[weightCategory];
      };
  
      // Predefined diet and exercise plans
      const dietPlans = {
        Underweight: {
          base: {
            dailyCalories: 2500,
            recommendations: [
              'Increase caloric intake with nutrient-dense foods',
              'Consume protein with every meal (aim for 1.6-2.0g/kg of body weight)',
              'Eat frequent meals throughout the day (6-7 small meals)',
              'Include healthy fats in your diet (avocados, nuts, olive oil)',
              'Focus on complex carbohydrates for sustained energy'
            ],
            mealPlan: {
              preBreakfast: 'Protein shake with banana and almond butter',
              breakfast: 'Oatmeal with banana, nuts, honey, and protein powder',
              snack1: 'Greek yogurt with granola and mixed berries',
              lunch: 'Chicken and avocado sandwich with whole grain bread, plus a side of quinoa',
              snack2: 'Trail mix with dried fruits, nuts, and dark chocolate',
              dinner: 'Salmon with sweet potato and roasted vegetables in olive oil',
              eveningSnack: 'Cottage cheese with pineapple'
            },
            tips: [
              'Aim to gain 0.5-1 kg per week',
              'Track your calorie intake using a food diary',
              'Eat even when not very hungry',
              'Drink calories through smoothies if eating is difficult',
              'Get 7-9 hours of sleep for optimal muscle recovery'
            ]
          },
          exercises: {
            light: [
              {
                type: 'Strength Training',
                frequency: '3 times per week',
                exercises: [
                  'Bodyweight squats: 3 sets of 10',
                  'Push-ups (modified if needed): 3 sets of 8',
                  'Assisted pull-ups: 3 sets of 5',
                  'Dumbbell rows: 3 sets of 12',
                  'Lunges: 2 sets of 10 per leg'
                ]
              },
              {
                type: 'Light Cardio',
                frequency: '2-3 times per week',
                exercises: [
                  'Brisk walking: 20 minutes',
                  'Swimming: 15-20 minutes',
                  'Cycling at moderate pace: 15-20 minutes'
                ]
              }
            ],
            recovery: [
              'Focus on proper form over weight',
              'Rest 1-2 minutes between sets',
              'Stay hydrated during workouts',
              'Take a rest day between strength sessions'
            ]
          }
        },
        Normal: {
          base: {
            dailyCalories: 2000,
            recommendations: [
              'Maintain balanced macronutrient intake (40% carbs, 30% protein, 30% fats)',
              'Eat a variety of colorful vegetables (aim for 5-7 servings daily)',
              'Stay hydrated with 2-3 liters of water daily',
              'Choose whole grains over refined grains',
              'Include lean proteins with each meal'
            ],
            mealPlan: {
              breakfast: 'Whole grain toast with eggs, spinach, and avocado',
              snack1: 'Apple with almond butter and a handful of nuts',
              lunch: 'Mixed salad with grilled chicken, olive oil dressing, and quinoa',
              snack2: 'Carrot sticks with hummus and cherry tomatoes',
              dinner: 'Grilled fish with sweet potato and steamed green vegetables',
              eveningSnack: 'Small Greek yogurt with berries'
            },
            tips: [
              'Maintain regular exercise routine',
              'Practice mindful eating',
              'Get adequate sleep (7-9 hours)',
              'Meal prep to maintain healthy habits',
              'Listen to hunger and fullness cues'
            ]
          },
          exercises: {
            moderate: [
              {
                type: 'Strength Training',
                frequency: '3-4 times per week',
                exercises: [
                  'Squats: 4 sets of 12',
                  'Push-ups: 3 sets of 15',
                  'Pull-ups or lat pulldowns: 3 sets of 10',
                  'Deadlifts: 3 sets of 10',
                  'Planks: 3 sets of 45 seconds'
                ]
              },
              {
                type: 'Cardio',
                frequency: '3-4 times per week',
                exercises: [
                  'Running: 25-30 minutes',
                  'HIIT: 20 minutes',
                  'Cycling: 30 minutes',
                  'Swimming: 30 minutes'
                ]
              }
            ],
            recovery: [
              'Mix high and low intensity days',
              'Include one full rest day per week',
              'Stretch after workouts',
              'Consider yoga for flexibility'
            ]
          }
        },
        Overweight: {
          base: {
            dailyCalories: 1800,
            recommendations: [
              'Create a moderate caloric deficit (500 calories below maintenance)',
              'Increase protein intake (1.6-2.0g/kg of ideal body weight)',
              'Focus on fiber-rich foods (aim for 25-30g daily)',
              'Limit processed foods and added sugars',
              'Include metabolism-boosting foods (green tea, lean proteins)'
            ],
            mealPlan: {
              breakfast: 'Protein smoothie with berries, spinach, and Greek yogurt',
              snack1: 'Small handful of almonds with an orange',
              lunch: 'Large salad with tuna, light dressing, and chickpeas',
              snack2: 'Celery with low-fat cream cheese and turkey slices',
              dinner: 'Grilled chicken breast with steamed vegetables and quinoa',
              eveningSnack: 'Sugar-free jello with berries'
            },
            tips: [
              'Aim for steady weight loss of 0.5-1 kg per week',
              'Track portions using a food scale initially',
              'Drink water before meals',
              'Use smaller plates for portion control',
              'Plan meals in advance to avoid impulsive eating'
            ]
          },
          exercises: {
            moderate: [
              {
                type: 'Cardio',
                frequency: '4-5 times per week',
                exercises: [
                  'Brisk walking: 45 minutes',
                  'Swimming: 30 minutes',
                  'Cycling: 30 minutes',
                  'Elliptical: 25 minutes'
                ]
              },
              {
                type: 'Strength Training',
                frequency: '2-3 times per week',
                exercises: [
                  'Body weight squats: 3 sets of 15',
                  'Modified push-ups: 3 sets of 10',
                  'Resistance band rows: 3 sets of 12',
                  'Wall sits: 3 sets of 30 seconds',
                  'Crunches: 3 sets of 15'
                ]
              }
            ],
            recovery: [
              'Start slowly and progress gradually',
              'Focus on low-impact activities initially',
              'Listen to your body and avoid overexertion',
              'Include proper warm-up and cool-down'
            ]
          }
        },
        Obese: {
          base: {
            dailyCalories: 1600,
            recommendations: [
              'Focus on whole, unprocessed foods',
              'Control portion sizes using the plate method',
              'Increase protein and fiber intake for satiety',
              'Limit refined carbohydrates and sugary drinks',
              'Eat slowly and mindfully'
            ],
            mealPlan: {
              breakfast: 'Egg white omelet with vegetables and whole grain toast',
              snack1: 'Apple slices with cinnamon',
              lunch: 'Grilled chicken salad with light vinaigrette',
              snack2: 'Cucumber and carrot slices with hummus',
              dinner: 'Baked fish with roasted vegetables',
              eveningSnack: 'Sugar-free yogurt'
            },
            tips: [
              'Consult with healthcare provider before starting',
              'Start with small, achievable changes',
              'Keep a food and mood journal',
              'Focus on non-scale victories',
              'Build a support system'
            ]
          },
          exercises: {
            light: [
              {
                type: 'Low-Impact Cardio',
                frequency: '4-5 times per week',
                exercises: [
                  'Walking: Start with 10 minutes, gradually increase to 30',
                  'Water walking: 20 minutes',
                  'Seated exercises: 15 minutes',
                  'Stationary bike: 15 minutes'
                ]
              },
              {
                type: 'Strength and Flexibility',
                frequency: '2-3 times per week',
                exercises: [
                  'Chair squats: 2 sets of 8',
                  'Wall push-ups: 2 sets of 8',
                  'Seated arm raises: 2 sets of 12',
                  'Ankle rotations: 10 each foot',
                  'Knee lifts: 2 sets of 10'
                ]
              }
            ],
            recovery: [
              'Start very gradually',
              'Focus on proper form',
              'Take breaks as needed',
              'Monitor heart rate',
              'Stay well hydrated'
            ]
          }
        }
      };
  
      const weightCategory = getWeightCategory(weight);
      const exerciseIntensity = exerciseIntensityMap[status];
      
      // Get base plan
      const basePlan = dietPlans[status].base;
      
      // Adjust calories based on weight
      basePlan.dailyCalories = getCalorieAdjustment(basePlan.dailyCalories, weightCategory);
  
      // Get exercise plan based on intensity
      const exercisePlan = dietPlans[status].exercises[exerciseIntensity];
  
      // Combine everything into final plan
      const finalPlan = {
        ...basePlan,
        exercises: exercisePlan,
        weightCategory,
        exerciseIntensity,
        personalStats: {
          currentWeight: weight,
          bmi,
          status
        }
      };
  
      // Return the complete plan
      return res.status(200).json({
        status: 'success',
        data: finalPlan
      });
  
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({
        status: 'error',
        message: 'Failed to generate diet plan'
      });
    }
  };
  
  module.exports = {
    generateDietPlan
  };