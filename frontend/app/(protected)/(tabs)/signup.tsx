// import React from 'react'
// import { View, Text, TextInput, Button, StyleSheet, Alert, ScrollView } from 'react-native'
// import { useForm, Controller } from 'react-hook-form'
// import axios from 'axios'
// import { Urls } from '@/constants/Urls'

// type FormData = {
//   firstName: string
//   phoneNumber: string
//   email: string
//   password: string
//   dateOfBirth: string
//   gender: string
//   borough: string
//   bio: string
// }

// export default function SignupScreen() {
//   const { control, handleSubmit, reset } = useForm<FormData>()

//   const onSubmit = async (data: FormData) => {
//     try {
//       // Replace with your actual API URL
//       // const response = await axios.post(Urls.postProfile, data)

//       // data =
//       // {
//       //   "firstName": "Bob",
//       //   "phoneNumber": "1112224444",
//       //   "email": "b@gmail.com",
//       //   "password": "12344",
//       //   "dateOfBirth": "01/11/1999",
//       //   "gender": "M",
//       //   "borough": "Queens",
//       //   "bio": "yuh"
//       // }
//       // Alert.alert('Attempt', JSON.stringify(data))
//       const response = await fetch("http://192.168.1.209:8080/user", {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(data),
//       });

//       Alert.alert('Code', response.status.toString())

//       if (response.status === 201) {
//         Alert.alert('Success', 'User created successfully!')
//         reset()
//       } else {
//         Alert.alert('Error', 'Something went wrong.');
//       }
//     } catch (error) {
//       if (error instanceof Error) {
//         console.log('❌ Network error:', error);
//         console.log('🧵 Error message:', error.message);
//         console.log('📦 Full error:', JSON.stringify(error, null, 2));
//         Alert.alert('Error7', error.message);
//       } else {
//         Alert.alert('Error', 'Generic Error')
//       }
//     }
//   }

//   return (
//     <ScrollView contentContainerStyle={styles.container}>
//       <Text style={styles.header}>Sign Up</Text>

//       <FormField name="firstName" control={control} label="First Name" />
//       <FormField name="phoneNumber" control={control} label="Phone Number" />
//       <FormField name="email" control={control} label="Email" />
//       <FormField name="password" control={control} label="Password" />
//       <FormField name="dateOfBirth" control={control} label="Date of Birth (MM/DD/YYYY)" />
//       <FormField name="gender" control={control} label="Gender" />
//       <FormField name="borough" control={control} label="Borough" />
//       <FormField name="bio" control={control} label="Short Bio" multiline />

//       <Button title="Submit" onPress={handleSubmit(onSubmit)} />
//     </ScrollView>
//   )
// }

// function FormField({
//   name,
//   control,
//   label,
//   multiline = false,
// }: {
//   name: keyof FormData
//   control: any
//   label: string
//   multiline?: boolean
// }) {
//   return (
//     <View style={styles.field}>
//       <Text style={styles.label}>{label}</Text>
//       <Controller
//         control={control}
//         name={name}
//         rules={{ required: true }}
//         render={({ field: { onChange, value } }) => (
//           <TextInput
//             style={[styles.input, multiline && styles.multiline]}
//             onChangeText={onChange}
//             value={value}
//             multiline={multiline}
//           />
//         )}
//       />
//     </View>
//   )
// }

// const styles = StyleSheet.create({
//   container: {
//     padding: 24,
//     paddingBottom: 100,
//     backgroundColor: '#fff',
//     flexGrow: 1,
//   },
//   header: {
//     fontSize: 28,
//     fontWeight: 'bold',
//     marginBottom: 24,
//     textAlign: 'center',
//   },
//   field: {
//     marginBottom: 20,
//   },
//   label: {
//     fontSize: 16,
//     marginBottom: 6,
//   },
//   input: {
//     borderWidth: 1,
//     borderColor: '#ccc',
//     padding: 12,
//     borderRadius: 8,
//     fontSize: 16,
//   },
//   multiline: {
//     height: 100,
//     textAlignVertical: 'top',
//   },
// })
