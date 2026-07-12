import type { LoginType, RegistrationType } from './schema/registration'

export const registrationConstant: RegistrationType = {
  fullName: '',
  email: '',
  password: '',
  image:
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQNY9Yi56KsGN7_18bLNltEhs7GP1q8e_UBD24GzpQyYpxpcEOA22FzmFM&s=10',
  role: 'worker',
}

export const loginConstant: LoginType = {
  email: '',
  password: '',
}
