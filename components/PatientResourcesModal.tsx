import React, { useState, useEffect } from 'react'
import { XMarkIcon, UserPlusIcon } from '@heroicons/react/24/outline'
import SearchComponent from './searchComponent'
import DateInput from './DateInput'
import TextInput from './TextInput'
import PhoneNumberInput from './PhoneNumberInput'
import MainButton from './MainButton'
import { addNewPatient, patientSearchListAMA } from '../firebase'
import { selectCompany } from '../redux/slices/companySlice'
import { useSelector } from 'react-redux'

const PatientResourcesModal: React.FC<{ setClose: any }> = ({ setClose }) => {
  const [showAddNewUser, setShowAddNewUser] = useState(false)
  const [searchName, setSearchName] = useState('')
  const [searchDob, setSearchDob] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [address, setAddress] = useState('')
  const [DOB, setDOB] = useState('')
  const [patientListArray, setPatientListArray] = useState<Array<any>>(Array)
  const [searched, setSearched] = useState<any>(null)
  const company = useSelector(selectCompany)

  useEffect(() => {
    patientSearchListAMA({
      patientArray: setPatientListArray,
      company: company,
    })
  }, [])

  useEffect(() => {
    var searchedPatient: Array<any> = []
    if (searchName != '' || searchDob != '') {
      patientListArray.map((item: any) => {
        const fullName: string = JSON.stringify(item.fullName) as string
        const DOB: string = JSON.stringify(item.DOB) as string
        // if (applicationSearch.length > 1) {
        if (
          fullName.toLowerCase().includes(searchName.toLowerCase()) == true &&
          DOB.includes(searchDob)
        ) {
          searchedPatient.push(item)
        }

        // }
      })
      setSearched(searchedPatient)
    } else {
      searchedPatient = []
      setSearched(null)
    }
  }, [searchName, searchDob])

  const patientList = () => {
    if (searched != null) {
      const list = searched.map((item: any) => {
        // console.log('hiii ' + item.email)
        // console.log(height)
        var month = item.DOB.slice(0, 2)
        var day = item.DOB.slice(2, 4)
        var year = item.DOB.slice(4, 8)

        return (
          <div
            key={item.phoneNumber}
            onClick={() => {
              setSearched({ item })
              console.log('hiiiii' + item)
            }}
            className=" m-4  flex cursor-pointer flex-row items-center justify-center overflow-x-hidden rounded-[30px] bg-[#ebebebc6]  p-4   text-center shadow-xl duration-500 hover:scale-[110%]"
          >
            <h1 className="  mx-5  text-center text-lg text-[#707070]">
              {item.fullName}
            </h1>
            <h1 className=" mx-5  text-center text-lg text-[#707070]">
              {month}/{day}/{year}
            </h1>
          </div>
        )
      })

      return list
    }
    {
      setSearched([])
    }
  }

  const showAddPatientOrSearch = () => {
    if (showAddNewUser == false) {
      return (
        <div className=" flex h-[85%] flex-col items-center justify-center">
          <div className=" flex h-[20%] w-full flex-row items-start justify-center px-5 ">
            <div className=" mx-10">
              <TextInput
                value={searchName}
                onChange={(text: any) => {
                  setSearchName(text.target.value)
                }}
                placeHolder="Last Name , First Name"
              />
            </div>

            <div className=" mx-10">
              <DateInput
                placeHolder="DOB"
                value={searchDob}
                onChange={(text: any) => {
                  setSearchDob(text.target.value)
                }}
              />
            </div>
          </div>
          <div className=" 0 flex h-full w-[75%] flex-col overflow-auto p-5 ">
            {patientList()}
          </div>
        </div>
      )
    } else {
      return (
        <div className=" text-center">
          <div className=" flex-rows flex h-[85%] grid-cols-2">
            <div className=" w-full">
              <div>
                <TextInput
                  value={lastName}
                  onChange={(text: any) => {
                    setLastName(text.target.value)
                  }}
                  placeHolder="Last Name"
                />
              </div>
              <div className=" mt-10">
                <DateInput
                  value={DOB}
                  onChange={(text: any) => {
                    setDOB(text.target.value)
                  }}
                  placeHolder="DOB"
                />
              </div>
            </div>
            <div className=" w-full">
              <TextInput
                value={firstName}
                onChange={(text: any) => {
                  setFirstName(text.target.value)
                }}
                placeHolder="First Name"
              />
              <div className=" mt-10">
                <PhoneNumberInput
                  value={phoneNumber}
                  onChange={(text: any) => {
                    setPhoneNumber(text.target.value)
                  }}
                  placeHolder="Phone Number"
                />
              </div>
              {/* <div className=" mt-10">
                <TextInput
                  value={address}
                  onChange={(text: any) => {
                    setAddress(text.target.value)
                  }}
                  placeHolder="Address"
                />
              </div> */}
            </div>
          </div>
          <div className=" mt-10">
            <TextInput
              value={email}
              onChange={(text: any) => {
                setEmail(text.target.value)
              }}
              placeHolder="Email"
            />
          </div>
          <MainButton
            onClick={() => {
              if (
                firstName == '' ||
                lastName == '' ||
                DOB == '' ||
                phoneNumber == '' ||
                email == ''
              ) {
                alert('Please fill out all fields')
              } else {
                addNewPatient({
                  email: email,
                  lastName: lastName,
                  firstName: firstName,
                  DOB: DOB,
                  phoneNumber: phoneNumber,
                  address: address,
                  company: company,
                })
                setEmail('')
                setFirstName('')
                setLastName('')
                setPhoneNumber('')
                setAddress('')
                setAddress('')
                setDOB('')
              }
            }}
            buttonText="Add patient"
          />
        </div>
      )
    }
  }

  return (
    <div className="fixed flex h-[100vh] w-full translate-y-[-13%] items-center justify-center bg-[#dcdcdcac]">
      <div className=" h-[70%] w-[60%] rounded-[30px] bg-[#ffffff] shadow-2xl ">
        <div className="flex h-[15%] grid-rows-3 flex-row  rounded-tr-[30px] rounded-tl-[30px] bg-[#76a3ff] ">
          <div className=" mx-10 mt-5 w-full">
            <UserPlusIcon
              onClick={() => {
                setShowAddNewUser(!showAddNewUser)
              }}
              className=" h-10 w-7 cursor-pointer  text-black duration-[500s] ease-in"
            />
          </div>
          <div className=" mx-10 mt-5 w-full ">
            <h3 className="w-full text-center text-2xl">Patients</h3>
          </div>
          <div className=" mx-10 mt-5 flex w-full justify-end">
            <XMarkIcon
              onClick={() => {
                setClose(false)
              }}
              className=" h-10 w-7 cursor-pointer  text-black duration-[500s] ease-in"
            />
          </div>
        </div>
        <h3 className="text-md w-full text-center text-[#0b7ee9]">{company}</h3>
        {showAddPatientOrSearch()}
      </div>
    </div>
  )
}
export default PatientResourcesModal
