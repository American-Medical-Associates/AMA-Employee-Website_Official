import React, { useState, useEffect } from 'react'

import DateInput from '../components/userInput/DateInput'
import TextInput from '../components/userInput/TextInput'
import { NextPage } from 'next'
import CustomCheckBoxField from '../components/formComponents/CustomCheckBoxField'
import CustomYesOrNo from '../components/formComponents/CustomYesOrNo'
import UserCreatedListFromInputBox from '../components/formComponents/UserCreatedListFromInputBox'
import SectionWithTitle from '../components/formComponents/SectionWithTitle'
import MainButton from '../components/Buttons/MainButton'
import {
  auth,
  GetWeightLossSurveyPatient,
  SubmitWeightLossSurvey,
  WeightLossAutoSave,
  // SubmitWeightLossSurvey,
} from '../firebase/firebase'
import { WeightLossSurveyTypes } from '../types/weightLossTypes'
import AutoSaveLine from '../components/formComponents/AutoSaveLine'
import { useDispatch, useSelector } from 'react-redux'
import { selectWeightLossSurvey } from '../redux/slices/companySlice'
import router from 'next/router'
import LineDivider from '../components/formComponents/lineDiveider'
import GreenCheckMark from '../components/formComponents/GreenCheckMark'
import Signature from '../components/formComponents/Signature'

