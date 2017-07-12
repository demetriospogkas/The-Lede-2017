#1) Let's say we are terrible doctors and we have a patient. 
#Define a dictionary called patient that works with the following code.
#print("Doctor, it looks like the patient's is complaining about", patient['complaint'])
 
patient = {
  'complaint':'shore throat'
}
print("Doctor, it looks like the patient is complaining about", patient['complaint'])


#2) We aren't really listening to their complaint, but as more test results come in, we'll add these
#things to the patient's record. 
#Add the following to the patient dictionary:
#Heart rate: 70
#Temperature: 98.6
#Infection: No

patient['Heart rate'] = 70
patient['Temperature'] = 98.6
patient['Infection'] = 'No'


#3) Now let's be doctors! First, if they have a heart rate about 100, 
#we should tell them to relax. Store your diagnosis in a key called 'diagnosis'.
#* If their temperature is above 102 but they do not have an infection, they have heat stroke.
#* If they have a high temperature and they have an infection, they have the flu.
#* If they have an infection but no high temperature, it's probably a cold.
#* If none of the above, tell them to take an aspirin and call you in the morning.
#When you are finished, print "Your diagnosis is _______."

patient['Diagnosis'] = ''

diagnosis = patient['Diagnosis']
heart_rate = patient['Heart rate']
temperature = patient['Temperature']
infection = patient['Infection']

if heart_rate >= 95:
  diagnosis = 'that you should relax.'
elif temperature > 102 and infection == 'No':
  diagnosis = 'that you have heat stroke.'
elif temperature > 102 and infection != 'No':
  diagnosis = 'that you have the flu.'
elif infection == 'No' and temperature < 102:
  diagnosis = 'that you probably have a cold.'
else: diagnosis = 'that you take an aspirin and call me back in the morning.'
print("Your diagnosis is", diagnosis)




 
#4) Make a list of 3 different patients, each with different complaint, heart rate, temperature, 
#and whether they have an infection or not. Use a for loop to diagnose each of them.

patients = [{
'name':'Patient One',
'complaint':'shore throat',
'Heart rate': 70,
'Temperature': 98.6,
'Infection': 'No',
'Diagnosis': ''
},{
'name':'Patient Two',
'complaint':'stomach ache',
'Heart rate': 82,
'Temperature': 90,
'Infection': 'Yes',
'Diagnosis': ''
},{
'name':'Patient Three',
'complaint':'leg wound',
'Heart rate': 79,
'Temperature': 103,
'Infection': 'No',
'Diagnosis': ''
 }]


for each_patient in patients:
  diagnosis = each_patient['Diagnosis']
  heart_rate = each_patient['Heart rate']
  temperature = each_patient['Temperature']
  infection = each_patient['Infection']
  complaint = each_patient['complaint']
  if heart_rate >= 95:
    diagnosis = 'that you should relax.'
  elif temperature > 102 and infection == 'No':
    diagnosis = 'that you have heat stroke.'
  elif temperature > 102 and infection != 'No':
    diagnosis = 'that you have the flu.'
  elif infection == 'No' and temperature < 102:
    diagnosis = 'that you probably have a cold.'
  else: diagnosis = 'that you take an aspirin and call me back in the morning.'
  print("The diagnosis for", each_patient['name'], "that has", complaint, "is", diagnosis)


#5) Because you're such a bad doctor, they've put you in the back. 
#You don't get to talk to patients any more, you just get to diagnose them based on their temperatures
#And these ones aren't even sick! They just might have heat stroke.

#Using the following list and a for loop, create some new patient records (a list of dictionaries). 
#Each dictionary should include a temperature and whether the patient has heat stroke or not. 
#When completed, my "for patient in patients..." code should be able to run.
#temperatures = [ 99, 105, 98, 99, 100, 104, 105, 100 ]

# YOUR CODE GOES HERE
#for record in records:
#  if record['diagnosis'] == 'heat stroke':
#    print("This patient has heat stroke!")
#  else:
#    print("This patient does not have heat stroke")

temperatures = [ 99, 105, 98, 99, 100, 104, 105, 100 ]
diagnosis = []

for u in range(0,len(temperatures)):
  import statistics
  if temperatures[u] > statistics.mean(temperatures):
    heat_stroke_diagnosis = 'heat stroke'
  else: heat_stroke_diagnosis = 'no heat stroke'
  diagnosis.append(heat_stroke_diagnosis)

records = []

i = -1
for each_element in temperatures:
  i = i + 1 
  records.append({
    'temperatures' : each_element,
    'diagnosis' : diagnosis[i]
    })

for record in records:
  if record['diagnosis'] == 'heat stroke':
    print("This patient has heat stroke!")
  else:
    print("This patient does not have heat stroke")