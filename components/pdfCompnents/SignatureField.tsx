import React, { useRef, useState, useEffect } from 'react'
import SignaturePad from 'signature_pad'
import {
  Document,
  Page,
  Text,
  View,
  PDFViewer,
  StyleSheet,
  Canvas,
} from '@react-pdf/renderer'
import MainButton from '../MainButton'
import { RoundAddButton } from '../RoundAddButton'
import { AddSignatureToStorage } from '../../firebase'

interface SignatureFieldProps {}

const SignatureField: React.FC<SignatureFieldProps> = () => {
  const [draw, setDraw] = useState(false)
  const [signature, setSignature] = useState('')
  const [buttonDisabled, setButtonDisabled] = useState(true)
  const signatureFieldRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const signaturePad = new SignaturePad(signatureFieldRef.current!)
    //change the weight of the line
    signaturePad.penColor = 'rgb(0, 0, 0)'
    signaturePad.minWidth = 0.5
    signaturePad.maxWidth = 0.00004
    signaturePad.throttle = 16
    signaturePad.velocityFilterWeight = 0.7

    signaturePad.addEventListener('endStroke', () => {
      var signatureData = signaturePad.toDataURL()
      setSignature(signatureData)
      setButtonDisabled(false)
    })
  }, [])

  return (
    <View
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
      }}
    >
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          width: '100%',
        }}
      >
        <Text
          style={{ fontSize: '30px', fontWeight: 'bold', color: '#0d61f3' }}
        >
          Signature
        </Text>
      </View>
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'flex-end',
        }}
      >
        <RoundAddButton
          onClick={() => {
            const signaturePad = new SignaturePad(signatureFieldRef.current!)
            signaturePad.clear()
            setButtonDisabled(true)
          }}
          color="bg-[#ff0000]"
          PlusOrMinus="minus"
        />
      </View>
      <canvas
        ref={signatureFieldRef}
        style={{
          border: '2px solid #0d61f3',
          borderColor: '#0d61f3',
          width: '700px',
          height: '250px',
          borderRadius: '25px',
        }}
        height={250}
        width={700}
        onMouseEnter={(e) => {
          //mouse offset
          // const signaturePad = new SignaturePad(signatureFieldRef.current!)
        }}

        //onClick={() => setDraw(!draw)}
      />
      <MainButton
        buttonText="Capture Signature"
        disabled={buttonDisabled}
        onClick={() => {
          AddSignatureToStorage({ signature: signature })
          const signaturePad = new SignaturePad(signatureFieldRef.current!)
          signaturePad.clear()
          setButtonDisabled(true)
        }}
      />
    </View>
  )
}
export default SignatureField