import type { LoginType, RegistrationType } from './schema/registration'
import type { FormTaskValuesType } from './schema/task'

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

export const taskConstant: FormTaskValuesType = {
  id: '',
  taskTitle: '',
  taskDetail: '',
  requiredWorkers: 0,
  payableAmount: 0.0,
  completionDate: new Date(), // Defaults to current date/time
  submissionInfo: '',
  taskImageUrl: '',
  buyerId: '',
  status: 'pending',
}

export const taskKey = 'create-task'
export const submissionsKey = 'submissions'
export const withdrawalsKey = 'withdrawals'
export const paymentsKey = 'payments'
export const notificationsKey = 'notifications'