const WeightLossSurvey: NextPage<{}> = () => {
  const dispatch = useDispatch()
  const [loading, setLoading] = useState(false)
  const [showGreenCheckMark, setShowGreenCheckMark] = useState(false)
  const [patientsName, setPatientsName] = useState('')
  const [date, setDate] = useState('')
  const [primaryDoctor, setPrimaryDoctor] = useState('')
  const [whyLossWeight, setWhyLossWeight] = useState('')
  const [weightGoals, setWeightGoals] = useState('')
  const [timeFrame, setTimeFrame] = useState('')
  const [mostWeighedAsAdult, setMostWeighedAsAdult] = useState('')
  const [ageAtAdultMostWeight, setAgeAtAdultMostWeight] = useState('')
  const [leastWeighedAsAdult, setLeastWeighedAsAdult] = useState('')
  const [ageAtAdultLeastWeight, setAgeAtAdultLeastWeight] = useState('')
  const [weightChangeDuringLife, setWeightChangeDuringLife] = useState<
    Array<string>
  >([])
  const [weightGainedInPast, setWeightGainedInPast] = useState<Array<string>>(
    [],
  )
  const [challengesOfWeightManagement, setChallengesOfWeightManagement] =
    useState('')
  const [hopesForWeightLossManagement, setHopesForWeightLossManagement] =
    useState('')
  const [commitmentsToWeightLoss, setCommitmentsToWeightLoss] = useState('')
  const [currentDietAids, setCurrentDietAids] = useState('')
  const [onYourOwn, setOnYourOwn] = useState('')
  const [checkIfTried, setCheckIfTried] = useState('')
  const [onYourOwnStartDate, setOnYourOwnStartDate] = useState('')
  const [onYourOwnEndDate, setOnYourOwnEndDate] = useState('')
  const [onYourOwnWeightLoss, setOnYourOwnWeightLoss] = useState('')
  const [onYourOwnReasonForStopping, setOnYourOwnReasonForStopping] =
    useState('')
  const [onYourOwnReasonForRegain, setOnYourOwnReasonForRegain] = useState('')
  const [atkinsOrLowCarbohydrate, setAtkinsOrLowCarbohydrate] = useState('')
  const [
    atkinsOrLowCarbohydrateStartDate,
    setAtkinsOrLowCarbohydrateStartDate,
  ] = useState('')
  const [atkinsOrLowCarbohydrateEndDate, setAtkinsOrLowCarbohydrateEndDate] =
    useState('')
  const [
    atkinsOrLowCarbohydrateWeightLoss,
    setAtkinsOrLowCarbohydrateWeightLoss,
  ] = useState('')
  const [
    atkinsOrLowCarbohydrateReasonForStopping,
    setAtkinsOrLowCarbohydrateReasonForStopping,
  ] = useState('')
  const [
    atkinsOrLowCarbohydrateReasonForRegain,
    setAtkinsOrLowCarbohydrateReasonForRegain,
  ] = useState('')
  const [jennyCraig, setJennyCraig] = useState('')
  const [jennyCraigStartDate, setJennyCraigStartDate] = useState('')
  const [jennyCraigEndDate, setJennyCraigEndDate] = useState('')
  const [jennyCraigWeightLoss, setJennyCraigWeightLoss] = useState('')
  const [jennyCraigReasonForStopping, setJennyCraigReasonForStopping] =
    useState('')
  const [jennyCraigReasonForRegain, setJennyCraigReasonForRegain] = useState('')
  const [nutrisystem, setNutrisystem] = useState('')
  const [nutrisystemStartDate, setNutrisystemStartDate] = useState('')
  const [nutrisystemEndDate, setNutrisystemEndDate] = useState('')
  const [nutrisystemWeightLoss, setNutrisystemWeightLoss] = useState('')
  const [nutrisystemReasonForStopping, setNutrisystemReasonForStopping] =
    useState('')
  const [nutrisystemReasonForRegain, setNutrisystemReasonForRegain] =
    useState('')
  const [weightWatchers, setWeightWatchers] = useState('')
  const [weightWatchersStartDate, setWeightWatchersStartDate] = useState('')
  const [weightWatchersEndDate, setWeightWatchersEndDate] = useState('')
  const [weightWatchersWeightLoss, setWeightWatchersWeightLoss] = useState('')
  const [weightWatchersReasonForStopping, setWeightWatchersReasonForStopping] =
    useState('')
  const [weightWatchersReasonForRegain, setWeightWatchersReasonForRegain] =
    useState('')
  const [slimfast, setSlimfast] = useState('')
  const [slimfastStartDate, setSlimfastStartDate] = useState('')
  const [slimfastEndDate, setSlimfastEndDate] = useState('')
  const [slimfastWeightLoss, setSlimfastWeightLoss] = useState('')
  const [slimfastReasonForStopping, setSlimfastReasonForStopping] = useState('')
  const [slimfastReasonForRegain, setSlimfastReasonForRegain] = useState('')
  const [optifast, setOptifast] = useState('')
  const [optifastStartDate, setOptifastStartDate] = useState('')
  const [optifastEndDate, setOptifastEndDate] = useState('')
  const [optifastWeightLoss, setOptifastWeightLoss] = useState('')
  const [optifastReasonForStopping, setOptifastReasonForStopping] = useState('')
  const [optifastReasonForRegain, setOptifastReasonForRegain] = useState('')
  const [otherLiquidDiet, setOtherLiquidDiet] = useState('')
  const [otherLiquidDietStartDate, setOtherLiquidDietStartDate] = useState('')
  const [otherLiquidDietEndDate, setOtherLiquidDietEndDate] = useState('')
  const [otherLiquidDietWeightLoss, setOtherLiquidDietWeightLoss] = useState('')
  const [
    otherLiquidDietReasonForStopping,
    setOtherLiquidDietReasonForStopping,
  ] = useState('')
  const [otherLiquidDietReasonForRegain, setOtherLiquidDietReasonForRegain] =
    useState('')
  const [other, setOther] = useState('')
  const [otherName, setOtherName] = useState('')
  const [otherStartDate, setOtherStartDate] = useState('')
  const [otherEndDate, setOtherEndDate] = useState('')
  const [otherWeightLoss, setOtherWeightLoss] = useState('')
  const [otherReasonForStopping, setOtherReasonForStopping] = useState('')
  const [otherReasonForRegain, setOtherReasonForRegain] = useState('')
  const [adipex, setAdipex] = useState('')
  const [adipexStartDate, setAdipexStartDate] = useState('')
  const [adipexEndDate, setAdipexEndDate] = useState('')
  const [adipexWeightLoss, setAdipexWeightLoss] = useState('')
  const [adipexReasonForStopping, setAdipexReasonForStopping] = useState('')
  const [adipexReasonForRegain, setAdipexReasonForRegain] = useState('')
  const [alli, setAlli] = useState('')
  const [alliStartDate, setAlliStartDate] = useState('')
  const [alliEndDate, setAlliEndDate] = useState('')
  const [alliWeightLoss, setAlliWeightLoss] = useState('')
  const [alliReasonForStopping, setAlliReasonForStopping] = useState('')
  const [alliReasonForRegain, setAlliReasonForRegain] = useState('')
  const [belviq, setBelviq] = useState('')
  const [belviqStartDate, setBelviqStartDate] = useState('')
  const [belviqEndDate, setBelviqEndDate] = useState('')
  const [belviqWeightLoss, setBelviqWeightLoss] = useState('')
  const [belviqReasonForStopping, setBelviqReasonForStopping] = useState('')
  const [belviqReasonForRegain, setBelviqReasonForRegain] = useState('')
  const [dexatrim, setDexatrim] = useState('')
  const [dexatrimStartDate, setDexatrimStartDate] = useState('')
  const [dexatrimEndDate, setDexatrimEndDate] = useState('')
  const [dexatrimWeightLoss, setDexatrimWeightLoss] = useState('')
  const [dexatrimReasonForStopping, setDexatrimReasonForStopping] = useState('')
  const [dexatrimReasonForRegain, setDexatrimReasonForRegain] = useState('')
  const [herbalWeightLoss, setHerbalWeightLoss] = useState('')
  const [herbalWeightLossStartDate, setHerbalWeightLossStartDate] = useState('')
  const [herbalWeightLossEndDate, setHerbalWeightLossEndDate] = useState('')
  const [herbalWeightLossWeightLoss, setHerbalWeightLossWeightLoss] =
    useState('')
  const [
    herbalWeightLossReasonForStopping,
    setHerbalWeightLossReasonForStopping,
  ] = useState('')
  const [herbalWeightLossReasonForRegain, setHerbalWeightLossReasonForRegain] =
    useState('')
  const [meridia, setMeridia] = useState('')
  const [meridiaStartDate, setMeridiaStartDate] = useState('')
  const [meridiaEndDate, setMeridiaEndDate] = useState('')
  const [meridiaWeightLoss, setMeridiaWeightLoss] = useState('')
  const [meridiaReasonForStopping, setMeridiaReasonForStopping] = useState('')
  const [meridiaReasonForRegain, setMeridiaReasonForRegain] = useState('')
  const [phenfen, setPhenfen] = useState('')
  const [phenfenStartDate, setPhenfenStartDate] = useState('')
  const [phenfenEndDate, setPhenfenEndDate] = useState('')
  const [phenfenWeightLoss, setPhenfenWeightLoss] = useState('')
  const [phenfenReasonForStopping, setPhenfenReasonForStopping] = useState('')
  const [phenfenReasonForRegain, setPhenfenReasonForRegain] = useState('')
  const [qsymia, setQsymia] = useState('')
  const [qsymiaStartDate, setQsymiaStartDate] = useState('')
  const [qsymiaEndDate, setQsymiaEndDate] = useState('')
  const [qsymiaWeightLoss, setQsymiaWeightLoss] = useState('')
  const [qsymiaReasonForStopping, setQsymiaReasonForStopping] = useState('')
  const [qsymiaReasonForRegain, setQsymiaReasonForRegain] = useState('')
  const [redux, setRedux] = useState('')
  const [reduxStartDate, setReduxStartDate] = useState('')
  const [reduxEndDate, setReduxEndDate] = useState('')
  const [reduxWeightLoss, setReduxWeightLoss] = useState('')
  const [reduxReasonForStopping, setReduxReasonForStopping] = useState('')
  const [reduxReasonForRegain, setReduxReasonForRegain] = useState('')
  const [otherSupplements, setOtherSupplements] = useState('')
  const [otherSupplementsName, setOtherSupplementsName] = useState('')
  const [otherSupplementsStartDate, setOtherSupplementsStartDate] = useState('')
  const [otherSupplementsEndDate, setOtherSupplementsEndDate] = useState('')
  const [otherSupplementsWeightLoss, setOtherSupplementsWeightLoss] =
    useState('')
  const [
    otherSupplementsReasonForStopping,
    setOtherSupplementsReasonForStopping,
  ] = useState('')
  const [otherSupplementsReasonForRegain, setOtherSupplementsReasonForRegain] =
    useState('')
  const [childrenUnderEighteen, setChildrenUnderEighteen] = useState('')
  const [childrenUnderEighteenCheckBox, setChildrenUnderEighteenCheckBox] =
    useState('')
  const [familyMemebersObese, setFamilyMemebersObese] = useState('')
  const [support, setSupport] = useState('')
  const [supportExplaination, setSupportExplaination] = useState('')
  const [eatingDisorder, setEatingDisorder] = useState('')
  const [anorexiaNervosa, setAnorexiaNervosa] = useState('')
  const [bingeEating, setBingeEating] = useState('')
  const [bulimia, setBulimia] = useState('')
  const [eatingTooMuch, setEatingTooMuch] = useState('')
  const [sleepHours, setSleepHours] = useState('')
  const [restedWhenWakeUp, setRestedWhenWakeUp] = useState('')
  const [doYouSnore, setDoYouSnore] = useState('')
  const [wearEquipment, setWearEquipment] = useState('')
  const [howManyNights, setHowManyNights] = useState('')
  const [sleepWellness, setSleepWellness] = useState('')
  const [sittingAndReading, setSittingAndReading] = useState('')
  const [watchingTv, setWatchingTv] = useState('')
  const [sittingInPublic, setSittingInPublic] = useState('')
  const [carPassanger, setCarPassanger] = useState('')
  const [lyingDown, setLyingDown] = useState('')
  const [talkingToSomeone, setTalkingToSomeone] = useState('')
  const [sittingQuietlyAfterLunch, setSittingQuietlyAfterLunch] = useState('')
  const [inCarWhileStopped, setInCarWhileStopped] = useState('')
  const [total, setTotal] = useState('')
  const [typicalDay, setTypicalDay] = useState('')
  const [enjoyExercise, setEnjoyExercise] = useState('')
  const [gymMembership, setGymMembership] = useState('')
  const [exerciseEquipment, setExerciseEquipment] = useState('')
  const [exerciseRegularly, setExerciseRegularly] = useState('')
  const [badExerciseExperience, setBadExerciseExperience] = useState('')
  const [encourageExercise, setEncourageExercise] = useState('')
  const [sixAm, setSixAm] = useState('')
  const [nineAm, setNineAm] = useState('')
  const [twelvePm, setTwelvePm] = useState('')
  const [threePm, setThreePm] = useState('')
  const [sixPm, setSixPm] = useState('')
  const [ninePm, setNinePm] = useState('')
  const [exerciseWeekly, setExerciseWeekly] = useState('')
  const [describeExercise, setDescribeExercise] = useState('')
  const [difficultyGettingUpFromFloor, setDifficultyGettingUpFromFloor] =
    useState('')
  const [typeOfExercise, setTypeOfExercise] = useState('')
  const [exercisePreference, setExercisePreference] = useState('')
  const [athleteInSchool, setAthleteInSchool] = useState('')
  const [confidentIncrease, setConfidentIncrease] = useState('')
  const [majorBenefitsOfExercise, setMajorBenefitsOfExercise] = useState('')
  const [exerciseBarriers, setExerciseBarriers] = useState('')
  const [minutesPerDay, setMinutesPerDay] = useState('')
  const [daysPerWeek, setDaysPerWeek] = useState('')
  const [confidenceWeightLossDiet, setConfidenceWeightLossDiet] = useState('')
  const [majorBarriersDiet, setMajorBarriersDiet] = useState('')
  const [favoriteFoods, setFavoriteFoods] = useState('')
  const [breakfastTypeOfFood, setBreakfastTypeOfFood] = useState('')
  const [breakfastProteinOrCarbs, setBreakfastProteinOrCarbs] = useState('')
  const [breakfastCalories, setBreakfastCalories] = useState('')
  const [lunchTypeOfFood, setLunchTypeOfFood] = useState('')
  const [lunchProteinOrCarbs, setLunchProteinOrCarbs] = useState('')
  const [lunchCalories, setLunchCalories] = useState('')
  const [dinnerTypeOfFood, setDinnerTypeOfFood] = useState('')
  const [dinnerProteinOrCarbs, setDinnerProteinOrCarbs] = useState('')
  const [dinnerCalories, setDinnerCalories] = useState('')
  const [snackOneTypeOfFood, setSnackOneTypeOfFood] = useState('')
  const [snackOneProteinOrCarbs, setSnackOneProteinOrCarbs] = useState('')
  const [snackOneCalories, setSnackOneCalories] = useState('')
  const [snackTwoTypeOfFood, setSnackTwoTypeOfFood] = useState('')
  const [snackTwoProteinOrCarbs, setSnackTwoProteinOrCarbs] = useState('')
  const [snackTwoCalories, setSnackTwoCalories] = useState('')
  const [coffeeTypeOfFood, setCoffeeTypeOfFood] = useState('')
  const [coffeeProteinOrCarbs, setCoffeeProteinOrCarbs] = useState('')
  const [coffeeCalories, setCoffeeCalories] = useState('')
  const [sodaTypeOfFood, setSodaTypeOfFood] = useState('')
  const [sodaProteinOrCarbs, setSodaProteinOrCarbs] = useState('')
  const [sodaCalories, setSodaCalories] = useState('')
  const [candyOrSweetsTypeOfFood, setCandyOrSweetsTypeOfFood] = useState('')
  const [candyOrSweetsProteinOrCarbs, setCandyOrSweetsProteinOrCarbs] =
    useState('')
  const [candyOrSweetsCalories, setCandyOrSweetsCalories] = useState('')
  const [otherTypeOfFood, setOtherTypeOfFood] = useState('')
  const [otherProteinOrCarbs, setOtherProteinOrCarbs] = useState('')
  const [otherCalories, setOtherCalories] = useState('')
  const [numPeopleLiveWith, setNumPeopleLiveWith] = useState('')
  const [eatTogether, setEatTogether] = useState('')
  const [whoDoesShopping, setWhoDoesShopping] = useState('')
  const [whoDoesCooking, setWhoDoesCooking] = useState('')
  const [foodIntolerance, setFoodIntolerance] = useState('')
  const [foodIntoleranceList, setFoodIntoleranceList] = useState('')
  const [stressEating, setStressEating] = useState('')
  const [stressEatingDetails, setStressEatingDetails] = useState('')
  const [bingeEatingExperience, setBingeEatingExperience] = useState('')
  const [bingeEatingDetails, setBingeEatingDetails] = useState('')
  const [snackingExperience, setSnackingExperience] = useState('')
  const [snackingDetails, setSnackingDetails] = useState('')
  const [eatingMiddleOfNightExperience, setEatingMiddleOfNightExperience] =
    useState('')
  const [eatingMiddleOfNightDetails, setEatingMiddleOfNightDetails] =
    useState('')
  const [skippingMealsExperience, setSkippingMealsExperience] = useState('')
  const [skippingMealsDetails, setSkippingMealsDetails] = useState('')
  const [eatingOutExperience, setEatingOutExperience] = useState('')
  const [eatingOutDetails, setEatingOutDetails] = useState('')
  const [eatingInFrontOfTVExperience, setEatingInFrontOfTVExperience] =
    useState('')
  const [eatingInFrontOfTVDetails, setEatingInFrontOfTVDetails] = useState('')
  const [eatingAtDeskExperience, setEatingAtDeskExperience] = useState('')
  const [eatingAtDeskDetails, setEatingAtDeskDetails] = useState('')
  const [portionSizeExperience, setPortionSizeExperience] = useState('')
  const [portionSizeDetails, setPortionSizeDetails] = useState('')
  const [eatingTooFastExperience, setEatingTooFastExperience] = useState('')
  const [eatingTooFastDetails, setEatingTooFastDetails] = useState('')
  const [notSatifiedExperience, setNotSatifiedExperience] = useState('')
  const [notSatifiedDetails, setNotSatifiedDetails] = useState('')
  const [regularSoda, setRegularSoda] = useState('')
  const [regularSodaCount, setRegularSodaCount] = useState('')
  const [juice, setJuice] = useState('')
  const [juiceCount, setJuiceCount] = useState('')
  const [sweetTea, setSweetTea] = useState('')
  const [sweetTeaCount, setSweetTeaCount] = useState('')
  const [alchoholBeverages, setAlchoholBeverages] = useState('')
  const [alchoholBeveragesCount, setAlchoholBeveragesCount] = useState('')
  const [friedFoods, setFriedFoods] = useState('')
  const [friedFoodsCount, setFriedFoodsCount] = useState('')
  const [fruitServings, setFruitServings] = useState('')
  const [vegetableServings, setVegetableServings] = useState('')
  const [wholeGrainServings, setWholeGrainServings] = useState('')
  const [lowFatDairyServings, setLowFatDairyServings] = useState('')
  const [leanProteinServings, setLeanProteinServings] = useState('')
  const [daysPerWeekExplination, setDaysPerWeekExplination] = useState('')
  const [medicalHistory, setMedicalHistory] = useState('')
  const [medicationsTaken, setMedicationsTaken] = useState('')
  const [medicationsTakenList, setMedicationsTakenList] = useState<
    Array<string>
  >([])

  const [photoConsentCheckBoxes, setPhotoConsentCheckBoxes] = useState([])

  const [photoConsentSignature, setPhotoConsentSignature] = useState('')
  const [photoConsentDate, setPhotoConsentDate] = useState('')
  const [agreeThatTheirSignatureIsValid, setAgreeThatTheirSignatureIsValid] =
    useState(false)

  const [autoSaveWeightAge, setAutoSaveWeightAge] = useState<boolean>()
  const [autoSaveEighteen, setAutoSaveEighteen] = useState<boolean>()
  const [autoSaveDaysPerWeek, setAutoSaveDaysPerWeek] = useState<boolean>()

  const [requiredPatientsName, setRequiredPatientsName] = useState(false)
  const [requiredDate, setRequiredDate] = useState(false)
  const [requiredWhyLossWeight, setRequiredWhyLossWeight] = useState(false)
  const [requiredWeightGoals, setRequiredWeightGoals] = useState(false)
  const [requiredMostWeighedAsAdult, setRequiredMostWeighedAsAdult] =
    useState(false)
  const [requiredAgeAtAdultMostWeight, setRequiredAgeAtAdultMostWeight] =
    useState(false)
  const [requiredLeastWeighedAsAdult, setRequiredLeastWeighedAsAdult] =
    useState(false)
  const [requiredAgeAtAdultLeastWeight, setRequiredAgeAtAdultLeastWeight] =
    useState(false)
  const [requiredWeightChangeDuringLife, setRequiredWeightChangeDuringLife] =
    useState(false)
  const [requiredWeightGainedInPast, setRequiredWeightGainedInPast] =
    useState(false)
  const [
    requiredHopesForWeightLossManagement,
    setRequiredHopesForWeightLossManagement,
  ] = useState(false)
  const [requiredCurrentDietAids, setRequiredCurrentDietAids] = useState(false)
  const [requiredChildrenUnderEighteen, setRequiredChildrenUnderEighteen] =
    useState(false)
  const [requiredEatingDisorder, setRequiredEatingDisorder] = useState(false)
  const [requiredAnorexiaNervosa, setRequiredAnorexiaNervosa] = useState(false)
  const [requiredBingeEating, setRequiredBingeEating] = useState(false)
  const [requiredBulimia, setRequiredBulimia] = useState(false)
  const [requiredEatingTooMuch, setRequiredEatingTooMuch] = useState(false)
  const [requiredSleepHours, setRequiredSleepHours] = useState(false)
  const [requiredRestedWhenWakeUp, setRequiredRestedWhenWakeUp] =
    useState(false)
  const [requiredDoYouSnore, setRequiredDoYouSnore] = useState(false)
  const [requiredWearEquipment, setRequiredWearEquipment] = useState(false)
  const [requiredSleepWellness, setRequiredSleepWellness] = useState(false)
  const [requiredTypicalDay, setRequiredTypicalDay] = useState(false)
  const [requiredExerciseBarriers, setRequiredExerciseBarriers] =
    useState(false)
  const [
    requiredConfidenceWeightLossDiet,
    setRequiredConfidenceWeightLossDiet,
  ] = useState(false)
  const [requiredMajorBarriersDiet, setRequiredMajorBarriersDiet] =
    useState(false)
  const [requiredDaysPerWeekExplination, setRequiredDaysPerWeekExplination] =
    useState(false)
  const [requiredMedicalHistory, setRequiredMedicalHistory] = useState(false)

  const [requiredPhotoConsent, setRequiredPhotoConsent] = useState(false)

  const [requiredPhotoConsentSignature, setRequiredPhotoConsentSignature] =
    useState(false)
  const [requiredPhotoConsentDate, setRequiredPhotoConsentDate] =
    useState(false)
  const [requiredPhotoConsentCheckBox, setRequiredPhotoConsentCheckBox] =
    useState(false)

  const weightLossSelector = useSelector(selectWeightLossSurvey)

  useEffect(() => {
    if (weightLossSelector) {
      setPatientsName(weightLossSelector.patientsName)
      setDate(weightLossSelector.date)
      setPrimaryDoctor(weightLossSelector.primaryDoctor)
      setWhyLossWeight(weightLossSelector.whyLossWeight)
      setWeightGoals(weightLossSelector.weightGoals)
      setTimeFrame(weightLossSelector.timeFrame)
      setMostWeighedAsAdult(weightLossSelector.mostWeighedAsAdult)
      setAgeAtAdultMostWeight(weightLossSelector.ageAtAdultMostWeight)

      setLeastWeighedAsAdult(weightLossSelector.leastWeighedAsAdult)
      setAgeAtAdultLeastWeight(weightLossSelector.ageAtAdultLeastWeight)
      setWeightChangeDuringLife(weightLossSelector.weightChangeDuringLife)
      setWeightGainedInPast(weightLossSelector.weightGainedInPast)
      setChallengesOfWeightManagement(
        weightLossSelector.challengesOfWeightManagement,
      )
      setHopesForWeightLossManagement(
        weightLossSelector.hopesForWeightLossManagement,
      )
      setCommitmentsToWeightLoss(weightLossSelector.commitmentsToWeightLoss)
      setCurrentDietAids(weightLossSelector.currentDietAids)
      setOnYourOwn(weightLossSelector.onYourOwn)

      setCheckIfTried(weightLossSelector.checkIfTried)
      setOnYourOwnStartDate(weightLossSelector.onYourOwnStartDate)
      setOnYourOwnEndDate(weightLossSelector.onYourOwnEndDate)
      setOnYourOwnWeightLoss(weightLossSelector.onYourOwnWeightLoss)
      setOnYourOwnReasonForStopping(
        weightLossSelector.onYourOwnReasonForStopping,
      )
      setOnYourOwnReasonForRegain(weightLossSelector.onYourOwnReasonForRegain)
      setAtkinsOrLowCarbohydrate(weightLossSelector.atkinsOrLowCarbohydrate)
      setAtkinsOrLowCarbohydrateStartDate(
        weightLossSelector.atkinsOrLowCarbohydrateStartDate,
      )
      setAtkinsOrLowCarbohydrateEndDate(
        weightLossSelector.atkinsOrLowCarbohydrateEndDate,
      )
      setAtkinsOrLowCarbohydrateWeightLoss(
        weightLossSelector.atkinsOrLowCarbohydrateWeightLoss,
      )
      setAtkinsOrLowCarbohydrateReasonForStopping(
        weightLossSelector.atkinsOrLowCarbohydrateReasonForStopping,
      )
      setAtkinsOrLowCarbohydrateReasonForRegain(
        weightLossSelector.atkinsOrLowCarbohydrateReasonForRegain,
      )
      setJennyCraig(weightLossSelector.jennyCraig)
      setJennyCraigStartDate(weightLossSelector.jennyCraigStartDate)
      setJennyCraigEndDate(weightLossSelector.jennyCraigEndDate)
      setJennyCraigWeightLoss(weightLossSelector.jennyCraigWeightLoss)
      setJennyCraigReasonForStopping(
        weightLossSelector.jennyCraigReasonForStopping,
      )
      setJennyCraigReasonForRegain(weightLossSelector.jennyCraigReasonForRegain)
      setNutrisystem(weightLossSelector.nutrisystem)
      setNutrisystemStartDate(weightLossSelector.nutrisystemStartDate)
      setNutrisystemEndDate(weightLossSelector.nutrisystemEndDate)
      setNutrisystemWeightLoss(weightLossSelector.nutrisystemWeightLoss)
      setNutrisystemReasonForStopping(
        weightLossSelector.nutrisystemReasonForStopping,
      )
      setNutrisystemReasonForRegain(
        weightLossSelector.nutrisystemReasonForRegain,
      )
      setWeightWatchers(weightLossSelector.weightWatchers)
      setWeightWatchersStartDate(weightLossSelector.weightWatchersStartDate)
      setWeightWatchersEndDate(weightLossSelector.weightWatchersEndDate)
      setWeightWatchersWeightLoss(weightLossSelector.weightWatchersWeightLoss)
      setWeightWatchersReasonForStopping(
        weightLossSelector.weightWatchersReasonForStopping,
      )
      setWeightWatchersReasonForRegain(
        weightLossSelector.weightWatchersReasonForRegain,
      )
      setSlimfast(weightLossSelector.slimfast)
      setSlimfastStartDate(weightLossSelector.slimfastStartDate)
      setSlimfastEndDate(weightLossSelector.slimfastEndDate)
      setSlimfastWeightLoss(weightLossSelector.slimfastWeightLoss)
      setSlimfastReasonForStopping(weightLossSelector.slimfastReasonForStopping)
      setSlimfastReasonForRegain(weightLossSelector.slimfastReasonForRegain)
      setOptifast(weightLossSelector.optifast)
      setOptifastStartDate(weightLossSelector.optifastStartDate)
      setOptifastEndDate(weightLossSelector.optifastEndDate)
      setOptifastWeightLoss(weightLossSelector.optifastWeightLoss)
      setOptifastReasonForStopping(weightLossSelector.optifastReasonForStopping)
      setOptifastReasonForRegain(weightLossSelector.optifastReasonForRegain)
      setOtherLiquidDiet(weightLossSelector.otherLiquidDiet)
      setOtherLiquidDietStartDate(weightLossSelector.otherLiquidDietStartDate)
      setOtherLiquidDietEndDate(weightLossSelector.otherLiquidDietEndDate)
      setOtherLiquidDietWeightLoss(weightLossSelector.otherLiquidDietWeightLoss)
      setOtherLiquidDietReasonForStopping(
        weightLossSelector.otherLiquidDietReasonForStopping,
      )
      setOtherLiquidDietReasonForRegain(
        weightLossSelector.otherLiquidDietReasonForRegain,
      )
      setOther(weightLossSelector.other)
      setOtherName(weightLossSelector.otherName)
      setOtherStartDate(weightLossSelector.otherStartDate)
      setOtherEndDate(weightLossSelector.otherEndDate)
      setOtherWeightLoss(weightLossSelector.otherWeightLoss)
      setOtherReasonForStopping(weightLossSelector.otherReasonForStopping)
      setOtherReasonForRegain(weightLossSelector.otherReasonForRegain)
      setAdipex(weightLossSelector.adipex)
      setAdipexStartDate(weightLossSelector.adipexStartDate)
      setAdipexEndDate(weightLossSelector.adipexEndDate)
      setAdipexWeightLoss(weightLossSelector.adipexWeightLoss)
      setAdipexReasonForStopping(weightLossSelector.adipexReasonForStopping)
      setAdipexReasonForRegain(weightLossSelector.adipexReasonForRegain)
      setAlli(weightLossSelector.alli)
      setAlliStartDate(weightLossSelector.alliStartDate)
      setAlliEndDate(weightLossSelector.alliEndDate)
      setAlliWeightLoss(weightLossSelector.alliWeightLoss)
      setAlliReasonForStopping(weightLossSelector.alliReasonForStopping)
      setAlliReasonForRegain(weightLossSelector.alliReasonForRegain)
      setBelviq(weightLossSelector.belviq)
      setBelviqStartDate(weightLossSelector.belviqStartDate)
      setBelviqEndDate(weightLossSelector.belviqEndDate)
      setBelviqWeightLoss(weightLossSelector.belviqWeightLoss)
      setBelviqReasonForStopping(weightLossSelector.belviqReasonForStopping)
      setBelviqReasonForRegain(weightLossSelector.belviqReasonForRegain)
      setAdipex(weightLossSelector.adipex)
      setAdipexStartDate(weightLossSelector.adipexStartDate)
      setAdipexEndDate(weightLossSelector.adipexEndDate)
      setAdipexWeightLoss(weightLossSelector.adipexWeightLoss)
      setAdipexReasonForStopping(weightLossSelector.adipexReasonForStopping)
      setAdipexReasonForRegain(weightLossSelector.adipexReasonForRegain)
      setAlli(weightLossSelector.alli)
      setAlliStartDate(weightLossSelector.alliStartDate)
      setAlliEndDate(weightLossSelector.alliEndDate)
      setAlliWeightLoss(weightLossSelector.alliWeightLoss)
      setAlliReasonForStopping(weightLossSelector.alliReasonForStopping)
      setAlliReasonForRegain(weightLossSelector.alliReasonForRegain)
      setBelviq(weightLossSelector.belviq)
      setBelviqStartDate(weightLossSelector.belviqStartDate)
      setBelviqEndDate(weightLossSelector.belviqEndDate)
      setBelviqWeightLoss(weightLossSelector.belviqWeightLoss)
      setBelviqReasonForStopping(weightLossSelector.belviqReasonForStopping)
      setBelviqReasonForRegain(weightLossSelector.belviqReasonForRegain)
      setDexatrim(weightLossSelector.dexatrim)
      setDexatrimStartDate(weightLossSelector.dexatrimStartDate)
      setDexatrimEndDate(weightLossSelector.dexatrimEndDate)
      setDexatrimWeightLoss(weightLossSelector.dexatrimWeightLoss)
      setDexatrimReasonForStopping(weightLossSelector.dexatrimReasonForStopping)
      setDexatrimReasonForRegain(weightLossSelector.dexatrimReasonForRegain)
      setHerbalWeightLoss(weightLossSelector.herbalWeightLoss)
      setHerbalWeightLossStartDate(weightLossSelector.herbalWeightLossStartDate)
      setHerbalWeightLossEndDate(weightLossSelector.herbalWeightLossEndDate)
      setHerbalWeightLossWeightLoss(
        weightLossSelector.herbalWeightLossWeightLoss,
      )
      setHerbalWeightLossReasonForStopping(
        weightLossSelector.herbalWeightLossReasonForStopping,
      )
      setHerbalWeightLossReasonForRegain(
        weightLossSelector.herbalWeightLossReasonForRegain,
      )
      setMeridia(weightLossSelector.meridia)
      setMeridiaStartDate(weightLossSelector.meridiaStartDate)
      setMeridiaEndDate(weightLossSelector.meridiaEndDate)
      setMeridiaWeightLoss(weightLossSelector.meridiaWeightLoss)
      setMeridiaReasonForStopping(weightLossSelector.meridiaReasonForStopping)
      setMeridiaReasonForRegain(weightLossSelector.meridiaReasonForRegain)
      setPhenfen(weightLossSelector.phenfen)
      setPhenfenStartDate(weightLossSelector.phenfenStartDate)
      setPhenfenEndDate(weightLossSelector.phenfenEndDate)
      setPhenfenWeightLoss(weightLossSelector.phenfenWeightLoss)
      setPhenfenReasonForStopping(weightLossSelector.phenfenReasonForStopping)
      setPhenfenReasonForRegain(weightLossSelector.phenfenReasonForRegain)
      setQsymia(weightLossSelector.qsymia)
      setQsymiaStartDate(weightLossSelector.qsymiaStartDate)
      setQsymiaEndDate(weightLossSelector.qsymiaEndDate)
      setQsymiaWeightLoss(weightLossSelector.qsymiaWeightLoss)
      setQsymiaReasonForStopping(weightLossSelector.qsymiaReasonForStopping)
      setQsymiaReasonForRegain(weightLossSelector.qsymiaReasonForRegain)
      setRedux(weightLossSelector.redux)
      setReduxStartDate(weightLossSelector.reduxStartDate)
      setReduxEndDate(weightLossSelector.reduxEndDate)
      setReduxWeightLoss(weightLossSelector.reduxWeightLoss)
      setReduxReasonForStopping(weightLossSelector.reduxReasonForStopping)
      setReduxReasonForRegain(weightLossSelector.reduxReasonForRegain)
      setOtherSupplements(weightLossSelector.otherSupplements)
      setOtherSupplementsName(weightLossSelector.otherSupplementsName)
      setOtherSupplementsStartDate(weightLossSelector.otherSupplementsStartDate)
      setOtherSupplementsEndDate(weightLossSelector.otherSupplementsEndDate)
      setOtherSupplementsWeightLoss(
        weightLossSelector.otherSupplementsWeightLoss,
      )
      setOtherSupplementsReasonForStopping(
        weightLossSelector.otherSupplementsReasonForStopping,
      )
      setOtherSupplementsReasonForRegain(
        weightLossSelector.otherSupplementsReasonForRegain,
      )
      setChildrenUnderEighteen(weightLossSelector.childrenUnderEighteen)
      setChildrenUnderEighteenCheckBox(
        weightLossSelector.childrenUnderEighteenCheckBox,
      )
      setFamilyMemebersObese(weightLossSelector.familyMemebersObese)
      setSupport(weightLossSelector.support)
      setSupportExplaination(weightLossSelector.supportExplaination)
      setEatingDisorder(weightLossSelector.eatingDisorder)
      setAnorexiaNervosa(weightLossSelector.anorexiaNervosa)
      setBingeEating(weightLossSelector.bingeEating)
      setBulimia(weightLossSelector.bulimia)
      setEatingTooMuch(weightLossSelector.eatingTooMuch)
      setSleepHours(weightLossSelector.sleepHours)
      setRestedWhenWakeUp(weightLossSelector.restedWhenWakeUp)
      setDoYouSnore(weightLossSelector.doYouSnore)
      setWearEquipment(weightLossSelector.wearEquipment)
      setHowManyNights(weightLossSelector.howManyNights)
      setSleepWellness(weightLossSelector.sleepWellness)
      setSittingAndReading(weightLossSelector.sittingAndReading)
      setWatchingTv(weightLossSelector.watchingTv)
      setSittingInPublic(weightLossSelector.sittingInPublic)
      setCarPassanger(weightLossSelector.carPassanger)
      setLyingDown(weightLossSelector.lyingDown)
      setTalkingToSomeone(weightLossSelector.talkingToSomeone)
      setSittingQuietlyAfterLunch(weightLossSelector.sittingQuietlyAfterLunch)
      setInCarWhileStopped(weightLossSelector.inCarWhileStopped)
      setTotal(weightLossSelector.total)
      setTypicalDay(weightLossSelector.typicalDay)
      setEnjoyExercise(weightLossSelector.enjoyExercise)
      setGymMembership(weightLossSelector.gymMembership)
      setExerciseEquipment(weightLossSelector.exerciseEquipment)
      setExerciseRegularly(weightLossSelector.exerciseRegularly)
      setBadExerciseExperience(weightLossSelector.badExerciseExperience)
      setEncourageExercise(weightLossSelector.encourageExercise)
      setSixAm(weightLossSelector.sixAm)
      setNineAm(weightLossSelector.nineAm)
      setTwelvePm(weightLossSelector.twelvePm)
      setThreePm(weightLossSelector.threePm)
      setSixPm(weightLossSelector.sixPm)
      setNinePm(weightLossSelector.ninePm)
      setExerciseWeekly(weightLossSelector.exerciseWeekly)
      setDescribeExercise(weightLossSelector.describeExercise)
      setDifficultyGettingUpFromFloor(
        weightLossSelector.difficultyGettingUpFromFloor,
      )
      setTypeOfExercise(weightLossSelector.typeOfExercise)
      setExercisePreference(weightLossSelector.exercisePreference)
      setAthleteInSchool(weightLossSelector.athleteInSchool)
      setConfidentIncrease(weightLossSelector.confidentIncrease)
      setMajorBenefitsOfExercise(weightLossSelector.majorBenefitsOfExercise)
      setExerciseBarriers(weightLossSelector.exerciseBarriers)
      setMinutesPerDay(weightLossSelector.minutesPerDay)
      setDaysPerWeek(weightLossSelector.daysPerWeek)
      setConfidenceWeightLossDiet(weightLossSelector.confidenceWeightLossDiet)
      setMajorBarriersDiet(weightLossSelector.majorBarriersDiet)
      setFavoriteFoods(weightLossSelector.favoriteFoods)
      setBreakfastTypeOfFood(weightLossSelector.breakfastTypeOfFood)
      setBreakfastProteinOrCarbs(weightLossSelector.breakfastProteinOrCarbs)
      setBreakfastCalories(weightLossSelector.breakfastCalories)
      setLunchTypeOfFood(weightLossSelector.lunchTypeOfFood)
      setLunchProteinOrCarbs(weightLossSelector.lunchProteinOrCarbs)
      setLunchCalories(weightLossSelector.lunchCalories)
      setDinnerTypeOfFood(weightLossSelector.dinnerTypeOfFood)
      setDinnerProteinOrCarbs(weightLossSelector.dinnerProteinOrCarbs)
      setDinnerCalories(weightLossSelector.dinnerCalories)
      setSnackOneTypeOfFood(weightLossSelector.snackOneTypeOfFood)
      setSnackOneProteinOrCarbs(weightLossSelector.snackOneProteinOrCarbs)
      setSnackOneCalories(weightLossSelector.snackOneCalories)
      setSnackTwoTypeOfFood(weightLossSelector.snackTwoTypeOfFood)
      setSnackTwoProteinOrCarbs(weightLossSelector.snackTwoProteinOrCarbs)
      setSnackTwoCalories(weightLossSelector.snackTwoCalories)
      setCoffeeTypeOfFood(weightLossSelector.coffeeTypeOfFood)
      setCoffeeProteinOrCarbs(weightLossSelector.coffeeProteinOrCarbs)
      setCoffeeCalories(weightLossSelector.coffeeCalories)
      setSodaTypeOfFood(weightLossSelector.sodaTypeOfFood)
      setSodaProteinOrCarbs(weightLossSelector.sodaProteinOrCarbs)
      setSodaCalories(weightLossSelector.sodaCalories)
      setCandyOrSweetsTypeOfFood(weightLossSelector.candyOrSweetsTypeOfFood)
      setCandyOrSweetsProteinOrCarbs(
        weightLossSelector.candyOrSweetsProteinOrCarbs,
      )
      setCandyOrSweetsCalories(weightLossSelector.candyOrSweetsCalories)
      setOtherTypeOfFood(weightLossSelector.otherTypeOfFood)
      setOtherProteinOrCarbs(weightLossSelector.otherProteinOrCarbs)
      setOtherCalories(weightLossSelector.otherCalories)
      setNumPeopleLiveWith(weightLossSelector.numPeopleLiveWith)
      setEatTogether(weightLossSelector.eatTogether)
      setWhoDoesShopping(weightLossSelector.whoDoesShopping)
      setWhoDoesCooking(weightLossSelector.whoDoesCooking)
      setFoodIntolerance(weightLossSelector.foodIntolerance)
      setFoodIntoleranceList(weightLossSelector.foodIntoleranceList)
      setStressEating(weightLossSelector.stressEating)
      setStressEatingDetails(weightLossSelector.stressEatingDetails)
      setBingeEatingExperience(weightLossSelector.bingeEatingExperience)
      setBingeEatingDetails(weightLossSelector.bingeEatingDetails)
      setSnackingExperience(weightLossSelector.snackingExperience)
      setSnackingDetails(weightLossSelector.snackingDetails)
      setEatingMiddleOfNightExperience(
        weightLossSelector.eatingMiddleOfNightExperience,
      )
      setEatingMiddleOfNightDetails(
        weightLossSelector.eatingMiddleOfNightDetails,
      )
      setSkippingMealsExperience(weightLossSelector.skippingMealsExperience)
      setSkippingMealsDetails(weightLossSelector.skippingMealsDetails)
      setEatingOutExperience(weightLossSelector.eatingOutExperience)
      setEatingOutDetails(weightLossSelector.eatingOutDetails)
      setEatingInFrontOfTVExperience(
        weightLossSelector.eatingInFrontOfTVExperience,
      )
      setEatingInFrontOfTVDetails(weightLossSelector.eatingInFrontOfTVDetails)
      setEatingAtDeskExperience(weightLossSelector.eatingAtDeskExperience)
      setEatingAtDeskDetails(weightLossSelector.eatingAtDeskDetails)
      setPortionSizeExperience(weightLossSelector.portionSizeExperience)
      setPortionSizeDetails(weightLossSelector.portionSizeDetails)
      setEatingTooFastExperience(weightLossSelector.eatingTooFastExperience)
      setEatingTooFastDetails(weightLossSelector.eatingTooFastDetails)
      setNotSatifiedExperience(weightLossSelector.notSatifiedExperience)
      setNotSatifiedDetails(weightLossSelector.notSatifiedDetails)
      setRegularSoda(weightLossSelector.regularSoda)
      setRegularSodaCount(weightLossSelector.regularSodaCount)
      setJuice(weightLossSelector.juice)
      setJuiceCount(weightLossSelector.juiceCount)
      setSweetTea(weightLossSelector.sweetTea)
      setSweetTeaCount(weightLossSelector.sweetTeaCount)
      setAlchoholBeverages(weightLossSelector.alchoholBeverages)
      setAlchoholBeveragesCount(weightLossSelector.alchoholBeveragesCount)
      setFriedFoods(weightLossSelector.friedFoods)
      setFriedFoodsCount(weightLossSelector.friedFoodsCount)
      setFruitServings(weightLossSelector.fruitServings)
      setVegetableServings(weightLossSelector.vegetableServings)
      setWholeGrainServings(weightLossSelector.wholeGrainServings)
      setLowFatDairyServings(weightLossSelector.lowFatDairyServings)
      setLeanProteinServings(weightLossSelector.leanProteinServings)
      setDaysPerWeekExplination(weightLossSelector.daysPerWeekExplination)
      setMedicalHistory(weightLossSelector.medicalHistory)
      setMedicationsTaken(weightLossSelector.medicationsTaken)
      if (
        weightLossSelector.medicationsTakenList &&
        weightLossSelector.medicationsTakenList.length > 0
      ) {
        weightLossSelector.medicationsTakenList.forEach(
          (medication: string) => {
            if (medicationsTakenList.includes(medication) == false) {
              medicationsTakenList.push(medication)
            }
          },
        )
      }
    }
  }, [weightLossSelector])

  useEffect(() => {
    if (!auth.currentUser?.email) {
      router.push('/PatientLogin')
    }
  }, [])
  return (
    <div>
      <div className="align-center m-5 flex justify-center">
        <TextInput
          id="patientsName"
          placeHolder="Patients Name"
          widthPercentage="w-2/3"
          onChange={(text: React.ChangeEvent<HTMLInputElement>) => {
            setPatientsName(text.target.value)
          }}
          value={patientsName}
          required={requiredPatientsName}
        />
        <DateInput
          id="date"
          placeHolder="Date"
          widthPercentage="w-2/3"
          onChange={(text: React.ChangeEvent<HTMLInputElement>) => {
            setDate(text.target.value)
          }}
          value={date}
          required={requiredDate}
        />
      </div>
      <h1 className="m-3 text-center text-lg font-bold">
        Please answer the following questionnaire as complete as possible.
      </h1>
      <div className="mb-10">
        <TextInput
          id="primaryDoctor"
          placeHolder="Who is your primary care physician or family doctor?"
          widthPercentage="w-2/3"
          onChange={(text: React.ChangeEvent<HTMLInputElement>) => {
            setPrimaryDoctor(text.target.value)
          }}
          value={primaryDoctor}
        />
      </div>
      <div className="mb-10">
        <TextInput
          id="whyLossWeight"
          placeHolder="Why do you want to lose weight?"
          widthPercentage="w-2/3"
          onChange={(text: React.ChangeEvent<HTMLInputElement>) => {
            setWhyLossWeight(text.target.value)
          }}
          value={whyLossWeight}
          required={requiredWhyLossWeight}
        />
      </div>
      <div className="mb-10">
        <TextInput
          id="weightGoals"
          placeHolder="What are your weight goals?"
          widthPercentage="w-2/3"
          onChange={(text: React.ChangeEvent<HTMLInputElement>) => {
            setWeightGoals(text.target.value)
          }}
          value={weightGoals}
          required={requiredWeightGoals}
        />
      </div>
      <div className="mb-10">
        <TextInput
          id="timeFrame"
          placeHolder="What is your time frame to change your habits to reach this weight loss goal?"
          widthPercentage="w-2/3"
          onChange={(text: React.ChangeEvent<HTMLInputElement>) => {
            setTimeFrame(text.target.value)
          }}
          value={timeFrame}
        />
      </div>
      <div className="flex">
        <TextInput
          id="mostWeighedAsAdult"
          placeHolder="Most weighed as adult?"
          widthPercentage="w-2/3"
          onChange={(text: React.ChangeEvent<HTMLInputElement>) => {
            setMostWeighedAsAdult(text.target.value)
          }}
          value={mostWeighedAsAdult}
          required={requiredMostWeighedAsAdult}
        />
        <TextInput
          id="ageAtWeight"
          placeHolder="Age at this weight?"
          widthPercentage="w-2/3"
          onChange={(text: React.ChangeEvent<HTMLInputElement>) => {
            setAgeAtAdultMostWeight(text.target.value)
          }}
          value={ageAtAdultMostWeight}
          required={requiredAgeAtAdultMostWeight}
        />
      </div>
      <div className="flex">
        <TextInput
          id="leastWeighedAsAdult"
          placeHolder="Least weighed as adult?"
          widthPercentage="w-2/3"
          onChange={(text: React.ChangeEvent<HTMLInputElement>) => {
            setLeastWeighedAsAdult(text.target.value)
          }}
          value={leastWeighedAsAdult}
          required={requiredLeastWeighedAsAdult}
        />
        <TextInput
          id="ageAtAdultLeastWeight"
          placeHolder="Age at this weight?"
          widthPercentage="w-2/3"
          onChange={(text: React.ChangeEvent<HTMLInputElement>) => {
            setAgeAtAdultLeastWeight(text.target.value)
          }}
          required={requiredAgeAtAdultLeastWeight}
          value={ageAtAdultLeastWeight}
          onClick={() => {
            const setAutoSave = async () => {
              setAutoSaveWeightAge(false)
            }
            setAutoSave().then(() => {
              WeightLossAutoSave({
                setSuccess: setAutoSaveWeightAge,
                emailValue: auth.currentUser?.email,
                patientsName: patientsName,
                date: date,
                primaryDoctor: primaryDoctor,
                whyLossWeight: whyLossWeight,
                weightGoals: weightGoals,
                timeFrame: timeFrame,
                mostWeighedAsAdult: mostWeighedAsAdult,
                ageAtAdultMostWeight: ageAtAdultMostWeight,
                leastWeighedAsAdult: leastWeighedAsAdult,
                ageAtAdultLeastWeight: ageAtAdultLeastWeight,
                weightChangeDuringLife: weightChangeDuringLife,
                weightGainedInPast: weightGainedInPast,
                challengesOfWeightManagement: challengesOfWeightManagement,
                hopesForWeightLossManagement: hopesForWeightLossManagement,
                commitmentsToWeightLoss: commitmentsToWeightLoss,
                currentDietAids: currentDietAids,
                onYourOwn: onYourOwn,
                checkIfTried: checkIfTried,
                onYourOwnStartDate: onYourOwnStartDate,
                onYourOwnEndDate: onYourOwnEndDate,
                onYourOwnWeightLoss: onYourOwnWeightLoss,
                onYourOwnReasonForStopping: onYourOwnReasonForStopping,
                onYourOwnReasonForRegain: onYourOwnReasonForRegain,
                atkinsOrLowCarbohydrate: atkinsOrLowCarbohydrate,
                atkinsOrLowCarbohydrateStartDate:
                  atkinsOrLowCarbohydrateStartDate,
                atkinsOrLowCarbohydrateEndDate: atkinsOrLowCarbohydrateEndDate,
                atkinsOrLowCarbohydrateWeightLoss:
                  atkinsOrLowCarbohydrateWeightLoss,
                atkinsOrLowCarbohydrateReasonForStopping:
                  atkinsOrLowCarbohydrateReasonForStopping,
                atkinsOrLowCarbohydrateReasonForRegain:
                  atkinsOrLowCarbohydrateReasonForRegain,
                jennyCraig: jennyCraig,
                jennyCraigStartDate: jennyCraigStartDate,
                jennyCraigEndDate: jennyCraigEndDate,
                jennyCraigWeightLoss: jennyCraigWeightLoss,
                jennyCraigReasonForStopping: jennyCraigReasonForStopping,
                jennyCraigReasonForRegain: jennyCraigReasonForRegain,
                nutrisystem: nutrisystem,
                nutrisystemStartDate: nutrisystemStartDate,
                nutrisystemEndDate: nutrisystemEndDate,
                nutrisystemWeightLoss: nutrisystemWeightLoss,
                nutrisystemReasonForStopping: nutrisystemReasonForStopping,
                nutrisystemReasonForRegain: nutrisystemReasonForRegain,
                weightWatchers: weightWatchers,
                weightWatchersStartDate: weightWatchersStartDate,
                weightWatchersEndDate: weightWatchersEndDate,
                weightWatchersWeightLoss: weightWatchersWeightLoss,
                weightWatchersReasonForStopping:
                  weightWatchersReasonForStopping,
                weightWatchersReasonForRegain: weightWatchersReasonForRegain,
                slimfast: slimfast,
                slimfastStartDate: slimfastStartDate,
                slimfastEndDate: slimfastEndDate,
                slimfastWeightLoss: slimfastWeightLoss,
                slimfastReasonForStopping: slimfastReasonForStopping,
                slimfastReasonForRegain: slimfastReasonForRegain,
                optifast: optifast,
                optifastStartDate: optifastStartDate,
                optifastEndDate: optifastEndDate,
                optifastWeightLoss: optifastWeightLoss,
                optifastReasonForStopping: optifastReasonForStopping,
                optifastReasonForRegain: optifastReasonForRegain,
                otherLiquidDiet: otherLiquidDiet,
                otherLiquidDietStartDate: otherLiquidDietStartDate,
                otherLiquidDietEndDate: otherLiquidDietEndDate,
                otherLiquidDietWeightLoss: otherLiquidDietWeightLoss,
                otherLiquidDietReasonForStopping:
                  otherLiquidDietReasonForStopping,
                otherLiquidDietReasonForRegain: otherLiquidDietReasonForRegain,
                other: other,
                otherName: otherName,
                otherStartDate: otherStartDate,
                otherEndDate: otherEndDate,
                otherWeightLoss: otherWeightLoss,
                otherReasonForStopping: otherReasonForStopping,
                otherReasonForRegain: otherReasonForRegain,
                adipex: adipex,
                adipexStartDate: adipexStartDate,
                adipexEndDate: adipexEndDate,
                adipexWeightLoss: adipexWeightLoss,
                adipexReasonForStopping: adipexReasonForStopping,
                adipexReasonForRegain: adipexReasonForRegain,
                alli: alli,
                alliStartDate: alliStartDate,
                alliEndDate: alliEndDate,
                alliWeightLoss: alliWeightLoss,
                alliReasonForStopping: alliReasonForStopping,
                alliReasonForRegain: alliReasonForRegain,
                belviq: belviq,
                belviqStartDate: belviqStartDate,
                belviqEndDate: belviqEndDate,
                belviqWeightLoss: belviqWeightLoss,
                belviqReasonForStopping: belviqReasonForStopping,
                belviqReasonForRegain: belviqReasonForRegain,
                dexatrim: dexatrim,
                dexatrimStartDate: dexatrimStartDate,
                dexatrimEndDate: dexatrimEndDate,
                dexatrimWeightLoss: dexatrimWeightLoss,
                dexatrimReasonForStopping: dexatrimReasonForStopping,
                dexatrimReasonForRegain: dexatrimReasonForRegain,
                herbalWeightLoss: herbalWeightLoss,
                herbalWeightLossStartDate: herbalWeightLossStartDate,
                herbalWeightLossEndDate: herbalWeightLossEndDate,
                herbalWeightLossWeightLoss: herbalWeightLossWeightLoss,
                herbalWeightLossReasonForStopping:
                  herbalWeightLossReasonForStopping,
                herbalWeightLossReasonForRegain:
                  herbalWeightLossReasonForRegain,
                meridia: meridia,
                meridiaStartDate: meridiaStartDate,
                meridiaEndDate: meridiaEndDate,
                meridiaWeightLoss: meridiaWeightLoss,
                meridiaReasonForStopping: meridiaReasonForStopping,
                meridiaReasonForRegain: meridiaReasonForRegain,
                phenfen: phenfen,
                phenfenStartDate: phenfenStartDate,
                phenfenEndDate: phenfenEndDate,
                phenfenWeightLoss: phenfenWeightLoss,
                phenfenReasonForStopping: phenfenReasonForStopping,
                phenfenReasonForRegain: phenfenReasonForRegain,
                qsymia: qsymia,
                qsymiaStartDate: qsymiaStartDate,
                qsymiaEndDate: qsymiaEndDate,
                qsymiaWeightLoss: qsymiaWeightLoss,
                qsymiaReasonForStopping: qsymiaReasonForStopping,
                qsymiaReasonForRegain: qsymiaReasonForRegain,
                redux: redux,
                reduxStartDate: reduxStartDate,
                reduxEndDate: reduxEndDate,
                reduxWeightLoss: reduxWeightLoss,
                reduxReasonForStopping: reduxReasonForStopping,
                reduxReasonForRegain: reduxReasonForRegain,
                otherSupplements: otherSupplements,
                otherSupplementsName: otherSupplementsName,
                otherSupplementsStartDate: otherSupplementsStartDate,
                otherSupplementsEndDate: otherSupplementsEndDate,
                otherSupplementsWeightLoss: otherSupplementsWeightLoss,
                otherSupplementsReasonForStopping:
                  otherSupplementsReasonForStopping,
                otherSupplementsReasonForRegain:
                  otherSupplementsReasonForRegain,
                childrenUnderEighteen: childrenUnderEighteen,
                childrenUnderEighteenCheckBox: childrenUnderEighteenCheckBox,
                familyMemebersObese: familyMemebersObese,
                support: support,
                supportExplaination: supportExplaination,
                eatingDisorder: eatingDisorder,
                anorexiaNervosa: anorexiaNervosa,
                bingeEating: bingeEating,
                bulimia: bulimia,
                eatingTooMuch: eatingTooMuch,
                sleepHours: sleepHours,
                restedWhenWakeUp: restedWhenWakeUp,
                doYouSnore: doYouSnore,
                wearEquipment: wearEquipment,
                howManyNights: howManyNights,
                sleepWellness: sleepWellness,
                sittingAndReading: sittingAndReading,
                watchingTv: watchingTv,
                sittingInPublic: sittingInPublic,
                carPassanger: carPassanger,
                lyingDown: lyingDown,
                talkingToSomeone: talkingToSomeone,
                sittingQuietlyAfterLunch: sittingQuietlyAfterLunch,
                inCarWhileStopped: inCarWhileStopped,
                total: total,
                typicalDay: typicalDay,
                enjoyExercise: enjoyExercise,
                gymMembership: gymMembership,
                exerciseEquipment: exerciseEquipment,
                exerciseRegularly: exerciseRegularly,
                badExerciseExperience: badExerciseExperience,
                encourageExercise: encourageExercise,
                sixAm: sixAm,
                nineAm: nineAm,
                twelvePm: twelvePm,
                threePm: threePm,
                sixPm: sixPm,
                ninePm: ninePm,
                exerciseWeekly: exerciseWeekly,
                describeExercise: describeExercise,
                difficultyGettingUpFromFloor: difficultyGettingUpFromFloor,
                typeOfExercise: typeOfExercise,
                exercisePreference: exercisePreference,
                athleteInSchool: athleteInSchool,
                confidentIncrease: confidentIncrease,
                majorBenefitsOfExercise: majorBenefitsOfExercise,
                exerciseBarriers: exerciseBarriers,
                minutesPerDay: minutesPerDay,
                daysPerWeek: daysPerWeek,
                confidenceWeightLossDiet: confidenceWeightLossDiet,
                majorBarriersDiet: majorBarriersDiet,
                favoriteFoods: favoriteFoods,
                breakfastTypeOfFood: breakfastTypeOfFood,
                breakfastProteinOrCarbs: breakfastProteinOrCarbs,
                breakfastCalories: breakfastCalories,
                lunchTypeOfFood: lunchTypeOfFood,
                lunchProteinOrCarbs: lunchProteinOrCarbs,
                lunchCalories: lunchCalories,
                dinnerTypeOfFood: dinnerTypeOfFood,
                dinnerProteinOrCarbs: dinnerProteinOrCarbs,
                dinnerCalories: dinnerCalories,
                snackOneTypeOfFood: snackOneTypeOfFood,
                snackOneProteinOrCarbs: snackOneProteinOrCarbs,
                snackOneCalories: snackOneCalories,
                snackTwoTypeOfFood: snackTwoTypeOfFood,
                snackTwoProteinOrCarbs: snackTwoProteinOrCarbs,
                snackTwoCalories: snackTwoCalories,
                coffeeTypeOfFood: coffeeTypeOfFood,
                coffeeProteinOrCarbs: coffeeProteinOrCarbs,
                coffeeCalories: coffeeCalories,
                sodaTypeOfFood: sodaTypeOfFood,
                sodaProteinOrCarbs: sodaProteinOrCarbs,
                sodaCalories: sodaCalories,
                candyOrSweetsTypeOfFood: candyOrSweetsTypeOfFood,
                candyOrSweetsProteinOrCarbs: candyOrSweetsProteinOrCarbs,
                candyOrSweetsCalories: candyOrSweetsCalories,
                otherTypeOfFood: otherTypeOfFood,
                otherProteinOrCarbs: otherProteinOrCarbs,
                otherCalories: otherCalories,
                numPeopleLiveWith: numPeopleLiveWith,
                eatTogether: eatTogether,
                whoDoesShopping: whoDoesShopping,
                whoDoesCooking: whoDoesCooking,
                foodIntolerance: foodIntolerance,
                foodIntoleranceList: foodIntoleranceList,
                stressEating: stressEating,
                stressEatingDetails: stressEatingDetails,
                bingeEatingExperience: bingeEatingExperience,
                bingeEatingDetails: bingeEatingDetails,
                snackingExperience: snackingExperience,
                snackingDetails: snackingDetails,
                eatingMiddleOfNightExperience: eatingMiddleOfNightExperience,
                eatingMiddleOfNightDetails: eatingMiddleOfNightDetails,
                skippingMealsExperience: skippingMealsExperience,
                skippingMealsDetails: skippingMealsDetails,
                eatingOutExperience: eatingOutExperience,
                eatingOutDetails: eatingOutDetails,
                eatingInFrontOfTVExperience: eatingInFrontOfTVExperience,
                eatingInFrontOfTVDetails: eatingInFrontOfTVDetails,
                eatingAtDeskExperience: eatingAtDeskExperience,
                eatingAtDeskDetails: eatingAtDeskDetails,
                portionSizeExperience: portionSizeExperience,
                portionSizeDetails: portionSizeDetails,
                eatingTooFastExperience: eatingTooFastExperience,
                eatingTooFastDetails: eatingTooFastDetails,
                notSatifiedExperience: notSatifiedExperience,
                notSatifiedDetails: notSatifiedDetails,
                regularSoda: regularSoda,
                regularSodaCount: regularSodaCount,
                juice: juice,
                juiceCount: juiceCount,
                sweetTea: sweetTea,
                sweetTeaCount: sweetTeaCount,
                alchoholBeverages: alchoholBeverages,
                alchoholBeveragesCount: alchoholBeveragesCount,
                friedFoods: friedFoods,
                friedFoodsCount: friedFoodsCount,
                fruitServings: fruitServings,
                vegetableServings: vegetableServings,
                wholeGrainServings: wholeGrainServings,
                lowFatDairyServings: lowFatDairyServings,
                leanProteinServings: leanProteinServings,
                daysPerWeekExplination: daysPerWeekExplination,
                medicalHistory: medicalHistory,
                medicationsTaken: medicationsTaken,
                medicationsTakenList: medicationsTakenList,
              })
            })
          }}
        />
      </div>
      <AutoSaveLine success={autoSaveWeightAge} />
      <div className="align-center flex justify-center text-lg">
        <CustomCheckBoxField
          id="howHasWeightChangedDuringLife"
          title="How has your weight changed during your life? (Check all that apply)"
          checkBoxValues={weightChangeDuringLife}
          setCheckBoxValues={setWeightChangeDuringLife}
          allowMultipleCheckBoxes={true}
          checkBoxTitles={[
            'Gradual increase with a small amount each year',
            'One or more rapid increase(s) in weight',
            'Up and down',
          ]}
          required={requiredWeightChangeDuringLife}
        />
      </div>
      <div className="align-center flex justify-center text-lg">
        <CustomCheckBoxField
          id="causeOfWeightGainInPast"
          title="What has caused you to gain weight in the past? (Mark all that apply)"
          checkBoxValues={weightGainedInPast}
          setCheckBoxValues={setWeightGainedInPast}
          allowMultipleCheckBoxes={true}
          checkBoxTitles={[
            'Death of Family/Friend',
            'Illness of Family/Friend',
            'Illness',
            'Injury',
            'Quitting Smoking',
            'Menopause',
            'Medications',
            'Stress',
          ]}
          required={requiredWeightGainedInPast}
        />
      </div>
      <div>
        <TextInput
          id="challengesOfWeightManagement"
          placeHolder="What challenges have you had in the past with weight management?"
          widthPercentage="w-2/3"
          onChange={(text: React.ChangeEvent<HTMLInputElement>) => {
            setChallengesOfWeightManagement(text.target.value)
          }}
          value={challengesOfWeightManagement}
        />
      </div>
      <div className="align-center flex justify-center text-lg">
        <CustomCheckBoxField
          id="hopesForWeightLossManagement"
          title="What are you hoping that weight loss management can do for you? (Mark all that apply)"
          checkBoxValues={hopesForWeightLossManagement}
          setCheckBoxValues={setHopesForWeightLossManagement}
          allowMultipleCheckBoxes={true}
          checkBoxTitles={[
            'Improve health/Feel better',
            'Increase energy/Allow me to do more daily activities',
            'Lose weight',
            'Prevent medical problems',
            'Reverse medical problems/Allow me to stop medications',
          ]}
          required={requiredHopesForWeightLossManagement}
        />
      </div>
      <div>
        <TextInput
          id="commitmentsToWeightLoss"
          placeHolder="What commitments are you willing to make for your weight management success?"
          widthPercentage="w-2/3"
          onChange={(text: React.ChangeEvent<HTMLInputElement>) => {
            setCommitmentsToWeightLoss(text.target.value)
          }}
          value={commitmentsToWeightLoss}
        />
      </div>
      <h2 className="text-md m-10 text-center font-bold">
        Please indicate on the list below which of the following diet, diet
        aids, or programs you have tried in the past. For those you have tried,
        please enter the date started, date stopped, amount of weight loss,
        reason for stopping the diet, diet aid, or program, and reason for
        weight regain after stopping.
      </h2>
      <div className="align-center mb-5 flex flex-col justify-center">
        <SectionWithTitle
          title="Diet, Diet Aids, or Programs"
          BgColor="bg-[#e8e8e8]"
          children={[
            <CustomYesOrNo
              id="currentlyOnDietAids"
              text="Are you Currently on a Diet, diet aids, or programs?"
              CheckState={setCurrentDietAids}
              isChecked={currentDietAids}
              marginLeft="ml-[25%]"
              required={requiredCurrentDietAids}
            />,
            currentDietAids === 'Yes' && (
              <div className="align-center flex w-full flex-col justify-center">
                <p className="mt-3 text-center text-xl font-bold">
                  On Your Own
                </p>
                <CustomYesOrNo
                  id="onYourOwn"
                  text="Check if Tried"
                  marginLeft="ml-[38%]"
                  CheckState={setCheckIfTried}
                  isChecked={checkIfTried}
                />
                <DateInput
                  id="onYourOwnStartDate"
                  placeHolder="Start Date"
                  widthPercentage="w-3/4"
                  onChange={(text: React.ChangeEvent<HTMLInputElement>) => {
                    setOnYourOwnStartDate(text.target.value)
                  }}
                  value={onYourOwnStartDate}
                />
                <DateInput
                  id="onYourOwnEndDate"
                  placeHolder="End Date"
                  widthPercentage="w-2/3"
                  onChange={(text: React.ChangeEvent<HTMLInputElement>) => {
                    setOnYourOwnEndDate(text.target.value)
                  }}
                  value={onYourOwnEndDate}
                />
                <TextInput
                  id="onYourOwnWeightLoss"
                  placeHolder="Amount of Weight Lost"
                  widthPercentage="w-1/2"
                  onChange={(text: React.ChangeEvent<HTMLInputElement>) => {
                    setOnYourOwnWeightLoss(text.target.value)
                  }}
                  value={onYourOwnWeightLoss}
                />
                <TextInput
                  id="onYourOwnReasonForStopping"
                  placeHolder="Reason for Stopping"
                  widthPercentage="w-2/3"
                  onChange={(text: React.ChangeEvent<HTMLInputElement>) => {
                    setOnYourOwnReasonForStopping(text.target.value)
                  }}
                  value={onYourOwnReasonForStopping}
                />
                <TextInput
                  id="onYourOwnReasonForRegain"
                  placeHolder="Reason Weight Regained After Stopping"
                  widthPercentage="w-2/3"
                  onChange={(text: React.ChangeEvent<HTMLInputElement>) => {
                    setOnYourOwnReasonForRegain(text.target.value)
                  }}
                  value={onYourOwnReasonForRegain}
                />
                <p className="mt-10 text-center text-xl font-bold">
                  Atkins or low carbohydrate
                </p>
                <CustomYesOrNo
                  id="atkinsOrLowCarbohydrate"
                  text="Check if Tried"
                  marginLeft="ml-[38%]"
                  CheckState={setAtkinsOrLowCarbohydrate}
                  isChecked={atkinsOrLowCarbohydrate}
                />
                <DateInput
                  id="atkinsOrLowCarbohydrateStartDate"
                  placeHolder="Start Date"
                  widthPercentage="w-2/3"
                  onChange={(text: React.ChangeEvent<HTMLInputElement>) => {
                    setAtkinsOrLowCarbohydrateStartDate(text.target.value)
                  }}
                  value={atkinsOrLowCarbohydrateStartDate}
                />
                <DateInput
                  id="atkinsOrLowCarbohydrateEndDate"
                  placeHolder="End Date"
                  widthPercentage="w-2/3"
                  onChange={(text: React.ChangeEvent<HTMLInputElement>) => {
                    setAtkinsOrLowCarbohydrateEndDate(text.target.value)
                  }}
                  value={atkinsOrLowCarbohydrateEndDate}
                />
                <TextInput
                  id="atkinsOrLowCarbohydrateWeightLoss"
                  placeHolder="Amount of Weight Lost"
                  widthPercentage="w-1/2"
                  onChange={(text: React.ChangeEvent<HTMLInputElement>) => {
                    setAtkinsOrLowCarbohydrateWeightLoss(text.target.value)
                  }}
                  value={atkinsOrLowCarbohydrateWeightLoss}
                />
                <TextInput
                  id="atkinsOrLowCarbohydrateReasonForStopping"
                  placeHolder="Reason for Stopping"
                  widthPercentage="w-2/3"
                  onChange={(text: React.ChangeEvent<HTMLInputElement>) => {
                    setAtkinsOrLowCarbohydrateReasonForStopping(
                      text.target.value,
                    )
                  }}
                  value={atkinsOrLowCarbohydrateReasonForStopping}
                />
                <TextInput
                  id="atkinsOrLowCarbohydrateReasonForRegain"
                  placeHolder="Reason Weight Regained After Stopping"
                  widthPercentage="w-2/3"
                  onChange={(text: React.ChangeEvent<HTMLInputElement>) => {
                    setAtkinsOrLowCarbohydrateReasonForRegain(text.target.value)
                  }}
                  value={atkinsOrLowCarbohydrateReasonForRegain}
                />
                ,
                <p className="mt-10 text-center text-xl font-bold">
                  Jenny Craig
                </p>
                <CustomYesOrNo
                  id="jennyCraig"
                  text="Check if Tried"
                  marginLeft="ml-[38%]"
                  CheckState={setJennyCraig}
                  isChecked={jennyCraig}
                />
                <DateInput
                  id="jennyCraigStartDate"
                  placeHolder="Start Date"
                  widthPercentage="w-2/3"
                  onChange={(text: React.ChangeEvent<HTMLInputElement>) => {
                    setJennyCraigStartDate(text.target.value)
                  }}
                  value={jennyCraigStartDate}
                />
                <DateInput
                  id="jennyCraigEndDate"
                  placeHolder="End Date"
                  widthPercentage="w-2/3"
                  onChange={(text: React.ChangeEvent<HTMLInputElement>) => {
                    setJennyCraigEndDate(text.target.value)
                  }}
                  value={jennyCraigEndDate}
                />
                <TextInput
                  id="jennyCraigWeightLoss"
                  placeHolder="Amount of Weight Lost"
                  widthPercentage="w-1/2"
                  onChange={(text: React.ChangeEvent<HTMLInputElement>) => {
                    setJennyCraigWeightLoss(text.target.value)
                  }}
                  value={jennyCraigWeightLoss}
                />
                <TextInput
                  id="jennyCraigReasonForStopping"
                  placeHolder="Reason for Stopping"
                  widthPercentage="w-2/3"
                  onChange={(text: React.ChangeEvent<HTMLInputElement>) => {
                    setJennyCraigReasonForStopping(text.target.value)
                  }}
                  value={jennyCraigReasonForStopping}
                />
                <TextInput
                  id="jennyCraigReasonForRegain"
                  placeHolder="Reason Weight Regained After Stopping"
                  widthPercentage="w-2/3"
                  onChange={(text: React.ChangeEvent<HTMLInputElement>) => {
                    setJennyCraigReasonForRegain(text.target.value)
                  }}
                  value={jennyCraigReasonForRegain}
                />
                <p className="mt-10 text-center text-xl font-bold">
                  Nutrisystem
                </p>
                <CustomYesOrNo
                  id="nutrisystem"
                  text="Check if Tried"
                  marginLeft="ml-[38%]"
                  CheckState={setNutrisystem}
                  isChecked={nutrisystem}
                />
                <DateInput
                  id="nutrisystemStartDate"
                  placeHolder="Start Date"
                  widthPercentage="w-2/3"
                  onChange={(text: React.ChangeEvent<HTMLInputElement>) => {
                    setNutrisystemStartDate(text.target.value)
                  }}
                  value={nutrisystemStartDate}
                />
                <DateInput
                  id="nutrisystemEndDate"
                  placeHolder="End Date"
                  widthPercentage="w-2/3"
                  onChange={(text: React.ChangeEvent<HTMLInputElement>) => {
                    setNutrisystemEndDate(text.target.value)
                  }}
                  value={nutrisystemEndDate}
                />
                <TextInput
                  id="nutrisystemWeightLoss"
                  placeHolder="Amount of Weight Lost"
                  widthPercentage="w-1/2"
                  onChange={(text: React.ChangeEvent<HTMLInputElement>) => {
                    setNutrisystemWeightLoss(text.target.value)
                  }}
                  value={nutrisystemWeightLoss}
                />
                <TextInput
                  id="nutrisystemReasonForStopping"
                  placeHolder="Reason for Stopping"
                  widthPercentage="w-2/3"
                  onChange={(text: React.ChangeEvent<HTMLInputElement>) => {
                    setNutrisystemReasonForStopping(text.target.value)
                  }}
                  value={nutrisystemReasonForStopping}
                />
                <TextInput
                  id="nutrisystemReasonForRegain"
                  placeHolder="Reason Weight Regained After Stopping"
                  widthPercentage="w-2/3"
                  onChange={(text: React.ChangeEvent<HTMLInputElement>) => {
                    setNutrisystemReasonForRegain(text.target.value)
                  }}
                  value={nutrisystemReasonForRegain}
                />
                <p className="mt-10 text-center text-xl font-bold">
                  Weight Watchers
                </p>
                <CustomYesOrNo
                  id="weightWatchers"
                  text="Check if Tried"
                  marginLeft="ml-[38%]"
                  CheckState={setWeightWatchers}
                  isChecked={weightWatchers}
                />
                <DateInput
                  id="weightWatchersStartDate"
                  placeHolder="Start Date"
                  widthPercentage="w-2/3"
                  onChange={(text: React.ChangeEvent<HTMLInputElement>) => {
                    setWeightWatchersStartDate(text.target.value)
                  }}
                  value={weightWatchersStartDate}
                />
                <DateInput
                  id="weightWatchersEndDate"
                  placeHolder="End Date"
                  widthPercentage="w-2/3"
                  onChange={(text: React.ChangeEvent<HTMLInputElement>) => {
                    setWeightWatchersEndDate(text.target.value)
                  }}
                  value={weightWatchersEndDate}
                />
                <TextInput
                  id="weightWatchersWeightLoss"
                  placeHolder="Amount of Weight Lost"
                  widthPercentage="w-1/2"
                  onChange={(text: React.ChangeEvent<HTMLInputElement>) => {
                    setWeightWatchersWeightLoss(text.target.value)
                  }}
                  value={weightWatchersWeightLoss}
                />
                <TextInput
                  id="weightWatchersReasonForStopping"
                  placeHolder="Reason for Stopping"
                  widthPercentage="w-2/3"
                  onChange={(text: React.ChangeEvent<HTMLInputElement>) => {
                    setWeightWatchersReasonForStopping(text.target.value)
                  }}
                  value={weightWatchersReasonForStopping}
                />
                <TextInput
                  id="weightWatchersReasonForRegain"
                  placeHolder="Reason Weight Regained After Stopping"
                  widthPercentage="w-2/3"
                  onChange={(text: React.ChangeEvent<HTMLInputElement>) => {
                    setWeightWatchersReasonForRegain(text.target.value)
                  }}
                  value={weightWatchersReasonForRegain}
                />
                <p className="mt-10 text-center text-xl font-bold">Slimfast</p>
                <CustomYesOrNo
                  id="slimfast"
                  text="Check if Tried"
                  marginLeft="ml-[38%]"
                  CheckState={setSlimfast}
                  isChecked={slimfast}
                />
                <DateInput
                  id="slimfastStartDate"
                  placeHolder="Start Date"
                  widthPercentage="w-2/3"
                  onChange={(text: React.ChangeEvent<HTMLInputElement>) => {
                    setSlimfastStartDate(text.target.value)
                  }}
                  value={slimfastStartDate}
                />
                <DateInput
                  id="slimfastEndDate"
                  placeHolder="End Date"
                  widthPercentage="w-2/3"
                  onChange={(text: React.ChangeEvent<HTMLInputElement>) => {
                    setSlimfastEndDate(text.target.value)
                  }}
                  value={slimfastEndDate}
                />
                <TextInput
                  id="slimfastWeightLoss"
                  placeHolder="Amount of Weight Lost"
                  widthPercentage="w-1/2"
                  onChange={(text: React.ChangeEvent<HTMLInputElement>) => {
                    setSlimfastWeightLoss(text.target.value)
                  }}
                  value={slimfastWeightLoss}
                />
                <TextInput
                  id="slimfastReasonForStopping"
                  placeHolder="Reason for Stopping"
                  widthPercentage="w-2/3"
                  onChange={(text: React.ChangeEvent<HTMLInputElement>) => {
                    setSlimfastReasonForStopping(text.target.value)
                  }}
                  value={slimfastReasonForStopping}
                />
                <TextInput
                  id="slimfastReasonForRegain"
                  placeHolder="Reason Weight Regained After Stopping"
                  widthPercentage="w-2/3"
                  onChange={(text: React.ChangeEvent<HTMLInputElement>) => {
                    setSlimfastReasonForRegain(text.target.value)
                  }}
                  value={slimfastReasonForRegain}
                />
                <p className="mt-10 text-center text-xl font-bold">Optifast</p>
                <CustomYesOrNo
                  id="optifast"
                  text="Check if Tried"
                  marginLeft="ml-[38%]"
                  CheckState={setOptifast}
                  isChecked={optifast}
                />
                <DateInput
                  id="optifastStartDate"
                  placeHolder="Start Date"
                  widthPercentage="w-2/3"
                  onChange={(text: React.ChangeEvent<HTMLInputElement>) => {
                    setOptifastStartDate(text.target.value)
                  }}
                  value={optifastStartDate}
                />
                <DateInput
                  id="optifastEndDate"
                  placeHolder="End Date"
                  widthPercentage="w-2/3"
                  onChange={(text: React.ChangeEvent<HTMLInputElement>) => {
                    setOptifastEndDate(text.target.value)
                  }}
                  value={optifastEndDate}
                />
                <TextInput
                  id="optifastWeightLoss"
                  placeHolder="Amount of Weight Lost"
                  widthPercentage="w-1/2"
                  onChange={(text: React.ChangeEvent<HTMLInputElement>) => {
                    setOptifastWeightLoss(text.target.value)
                  }}
                  value={optifastWeightLoss}
                />
                <TextInput
                  id="optifastReasonForStopping"
                  placeHolder="Reason for Stopping"
                  widthPercentage="w-2/3"
                  onChange={(text: React.ChangeEvent<HTMLInputElement>) => {
                    setOptifastReasonForStopping(text.target.value)
                  }}
                  value={optifastReasonForStopping}
                />
                <TextInput
                  id="optifastReasonForRegain"
                  placeHolder="Reason Weight Regained After Stopping"
                  widthPercentage="w-2/3"
                  onChange={(text: React.ChangeEvent<HTMLInputElement>) => {
                    setOptifastReasonForRegain(text.target.value)
                  }}
                  value={optifastReasonForRegain}
                />
                <p className="mt-10 text-center text-xl font-bold">
                  Other liquid diet
                </p>
                <CustomYesOrNo
                  id="otherLiquidDiet"
                  text="Check if Tried"
                  marginLeft="ml-[38%]"
                  CheckState={setOtherLiquidDiet}
                  isChecked={otherLiquidDiet}
                />
                <DateInput
                  id="otherLiquidDietStartDate"
                  placeHolder="Start Date"
                  widthPercentage="w-2/3"
                  onChange={(text: React.ChangeEvent<HTMLInputElement>) => {
                    setOtherLiquidDietStartDate(text.target.value)
                  }}
                  value={otherLiquidDietStartDate}
                />
                <DateInput
                  id="otherLiquidDietEndDate"
                  placeHolder="End Date"
                  widthPercentage="w-2/3"
                  onChange={(text: React.ChangeEvent<HTMLInputElement>) => {
                    setOtherLiquidDietEndDate(text.target.value)
                  }}
                  value={otherLiquidDietEndDate}
                />
                <TextInput
                  id="otherLiquidDietWeightLoss"
                  placeHolder="Amount of Weight Lost"
                  widthPercentage="w-1/2"
                  onChange={(text: React.ChangeEvent<HTMLInputElement>) => {
                    setOtherLiquidDietWeightLoss(text.target.value)
                  }}
                  value={otherLiquidDietWeightLoss}
                />
                <TextInput
                  id="otherLiquidDietReasonForStopping"
                  placeHolder="Reason for Stopping"
                  widthPercentage="w-2/3"
                  onChange={(text: React.ChangeEvent<HTMLInputElement>) => {
                    setOtherLiquidDietReasonForStopping(text.target.value)
                  }}
                  value={otherLiquidDietReasonForStopping}
                />
                <TextInput
                  id="otherLiquidDietReasonForRegain"
                  placeHolder="Reason Weight Regained After Stopping"
                  widthPercentage="w-2/3"
                  onChange={(text: React.ChangeEvent<HTMLInputElement>) => {
                    setOtherLiquidDietReasonForRegain(text.target.value)
                  }}
                  value={otherLiquidDietReasonForRegain}
                />
                <p className="mt-10 text-center text-xl font-bold">
                  Other (please specify)
                </p>
                <CustomYesOrNo
                  id="other"
                  text="Check if Tried"
                  marginLeft="ml-[38%]"
                  CheckState={setOther}
                  isChecked={other}
                />
                <TextInput
                  id="otherName"
                  placeHolder="Name of Diet"
                  widthPercentage="w-2/3"
                  onChange={(text: React.ChangeEvent<HTMLInputElement>) => {
                    setOtherName(text.target.value)
                  }}
                  value={otherName}
                />
                <DateInput
                  id="otherStartDate"
                  placeHolder="Start Date"
                  widthPercentage="w-2/3"
                  onChange={(text: React.ChangeEvent<HTMLInputElement>) => {
                    setOtherStartDate(text.target.value)
                  }}
                  value={otherStartDate}
                />
                <DateInput
                  id="otherEndDate"
                  placeHolder="End Date"
                  widthPercentage="w-2/3"
                  onChange={(text: React.ChangeEvent<HTMLInputElement>) => {
                    setOtherEndDate(text.target.value)
                  }}
                  value={otherEndDate}
                />
                <TextInput
                  id="otherWeightLoss"
                  placeHolder="Amount of Weight Lost"
                  widthPercentage="w-1/2"
                  onChange={(text: React.ChangeEvent<HTMLInputElement>) => {
                    setOtherWeightLoss(text.target.value)
                  }}
                  value={otherWeightLoss}
                />
                <TextInput
                  id="otherReasonForStopping"
                  placeHolder="Reason for Stopping"
                  widthPercentage="w-2/3"
                  onChange={(text: React.ChangeEvent<HTMLInputElement>) => {
                    setOtherReasonForStopping(text.target.value)
                  }}
                  value={otherReasonForStopping}
                />
                <TextInput
                  id="otherReasonForRegain"
                  placeHolder="Reason Weight Regained After Stopping"
                  widthPercentage="w-2/3"
                  onChange={(text: React.ChangeEvent<HTMLInputElement>) => {
                    setOtherReasonForRegain(text.target.value)
                  }}
                  value={otherReasonForRegain}
                />
              </div>
            ),
          ]}
        />
      </div>
      <div className="my-10 flex items-center justify-center justify-self-center">
        <LineDivider
          lineColor="bg-[#e9e7e7b1]"
          lineWidth="w-[80%]"
          lineHeight="h-[10px]"
        />
      </div>
      <p className="mt-10 text-center text-xl font-bold">
        Adipex®, Fastin® (Phentermine)
      </p>
      <div className="align-center flex justify-center">
        <CustomYesOrNo
          id="adipex"
          text="Check if Tried"
          CheckState={setAdipex}
          isChecked={adipex}
        />
      </div>
      <div className="flex">
        <DateInput
          id="adipexStartDate"
          placeHolder="Start Date"
          widthPercentage="w-2/3"
          onChange={(text: React.ChangeEvent<HTMLInputElement>) => {
            setAdipexStartDate(text.target.value)
          }}
          value={adipexStartDate}
        />
        <DateInput
          id="adipexEndDate"
          placeHolder="End Date"
          widthPercentage="w-2/3"
          onChange={(text: React.ChangeEvent<HTMLInputElement>) => {
            setAdipexEndDate(text.target.value)
          }}
          value={adipexEndDate}
        />
      </div>
      <div>
        <TextInput
          id="adipexWeightLoss"
          placeHolder="Amount of Weight Lost"
          widthPercentage="w-1/2"
          onChange={(text: React.ChangeEvent<HTMLInputElement>) => {
            setAdipexWeightLoss(text.target.value)
          }}
          value={adipexWeightLoss}
        />
      </div>
      <div>
        <TextInput
          id="adipexReasonForStopping"
          placeHolder="Reason for Stopping"
          widthPercentage="w-2/3"
          onChange={(text: React.ChangeEvent<HTMLInputElement>) => {
            setAdipexReasonForStopping(text.target.value)
          }}
          value={adipexReasonForStopping}
        />
        <TextInput
          id="adipexReasonForRegain"
          placeHolder="Reason Weight Regained After Stopping"
          widthPercentage="w-2/3"
          onChange={(text: React.ChangeEvent<HTMLInputElement>) => {
            setAdipexReasonForRegain(text.target.value)
          }}
          value={adipexReasonForRegain}
        />
      </div>
      <p className="mt-10 text-center text-xl font-bold">
        Alli®, Xenical® (Orlistat)
      </p>
      <div className="align-center flex justify-center">
        <CustomYesOrNo
          id="alli"
          text="Check if Tried"
          CheckState={setAlli}
          isChecked={alli}
        />
      </div>
      <div className="flex">
        <DateInput
          id="alliStartDate"
          placeHolder="Start Date"
          widthPercentage="w-2/3"
          onChange={(text: React.ChangeEvent<HTMLInputElement>) => {
            setAlliStartDate(text.target.value)
          }}
          value={alliStartDate}
        />
        <DateInput
          id="alliEndDate"
          placeHolder="End Date"
          widthPercentage="w-2/3"
          onChange={(text: React.ChangeEvent<HTMLInputElement>) => {
            setAlliEndDate(text.target.value)
          }}
          value={alliEndDate}
        />
      </div>
      <div>
        <TextInput
          id="alliWeightLoss"
          placeHolder="Amount of Weight Lost"
          widthPercentage="w-1/2"
          onChange={(text: React.ChangeEvent<HTMLInputElement>) => {
            setAlliWeightLoss(text.target.value)
          }}
          value={alliWeightLoss}
        />
      </div>
      <div>
        <TextInput
          id="alliReasonForStopping"
          placeHolder="Reason for Stopping"
          widthPercentage="w-2/3"
          onChange={(text: React.ChangeEvent<HTMLInputElement>) => {
            setAlliReasonForStopping(text.target.value)
          }}
          value={alliReasonForStopping}
        />
        <TextInput
          id="alliReasonForRegain"
          placeHolder="Reason Weight Regained After Stopping"
          widthPercentage="w-2/3"
          onChange={(text: React.ChangeEvent<HTMLInputElement>) => {
            setAlliReasonForRegain(text.target.value)
          }}
          value={alliReasonForRegain}
        />
      </div>
      <p className="mt-10 text-center text-xl font-bold">
        Belviq® (Locaserin)
      </p>
      <div className="align-center flex justify-center">
        <CustomYesOrNo
          id="belviq"
          text="Check if Tried"
          CheckState={setBelviq}
          isChecked={belviq}
        />
      </div>
      <div className="flex">
        <DateInput
          id="belviqStartDate"
          placeHolder="Start Date"
          widthPercentage="w-2/3"
          onChange={(text: React.ChangeEvent<HTMLInputElement>) => {
            setBelviqStartDate(text.target.value)
          }}
          value={belviqStartDate}
        />
        <DateInput
          id="belviqEndDate"
          placeHolder="End Date"
          widthPercentage="w-2/3"
          onChange={(text: React.ChangeEvent<HTMLInputElement>) => {
            setBelviqEndDate(text.target.value)
          }}
          value={belviqEndDate}
        />
      </div>
      <div>
        <TextInput
          id="belviqWeightLoss"
          placeHolder="Amount of Weight Lost"
          widthPercentage="w-1/2"
          onChange={(text: React.ChangeEvent<HTMLInputElement>) => {
            setBelviqWeightLoss(text.target.value)
          }}
          value={belviqWeightLoss}
        />
      </div>
      <div>
        <TextInput
          id="belviqReasonForStopping"
          placeHolder="Reason for Stopping"
          widthPercentage="w-2/3"
          onChange={(text: React.ChangeEvent<HTMLInputElement>) => {
            setBelviqReasonForStopping(text.target.value)
          }}
          value={belviqReasonForStopping}
        />
        <TextInput
          id="belviqReasonForRegain"
          placeHolder="Reason Weight Regained After Stopping"
          widthPercentage="w-2/3"
          onChange={(text: React.ChangeEvent<HTMLInputElement>) => {
            setBelviqReasonForRegain(text.target.value)
          }}
          value={belviqReasonForRegain}
        />
      </div>
      <p className="mt-10 text-center text-xl font-bold">Dexatrim®</p>
      <div className="align-center flex justify-center">
        <CustomYesOrNo
          id="dexatrim"
          text="Check if Tried"
          CheckState={setDexatrim}
          isChecked={dexatrim}
        />
      </div>
      <div className="flex">
        <DateInput
          id="dexatrimStartDate"
          placeHolder="Start Date"
          widthPercentage="w-2/3"
          onChange={(text: React.ChangeEvent<HTMLInputElement>) => {
            setDexatrimStartDate(text.target.value)
          }}
          value={dexatrimStartDate}
        />
        <DateInput
          id="dexatrimEndDate"
          placeHolder="End Date"
          widthPercentage="w-2/3"
          onChange={(text: React.ChangeEvent<HTMLInputElement>) => {
            setDexatrimEndDate(text.target.value)
          }}
          value={dexatrimEndDate}
        />
      </div>
      <div>
        <TextInput
          id="dexatrimWeightLoss"
          placeHolder="Amount of Weight Lost"
          widthPercentage="w-1/2"
          onChange={(text: React.ChangeEvent<HTMLInputElement>) => {
            setDexatrimWeightLoss(text.target.value)
          }}
          value={dexatrimWeightLoss}
        />
      </div>
      <div>
        <TextInput
          id="dexatrimReasonForStopping"
          placeHolder="Reason for Stopping"
          widthPercentage="w-2/3"
          onChange={(text: React.ChangeEvent<HTMLInputElement>) => {
            setDexatrimReasonForStopping(text.target.value)
          }}
          value={dexatrimReasonForStopping}
        />
        <TextInput
          id="dexatrimReasonForRegain"
          placeHolder="Reason Weight Regained After Stopping"
          widthPercentage="w-2/3"
          onChange={(text: React.ChangeEvent<HTMLInputElement>) => {
            setDexatrimReasonForRegain(text.target.value)
          }}
          value={dexatrimReasonForRegain}
        />
      </div>
      <p className="mt-10 text-center text-xl font-bold">
        Herbal weight loss products
      </p>
      <div className="align-center flex justify-center">
        <CustomYesOrNo
          id="herbalWeightLoss"
          text="Check if Tried"
          CheckState={setHerbalWeightLoss}
          isChecked={herbalWeightLoss}
        />
      </div>
      <div className="flex">
        <DateInput
          id="herbalWeightLossStartDate"
          placeHolder="Start Date"
          widthPercentage="w-2/3"
          onChange={(text: React.ChangeEvent<HTMLInputElement>) => {
            setHerbalWeightLossStartDate(text.target.value)
          }}
          value={herbalWeightLossStartDate}
        />
        <DateInput
          id="herbalWeightLossEndDate"
          placeHolder="End Date"
          widthPercentage="w-2/3"
          onChange={(text: React.ChangeEvent<HTMLInputElement>) => {
            setHerbalWeightLossEndDate(text.target.value)
          }}
          value={herbalWeightLossEndDate}
        />
      </div>
      <div>
        <TextInput
          id="herbalWeightLossWeightLoss"
          placeHolder="Amount of Weight Lost"
          widthPercentage="w-1/2"
          onChange={(text: React.ChangeEvent<HTMLInputElement>) => {
            setHerbalWeightLossWeightLoss(text.target.value)
          }}
          value={herbalWeightLossWeightLoss}
        />
      </div>
      <div>
        <TextInput
          id="herbalWeightLossReasonForStopping"
          placeHolder="Reason for Stopping"
          widthPercentage="w-2/3"
          onChange={(text: React.ChangeEvent<HTMLInputElement>) => {
            setHerbalWeightLossReasonForStopping(text.target.value)
          }}
          value={herbalWeightLossReasonForStopping}
        />
        <TextInput
          id="herbalWeightLossReasonForRegain"
          placeHolder="Reason Weight Regained After Stopping"
          widthPercentage="w-2/3"
          onChange={(text: React.ChangeEvent<HTMLInputElement>) => {
            setHerbalWeightLossReasonForRegain(text.target.value)
          }}
          value={herbalWeightLossReasonForRegain}
        />
      </div>
      <p className="mt-10 text-center text-xl font-bold">
        Meredia® (Sibutramine)
      </p>
      <div className="align-center flex justify-center">
        <CustomYesOrNo
          id="meridia"
          text="Check if Tried"
          CheckState={setMeridia}
          isChecked={meridia}
        />
      </div>
      <div className="flex">
        <DateInput
          id="meridiaStartDate"
          placeHolder="Start Date"
          widthPercentage="w-2/3"
          onChange={(text: React.ChangeEvent<HTMLInputElement>) => {
            setMeridiaStartDate(text.target.value)
          }}
          value={meridiaStartDate}
        />
        <DateInput
          id="meridiaEndDate"
          placeHolder="End Date"
          widthPercentage="w-2/3"
          onChange={(text: React.ChangeEvent<HTMLInputElement>) => {
            setMeridiaEndDate(text.target.value)
          }}
          value={meridiaEndDate}
        />
      </div>
      <div>
        <TextInput
          id="meridiaWeightLoss"
          placeHolder="Amount of Weight Lost"
          widthPercentage="w-1/2"
          onChange={(text: React.ChangeEvent<HTMLInputElement>) => {
            setMeridiaWeightLoss(text.target.value)
          }}
          value={meridiaWeightLoss}
        />
      </div>
      <div>
        <TextInput
          id="meridiaReasonForStopping"
          placeHolder="Reason for Stopping"
          widthPercentage="w-2/3"
          onChange={(text: React.ChangeEvent<HTMLInputElement>) => {
            setMeridiaReasonForStopping(text.target.value)
          }}
          value={meridiaReasonForStopping}
        />
        <TextInput
          id="meridiaReasonForRegain"
          placeHolder="Reason Weight Regained After Stopping"
          widthPercentage="w-2/3"
          onChange={(text: React.ChangeEvent<HTMLInputElement>) => {
            setMeridiaReasonForRegain(text.target.value)
          }}
          value={meridiaReasonForRegain}
        />
      </div>
      <p className="mt-10 text-center text-xl font-bold">Phen-fen</p>
      <div className="align-center flex justify-center">
        <CustomYesOrNo
          id="phenfen"
          text="Check if Tried"
          CheckState={setPhenfen}
          isChecked={phenfen}
        />
      </div>
      <div className="flex">
        <DateInput
          id="phenfenStartDate"
          placeHolder="Start Date"
          widthPercentage="w-2/3"
          onChange={(text: React.ChangeEvent<HTMLInputElement>) => {
            setPhenfenStartDate(text.target.value)
          }}
          value={phenfenStartDate}
        />
        <DateInput
          id="phenfenEndDate"
          placeHolder="End Date"
          widthPercentage="w-2/3"
          onChange={(text: React.ChangeEvent<HTMLInputElement>) => {
            setPhenfenEndDate(text.target.value)
          }}
          value={phenfenEndDate}
        />
      </div>
      <div>
        <TextInput
          id="phenfenWeightLoss"
          placeHolder="Amount of Weight Lost"
          widthPercentage="w-1/2"
          onChange={(text: React.ChangeEvent<HTMLInputElement>) => {
            setPhenfenWeightLoss(text.target.value)
          }}
          value={phenfenWeightLoss}
        />
      </div>
      <div>
        <TextInput
          id="phenfenReasonForStopping"
          placeHolder="Reason for Stopping"
          widthPercentage="w-2/3"
          onChange={(text: React.ChangeEvent<HTMLInputElement>) => {
            setPhenfenReasonForStopping(text.target.value)
          }}
          value={phenfenReasonForStopping}
        />
        <TextInput
          id="phenfenReasonForRegain"
          placeHolder="Reason Weight Regained After Stopping"
          widthPercentage="w-2/3"
          onChange={(text: React.ChangeEvent<HTMLInputElement>) => {
            setPhenfenReasonForRegain(text.target.value)
          }}
          value={phenfenReasonForRegain}
        />
      </div>
      <p className="mt-10 text-center text-xl font-bold">Qsymia®</p>
      <div className="align-center flex justify-center">
        <CustomYesOrNo
          id="qsymia"
          text="Check if Tried"
          CheckState={setQsymia}
          isChecked={qsymia}
        />
      </div>
      <div className="flex">
        <DateInput
          id="qsymiaStartDate"
          placeHolder="Start Date"
          widthPercentage="w-2/3"
          onChange={(text: React.ChangeEvent<HTMLInputElement>) => {
            setQsymiaStartDate(text.target.value)
          }}
          value={qsymiaStartDate}
        />
        <DateInput
          id="qsymiaEndDate"
          placeHolder="End Date"
          widthPercentage="w-2/3"
          onChange={(text: React.ChangeEvent<HTMLInputElement>) => {
            setQsymiaEndDate(text.target.value)
          }}
          value={qsymiaEndDate}
        />
      </div>
      <div>
        <TextInput
          id="qsymiaWeightLoss"
          placeHolder="Amount of Weight Lost"
          widthPercentage="w-1/2"
          onChange={(text: React.ChangeEvent<HTMLInputElement>) => {
            setQsymiaWeightLoss(text.target.value)
          }}
          value={qsymiaWeightLoss}
        />
      </div>
      <div>
        <TextInput
          id="qsymiaReasonForStopping"
          placeHolder="Reason for Stopping"
          widthPercentage="w-2/3"
          onChange={(text: React.ChangeEvent<HTMLInputElement>) => {
            setQsymiaReasonForStopping(text.target.value)
          }}
          value={qsymiaReasonForStopping}
        />
        <TextInput
          id="qsymiaReasonForRegain"
          placeHolder="Reason Weight Regained After Stopping"
          widthPercentage="w-2/3"
          onChange={(text: React.ChangeEvent<HTMLInputElement>) => {
            setQsymiaReasonForRegain(text.target.value)
          }}
          value={qsymiaReasonForRegain}
        />
      </div>
      <p className="mt-10 text-center text-xl font-bold">Redux®</p>
      <div className="align-center flex justify-center">
        <CustomYesOrNo
          id="redux"
          text="Check if Tried"
          CheckState={setRedux}
          isChecked={redux}
        />
      </div>
      <div className="flex">
        <DateInput
          id="reduxStartDate"
          placeHolder="Start Date"
          widthPercentage="w-2/3"
          onChange={(text: React.ChangeEvent<HTMLInputElement>) => {
            setReduxStartDate(text.target.value)
          }}
          value={reduxStartDate}
        />
        <DateInput
          id="reduxEndDate"
          placeHolder="End Date"
          widthPercentage="w-2/3"
          onChange={(text: React.ChangeEvent<HTMLInputElement>) => {
            setReduxEndDate(text.target.value)
          }}
          value={reduxEndDate}
        />
      </div>
      <div>
        <TextInput
          id="reduxWeightLoss"
          placeHolder="Amount of Weight Lost"
          widthPercentage="w-1/2"
          onChange={(text: React.ChangeEvent<HTMLInputElement>) => {
            setReduxWeightLoss(text.target.value)
          }}
          value={reduxWeightLoss}
        />
      </div>
      <div>
        <TextInput
          id="reduxReasonForStopping"
          placeHolder="Reason for Stopping"
          widthPercentage="w-2/3"
          onChange={(text: React.ChangeEvent<HTMLInputElement>) => {
            setReduxReasonForStopping(text.target.value)
          }}
          value={reduxReasonForStopping}
        />
        <TextInput
          id="reduxReasonForRegain"
          placeHolder="Reason Weight Regained After Stopping"
          widthPercentage="w-2/3"
          onChange={(text: React.ChangeEvent<HTMLInputElement>) => {
            setReduxReasonForRegain(text.target.value)
          }}
          value={reduxReasonForRegain}
        />
      </div>
      <p className="mt-10 text-center text-xl font-bold">
        Other (please specify)
      </p>
      <div className="align-center flex justify-center">
        <CustomYesOrNo
          id="other"
          text="Check if Tried"
          CheckState={setOtherSupplements}
          isChecked={otherSupplements}
        />
      </div>
      <div>
        <TextInput
          id="otherSupplements"
          placeHolder="Other Supplements"
          widthPercentage="w-2/3"
          onChange={(text: React.ChangeEvent<HTMLInputElement>) => {
            setOtherSupplementsName(text.target.value)
          }}
          value={otherSupplementsName}
        />
      </div>
      <div className="flex">
        <DateInput
          id="otherSupplementsStartDate"
          placeHolder="Start Date"
          widthPercentage="w-2/3"
          onChange={(text: React.ChangeEvent<HTMLInputElement>) => {
            setOtherSupplementsStartDate(text.target.value)
          }}
          value={otherSupplementsStartDate}
        />
        <DateInput
          id="otherSupplementsEndDate"
          placeHolder="End Date"
          widthPercentage="w-2/3"
          onChange={(text: React.ChangeEvent<HTMLInputElement>) => {
            setOtherSupplementsEndDate(text.target.value)
          }}
          value={otherSupplementsEndDate}
        />
      </div>
      <div>
        <TextInput
          id="otherSupplementsWeightLoss"
          placeHolder="Amount of Weight Lost"
          widthPercentage="w-1/2"
          onChange={(text: React.ChangeEvent<HTMLInputElement>) => {
            setOtherSupplementsWeightLoss(text.target.value)
          }}
          value={otherSupplementsWeightLoss}
        />
      </div>
      <div className=" mb-10">
        <TextInput
          id="otherSupplementsReasonForStopping"
          placeHolder="Reason for Stopping"
          widthPercentage="w-2/3"
          onChange={(text: React.ChangeEvent<HTMLInputElement>) => {
            setOtherSupplementsReasonForStopping(text.target.value)
          }}
          value={otherSupplementsReasonForStopping}
        />
        <TextInput
          id="otherSupplementsReasonForRegain"
          placeHolder="Reason Weight Regained After Stopping"
          widthPercentage="w-2/3"
          onChange={(text: React.ChangeEvent<HTMLInputElement>) => {
            setOtherSupplementsReasonForRegain(text.target.value)
          }}
          value={otherSupplementsReasonForRegain}
        />
      </div>
      <div className="my-10 flex items-center justify-center justify-self-center">
        <LineDivider
          lineColor="bg-[#e9e7e7b1]"
          lineWidth="w-[80%]"
          lineHeight="h-[10px]"
        />
      </div>
      <AutoSaveLine success={autoSaveEighteen} />
      <div className="mt-10">
        <TextInput
          id="childrenUnderEighteen"
          placeHolder="How many people under age 18 live with you?"
          widthPercentage="w-2/5"
          onChange={(text: React.ChangeEvent<HTMLInputElement>) => {
            setChildrenUnderEighteen(text.target.value)
          }}
          value={childrenUnderEighteen}
          required={requiredChildrenUnderEighteen}
          onClick={() => {
            const setAutoSave = async () => {
              setAutoSaveWeightAge(false)
            }
            setAutoSave().then(() => {
              WeightLossAutoSave({
                setSuccess: setAutoSaveEighteen,
                emailValue: auth.currentUser?.email,
                patientsName: patientsName,
                date: date,
                primaryDoctor: primaryDoctor,
                whyLossWeight: whyLossWeight,
                weightGoals: weightGoals,
                timeFrame: timeFrame,
                mostWeighedAsAdult: mostWeighedAsAdult,
                ageAtAdultMostWeight: ageAtAdultMostWeight,
                leastWeighedAsAdult: leastWeighedAsAdult,
                ageAtAdultLeastWeight: ageAtAdultLeastWeight,
                weightChangeDuringLife: weightChangeDuringLife,
                weightGainedInPast: weightGainedInPast,
                challengesOfWeightManagement: challengesOfWeightManagement,
                hopesForWeightLossManagement: hopesForWeightLossManagement,
                commitmentsToWeightLoss: commitmentsToWeightLoss,
                currentDietAids: currentDietAids,
                onYourOwn: onYourOwn,
                checkIfTried: checkIfTried,
                onYourOwnStartDate: onYourOwnStartDate,
                onYourOwnEndDate: onYourOwnEndDate,
                onYourOwnWeightLoss: onYourOwnWeightLoss,
                onYourOwnReasonForStopping: onYourOwnReasonForStopping,
                onYourOwnReasonForRegain: onYourOwnReasonForRegain,
                atkinsOrLowCarbohydrate: atkinsOrLowCarbohydrate,
                atkinsOrLowCarbohydrateStartDate:
                  atkinsOrLowCarbohydrateStartDate,
                atkinsOrLowCarbohydrateEndDate: atkinsOrLowCarbohydrateEndDate,
                atkinsOrLowCarbohydrateWeightLoss:
                  atkinsOrLowCarbohydrateWeightLoss,
                atkinsOrLowCarbohydrateReasonForStopping:
                  atkinsOrLowCarbohydrateReasonForStopping,
                atkinsOrLowCarbohydrateReasonForRegain:
                  atkinsOrLowCarbohydrateReasonForRegain,
                jennyCraig: jennyCraig,
                jennyCraigStartDate: jennyCraigStartDate,
                jennyCraigEndDate: jennyCraigEndDate,
                jennyCraigWeightLoss: jennyCraigWeightLoss,
                jennyCraigReasonForStopping: jennyCraigReasonForStopping,
                jennyCraigReasonForRegain: jennyCraigReasonForRegain,
                nutrisystem: nutrisystem,
                nutrisystemStartDate: nutrisystemStartDate,
                nutrisystemEndDate: nutrisystemEndDate,
                nutrisystemWeightLoss: nutrisystemWeightLoss,
                nutrisystemReasonForStopping: nutrisystemReasonForStopping,
                nutrisystemReasonForRegain: nutrisystemReasonForRegain,
                weightWatchers: weightWatchers,
                weightWatchersStartDate: weightWatchersStartDate,
                weightWatchersEndDate: weightWatchersEndDate,
                weightWatchersWeightLoss: weightWatchersWeightLoss,
                weightWatchersReasonForStopping:
                  weightWatchersReasonForStopping,
                weightWatchersReasonForRegain: weightWatchersReasonForRegain,
                slimfast: slimfast,
                slimfastStartDate: slimfastStartDate,
                slimfastEndDate: slimfastEndDate,
                slimfastWeightLoss: slimfastWeightLoss,
                slimfastReasonForStopping: slimfastReasonForStopping,
                slimfastReasonForRegain: slimfastReasonForRegain,
                optifast: optifast,
                optifastStartDate: optifastStartDate,
                optifastEndDate: optifastEndDate,
                optifastWeightLoss: optifastWeightLoss,
                optifastReasonForStopping: optifastReasonForStopping,
                optifastReasonForRegain: optifastReasonForRegain,
                otherLiquidDiet: otherLiquidDiet,
                otherLiquidDietStartDate: otherLiquidDietStartDate,
                otherLiquidDietEndDate: otherLiquidDietEndDate,
                otherLiquidDietWeightLoss: otherLiquidDietWeightLoss,
                otherLiquidDietReasonForStopping:
                  otherLiquidDietReasonForStopping,
                otherLiquidDietReasonForRegain: otherLiquidDietReasonForRegain,
                other: other,
                otherName: otherName,
                otherStartDate: otherStartDate,
                otherEndDate: otherEndDate,
                otherWeightLoss: otherWeightLoss,
                otherReasonForStopping: otherReasonForStopping,
                otherReasonForRegain: otherReasonForRegain,
                adipex: adipex,
                adipexStartDate: adipexStartDate,
                adipexEndDate: adipexEndDate,
                adipexWeightLoss: adipexWeightLoss,
                adipexReasonForStopping: adipexReasonForStopping,
                adipexReasonForRegain: adipexReasonForRegain,
                alli: alli,
                alliStartDate: alliStartDate,
                alliEndDate: alliEndDate,
                alliWeightLoss: alliWeightLoss,
                alliReasonForStopping: alliReasonForStopping,
                alliReasonForRegain: alliReasonForRegain,
                belviq: belviq,
                belviqStartDate: belviqStartDate,
                belviqEndDate: belviqEndDate,
                belviqWeightLoss: belviqWeightLoss,
                belviqReasonForStopping: belviqReasonForStopping,
                belviqReasonForRegain: belviqReasonForRegain,
                dexatrim: dexatrim,
                dexatrimStartDate: dexatrimStartDate,
                dexatrimEndDate: dexatrimEndDate,
                dexatrimWeightLoss: dexatrimWeightLoss,
                dexatrimReasonForStopping: dexatrimReasonForStopping,
                dexatrimReasonForRegain: dexatrimReasonForRegain,
                herbalWeightLoss: herbalWeightLoss,
                herbalWeightLossStartDate: herbalWeightLossStartDate,
                herbalWeightLossEndDate: herbalWeightLossEndDate,
                herbalWeightLossWeightLoss: herbalWeightLossWeightLoss,
                herbalWeightLossReasonForStopping:
                  herbalWeightLossReasonForStopping,
                herbalWeightLossReasonForRegain:
                  herbalWeightLossReasonForRegain,
                meridia: meridia,
                meridiaStartDate: meridiaStartDate,
                meridiaEndDate: meridiaEndDate,
                meridiaWeightLoss: meridiaWeightLoss,
                meridiaReasonForStopping: meridiaReasonForStopping,
                meridiaReasonForRegain: meridiaReasonForRegain,
                phenfen: phenfen,
                phenfenStartDate: phenfenStartDate,
                phenfenEndDate: phenfenEndDate,
                phenfenWeightLoss: phenfenWeightLoss,
                phenfenReasonForStopping: phenfenReasonForStopping,
                phenfenReasonForRegain: phenfenReasonForRegain,
                qsymia: qsymia,
                qsymiaStartDate: qsymiaStartDate,
                qsymiaEndDate: qsymiaEndDate,
                qsymiaWeightLoss: qsymiaWeightLoss,
                qsymiaReasonForStopping: qsymiaReasonForStopping,
                qsymiaReasonForRegain: qsymiaReasonForRegain,
                redux: redux,
                reduxStartDate: reduxStartDate,
                reduxEndDate: reduxEndDate,
                reduxWeightLoss: reduxWeightLoss,
                reduxReasonForStopping: reduxReasonForStopping,
                reduxReasonForRegain: reduxReasonForRegain,
                otherSupplements: otherSupplements,
                otherSupplementsName: otherSupplementsName,
                otherSupplementsStartDate: otherSupplementsStartDate,
                otherSupplementsEndDate: otherSupplementsEndDate,
                otherSupplementsWeightLoss: otherSupplementsWeightLoss,
                otherSupplementsReasonForStopping:
                  otherSupplementsReasonForStopping,
                otherSupplementsReasonForRegain:
                  otherSupplementsReasonForRegain,
                childrenUnderEighteen: childrenUnderEighteen,
                childrenUnderEighteenCheckBox: childrenUnderEighteenCheckBox,
                familyMemebersObese: familyMemebersObese,
                support: support,
                supportExplaination: supportExplaination,
                eatingDisorder: eatingDisorder,
                anorexiaNervosa: anorexiaNervosa,
                bingeEating: bingeEating,
                bulimia: bulimia,
                eatingTooMuch: eatingTooMuch,
                sleepHours: sleepHours,
                restedWhenWakeUp: restedWhenWakeUp,
                doYouSnore: doYouSnore,
                wearEquipment: wearEquipment,
                howManyNights: howManyNights,
                sleepWellness: sleepWellness,
                sittingAndReading: sittingAndReading,
                watchingTv: watchingTv,
                sittingInPublic: sittingInPublic,
                carPassanger: carPassanger,
                lyingDown: lyingDown,
                talkingToSomeone: talkingToSomeone,
                sittingQuietlyAfterLunch: sittingQuietlyAfterLunch,
                inCarWhileStopped: inCarWhileStopped,
                total: total,
                typicalDay: typicalDay,
                enjoyExercise: enjoyExercise,
                gymMembership: gymMembership,
                exerciseEquipment: exerciseEquipment,
                exerciseRegularly: exerciseRegularly,
                badExerciseExperience: badExerciseExperience,
                encourageExercise: encourageExercise,
                sixAm: sixAm,
                nineAm: nineAm,
                twelvePm: twelvePm,
                threePm: threePm,
                sixPm: sixPm,
                ninePm: ninePm,
                exerciseWeekly: exerciseWeekly,
                describeExercise: describeExercise,
                difficultyGettingUpFromFloor: difficultyGettingUpFromFloor,
                typeOfExercise: typeOfExercise,
                exercisePreference: exercisePreference,
                athleteInSchool: athleteInSchool,
                confidentIncrease: confidentIncrease,
                majorBenefitsOfExercise: majorBenefitsOfExercise,
                exerciseBarriers: exerciseBarriers,
                minutesPerDay: minutesPerDay,
                daysPerWeek: daysPerWeek,
                confidenceWeightLossDiet: confidenceWeightLossDiet,
                majorBarriersDiet: majorBarriersDiet,
                favoriteFoods: favoriteFoods,
                breakfastTypeOfFood: breakfastTypeOfFood,
                breakfastProteinOrCarbs: breakfastProteinOrCarbs,
                breakfastCalories: breakfastCalories,
                lunchTypeOfFood: lunchTypeOfFood,
                lunchProteinOrCarbs: lunchProteinOrCarbs,
                lunchCalories: lunchCalories,
                dinnerTypeOfFood: dinnerTypeOfFood,
                dinnerProteinOrCarbs: dinnerProteinOrCarbs,
                dinnerCalories: dinnerCalories,
                snackOneTypeOfFood: snackOneTypeOfFood,
                snackOneProteinOrCarbs: snackOneProteinOrCarbs,
                snackOneCalories: snackOneCalories,
                snackTwoTypeOfFood: snackTwoTypeOfFood,
                snackTwoProteinOrCarbs: snackTwoProteinOrCarbs,
                snackTwoCalories: snackTwoCalories,
                coffeeTypeOfFood: coffeeTypeOfFood,
                coffeeProteinOrCarbs: coffeeProteinOrCarbs,
                coffeeCalories: coffeeCalories,
                sodaTypeOfFood: sodaTypeOfFood,
                sodaProteinOrCarbs: sodaProteinOrCarbs,
                sodaCalories: sodaCalories,
                candyOrSweetsTypeOfFood: candyOrSweetsTypeOfFood,
                candyOrSweetsProteinOrCarbs: candyOrSweetsProteinOrCarbs,
                candyOrSweetsCalories: candyOrSweetsCalories,
                otherTypeOfFood: otherTypeOfFood,
                otherProteinOrCarbs: otherProteinOrCarbs,
                otherCalories: otherCalories,
                numPeopleLiveWith: numPeopleLiveWith,
                eatTogether: eatTogether,
                whoDoesShopping: whoDoesShopping,
                whoDoesCooking: whoDoesCooking,
                foodIntolerance: foodIntolerance,
                foodIntoleranceList: foodIntoleranceList,
                stressEating: stressEating,
                stressEatingDetails: stressEatingDetails,
                bingeEatingExperience: bingeEatingExperience,
                bingeEatingDetails: bingeEatingDetails,
                snackingExperience: snackingExperience,
                snackingDetails: snackingDetails,
                eatingMiddleOfNightExperience: eatingMiddleOfNightExperience,
                eatingMiddleOfNightDetails: eatingMiddleOfNightDetails,
                skippingMealsExperience: skippingMealsExperience,
                skippingMealsDetails: skippingMealsDetails,
                eatingOutExperience: eatingOutExperience,
                eatingOutDetails: eatingOutDetails,
                eatingInFrontOfTVExperience: eatingInFrontOfTVExperience,
                eatingInFrontOfTVDetails: eatingInFrontOfTVDetails,
                eatingAtDeskExperience: eatingAtDeskExperience,
                eatingAtDeskDetails: eatingAtDeskDetails,
                portionSizeExperience: portionSizeExperience,
                portionSizeDetails: portionSizeDetails,
                eatingTooFastExperience: eatingTooFastExperience,
                eatingTooFastDetails: eatingTooFastDetails,
                notSatifiedExperience: notSatifiedExperience,
                notSatifiedDetails: notSatifiedDetails,
                regularSoda: regularSoda,
                regularSodaCount: regularSodaCount,
                juice: juice,
                juiceCount: juiceCount,
                sweetTea: sweetTea,
                sweetTeaCount: sweetTeaCount,
                alchoholBeverages: alchoholBeverages,
                alchoholBeveragesCount: alchoholBeveragesCount,
                friedFoods: friedFoods,
                friedFoodsCount: friedFoodsCount,
                fruitServings: fruitServings,
                vegetableServings: vegetableServings,
                wholeGrainServings: wholeGrainServings,
                lowFatDairyServings: lowFatDairyServings,
                leanProteinServings: leanProteinServings,
                daysPerWeekExplination: daysPerWeekExplination,
                medicalHistory: medicalHistory,
                medicationsTaken: medicationsTaken,
                medicationsTakenList: medicationsTakenList,
              })
            })
          }}
        />
      </div>
      <div className="align-center flex justify-center text-lg">
        <CustomCheckBoxField
          id="childrenUnderEighteenCheckBox"
          title="Select"
          checkBoxValues={childrenUnderEighteenCheckBox}
          setCheckBoxValues={setChildrenUnderEighteenCheckBox}
          allowMultipleCheckBoxes={true}
          checkBoxTitles={['Child(ren)', 'Grandchild(ren)']}
        />
      </div>
      <div className="align-center flex justify-center text-lg">
        <CustomCheckBoxField
          id="familyMemebersObese"
          title="Please check if any family members are (or were) overweight or obese: (Mark all that apply)"
          checkBoxValues={familyMemebersObese}
          setCheckBoxValues={setFamilyMemebersObese}
          allowMultipleCheckBoxes={true}
          checkBoxTitles={[
            'Spouse',
            'Son',
            'Daughter',
            'Mother',
            'Father',
            'Sister',
            'Brother',
            'Grandparent',
          ]}
        />
      </div>
      <div className="align-center flex justify-center text-lg">
        <CustomCheckBoxField
          id="support"
          title="Will your family/friends support you in your weight loss?"
          checkBoxValues={support}
          setCheckBoxValues={setSupport}
          allowMultipleCheckBoxes={false}
          checkBoxTitles={['Yes', 'No', 'Maybe']}
        />
      </div>
      <div>
        <TextInput
          id="supportExplaination"
          placeHolder="Explain"
          widthPercentage="w-2/3"
          value={supportExplaination}
          onChange={(text: React.ChangeEvent<HTMLInputElement>) => {
            setSupportExplaination(text.target.value)
          }}
        />
      </div>
      <p className="mt-10 text-center text-lg font-bold">
        Please indicate if you have a history of any of the following:
      </p>
      <div className="flex flex-col justify-center text-lg md:flex-row">
        <div className="m-5">
          <CustomYesOrNo
            id="eatingDisorder"
            text="Eating Disorder"
            required={requiredEatingDisorder}
            CheckState={setEatingDisorder}
            isChecked={eatingDisorder}
          />
        </div>
        <div className="m-5">
          <CustomYesOrNo
            id="anorexiaNervosa"
            text="Anorexia Nervosa"
            required={requiredAnorexiaNervosa}
            CheckState={setAnorexiaNervosa}
            isChecked={anorexiaNervosa}
          />
        </div>
        <div className="m-5">
          <CustomYesOrNo
            id="bingeEating"
            text="Binge Eating"
            required={requiredBingeEating}
            CheckState={setBingeEating}
            isChecked={bingeEating}
          />
        </div>
        <div className="m-5">
          <CustomYesOrNo
            id="bulimia"
            text="Making yourself throw up/Bulimia"
            required={requiredBulimia}
            CheckState={setBulimia}
            isChecked={bulimia}
          />
        </div>
      </div>
      <div className="mt-5 flex justify-center text-lg">
        <CustomYesOrNo
          id="eatingTooMuch"
          text="Eating so much at one time that you have to throw up"
          required={requiredEatingTooMuch}
          CheckState={setEatingTooMuch}
          isChecked={eatingTooMuch}
        />
      </div>
      <div className="my-10 flex items-center justify-center justify-self-center">
        <LineDivider
          lineColor="bg-[#e9e7e7b1]"
          lineWidth="w-[80%]"
          lineHeight="h-[10px]"
        />
      </div>
      <p className="text-center text-lg font-bold">
        Please answer the following Sleep/Restfulness questions
      </p>
      <div>
        <TextInput
          id="sleepHours"
          placeHolder="On average over the past month, how many hours of sleep did you get per night?"
          widthPercentage="w-2/3"
          required={requiredSleepHours}
          value={sleepHours}
          onChange={(text: React.ChangeEvent<HTMLInputElement>) => {
            setSleepHours(text.target.value)
          }}
        />
      </div>
      <div className="flex justify-center text-lg">
        <div className="m-5 w-[25%]">
          <CustomYesOrNo
            id="restedWhenWakeUp"
            text="Do you feel rested when you wake up?"
            required={requiredRestedWhenWakeUp}
            CheckState={setRestedWhenWakeUp}
            isChecked={restedWhenWakeUp}
          />
        </div>
        <div className="m-5 w-[25%]">
          <CustomYesOrNo
            id="doYouSnore"
            text="Do you snore?"
            required={requiredDoYouSnore}
            CheckState={setDoYouSnore}
            isChecked={doYouSnore}
          />
        </div>
      </div>
      <div className="mt-10 flex justify-center">
        <div className="w-[25%]">
          <CustomYesOrNo
            id="wearEquipment"
            text="Have you ever been told to wear CPAP or BiPAP for sleep apnea?"
            required={requiredWearEquipment}
            CheckState={setWearEquipment}
            isChecked={wearEquipment}
          />
        </div>
      </div>
      <div className="flex justify-center">
        <TextInput
          id="howManyNights"
          placeHolder="How many nights per week?"
          widthPercentage="w-1/2"
          value={howManyNights}
          onChange={(text: React.ChangeEvent<HTMLInputElement>) => {
            setHowManyNights(text.target.value)
          }}
        />
      </div>
      <div className="flex justify-center">
        <CustomCheckBoxField
          id="sleepWellness"
          title="How well have you slept over the past month?"
          required={requiredSleepWellness}
          checkBoxValues={sleepWellness}
          setCheckBoxValues={setSleepWellness}
          allowMultipleCheckBoxes={false}
          checkBoxTitles={[
            'Very Good',
            'Fairly Good',
            'Fairly Bad',
            'Very Bad',
          ]}
        />
      </div>
      <p className="mx-20 mt-10 text-center text-lg font-bold">
        Select the checkbox choice for how likely are you to doze off or fall
        asleep in the situations described below, in contrast to feeling just
        tired? This refers to your usual way of life in recent times. Even if
        you haven’t done some of these things recently, try to work out how they
        would have affected you. Use the following scale for each situation: 0 =
        Would never doze, 1 = Slight chance of dozing, 2 = Moderate chance of
        dozing, 3 = High chance of dozing
      </p>
      <div className="flex justify-center text-lg">
        <div className="w-[25%]">
          <CustomCheckBoxField
            id="sittingAndReading"
            title="Sitting and reading"
            checkBoxValues={sittingAndReading}
            setCheckBoxValues={setSittingAndReading}
            allowMultipleCheckBoxes={false}
            checkBoxTitles={['0', '1', '2', '3']}
          />
        </div>
        <div className="w-[25%]">
          <CustomCheckBoxField
            id="watchingTv"
            title="Watching TV"
            checkBoxValues={watchingTv}
            setCheckBoxValues={setWatchingTv}
            allowMultipleCheckBoxes={false}
            checkBoxTitles={['0', '1', '2', '3']}
          />
        </div>
      </div>
      <div className="flex justify-center text-lg">
        <div className="w-[25%]">
          <CustomCheckBoxField
            id="sittingInPublic"
            title="Sitting in a public place (theater or meeting)"
            checkBoxValues={sittingInPublic}
            setCheckBoxValues={setSittingInPublic}
            allowMultipleCheckBoxes={false}
            checkBoxTitles={['0', '1', '2', '3']}
          />
        </div>
        <div className="w-[25%]">
          <CustomCheckBoxField
            id="carPassanger"
            title="Passenger in a car for one hour or more"
            checkBoxValues={carPassanger}
            setCheckBoxValues={setCarPassanger}
            allowMultipleCheckBoxes={false}
            checkBoxTitles={['0', '1', '2', '3']}
          />
        </div>
      </div>
      <div className="flex justify-center text-lg">
        <div className="w-[25%]">
          <CustomCheckBoxField
            id="lyingDown"
            title="Lying down to rest in the afternoon"
            checkBoxValues={lyingDown}
            setCheckBoxValues={setLyingDown}
            allowMultipleCheckBoxes={false}
            checkBoxTitles={['0', '1', '2', '3']}
          />
        </div>
        <div className="w-[25%]">
          <CustomCheckBoxField
            id="talkingToSomeone"
            title="Sitting and talking to someone"
            checkBoxValues={talkingToSomeone}
            setCheckBoxValues={setTalkingToSomeone}
            allowMultipleCheckBoxes={false}
            checkBoxTitles={['0', '1', '2', '3']}
          />
        </div>
      </div>
      <div className="flex justify-center text-lg">
        <div className="w-[25%]">
          <CustomCheckBoxField
            id="sittingQuietlyAfterLunch"
            title="Sitting quietly after lunch without alcohol"
            checkBoxValues={sittingQuietlyAfterLunch}
            setCheckBoxValues={setSittingQuietlyAfterLunch}
            allowMultipleCheckBoxes={false}
            checkBoxTitles={['0', '1', '2', '3']}
          />
        </div>
        <div className="w-[25%]">
          <CustomCheckBoxField
            id="inCarWhileStopped"
            title="In a car, while stopped for a few minutes in traffic"
            checkBoxValues={inCarWhileStopped}
            setCheckBoxValues={setInCarWhileStopped}
            allowMultipleCheckBoxes={false}
            checkBoxTitles={['0', '1', '2', '3']}
          />
        </div>
      </div>
      <div className="flex justify-center text-lg">
        <TextInput
          id="Total"
          placeHolder="Total"
          widthPercentage="w-1/2"
          value={total}
          onChange={(text: React.ChangeEvent<HTMLInputElement>) => {
            setTotal(text.target.value)
          }}
        />
      </div>
      <div className="my-10 flex items-center justify-center justify-self-center">
        <LineDivider
          lineColor="bg-[#e9e7e7b1]"
          lineWidth="w-[80%]"
          lineHeight="h-[10px]"
        />
      </div>
      <div className="flex justify-center">
        <CustomCheckBoxField
          id="typicalDay"
          title="On a typical day, which describes you?"
          required={requiredTypicalDay}
          checkBoxValues={typicalDay}
          setCheckBoxValues={setTypicalDay}
          allowMultipleCheckBoxes={false}
          checkBoxTitles={[
            'Mostly sitting',
            'Mostly walking',
            'Mostly heavy labor',
            'Unsure',
          ]}
        />
      </div>
      <SectionWithTitle
        title="Exercise"
        subTitle=" Please check Yes or No for the following"
        BgColor="bg-[#e8e8e8]"
        children={[
          <CustomYesOrNo
            id="enjoyExercise"
            text="Do you enjoy exercise?"
            CheckState={setEnjoyExercise}
            isChecked={enjoyExercise}
          />,
          <CustomYesOrNo
            id="gymMembership"
            text="Do you have a gym membership?"
            CheckState={setGymMembership}
            isChecked={gymMembership}
          />,
          <CustomYesOrNo
            id="exerciseEquipment"
            text="Do you have exercise equipment at home?"
            CheckState={setExerciseEquipment}
            isChecked={exerciseEquipment}
          />,
          <CustomYesOrNo
            id="exerciseRegularly"
            text="Do you exercise regularly?"
            CheckState={setExerciseRegularly}
            isChecked={exerciseRegularly}
          />,
          <CustomYesOrNo
            id="badExerciseExperience"
            text="Do you have any negative feelings about exercise or had any bad experiences with exercise?"
            CheckState={setBadExerciseExperience}
            isChecked={badExerciseExperience}
          />,
          <CustomYesOrNo
            id="encourageExercise"
            text="Do you have any family members or friends who are willing to encourage you to exercise or possibly exercise with you?"
            CheckState={setEncourageExercise}
            isChecked={encourageExercise}
          />,
          <p className="mt-5 text-center text-lg font-bold">
            Current Activity Routine: (Include exercise and job-related
            activity)
          </p>,
          <TextInput
            id="sixAm"
            placeHolder="6:00 AM - 9:00 AM"
            widthPercentage="w-2/3"
            value={sixAm}
            onChange={(text: React.ChangeEvent<HTMLInputElement>) => {
              setSixAm(text.target.value)
            }}
          />,
          <TextInput
            id="nineAm"
            placeHolder="9:00 AM - 12:00 PM"
            widthPercentage="w-2/3"
            value={nineAm}
            onChange={(text: React.ChangeEvent<HTMLInputElement>) => {
              setNineAm(text.target.value)
            }}
          />,
          <TextInput
            id="twelvePm"
            placeHolder="12:00 PM - 3:00 PM"
            widthPercentage="w-2/3"
            value={twelvePm}
            onChange={(text: React.ChangeEvent<HTMLInputElement>) => {
              setTwelvePm(text.target.value)
            }}
          />,
          <TextInput
            id="threePm"
            placeHolder="3:00 PM - 6:00 PM"
            widthPercentage="w-2/3"
            value={threePm}
            onChange={(text: React.ChangeEvent<HTMLInputElement>) => {
              setThreePm(text.target.value)
            }}
          />,
          <TextInput
            id="sixPm"
            placeHolder="6:00 PM - 9:00 PM"
            widthPercentage="w-2/3"
            value={sixPm}
            onChange={(text: React.ChangeEvent<HTMLInputElement>) => {
              setSixPm(text.target.value)
            }}
          />,
          <TextInput
            id="ninePm"
            placeHolder="9:00 PM - 12:00 AM"
            widthPercentage="w-2/3"
            value={ninePm}
            onChange={(text: React.ChangeEvent<HTMLInputElement>) => {
              setNinePm(text.target.value)
            }}
          />,
          <CustomYesOrNo
            id="exerciseWeekly"
            text="Do you exercise regularly (at least 150 minutes per week; such as 5 days a week for at least 30 minutes per session)?"
            CheckState={setExerciseWeekly}
            isChecked={exerciseWeekly}
          />,
          <TextInput
            id="describeExercise"
            placeHolder="Describe"
            widthPercentage="w-2/3"
            value={describeExercise}
            onChange={(text: React.ChangeEvent<HTMLInputElement>) => {
              setDescribeExercise(text.target.value)
            }}
          />,
          <CustomCheckBoxField
            id="difficultyGettingUpFromFloor"
            title="Difficulty level getting back up from the floor"
            checkBoxValues={difficultyGettingUpFromFloor}
            setCheckBoxValues={setDifficultyGettingUpFromFloor}
            allowMultipleCheckBoxes={false}
            checkBoxTitles={[
              'No difficulty',
              'Some difficulty',
              'Moderate difficulty',
              'Heavy difficulty',
              'Cannot get up unassisted',
            ]}
          />,
          <CustomCheckBoxField
            id="typeOfExercise"
            title="What type of exercise are you currently involved in? (Mark all that apply)"
            checkBoxValues={typeOfExercise}
            setCheckBoxValues={setTypeOfExercise}
            allowMultipleCheckBoxes={true}
            checkBoxTitles={[
              'Aerobics classes',
              'Outdoor Biking',
              'Stationary Biking',
              'Crossfit/Boot Camp',
              'Elliptical Machine',
              'Exercise videos',
              'Hiking',
              'Pilates',
              'Running',
              'Stretching',
              'Swimming',
              'Walking',
              'Water/Pool Exercise',
              'Weight Training',
              'Yoga',
              'Zumba',
              'None',
            ]}
          />,
          <CustomCheckBoxField
            id="typeOfExercise"
            title="What type of exercise do you prefer or would enjoy the most? (Mark all that apply)"
            checkBoxValues={exercisePreference}
            setCheckBoxValues={setExercisePreference}
            allowMultipleCheckBoxes={true}
            checkBoxTitles={[
              'Aerobics classes',
              'Outdoor Biking',
              'Stationary Biking',
              'Crossfit/Boot Camp',
              'Elliptical Machine',
              'Exercise videos',
              'Hiking',
              'Pilates',
              'Running',
              'Stretching',
              'Swimming',
              'Walking',
              'Water/Pool Exercise',
              'Weight Training',
              'Yoga',
              'Zumba',
              'None',
            ]}
          />,
          <CustomCheckBoxField
            id="athleteInSchool"
            title="Were you an athlete in school?"
            checkBoxValues={athleteInSchool}
            setCheckBoxValues={setAthleteInSchool}
            allowMultipleCheckBoxes={true}
            checkBoxTitles={['Yes, in High School', 'Yes, in College', 'No']}
          />,
          <CustomCheckBoxField
            id="confidentIncrease"
            title="How confident are you that you could increase the amount of exercise you do? (Check One)"
            checkBoxValues={confidentIncrease}
            setCheckBoxValues={setConfidentIncrease}
            allowMultipleCheckBoxes={false}
            checkBoxTitles={[
              'Very confident',
              'Moderately confident',
              'Only a little confident',
              'Not at all confident',
            ]}
          />,
          <CustomCheckBoxField
            id="majorBenefitsOfExercise"
            title="What are the major benefits of exercise for you? (Mark all that apply)"
            checkBoxValues={majorBenefitsOfExercise}
            setCheckBoxValues={setMajorBenefitsOfExercise}
            allowMultipleCheckBoxes={true}
            checkBoxTitles={[
              'Increased energy',
              'Improved health',
              'Improved arthritis',
              'Improved mobility',
            ]}
          />,
          <CustomCheckBoxField
            id="exerciseBarriers"
            title="What are your major barriers to increasing the amount of exercise you do? (Mark all that apply)"
            required={requiredExerciseBarriers}
            checkBoxValues={exerciseBarriers}
            setCheckBoxValues={setExerciseBarriers}
            allowMultipleCheckBoxes={true}
            checkBoxTitles={[
              'Lack of motivation',
              'Lack of time',
              'Lack of equipment',
              'Lack of access to exercise facilities',
              'Injuries',
              'Health problems',
            ]}
          />,
          <p className="text-2xl text-gray-700">
            How much time are you willing to commit to exercise?
          </p>,
          <TextInput
            id="minutesPerDay"
            placeHolder="minutes/day"
            widthPercentage="w-2/3"
            value={minutesPerDay}
            onChange={(text: React.ChangeEvent<HTMLInputElement>) => {
              setMinutesPerDay(text.target.value)
            }}
          />,

          <TextInput
            id="daysPerWeek"
            placeHolder="days/week"
            widthPercentage="w-2/3"
            value={daysPerWeek}
            onChange={(text: React.ChangeEvent<HTMLInputElement>) => {
              setDaysPerWeek(text.target.value)
            }}
          />,
        ]}
      />
      <div className="my-10 flex items-center justify-center justify-self-center">
        <LineDivider
          lineColor="bg-[#e9e7e7b1]"
          lineWidth="w-[80%]"
          lineHeight="h-[10px]"
        />
      </div>
      <SectionWithTitle
        title="Additional information related to diet"
        BgColor="bg-[#e8e8e8]"
        children={[
          <CustomCheckBoxField
            id="confidenceWeightlossDiet"
            title="How confident are you that you can follow a weight loss diet? (Check One)"
            required={requiredConfidenceWeightLossDiet}
            checkBoxValues={confidenceWeightLossDiet}
            setCheckBoxValues={setConfidenceWeightLossDiet}
            allowMultipleCheckBoxes={false}
            checkBoxTitles={[
              'Very confident',
              'Moderately confident',
              'Only a little confident',
              'Not at all confident',
            ]}
          />,
          <CustomCheckBoxField
            id="majorBarriersDiet"
            title="What are your major barriers to following a weight loss diet? (Mark all that apply)"
            required={requiredMajorBarriersDiet}
            checkBoxValues={majorBarriersDiet}
            setCheckBoxValues={setMajorBarriersDiet}
            allowMultipleCheckBoxes={true}
            checkBoxTitles={[
              'Access to healthy foods',
              'Access to cooking appliances (Stove, Microwave, Grill)',
              'Religion',
              'Access to refrigerator and/or freezer',
              'Cost',
              'Family/household diet',
              'Hunger',
              'Healthy food doesn’t taste good',
              'Lack of family/peer support',
              'Food intolerances/dislikes',
              'Lack of knowledge of food to eat/buy',
              'Time to plan/prepare healthy diet',
              'Work atmosphere',
            ]}
          />,
          <TextInput
            id="favoriteFoods"
            placeHolder="Favorite foods"
            widthPercentage="w-2/3"
            value={favoriteFoods}
            onChange={(text: React.ChangeEvent<HTMLInputElement>) => {
              setFavoriteFoods(text.target.value)
            }}
          />,
        ]}
      />
      <p className="mt-10 text-center text-2xl font-bold">
        Current Eating Habits
      </p>
      <div className="m-5 flex flex-col md:flex-row">
        <div className=" flex items-center justify-center">
          <p className="mt-5 text-center text-xl font-bold">Breakfast</p>
        </div>
        <TextInput
          id="breakfastTypeOfFood"
          placeHolder="Types of Food"
          widthPercentage="w-3/4"
          value={breakfastTypeOfFood}
          onChange={(text: React.ChangeEvent<HTMLInputElement>) => {
            setBreakfastTypeOfFood(text.target.value)
          }}
        />
        <TextInput
          id="breakfastProteinOrCarbs"
          placeHolder="Protein or Carbs"
          widthPercentage="w-3/4"
          value={breakfastProteinOrCarbs}
          onChange={(text: React.ChangeEvent<HTMLInputElement>) => {
            setBreakfastProteinOrCarbs(text.target.value)
          }}
        />
        <TextInput
          id="breakfastCalories"
          placeHolder="Calories"
          widthPercentage="w-3/4"
          value={breakfastCalories}
          onChange={(text: React.ChangeEvent<HTMLInputElement>) => {
            setBreakfastCalories(text.target.value)
          }}
        />
      </div>
      <div className="m-5 flex flex-col md:flex-row">
        <div className=" flex items-center justify-center">
          <p className="mt-5 text-center text-xl font-bold">Lunch</p>
        </div>
        <TextInput
          id="lunchTypeOfFood"
          placeHolder="Types of Food"
          widthPercentage="w-3/4"
          value={lunchTypeOfFood}
          onChange={(text: React.ChangeEvent<HTMLInputElement>) => {
            setLunchTypeOfFood(text.target.value)
          }}
        />
        <TextInput
          id="lunchProteinOrCarbs"
          placeHolder="Protein or Carbs"
          widthPercentage="w-3/4"
          value={lunchProteinOrCarbs}
          onChange={(text: React.ChangeEvent<HTMLInputElement>) => {
            setLunchProteinOrCarbs(text.target.value)
          }}
        />
        <TextInput
          id="lunchCalories"
          placeHolder="Calories"
          widthPercentage="w-3/4"
          value={lunchCalories}
          onChange={(text: React.ChangeEvent<HTMLInputElement>) => {
            setLunchCalories(text.target.value)
          }}
        />
      </div>
      <div className="m-5 flex flex-col md:flex-row">
        <div className=" flex items-center justify-center">
          <p className="mt-5 text-center text-xl font-bold">Dinner</p>
        </div>
        <TextInput
          id="dinnerTypeOfFood"
          placeHolder="Types of Food"
          widthPercentage="w-3/4"
          value={dinnerTypeOfFood}
          onChange={(text: React.ChangeEvent<HTMLInputElement>) => {
            setDinnerTypeOfFood(text.target.value)
          }}
        />
        <TextInput
          id="dinnerProteinOrCarbs"
          placeHolder="Protein or Carbs"
          widthPercentage="w-3/4"
          value={dinnerProteinOrCarbs}
          onChange={(text: React.ChangeEvent<HTMLInputElement>) => {
            setDinnerProteinOrCarbs(text.target.value)
          }}
        />
        <TextInput
          id="dinnerCalories"
          placeHolder="Calories"
          widthPercentage="w-3/4"
          value={dinnerCalories}
          onChange={(text: React.ChangeEvent<HTMLInputElement>) => {
            setDinnerCalories(text.target.value)
          }}
        />
      </div>
      <div className="m-5 flex flex-col md:flex-row">
        <div className=" flex items-center justify-center">
          <p className="mt-5 text-center text-xl font-bold">Snack 1</p>
        </div>
        <TextInput
          id="snackOneTypeOfFood"
          placeHolder="Types of Food"
          widthPercentage="w-3/4"
          value={snackOneTypeOfFood}
          onChange={(text: React.ChangeEvent<HTMLInputElement>) => {
            setSnackOneTypeOfFood(text.target.value)
          }}
        />
        <TextInput
          id="snackOneProteinOrCarbs"
          placeHolder="Protein or Carbs"
          widthPercentage="w-3/4"
          value={snackOneProteinOrCarbs}
          onChange={(text: React.ChangeEvent<HTMLInputElement>) => {
            setSnackOneProteinOrCarbs(text.target.value)
          }}
        />
        <TextInput
          id="snackOneCalories"
          placeHolder="Calories"
          widthPercentage="w-3/4"
          value={snackOneCalories}
          onChange={(text: React.ChangeEvent<HTMLInputElement>) => {
            setSnackOneCalories(text.target.value)
          }}
        />
      </div>
      <div className="m-5 flex flex-col md:flex-row">
        <div className=" flex items-center justify-center">
          <p className="mt-5 text-center text-xl font-bold">Snack 2</p>
        </div>
        <TextInput
          id="snackTwoTypeOfFood"
          placeHolder="Types of Food"
          widthPercentage="w-3/4"
          value={snackTwoTypeOfFood}
          onChange={(text: React.ChangeEvent<HTMLInputElement>) => {
            setSnackTwoTypeOfFood(text.target.value)
          }}
        />
        <TextInput
          id="snackTwoProteinOrCarbs"
          placeHolder="Protein or Carbs"
          widthPercentage="w-3/4"
          value={snackTwoProteinOrCarbs}
          onChange={(text: React.ChangeEvent<HTMLInputElement>) => {
            setSnackTwoProteinOrCarbs(text.target.value)
          }}
        />
        <TextInput
          id="snackTwoCalories"
          placeHolder="Calories"
          widthPercentage="w-3/4"
          value={snackTwoCalories}
          onChange={(text: React.ChangeEvent<HTMLInputElement>) => {
            setSnackTwoCalories(text.target.value)
          }}
        />
      </div>
      <div className="m-5 flex flex-col md:flex-row">
        <div className=" flex items-center justify-center">
          <p className="mt-5 text-center text-xl font-bold">Coffee</p>
        </div>
        <TextInput
          id="coffeeTypeOfFood"
          placeHolder="Types of Food"
          widthPercentage="w-3/4"
          value={coffeeTypeOfFood}
          onChange={(text: React.ChangeEvent<HTMLInputElement>) => {
            setCoffeeTypeOfFood(text.target.value)
          }}
        />
        <TextInput
          id="coffeeProteinOrCarbs"
          placeHolder="Protein or Carbs"
          widthPercentage="w-3/4"
          value={coffeeProteinOrCarbs}
          onChange={(text: React.ChangeEvent<HTMLInputElement>) => {
            setCoffeeProteinOrCarbs(text.target.value)
          }}
        />
        <TextInput
          id="coffeeCalories"
          placeHolder="Calories"
          widthPercentage="w-3/4"
          value={coffeeCalories}
          onChange={(text: React.ChangeEvent<HTMLInputElement>) => {
            setCoffeeCalories(text.target.value)
          }}
        />
      </div>
      <div className="m-5 flex flex-col md:flex-row">
        <div className=" flex items-center justify-center">
          <p className="mt-5 text-center text-xl font-bold">Soda</p>
        </div>
        <TextInput
          id="sodaTypeOfFood"
          placeHolder="Types of Food"
          widthPercentage="w-3/4"
          value={sodaTypeOfFood}
          onChange={(text: React.ChangeEvent<HTMLInputElement>) => {
            setSodaTypeOfFood(text.target.value)
          }}
        />
        <TextInput
          id="sodaProteinOrCarbs"
          placeHolder="Protein or Carbs"
          widthPercentage="w-3/4"
          value={sodaProteinOrCarbs}
          onChange={(text: React.ChangeEvent<HTMLInputElement>) => {
            setSodaProteinOrCarbs(text.target.value)
          }}
        />
        <TextInput
          id="sodaCalories"
          placeHolder="Calories"
          widthPercentage="w-3/4"
          value={sodaCalories}
          onChange={(text: React.ChangeEvent<HTMLInputElement>) => {
            setSodaCalories(text.target.value)
          }}
        />
      </div>
      <div className="m-5 flex flex-col md:flex-row">
        <div className=" flex items-center justify-center">
          <p className="mt-5 text-center text-xl font-bold">Candy/Sweets</p>
        </div>
        <TextInput
          id="candyOrSweetsTypeOfFood"
          placeHolder="Types of Food"
          widthPercentage="w-3/4"
          value={candyOrSweetsTypeOfFood}
          onChange={(text: React.ChangeEvent<HTMLInputElement>) => {
            setCandyOrSweetsTypeOfFood(text.target.value)
          }}
        />
        <TextInput
          id="candyOrSweetsProteinOrCarbs"
          placeHolder="Protein or Carbs"
          widthPercentage="w-3/4"
          value={candyOrSweetsProteinOrCarbs}
          onChange={(text: React.ChangeEvent<HTMLInputElement>) => {
            setCandyOrSweetsProteinOrCarbs(text.target.value)
          }}
        />
        <TextInput
          id="candyOrSweetsCalories"
          placeHolder="Calories"
          widthPercentage="w-3/4"
          value={candyOrSweetsCalories}
          onChange={(text: React.ChangeEvent<HTMLInputElement>) => {
            setCandyOrSweetsCalories(text.target.value)
          }}
        />
      </div>
      <div className="m-5 flex flex-col md:flex-row">
        <div className=" flex items-center justify-center">
          <p className="mt-5 text-center text-xl font-bold">Other</p>
        </div>
        <TextInput
          id="otherTypeOfFood"
          placeHolder="Types of Food"
          widthPercentage="w-3/4"
          value={otherTypeOfFood}
          onChange={(text: React.ChangeEvent<HTMLInputElement>) => {
            setOtherTypeOfFood(text.target.value)
          }}
        />
        <TextInput
          id="otherProteinOrCarbs"
          placeHolder="Protein or Carbs"
          widthPercentage="w-3/4"
          value={otherProteinOrCarbs}
          onChange={(text: React.ChangeEvent<HTMLInputElement>) => {
            setOtherProteinOrCarbs(text.target.value)
          }}
        />
        <TextInput
          id="otherCalories"
          placeHolder="Calories"
          widthPercentage="w-3/4"
          value={otherCalories}
          onChange={(text: React.ChangeEvent<HTMLInputElement>) => {
            setOtherCalories(text.target.value)
          }}
        />
      </div>
      <div className="my-10 flex items-center justify-center justify-self-center">
        <LineDivider
          lineColor="bg-[#e9e7e7b1]"
          lineWidth="w-[80%]"
          lineHeight="h-[10px]"
        />
      </div>
      <div className="mt-10">
        <TextInput
          id="numPeopleLiveWith"
          placeHolder="Number of People You Live With"
          widthPercentage="w-1/2"
          value={numPeopleLiveWith}
          onChange={(text: React.ChangeEvent<HTMLInputElement>) => {
            setNumPeopleLiveWith(text.target.value)
          }}
        />
      </div>
      <div className="flex items-center justify-center">
        <CustomYesOrNo
          id="eatTogether"
          text="Are meals eaten together? "
          CheckState={setEatTogether}
          isChecked={eatTogether}
        />
      </div>
      <div className="flex items-center justify-center">
        <CustomCheckBoxField
          id="whoDoesShopping"
          title="Who does the grocery shopping?"
          checkBoxValues={whoDoesShopping}
          setCheckBoxValues={setWhoDoesShopping}
          allowMultipleCheckBoxes={true}
          checkBoxTitles={['Self', 'Spouse', 'Parent']}
        />
      </div>
      <div className="flex items-center justify-center">
        <CustomCheckBoxField
          id="whoDoesCooking"
          title="Who cooks/prepares the meals?"
          checkBoxValues={whoDoesCooking}
          setCheckBoxValues={setWhoDoesCooking}
          allowMultipleCheckBoxes={true}
          checkBoxTitles={['Self', 'Spouse', 'Parent']}
        />
      </div>
      <div className="flex items-center justify-center">
        <CustomYesOrNo
          id="foodIntolerance"
          text="Do you have any food intolerances or food allergies or are there particular foods you dislike?"
          CheckState={setFoodIntolerance}
          isChecked={foodIntolerance}
        />
      </div>
      <div className="flex items-center justify-center">
        <TextInput
          id="foodIntoleranceList"
          placeHolder="Please List"
          widthPercentage="w-1/2"
          value={foodIntoleranceList}
          onChange={(text: React.ChangeEvent<HTMLInputElement>) => {
            setFoodIntoleranceList(text.target.value)
          }}
        />
      </div>
      <SectionWithTitle
        title="Have you done or experienced any of the following in the past 6 months?"
        BgColor="bg-[#e8e8e8]"
        children={[
          <CustomYesOrNo
            id="stressEating"
            text="Eating when stressed, emotional or bored"
            CheckState={setStressEating}
            isChecked={stressEating}
          />,
          stressEating === 'Yes' && (
            <TextInput
              id="stressEatingDetails"
              placeHolder="Details/Comments"
              widthPercentage="w-1/2"
              value={stressEatingDetails}
              onChange={(text: React.ChangeEvent<HTMLInputElement>) => {
                setStressEatingDetails(text.target.value)
              }}
            />
          ),
          <CustomYesOrNo
            id="bingeEatingExperience"
            text="Binge Eating"
            CheckState={setBingeEatingExperience}
            isChecked={bingeEatingExperience}
          />,
          bingeEatingExperience === 'Yes' && (
            <TextInput
              id="bingeEatingDetails"
              placeHolder="Details/Comments"
              widthPercentage="w-1/2"
              value={bingeEatingDetails}
              onChange={(text: React.ChangeEvent<HTMLInputElement>) => {
                setBingeEatingDetails(text.target.value)
              }}
            />
          ),
          <CustomYesOrNo
            id="snackingExperience"
            text="Grazing or Frequent Snacking"
            CheckState={setSnackingExperience}
            isChecked={snackingExperience}
          />,
          snackingExperience === 'Yes' && (
            <TextInput
              id="snackingDetails"
              placeHolder="Details/Comments"
              widthPercentage="w-1/2"
              value={snackingDetails}
              onChange={(text: React.ChangeEvent<HTMLInputElement>) => {
                setSnackingDetails(text.target.value)
              }}
            />
          ),
          <CustomYesOrNo
            id="eatingMiddleOfNightExperience"
            text="Eating in the middle of the night"
            CheckState={setEatingMiddleOfNightExperience}
            isChecked={eatingMiddleOfNightExperience}
          />,
          eatingMiddleOfNightExperience === 'Yes' && (
            <TextInput
              id="eatingMiddleOfNightDetails"
              placeHolder="Details/Comments"
              widthPercentage="w-1/2"
              value={eatingMiddleOfNightDetails}
              onChange={(text: React.ChangeEvent<HTMLInputElement>) => {
                setEatingMiddleOfNightDetails(text.target.value)
              }}
            />
          ),
          <CustomYesOrNo
            id="skippingMealsExperience"
            text="Skipping meals"
            CheckState={setSkippingMealsExperience}
            isChecked={skippingMealsExperience}
          />,
          skippingMealsExperience === 'Yes' && (
            <TextInput
              id="skippingMealsDetails"
              placeHolder="Details/Comments"
              widthPercentage="w-1/2"
              value={skippingMealsDetails}
              onChange={(text: React.ChangeEvent<HTMLInputElement>) => {
                setSkippingMealsDetails(text.target.value)
              }}
            />
          ),
          <CustomYesOrNo
            id="eatingOutExperience"
            text="Eat out at restaurants or ordering take out"
            CheckState={setEatingOutExperience}
            isChecked={eatingOutExperience}
          />,
          eatingOutExperience === 'Yes' && (
            <TextInput
              id="eatingOutDetails"
              placeHolder="Details/Comments"
              widthPercentage="w-1/2"
              value={eatingOutDetails}
              onChange={(text: React.ChangeEvent<HTMLInputElement>) => {
                setEatingOutDetails(text.target.value)
              }}
            />
          ),
          <CustomYesOrNo
            id="eatingInFrontOfTVExperience"
            text="Eating in front of the TV"
            CheckState={setEatingInFrontOfTVExperience}
            isChecked={eatingInFrontOfTVExperience}
          />,
          eatingInFrontOfTVExperience === 'Yes' && (
            <TextInput
              id="eatingInFrontOfTVDetails"
              placeHolder="Details/Comments"
              widthPercentage="w-1/2"
              value={eatingInFrontOfTVDetails}
              onChange={(text: React.ChangeEvent<HTMLInputElement>) => {
                setEatingInFrontOfTVDetails(text.target.value)
              }}
            />
          ),
          <CustomYesOrNo
            id="eatingAtDeskExperience"
            text="Eating at desk/computer/while working"
            CheckState={setEatingAtDeskExperience}
            isChecked={eatingAtDeskExperience}
          />,
          eatingAtDeskExperience === 'Yes' && (
            <TextInput
              id="eatingAtDeskDetails"
              placeHolder="Details/Comments"
              widthPercentage="w-1/2"
              value={eatingAtDeskDetails}
              onChange={(text: React.ChangeEvent<HTMLInputElement>) => {
                setEatingAtDeskDetails(text.target.value)
              }}
            />
          ),
          <CustomYesOrNo
            id="portionSizeExperience"
            text="Eat more than one helping/large portion sizes"
            CheckState={setPortionSizeExperience}
            isChecked={portionSizeExperience}
          />,
          portionSizeExperience === 'Yes' && (
            <TextInput
              id="portionSizeDetails"
              placeHolder="Details/Comments"
              widthPercentage="w-1/2"
              value={portionSizeDetails}
              onChange={(text: React.ChangeEvent<HTMLInputElement>) => {
                setPortionSizeDetails(text.target.value)
              }}
            />
          ),
          <CustomYesOrNo
            id="eatingTooFastExperience"
            text="Eating too fast"
            CheckState={setEatingTooFastExperience}
            isChecked={eatingTooFastExperience}
          />,
          eatingTooFastExperience === 'Yes' && (
            <TextInput
              id="eatingTooFastDetails"
              placeHolder="Details/Comments"
              widthPercentage="w-1/2"
              value={eatingTooFastDetails}
              onChange={(text: React.ChangeEvent<HTMLInputElement>) => {
                setEatingTooFastDetails(text.target.value)
              }}
            />
          ),
          <CustomYesOrNo
            id="notSatifiedExperience"
            text="Do NOT feel satisfied or full after a meal"
            CheckState={setNotSatifiedExperience}
            isChecked={notSatifiedExperience}
          />,
          notSatifiedExperience === 'Yes' && (
            <TextInput
              id="notSatifiedDetails"
              placeHolder="Details/Comments"
              widthPercentage="w-1/2"
              value={notSatifiedDetails}
              onChange={(text: React.ChangeEvent<HTMLInputElement>) => {
                setNotSatifiedDetails(text.target.value)
              }}
            />
          ),
        ]}
      />
      <SectionWithTitle
        title="Which of the following do you consume more than once a week?"
        BgColor="bg-[#e8e8e8]"
        children={[
          <CustomYesOrNo
            id="regularSoda"
            text="Regular Soda"
            CheckState={setRegularSoda}
            isChecked={regularSoda}
          />,
          regularSoda === 'Yes' && (
            <TextInput
              placeHolder="Number Per Day (Average)"
              id="regularSodaCount"
              value={regularSodaCount}
              onChange={(text: React.ChangeEvent<HTMLInputElement>) =>
                setRegularSodaCount(text.target.value)
              }
              widthPercentage="w-1/2"
            />
          ),
          <CustomYesOrNo
            id="juice"
            text="Juice"
            CheckState={setJuice}
            isChecked={juice}
          />,
          juice === 'Yes' && (
            <TextInput
              placeHolder="Number Per Day (Average)"
              id="juiceCount"
              value={juiceCount}
              onChange={(text: React.ChangeEvent<HTMLInputElement>) =>
                setJuiceCount(text.target.value)
              }
              widthPercentage="w-1/2"
            />
          ),
          <CustomYesOrNo
            id="sweetTea"
            text="Sweet Tea"
            CheckState={setSweetTea}
            isChecked={sweetTea}
          />,
          sweetTea === 'Yes' && (
            <TextInput
              placeHolder="Number Per Day (Average)"
              id="sweetTeaCount"
              value={sweetTeaCount}
              onChange={(text: React.ChangeEvent<HTMLInputElement>) =>
                setSweetTeaCount(text.target.value)
              }
              widthPercentage="w-1/2"
            />
          ),
          <CustomYesOrNo
            id="alchoholBeverages"
            text="Alchohol Beverages"
            CheckState={setAlchoholBeverages}
            isChecked={alchoholBeverages}
          />,
          alchoholBeverages === 'Yes' && (
            <TextInput
              placeHolder="Number Per Day (Average)"
              id="alchoholBeveragesCount"
              value={alchoholBeveragesCount}
              onChange={(text: React.ChangeEvent<HTMLInputElement>) =>
                setAlchoholBeveragesCount(text.target.value)
              }
              widthPercentage="w-1/2"
            />
          ),
          <CustomYesOrNo
            id="friedFoods"
            text="Fried Foods"
            CheckState={setFriedFoods}
            isChecked={friedFoods}
          />,
          friedFoods === 'Yes' && (
            <TextInput
              placeHolder="Number Per Day (Average)"
              id="friedFoodsCount"
              value={friedFoodsCount}
              onChange={(text: React.ChangeEvent<HTMLInputElement>) =>
                setFriedFoodsCount(text.target.value)
              }
              widthPercentage="w-1/2"
            />
          ),
        ]}
      />
      <p className="mt-10 text-center text-xl">
        Please indicate the number of servings of each of the below that you
        typically consume during an average day
      </p>
      <div className="mt-10 flex flex-col items-center justify-center md:flex-row">
        <TextInput
          id="fruitServings"
          placeHolder='Fruit Servings (e.g. "1")'
          widthPercentage="w-2/3"
          value={fruitServings}
          onChange={(text: React.ChangeEvent<HTMLInputElement>) => {
            setFruitServings(text.target.value)
          }}
        />
        <TextInput
          id="vegetableServings"
          placeHolder='Vegetable Servings (e.g. "1")'
          widthPercentage="w-2/3"
          value={vegetableServings}
          onChange={(text: React.ChangeEvent<HTMLInputElement>) => {
            setVegetableServings(text.target.value)
          }}
        />
        <TextInput
          id="wholeGrainServings"
          placeHolder='Whole Grain Servings (e.g. "1")'
          widthPercentage="w-2/3"
          value={wholeGrainServings}
          onChange={(text: React.ChangeEvent<HTMLInputElement>) => {
            setWholeGrainServings(text.target.value)
          }}
        />
      </div>
      <div className="mt-10 flex flex-col items-center justify-center md:flex-row">
        <TextInput
          id="lowFatDairyServings"
          placeHolder='Low Fat Dairy Servings (e.g. "1")'
          widthPercentage="w-2/3"
          value={lowFatDairyServings}
          onChange={(text: React.ChangeEvent<HTMLInputElement>) => {
            setLowFatDairyServings(text.target.value)
          }}
        />
        <TextInput
          id="leanProteinServings"
          placeHolder='Lean Protein Servings (e.g. "1")'
          widthPercentage="w-2/3"
          value={leanProteinServings}
          onChange={(text: React.ChangeEvent<HTMLInputElement>) => {
            setLeanProteinServings(text.target.value)
          }}
        />
      </div>
      <AutoSaveLine success={autoSaveDaysPerWeek} />
      <p className="mt-10 text-center text-xl">
        How many days per week will you be able to commit to cooking/meal
        prepping to meet your weight loss goals?
      </p>
      <div className="mt-5 flex items-center justify-center">
        <TextInput
          id="daysPerWeekExplination"
          placeHolder="Explain"
          widthPercentage="w-2/3"
          value={daysPerWeekExplination}
          onChange={(text: React.ChangeEvent<HTMLInputElement>) => {
            setDaysPerWeekExplination(text.target.value)
          }}
          required={requiredDaysPerWeekExplination}
          onClick={() => {
            const setAutoSave = async () => {
              setAutoSaveDaysPerWeek(false)
            }
            setAutoSave().then(() => {
              WeightLossAutoSave({
                setSuccess: setAutoSaveDaysPerWeek,
                emailValue: auth.currentUser?.email,
                patientsName: patientsName,
                date: date,
                primaryDoctor: primaryDoctor,
                whyLossWeight: whyLossWeight,
                weightGoals: weightGoals,
                timeFrame: timeFrame,
                mostWeighedAsAdult: mostWeighedAsAdult,
                ageAtAdultMostWeight: ageAtAdultMostWeight,
                leastWeighedAsAdult: leastWeighedAsAdult,
                ageAtAdultLeastWeight: ageAtAdultLeastWeight,
                weightChangeDuringLife: weightChangeDuringLife,
                weightGainedInPast: weightGainedInPast,
                challengesOfWeightManagement: challengesOfWeightManagement,
                hopesForWeightLossManagement: hopesForWeightLossManagement,
                commitmentsToWeightLoss: commitmentsToWeightLoss,
                currentDietAids: currentDietAids,
                onYourOwn: onYourOwn,
                checkIfTried: checkIfTried,
                onYourOwnStartDate: onYourOwnStartDate,
                onYourOwnEndDate: onYourOwnEndDate,
                onYourOwnWeightLoss: onYourOwnWeightLoss,
                onYourOwnReasonForStopping: onYourOwnReasonForStopping,
                onYourOwnReasonForRegain: onYourOwnReasonForRegain,
                atkinsOrLowCarbohydrate: atkinsOrLowCarbohydrate,
                atkinsOrLowCarbohydrateStartDate:
                  atkinsOrLowCarbohydrateStartDate,
                atkinsOrLowCarbohydrateEndDate: atkinsOrLowCarbohydrateEndDate,
                atkinsOrLowCarbohydrateWeightLoss:
                  atkinsOrLowCarbohydrateWeightLoss,
                atkinsOrLowCarbohydrateReasonForStopping:
                  atkinsOrLowCarbohydrateReasonForStopping,
                atkinsOrLowCarbohydrateReasonForRegain:
                  atkinsOrLowCarbohydrateReasonForRegain,
                jennyCraig: jennyCraig,
                jennyCraigStartDate: jennyCraigStartDate,
                jennyCraigEndDate: jennyCraigEndDate,
                jennyCraigWeightLoss: jennyCraigWeightLoss,
                jennyCraigReasonForStopping: jennyCraigReasonForStopping,
                jennyCraigReasonForRegain: jennyCraigReasonForRegain,
                nutrisystem: nutrisystem,
                nutrisystemStartDate: nutrisystemStartDate,
                nutrisystemEndDate: nutrisystemEndDate,
                nutrisystemWeightLoss: nutrisystemWeightLoss,
                nutrisystemReasonForStopping: nutrisystemReasonForStopping,
                nutrisystemReasonForRegain: nutrisystemReasonForRegain,
                weightWatchers: weightWatchers,
                weightWatchersStartDate: weightWatchersStartDate,
                weightWatchersEndDate: weightWatchersEndDate,
                weightWatchersWeightLoss: weightWatchersWeightLoss,
                weightWatchersReasonForStopping:
                  weightWatchersReasonForStopping,
                weightWatchersReasonForRegain: weightWatchersReasonForRegain,
                slimfast: slimfast,
                slimfastStartDate: slimfastStartDate,
                slimfastEndDate: slimfastEndDate,
                slimfastWeightLoss: slimfastWeightLoss,
                slimfastReasonForStopping: slimfastReasonForStopping,
                slimfastReasonForRegain: slimfastReasonForRegain,
                optifast: optifast,
                optifastStartDate: optifastStartDate,
                optifastEndDate: optifastEndDate,
                optifastWeightLoss: optifastWeightLoss,
                optifastReasonForStopping: optifastReasonForStopping,
                optifastReasonForRegain: optifastReasonForRegain,
                otherLiquidDiet: otherLiquidDiet,
                otherLiquidDietStartDate: otherLiquidDietStartDate,
                otherLiquidDietEndDate: otherLiquidDietEndDate,
                otherLiquidDietWeightLoss: otherLiquidDietWeightLoss,
                otherLiquidDietReasonForStopping:
                  otherLiquidDietReasonForStopping,
                otherLiquidDietReasonForRegain: otherLiquidDietReasonForRegain,
                other: other,
                otherName: otherName,
                otherStartDate: otherStartDate,
                otherEndDate: otherEndDate,
                otherWeightLoss: otherWeightLoss,
                otherReasonForStopping: otherReasonForStopping,
                otherReasonForRegain: otherReasonForRegain,
                adipex: adipex,
                adipexStartDate: adipexStartDate,
                adipexEndDate: adipexEndDate,
                adipexWeightLoss: adipexWeightLoss,
                adipexReasonForStopping: adipexReasonForStopping,
                adipexReasonForRegain: adipexReasonForRegain,
                alli: alli,
                alliStartDate: alliStartDate,
                alliEndDate: alliEndDate,
                alliWeightLoss: alliWeightLoss,
                alliReasonForStopping: alliReasonForStopping,
                alliReasonForRegain: alliReasonForRegain,
                belviq: belviq,
                belviqStartDate: belviqStartDate,
                belviqEndDate: belviqEndDate,
                belviqWeightLoss: belviqWeightLoss,
                belviqReasonForStopping: belviqReasonForStopping,
                belviqReasonForRegain: belviqReasonForRegain,
                dexatrim: dexatrim,
                dexatrimStartDate: dexatrimStartDate,
                dexatrimEndDate: dexatrimEndDate,
                dexatrimWeightLoss: dexatrimWeightLoss,
                dexatrimReasonForStopping: dexatrimReasonForStopping,
                dexatrimReasonForRegain: dexatrimReasonForRegain,
                herbalWeightLoss: herbalWeightLoss,
                herbalWeightLossStartDate: herbalWeightLossStartDate,
                herbalWeightLossEndDate: herbalWeightLossEndDate,
                herbalWeightLossWeightLoss: herbalWeightLossWeightLoss,
                herbalWeightLossReasonForStopping:
                  herbalWeightLossReasonForStopping,
                herbalWeightLossReasonForRegain:
                  herbalWeightLossReasonForRegain,
                meridia: meridia,
                meridiaStartDate: meridiaStartDate,
                meridiaEndDate: meridiaEndDate,
                meridiaWeightLoss: meridiaWeightLoss,
                meridiaReasonForStopping: meridiaReasonForStopping,
                meridiaReasonForRegain: meridiaReasonForRegain,
                phenfen: phenfen,
                phenfenStartDate: phenfenStartDate,
                phenfenEndDate: phenfenEndDate,
                phenfenWeightLoss: phenfenWeightLoss,
                phenfenReasonForStopping: phenfenReasonForStopping,
                phenfenReasonForRegain: phenfenReasonForRegain,
                qsymia: qsymia,
                qsymiaStartDate: qsymiaStartDate,
                qsymiaEndDate: qsymiaEndDate,
                qsymiaWeightLoss: qsymiaWeightLoss,
                qsymiaReasonForStopping: qsymiaReasonForStopping,
                qsymiaReasonForRegain: qsymiaReasonForRegain,
                redux: redux,
                reduxStartDate: reduxStartDate,
                reduxEndDate: reduxEndDate,
                reduxWeightLoss: reduxWeightLoss,
                reduxReasonForStopping: reduxReasonForStopping,
                reduxReasonForRegain: reduxReasonForRegain,
                otherSupplements: otherSupplements,
                otherSupplementsName: otherSupplementsName,
                otherSupplementsStartDate: otherSupplementsStartDate,
                otherSupplementsEndDate: otherSupplementsEndDate,
                otherSupplementsWeightLoss: otherSupplementsWeightLoss,
                otherSupplementsReasonForStopping:
                  otherSupplementsReasonForStopping,
                otherSupplementsReasonForRegain:
                  otherSupplementsReasonForRegain,
                childrenUnderEighteen: childrenUnderEighteen,
                childrenUnderEighteenCheckBox: childrenUnderEighteenCheckBox,
                familyMemebersObese: familyMemebersObese,
                support: support,
                supportExplaination: supportExplaination,
                eatingDisorder: eatingDisorder,
                anorexiaNervosa: anorexiaNervosa,
                bingeEating: bingeEating,
                bulimia: bulimia,
                eatingTooMuch: eatingTooMuch,
                sleepHours: sleepHours,
                restedWhenWakeUp: restedWhenWakeUp,
                doYouSnore: doYouSnore,
                wearEquipment: wearEquipment,
                howManyNights: howManyNights,
                sleepWellness: sleepWellness,
                sittingAndReading: sittingAndReading,
                watchingTv: watchingTv,
                sittingInPublic: sittingInPublic,
                carPassanger: carPassanger,
                lyingDown: lyingDown,
                talkingToSomeone: talkingToSomeone,
                sittingQuietlyAfterLunch: sittingQuietlyAfterLunch,
                inCarWhileStopped: inCarWhileStopped,
                total: total,
                typicalDay: typicalDay,
                enjoyExercise: enjoyExercise,
                gymMembership: gymMembership,
                exerciseEquipment: exerciseEquipment,
                exerciseRegularly: exerciseRegularly,
                badExerciseExperience: badExerciseExperience,
                encourageExercise: encourageExercise,
                sixAm: sixAm,
                nineAm: nineAm,
                twelvePm: twelvePm,
                threePm: threePm,
                sixPm: sixPm,
                ninePm: ninePm,
                exerciseWeekly: exerciseWeekly,
                describeExercise: describeExercise,
                difficultyGettingUpFromFloor: difficultyGettingUpFromFloor,
                typeOfExercise: typeOfExercise,
                exercisePreference: exercisePreference,
                athleteInSchool: athleteInSchool,
                confidentIncrease: confidentIncrease,
                majorBenefitsOfExercise: majorBenefitsOfExercise,
                exerciseBarriers: exerciseBarriers,
                minutesPerDay: minutesPerDay,
                daysPerWeek: daysPerWeek,
                confidenceWeightLossDiet: confidenceWeightLossDiet,
                majorBarriersDiet: majorBarriersDiet,
                favoriteFoods: favoriteFoods,
                breakfastTypeOfFood: breakfastTypeOfFood,
                breakfastProteinOrCarbs: breakfastProteinOrCarbs,
                breakfastCalories: breakfastCalories,
                lunchTypeOfFood: lunchTypeOfFood,
                lunchProteinOrCarbs: lunchProteinOrCarbs,
                lunchCalories: lunchCalories,
                dinnerTypeOfFood: dinnerTypeOfFood,
                dinnerProteinOrCarbs: dinnerProteinOrCarbs,
                dinnerCalories: dinnerCalories,
                snackOneTypeOfFood: snackOneTypeOfFood,
                snackOneProteinOrCarbs: snackOneProteinOrCarbs,
                snackOneCalories: snackOneCalories,
                snackTwoTypeOfFood: snackTwoTypeOfFood,
                snackTwoProteinOrCarbs: snackTwoProteinOrCarbs,
                snackTwoCalories: snackTwoCalories,
                coffeeTypeOfFood: coffeeTypeOfFood,
                coffeeProteinOrCarbs: coffeeProteinOrCarbs,
                coffeeCalories: coffeeCalories,
                sodaTypeOfFood: sodaTypeOfFood,
                sodaProteinOrCarbs: sodaProteinOrCarbs,
                sodaCalories: sodaCalories,
                candyOrSweetsTypeOfFood: candyOrSweetsTypeOfFood,
                candyOrSweetsProteinOrCarbs: candyOrSweetsProteinOrCarbs,
                candyOrSweetsCalories: candyOrSweetsCalories,
                otherTypeOfFood: otherTypeOfFood,
                otherProteinOrCarbs: otherProteinOrCarbs,
                otherCalories: otherCalories,
                numPeopleLiveWith: numPeopleLiveWith,
                eatTogether: eatTogether,
                whoDoesShopping: whoDoesShopping,
                whoDoesCooking: whoDoesCooking,
                foodIntolerance: foodIntolerance,
                foodIntoleranceList: foodIntoleranceList,
                stressEating: stressEating,
                stressEatingDetails: stressEatingDetails,
                bingeEatingExperience: bingeEatingExperience,
                bingeEatingDetails: bingeEatingDetails,
                snackingExperience: snackingExperience,
                snackingDetails: snackingDetails,
                eatingMiddleOfNightExperience: eatingMiddleOfNightExperience,
                eatingMiddleOfNightDetails: eatingMiddleOfNightDetails,
                skippingMealsExperience: skippingMealsExperience,
                skippingMealsDetails: skippingMealsDetails,
                eatingOutExperience: eatingOutExperience,
                eatingOutDetails: eatingOutDetails,
                eatingInFrontOfTVExperience: eatingInFrontOfTVExperience,
                eatingInFrontOfTVDetails: eatingInFrontOfTVDetails,
                eatingAtDeskExperience: eatingAtDeskExperience,
                eatingAtDeskDetails: eatingAtDeskDetails,
                portionSizeExperience: portionSizeExperience,
                portionSizeDetails: portionSizeDetails,
                eatingTooFastExperience: eatingTooFastExperience,
                eatingTooFastDetails: eatingTooFastDetails,
                notSatifiedExperience: notSatifiedExperience,
                notSatifiedDetails: notSatifiedDetails,
                regularSoda: regularSoda,
                regularSodaCount: regularSodaCount,
                juice: juice,
                juiceCount: juiceCount,
                sweetTea: sweetTea,
                sweetTeaCount: sweetTeaCount,
                alchoholBeverages: alchoholBeverages,
                alchoholBeveragesCount: alchoholBeveragesCount,
                friedFoods: friedFoods,
                friedFoodsCount: friedFoodsCount,
                fruitServings: fruitServings,
                vegetableServings: vegetableServings,
                wholeGrainServings: wholeGrainServings,
                lowFatDairyServings: lowFatDairyServings,
                leanProteinServings: leanProteinServings,
                daysPerWeekExplination: daysPerWeekExplination,
                medicalHistory: medicalHistory,
                medicationsTaken: medicationsTaken,
                medicationsTakenList: medicationsTakenList,
              })
            })
          }}
        />
      </div>
      <SectionWithTitle
        title="Past Medical History"
        BgColor="bg-[#e8e8e8]"
        children={[
          <CustomCheckBoxField
            id="medicalHistory"
            title="Please check all that apply"
            required={requiredMedicalHistory}
            checkBoxValues={medicalHistory}
            setCheckBoxValues={setMedicalHistory}
            allowMultipleCheckBoxes={true}
            checkBoxTitles={[
              'Diabetes',
              'Damage to Kidneys from Diabetes',
              'Damage to Eyes from Diabetes',
              'Damage to Nerves from Diabetes',
              'Obstructive Sleep Apnea',
              'High blood pressure',
              'High cholesterol',
              'Thyroid Disease',
              'Arthritis',
              'Cancer',
              'Heart Attack(s)',
              'Heart murmur/Valve problems',
              'Heart Failure',
              'Organ Transplant',
              'Polycystic Ovary Disease',
              'Kidney disease',
              'Kidney stones',
              'Dialysis',
              'Pancreatitis',
              'Asthma',
              'Pulmonary embolism',
              'Emphysema, COPD',
              'Reflux/Heartburn',
              'Crohn’s disease',
              'Gallstones',
              'Epilepsy (seizures)',
              'Colitis',
              'Stroke',
              'Depression',
              'Anxiety',
              'Cataracts',
              'Glaucoma',
              'Other Eye Disease',
              'Peripheral artery disease',
              'Clotting Disorder',
              'Rheumatoid Arthritis',
              'Lupus',
              'Gout',
              'Other Rheumatologic Disease',
              'Liver disease',
              'Hepatitis',
              'HIV/AID',
              'None of the above',
            ]}
          />,
        ]}
      />
      <div className=" flex flex-col items-center justify-center justify-self-center">
        <CustomYesOrNo
          id="medicationsTaken"
          text="Are you currently taking any medications?"
          CheckState={setMedicationsTaken}
          isChecked={medicationsTaken}
        />
        {medicationsTaken === 'Yes' && (
          <UserCreatedListFromInputBox
            id="medicationsTakenList"
            list={medicationsTakenList}
            inputBoxPlaceHolder="Medication Name"
          />
        )}
      </div>

      <SectionWithTitle
        title="PHOTO CONSENT AND RELEASE FORM "
        subTitle="Please read the following and sign:"
        BgColor="bg-[#e8e8e8]"
        children={[
          <p>
            {' '}
            I consent for photographs and/or video images to be taken of me by
            American Medical Associates or a representative. I understand the
            images will be a part of my medical record and may be used for
            purposes of medical teaching or training or for marketing purposes
            (website, print, digital or social media). By consenting to
            photographs and/or video images I understand I will not be
            compensated from any party. Although photographs and/or video images
            will be used without identifying information such as name, I
            understand it is possible someone may recognize me. I further
            acknowledge that my participation is voluntary and agree that use of
            any photographs and/or video images confers no rights of ownership
            or royalties whatsoever. I authorize the use of photographs and/or
            video images:
          </p>,
          <CustomCheckBoxField
            id="photoConsent"
            checkBoxValues={photoConsentCheckBoxes}
            setCheckBoxValues={setPhotoConsentCheckBoxes}
            allowMultipleCheckBoxes={true}
            required={requiredPhotoConsent}
            checkBoxTitles={[
              'For educational purposes (medical teaching or training)',
              'For marketing and advertising purposes (website, print, digital, or social media)',
              'At my request, my photographs and/or video images will only be used as part of my medical record.',
            ]}
          />,
          <p>
            I hereby American Medical Associates, its employees, and any third
            parties involved in the creation of or publication of educational or
            marketing materials, from liability for any claims by me or any
            third party in connection with my participation. By signing this
            form, I confirm understanding of this consent. If I wish to withdraw
            my consent in the future, I may do so via a written request
            submitted to American Medical Associates or by completion of a new
            form.{' '}
          </p>,
          <div className="flex w-full items-center justify-center">
            <Signature
              id="photoConsentSignature"
              signatureValue={photoConsentSignature}
              signatureState={setPhotoConsentSignature}
              date={photoConsentDate}
              dateState={setPhotoConsentDate}
              requiredSignature={requiredPhotoConsentSignature}
              requiredDate={requiredPhotoConsentDate}
              agreeThatTheirSignatureIsValid={agreeThatTheirSignatureIsValid}
              agreeThatTheirSignatureIsValidState={
                setAgreeThatTheirSignatureIsValid
              }
              requiredCheckBox={requiredPhotoConsentCheckBox}
            />
            ,
          </div>,
        ]}
      />
      {showGreenCheckMark && (
        <GreenCheckMark
          checkMarkText="Thank You"
          bottomText="Your information has been submitted"
        />
      )}
      <div className="my-20 flex items-center justify-center">
        <MainButton
          buttonText="Submit"
          buttonWidth="w-[70%]"
          loading={loading}
          onClick={() => {
            setLoading(true)
            if (patientsName === '') {
              setLoading(false)
              setRequiredPatientsName(true)
              router.push('/WeightLossSurvey/#patientsName').then(() => {
                setTimeout(() => {
                  window.scrollBy(0, -150)
                }, 100)
              })
              return
            } else if (date === '') {
              setLoading(false)
              setRequiredDate(true)
              router.push('/WeightLossSurvey/#date').then(() => {
                setTimeout(() => {
                  window.scrollBy(0, -150)
                }, 100)
              })
              return
            } else if (whyLossWeight === '') {
              setLoading(false)
              setRequiredWhyLossWeight(true)
              router.push('/WeightLossSurvey/#whyLossWeight').then(() => {
                setTimeout(() => {
                  window.scrollBy(0, -150)
                }, 100)
              })
              return
            } else if (weightGoals === '') {
              setLoading(false)
              setRequiredWeightGoals(true)
              router.push('/WeightLossSurvey/#weightGoals').then(() => {
                setTimeout(() => {
                  window.scrollBy(0, -150)
                }, 100)
              })
              return
            } else if (mostWeighedAsAdult === '') {
              setLoading(false)
              setRequiredMostWeighedAsAdult(true)
              router.push('/WeightLossSurvey/#mostWeighedAsAdult').then(() => {
                setTimeout(() => {
                  window.scrollBy(0, -150)
                }, 100)
              })
              return
            } else if (ageAtAdultMostWeight === '') {
              setLoading(false)
              setRequiredAgeAtAdultMostWeight(true)
              router.push('/WeightLossSurvey/#ageAtWeight').then(() => {
                setTimeout(() => {
                  window.scrollBy(0, -150)
                }, 100)
              })
              return
            } else if (leastWeighedAsAdult === '') {
              setLoading(false)
              setRequiredLeastWeighedAsAdult(true)
              router.push('/WeightLossSurvey/#leastWeighedAsAdult').then(() => {
                setTimeout(() => {
                  window.scrollBy(0, -150)
                }, 100)
              })
              return
            } else if (ageAtAdultLeastWeight === '') {
              setLoading(false)
              setRequiredAgeAtAdultLeastWeight(true)
              router
                .push('/WeightLossSurvey/#ageAtAdultLeastWeight')
                .then(() => {
                  setTimeout(() => {
                    window.scrollBy(0, -150)
                  }, 100)
                })
              return
            } else if (weightChangeDuringLife.length === 0) {
              setLoading(false)
              setRequiredWeightChangeDuringLife(true)
              router
                .push('/WeightLossSurvey/#howHasWeightChangedDuringLife')
                .then(() => {
                  setTimeout(() => {
                    window.scrollBy(0, -150)
                  }, 100)
                })
              return
            } else if (weightGainedInPast.length === 0) {
              setLoading(false)
              setRequiredWeightGainedInPast(true)
              router
                .push('/WeightLossSurvey/#causeOfWeightGainInPast')
                .then(() => {
                  setTimeout(() => {
                    window.scrollBy(0, -150)
                  }, 100)
                })
              return
            } else if (hopesForWeightLossManagement === '') {
              setLoading(false)
              setRequiredHopesForWeightLossManagement(true)
              router
                .push('/WeightLossSurvey/#hopesForWeightLossManagement')
                .then(() => {
                  setTimeout(() => {
                    window.scrollBy(0, -150)
                  }, 100)
                })
              return
            } else if (currentDietAids === '') {
              setLoading(false)
              setRequiredCurrentDietAids(true)
              router.push('/WeightLossSurvey/#currentlyOnDietAids').then(() => {
                setTimeout(() => {
                  window.scrollBy(0, -150)
                }, 100)
              })
              return
            } else if (childrenUnderEighteen === '') {
              setLoading(false)
              setRequiredChildrenUnderEighteen(true)
              router
                .push('/WeightLossSurvey/#childrenUnderEighteen')
                .then(() => {
                  setTimeout(() => {
                    window.scrollBy(0, -150)
                  }, 100)
                })
              return
            } else if (eatingDisorder === '') {
              setLoading(false)
              setRequiredEatingDisorder(true)
              router.push('/WeightLossSurvey/#eatingDisorder').then(() => {
                setTimeout(() => {
                  window.scrollBy(0, -150)
                }, 100)
              })
              return
            } else if (anorexiaNervosa === '') {
              setLoading(false)
              setRequiredAnorexiaNervosa(true)
              router.push('/WeightLossSurvey/#anorexiaNervosa').then(() => {
                setTimeout(() => {
                  window.scrollBy(0, -150)
                }, 100)
              })
              return
            } else if (bingeEating === '') {
              setLoading(false)
              setRequiredBingeEating(true)
              router.push('/WeightLossSurvey/#bingeEating').then(() => {
                setTimeout(() => {
                  window.scrollBy(0, -150)
                }, 100)
              })
              return
            } else if (bulimia === '') {
              setLoading(false)
              setRequiredBulimia(true)
              router.push('/WeightLossSurvey/#bulimia').then(() => {
                setTimeout(() => {
                  window.scrollBy(0, -150)
                }, 100)
              })
              return
            } else if (eatingTooMuch === '') {
              setLoading(false)
              setRequiredEatingTooMuch(true)
              router.push('/WeightLossSurvey/#eatingTooMuch').then(() => {
                setTimeout(() => {
                  window.scrollBy(0, -150)
                }, 100)
              })
              return
            } else if (sleepHours === '') {
              setLoading(false)
              setRequiredSleepHours(true)
              router.push('/WeightLossSurvey/#sleepHours').then(() => {
                setTimeout(() => {
                  window.scrollBy(0, -150)
                }, 100)
              })
              return
            } else if (restedWhenWakeUp === '') {
              setLoading(false)
              setRequiredRestedWhenWakeUp(true)
              router.push('/WeightLossSurvey/#restedWhenWakeUp').then(() => {
                setTimeout(() => {
                  window.scrollBy(0, -150)
                }, 100)
              })
              return
            } else if (doYouSnore === '') {
              setLoading(false)
              setRequiredDoYouSnore(true)
              router.push('/WeightLossSurvey/#doYouSnore').then(() => {
                setTimeout(() => {
                  window.scrollBy(0, -150)
                }, 100)
              })
              return
            } else if (wearEquipment === '') {
              setLoading(false)
              setRequiredWearEquipment(true)
              router.push('/WeightLossSurvey/#wearEquipment').then(() => {
                setTimeout(() => {
                  window.scrollBy(0, -150)
                }, 100)
              })
              return
            } else if (sleepWellness === '') {
              setLoading(false)
              setRequiredSleepWellness(true)
              router.push('/WeightLossSurvey/#sleepWellness').then(() => {
                setTimeout(() => {
                  window.scrollBy(0, -150)
                }, 100)
              })
              return
            } else if (typicalDay === '') {
              setLoading(false)
              setRequiredTypicalDay(true)
              router.push('/WeightLossSurvey/#typicalDay').then(() => {
                setTimeout(() => {
                  window.scrollBy(0, -150)
                }, 100)
              })
              return
            } else if (exerciseBarriers === '') {
              setLoading(false)
              setRequiredExerciseBarriers(true)
              router.push('/WeightLossSurvey/#exerciseBarriers').then(() => {
                setTimeout(() => {
                  window.scrollBy(0, -150)
                }, 100)
              })
              return
            } else if (confidenceWeightLossDiet === '') {
              setLoading(false)
              setRequiredConfidenceWeightLossDiet(true)
              router
                .push('/WeightLossSurvey/#confidenceWeightlossDiet')
                .then(() => {
                  setTimeout(() => {
                    window.scrollBy(0, -150)
                  }, 100)
                })
              return
            } else if (majorBarriersDiet === '') {
              setLoading(false)
              setRequiredMajorBarriersDiet(true)
              router.push('/WeightLossSurvey/#majorBarriersDiet').then(() => {
                setTimeout(() => {
                  window.scrollBy(0, -150)
                }, 100)
              })
              return
            } else if (daysPerWeekExplination === '') {
              setLoading(false)
              setRequiredDaysPerWeekExplination(true)
              router
                .push('/WeightLossSurvey/#daysPerWeekExplination')
                .then(() => {
                  setTimeout(() => {
                    window.scrollBy(0, -150)
                  }, 100)
                })
              return
            } else if (medicalHistory === '') {
              setLoading(false)
              setRequiredMedicalHistory(true)
              router.push('/WeightLossSurvey/#medicalHistory').then(() => {
                setTimeout(() => {
                  window.scrollBy(0, -150)
                }, 100)
              })
              return
            } else if (photoConsentCheckBoxes.length < 3) {
              setLoading(false)
              setRequiredPhotoConsent(true)
              alert('Please check all boxes')
              router.push('/WeightLossSurvey/#photoConsent').then(() => {
                setTimeout(() => {
                  window.scrollBy(0, -150)
                }, 100)
              })
              return
            } else if (photoConsentSignature === '') {
              setLoading(false)
              setRequiredPhotoConsentSignature(true)
              router
                .push('/WeightLossSurvey/#photoConsentSignature')
                .then(() => {
                  setTimeout(() => {
                    window.scrollBy(0, -150)
                  }, 100)
                })
              return
            } else if (photoConsentDate === '') {
              setLoading(false)
              setRequiredPhotoConsentDate(true)
              router
                .push('/WeightLossSurvey/#photoConsentSignature')
                .then(() => {
                  setTimeout(() => {
                    window.scrollBy(0, -150)
                  }, 100)
                })
              return
            } else if (agreeThatTheirSignatureIsValid === false) {
              setLoading(false)
              setRequiredPhotoConsentCheckBox(true)
              router
                .push('/WeightLossSurvey/#photoConsentSignature')
                .then(() => {
                  setTimeout(() => {
                    window.scrollBy(0, -150)
                  }, 100)
                })
              return
            } else {
              SubmitWeightLossSurvey({
                emailValue: auth.currentUser?.email,
                patientsName: patientsName,
                date: date,
                primaryDoctor: primaryDoctor,
                whyLossWeight: whyLossWeight,
                weightGoals: weightGoals,
                timeFrame: timeFrame,
                mostWeighedAsAdult: mostWeighedAsAdult,
                ageAtAdultMostWeight: ageAtAdultMostWeight,
                leastWeighedAsAdult: leastWeighedAsAdult,
                ageAtAdultLeastWeight: ageAtAdultLeastWeight,
                weightChangeDuringLife: weightChangeDuringLife,
                weightGainedInPast: weightGainedInPast,
                challengesOfWeightManagement: challengesOfWeightManagement,
                hopesForWeightLossManagement: hopesForWeightLossManagement,
                commitmentsToWeightLoss: commitmentsToWeightLoss,
                currentDietAids: currentDietAids,
                onYourOwn: onYourOwn,
                checkIfTried: checkIfTried,
                onYourOwnStartDate: onYourOwnStartDate,
                onYourOwnEndDate: onYourOwnEndDate,
                onYourOwnWeightLoss: onYourOwnWeightLoss,
                onYourOwnReasonForStopping: onYourOwnReasonForStopping,
                onYourOwnReasonForRegain: onYourOwnReasonForRegain,
                atkinsOrLowCarbohydrate: atkinsOrLowCarbohydrate,
                atkinsOrLowCarbohydrateStartDate:
                  atkinsOrLowCarbohydrateStartDate,
                atkinsOrLowCarbohydrateEndDate: atkinsOrLowCarbohydrateEndDate,
                atkinsOrLowCarbohydrateWeightLoss:
                  atkinsOrLowCarbohydrateWeightLoss,
                atkinsOrLowCarbohydrateReasonForStopping:
                  atkinsOrLowCarbohydrateReasonForStopping,
                atkinsOrLowCarbohydrateReasonForRegain:
                  atkinsOrLowCarbohydrateReasonForRegain,
                jennyCraig: jennyCraig,
                jennyCraigStartDate: jennyCraigStartDate,
                jennyCraigEndDate: jennyCraigEndDate,
                jennyCraigWeightLoss: jennyCraigWeightLoss,
                jennyCraigReasonForStopping: jennyCraigReasonForStopping,
                jennyCraigReasonForRegain: jennyCraigReasonForRegain,
                nutrisystem: nutrisystem,
                nutrisystemStartDate: nutrisystemStartDate,
                nutrisystemEndDate: nutrisystemEndDate,
                nutrisystemWeightLoss: nutrisystemWeightLoss,
                nutrisystemReasonForStopping: nutrisystemReasonForStopping,
                nutrisystemReasonForRegain: nutrisystemReasonForRegain,
                weightWatchers: weightWatchers,
                weightWatchersStartDate: weightWatchersStartDate,
                weightWatchersEndDate: weightWatchersEndDate,
                weightWatchersWeightLoss: weightWatchersWeightLoss,
                weightWatchersReasonForStopping:
                  weightWatchersReasonForStopping,
                weightWatchersReasonForRegain: weightWatchersReasonForRegain,
                slimfast: slimfast,
                slimfastStartDate: slimfastStartDate,
                slimfastEndDate: slimfastEndDate,
                slimfastWeightLoss: slimfastWeightLoss,
                slimfastReasonForStopping: slimfastReasonForStopping,
                slimfastReasonForRegain: slimfastReasonForRegain,
                optifast: optifast,
                optifastStartDate: optifastStartDate,
                optifastEndDate: optifastEndDate,
                optifastWeightLoss: optifastWeightLoss,
                optifastReasonForStopping: optifastReasonForStopping,
                optifastReasonForRegain: optifastReasonForRegain,
                otherLiquidDiet: otherLiquidDiet,
                otherLiquidDietStartDate: otherLiquidDietStartDate,
                otherLiquidDietEndDate: otherLiquidDietEndDate,
                otherLiquidDietWeightLoss: otherLiquidDietWeightLoss,
                otherLiquidDietReasonForStopping:
                  otherLiquidDietReasonForStopping,
                otherLiquidDietReasonForRegain: otherLiquidDietReasonForRegain,
                other: other,
                otherName: otherName,
                otherStartDate: otherStartDate,
                otherEndDate: otherEndDate,
                otherWeightLoss: otherWeightLoss,
                otherReasonForStopping: otherReasonForStopping,
                otherReasonForRegain: otherReasonForRegain,
                adipex: adipex,
                adipexStartDate: adipexStartDate,
                adipexEndDate: adipexEndDate,
                adipexWeightLoss: adipexWeightLoss,
                adipexReasonForStopping: adipexReasonForStopping,
                adipexReasonForRegain: adipexReasonForRegain,
                alli: alli,
                alliStartDate: alliStartDate,
                alliEndDate: alliEndDate,
                alliWeightLoss: alliWeightLoss,
                alliReasonForStopping: alliReasonForStopping,
                alliReasonForRegain: alliReasonForRegain,
                belviq: belviq,
                belviqStartDate: belviqStartDate,
                belviqEndDate: belviqEndDate,
                belviqWeightLoss: belviqWeightLoss,
                belviqReasonForStopping: belviqReasonForStopping,
                belviqReasonForRegain: belviqReasonForRegain,
                dexatrim: dexatrim,
                dexatrimStartDate: dexatrimStartDate,
                dexatrimEndDate: dexatrimEndDate,
                dexatrimWeightLoss: dexatrimWeightLoss,
                dexatrimReasonForStopping: dexatrimReasonForStopping,
                dexatrimReasonForRegain: dexatrimReasonForRegain,
                herbalWeightLoss: herbalWeightLoss,
                herbalWeightLossStartDate: herbalWeightLossStartDate,
                herbalWeightLossEndDate: herbalWeightLossEndDate,
                herbalWeightLossWeightLoss: herbalWeightLossWeightLoss,
                herbalWeightLossReasonForStopping:
                  herbalWeightLossReasonForStopping,
                herbalWeightLossReasonForRegain:
                  herbalWeightLossReasonForRegain,
                meridia: meridia,
                meridiaStartDate: meridiaStartDate,
                meridiaEndDate: meridiaEndDate,
                meridiaWeightLoss: meridiaWeightLoss,
                meridiaReasonForStopping: meridiaReasonForStopping,
                meridiaReasonForRegain: meridiaReasonForRegain,
                phenfen: phenfen,
                phenfenStartDate: phenfenStartDate,
                phenfenEndDate: phenfenEndDate,
                phenfenWeightLoss: phenfenWeightLoss,
                phenfenReasonForStopping: phenfenReasonForStopping,
                phenfenReasonForRegain: phenfenReasonForRegain,
                qsymia: qsymia,
                qsymiaStartDate: qsymiaStartDate,
                qsymiaEndDate: qsymiaEndDate,
                qsymiaWeightLoss: qsymiaWeightLoss,
                qsymiaReasonForStopping: qsymiaReasonForStopping,
                qsymiaReasonForRegain: qsymiaReasonForRegain,
                redux: redux,
                reduxStartDate: reduxStartDate,
                reduxEndDate: reduxEndDate,
                reduxWeightLoss: reduxWeightLoss,
                reduxReasonForStopping: reduxReasonForStopping,
                reduxReasonForRegain: reduxReasonForRegain,
                otherSupplements: otherSupplements,
                otherSupplementsName: otherSupplementsName,
                otherSupplementsStartDate: otherSupplementsStartDate,
                otherSupplementsEndDate: otherSupplementsEndDate,
                otherSupplementsWeightLoss: otherSupplementsWeightLoss,
                otherSupplementsReasonForStopping:
                  otherSupplementsReasonForStopping,
                otherSupplementsReasonForRegain:
                  otherSupplementsReasonForRegain,
                childrenUnderEighteen: childrenUnderEighteen,
                childrenUnderEighteenCheckBox: childrenUnderEighteenCheckBox,
                familyMemebersObese: familyMemebersObese,
                support: support,
                supportExplaination: supportExplaination,
                eatingDisorder: eatingDisorder,
                anorexiaNervosa: anorexiaNervosa,
                bingeEating: bingeEating,
                bulimia: bulimia,
                eatingTooMuch: eatingTooMuch,
                sleepHours: sleepHours,
                restedWhenWakeUp: restedWhenWakeUp,
                doYouSnore: doYouSnore,
                wearEquipment: wearEquipment,
                howManyNights: howManyNights,
                sleepWellness: sleepWellness,
                sittingAndReading: sittingAndReading,
                watchingTv: watchingTv,
                sittingInPublic: sittingInPublic,
                carPassanger: carPassanger,
                lyingDown: lyingDown,
                talkingToSomeone: talkingToSomeone,
                sittingQuietlyAfterLunch: sittingQuietlyAfterLunch,
                inCarWhileStopped: inCarWhileStopped,
                total: total,
                typicalDay: typicalDay,
                enjoyExercise: enjoyExercise,
                gymMembership: gymMembership,
                exerciseEquipment: exerciseEquipment,
                exerciseRegularly: exerciseRegularly,
                badExerciseExperience: badExerciseExperience,
                encourageExercise: encourageExercise,
                sixAm: sixAm,
                nineAm: nineAm,
                twelvePm: twelvePm,
                threePm: threePm,
                sixPm: sixPm,
                ninePm: ninePm,
                exerciseWeekly: exerciseWeekly,
                describeExercise: describeExercise,
                difficultyGettingUpFromFloor: difficultyGettingUpFromFloor,
                typeOfExercise: typeOfExercise,
                exercisePreference: exercisePreference,
                athleteInSchool: athleteInSchool,
                confidentIncrease: confidentIncrease,
                majorBenefitsOfExercise: majorBenefitsOfExercise,
                exerciseBarriers: exerciseBarriers,
                minutesPerDay: minutesPerDay,
                daysPerWeek: daysPerWeek,
                confidenceWeightLossDiet: confidenceWeightLossDiet,
                majorBarriersDiet: majorBarriersDiet,
                favoriteFoods: favoriteFoods,
                breakfastTypeOfFood: breakfastTypeOfFood,
                breakfastProteinOrCarbs: breakfastProteinOrCarbs,
                breakfastCalories: breakfastCalories,
                lunchTypeOfFood: lunchTypeOfFood,
                lunchProteinOrCarbs: lunchProteinOrCarbs,
                lunchCalories: lunchCalories,
                dinnerTypeOfFood: dinnerTypeOfFood,
                dinnerProteinOrCarbs: dinnerProteinOrCarbs,
                dinnerCalories: dinnerCalories,
                snackOneTypeOfFood: snackOneTypeOfFood,
                snackOneProteinOrCarbs: snackOneProteinOrCarbs,
                snackOneCalories: snackOneCalories,
                snackTwoTypeOfFood: snackTwoTypeOfFood,
                snackTwoProteinOrCarbs: snackTwoProteinOrCarbs,
                snackTwoCalories: snackTwoCalories,
                coffeeTypeOfFood: coffeeTypeOfFood,
                coffeeProteinOrCarbs: coffeeProteinOrCarbs,
                coffeeCalories: coffeeCalories,
                sodaTypeOfFood: sodaTypeOfFood,
                sodaProteinOrCarbs: sodaProteinOrCarbs,
                sodaCalories: sodaCalories,
                candyOrSweetsTypeOfFood: candyOrSweetsTypeOfFood,
                candyOrSweetsProteinOrCarbs: candyOrSweetsProteinOrCarbs,
                candyOrSweetsCalories: candyOrSweetsCalories,
                otherTypeOfFood: otherTypeOfFood,
                otherProteinOrCarbs: otherProteinOrCarbs,
                otherCalories: otherCalories,
                numPeopleLiveWith: numPeopleLiveWith,
                eatTogether: eatTogether,
                whoDoesShopping: whoDoesShopping,
                whoDoesCooking: whoDoesCooking,
                foodIntolerance: foodIntolerance,
                foodIntoleranceList: foodIntoleranceList,
                stressEating: stressEating,
                stressEatingDetails: stressEatingDetails,
                bingeEatingExperience: bingeEatingExperience,
                bingeEatingDetails: bingeEatingDetails,
                snackingExperience: snackingExperience,
                snackingDetails: snackingDetails,
                eatingMiddleOfNightExperience: eatingMiddleOfNightExperience,
                eatingMiddleOfNightDetails: eatingMiddleOfNightDetails,
                skippingMealsExperience: skippingMealsExperience,
                skippingMealsDetails: skippingMealsDetails,
                eatingOutExperience: eatingOutExperience,
                eatingOutDetails: eatingOutDetails,
                eatingInFrontOfTVExperience: eatingInFrontOfTVExperience,
                eatingInFrontOfTVDetails: eatingInFrontOfTVDetails,
                eatingAtDeskExperience: eatingAtDeskExperience,
                eatingAtDeskDetails: eatingAtDeskDetails,
                portionSizeExperience: portionSizeExperience,
                portionSizeDetails: portionSizeDetails,
                eatingTooFastExperience: eatingTooFastExperience,
                eatingTooFastDetails: eatingTooFastDetails,
                notSatifiedExperience: notSatifiedExperience,
                notSatifiedDetails: notSatifiedDetails,
                regularSoda: regularSoda,
                regularSodaCount: regularSodaCount,
                juice: juice,
                juiceCount: juiceCount,
                sweetTea: sweetTea,
                sweetTeaCount: sweetTeaCount,
                alchoholBeverages: alchoholBeverages,
                alchoholBeveragesCount: alchoholBeveragesCount,
                friedFoods: friedFoods,
                friedFoodsCount: friedFoodsCount,
                fruitServings: fruitServings,
                vegetableServings: vegetableServings,
                wholeGrainServings: wholeGrainServings,
                lowFatDairyServings: lowFatDairyServings,
                leanProteinServings: leanProteinServings,
                daysPerWeekExplination: daysPerWeekExplination,
                medicalHistory: medicalHistory,
                medicationsTaken: medicationsTaken,
                medicationsTakenList: medicationsTakenList,
                photoConsentSignature: photoConsentSignature,
                photoConsentDate: photoConsentDate,
                photoConsentagreeThatTheirSignatureIsValid:
                  agreeThatTheirSignatureIsValid,
              })
                .then(() => {
                  setLoading(false)
                })
                .then(() => {
                  setShowGreenCheckMark(true)
                })
            }
          }}
        />
      </div>
    </div>
  )
}

export default WeightLossSurvey
