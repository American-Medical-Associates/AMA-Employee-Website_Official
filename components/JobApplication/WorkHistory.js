import React, { useState } from 'react'
import TextInput from '../userInput/TextInput'
import RadioButton from '../userInput/RadioButton'
import Datepicker from '../userInput/Datepicker'
import LargeTextBox from '../userInput/LargeTextBox'
import MainButton from '../Buttons/MainButton'

import { RoundAddButton } from '../Buttons/RoundAddButton'
import PhoneNumberInput from '../userInput/PhoneNumberInput'
// todo add google address auto complete
export default function WorkHistory({
  selectedDateStart1,
  setSelectedDateStart1,
  selectedDateStart2,
  setSelectedDateStart2,
  selectedDateStart3,
  setSelectedDateStart3,
  selectedDateEnd1,
  setSelectedDateEnd1,
  selectedDateEnd2,
  setSelectedDateEnd2,
  selectedDateEnd3,
  setSelectedDateEnd3,
  typeOfBusiness1,
  typeOfBusinessState1,
  typeOfBusiness2,
  typeOfBusinessState2,
  typeOfBusiness3,
  typeOfBusinessState3,
  workNameState1,
  workNameValue1,
  workNameState2,
  workNameValue2,
  workNameState3,
  workNameValue3,
  workAddressState1,
  workAddressValue1,
  workAddressState2,
  workAddressValue2,
  workAddressState3,
  workAddressValue3,
  reasonForLeavingState1,
  reasonForLeaving1,
  reasonForLeavingState2,
  reasonForLeaving2,
  reasonForLeavingState3,
  reasonForLeaving3,
  jobTitleValue1,
  jobTitleState1,
  jobTitleValue2,
  jobTitleState2,
  jobTitleValue3,
  jobTitleState3,
  workPhoneNumberState1,
  workPhoneNumberValue1,
  workPhoneNumberState2,
  workPhoneNumberValue2,
  workPhoneNumberState3,
  workPhoneNumberValue3,
  supervisorsNameValue1,
  supervisorsNameState1,
  supervisorsNameValue2,
  supervisorsNameState2,
  supervisorsNameValue3,
  supervisorsNameState3,
  dutiesValue1,
  dutiesState1,
  dutiesValue2,
  dutiesState2,
  dutiesValue3,
  dutiesState3,
  mayWeContactState1,
  mayWeContactValue1,
  mayWeContactState2,
  mayWeContactValue2,
  mayWeContactState3,
  mayWeContactValue3,
}) {
  const [showWorkExperience2, setShowWorkExperience2] = useState(false)
  const [showWorkExperience3, setShowWorkExperience3] = useState(false)
  return (
    <div className=" flex w-full flex-col items-center justify-center">
      <span className="flex items-center justify-center mt-10 font-bold italic text-xl">
        Please list the names of your present and/or previous employers in
        chronological order with the present or most recent employer first.
        Provide information for at least the most recent ten(10) year period.
        You may include any verifiable work performed on a volunteer basis,
        internships, or military service. Your failure to completely respond to
        each inquire may disqualify you for consideration from employment. Do
        not answer "see resume".
      </span>
      <div className=" mt-10 flex w-full  flex-col items-center justify-center rounded-[20px]   outline outline-2 outline-[#8b8b8b]">
        <h2 className=" text-2xl"> Work History</h2>
        {WorkHistoryItem({
          selectedDateStart: selectedDateStart1,
          setSelectedDateStart: setSelectedDateStart1,
          selectedDateEnd: selectedDateEnd1,
          setSelectedDateEnd: setSelectedDateEnd1,
          typeOfBusiness: typeOfBusiness1,
          typeOfBusinessState: typeOfBusinessState1,
          workNameState: workNameState1,
          workNameValue: workNameValue1,
          workAddressState: workAddressState1,
          workAddressValue: workAddressValue1,
          reasonForLeaving: reasonForLeaving1,
          reasonForLeavingState: reasonForLeavingState1,
          jobTitleValue: jobTitleValue1,
          jobTitleState: jobTitleState1,
          workPhoneNumberValue: workPhoneNumberValue1,
          workPhoneNumberState: workPhoneNumberState1,
          supervisorsNameValue: supervisorsNameValue1,
          supervisorsNameState: supervisorsNameState1,
          dutiesValue: dutiesValue1,
          dutiesState: dutiesState1,
          mayWeContactState: mayWeContactState1,
          mayWeContactValue: mayWeContactValue1,
        })}
      </div>

      {showWorkExperience2 && (
        <div className=" mt-20 flex w-full  flex-col items-center justify-center rounded-[20px]   outline outline-2 outline-[#8b8b8b]">
          <h2 className=" text-2xl"> Work History 2</h2>
          {WorkHistoryItem({
            selectedDateStart: selectedDateStart2,
            setSelectedDateStart: setSelectedDateStart2,
            selectedDateEnd: selectedDateEnd2,
            setSelectedDateEnd: setSelectedDateEnd2,
            typeOfBusiness: typeOfBusiness2,
            typeOfBusinessState: typeOfBusinessState2,
            workNameState: workNameState2,
            workNameValue: workNameValue2,
            workAddressState: workAddressState2,
            workAddressValue: workAddressValue2,
            reasonForLeaving: reasonForLeaving2,
            reasonForLeavingState: reasonForLeavingState2,
            jobTitleValue: jobTitleValue2,
            jobTitleState: jobTitleState2,
            workPhoneNumberValue: workPhoneNumberValue2,
            workPhoneNumberState: workPhoneNumberState2,
            supervisorsNameValue: supervisorsNameValue2,
            supervisorsNameState: supervisorsNameState2,
            dutiesValue: dutiesValue2,
            dutiesState: dutiesState2,
            mayWeContactState: mayWeContactState2,
            mayWeContactValue: mayWeContactValue2,
          })}
        </div>
      )}
      {showWorkExperience3 && (
        <div className=" mt-20 flex w-full  flex-col items-center justify-center rounded-[20px]   outline outline-2 outline-[#8b8b8b]">
          <h2 className=" text-2xl"> Work History 3</h2>
          {WorkHistoryItem({
            selectedDateStart: selectedDateStart3,
            setSelectedDateStart: setSelectedDateStart3,
            selectedDateEnd: selectedDateEnd3,
            setSelectedDateEnd: setSelectedDateEnd3,
            typeOfBusiness: typeOfBusiness3,
            typeOfBusinessState: typeOfBusinessState3,
            workNameState: workNameState3,
            workNameValue: workNameValue3,
            workAddressState: workAddressState3,
            workAddressValue: workAddressValue3,
            reasonForLeaving: reasonForLeaving3,
            reasonForLeavingState: reasonForLeavingState3,
            jobTitleValue: jobTitleValue3,
            jobTitleState: jobTitleState3,
            workPhoneNumberValue: workPhoneNumberValue3,
            workPhoneNumberState: workPhoneNumberState3,
            supervisorsNameValue: supervisorsNameValue3,
            supervisorsNameState: supervisorsNameState3,
            dutiesValue: dutiesValue3,
            dutiesState: dutiesState3,
            mayWeContactState: mayWeContactState3,
            mayWeContactValue: mayWeContactValue3,
          })}
        </div>
      )}
      {showWorkExperience3 == false && (
        <div className="flex items-center justify-center mt-2">
          <RoundAddButton
            PlusOrMinus="plus"
            onClick={() => {
              if (showWorkExperience2) {
                setShowWorkExperience3(true)
              }
              if (showWorkExperience2 == false) {
                setShowWorkExperience2(true)
              } else if (showWorkExperience3 && showWorkExperience2) {
                setShowWorkExperience2(!showWorkExperience2)
                setShowWorkExperience3(!showWorkExperience3)
              }
            }}
          />
          <span className="ml-4 text-lg">
            Click here to add another employer
          </span>
        </div>
      )}

      {showWorkExperience3 && (
        <RoundAddButton
          PlusOrMinus="minus"
          onClick={() => {
            if (showWorkExperience2) {
              setShowWorkExperience3(true)
            }
            if (showWorkExperience2 == false) {
              setShowWorkExperience2(true)
            } else if (showWorkExperience3 && showWorkExperience2) {
              setShowWorkExperience2(!showWorkExperience2)
              setShowWorkExperience3(!showWorkExperience3)
            }
          }}
        />
      )}
    </div>
  )
}
function WorkHistoryItem({
  selectedDateStart,
  selectedDateEnd,
  setSelectedDateStart,
  setSelectedDateEnd,
  workNameState,
  workNameValue,
  typeOfBusiness,
  typeOfBusinessState,
  workAddressValue,
  workAddressState,
  reasonForLeaving,
  reasonForLeavingState,
  jobTitleValue,
  jobTitleState,
  workPhoneNumberValue,
  workPhoneNumberState,
  supervisorsNameValue,
  supervisorsNameState,
  dutiesValue,
  dutiesState,
  mayWeContactState,
  mayWeContactValue,
}) {
  return (
    <div className=" flex w-[75%] flex-col items-center  justify-center">
      <TextInput
        onChange={(text) => {
          workNameState(text.target.value)
        }}
        placeHolder="Company Name"
        widthPercentage="w-full"
        value={workNameValue}
      />
      <div className=" flex  w-full flex-col md:flex-row">
        <div className=" w-full">
          <TextInput
            onChange={(text) => {
              workAddressState(text.target.value)
            }}
            placeHolder="Address"
            widthPercentage="w-full"
            value={workAddressValue}
          />
        </div>

        <div className="w-full md:ml-5 md:w-[40%]">
          <TextInput
            onChange={(text) => {
              typeOfBusinessState(text.target.value)
            }}
            placeHolder="Type of Business"
            widthPercentage="w-full"
            value={typeOfBusiness}
          />
        </div>
      </div>
      <div className=" flex w-full items-center justify-center">
        <TextInput
          onChange={(text) => {
            jobTitleState(text.target.value)
          }}
          placeHolder="Job Title"
          widthPercentage="w-full"
          value={jobTitleValue}
        />
      </div>
      <div className=" flex w-full items-center justify-center">
        <TextInput
          onChange={(text) => {
            reasonForLeavingState(text.target.value)
          }}
          placeHolder="Reason for Leaving"
          widthPercentage="w-full"
          value={reasonForLeaving}
        />
      </div>
      <div className="  flex  w-full flex-col md:flex-row">
        <div className=" w-full">
          <TextInput
            onChange={(text) => {
              supervisorsNameState(text.target.value)
            }}
            placeHolder="Supervisors Name"
            widthPercentage="w-full"
            value={supervisorsNameValue}
          />
        </div>

        <div className=" w-full md:ml-5 md:w-[40%]">
          <PhoneNumberInput
            onChange={(text) => {
              workPhoneNumberState(text.target.value)
            }}
            valueState={workPhoneNumberValue}
            placeHolder="Phone Number"
            widthPercentage="w-full"
            value={workPhoneNumberValue}
          />
        </div>
      </div>

      <h5>Duties</h5>
      <div className=" w-full ">
        <LargeTextBox
          placeHolder="Duties"
          onChange={(text) => {
            dutiesState(text.target.value)
          }}
          value={dutiesValue}
          widthPercentage={'w-full'}
          heightPercentage="h-[300px]"
        />
      </div>
      <div className=" my-5">
        <h5>May We Contact?</h5>
        <RadioButton
          answerState={mayWeContactState}
          answer={mayWeContactValue}
        />
        {mayWeContactValue == 'No' && (
          <h5 className=" font-bold">
            If not please provide two professional references
          </h5>
        )}
      </div>
      <div className=" w-full justify-start">
        <h5 className=" m-10 text-xl font-bold text-[#2a2a2ad8]">
          Dates Employed
        </h5>
      </div>
      <div className=" flex w-full  flex-col items-center justify-center justify-items-center p-5 md:flex-row">
        <div className=" flex w-[50%] flex-col items-center justify-center">
          <h6 className=" m-4 text-lg text-[#7e7d7dd3]"> Start Date </h6>
          <Datepicker
            setSelectedDate={setSelectedDateStart}
            selectedDate={selectedDateStart}
          />
        </div>
        <div className=" m-5 flex w-[50%]  flex-col items-center justify-center">
          <h6 className=" m-4 text-lg text-[#7e7d7dd3]"> End Date </h6>
          <Datepicker
            setSelectedDate={setSelectedDateEnd}
            selectedDate={selectedDateEnd}
          />
        </div>
      </div>
    </div>
  )
}
